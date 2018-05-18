define(['app', 'angular', 'jquery', 'text!./km-terms-check.html', 'linqjs'], function(app, angular, $, template, Enumerable) { 'use strict';

    //============================================================
    //
    //
    //============================================================
    app.directive('kmTermCheck',["$q", "Thesaurus", '$timeout',function($q, thesaurus, $timeout) {
        return {
            restrict: 'EAC',
            template: template,
            replace: true,
            transclude: false,
            require: "?ngModel",
            scope: {
                binding: '=ngModel',
                bindingType: '@',
                termsFn: '&terms',
                required: "@",
                layout: "@"
            },
            link: function($scope, $element, $attr, ngModelController) {

				$scope.showDescription = $attr.showDescription == 'true';
                $scope.identifiers = null;
                $scope.terms = null;
                $scope.rootTerms = [];
                if($scope.showDescription === undefined)
                    $scope.showDescription = 'false';

                $scope.onTerms  = onTerms;
                $scope.save     = save;
                $scope.load     = load;
                $scope.clear    = clear;

                $scope.$watch('terms', onTerms);
                $scope.$watch('identifier', save);
                $scope.$watch('binding', load);  

                if (!$attr["class"])
                    $element.find('ul:first').addClass("list-unstyled");
           
                //==============================
                //
                //==============================
                function init() {
                    $scope.setError(null);
                    $scope.__loading = true;

                    var qData = $scope.termsFn();

                    if (qData === undefined)
                        $timeout($scope.init, 250); // MEGA UGLY PATCH

                    $q.when(qData,
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
                function load() {
                    if (!$scope.terms) // Not initialized
                        return;

                    var oNewIdentifiers = {};

                    if (!$.isArray($scope.terms))
                        throw "Type must be array";

                    if ($scope.binding) {

                        if (!$.isArray($scope.binding))
                            throw "Type must be array";

                        for (var i = 0; i < $scope.binding.length; ++i) {
                            if ($scope.bindingType == "string[]") oNewIdentifiers[$scope.binding[i]] = true;
                            else if ($scope.bindingType == "term[]") oNewIdentifiers[$scope.binding[i].identifier] = true;
                            else throw "bindingType not supported";
                        }
                    }

                    if (!angular.equals(oNewIdentifiers, $scope.identifiers))
                        $scope.identifiers = oNewIdentifiers;
                    
                    save();
                };

                //==============================
                //
                //==============================
                function save() {
                    if (!$scope.identifiers)
                        return;

                    var oNewBinding = [];

                    angular.forEach($scope.terms, function(term, i) {
                        if (term === undefined) return; //IE8 BUG

                        if ($scope.identifiers[term.identifier]) {
                            if ($scope.bindingType == "string[]") oNewBinding.push(term.identifier);
                            else if ($scope.bindingType == "term[]") oNewBinding.push({
                                identifier: term.identifier
                            });
                            else throw "bindingType not supported";
                        }
                    });

                    if ($.isEmptyObject(oNewBinding))
                        oNewBinding = undefined;

                    if (!angular.equals(oNewBinding, $scope.binding))
                        $scope.binding = oNewBinding;

                    ngModelController.$setViewValue($scope.binding);
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
                function onTerms(refTerms) {

                    $scope.rootTerms = [];

                    if (refTerms) {
                        if (($scope.layout || "tree") == "tree") //Default layout
                            $scope.rootTerms = thesaurus.buildTree(refTerms);
                        else
                            $scope.rootTerms = Enumerable.from(refTerms).select("o=>{identifier : o.identifier, name : o.name, title : o.title}").toArray();
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

                function clear(){
                    $scope.identifiers=[];
                    save();
                }

                init();
            }
        };
    }]);
});
