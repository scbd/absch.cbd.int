define(['app', 'angular', 'jquery', 'text!./km-terms-check.html', 'linqjs', 'lodash',
'components/scbd-angularjs-services/services/locale'], function(app, angular, $, template, Enumerable, _) { 'use strict';

    //============================================================
    //
    //
    //============================================================
    app.directive('kmTermCheck',["$q", "Thesaurus", '$timeout', 'locale', function($q, thesaurus, $timeout, locale) {
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
                layout: "@",
                locales: '=?'
            },
            link: function($scope, $element, $attr, ngModelController) {

                $scope.selectedItems = null;
				$scope.showDescription = $attr.showDescription == 'true';
                $scope.identifiers = null;
                $scope.terms = null;
                $scope.searchKeyword = '';
                $scope.rootTerms = [];
                $scope.otherElements = {};
                if($scope.showDescription === undefined)
                    $scope.showDescription = 'false';

                $scope.onTerms  = onTerms;
                $scope.save     = save;
                $scope.load     = load;
                $scope.clear    = clear;
                $scope.clearInputText    = clearInputText;
                $scope.customValuePlaceholder = $attr.customValuePlaceholder||'';
                
                $scope.$watch('terms', onTerms);
                $scope.$watch('identifier', save);
                $scope.$watch('binding', load); 
                $scope.$watch('locales', load);   

                if (!$attr["class"])
                    $element.find('ul:first').addClass("list-unstyled");
           
                $scope.enableSearch = $attr.enableSearch;
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
                    var oNewOthers = {};
                    if (!$.isArray($scope.terms))
                        throw "Type must be array";

                    if ($scope.binding) {

                        if (!$.isArray($scope.binding))
                            throw "Type must be array";

                        for (var i = 0; i < $scope.binding.length; ++i) {
                            if(!$scope.binding[i])
                                continue;
                                
                            if ($scope.bindingType == "string[]") 
                                oNewIdentifiers[$scope.binding[i]] = {selected : true};
                            else if($scope.bindingType == "term[]"){
                                oNewIdentifiers[$scope.binding[i].identifier] = {selected : true, customValue:$scope.binding[i].customValue};

                                if($scope.terms){
                                    var term = _.find($scope.terms, {identifier:$scope.binding[i].identifier})
                                    if(term && term.multiple){
                                        if(!oNewOthers[term.identifier])
                                            oNewOthers[term.identifier] = [];

                                        oNewOthers[term.identifier].push({customValue :$scope.binding[i].customValue});                                        
                                    }
                                }
                            }
                            else throw "bindingType not supported";

                            // if ($scope.bindingType == "string[]") oNewIdentifiers[$scope.binding[i]] = true;
                            // else if ($scope.bindingType == "term[]") oNewIdentifiers[$scope.binding[i].identifier] = true;
                            // else throw "bindingType not supported";
                        }                        
                    }

                    if (!angular.equals(oNewIdentifiers, $scope.selectedItems)){
                        $scope.selectedItems = oNewIdentifiers;
                    }
                    
                    _.each(oNewOthers, function(customValues, key){
                        if (!angular.equals(customValues, $scope.otherElements[key]))
                            $scope.otherElements[key] = customValues;
                    })

                    save();
                };

                //==============================
                //
                //==============================
                function save(onOtherElementsChange) {
                    if (!$scope.selectedItems)
                        return;

                    var oNewBinding = [];

                    angular.forEach($scope.terms, function(term, i) {
                        if (term === undefined) return; //IE8 BUG

                        if ($scope.selectedItems[term.identifier] && $scope.selectedItems[term.identifier].selected) {
                            
                            if ($scope.bindingType == "string[]") 
                                oNewBinding.push(term.identifier);
                            else if ($scope.bindingType == "term[]"){
                                
                                if(term.multiple){
                                    if(!onOtherElementsChange)
                                        initializeOther(term.identifier)
                                    _.each($scope.otherElements[term.identifier], function(elm){
                                        oNewBinding.push({ identifier: term.identifier, customValue : elm.customValue||undefined });
                                    })
                                }
                                else
                                    oNewBinding.push({ identifier: term.identifier, customValue : $scope.selectedItems[term.identifier].customValue||undefined });
                            }
                            else throw "bindingType not supported";
                        }
                        else{ //clear other
                            if(term.multiple){
                               $scope.otherElements[term.identifier] = []
                            }
                        }
                    });

                    if ($.isEmptyObject(oNewBinding))
                        oNewBinding = undefined;

                    if (!angular.equals(oNewBinding, $scope.binding)){
                        $scope.binding = oNewBinding;
                        ngModelController.$setViewValue($scope.binding);
                    }
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
                            $scope.rootTerms = Enumerable.from(refTerms).select("o=>{identifier : o.identifier, name : o.name, title : o.title, type:o.type, multiple:o.multiple}").toArray();
                        
                        buildSearchList($scope.rootTerms)
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
                //==============================
                function clear(){
                    $scope.selectedItems=[];
                    save();
                }
                //==============================
                function clearInputText(){
                    $scope.searchKeyword = "";
                }
                //==============================
                $scope.hasMatch = function(term){
                    if(!$scope.searchKeyword)
                        return;

                    var title = term.searchTitle[locale]
                    if(!title)
                        title = term.searchTitle['en'];

                    if(title.toLowerCase().indexOf($scope.searchKeyword.toLowerCase())>=0)
                        return true;
                }
                //==============================
                function buildSearchList(rootTerms, searchList){

                    $scope.searchList = searchList = searchList || $scope.searchList||[];


                    _.each(rootTerms, function(term){
                        searchList.push({
                            identifier: term.identifier, searchTitle: term.title,
                            displayTitle: buildDisplayTitle(term, 1)
                        });
                        if(term.narrowerTerms){                            
                            buildSearchList(term.narrowerTerms, searchList)
                         }
                    })

                }
                //==============================
                function buildDisplayTitle(term, i){
                    var broaderTitle= {};
                    var mergedTitle = {};

                    if(term.broaderTerms){
                       
                        broaderTitle =  buildDisplayTitle(term.broaderTerms[0], 0);
                        
                        if(i){
                            mergedTitle.en = (broaderTitle.en||'') + " <i class='fa fa-caret-right color-grey '></i> <span class='color-grey bold'>" + (term.title.en ||'') + "</span>";
                            mergedTitle.es = (broaderTitle.es||'') + " <i class='fa fa-caret-right color-grey '></i> <span class='color-grey bold'>" + (term.title.es ||'') + "</span>";
                            mergedTitle.fr = (broaderTitle.fr||'') + " <i class='fa fa-caret-right color-grey '></i> <span class='color-grey bold'>" + (term.title.fr ||'') + "</span>";
                            mergedTitle.ar = (broaderTitle.ar||'') + " <i class='fa fa-caret-right color-grey '></i> <span class='color-grey bold'>" + (term.title.ar ||'') + "</span>";
                            mergedTitle.ru = (broaderTitle.ru||'') + " <i class='fa fa-caret-right color-grey '></i> <span class='color-grey bold'>" + (term.title.ru ||'') + "</span>";
                            mergedTitle.zh = (broaderTitle.zh||'') + " <i class='fa fa-caret-right color-grey '></i> <span class='color-grey bold'>" + (term.title.zh ||'') + "</span>";
                        }
                        else{
                            mergedTitle.en = (broaderTitle.en||'') + " <i class='fa fa-caret-right color-grey '></i> " + (term.title.en ||'');
                            mergedTitle.es = (broaderTitle.es||'') + " <i class='fa fa-caret-right color-grey '></i> " + (term.title.es ||'');
                            mergedTitle.fr = (broaderTitle.fr||'') + " <i class='fa fa-caret-right color-grey '></i> " + (term.title.fr ||'');
                            mergedTitle.ar = (broaderTitle.ar||'') + " <i class='fa fa-caret-right color-grey '></i> " + (term.title.ar ||'');
                            mergedTitle.ru = (broaderTitle.ru||'') + " <i class='fa fa-caret-right color-grey '></i> " + (term.title.ru ||'');
                            mergedTitle.zh = (broaderTitle.zh||'') + " <i class='fa fa-caret-right color-grey '></i> " + (term.title.zh ||'');
                        }
                    }
                    else{
                        if(i){
                            mergedTitle.en = "<span class='color-grey bold'>" +(term.title.en ||'') + "</span>";
                            mergedTitle.es = "<span class='color-grey bold'>" +(term.title.es ||'') + "</span>";
                            mergedTitle.fr = "<span class='color-grey bold'>" +(term.title.fr ||'') + "</span>";
                            mergedTitle.ar = "<span class='color-grey bold'>" +(term.title.ar ||'') + "</span>";
                            mergedTitle.ru = "<span class='color-grey bold'>" +(term.title.ru ||'') + "</span>";
                            mergedTitle.zh = "<span class='color-grey bold'>" +(term.title.zh ||'') + "</span>";
                        }
                        else{
                            mergedTitle.en = (term.title.en ||'');
                            mergedTitle.es = (term.title.es ||'');
                            mergedTitle.fr = (term.title.fr ||'');
                            mergedTitle.ar = (term.title.ar ||'');
                            mergedTitle.ru = (term.title.ru ||'');
                            mergedTitle.zh = (term.title.zh ||'');
                        }
                    }
                    
                    return mergedTitle;
                }

                $scope.deleteOtherElement = function (element, otherElements, $event) {
                    otherElements.splice(otherElements.indexOf(element), 1);
                    $scope.save(true);
                };

                $scope.appendEmptyOther = function (otherElements, skipSave) {                    
                        var lastItem = otherElements[otherElements.length - 1];
                        if (!angular.equals(lastItem, {}) && lastItem.name != "")
                            otherElements.push({});

                        if(!skipSave)
                            $scope.save(true);
                }
                function initializeOther(identifier) {
                    if(!$scope.otherElements[identifier])
                        $scope.otherElements[identifier] = [];

                    var otherElements = $scope.otherElements[identifier];
                    var lastItem = otherElements[otherElements.length - 1];
                    if (!lastItem || (!angular.equals(lastItem, {}) && lastItem.customValue != ""))
                        otherElements.push({});
                }

                init();
            }
        };
    }]);
});
