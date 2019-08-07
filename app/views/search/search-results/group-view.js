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

                    var groupField = 'government_s';//'governmentSchemaIdentifier_s'
                    if(options.groupByFields){
                        if(~options.groupByFields.indexOf('government_s') && ~options.groupByFields.indexOf('schema_s'))
                            groupField = 'governmentSchemaIdentifier_s';
                        else if(~options.groupByFields.indexOf('government_s'))
                            groupField = 'government_s';
                        else if(~options.groupByFields.indexOf('schema_s'))
                            groupField = 'schema_s';
                    }
                   
                    var lQuery = {
                        query       : options.query,
                        rowsPerPage : $scope.searchResult.rowsPerPage,
                        currentPage : pageNumber - 1,
                        facet       :true,
                        facetFields : ['all_terms_ss', 'government_REL_ss'],
                        groupField : groupField,
                        groupLimit : 10,
                        groupSort  : groupField + ' asc',
                        sort       : groupField + ' asc',
                        additionalFields     : 'schema_s_groupTitle:schema_EN_t, government_s_groupTitle:government_EN_t'
                    }
                    //'schema_s', 'government_s', 
                    if(sort)
                        lQuery.sort    = $scope.searchResult.sort = sort;

                    queryCanceler = $q.defer();
        
                    return searchService.group(lQuery, queryCanceler)
                        .then(function (result) {

                            queryCanceler = null;
                            $scope.searchResult.rawDocs = [];
    
                            var countryRecords = {}
                            _.each(result.data.grouped[groupField].groups, function (record) {
                                if(groupField == 'governmentSchemaIdentifier_s'){
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

                            $scope.searchResult.facets      = _.extend(result.data.facet_counts.facet_fields['all_terms_ss'], 
                                                                    result.data.facet_counts.facet_fields['government_REL_ss'])
                            
                            return $scope.searchResult;
    
                        })
                        .finally(function(){
                            $scope.loading = false;
                        })
                }

                $scope.onPageChange = function(pageNumber){
                    updateResult($scope.searchResult.groupOptions, $scope.searchResult.sort, pageNumber);
                    $location.search({
                        currentPage:pageNumber,
                        rowsPerPage:$scope.searchResult.rowsPerPage
                    })
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