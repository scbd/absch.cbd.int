﻿define(['app', 'text!views/search/search-filters/left-side-filter.html', 'lodash', 'ngDialog',
    'components/scbd-angularjs-services/services/utilities'], function (app, template, _) {

        app.directive('leftSideFilter', ['ngDialog', 'Thesaurus', 'locale', function (ngDialog, thesaurus, locale) {
            return {
                restrict: 'EA',
                replace: true,
                require: '^searchDirective',
                template: template,
                scope: false,
                link: function ($scope, $element, $attrs, searchDirectiveCtrl) {
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
                    $scope.clearLeftMenuFilters = function () {
                        $scope.leftMenuFilters = undefined;
                    }

                    $scope.showFilterDialog = function (schema, filter, facets) {
                        ngDialog.open({
                            template: 'filtersDialog',
                            className: 'search-filters ngdialog-theme-default wide',
                            controller: ['$scope', '$timeout', 'thesaurusService', 'searchService', function ($scope, $timeout, thesaurusService, searchService) {

                                $scope.treeViewSelected = [];
                                $scope.schema = schema;
                                $scope.filter = filter;
                                $scope.facets = facets;
                                var options;
                                _.each(filter.selectedItems, function (option) {
                                    if (filter.type == 'thesaurus' || filter.type == 'customListFn')
                                        $scope.treeViewSelected.push({ identifier: option.identifier });
                                });

                                $scope.treeOptions = function () {
                                    var dataSource;
                                    if (filter.type == "thesaurus") {
                                        dataSource = thesaurusService.getDomainTerms(filter.term)
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
                                $scope.apply = function () {

                                    var selectedItems = {};
                                    _.each($scope.treeViewSelected, function (item) {
                                        selectedItems[item.identifier] = _.find(options, { identifier: item.identifier });
                                    })
                                    updateBaseFilter(selectedItems, schema, filter);
                                    ngDialog.close();
                                }

                                function runSolrQuery(query) {
                                    var lQuery = {
                                        query: query.q,
                                        fields: query.fl,
                                        rowsPerPage: 100,
                                        currentPage: 0
                                    }
                                    return searchService.list(lQuery)
                                        .then(function (result) {
                                            return _.map(result.data.response.docs, function (item) {
                                                return {
                                                    identifier: item.identifier,
                                                    title: { en: item.title }
                                                }
                                            })
                                        });
                                }

                            }]
                        })

                        function updateBaseFilter(selectedItems, schema, field) {
                            var filter = _.find($scope.leftMenuFilters[schema], { title: field.title })
                            filter.selectedItems = selectedItems;
                            searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters)
                        }
                    }

                    $scope.ngRepeatFinished = function () {
                        $element.find('[data-toggle="tooltip"]').tooltip();
                    }

                    $scope.removeSchemaFilters = function (option, filter) {
                        if(filter.type=='solrRecords'){
                            var index = _.findIndex(filter.selectedItems, function(item){ return item.identifier == option.identifier_s + '@' + option._revision_i });
                            filter.selectedItems.splice(index, 1);
                        }
                        else{
                            $element.find('#' + option.identifier).tooltip('hide')
                            delete filter.selectedItems[option.identifier];
                        }

                        searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters)
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
                        var key = _.keys(filter.selectedItems).length + 1
                        filter.selectedItems[key] = { title: text, identifier: key };
                        searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters)
                        filter.searchKeyword = '';
                    }

                    $scope.recordSelected = function(item, filter){                        
                        searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters)
                    }


                    //load dependant directive
                    require(['views/forms/edit/document-selector'])
                }
            };
        }]);
    });
