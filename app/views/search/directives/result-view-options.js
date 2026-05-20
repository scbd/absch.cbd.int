import template from 'text!./result-view-options.html';
import { provide } from 'vue'; 
import app from '~/app';
import _ from 'lodash';
import 'ngDialog';
import tableExport from '~/components/common/export.vue';
import shareRecord from '~/components/common/share-record.vue';
import resultViewOptionsT from '~/app-text/views/search/directives/result-view-options.json';
import { safeDelegate } from '~/services/common'
import { searchSortMapping } from '~/app-data/common-search-sort-mapping';
import { searchSortMapping as bchSearchSortMapping } from '~/app-data/bch/search-sort-mapping';
import { searchSortMapping as absSearchSortMapping } from '~/app-data/abs/search-sort-mapping';
import { searchSortMapping as chmSearchSortMapping } from '~/app-data/chm/search-sort-mapping';

app.directive('resultViewOptions', ['$location', 'ngDialog', 'locale', '$rootScope', 'translationService',
    function ($location, ngDialog, locale, $rootScope, translationService) {
        return {
            restrict: 'EA',
            template: template,
            require:'^searchDirective',
            scope: {
                currentTab      : '=' ,
                viewType        : '=' ,
                sortFields      : '=' ,
                groupByFields   : '=' ,
                onSortByChange  : '&?',
                onViewTypeChange: '&?',
                onExport        : '&?'
            },
            link: function ($scope, $element, $attr, searchDirectiveCtrl) {
                translationService.set('resultViewOptionsT', resultViewOptionsT);

                $scope.exportVueComponent = {
                    components:{tableExport},
                    setup: componentSetup
                }

                function componentSetup () {
                    provide('getDownloadRecords', safeDelegate($scope, (options)=>{
                        options = options || {}
                        return $scope.onExport({options})
                    }));
                }

                $scope.shareVueComponent = {
                    components:{shareRecord},
                     setup:  shareRecordsFunctions
                }

                function shareRecordsFunctions () {

                    provide('getQuery', safeDelegate($scope, ()=>{
                        const query = searchDirectiveCtrl.getAllSearchFilters();
                        const type = "chm-search-result"
                        return {type, query}
                    }));
                }               

                //$scope.isUserSignedIn = false;
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
                        controller: ['$scope', 'realm', function($scope, realm){
                            $scope.sortByFields = [...searchSortMapping].flat()
                            const filters = searchDirectiveCtrl.getSelectedFilters('schema');
                            if(filters.length == 1){
                                const schema = filters[0].id;
                                let realmSortMapping = {};
                                if(realm.is('BCH') ){
                                    realmSortMapping = bchSearchSortMapping;
                                }
                                else if(realm.is('ABS') ){
                                    realmSortMapping = absSearchSortMapping;
                                }
                                else if(realm.is('CHM') ){
                                    realmSortMapping = chmSearchSortMapping;
                                }
                                if(realmSortMapping?.[schema]){
                                    $scope.sortByFields = [...$scope.sortByFields, ...realmSortMapping[schema]];
                                }
                            }
                            $scope.sortByFields = $scope.sortByFields.map(e=>({...e, selected:false}))

                            _.forEach(selectedFields, function(field){
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
                                    _.forEach($scope.sortByFields, function(f){f.selected=f.field == 'relevance'});
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

                $scope.viewTypeChange = function(type,currentTab){
                    if(type == 'default' && currentTab == 'nationalRecords'){
                        showGroupByDialog();
                    }
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

                $scope.onMatrixExportClick = function(){
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

                            _.forEach(selectedFields, function(field){
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


