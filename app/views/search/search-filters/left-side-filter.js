define(['app', 'text!views/search/search-filters/left-side-filter.html','lodash', 'ngDialog',
'components/scbd-angularjs-services/services/utilities'],  function(app, template, _) {

    app.directive('leftSideFilter', ['ngDialog', 'Thesaurus', function(ngDialog, thesaurus) {
        return {
            restrict: 'EA',
            replace: true,
            require:'^searchDirective',
            template: template, 
            scope: false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
                // $scope.leftMenuFilters = {}
                
                $scope.onSchemaFilterChanged = function(schema, selected){
                    if(!selected){
                        if($scope.leftMenuFilters)
                            $scope.leftMenuFilters[schema] = undefined;
                        $scope.leftMenuFilters = _.omit($scope.leftMenuFilters, _.isUndefined);
                        if(_.isEmpty($scope.leftMenuFilters))
                            $scope.leftMenuFilters = undefined;
                    }
                    else{

                        var fieldMappings = angular.copy(searchDirectiveCtrl.getSchemaFieldMapping(schema));
                       
                        if(!_.isEmpty(fieldMappings)){
                            if(!$scope.leftMenuFilters)
                                $scope.leftMenuFilters = {};
                            $scope.leftMenuFilters[schema] = fieldMappings
                        }
                    }
                    return $scope.leftMenuFilters;
                }

                $scope.showFilterDialog = function(schema, filter, facets){
                    ngDialog.open({
                        template : 'filtersDialog',
                        className: 'search-filters ngdialog-theme-default wide',
                        controller: ['$scope', '$timeout', 'thesaurusService', function($scope, $timeout, thesaurusService){
                            
                            $scope.treeViewSelected = [];
                            $scope.schema = schema;
                            $scope.filter = filter;
                            $scope.facets = facets;
                            var options;
                            _.each(filter.selectedItems, function(option){
                                if(filter.type == 'thesaurus' || filter.type == 'customFn')
                                    $scope.treeViewSelected.push({identifier:option.identifier});
                            });

                            $scope.treeOptions = function(){ 
                                var dataSource;
                                if(filter.type == "thesaurus"){
                                    dataSource = thesaurusService.getDomainTerms(filter.term)
                                }
                                else if(filter.type == 'customFn')
                                    dataSource = searchDirectiveCtrl[filter.fn]();

                                return  dataSource.then(function(data){return options = data;})
                            };

                            $scope.closeDialog = function(){
                                ngDialog.close();
                            }
                            $scope.apply = function(){

                                var selectedItems = {};
                                _.each($scope.treeViewSelected, function(item){
                                    selectedItems[item.identifier] = _.find(options, {identifier:item.identifier});
                                })
                                updateBaseFilter(selectedItems, schema, filter);
                                ngDialog.close();
                            }

                        }]
                    })

                    function updateBaseFilter(selectedItems, schema, field){
                        var filter = _.find($scope.leftMenuFilters[schema], {title:field.title})
                        filter.selectedItems = selectedItems;
                        searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters)
                    }
                }

                $scope.ngRepeatFinished = function(){
                    $element.find('[data-toggle="tooltip"]').tooltip();
                }

                $scope.removeSchemaFilters = function(option, filter){
                    $element.find('#'+option.identifier).tooltip('hide')
                    delete filter.selectedItems[option.identifier];

                    searchDirectiveCtrl.onLeftFilterUpdate($scope.leftMenuFilters)
                }
            }
        };
    }]);
});
