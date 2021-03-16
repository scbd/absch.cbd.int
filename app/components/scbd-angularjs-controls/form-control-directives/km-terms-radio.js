import app from 'app';
import angular from 'angular';
import $ from 'jquery';
import template from 'text!./km-terms-radio.html';
import Enumerable from 'linqjs';
import 'components/scbd-angularjs-services/main'; ;
//need Enumerable
    //============================================================
    //
    //
    //============================================================
    app.directive('kmTermRadio', ["$q","Thesaurus", "$timeout", function($q,thesaurus, $timeout){
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
                description: "=?",
                layout: "@",
                required: "@",
                locales: '=?'
            },
            link: function($scope, $element, $attr, ngModelController) {

                $scope.uniqueId = (Math.random()).toString().split('.')[1];
                $scope.description = $scope.description!== undefined ? $scope.description : true;

                if($attr.showDescription!= undefined)
                    $scope.showDescription = $attr.showDescription == 'true';

                $scope.selection = null;
                $scope.terms = null;
                $scope.rootTerms = [];
                $scope.showOther = $scope.bindingType == "term" && $attr.showOther=="true";
                $scope.other = { identifier : '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'}
                $scope.onTerms  = onTerms;
                $scope.save     = save;
                $scope.load     = load;
                $scope.clear    = clear;

                $scope.$watch('terms', onTerms);
                // $scope.$watch('selection', save);
                $scope.$watch('binding', load);  

                if (!$attr["class"])
                    $element.find('ul:first').addClass("list-unstyled");
                $element.addClass('terms-radio');
                //==============================
                //
                //==============================
                function save() {
                    //debugger;

                    if (!$scope.selection)
                        return;

                    var oNewBinding = {};

                    if ($scope.selection && $scope.selection.identifier) {
                        if ($scope.bindingType == "string") oNewBinding = $scope.selection.identifier;
                        else if ($scope.bindingType == "term"){
                            oNewBinding = {
                                identifier: $scope.selection.identifier
                            };
                            if($scope.showOther && $scope.selection.identifier == $scope.other.identifier)
                                oNewBinding.customValue = $scope.selection.customValue
                        }
                        else throw "bindingType not supported";
                    }

                    if (!angular.equals(oNewBinding, $scope.binding))
                        $scope.binding = oNewBinding;

                    if ($.isEmptyObject($scope.binding))
                        $scope.binding = undefined;
                        
                    ngModelController.$setViewValue($scope.binding);

                };
                        
                //==============================
                //
                //==============================
                function init() {
                    $scope.setError(null);
                    $scope.__loading = true;

                    var qData = $scope.termsFn();

                    if (qData === undefined)
                        return $timeout(init, 250); // MEGA UGLY PATCH

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

                    var oNewSelection = {};

                    if (!$.isArray($scope.terms))
                        throw "Type must be array";

                    if ($scope.binding) {

                        if ($.isArray($scope.binding))
                            throw "Type cannot be an array";

                        if ($scope.bindingType == "string") oNewSelection = {
                            identifier: $scope.binding
                        };
                        else if ($scope.bindingType == "term") {
                            oNewSelection = {
                                identifier: $scope.binding.identifier
                            };
                            if($scope.showOther && $scope.binding.identifier == $scope.other.identifier)
                                oNewSelection.customValue = $scope.binding.customValue
                        }
                        else throw "bindingType not supported";
                    }

                    if (!angular.equals(oNewSelection, $scope.selection))
                        $scope.selection = oNewSelection;
                    
                    save();
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
                    else $scope.error = error.data || "unknown error";
                };

                function clear(){
                    $scope.selection={};
                    save();
                }
                init();
            }
        };
    }]);

