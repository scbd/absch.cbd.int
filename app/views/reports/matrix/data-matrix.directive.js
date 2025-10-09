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
                    _.forEach(data, function(c) { countries[c.code.toLowerCase()] = c.name[locale]; });
                    countries.eur = countries.eur || countries.eu;
                }).catch(function(error) {
                    console.error('ERROR:', error);
                });
                            
                const params               = $location.search();
                let pivotUIConf;
                let pivotResult;
                const defaultMessage       = $element.find('#loadingMessage').text() || "Loading...";
                const exportFileName       = "Matrix-view";
                const pageSize             = 2000;
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
                    //if there are no fields for schema fallback to generic fields
                    if(!fields){
                        // Default fields when no schema or multiple schemas are selected
                        schemaName = null;
                    }

                    const query = {
                        fields           : fields, // Use dynamic fields from the download schema
                        fieldQuery       : _.uniq(queryOptions.tagQueries),
                        query            : queryOptions.query||undefined,
                        facet            : true,
                        facetFields      : queryOptions.facetFields,
                        pivotFacetFields : queryOptions.pivotFacetFields,
                        rowsPerPage      : pageSize // Get all records (same as export.js 'all' listType)
                    };

                    $scope.isLoading = true;
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
                                $scope.$applyAsync(() => {
                                    $scope.api.isBusy = $scope.loading = false;
                                });
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
                        const facetFields = 'Government:government_EN_t,RecordType:schema_EN_t,updatedOn:updatedDate_dt,government_s,schemaType:schemaType_s,countryRegions_ss';
                        
                        // if schema is provided do not load from solr, get records from download api.
                        // just get facets from solr.
                        if (schema)
                            query.rowsPerPage = 0;
                       
                        const searchResult = await executeSolrQueryInBatch({ ...query, fields: facetFields }, queryCanceler.promise)
                        const numFound = searchResult.numFound;
                        const facet_counts = searchResult.facet_counts;
                        let docs = searchResult.docs || [];
                       
                        if (schema) {
                            // Fetch all records from download API for schema
                            docs = await executeTransformedQueryInBatch(schema, { ...searchQuery,start:0, rows: pageSize },fields, queryCanceler.promise, {docs:[], numFound, pageNumber:0});                            
                        } 
 
                        docs = _.map(docs, (row) => {
                            const formattedRow = {};
                           
                            // Add derived fields first with translated labels
                            if (row.updatedOn || row.publishedOn) {
                                formattedRow[fieldsT["Year"]] = $filter("formatDate")(row.updatedOn || row.publishedOn, "YYYY");
                            }
                            // row.government_s from the solr field, row.government from the download API
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
                }

                async function executeSolrQueryInBatch({start, rowsPerPage, ...other}, queryCanceler, result){
                    let message = fieldsT.loading
                    if(result?.numFound>0)
                        message = start + " of " + result.numFound;
                    $scope.matrixProgress = '<br/>' + message;
                    const searchResult = await searchService.list({ ...other, start, rowsPerPage }, queryCanceler)
                    if(searchResult?.data?.response){
                        const data = searchResult.data.response;
                        result              = result || {docs:[], numFound:0, pageNumber:0, facet_counts: searchResult.data.facet_counts};
                        result.docs         = [...result.docs, ...data.docs];
                        result.numFound     = data.numFound;
                        result.pageNumber   = result.pageNumber + 1;
                        if(rowsPerPage > 0 && result.docs.length < result.numFound){
                            other.facet = false;
                            return executeSolrQueryInBatch({start:result?.pageNumber * rowsPerPage, rowsPerPage, ...other}, queryCanceler, result);
                        }
                    }
                    return result;
                }

                async function executeTransformedQueryInBatch(schema, {start, rows, ...searchQuery}, fields, queryCanceler, result){

                    let message = ''
                    if(result?.numFound>0)
                        message = start + " of " + result.numFound;
                    $scope.matrixProgress = '<br/>' + message;

                    const searchResult = (await $http.post(`/api/v2022/documents/schemas/${encodeURIComponent(schema)}/download`,
                                            { query: {...searchQuery, start, rows}, fields }, { timeout: queryCanceler } )).data;
                    
                    if(searchResult?.length){
                        result              = result || {docs:[], numFound:0, pageNumber:0};
                        result.docs         = [...result.docs, ...searchResult];
                        result.pageNumber   = result.pageNumber + 1;
                        if(rows > 0 && result.docs.length < result.numFound){
                            return executeTransformedQueryInBatch(schema, {start:result?.pageNumber * rows, rows, ...searchQuery}, fields, queryCanceler, result);
                        }
                    }
                    return result.docs;
                }

                function getCountryCode(countryName) {
                    if (!countryName) return null;

                    countryName = countryName.trim().toLowerCase();

                    const entry = Object.entries(countries).find(
                        ([code, name]) => name.toLowerCase() === countryName
                    );
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

                    let rowColumn
                    if(result.rows.find(r => r[fieldsT["Country"]]))
                        rowColumn = "Country"                    
                    else if(result.rows.find(r => r[fieldsT["Government"]]))
                        rowColumn = "Government"
                    else 
                        rowColumn = "Year"

                    if(!pivotUIConf){
                        pivotUIConf = {
                            renderers: renderers,
                            rows: [fieldsT[rowColumn]],
                            cols: [fieldsT["RecordType"]],
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
                        // Reset rows and cols to default on schema change
                        pivotUIConf.rows = [fieldsT[rowColumn]];
                        pivotUIConf.cols = [fieldsT["RecordType"]];
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

