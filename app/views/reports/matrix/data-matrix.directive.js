import app from 'app';
import _ from 'lodash';
import template from 'text!./data-matrix.directive.html';
import 'components/scbd-angularjs-services/main';
import 'services/main';
import 'views/directives/block-region-directive';
import 'pivottable';
import 'ngDialog'; ;

app.directive("matrixView", ["$q", "searchService", '$http', 'locale', 'thesaurusService', 'realm', '$timeout', 'ngDialog',
function ($q, searchService, $http, locale, thesaurusService, realm, $timeout, ngDialog) {
	
		return{
			template:template,
			restrict:'EA',
			replace:true,
			scope:{ 
                'api' : '=',
                'onRecordFormatting'    : '&'
            },
			link($scope, $element){
                
                require(['pivottable', 'plotly.js', 'plotly-renderers'], function(){});

                var pivotUIConf;
                var pivotResult;
                var defaultMessage        = $element.find('#loadingMessage').text()
                var exportFileName        = "Matrix-view"
                    $scope.matrixProgress = defaultMessage;
                var pageSize              = 1000;
                var queryCanceler         = undefined;
                var regions               = [];
                
                $scope.api          = {
                    updateResult : updateResult,
                    onExport     : onExport,
                    isBusy       : false
                };

                function updateResult(queryOptions){
                    if(queryCanceler){
                        queryCanceler.resolve();
                        $scope.matrixProgress   = defaultMessage;
                        $scope.matrixProgress  += '<br/>' + $element.find('#resetFilterMessage').text()
                    }
                    else{
                        $scope.matrixProgress   = defaultMessage;
                    }
                    queryCanceler = $q.defer();

                    $scope.api.isBusy = $scope.loading = true;
                    queryOptions = queryOptions||{};
                    queryOptions.query   = queryOptions.query||'government_submissionYear_s:*';

                    var query = {
                        fields      : 'Government:government_EN_t,RecordType:schema_EN_t, Year:government_submissionYear_s, government_s,schemaType:schemaType_s,countryRegions_ss',
                        fieldQuery  : _.uniq(queryOptions.tagQueries),
                        query       : queryOptions.query||undefined,
                        
                        rowsPerPage    : pageSize
                    }
                    return fetchRecords(query, {rows:[], pageNumber:0})
                        .then(function(result){
                                queryCanceler   = null;                               
                                pivotResult     = result;
                                pivotUI(pivotResult);

                                return result.rows;

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

                function executeQuery(query){
                    return searchService.list(query, queryCanceler.promise)
                    .then(function(result){
                        var data = (result.data.response.docs);        
                        data = _.map(data, function(row){

                            // $scope.onRecordFormatting({row:row});
                            if(row.Year)
                                row.Year = row.Year.replace(/([a-z]+)?_/i, '')
                            
                            var region;
                            if(row.government_s){
                                region = _.find(regions, function(reg){
                                    return _.includes(reg.narrowerTerms, row.government_s)
                                });
                            }

                            return {
                                Government       :   row.Government||'x - Reference record',
                                Year             :   row.Year,
                                ["Record Type"]  :   row.RecordType,
                                Region           :   region ? region.title[locale] : 'No Region',
                                ["Schema Type"]  :   row.schemaType.replace(/[a-z]/, function(match){ return match.toUpperCase()})
                            }
                        });

                        return { rows : data, numFound:result.data.response.numFound };
                    }); 
                }

                function fetchRecords(query, result){
                    var message = '';
                    if(result.numFound>0)
                        message = query.start + " of " + result.numFound;
                    $scope.matrixProgress += '<br/>' + message;
                         
                    query.start = result.pageNumber * pageSize;
                    
                    return executeQuery(query)
                            .then(function(data){
                                result.rows         = _.union(result.rows, data.rows);
                                result.numFound     = data.numFound;
                                result.pageNumber  += 1;
                                if(result.rows.length < result.numFound){
                                    return fetchRecords(query, result);
                                }

                                return result;
                            });
                }

                function loadRegions(){
                    var DefaultRegions = [
                        "D50FE62D-8A5E-4407-83F8-AFCAAF708EA4", // CBD Regional Groups - Africa
                        "5E5B7AA4-2420-4147-825B-0820F7EC5A4B", // CBD Regional Groups - Asia and the Pacific
                        "942E40CA-4C23-4D3A-A0B4-736CD0EFCD54", // CBD Regional Groups - Central and Eastern Europe
                        "3D0CCC9A-A0A1-4399-8FA2-41D4D649DB0E", // CBD Regional Groups - Latin America and the Caribbean
                        "0EC2E5AE-25F3-4D3A-B71F-8019BB62ED4B"  // CBD Regional Groups - Western Europe and Others
                    ];
                    var regionsQuery = _.map(DefaultRegions, function(region){return thesaurusService.getTerms(region, {relations:true})})
                    
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
                                var btn = $element.find('.modebar-container .modebar .modebar-group .modebar-btn:first()')[0]
                                btn.click()
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
                            rows: ["Government"],
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

