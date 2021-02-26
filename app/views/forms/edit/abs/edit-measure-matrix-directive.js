define(['app', 'lodash', "text!views/forms/edit/abs/edit-measure-matrix-directive.html",
'app-data/measure-matrix-updated-title', 'app-data/measure-matrix-other-elements',
'views/directives/block-region-directive', 'components/scbd-angularjs-services/services/locale'
], function (app, _, template, measureMatrixUpdatedTitles, elementsForOthers) {


    app.directive("editMeasureMatrix", function () {
        return {
            restrict: "EAC",
            template: template ,
            replace: true,
            transclude: false,
            require: "?ngModel",
            scope: {
                binding: "=ngModel",
                locales: "=",
                termsFn: "&terms",
                required: "@",
                layout: "@",
                document: "=document",
                validationReport : "="
            },
            link: function ($scope, $element, $attr, ngModelController) {
                $scope.isElementsLoading = true;
                $scope.identifiers = null;
                $scope.sections = null;
                $scope.otherCustomValues = null;
                $scope.terms = null;
                $scope.rootTerms = [];
                $scope.otherTerms = [];
                $scope.geneticResource = {types: [], areas:[]};

                $scope.$watch("terms", $scope.onTerms);
                $scope.$watch("binding", function() {$scope.load()});
                $scope.$watch("binding", function () {
                    ngModelController.$setViewValue($scope.binding);
                });

                $scope.$watch(function () {
                    return angular.toJson($scope.identifiers)
                }, function () { $scope.save(true) }); //use tojson to detect changes
                $scope.$watch(function () {
                    return angular.toJson($scope.sections)
                }, $scope.save);
                $scope.$watch(function () {
                    return angular.toJson($scope.otherCustomValues)
                }, $scope.save);

                $scope.init();

                if (!$attr["class"])
                    $element.addClass("list-unstyled");

            },
            controller: ["$scope", "$q", "Thesaurus", "Enumerable", '$element', '$http', '$timeout', '$rootScope', 'locale',
            function ($scope, $q, thesaurus, Enumerable, $element, $http, $timeout, $rootScope, locale) {

                $scope.locale = locale;

                var readOnlyElements = [
                    "24E809DA-20F4-4457-9A8A-87C08DF81E8A", "54281688-DE5F-4465-953C-76A8CBE61DED", "4E2974DF-216E-46C8-8797-8E3A33D6A048",
                    "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63", "08B2CDEC-786F-4977-AD0A-6A709695528D",
                    "01DA2D8E-F2BB-4E85-A17E-AB0219194A17", "9847FA8A-16C3-4466-A378-F20AF9FF883B", "BE944E70-2098-45AC-891B-D5E94AFECB99"
                ];

                var mainElements = [
                    "24E809DA-20F4-4457-9A8A-87C08DF81E8A", "08B2CDEC-786F-4977-AD0A-6A709695528D", "9847FA8A-16C3-4466-A378-F20AF9FF883B",
                    "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63", "01DA2D8E-F2BB-4E85-A17E-AB0219194A17", "BE944E70-2098-45AC-891B-D5E94AFECB99"
                ];
                var secondaryElements = [];

                var yesnoElements = [
                    "CD2EF4DD-1B94-4283-9E97-8DDC7F23CB6F", "B8A150E054154AD3AD97856ABD485E90", "2A8B467A-5FC5-41C5-8D7B-71B78E3AFEDD",
                    "1E824A31-BDFB-4C47-9593-8006B5FC7D60", "08B2CDEC-786F-4977-AD0A-6A709695528D",
                    "5427EB8F-5532-4AE2-88EE-5B9619917480", "9AE45FB8-7788-4D26-B8E9-6B1647055519",
                    "8FA89F2D-3D6B-46A2-93BC-8B157054D726", "9847FA8A-16C3-4466-A378-F20AF9FF883B",
                    "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63", "F2E6038A-6E99-4BCE-9582-155B72CC7730",
                    "1FCC6CA9-022F-42FD-BD02-43AE674FEB56", "01DA2D8E-F2BB-4E85-A17E-AB0219194A17",
                    "4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C", "BE944E70-2098-45AC-891B-D5E94AFECB99"
                ];

                // var elementsForOthers = [
                //     "24E809DA-20F4-4457-9A8A-87C08DF81E8A", "08B2CDEC-786F-4977-AD0A-6A709695528D", "9847FA8A-16C3-4466-A378-F20AF9FF883B",
                //     "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63", "01DA2D8E-F2BB-4E85-A17E-AB0219194A17", "BE944E70-2098-45AC-891B-D5E94AFECB99"
                // ];
                var staticIdentifiers = ["24E809DA-20F4-4457-9A8A-87C08DF81E8A", "CD2EF4DD-1B94-4283-9E97-8DDC7F23CB6F",
                    "B8A150E054154AD3AD97856ABD485E90", "2A8B467A-5FC5-41C5-8D7B-71B78E3AFEDD",
                    "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED#24E809DA-20F4-4457-9A8A-87C08DF81E8A"];

                var parentsOfSectionElements = []

                var scopeofMeasureElements = ["CD2EF4DD-1B94-4283-9E97-8DDC7F23CB6F"];
                $scope.scopeOfMeasureTerm = "CD2EF4DD-1B94-4283-9E97-8DDC7F23CB6F";
                $scope.scopeElement = {};
                var initialized = false;


                $scope.options = {
                    grTypes: function () {

                        var scopeElement = _.find($scope.rootTerms, { identifier: '24E809DA-20F4-4457-9A8A-87C08DF81E8A' });

                        var elements = _.find(scopeElement.narrowerTerms, { identifier: 'CD2EF4DD-1B94-4283-9E97-8DDC7F23CB6F' });
                        var grTypes = [];
                        var all = _.find($scope.terms, { identifier: '4E2974DF-216E-46C8-8797-8E3A33D6A048' });
                        grTypes.push(all);
                        grTypes = _.union(grTypes, angular.copy(elements.narrowerTerms[0].narrowerTerms));
                        return grTypes;
                    },
                    grAreas: function () {
                        var scopeElement = _.find($scope.rootTerms, { identifier: '24E809DA-20F4-4457-9A8A-87C08DF81E8A' });
                        var elements = _.find(scopeElement.narrowerTerms, { identifier: 'CD2EF4DD-1B94-4283-9E97-8DDC7F23CB6F' });
                        return elements.narrowerTerms[1].narrowerTerms;
                    },
                    absMeasures: function() {
                        return $q.all([
                            $http.get("/api/v2013/thesaurus/domains/50616B56-12F3-4C46-BC43-2DFC26679177/terms", {
                                cache: true
                            }),
                            $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED", {
                                cache: true
                            })
                        ]).then(function(o) {
                            // var data = getABSMeasure();
                            //TODO: this function appears generic to returning from .all, perhaps cut code by making this function and reusing it?
                            var data = o[0].data;
                            data = updateABSMeasureText(data);

                            return data;
                        });
                    },
                    other: function() {
                        return $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED", {
                            cache: true
                        });
                    }
                };
                
                //==============================
                //
                //==============================
                $scope.init = function () {
                    $scope.setError(null);
                    $scope.__loading = true;

                    $q.when($scope.termsFn(),
                        function (data) { // on success
                            $scope.__loading = false;
                            $scope.terms = data;
                        },
                        function (error) { // on error
                            $scope.__loading = false;
                            $scope.setError(error);
                        });
                }

                //==============================
                //
                //==============================
                $scope.load = function () {
                    if (!$scope.terms) // Not initialized
                        return;

                    var oNewIdentifiers = {};
                    var oNewSections = {};
                    var oNewOtherCustomValues = {};
                    var oNewOtherTerms = {};
                    if (!$.isArray($scope.terms))
                        throw "Terms must be array";

                    if ($scope.binding) {

                        if (!$.isArray($scope.binding.relevantElements))
                            throw "ABS Elements must be array";

                        for (var i = 0; i < $scope.binding.relevantElements.length; ++i) {
                            var identifier = $scope.binding.relevantElements[i].identifier;
                            //handle others
                            if ($scope.binding.relevantElements[i].parent) {
                                if ($scope.binding.relevantElements[i].parent) {
                                    // identifier.indexOf('#')<0 &&  $scope.binding.relevantElements[i].parent.indexOf('#')<0)
                                    if ($scope.binding.relevantElements[i].parent.indexOf('#') > 0)
                                        identifier = $scope.binding.relevantElements[i].parent;
                                    else
                                        identifier += '#' + $scope.binding.relevantElements[i].parent;
                                }
                                oNewOtherCustomValues[identifier] = $scope.binding.relevantElements[i].customValue;

                                if ($scope.binding.relevantElements[i].parent
                                    && !$scope.binding.relevantElements[i].hasOwnProperty('answer')
                                ) {
                                    if (!oNewOtherTerms[identifier])
                                        oNewOtherTerms[identifier] = [];

                                    var lOtherTerm = {
                                        identifier: '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED',
                                        name: oNewOtherCustomValues[identifier],
                                        section: $scope.binding.relevantElements[i].section,
                                        parent: $scope.binding.relevantElements[i].parent
                                    };
                                    oNewOtherTerms[identifier].push(lOtherTerm);
                                    //add empty row for future edits
                                    $scope.appendEmptyOther(oNewOtherTerms[identifier], true);
                                }
                            }
                            else if(identifier.indexOf("5B6177DD-5E5E-434E-8CB7-D63D67D5EBED#")>=0
                                    && $scope.binding.relevantElements[i].hasOwnProperty('answer')){
                                if(!_.some($scope.binding.relevantElements, {'parent': identifier})){//add empty row for future edits
                                    if (!oNewOtherTerms[identifier])
                                        oNewOtherTerms[identifier] = [{}];                                    
                                }
                            }

                            if ($scope.binding.relevantElements[i].answer != undefined) {
                                oNewIdentifiers[identifier] = $scope.binding.relevantElements[i].answer;

                                if (!initialized && $scope.binding.relevantElements[i].answer)
                                    setChildrenSelected(identifier, identifier != $scope.scopeOfMeasureTerm);
                            }
                            // else
                            //     oNewIdentifiers[identifier] = true;
                            oNewSections[identifier] = $scope.binding.relevantElements[i].section;

                        }
                        initialized = true;
                    }

                    if (!angular.equals(oNewIdentifiers, $scope.identifiers)) {
                        $scope.identifiers = oNewIdentifiers;

                    }
                    if (!angular.equals(oNewSections, $scope.sections)) $scope.sections = oNewSections;
                    if (!angular.equals(oNewOtherCustomValues, $scope.CustomValues)) $scope.otherCustomValues = oNewOtherCustomValues;
                    if (!angular.equals(oNewOtherTerms, $scope.otherTerms)) $scope.otherTerms = oNewOtherTerms;

                }

                //==============================
                //
                //==============================
                $scope.save = function (setParent) {
                    if (!$scope.identifiers)
                        return;

                    var oNewBinding = [];

                    angular.forEach($scope.terms, function (term, i) {
                        if (term == undefined) return //IE8 BUG

                        if ($scope.identifiers[term.identifier] != undefined) {

                            var oTerm = {
                                identifier: term.identifier,
                                answer: $scope.identifiers[term.identifier]
                            };
                            term.answer = $scope.identifiers[term.identifier];

                            //handle others|| oTerm.identifier == '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'
                            if (oTerm.identifier.indexOf('#') > 0
                                && $scope.identifiers[term.identifier] == undefined) {
                                var identifiers = oTerm.identifier.split('#');
                                oTerm.identifier = identifiers[0];
                                oTerm.parent = identifiers[1];
                                oTerm.customValue = $scope.otherCustomValues[term.identifier];
                            }

                            if ($scope.sections[term.identifier]
                                && $scope.identifiers[term.identifier] != undefined)
                                oTerm.section = $scope.sections[term.identifier];

                            oNewBinding.push(oTerm);

                            if ($scope.otherTerms && $scope.otherTerms[term.identifier]) {
                                _.forEach($scope.otherTerms[term.identifier], function (otherTerm) {
                                    if (otherTerm.name != '') {
                                        var lOtherTerm = {
                                            identifier: '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED',
                                            customValue: otherTerm.name,
                                            section: otherTerm.section,
                                            parent: term.identifier
                                        };

                                        oNewBinding.push(lOtherTerm);
                                    }
                                });

                            }
                        }
                    });

                    if ($.isEmptyObject(oNewBinding))
                        oNewBinding = undefined;

                    if (!$scope.binding)
                        $scope.binding = {};

                    if (!angular.equals(oNewBinding, $scope.binding.relevantElements))
                        $scope.binding.relevantElements = oNewBinding;
                }

                $scope.updateSelected = function (term, answer, answerText) {
                    if (term.narrowerTerms) {

                        if (answerText == 'no') {
                            removeSelectedChildren(term.identifier);
                        }
                        else {
                            _.forEach(term.narrowerTerms, function (term) {
                                var lterm = _.find($scope.terms, { identifier: term.identifier });
                                lterm.showElement = true;
                            });
                        }
                    }
                    else if (term.identifier.indexOf('#') > 0) {
                        if (answerText == "yes")
                            $scope.initializeOther(term);
                        else if (answerText == "no")
                            $scope.deleteOther(term);
                    }
                    // console.log(term, answer);
                }

                function removeSelectedChildren(identifier) {
                    var term = _.find($scope.terms, { identifier: identifier });

                    _.forEach(term.narrowerTerms, function (narrowerIdentifier) {
                        var narrowerTerm = _.find($scope.terms, { identifier: narrowerIdentifier });
                        narrowerTerm.showElement = false;

                        if ($scope.identifiers[narrowerIdentifier] != undefined) {
                            delete $scope.identifiers[narrowerIdentifier];
                            delete $scope.sections[identifier];
                            delete $scope.otherCustomValues[identifier];
                        }

                        if (narrowerTerm.narrowerTerms && narrowerTerm.narrowerTerms.length > 0)
                            removeSelectedChildren(narrowerIdentifier);
                    });
                }

                function setChildrenSelected(identifier, skipRecurvsive) {
                    var term = _.find($scope.terms, { identifier: identifier });
                    if(term){
                        term.showElement = true;
                        _.forEach(term.narrowerTerms, function (narrowerIdentifier) {
                            var narrowerTerm = _.find($scope.terms, { identifier: narrowerIdentifier });
                            narrowerTerm.showElement = true;

                            if (!skipRecurvsive && narrowerTerm.narrowerTerms && narrowerTerm.narrowerTerms.length > 0)
                                setChildrenSelected(narrowerIdentifier);
                        });
                    }
                }
                    

                //==============================
                //
                //==============================
                $scope.isRequired = function () {
                    return $scope.required != undefined && $.isEmptyObject($scope.binding);
                }

                //==============================
                //
                //==============================
                $scope.onTerms = function (refTerms) {

                    $scope.rootTerms = [];

                    if (refTerms) {
                        if (($scope.layout || "tree") == "tree") //Default layout
                            $scope.rootTerms = thesaurus.buildTree(refTerms);
                        else
                            $scope.rootTerms = Enumerable.from(refTerms).Select("o=>{identifier : o.identifier, name : o.name, title : o.title, description : o.description}").ToArray();

                    }

                    $scope.load();
                }

                //==============================
                //
                //==============================
                $scope.setError = function (error) {
                    if (!error) {
                        $scope.error = null;
                        return;
                    }

                    if (error.status == 404) $scope.error = "Terms not found";
                    else $scope.error = error.data || "unknown error";
                }

                $scope.$emit("getDocumentInfo", {});

                $scope.isReadOnly = function (identifier) {
                    return _.indexOf(readOnlyElements, identifier) >= 0;
                }

                $scope.isMainElement = function (identifier) {
                    return _.indexOf(mainElements, identifier) >= 0;
                }
                $scope.isSecondaryElement = function (identifier) {
                    return _.indexOf(secondaryElements, identifier) >= 0;
                }
                $scope.isYesNo = function (identifier) {
                    return _.indexOf(yesnoElements, identifier) >= 0 ||
                        identifier.indexOf('#') > 0;
                };

                $scope.showHideNode = function (elementId) {
                    $element.find('#' + elementId).toggle();
                };

                $scope.isParentSelected = function (identifier, level) {

                    var term = _.find($scope.terms, { identifier: identifier });

                    return term && term.showElement;
                };

                $scope.isOther = function (term) {
                    // console.log(term.broaderTerms);
                    // if(term.identifier == 'BE944E70-2098-45AC-891B-D5E94AFECB99'){
                        
                        var result =  term.broaderTerms && _.includes(_.map(term.broaderTerms, 'identifier'), 'BE944E70-2098-45AC-891B-D5E94AFECB99');
                        if(result && $scope.identifiers && $scope.identifiers['BE944E70-2098-45AC-891B-D5E94AFECB99']!=undefined)
                            return $scope.identifiers['BE944E70-2098-45AC-891B-D5E94AFECB99'];

                        return result;
                    // }
                }
                $scope.$watch('geneticResource.types', function(newVal, oldVal){
                    if(newVal && $scope.geneticResource.grTypesApi){
                        
                        var newElementIdentifiers = _.map(newVal, "identifier");
                        var oldElementIdentifiers = _.map(oldVal, "identifier");
                        var allTypeIdentifier = "4E2974DF-216E-46C8-8797-8E3A33D6A048";

                        if(_.includes(newElementIdentifiers, allTypeIdentifier)){

                            var newElements = _.difference(newElementIdentifiers, oldElementIdentifiers);

                            if(_.includes(newElements, allTypeIdentifier))
                                $scope.geneticResource.grTypesApi.selectAll();
                            else if(oldVal.length > newVal.length)
                                $scope.geneticResource.grTypesApi.unSelectItem({identifier:allTypeIdentifier});
                        }
                    }
                })
                $scope.$watch('geneticResource.areas', function(newVal, oldVal){
                    if(newVal && $scope.geneticResource.grAreasApi){
                        var source = $scope.options.grAreas();
                            var newElementIdentifiers = _.map(newVal, "identifier");
                        var oldElementIdentifiers = _.map(oldVal, "identifier");

                        var newElements = _.difference(newElementIdentifiers, oldElementIdentifiers);
                        if(newElements.length){
                            var element = $scope.geneticResource.grAreasApi.getItem(newElements[0]);
                            if(element && element.children){
                                _.forEach(element.children,  $scope.geneticResource.grAreasApi.selectItem)
                            }
                        }
                        else{ //element was unchecked
                            var oldElements = _.difference(oldElementIdentifiers, newElementIdentifiers);
                            if(oldElements.length){
                                var element = $scope.geneticResource.grAreasApi.getItem(oldElements[0]);
                                if(element){
                                    $scope.geneticResource.grAreasApi.unSelectItem({identifier: element.parent})
                                }
                            }
                        }
                    }
                });

                $scope.hasIdentifier = function(identifier, list){
                    return _.find(list, {identifier: identifier});
                }

                $scope.addGRRecord = function (geneticResource, grTypesApi, grAreasApi) {
                    if (!geneticResource || (!geneticResource.types || !geneticResource.areas)) {
                        alert('please select a GR Type and GR Area');
                        return;
                    }
                    if (!$scope.binding.geneticResources.elements)
                        $scope.binding.geneticResources.elements = [];
                    $scope.binding.geneticResources.elements.push({
                        types: geneticResource.types,
                        areas: geneticResource.areas
                    });
                    geneticResource.types = undefined;
                    geneticResource.areas = undefined;
                    grTypesApi.unSelectAll();
                    grAreasApi.unSelectAll();
                };

                $scope.deleteElement = function (element) {
                    $scope.binding.geneticResources.elements.splice($scope.binding.geneticResources.elements.indexOf(element), 1);
                }

                $scope.addOther = function (term) {
                    if (!term)
                        term = [];

                    term.push({});
                }

                $scope.deleteOtherElement = function (element, otherElements) {
                    otherElements.splice(otherElements.indexOf(element), 1);
                    $scope.save();
                };

                $scope.appendEmptyOther = function (otherElements, skipSave) {
                    $timeout(function(){
                        var lastItem = otherElements[otherElements.length - 1];
                        if (!angular.equals(lastItem, {}) && lastItem.name != "")
                            otherElements.push({});

                        if(!skipSave)
                        $scope.save();
                    }, 200);
                }

                $scope.initializeOther = function (otherElement) {
                    $scope.otherTerms[otherElement.identifier] = [];
                    //.scopeOtherElements = [];
                    $scope.otherTerms[otherElement.identifier].push({});
                    // otherElement.scopeOtherElements.push({name:'', section:''});
                    $scope.save();
                }

                $scope.deleteOther = function (otherElement) {
                    delete $scope.sections[otherElement.identifier];                   
                    delete $scope.otherTerms[otherElement.identifier];
                    $scope.save();
                }

                $scope.applyPadding = function (term) {

                    return term.identifier != '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED#08B2CDEC-786F-4977-AD0A-6A709695528D' &&
                        term.identifier != '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED#E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63' &&
                        !term.narrowerTerms && (term.identifier.indexOf('5B6177DD-5E5E-434E-8CB7-D63D67D5EBED') >= 0 ||
                            !$scope.isYesNo(term.identifier))

                };

                $scope.isStaticIdentifier = function (identifier) {
                    //use indexof to catch #others
                    return _.indexOf(staticIdentifiers, identifier) >= 0
                }



                function appendOthers(elementMeasures, other) {
                    _.forEach(elementsForOthers, function(element, key) {
                        var otherElement = angular.copy(other);
                        // if(otherElement.identifier.indexOf('#')>0)
                        //     otherElement.identifier = otherElement.identifier;
                        // else
                            otherElement.identifier = otherElement.identifier + '#' + key;
                        otherElement.broaderTerms.push(key);
                        var el = _.find(elementMeasures, {identifier:key});
                        otherElement.title.en = element.title;
                        otherElement.description = element.description;
                        elementMeasures.push(otherElement);


                        var parentElement = _.find(elementMeasures, {
                            identifier: key
                        })
                        if (parentElement)
                            parentElement.narrowerTerms.push(otherElement.identifier);

                    });
                    return elementMeasures;
                }
                
                function updateABSMeasureText(data){

                    _.forEach(data, function(element){
                        if(measureMatrixUpdatedTitles[element.identifier]){
                            element.title = measureMatrixUpdatedTitles[element.identifier];
                        }
                        //change hierarchy are required by abs measure matrix
                        if(element.identifier == 'A896179F-833E-4F76-B3F4-81CC95C66592'){// Mutually agreed terms
                            var benefitSharing = _.find(data, {identifier:'9847FA8A-16C3-4466-A378-F20AF9FF883B'})
                            benefitSharing.narrowerTerms = element.narrowerTerms;
                        }
                    });
                    // remove Mutually agreed terms
                    return _.filter(data, function(element){
                        return element.identifier != 'A896179F-833E-4F76-B3F4-81CC95C66592'
                    });
                }

                function loadElementsSource(){
                    $scope.isElementsLoading = true;
                    var queries = [$scope.options.absMeasures(), $scope.options.other()]
                    $q.all(queries)
                        .then(function(data) {
                            var elementMeasures = data[0];
                            var other = data[1].data;
                            elementMeasures = appendOthers(elementMeasures, other);
                            $scope.terms = elementMeasures;

                        })
                        .finally(function(){
                            $scope.isElementsLoading = false;
                        });
                }

                loadElementsSource();

                $scope.$watch('validationReport', function(validationReport){
                    if(!validationReport)
                        return;                    

                    $element.find('.measure-matrix-error').removeClass('measure-matrix-error')
                    if(validationReport && validationReport.errors){
                        validationReport.errors.forEach(function(error){
                            var row = $element.find('[name="'+error.property+'"]');
                            if(row.length<1)
                                row = $element.find('#'+error.property);  
                            if(row.length<1)
                                row = $element.find('#'+error.property.replace(/^col_/, 'qt_'));  
                            row.addClass('measure-matrix-error')
                        });
                    }
                });
            }]
        }
    });
});
