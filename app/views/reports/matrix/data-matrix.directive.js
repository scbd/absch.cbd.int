import app from '~/app';
import _ from 'lodash';
import template from 'text!./data-matrix.directive.html';
import '~/components/scbd-angularjs-services/main';
import '~/services/main';
import '~/views/directives/block-region-directive';
import 'pivottable';
import 'ngDialog'; ;
import { mergeTranslationKeys } from '~/services/translation-merge';
import dataMatrixT from '~/app-text/views/reports/matrix/data-matrix.json';

let downloadSchemas;

app.directive("matrixView", ["$q", "searchService", '$http', 'locale', 'thesaurusService', 'realm', '$timeout', 'ngDialog', '$filter', 'translationService', '$location', 'commonjs',
    function ($q, searchService, $http, locale, thesaurusService, realm, $timeout, ngDialog, $filter, translationService, $location, commonjs) {
	
		return{
			template:template,
			restrict:'EA',
			replace:true,
            require:'^searchDirective',
			scope:{ 
                'api' : '=',
                'onRecordFormatting'    : '&'
            },
			link($scope, $element, $attr, searchDirectiveCtrl){
                translationService.set('dataMatrixT', dataMatrixT);
                const fieldsT 		= mergeTranslationKeys(dataMatrixT);
                require(['pivottable', 'plotly.js', 'plotly-renderers'], function(){});
                let countries  = {};
                $q.when(commonjs.getCountries()).then(function(data) {           
                    _.forEach(data, function(c) { countries[c.code.toLowerCase()] = c.name.en; });
                    countries.eur = countries.eur || countries.eu;
                }).catch(function(error) {
                    console.log('ERROR:', error);
                });
                            
                const params               = $location.search();  
                let pivotUIConf;
                let pivotResult;
                const defaultMessage       = $element.find('#loadingMessage').text() || "Loading...";
                const exportFileName       = "Matrix-view";
                const pageSize             = 1000;
                $scope.matrixProgress = defaultMessage;
                let queryCanceler;
                let regions                = [];
                
                $scope.api            = {
                    updateResult : updateResult,
                    onExport     : onExport,
                    isBusy       : false
                };

                // ASYNC update function to handle dynamic imports
                async function updateResult(queryOptions){
                    if(queryCanceler){
                        queryCanceler.resolve();
                        $scope.matrixProgress   = defaultMessage;
                        $scope.matrixProgress  += '<br/>' + ($element.find('#resetFilterMessage').text() || '');
                    }
                    else{
                        $scope.matrixProgress   = defaultMessage;
                    }
                    queryCanceler = $q.defer();

                    $scope.api.isBusy = $scope.loading = true;

                    // Dynamically import the download schemas based on the realm
                    if (!downloadSchemas) {
                        if (realm.is('ABS')) {
                            downloadSchemas = (await import('~/app-data/abs/download-schemas')).downloadSchemas;
                        } else if (realm.is('BCH')) {
                            downloadSchemas = (await import('~/app-data/bch/download-schemas')).downloadSchemas;
                        } else if (realm.is('CHM')) {
                            downloadSchemas = (await import('~/app-data/chm/download-schemas')).downloadSchemas;
                        }
                    }

                    let fields = {};
 
                    let schemaName; 
                    if (Array.isArray(params.schema) && params.schema.length === 1) {
                        schemaName = params.schema[0];
                    }
                    if(schemaName){
                        fields = downloadSchemas[schemaName];
                    }

                    const query = {
                        fields           : fields, // Use dynamic fields from the download schema
                        fieldQuery       : _.uniq(queryOptions.tagQueries),
                        query            : queryOptions.query||undefined,
                        facet            : true,
                        facetFields      : queryOptions.facetFields,
                        pivotFacetFields : queryOptions.pivotFacetFields,
                        rowsPerPage      : 100000 // Get all records (same as export.js 'all' listType)
                    };

                    return loadMatrixRecords({query, fields, schema: schemaName})
                        .then(function(result){
                            queryCanceler   = null;                               
                            pivotResult     = result;
                            pivotUI(pivotResult);
                            return result;
                        })
                        .catch(function(err){
                            if(err.xhrStatus!="abort")
                                throw err;
                        })
                        .finally(function(){
                            if(!queryCanceler)
                                $scope.api.isBusy = $scope.loading = false;
                        });   
                }

                async function loadMatrixRecords({ query, fields, schema }) {
                    $scope.matrixProgress = defaultMessage;

                    const searchQuery = {
                        df   : searchService.localizeFields(query.df || 'text_EN_txt'),
                        fq   : _([query.fieldQuery]).flatten().compact().uniq().value(),
                        q    : query.query,
                        sort : searchService.localizeFields(query.sort),
                        start: 0,
                        rows : query.rowsPerPage,
                    };

                    if (!_.find(searchQuery.fq, function(q) { return ~q.indexOf('realm_ss:'); })) {
                        searchQuery.fq.push('realm_ss:' + realm.value.toLowerCase());
                    }
                    $scope.isLoading = true;
                    try {
                        const facetFields = 'Government:government_EN_t,RecordType:schema_EN_t,updatedOn:updatedDate_dt,government_s,schemaType:schemaType_s,countryRegions_ss';
                        
                        // if schema is provided do not load from solr, get records from download api.
                        // just get facets from solr.
                        if (schema)
                            query.rowsPerPage = 0;
                       
                        const searchResult = await searchService.list({ ...query, fields: facetFields }, queryCanceler.promise)
                        const numFound = searchResult.data.response.numFound;
                        const facet_counts = searchResult.data.facet_counts;
                        let docs = searchResult.data.response.docs || [];
                       
                        if (schema) {
                            // Fetch all records from download API for schema
                            docs = (await $http.post(
                                `/api/v2022/documents/schemas/${encodeURIComponent(schema)}/download`,
                                { query: searchQuery, fields },
                                { timeout: queryCanceler.promise }
                            )).data;
                        } 
 
                        docs = _.map(docs, (row) => {
                            const formattedRow = {};
                           
                            // Add derived fields first with translated labels
                            if (row.updatedOn || row.publishedOn) {
                                formattedRow[fieldsT["Year"]] = $filter("formatDate")(row.updatedOn || row.publishedOn, "YYYY");
                            }
                           
                            const code = row.government_s || getCountryCode(row.government);
                            const region = code ? _.find(regions, reg => _.includes(reg.narrowerTerms, code)) : undefined;
                            formattedRow[fieldsT["Region"]] = region ? region.title[locale] : 'No Region';
                           
                            if(!schema){
                                formattedRow[fieldsT["Government"]] = row.Government || 'x - Reference record';
                                formattedRow[fieldsT["RecordType"]] = row.RecordType;
                                formattedRow[fieldsT["SchemaType"]] = (row.schemaType||'').replace(/[a-z]/, function(match){ return match.toUpperCase()});
                            } else {
                                // For schema downloads, apply translation for schema-defined fields
                                for (const [key, label] of Object.entries(fields)) {
                                    if (_.has(row, key)) {
                                        formattedRow[label] = _.get(row, key);
                                    }
                                }
                            }
                            return formattedRow;
                        });
                       
                        return {
                            rows: docs,
                            numFound,
                            schema,
                            schemaFields: fields,
                            facets: searchDirectiveCtrl.sanitizeFacets(facet_counts)
                        };
                    } catch (err) {
                        console.error("Error while fetching docs", err); 
                        throw err;
                    } finally { 
                        $scope.$applyAsync(() => {
                            $scope.isLoading = false;
                        });
                    }
                }

               function getCountryCode(countryName) {
                    const entry = Object.entries(countries)
                        .find(([code, name]) => name.toLowerCase() === countryName?.toLowerCase());

                    return entry ? entry[0] : null;
                }
                
                function loadRegions(){
                    const DefaultRegions = [
                        "D50FE62D-8A5E-4407-83F8-AFCAAF708EA4", // CBD Regional Groups - Africa
                        "5E5B7AA4-2420-4147-825B-0820F7EC5A4B", // CBD Regional Groups - Asia and the Pacific
                        "942E40CA-4C23-4D3A-A0B4-736CD0EFCD54", // CBD Regional Groups - Central and Eastern Europe
                        "3D0CCC9A-A0A1-4399-8FA2-41D4D649DB0E", // CBD Regional Groups - Latin America and the Caribbean
                        "0EC2E5AE-25F3-4D3A-B71F-8019BB62ED4B"  // CBD Regional Groups - Western Europe and Others
                    ];
                    const regionsQuery = _.map(DefaultRegions, function(region){return thesaurusService.getTerms(region, {relations:true})});
                    
                    return $q.all(regionsQuery)
                            .then(function(regionData){
                                regions = regionData;
                            });
                }

                function init(){
                    loadRegions()     
                }

                function onExport(){

                    if($scope.loading)
                        return;
                    var exportData;
                    var downloadFormat;
                    var exportType;
                    if(pivotUIConf && pivotUIConf.rendererName.indexOf('Chart')>0){
                        exportData = $element.find('.plot-container.plotly').parent().html();
                        downloadFormat = 'jpeg';
                        exportType  = 'chart';
                    }
                    else{
                        exportData = $element.find('.pvtRendererArea .pvtTable').parent().html();
                        downloadFormat = 'xlsx';
                        exportType = 'excel'
                    }
                    ngDialog.open({
                        name     : 'exportDialog',
                        className : 'ngdialog-theme-default wide',
                        template : 'exportDialog',
                        controller : ['$scope', '$element', '$sce', function($scope, $element, $sce){
                            $scope.exportData     = $sce.trustAsHtml(exportData);
                            $scope.downloadFormat = downloadFormat;
                            $scope.exportType     = exportType;
                            $scope.fileName       = exportFileName
                            $scope.downloadData   = function(){
                                download($scope.downloadFormat, $scope.fileName);
                            };

                            $scope.closeDialog = function(){
                                ngDialog.close();                                            
                            }
                        }]
                    })
                    function download(format, fileName){
                        if(pivotUIConf && pivotUIConf.rendererName.indexOf('Chart')>0){
                            pivotUI(pivotResult, format, fileName);
                            $timeout(function(){
                                const btn = $element.find('.modebar-container .modebar .modebar-group .modebar-btn:first()')[0];
                                if(btn) btn.click();
                            }, 200);
                        }
                        else{
                            // Excel export
                            require(['tableexport'], function(){
                                var tableExport = $element.find('.pvtTable').tableExport({
                                                        formats: ["xlsx", "xls", "csv"],
                                                        filename: fileName||exportFileName,
                                                    });
                                $element.find('.'+ format).click();
                                tableExport.remove();
                            });  
                        }
                    }
                }

                function pivotUI(result, chartExportFormat, fileName){


                    chartExportFormat = chartExportFormat || 'jpeg';

                    var derivers = $.pivotUtilities.derivers;
                    var renderers = $.extend($.pivotUtilities.renderers, $.pivotUtilities.plotly_renderers);
                    if(!pivotUIConf){
                        pivotUIConf = {
                            renderers: renderers,
                            rows: ["Year"],
                            cols: ["RecordType"],
                            aggregatorName: "Count",
                            rendererOptions: {
                                plotly:{
                                    // showlegend: true
                                },
                                plotlyConfig : {
                                    displayModeBar: true,
                                    toImageButtonOptions: {
                                        filename : exportFileName,
                                        format: chartExportFormat, // one of png, svg, jpeg, webp
                                    }
                                }
                            },
                            onRefresh: function(config){
                                pivotUIConf = config;
                            }
                        }
                    }
                    else{
                        pivotUIConf.rendererOptions.plotlyConfig.toImageButtonOptions.format    = chartExportFormat;
                        pivotUIConf.rendererOptions.plotlyConfig.toImageButtonOptions.filename  = fileName||exportFileName;
                    }

                    $element.find("#output").pivotUI(
                        result.rows, 
                        pivotUIConf,
                        true // overwrite prev conf
                    );
                }

                init();

                
			}
		}
		
    }]);

