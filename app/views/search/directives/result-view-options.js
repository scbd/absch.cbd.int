﻿define(['text!./result-view-options.html', 'app', 'lodash', 'ngDialog'], function (template, app, _) {
    'use strict';

    app.directive('resultViewOptions', ['$location', 'ngDialog', 'locale', function ($location, ngDialog, locale) {
        return {
            restrict: 'EA',
            template: template,
            require:'^searchDirective',
            scope: {
                viewType        : '=' ,
                sortFields      : '=' ,
                groupByFields   : '=' ,
                onSortByChange  : '&?',
                onViewTypeChange: '&?',
                onExport        : '&?'
            },
            link: function ($scope, $element, $attr, searchDirectiveCtrl) {
               
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
                    var selectedFields = $scope.sortFields;
                    if(typeof selectedFields == 'string')
                        selectedFields = [selectedFields]
                    ngDialog.open({
                        template : 'sortByDialog',
                        controller: ['$scope', function($scope){
                            $scope.sortByFields = [
                                {field:'relevance'                            , title: 'Relevance'       ,direction: 'asc'},
                                {field:'updatedDate_dt'                       , title: 'Last Updated On' ,direction: 'asc'},
                                {field:'schema_EN_s'.replace('EN', locale.toUpperCase())    , title: 'Record Type'     ,direction: 'asc'},
                                {field:'government_EN_s'.replace('EN', locale.toUpperCase()), title: 'Country'         ,direction: 'asc'}
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
                                
                                if(!$scope.selectedFields)
                                    $scope.selectedFields = [];

                                if(field.field == 'relevance'){
                                    $scope.selectedFields = [];
                                    _.each($scope.sortByFields, function(f){f.selected=f.field == 'relevance'});
                                }
                                else{
                                    var relevance = _.find($scope.selectedFields, {field: 'relevance'})
                                    var index = _.indexOf($scope.selectedFields, relevance);
                                    if(index>=0){
                                        relevance.selected = false;
                                        $scope.selectedFields.splice(index, 1);
                                    }
                                }

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
                    if(type == 'default'){
                        $scope.groupByFields = ['government', 'schema'];
                        $scope.onViewTypeChange({options:{viewType:type}})
                    }if(type == 'list'){
                        $scope.onViewTypeChange({options:{viewType:type}})
                    }
                    if(type == 'group'){
                        showGroupByDialog()
                    }
                    else{
                        $scope.onViewTypeChange({options:{viewType:type}})
                    }
                }

                $scope.onExportClick = function(){
                    $scope.onExport()
                }

                function showGroupByDialog(){
                    var selectedFields = $scope.groupByFields
                    if(typeof selectedFields == 'string')
                        selectedFields = [selectedFields]
                    ngDialog.open({
                        template : 'groupByDialog',
                        controller: ['$scope', function($scope){
                            $scope.groupByFields = searchDirectiveCtrl.groupByFields();

                            _.each(selectedFields, function(field){
                                var existing = _.find($scope.groupByFields, {field: field})
                                if(existing){
                                    existing.selected = true;
                                    if(!$scope.selectedFields) $scope.selectedFields = [];
                                        $scope.selectedFields.push(existing)
                                }
                            });

                            $scope.selectField = function(field){
                                
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
                                if(($scope.selectedFields||[]).length == 0)                                    
                                    onGroupByChange([{field:'government_s'}, {field:'schema_s'}]) //default to this grouping when nothing is selected
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
                    $scope.onViewTypeChange({options:{ viewType:'group', fields:$scope.groupByFields}})
                }
            }
        }
    }])

});
