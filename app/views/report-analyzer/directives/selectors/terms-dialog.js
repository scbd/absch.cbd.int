import templateHtml from 'text!./terms-dialog.html';
import app from '~/app';
import _ from 'lodash';
import '../../filters/ascii';
import '~/components/scbd-angularjs-services/main';
import './tree-selector';

    //==============================================
    //
    //
    //==============================================
    app.directive('termsDialog', ['$http', '$timeout', '$q', '$filter', function($http, $timeout, $q, $filter) {
        return {
            restrict : 'E',
            replace : true,
            template : templateHtml,
            scope :  {
                termsFn : '&terms',
                title : '@',
                columnCountFn : '&columns',
                selection : '=',
                visible : '='
            },
            link: function ($scope, $dialog) {

                var allTerms = [];
                var skipSelectionWatch = false;

                //====================================
                //
                //
                //====================================
                $scope.clearSelection = function() {

                    $scope.columns.forEach(function(column){
                        column.selection = undefined;
                    });
                };

                //====================================
                //
                //
                //====================================
                $scope.$watch("visible", function(visible) {

                    if($dialog.is(":visible") == visible)
                    return;

                    if(visible) $dialog.modal('show');
                    else        $dialog.modal('hide');
                });

                //====================================
                //
                //
                //====================================
                $scope.$watchCollection('selection', function(selection) {

                    if(!skipSelectionWatch) {
                        applySelection(selection);
                    }

                    skipSelectionWatch = false;
                });

                //====================================
                //
                //
                //====================================
                function applySelection(selection) {

                    if(!$scope.columns) {
                        return;
                    }

                    // map selection

                    var selectionMap = {};

                    (selection||[]).forEach(function(id) {
                        selectionMap[id] = true;
                    });

                    $scope.columns.forEach(function(column) {

                        selection = [];

                        column.items.forEach(function(root){

                            flattenBranch(root).forEach(function(item){

                                if(selectionMap[item.identifier]) {
                                    selection.push(item.identifier);
                                }
                            });
                        });

                        column.selection    = selection;
                        column.selectionBak = selection;
                    });
                }

                //====================================
                //
                //
                //====================================
                function flattenBranch(item) { // root first

                    var children = [];

                    appendChild(item);

                    return children;

                    function appendChild(child) {

                        children.push(child);

                        child.children.forEach(appendChild);
                    }
                }

                //====================================
                //
                //
                //====================================
                $scope.$watchCollection(monitorColumnsSelection, function(selection) {
                    skipSelectionWatch = true;
                    $scope.selection = selection;
                });

                //====================================
                //
                //
                //====================================
                function monitorColumnsSelection() {

                    var selection = $scope.selection;

                    if($scope.columns) {

                        var updated = _.some($scope.columns, function(column){
                            return column.selection !== column.selectionBak;
                        });

                        if(updated) {

                            selection = [];

                            $scope.columns.forEach(function(column){
                                column.selectionBak = column.selection;
                                selection = selection.concat(column.selection);
                            });
                        }
                    }

                    return selection;
                }

                //====================================
                //
                //
                //====================================
                function initialize(terms) {

                    //Cleanup + mapping

                    var termsMap = {};

                    terms.forEach(function(term){

                        term.selected = false;
                        term.parent   = null;
                        term.children = [];

                        termsMap[term.identifier] = term;

                    });

                    var lstring = $filter('lstring');
                    var ascii   = $filter('ascii');

                    terms.sort(function(a,b){

                        var ta = ascii(lstring(a.title)).toLowerCase();
                        var tb = ascii(lstring(b.title)).toLowerCase();

                        return ta.localeCompare(tb);
                    });

                    // Build tree

                    terms.forEach(function(term){

                        term.narrowerTerms.forEach(function(narrowerId){

                            if(termsMap[narrowerId]) {
                                termsMap[narrowerId].parent = term;
                                term.children.push(termsMap[narrowerId]);
                            }
                        });

                    });

                    allTerms = terms;
                    terms = _.filter(terms, { parent : null });

                    // split by columns

                    var colCount = Math.max($scope.columnCountFn()||1, 1);

                    $scope.columns = [];

                    for(var i=0; i<colCount; ++i)
                    $scope.columns.push({ items : [] });

                    terms.forEach(function(term, index) {
                        $scope.columns[index % colCount].items.push(term);
                    });

                    applySelection($scope.selection);
                }

                //====================================
                //
                //
                //====================================
                $dialog.on("show.bs.modal", function() {

                    $timeout(function() {

                        $scope.loading = true;

                        $q.when($scope.termsFn()).then(function(terms){

                            return initialize(terms);

                        }).finally(function(){

                            delete $scope.loading;

                        });
                    });
                });

                //====================================
                //
                //
                //====================================
                $dialog.on("shown.bs.modal", function() {

                    $timeout(function() {  //Use $timeout to Force angular context
                        $scope.visible = true;
                    });
                });

                //====================================
                //
                //
                //====================================
                $dialog.on("hidden.bs.modal", function() {

                    $timeout(function() {  //Use $timeout to Force angular context
                        $scope.visible = false;
                    });
                });
            }
        };
    }]);

