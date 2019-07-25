﻿define(['text!./result-view-options.html', 'app', 'lodash', 'ngDialog'], function (template, app, _) {
    'use strict';

    app.directive('resultViewOptions', ['$location', 'ngDialog', function ($location, ngDialog) {
        return {
            restrict: 'EA',
            template: template,
            scope: {
                viewType        : '=' ,
                sortFields      : '=' ,
                groupByFields   : '=' ,
                onSortByChange  : '&?',
                onViewTypeChange: '&?'
            },
            link: function ($scope, $element, $attr) {
               
            //    if(!$scope.viewType)
            //         $scope.viewType = 'list';

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
                                {field:'relevance'      , title: 'Relevance'       ,direction: 'asc'},
                                {field:'updatedDate_dt' , title: 'Last Updated On' ,direction: 'asc'},
                                {field:'schema_s'       , title: 'Record Type'     ,direction: 'asc'},
                                {field:'government_s'   , title: 'Country'         ,direction: 'asc'}
                            ]

                            _.each(selectedFields, function(field){
                                var splitField = field.split(' ')
                                var existing = _.find($scope.sortByFields, {field: splitField[0]})
                                if(existing){
                                    existing.selected = true;
                                    existing.direction = splitField[1];
                                    if(!$scope.selectedFields) $scope.selectedFields = [];
                                    $scope.selectedFields.push(existing)
                                }
                            });

                            $scope.selectField = function(field,direction){  
                                if(!direction)                              
                                    field.selected=!field.selected;

                                field.direction=direction||'asc';
                                if(field.selected){
                                    var existing = _.find($scope.selectedFields, {field: field.field})
                                    if(existing)
                                        existing.direction = field.direction
                                    else
                                        $scope.selectedFields.push(field)
                                }
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

                $scope.viewTypeChange = function(type){
                    if(type == 'list'){
                        $scope.onViewTypeChange({viewType:type})
                    }
                    if(type == 'group'){
                        showGroupByDialog()
                    }
                    else{
                        
                    }
                }

                function showGroupByDialog(){
                    var selectedFields = $scope.groupByFields
                    ngDialog.open({
                        template : 'groupByDialog',
                        controller: ['$scope', function($scope){
                            $scope.groupByFields = [
                                {field:'government_s'     , title: 'Government'         },
                                {field:'schema_s'         , title: 'Type of record'     },
                                {field:'submissionYear_s' , title: 'Year of submission' }
                            ]

                            _.each(selectedFields, function(field){
                                var splitField = field.split(' ')
                                var existing = _.find($scope.sortByFields, {field: splitField[0]})
                                if(existing){
                                    existing.selected = true;
                                    existing.direction = splitField[1];
                                    if(!$scope.selectedFields) $scope.selectedFields = [];
                                    $scope.selectedFields.push(existing)
                                }
                            });

                            $scope.selectField = function(field,direction){  
                                if(!direction)                              
                                    field.selected=!field.selected;

                                if(field.selected){
                                    if(!$scope.selectedFields) $scope.selectedFields = [];
                                    $scope.selectedFields.push(field)
                                }
                                else{
                                    var index = _.indexOf($scope.selectedFields, _.find($scope.selectedFields, {field: field.field}));
                                    $scope.selectedFields.splice(index, 1);
                                }
                            }
                            $scope.closeDialog = function(){
                                ngDialog.close();
                            }
                            $scope.apply = function(){
                                onGroupByChange($scope.selectedFields)
                                ngDialog.close();
                            }

                        }]
                    })
                }

                function onSortByChange(selectedFields){
                    $scope.sortFields = _.map(selectedFields, function(field){return field.field + ' ' + field.direction });
                    $scope.onSortByChange({fields:$scope.sortFields})
                }
                function onGroupByChange(selectedFields){
                    $scope.groupByFields = _.map(selectedFields, function(field){return field.field});
                    $scope.onViewTypeChange('group', {fields:$scope.sortFields})
                }
            }
        }
    }])

});
