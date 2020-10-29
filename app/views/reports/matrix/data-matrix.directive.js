define(['app', 'lodash', 'text!./data-matrix.directive.html', 
'components/scbd-angularjs-services/services/locale','services/search-service',
'views/directives/block-region-directive'], 
function(app, _, template) { 'use strict';

app.directive("matrixView", ["$q", "searchService", '$http', 'locale', '$route', 'realm', '$timeout',
function ($q, searchService, $http, locale, $route, realm, $timeout) {
	
		return{
			template:template,
			restrict:'EA',
			replace:true,
			scope:{ 
                'api' : '=',
                'onRecordFormatting'    : '&'
            },
			link($scope, $element){
                
                require(['pivottable', 'plotly.js', 'plotly-renderers']);
                var defaultMessage      = $element.find('#loadingMessage').text()
                $scope.matrixProgress   = defaultMessage;
                var pageSize        = 1000;
                var queryCanceler   = undefined;
				var regions         = []
                $scope.api          = {
                    updateResult : updateResult
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

                    $scope.loading = true;
                    queryOptions = queryOptions||{};
                    queryOptions.query   = queryOptions.query||'government_submissionYear_s:*';

                    var query = {
                        fields      : 'Government:government_EN_t,RecordType:schema_EN_t, Year:government_submissionYear_s, government_s,schemaType:schemaType_s',
                        fieldQuery  : _.uniq(queryOptions.tagQueries),
                        query       : queryOptions.query||undefined,
                        
                        rowsPerPage    : pageSize
                    }
                    return fetchRecords(query, {rows:[], pageNumber:0})
                        .then(function(result){
                                queryCanceler = null;
                                console.log(result);
                                var derivers = $.pivotUtilities.derivers;
                                var renderers = $.extend($.pivotUtilities.renderers, $.pivotUtilities.plotly_renderers);
                                $element.find("#output").pivotUI(
                                    result.rows, 
                                    {
                                        renderers: renderers,
                                        rows: ["Government"],
                                        cols: ["RecordType"],
                                        aggregatorName: "Count"
                                    }
                                );

                                return result.rows;

                        })
                        .catch(function(err){
                            if(err.xhrStatus!="abort")
                                throw err;
                        })
                        .finally(function(){
                            if(!queryCanceler)
                                $scope.loading = false;
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
                            
                            var region = _.find(regions, function(reg){
                                return _.contains(reg.narrowerTerms, row.government_s)
                            })
        
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
                    var regionsQuery = _.map(DefaultRegions, function(region){return $http.get('/api/v2013/thesaurus/terms/'+region+'?relations')})
                    
                    return $q.all(regionsQuery)
                            .then(function(regionData){
                                regions = _.map(regionData, function(region){return region.data;})
                            });
                }

                function init(){

                    loadRegions()
                                    
                }

                init();

			}
		}
		
    }]);

});