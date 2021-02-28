define(['app', 'text!./left-side-filter.html', 'lodash', 'ngDialog',
    'components/scbd-angularjs-services/main', 'services/solr'], function (app, template, _) {

        app.directive('leftSideFilter', ['ngDialog', 'locale', 'solr', 'realm', function (ngDialog, locale, solr, realm) {
            return {
                restrict: 'EA',
                replace: true,
                require: '^searchDirective',
                template: template,
                scope: false,
                link: function ($scope, $element, $attrs, searchDirectiveCtrl) {
                    var freeTextKeys = 0;
                    // $scope.leftMenuFilters = {}
                    $scope.locale = locale;
                    $scope.onSchemaFilterChanged = function (schema, selected) {
                        if (!selected) {
                            if ($scope.leftMenuFilters)
                                $scope.leftMenuFilters[schema] = undefined;
                            $scope.leftMenuFilters = _.omit($scope.leftMenuFilters, _.isUndefined);
                            if (_.isEmpty($scope.leftMenuFilters))
                                $scope.leftMenuFilters = undefined;
                        }
                        else {

                            var fieldMappings = angular.copy(searchDirectiveCtrl.getSchemaFieldMapping(schema));

                            if (!_.isEmpty(fieldMappings)) {
                                if (!$scope.leftMenuFilters)
                                    $scope.leftMenuFilters = {};
                                $scope.leftMenuFilters[schema] = fieldMappings
                            }
                        }
                        return $scope.leftMenuFilters;
                    }

                    $scope.showFilterDialog = function (schema, filter, facets) {
                        ngDialog.open({
                            template: 'filtersDialog', 
                            className: 'search-filters ngdialog-theme-default wide',
                            controller: ['$scope', 'thesaurusService', 'searchService', function ($scope, thesaurusService, searchService) {

                                $scope.treeViewSelected = [];
                                $scope.schema = schema;
                                $scope.filter = filter;
                                $scope.facets = facets;
                                $scope.searchRelated = filter.searchRelated;
                                var options;
                                _.forEach(filter.selectedItems, function (option) {
                                    if (filter.type == 'thesaurus' || filter.type == 'solr' || filter.type == 'customListFn')
                                        $scope.treeViewSelected.push({ identifier: option.identifier });
                                });

                                $scope.treeOptions = function () {
                                    var dataSource;
                                    if (filter.type == "thesaurus") {
                                        var otherTerm = filter.otherTerm;
                                        if(otherTerm == undefined)
                                            otherTerm = true;
                                        dataSource = thesaurusService.getDomainTerms(filter.term, {other:otherTerm, narrowerOf: filter.narrowerOf})
                                                        .then(function(terms){ 
                                                            if(filter.without)
                                                                return _.filter(terms, function(type){return type.identifier!='B3699A74-EF2E-467A-A82F-EF2149A2EFC5'}); 
                                                            
                                                            return terms;
                                                        })
                                            
                                    }
                                    else if (filter.type == 'solr') {
                                        dataSource = runSolrQuery(filter.query);
                                    }
                                    else if (filter.type == 'customListFn')
                                        dataSource = searchDirectiveCtrl[filter.fn]();

                                    return dataSource.then(function (data) { return options = data; })
                                };

                                $scope.closeDialog = function () {
                                    ngDialog.close();
                                }
                                $scope.applyFilter = function () {

                                    var selectedItems = {};
                                    _.forEach($scope.treeViewSelected, function (item) {
                                        selectedItems[item.identifier] = _.find(options, { identifier: item.identifier });
                                    })
                                    updateBaseFilter(selectedItems, schema, filter, $scope.searchRelated);
                                    ngDialog.close();
                                }
                                $scope.onBeforeSearch = function(keyword){
                                    keyword = keyword.replace(/[0]/g, "Ø");
                                    return keyword;
                                }

                                function runSolrQuery(query) {
                                    var lQuery = {
                                        query: query.q,
                                        fields: query.fl,
                                        sort: query.s,
                                        rowsPerPage: 3000,
                                        currentPage: 0
                                    }
                                    return searchService.list(lQuery)
                                        .then(function (result) {
                                            return _(result.data.response.docs).map(function (item) {
                                                if(_.isArray(item.title)){
                                                    item.title = item.title.join(' | ')
                                                }
                                                return {
                                                    identifier: item.identifier,
                                                    title: { en: item.title }
                                                }
                                            }).sortBy('title.en').value()
                                        });
                                }

                            }]
                        })

                        function updateBaseFilter(selectedItems, schema, field, searchRelated) {
                            var filter = _.find($scope.leftMenuFilters[schema], { title: field.title })
                            filter.selectedItems = selectedItems;
                            filter.searchRelated = searchRelated;
                            searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters)
                        }
                    }

                    $scope.ngRepeatFinished = function () {                        
                        $element.find('[data-toggle="tooltip"]').tooltip();                       
                    }

                    $scope.removeSchemaFilters = function (option, filter) {
                        // $scope.ngRepeatFinished();
                        $element.find('#' + (option.identifier||option.identifier_s)).tooltip('destroy')
                        // $timeout(function(){
                            if(filter.type=='solrRecords'){
                                var index = _.findIndex(filter.selectedItems, function(item){ return item.identifier == option.identifier_s });//+ '@' + option._revision_i
                                filter.selectedItems.splice(index, 1);
                            }
                            else{
                                delete filter.selectedItems[option.identifier];
                            }

                            searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters);
                        // }, 300)
                        
                    }
                    $scope.RemoveLeftMenuFilters = function(){
                        $scope.leftMenuFilters = undefined;
                        searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters)
                    }
                    $scope.clearFilterOptions = function (schema, filter) {
                        if(filter){
                            clearFilterOptions(filter)
                        }
                        else{
                            var filters = $scope.leftMenuFilters[schema]
                            _.forEach(filters, clearFilterOptions);
                        }
                        searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters);
                    }

                    $scope.onFilterDateChange = function (val) {                        
                        searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters);
                    }

                    $scope.clearFilterDate = function (filter) {
                        filter.filterValue = undefined;
                        searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters);
                    }

                    $scope.saveSchemaFreeText = function (filter, text) {
                        if (!filter.selectedItems)
                            filter.selectedItems = {};
                        freeTextKeys++;
                        filter.selectedItems[freeTextKeys] = { title: text, identifier: freeTextKeys };
                        searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters)
                        filter.searchKeyword = '';
                    }

                    $scope.recordSelected = function(item, filter){                        
                        searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters)
                    }

                    $scope.hasItems = function(items){
                            return items && _.keys(items).length;
                    }

                    $scope.onBuildQuery = function(searchText, tab, filter){
                        console.log((searchText, tab, filter))
                        var lQueries = [];
                        var queries = {
                            fieldQueries : [],
                            query           : '*:*'
                        }

                        if(filter.query){
                            if(filter.query.fl)
                                queries.fields = filter.query.fl

                            if(filter.query.s)
                                queries.sort = filter.query.s

                            if(filter.query.fq)
                                queries.fieldQueries = filter.query.fq;

                            if((filter.query.q||'') != '')
                                lQueries.push(filter.query.q)
                        }
                  
                        queries.fieldQueries.push('realm_ss:'+solr.escape(realm.value))
                                    
                        if((searchText||'')!=''){
                            var queryText;
                            var searchFields = filter.query.searchFields||['text_EN_txt'];

                            if(searchText.indexOf('-')>0) 
                                queryText = '"' + solr.escape(searchText) + '"'; // Add quotes if text contains - especially if search is by uid
                            else
                                queryText = '(' + solr.escape(searchText) + ')';
                              
                            var freeTextQuery   = _.map(searchFields, function(field, i){
                                                    return field + ':' + queryText + '^' + ((searchFields.length-i)+1);
                                                }).join(' OR ');

                            lQueries.push(freeTextQuery);
                        }

                        if(lQueries.length)
                            queries.query = solr.andOr(lQueries, 'AND')
                        
                        return queries;
                    }

                    function clearFilterOptions(filter){
                        if(filter.type!='solrRecords'){
                            _.forEach(filter.selectedItems, function(item){
                                $element.find('#' + item.identifier).tooltip('hide')
                            })
                        }
                        else{
                            $scope.$broadcast('event:remove-selected-records', {instanceId:filter.$$hashKey});
                        }
                        filter.selectedItems = {};
                    }

                    //load dependant directive
                    require(['views/forms/edit/document-selector'], function(){})
                }
            };
        }]);
    });
