define(['app',
        '/app/views/search/search-directives/national-records-filter-directive.html.js',
        '/app/js/common.js', '/app/services/thesaurus-service.js'
        ], function (app) {
    app.directive('searchLeftMenu', function () {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/search/search-directives/left-menu-directive.html',
            //replace: true,
            require: '^searchDirective',
            scope: {
            },
            link: function ($scope, element, attrs, searchDirectiveCtrl) {
                $scope.searchDirectiveCtrl = searchDirectiveCtrl;
            },
            controller: ['$scope', '$element', 'thesaurusService', 'realm',
                function ($scope, $element, thesaurusService, realm) {

                    this.actions = {
                        buildQuery : buildQuery
                    };

                    function buildQuery(filters, schemas) {
                        var conditions = [];
                        conditions = buildConditions(filters);

                        var query = '';
                        if(conditions.length===0) {

                            query = '(realm_ss:' + realm.value.toLowerCase() + ') AND NOT version_s:*';
                            query += ' AND (schema_s:(' + schemas.join(' ') + '))';
                        }
                        else {
                            query = conditions.join(' OR ');
                        }
                       $scope.searchDirectiveCtrl.actions.query(query);
                    }

                    function buildConditions (items) {
                        var conditions = [];
                        $scope.selectedFilters=[];
                        _.each(items,function (item) {

                            if(item.selected){
                                // && (($scope.showNationalFilters  && item.type=='nationalRecord') || ($scope.showReferenceFilters  && item.type=='reference'))
                                $scope.selectedFilters.push({type:'schema', identifier:item.identifier, value:item.title, count:item.count});

                                var subFilterQuery = '(' + $scope.field+':'+item.identifier;
                                if(item.subFilters){
                                    item.subFilters.forEach(function(filter){
                                        var selectedValues;
                                        if(filter.type=='select' || filter.type=='multiselect'){
                                            if( $scope[filter.name] && $scope[filter.name].length > 0){

                                                selectedValues = $scope[filter.name];
                                                if(typeof selectedValues[0]== "object" )
                                                    selectedValues = _.pluck(selectedValues, "identifier");

                                                if(filter.type=='select' && !_.isArray(selectedValues))
                                                    selectedValues = [selectedValues];

                                                subFilterQuery = subFilterQuery + ' AND (' + filter.field +':('+ selectedValues.join(' ') + '))';

                                                _.each(selectedValues, function(value){
                                                    var selectedItem = $scope[filter.name + 'Api'].getItem(value);
                                                    $scope.selectedFilters.push({
                                                                type:'subFilter', schema:item.identifier, value:value, identifier:filter.name,
                                                                count: selectedItem && selectedItem.metadata ? selectedItem.metadata.facet : undefined,
                                                                isTerm : true
                                                            });
                                                });
                                            }
                                        }
                                        else if(filter.type=='calendar'){
                                                selectedValues = $scope[filter.name];
                                                if(selectedValues != '*:*'){
                                                    subFilterQuery = subFilterQuery + ' AND ' + selectedValues;
                                                    var dateString = $scope[filter.name + 'Api'].getDateString();
                                                    $scope.selectedFilters.push({
                                                                type:'subFilter', schema:item.identifier, value:dateString, identifier:filter.name
                                                            });
                                                }
                                        }
                                        else if(filter.type=='radio'){
                                            selectedValues = $scope[filter.name];

                                            if(selectedValues!=undefined && parseInt(selectedValues) != -2){//skipp All option
                                                if(parseInt(selectedValues) == -1)
                                                    subFilterQuery = subFilterQuery + ' AND NOT ' + filter.field + ':*';
                                                else{
                                                    var selectedText = selectedValues;
                                                    var selectedField = $('#btn' + filter.name + ' span:visible');
                                                    if(selectedField)
                                                        selectedText = selectedField.text();

                                                    subFilterQuery = subFilterQuery + ' AND (' + filter.field +':'+ selectedValues + ')';
                                                    $scope.selectedFilters.push({
                                                                type:'subFilter', schema:item.identifier, value:selectedText, identifier:filter.name
                                                            });
                                                }
                                            }
                                        }
                                        else if(filter.type=='checkbox'){
                                            selectedValues = $scope[filter.name];
                                            var query = buildFocalPointQuery();

                                            if(selectedValues && query!='' && subFilterQuery.indexOf(query) ==-1){
                                                subFilterQuery = subFilterQuery + ' AND ' +  query;
                                            }
                                        }
                                        else {
                                            if($scope[filter.name]!==null){
                                                subFilterQuery = subFilterQuery + ' AND ('  + filter.field +':'+  $scope[filter.name] + ')';

                                                $scope.selectedFilters.push({
                                                            type:'subFilter', schema:item.identifier, value:filter.name + '(' + $scope[filter.name] + ')', identifier:filter.name
                                                        });
                                            }
                                        }
                                    });
                                }

                              subFilterQuery = subFilterQuery + ')';
                        //console.log(subFilterQuery);
                                conditions.push(subFilterQuery);
                            }
                        });
                        return conditions;
                    }



                }]
        }
    });
});
