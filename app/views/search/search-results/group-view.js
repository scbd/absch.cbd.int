define(['app', 'text!views/search/search-results/group-view.html','lodash',
'views/search/search-results/result-grouped-national-record','services/search-service','views/directives/party-status',
], function(app, template, _) {

    app.directive('searchResultGroupView', ['searchService', 'realm', '$timeout', '$location', '$q', function(searchService, realm, $timeout, $location, $q) {
        return {
            restrict: 'EAC',
            replace: true,
            require:'^searchDirective',
            template: template, 
            scope: {
                api:'='
            },
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
                var queryCanceler;
                
                $scope.recordLoader = {};
                $scope.api = {
                    updateResult : updateResult
                };
                $scope.searchResult = {
                    schemas    : realm.schemas,
                    currentPage: 1,
                    pageCount  : 0,
                    rowsPerPage: 25
                } 
                // ,                    sortBy     : 'updatedDate_dt desc'
                function updateResult(options, sort, pageNumber){
                   
                    $scope.loading = true;
                    if(pageNumber==undefined)
                        pageNumber = $scope.searchResult.currentPage;

                    // TODO create mapping, need to be redone
                    var groupMapping
                    var groupFieldMapping = searchDirectiveCtrl.combinationField(options.groupByFields);
                    var groupField = groupFieldMapping.groupField;

                    var sortBy = 'government_EN_s asc';
                    var sortFields = sort||$scope.searchResult.sortFields||[];
                    if(typeof sortFields == 'string')
                        sortFields = [sortFields];

                    if(sortFields.length <= 1){
                        var field = _.first(sortFields)
                        if(!field || field.indexOf('updatedDate_dt')>0){
                            sortFields = groupFieldMapping.sortFields;
                        }
                        
                    }
                    var lQuery = {
                        fieldQuery     : options.tagQueries,
                        query          : options.query||undefined,
                        rowsPerPage    : $scope.searchResult.rowsPerPage,
                        currentPage : pageNumber - 1,
                        facet       :true,
                        facetFields : ['{!ex=sch}schema_s', '{!ex=gov}government_s', '{!ex=key}all_terms_ss', '{!ex=reg}government_REL_ss'],
                        groupField : groupField,
                        groupLimit : 10,
                        groupSort  : sortFields.join(', '),
                        sort       : sortFields.join(', '),
                        additionalFields     : 'schema_s_groupTitle:schema_EN_t, government_s_groupTitle:government_EN_t'
                    }
                    //'schema_s', 'government_s', 

                    queryCanceler = $q.defer();
        
                    return searchService.group(lQuery, queryCanceler)
                        .then(function (result) {

                            queryCanceler = null;
                            $scope.searchResult.rawDocs = [];
    
                            var countryRecords = {}
                            _.each(result.data.grouped[groupField].groups, function (record) {
                                if(groupField == 'government_schema_s'){
                                    var fieldMapping = ['government_s', 'schema_s']
                                    var gpDetails = (record.groupValue || '').split('_');
                                    if (!gpDetails.length)
                                        return;
                                    
                                    var group = {}
                                    for (var i=0; i<gpDetails.length; i++) {
                                        var groupValue = gpDetails[i];
                                        group[groupValue] = {}
                                        group[groupValue].levelKey = groupValue;
                                        group[groupValue].field = fieldMapping[i];
                                        group[groupValue].level = i+1;
                                        group[groupValue].title = record.doclist.docs[0][fieldMapping[i]+'_groupTitle'];

                                        if(i==0){
                                            group[groupValue].partyStatus = true;
                                            group[groupValue].href = '/countries/' + (groupValue||'').toUpperCase()
                                        }

                                        if(gpDetails.length-1 == i){ //add docs to the last group field
                                            group[groupValue] = _.extend(group[groupValue], record.doclist);
                                        }
                                        if(i>0){
                                            var prevLevel = group[gpDetails[i-1]] //get prev group and add the current as sub-level
                                            group[groupValue].parent = prevLevel; //set parent for future traversing.
                                            prevLevel.subLevels = [group[groupValue]];
                                        }                                       
                                    }
                                    var groupLevels = _.find(group, {level:1});
                                    
                                    if(!countryRecords[groupLevels.levelKey])
                                        countryRecords[groupLevels.levelKey] = groupLevels;
                                    else{                                        
                                        countryRecords[groupLevels.levelKey].subLevels = _(countryRecords[groupLevels.levelKey].subLevels||[]).concat(groupLevels.subLevels||[]).value();
                                    }
                                    countryRecords[groupLevels.levelKey].numFound  = _.reduce(countryRecords[groupLevels.levelKey].subLevels, function(count, level){return count + level.numFound}, 0)
                                }
                                else{                                    
                                    countryRecords[record.groupValue] = {}
                                    countryRecords[record.groupValue].levelKey = record.groupValue;
    
                                    countryRecords[record.groupValue].title = record.doclist.docs[0][groupField+'_groupTitle'];
                                    countryRecords[record.groupValue] = _.extend(countryRecords[record.groupValue], record.doclist);
                                }
    
                            });
                            $scope.searchResult.docs        = _.values(countryRecords);
                            $scope.searchResult.recordsFound= result.data.grouped[groupField].matches;
                            $scope.searchResult.numFound    = result.data.grouped[groupField].ngroups;
                            $scope.searchResult.pageCount   = Math.ceil(result.data.grouped[groupField].ngroups / $scope.searchResult.rowsPerPage);
                            $scope.searchResult.query       = lQuery.query;
                            $scope.searchResult.sortBy      = lQuery.sort;
                            $scope.searchResult.currentPage = pageNumber;
                            
                            $scope.searchResult.groupOptions= options;
                            $scope.searchResult.groupSort = lQuery.groupSort

                            $scope.searchResult.facets      = {
                                schemas   : result.data.facet_counts.facet_fields['schema_s'], 
                                keywords  : result.data.facet_counts.facet_fields['all_terms_ss'],
                                countries : result.data.facet_counts.facet_fields['government_s'], 
                                regions   : result.data.facet_counts.facet_fields['government_REL_ss']
                            }
                            
                            return $scope.searchResult;
    
                        })
                        .finally(function(){
                            $scope.loading = false;
                        })
                }

                $scope.onPageChange = function(pageNumber){
                    updateResult($scope.searchResult.groupOptions, $scope.searchResult.sort, pageNumber);
                    $location.search('currentPage',pageNumber);
                    $location.search('rowsPerPage',$scope.searchResult.rowsPerPage)
                }

                $scope.onPageSizeChanged = function(size){
                    $scope.searchResult.rowsPerPage = size;                    
                    $scope.onPageChange($scope.searchResult.currentPage);
                }

                $scope.loadDocument = function(doc){
                    doc.showDoc =!doc.showDoc;
                    $timeout(function(){
                        $scope.recordLoader.api.loadDocument(doc.schema_s, doc.identifier_s);
                    },10)
                };


                $scope.loadRecords = function(group, number){
                    console.log(group, number)
                    group.isLoading = true;
                    var query = {
                        query   : $scope.searchResult.query + ' AND (' + groupFieldQuery(group) + ')',
                        sort    : $scope.searchResult.groupSort,
                        rowsPerPage    : number||5000,
                        start          : number ? undefined : (group.start==0 ? 10 : group.start),
                        currentPage    : group.start==0 ? 1 : Math.ceil((group.start+number)/10)
                    }
                    return searchService.list(query)
                    .then(function(result){
                        group.start = query.currentPage*10;
                        
                        group.docs = group.docs.concat(result.data.response.docs)
                    })
                    .finally(function(){
                        group.isLoading = false;
                    })

                }

                function groupFieldQuery(group){
                    var parentField = '';
                    if(group.parent)
                        parentField = ' AND ' + groupFieldQuery(group.parent);

                    return (group.field + ':' + group.levelKey + parentField)||'';

                }

            }
        };
    }]);
});
