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
                    console.log(schema);
                    if(!selected){
                        if($scope.leftMenuFilters)
                            $scope.leftMenuFilters[schema] = undefined;
                        $scope.leftMenuFilters = _.omit($scope.leftMenuFilters, _.isUndefined);
                        if(_.isEmpty($scope.leftMenuFilters))
                            $scope.leftMenuFilters = undefined;
                    }
                    else{

                        var filters = {};
                        _.each($scope.searchFilters, function(filter){ 
                            if(filter.related && ~filter.related.indexOf(schema)){
                                // filter.facet = $scope.$parent.searchResult.data.facets[filter.id];
                                if(!filters[filter.parent])
                                    filters[filter.parent] = [];

                                filter.selected = $scope.isFilterOn(filter.id);
                                filter.facet    = ($scope.searchResult.data.facets.keywords||{})[filter.id]||0;
                                filters[filter.parent].push(filter);
                            }
                        });
                        if(!_.isEmpty(filters)){
                            if(!$scope.leftMenuFilters)
                                $scope.leftMenuFilters = {};
                            $scope.leftMenuFilters[schema] = filters
                        }
                    }

                }

                $scope.showFilterDialog = function(schema, filterKey, options, facets, setFilters){
                    
                    ngDialog.open({
                        template : 'filtersDialog',
                        className: 'search-filters ngdialog-theme-default wide',
                        controller: ['$scope', '$timeout', function($scope, $timeout){
                            
                            $scope.selected = {};
                            $scope.options = options;
                            $scope.schema = schema;
                            $scope.filterKey = filterKey;
                            $scope.facets = facets;
                            $scope.view = 'list';

                            _.each(options, function(option){
                                if(setFilters[option.id])
                                    $scope.selected[option.id] = true;
                            });

                            $scope.showTree = function(){
                                if($scope.view == 'tree')
                                    return;

                                $scope.view = 'tree';
                                $scope.treeViewSelected = _.map($scope.selected, function(sel, key){return {identifier:key}});                                

                            }

                            $scope.showListView = function(){
                                if($scope.view == 'list')
                                    return;
                                $timeout(function(){
                                    $scope.view = 'list';
                                    $scope.selected = {};
                                    _.each($scope.treeViewSelected, function(item){ 
                                        $scope.selected[item.identifier] = true;
                                    })
                                }, 200);
                            }

                            $scope.treeOptions = function(){ 
                                var treeStructure = _.map(options, function(option){
                                    //opt.broader == option.id || 
                                    var narrowerTerms = _.filter(options, function(opt){return ~opt.broader.indexOf(option.id)})
                                    return {
                                        identifier: option.id, title: option.name, 
                                        narrowerTerms: _.map(narrowerTerms, 'id')
                                    }
                                });
                                return treeStructure
                            };

                            $scope.saveFilter = function(filter){
                                $scope.selected[filter.id] = !$scope.selected[filter.id]
                            }

                            $scope.closeDialog = function(){
                                ngDialog.close();
                            }
                            $scope.apply = function(){
                                // onSortByChange($scope.selectedFields)
                                var selectedItems = {};
                                if($scope.view == 'list')
                                    selectedItems = $scope.selected
                                else{
                                    _.each($scope.treeViewSelected, function(item){ 
                                        selectedItems[item.identifier] = true;
                                    })        
                                }
                                
                                _.each(selectedItems, function(item, key){//skip already selected filters
                                    if(item && setFilters[key])
                                        selectedItems[key] = undefined;
                                });

                                updateBaseFilter(selectedItems);
                                ngDialog.close();
                            }

                        }]
                    })

                    function updateBaseFilter(selectedItems){

                        _.each(selectedItems, function(item, key){ 
                            if(item!==undefined){
                                var filter = _.find(options, {id:key})
                                $scope.saveFilter(filter);
                            }
                        })
                    }
                }

                $scope.updateLeftFilterStatus = function(termID, selected){

                    filterMenu:
                        for (var menu in $scope.leftMenuFilters) {
                            for (var filter in $scope.leftMenuFilters[menu]) {
                                var options = $scope.leftMenuFilters[menu][filter];
                                for (var i=0; i<options.length; i++) {
                                    if(options[i].id == termID){
                                        options[i].selected = selected;
                                        // break filterMenu; //TODO loop for each schema
                                    }
                                }
                            }
                        }
                  
                }

                $scope.sortFilterOptions = function(item){
                    return $scope.setFilters[item.id];
                    // return $scope.isFilterOn(item.id)
                }
            }
        };
    }]);
});
