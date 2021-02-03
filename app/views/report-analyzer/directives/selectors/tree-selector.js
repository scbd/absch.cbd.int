define(['app', 'text!./tree-selector.html', 'lodash', 'components/scbd-angularjs-services/filters/scbd-filters', '../intermediate'], function(app, templateHtml, _) {

    //==============================================
    //
    //
    //==============================================
    app.directive('treeSelector', [function() {
        return {
            restrict : 'E',
            replace : true,
            template : templateHtml,
            scope :  {
                items : '=',
                selection : '=',
            },
            link: function ($scope) {

                var allItems = [];
                var mapItems = {};
                var skipSelectionWatch = false;

                //====================================
                //
                //
                //====================================
                $scope.$watch("items", function(items) {

                    allItems = [];
                    mapItems = {};

                    if(!items)
                        return;

                    items.forEach(function(item) {

                        item.selected = false;

                        allItems.push(item);
                        mapItems[item.identifier] = item;

                        getChildren(item).forEach(function(child){

                            child.selected = false;

                            allItems.push(child);
                            mapItems[child.identifier] = child;
                        });
                    });

                    applySelection($scope.selection || []);
                });

                //====================================
                //
                //
                //====================================
                $scope.$watch("selection", function(selection) {

                    if(!skipSelectionWatch)
                        applySelection(selection || []);

                    skipSelectionWatch = false;
                });

                //====================================
                //
                //
                //====================================
                $scope.onSelect = function(item) {

                    if(item) {
                        applyIntermediateState(item);
                    }

                    var oldSelection = $scope.selection||[];
                    var newSelection = _(allItems).filter({ selected : true }).map('identifier').value();

                    var updated = oldSelection.length != newSelection.length;

                    if(!updated) {

                        var intersection = _.intersection(oldSelection, newSelection);

                        updated = oldSelection.length != intersection.length ||
                                  newSelection.length != intersection.length;
                    }

                    if(updated) {

                        skipSelectionWatch = true;
                        $scope.selection = newSelection;
                    }
                };

                //====================================
                //
                //
                //====================================
                function applySelection(selection) {

                    allItems.forEach(function (item) {
                        item.selected = false;
                    });

                    selection.forEach(function (identifier) {

                        var item = mapItems[identifier];

                        if(item) {
                            item.selected = true;
                            applyIntermediateState(item);
                        }
                    });
                }

                //====================================
                //
                //
                //====================================
                function applyIntermediateState(item) {

                    var root = item;

                    getParents(item).forEach(function(o){
                        o.selected = false;
                        root = o;
                    });

                    getChildren(item).forEach(function(o){
                        o.selected = false;
                    });

                    var branch = [root].concat(getChildren(root));

                    branch.forEach(function(o) {
                        o.selected = o.selected || false;
                    });

                    _.filter(branch, {selected : true}).forEach(function(o) {

                        getParents(o).forEach(function(u){
                            u.selected = null;
                        });

                        getChildren(o).forEach(function(u){
                            u.selected = null;
                        });
                    });
                }

                //====================================
                //
                //
                //====================================
                function getParents(item) {

                    var parents = [];
                    var parent = item.parent;

                    while (parent) {
                        parents.push(parent);
                        parent = parent.parent;
                    }

                    return parents;
                }

                //====================================
                //
                //
                //====================================
                function getChildren(item) {

                    var children = [];

                    item.children.forEach(appendChild);

                    return children;

                    function appendChild(child) {

                        children.push(child);

                        child.children.forEach(appendChild);
                    }
                }
            }
        };
    }]);
});
