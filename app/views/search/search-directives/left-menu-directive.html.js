define(['app', '/app/js/common.js', '/app/js/thesaurus-service.js'], function (app) {
    app.directive('searchLeftMenu', function () {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/search/search-directives/left-menu-directive.html',
            replace: true,
            scope: {
            },
            link: function ($scope, element, attrs, ngModelController) {
            },
            controller: ['$scope', '$element', 'thesaurusService',
                function ($scope, $element, thesaurusService) {

                    $scope.buildQuery = function () {
                        var conditions = [];
                        buildConditions(conditions, $scope.terms);

                        if($scope.focalPointQuery!='')
                            conditions.push($scope.focalPointQuery);
                        var keywordQuery = '';

                        if($scope.keyword){
                            keywordQuery = ' AND (title_t:*' + $scope.keyword + '* OR description_t:*' + $scope.keyword + '* OR text_EN_txt:*' + $scope.keyword + '* OR uniqueIdentifier_s:*' + $scope.keyword.toLowerCase() + '*)';
                        }

                        if(conditions.length==0) {
                            //$scope.query = '*:*';

                            var nationalSchema = [ "absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database","focalPoint"];
                            var referenceSchema= [ "resource", "meeting", "notification","pressRelease","statement" , "news", "modelContractualClause"];

                            var q = '(realm_ss:' + realm.value.toLowerCase() + ') AND NOT version_s:*';
                            var schema = nationalSchema;
                            if($scope.recordType == 'reference'){
                                schema = referenceSchema;
                                $scope.previewType = 'list';
                            }
                            q += keywordQuery
                            q += ' AND (schema_s:(' + schema.join(' ') + '))';
                            q += $scope.queryPartyStatus!='' ? ('AND (' + $scope.queryPartyStatus + ')') : '';
                            $scope.query = q;
                        }
                        else {
                            var query = '';
                            conditions.forEach(function (condition) { query = query + (query=='' ? '( ' : ' OR ') + condition; });
                            query += ' )';
                            $scope.query = query + keywordQuery  + ($scope.queryPartyStatus!='' ? ('AND (' + $scope.queryPartyStatus + ')') : '');
                            //console.log (query);
                        }
                       // console.log ($scope.query);
                    }

                    function buildConditions (conditions, items) {
                        $scope.selectedFilters=[];
                        items.forEach(function (item) {

                            if(item.selected && (($scope.showNationalFilters  && item.type=='nationalRecord') || ($scope.showReferenceFilters  && item.type=='reference'))){

                                $scope.selectedFilters.push({type:'schema', identifier:item.identifier, value:item.title, count:item.count});

                                var subFilterQuery = '(' + $scope.field+':'+item.identifier;
                                if(item.subFilters){
                                    item.subFilters.forEach(function(filter){
                                        if(filter.type=='select' || filter.type=='multiselect'){
                                            if( $scope[filter.name] && $scope[filter.name].length > 0){


                                                var selectedValues = $scope[filter.name];
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
                                                })
                                            }
                                        }
                                        else if(filter.type=='calendar'){
                                                var selectedValues = $scope[filter.name];
                                                if(selectedValues != '*:*'){
                                                    subFilterQuery = subFilterQuery + ' AND ' + selectedValues;
                                                    var dateString = $scope[filter.name + 'Api'].getDateString();
                                                    $scope.selectedFilters.push({
                                                                type:'subFilter', schema:item.identifier, value:dateString, identifier:filter.name
                                                            });
                                                }
                                        }
                                        else if(filter.type=='radio'){
                                            var selectedValues = $scope[filter.name];

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
                                            var selectedValues = $scope[filter.name];
                                            var query = buildFocalPointQuery();

                                            if(selectedValues && query!='' && subFilterQuery.indexOf(query) ==-1){
                                                subFilterQuery = subFilterQuery + ' AND ' +  query;
                                            }
                                        }
                                        else {
                                            if($scope[filter.name]!=null){
                                                subFilterQuery = subFilterQuery + ' AND ('  + filter.field +':'+  $scope[filter.name] + ')';

                                                $scope.selectedFilters.push({
                                                            type:'subFilter', schema:item.identifier, value:filter.name + '(' + $scope[filter.name] + ')', identifier:filter.name
                                                        });
                                            }
                                        }
                                    });
                                }

                              subFilterQuery = subFilterQuery + ')'
                        //console.log(subFilterQuery);
                                conditions.push(subFilterQuery);
                            }
                        });


                    }



                }]
        }
    });
});
