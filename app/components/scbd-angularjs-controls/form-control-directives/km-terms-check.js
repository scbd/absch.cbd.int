define(['app', 'angular', 'jquery', 'text!./km-terms-check.html', 'linqjs', 'lodash',
'components/scbd-angularjs-services/services/locale'], function(app, angular, $, template, Enumerable, _) { ;

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
                locales: '=?',
                beforeSearch: '&?'
            },
            link: function($scope, $element, $attr, ngModelController) {

                var hasNarrowerTerms = false;
                $scope.otherTermIdentifier = '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED';
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
                $scope.$watch('binding', function(newV, oldVal){ 
                    if(!angular.equals(newV, oldVal))load()
                }); 
                $scope.$watch('locales', function(newV, oldVal){ 
                    if(!angular.equals(newV, oldVal))load()
                }); 

                if (!$attr["class"])
                    $element.find('ul:first').addClass("list-unstyled");
                $element.addClass('terms-check');
           
                $scope.enableSearch = $attr.enableSearch;
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
                                    if(term && term.multiple && (term.identifier==$scope.otherTermIdentifier || term.identifier.indexOf('#'+$scope.otherTermIdentifier))){
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
                    
                    _.forEach(oNewOthers, function(customValues, key){
                        var lOtherElements = _.filter($scope.otherElements[key], function(term){return term.customValue});
                        if (!angular.equals(customValues, lOtherElements))
                            $scope.otherElements[key] = customValues;
                    })

                    save();
                };

                //==============================
                //
                //==============================
                function save(termIdentifier, onOtherElementsChange) {
                    if (!$scope.selectedItems)
                        return;

                    var oNewBinding = [];

                    if(hasNarrowerTerms && termIdentifier){
                        var selectedTerm = _.find($scope.terms, {identifier:termIdentifier});
                        var selected     = ($scope.selectedItems[selectedTerm.identifier]||{}).selected;
                        if(selectedTerm.narrowerTerms){
                            selectChildTerms(selectedTerm.narrowerTerms, selected, 'narrowerTerms')
                        }
                        if(selectedTerm.broaderTerms){
                            if(!selected)//if unchecked then set parents unchecked.
                                selectChildTerms(selectedTerm.broaderTerms, false, 'broaderTerms');
                            else
                                selectChildTerms(selectedTerm.broaderTerms, true, 'broaderTerms', true);
                            setIndeterminanteParents(selectedTerm.broaderTerms, selected)
                        }
                    }
                    angular.forEach($scope.terms, function(term, i) {
                        if (term === undefined) return; //IE8 BUG

                        if ($scope.selectedItems[term.identifier] && $scope.selectedItems[term.identifier].selected) {
                            if ($scope.bindingType == "string[]") 
                                oNewBinding.push(term.identifier);
                            else if ($scope.bindingType == "term[]"){
                                
                                if(term.multiple && (term.identifier==$scope.otherTermIdentifier || term.identifier.indexOf('#'+$scope.otherTermIdentifier))){
                                    if(!onOtherElementsChange)
                                        initializeOther(term.identifier)
                                    _.forEach($scope.otherElements[term.identifier], function(elm){
                                        if(elm.customValue)
                                            oNewBinding.push({ identifier: term.identifier, customValue : elm.customValue });
                                    })
                                }
                                else
                                    oNewBinding.push({ identifier: term.identifier, customValue : $scope.selectedItems[term.identifier].customValue });
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

                function selectChildTerms(terms, selected, type, allChildSelected){
                    if(!terms.length)
                        return;

                    _.forEach(terms, function(identifier){
                            var term = _.find($scope.terms, {identifier:identifier});
                            if(term){
                                if(!$scope.selectedItems[identifier])
                                    $scope.selectedItems[identifier] = {};
                                
                                var mySelectedChildren =_.filter(term.narrowerTerms, function(identifier){ 
                                    return ($scope.selectedItems[identifier]||{}).selected
                                });
                                if(allChildSelected){
                                    if(mySelectedChildren.length == term.narrowerTerms.length){
                                        $scope.selectedItems[identifier].selected = true;
                                        $element.find('#chk_'+identifier).prop('indeterminate', false)
                                    }
                                }
                                else{ 
                                    $scope.selectedItems[identifier].selected = selected;
                                    if($scope.selectedItems[identifier].selected)
                                        $element.find('#chk_'+identifier).prop('indeterminate', false)
                                }

                                if(term && term[type])//narrowerTerms||broaderTerms
                                    selectChildTerms(term[type], selected, type, allChildSelected);
                            }
                    })
                }
                function setIndeterminanteParents(terms, val){
                    if(!terms.length)
                        return;

                    _.forEach(terms, function(identifier){
                            var term = _.find($scope.terms, {identifier:identifier});
                            if(term && !($scope.selectedItems[identifier]||{}).selected){
                                var hasChildSelected = isSelectedOrIndertiminante(term.narrowerTerms);
                                $element.find('#chk_'+identifier).prop('indeterminate', hasChildSelected||val);
                            }
                            if(term && term.broaderTerms)
                                setIndeterminanteParents(term.broaderTerms, val);
                    })
                    // $scope.save(termIdentifier, undefined, true)
                }

                function isSelectedOrIndertiminante(terms){
                    var has = _.find(terms, function(identifier){ 
                        return ($scope.selectedItems[identifier]||{}).selected||$element.find('#chk_'+identifier).prop('indeterminate')==true
                    });
                    return has != undefined;
                }
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
                    var keyword = $scope.searchKeyword;
                    if($scope.beforeSearch)
                        keyword     = $scope.beforeSearch({keyword:keyword})||keywords;
                    var title = term.searchTitle[locale]
                    if(!title)
                        title = term.searchTitle['en'];

                    if(title && title.toLowerCase().indexOf(keyword.toLowerCase())>=0)
                        return true;
                }
                //==============================
                function buildSearchList(rootTerms, searchList){

                    $scope.searchList = searchList = searchList || $scope.searchList||[];


                    _.forEach(rootTerms, function(term){
                        searchList.push({
                            identifier: term.identifier, searchTitle: term.title,
                            displayTitle: buildDisplayTitle(term, 1)
                        });
                        if(term.narrowerTerms){
                            hasNarrowerTerms = true;                            
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
                    $scope.save(undefined, true);
                };

                $scope.appendEmptyOther = function (otherElements, skipSave) {                    
                        var lastItem = otherElements[otherElements.length - 1];
                        if (!angular.equals(lastItem, {}) && lastItem.name != "")
                            otherElements.push({});

                        if(!skipSave)
                            $scope.save(undefined, true);
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
