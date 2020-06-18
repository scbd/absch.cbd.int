define(['app', 'text!views/search/search-results/group-view.html','lodash',
'views/search/search-results/result-grouped-national-record','services/search-service','views/directives/party-status',
'views/search/search-results/result-default'
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
                    var fieldMapping = groupFieldMappings(groupField);

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
                    var additionalFields = _.map(fieldMapping, function(f){return f.titleField+'_groupTitle:'+f.titleField}).join(', ')
                    if(realm.is('BCH')){
                        additionalFields    += ' traitDiseasesResistance_b,traitHerbicidesResistance_b,traitPhysiologyChanges_b,traitQualityChanges_b,traitMedicalProduction_b,traitOther_b'
                        additionalFields    += ',scopeRelease_b,scopeFood_b,scopeFeed_b,scopeProcessing_b,scopeConfined_b,scopeOther_b'
                    }
                    //'schema_s_groupTitle:schema_EN_t, government_s_groupTitle:government_EN_t';
                    //'schema_s', 'government_s', 

                    var lQuery = {
                        fieldQuery     : options.tagQueries,
                        query          : options.query||undefined,
                        rowsPerPage    : $scope.searchResult.rowsPerPage,
                        currentPage : pageNumber - 1,
                        facet       :true,
                        facetFields : options.facetFields,
                        groupField : groupField,
                        groupLimit : 10,
                        additionalFields     : additionalFields,
                        highlight           : options.highlight,
                        highlightFields     : options.highlightFields
                    }

                    if(sortFields && !_.contains(sortFields, 'relevance asc')){
                        lQuery.sort         = sortFields.join(', ');
                        lQuery.groupSort    = sortFields.join(', ');
                    }

                    queryCanceler = $q.defer();
        
                    return searchService.group(lQuery, queryCanceler)
                        .then(function (result) {

                            queryCanceler = null;
                            $scope.searchResult.rawDocs = [];
    
                            var countryRecords = {}
                            
                            _.each(result.data.grouped[groupField].groups, function (record) {
                                // if(groupField == 'government_schema_s'){
                                    var gpDetails = (record.groupValue || 'other').split('_');
                                    if (!gpDetails.length)
                                        return;
                                    
                                    var group = {}
                                    for (var i=0; i<gpDetails.length; i++) {
                                        var groupValue = gpDetails[i];
                                        group[groupValue] = {}
                                        group[groupValue].levelKey = groupValue;
                                        group[groupValue].field = fieldMapping[i].field;
                                        group[groupValue].level = i+1;
                                        group[groupValue].title = record.doclist.docs[0][fieldMapping[i].titleField + '_groupTitle']||groupValue;

                                        if(fieldMapping[i].field == 'government' && (groupValue!='reference' && groupValue!='scbd')){
                                            group[groupValue].partyStatus = true;
                                            group[groupValue].href = '/countries/' + (groupValue||'').toUpperCase()
                                        }

                                        if(gpDetails.length-1 == i){ //add docs to the last group field
                                            group[groupValue] = _.extend(group[groupValue], record.doclist);
                                            if(result.data.highlighting){
                                                _.each(group[groupValue].docs, function(doc){
                                                    if(!_.isEmpty(result.data.highlighting[doc.id]))
                                                        doc.highlight = result.data.highlighting[doc.id];
                                                });
                                            }
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
                                    if(gpDetails.length > 1)
                                        countryRecords[groupLevels.levelKey].numFound  = _.reduce(countryRecords[groupLevels.levelKey].subLevels, function(count, level){return count + level.numFound}, 0)
                                    else
                                        countryRecords[groupLevels.levelKey].numFound  = groupLevels.numFound;
                                // }
                                // else{                                    
                                //     countryRecords[record.groupValue] = {}
                                //     countryRecords[record.groupValue].levelKey = record.groupValue;
    
                                //     countryRecords[record.groupValue].title = record.doclist.docs[0][groupField+'_groupTitle'];
                                //     countryRecords[record.groupValue] = _.extend(countryRecords[record.groupValue], record.doclist);
                                // }
    
                            });
                            $scope.searchResult.docs        = _.values(countryRecords);
                            $scope.searchResult.recordsFound= result.data.grouped[groupField].matches;
                            $scope.searchResult.numFound    = result.data.grouped[groupField].ngroups;
                            $scope.searchResult.pageCount   = Math.ceil(result.data.grouped[groupField].ngroups / $scope.searchResult.rowsPerPage);
                            $scope.searchResult.query       = lQuery.query;
                            $scope.searchResult.sortBy      = lQuery.sort;
                            $scope.searchResult.facetFields = lQuery.facetFields;
                            $scope.searchResult.currentPage = pageNumber;
                            
                            $scope.searchResult.groupOptions= options;
                            $scope.searchResult.groupSort = lQuery.groupSort

                            $scope.searchResult.facets      = searchDirectiveCtrl.sanitizeFacets(result.data.facet_counts)
                            
                            

                            return $scope.searchResult;
    
                        })
                        .catch(function(e){
                            $scope.searchResult.docs     = []
                            $scope.searchResult.numFound = 0
                            $scope.searchResult.pageCount= 0
                            $scope.searchResult.facets   = undefined;
                            scope.searchResult.recordsFound= 0
                            throw e;
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
                    $scope.searchResult.currentPage = 1; //reset to page 1              
                    $scope.onPageChange($scope.searchResult.currentPage);
                }

                $scope.loadDocument = function(doc){
                    doc.showDoc =!doc.showDoc;
                    $timeout(function(){
                        $scope.recordLoader.api.loadDocument(doc.schema_s, doc.identifier_s);
                    },10)
                };


                $scope.loadRecords = function(group, number){
                    group.isLoading = true;
                    var recQuery = $scope.searchResult.query;
                    
                    if(recQuery=="''") 
                        recQuery = groupFieldQuery(group)
                    else 
                        recQuery += ' AND (' + groupFieldQuery(group) + ')'
                    var query = {
                        query   : recQuery,
                        sort    : $scope.searchResult.groupSort,
                        rowsPerPage    : number||5000,
                        start          : number ? undefined : (group.start==0 ? 10 : group.start),
                        currentPage    : group.start==0 ? 1 : Math.ceil((group.start+number)/10),
                        highlight           : $scope.searchResult.groupOptions.highlight,
                        highlightFields     : $scope.searchResult.groupOptions.highlightFields
                        
                    }
                    return searchService.list(query)
                    .then(function(result){
                        group.start = query.currentPage*10;

                        if(result.data.highlighting){
                            _.each(result.data.response.docs, function(doc){
                                if(!_.isEmpty(result.data.highlighting[doc.id]))
                                    doc.highlight = result.data.highlighting[doc.id];
                            });
                        }
                        
                        group.docs = group.docs.concat(result.data.response.docs)
                    })
                    .finally(function(){
                        group.isLoading = false;
                    })

                }

                function groupFieldQuery(group){
                    var parentField = '';
                    if(group.parent)
                        parentField =  groupFieldQuery(group.parent);
                    
                    if(group.levelKey!='reference' && group.levelKey!='scbd')
                        return (group.field + '_s:' + group.levelKey + (parentField.length ? ' AND ': '') + parentField)||'';
                    
                    return parentField;

                }

                function groupFieldMappings(groupField){
                    var fieldMapping = [];
                    var groupFields = groupField.replace(/_s$/, '').split('_')
                    groupFieldMapping = searchDirectiveCtrl.groupByFields();
                    _.each(groupFields, function(f){
                        field = _.find(groupFieldMapping, {field:f})
                        if(field)
                            fieldMapping.push(field);
                    })

                    return fieldMapping;
                }

            }
        };
    }]);
});
