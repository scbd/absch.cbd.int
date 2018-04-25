define(['app', 'angular', 'jquery','text!./km-terms-radio.html','linqjs','components/scbd-angularjs-services/services/utilities'], function(app,  angular, $, template,Enumerable) { 'use strict';
//need Enumerable
    //============================================================
    //
    //
    //============================================================
    app.directive('kmTermRadio', function() {
        return {
            restrict: 'EAC',
            template: template,
            replace: true,
            transclude: false,
            require: "?ngModel",
            scope: {
                binding: '=ngModel',
                //bindingName : '@ngModel',
                bindingType: '@',
                termsFn: '&terms',
                description: "=",
                layout: "@",
                required: "@"
            },
            link: function($scope, $element, $attr, ngModelController) {

                $scope.description = true;
                $scope.selection = null;
                $scope.terms = null;
                $scope.rootTerms = [];

                $scope.$watch('terms', $scope.onTerms);
                $scope.$watch('selection', $scope.save);
                $scope.$watch('binding', $scope.load);
                $scope.$watch('binding', function() {
                    ngModelController.$setViewValue($scope.binding);
                });

                $scope.init();

                if (!$attr["class"])
                    $element.addClass("list-unstyled");
            },
            controller: ["$scope", "$q","Thesaurus", function($scope, $q,thesaurus) {
                //==============================
                //
                //==============================
                $scope.init = function() {
                    $scope.setError(null);
                    $scope.__loading = true;

                    $q.when($scope.termsFn(),
                        function(data) { // on success
                            $scope.__loading = false;
                            $scope.terms = data;
                        },
                        function(error) { // on error
                            $scope.__loading = false;
                            $scope.setError(error);
                        });
                };

                //==============================
                //
                //==============================
                $scope.load = function() {
                    if (!$scope.terms) // Not initialized
                        return;

                    var oNewSelection = {};

                    if (!$.isArray($scope.terms))
                        throw "Type must be array";

                    if ($scope.binding) {

                        if ($.isArray($scope.binding))
                            throw "Type cannot be an array";

                        if ($scope.bindingType == "string") oNewSelection = {
                            identifier: $scope.binding
                        };
                        else if ($scope.bindingType == "term") oNewSelection = {
                            identifier: $scope.binding.identifier
                        };
                        else throw "bindingType not supported";
                    }

                    if (!angular.equals(oNewSelection, $scope.selection))
                        $scope.selection = oNewSelection;
                };

                //==============================
                //
                //==============================
                $scope.save = function() {
                    //debugger;

                    if (!$scope.selection)
                        return;

                    var oNewBinding = {};

                    if ($scope.selection && $scope.selection.identifier) {
                        if ($scope.bindingType == "string") oNewBinding = $scope.selection.identifier;
                        else if ($scope.bindingType == "term") oNewBinding = {
                            identifier: $scope.selection.identifier
                        };
                        else throw "bindingType not supported";
                    }

                    if (!angular.equals(oNewBinding, $scope.binding))
                        $scope.binding = oNewBinding;

                    if ($.isEmptyObject($scope.binding))
                        $scope.binding = undefined;
                };

                //==============================
                //
                //==============================
                $scope.isRequired = function() {
                    return $scope.required !== undefined && $.isEmptyObject($scope.binding);
                };

                //==============================
                //
                //==============================
                $scope.onTerms = function(refTerms) {

                    $scope.rootTerms = [];

                    if (refTerms) {
                        if (($scope.layout || "tree") == "tree") //Default layout
                            $scope.rootTerms = thesaurus.buildTree(refTerms);
                        else
                            $scope.rootTerms = Enumerable.from(refTerms).select("o=>{identifier : o.identifier, name : o.name}").toArray();
                    }

                    $scope.load();
                };

                //==============================
                //
                //==============================
                $scope.setError = function(error) {
                    if (!error) {
                        $scope.error = null;
                        return;
                    }

                    if (error.status == 404) $scope.error = "Terms not found";
                    else $scope.error = error.data || "unkown error";
                };
            }]
        };
    });
});
