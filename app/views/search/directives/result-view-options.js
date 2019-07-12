define(['text!./result-view-options.html', 'app', 'lodash', 'ngDialog'], function (template, app, _) {
    'use strict';

    app.directive('resultViewOptions', ['$location', 'ngDialog', function ($location, ngDialog) {
        return {
            restrict: 'EA',
            template: template,
            scope: {
                sortFields: '=',                
                onSortByChange: '&?'
            },
            link: function ($scope, $element, $attr) {
               
                
                $scope.actionSetPage = function (n) {
                    if(n<1 || n>$scope.pageCount)
                        return;
                    $scope.onPageChange({
                        page: n
                    });                   
                }

                $scope.showSortDialog = function(){
                    var selectedFields = $scope.sortFields
                    ngDialog.open({
                        template : 'sortByDialog',
                        controller: ['$scope', function($scope){
                            $scope.sortByFields = [
                                {field:'relevance'    , title: 'Relevance' },
                                {field:'updatedDate_dt', title: 'Last Updated On' },
                                {field:'recordType'   , title: 'Record Type' },
                                {field:'country'      , title: 'Country'}
                            ]
                            $scope.selectedFields = _.filter($scope.sortByFields, function(field){
                                var has = _.includes(selectedFields, field.field)
                                if(has)
                                    field.selected = true;
                                return has;
                            });// || [];
                            $scope.selectField = function(field){                                
                                field.selected=!field.selected;

                                if(field.selected)
                                    $scope.selectedFields.push(field)
                                else{
                                    var index = _.indexOf($scope.selectedFields, _.find($scope.selectedFields, {field: field.field}));
                                    $scope.selectedFields.splice(index, 1);
                                }
                            }
                            $scope.closeDialog = function(){
                                ngDialog.close();
                            }
                            $scope.apply = function(){
                                onSortByChange($scope.selectedFields)
                                ngDialog.close();
                            }

                        }]
                    })
                }

                function onSortByChange(selectedFields){
                    $scope.sortFields = _.map(selectedFields, 'field');
                    $scope.onSortByChange({fields:$scope.sortFields})
                }

            }
        }
    }])

});
