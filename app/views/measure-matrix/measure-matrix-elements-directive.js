import app from 'app';
import template from "text!./measure-matrix-elements-directive.html";
import _ from 'lodash';
import angular from 'angular';
import 'services/main';
import 'views/directives/block-region-directive';

    app.directive("measureMatrixElements", function() {
        return {
            restrict: "EAC",
            template: template, 
            replace: true,
            transclude: false,
            require: "?ngModel",
            scope: {
                title:"@",
                binding: "=ngModel",
                locale: "=",
                type: "@",
                layout: "@",
                document: "=document",
                api:      "=?"
            },
            link: function($scope, $element, $attr, ngModelController) {
                $scope.identifiers = null;
                $scope.sections = null;
                $scope.otherValues = null;
                $scope.terms = null;
                $scope.rootTerms = [];

                $scope.init();
                $scope.$watch("document", $scope.onTerms);
                $scope.$watch("binding", function() {$scope.load()});
                $scope.$watch("binding", function() {
                    ngModelController.$setViewValue($scope.binding);
                });


            },
            controller: ["$scope", "$q", "Thesaurus", "Enumerable", "$http", "guid","commonjs","$element",
            function($scope, $q, thesaurus, Enumerable, $http, guid, commonjs, $element) {

                if(!$scope.title)
                    $scope.title="Elements of the measure";


                var elementsForOthers = {
                    "24E809DA-20F4-4457-9A8A-87C08DF81E8A" : {
                        title : 'Reference to any other relevant articles and sections', description : ''
                    },
                    "08B2CDEC-786F-4977-AD0A-6A709695528D" : {
                        title : 'Any other element relevant to access',
                        description : 'This may include, for instance, additional information on the scope of the access provisions of the measure, special considerations for access, or other relevant access provisions.'
                    },
                    "9847FA8A-16C3-4466-A378-F20AF9FF883B" : {
                        title : 'Any other element relevant to benefit-sharing',
                        description : 'This may include, for instance, additional information on the scope of the benefit-sharing provisions of the measure, establishment of benefit-sharing funds or other relevant benefit-sharing provisions'
                    },
                    "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63" : {
                        title : 'Any other element relevant to compliance',
                        description : 'This may include, for instance, additional information on the scope of the compliance provisions of the measure, or other relevant compliance provisions.'
                    },
                    "01DA2D8E-F2BB-4E85-A17E-AB0219194A17" : {
                        title : 'Any other element relevant to relationship with other international instrument', description : ''
                    },
                    "BE944E70-2098-45AC-891B-D5E94AFECB99" : {
                        title : 'Reference to any other relevant articles and sections', description : ''
                    }
                };
                var geneticResourceTermCopy;
                $scope.api = {
                    reloadMatrix : reloadMatrix
                }

                function reloadMatrix(callLoad){
                    $scope.identifiers = null;
                    $scope.sections = null;
                    $scope.otherValues = null;
                    $scope.terms = null;
                    $scope.rootTerms = [];

                    if(callLoad){
                        $scope.load();
                        $scope.onTerms($scope.document);
                    }
                }

                $scope.termsFn = function(){

                    return $http.get("/api/v2013/thesaurus/domains/50616B56-12F3-4C46-BC43-2DFC26679177/terms", { cache: true })
                    .then(function(data){
                        return updateABSMeasureHierarchy(data.data);
                    });
                 };


                 let initialized = false;
                //==============================
                //
                //==============================
                var other;
                $scope.init = function() {
                    var otherQuery = $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED", { cache: true });
                    return $q.all([$scope.terms||$scope.termsFn(), other||otherQuery])
                        .then(
                        function(data) { // on success
                            $scope.terms = data[0].data||data[0];
                            other        = data[1].data||data[1];
                            //main other
                            //$scope.terms.push(angular.copy(other));
                            _.forEach(elementsForOthers, function(element, key){

                                if(!_.some($scope.terms, {identifier:other.identifier + '#' + key})){

                                    var otherElement = angular.copy(other);
                                    otherElement.title = element.title;
                                    otherElement.identifier = otherElement.identifier + '#' + key;
                                    otherElement.broaderTerms.push(key);
                                    $scope.terms.push(otherElement)

                                    var parentElement = _.find($scope.terms, {identifier:key})
                                    if(parentElement)
                                      parentElement.narrowerTerms.push(otherElement.identifier);
                                }

                              });
                        });
                }

                //==============================
                //
                //==============================
                $scope.load = function() {

                    return $q.when($scope.init())
                        .then(function(){
                            var oNewIdentifiers = {};
                            var oNewSections = {};
                            var oNewOtherCustomValues = {};
                            var oNewOtherTerms = {};
                            if (!$.isArray($scope.terms))
                                throw "Terms must be array";

                            if ($scope.binding) {
                                if(!$scope.binding.geneticResources || !$scope.binding.geneticResources.elements || !$scope.binding.geneticResources.answer){
                                    //delete  from list
                                   const geneticResource = _.find($scope.terms, {identifier : 'CD2EF4DD-1B94-4283-9E97-8DDC7F23CB6F'});
                                   if(!geneticResourceTermCopy && geneticResource)//for single MM when amending msr has GR
                                        geneticResourceTermCopy = geneticResource;

                                   if(geneticResource){
                                      $scope.terms.splice(_.indexOf($scope.terms, geneticResource), 1);
                                   }
                                }
                                else{
                                    oNewIdentifiers[$scope.binding.geneticResources.identifier] = true;
                                }
                                if ($.isArray($scope.binding.relevantElements)){
                                    for (var i = 0; i < $scope.binding.relevantElements.length; ++i) {
                                        var identifier = $scope.binding.relevantElements[i].identifier;
                                        //handle others

                                        if ($scope.binding.relevantElements[i].parent) {
                                            if ($scope.binding.relevantElements[i].parent){
                                                // identifier.indexOf('#')<0 &&  $scope.binding.relevantElements[i].parent.indexOf('#')<0)
                                                if($scope.binding.relevantElements[i].parent.indexOf('#') > 0)
                                                    identifier = $scope.binding.relevantElements[i].parent;
                                                else
                                                    identifier += '#' + $scope.binding.relevantElements[i].parent;
                                            }
                                            oNewOtherCustomValues[identifier] = $scope.binding.relevantElements[i].customValue;

                                            if($scope.binding.relevantElements[i].parent
                                                && !$scope.binding.relevantElements[i].hasOwnProperty('answer')
                                            ){
                                                // if(oNewOtherCustomValues[identifier] || $scope.binding.relevantElements[i].section){
                                                    if(!oNewOtherTerms[identifier])
                                                        oNewOtherTerms[identifier] = [];

                                                    var lOtherTerm = {
                                                        identifier  : '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED',
                                                        name        : oNewOtherCustomValues[identifier],
                                                        section     : $scope.binding.relevantElements[i].section,
                                                        parent      : $scope.binding.relevantElements[i].parent
                                                    };
                                                    oNewOtherTerms[identifier].push(lOtherTerm);
                                                // }
                                            }
                                        }
                                        if($scope.binding.relevantElements[i].answer != undefined){
                                            oNewIdentifiers[identifier] = $scope.binding.relevantElements[i].answer;
                                        }
                                        if($scope.binding.relevantElements[i].section)
                                            oNewSections[identifier] = $scope.binding.relevantElements[i].section;

                                        var elementTerm = _.find($scope.terms, {identifier:identifier});
                                        if(elementTerm)
                                            elementTerm.answer = $scope.binding.relevantElements[i].answer;
                                    }
                                    initialized = true;
                                }
                            }

                            if (!angular.equals(oNewIdentifiers, $scope.identifiers)){
                                 $scope.identifiers = oNewIdentifiers;

                             }
                            if (!angular.equals(oNewSections, $scope.sections)) $scope.sections = oNewSections;
                            if (!angular.equals(oNewOtherCustomValues, $scope.otherCustomValues)) $scope.otherCustomValues = oNewOtherCustomValues;
                            if (!angular.equals(oNewOtherTerms, $scope.otherTerms)) $scope.otherTerms = oNewOtherTerms;


                        });
                }


                //==============================
                //
                //==============================
                $scope.onTerms = function(refTerms) {

                    $scope.rootTerms = [];

                    if (refTerms) {
                        $q.when($scope.load())
                        .then(function(){
                            if (!$.isArray($scope.document)){
                                if ($scope.document.measureAmendedBy) {

                                    var measureAmendedBy = _.map($scope.document.measureAmendedBy, function(item) {
                                        return $http.get('/api/v2013/documents/' + item.identifier_s+'/info');
                                    })
                                    $q.all(measureAmendedBy)
                                      .then(function(data) {
                                          _.forEach(data, function(measure){
                                            var measureId;
                                            measureId = _.find($scope.document.measureAmendedBy, {'identifier_s': measure.data.body.header.identifier});
                                            if(measureId){
                                                measureId.measure = measure.data.body;
                                                measureId.measure.documentID = measure.data.documentID;
                                            }
                                         });
                                         return;
                                      })
                                      .then(function() {
                                            addMeasureToElements($scope.document);
                                            buildTree();
                                            updateProperties($scope.rootTerms, 1);
                                      });
                                } else {
                                        buildTree();
                                        updateProperties($scope.rootTerms, 1);
                                }
                            }
                            else if ($.isArray($scope.document)){

                                _.forEach($scope.document, function(measure){

                                    //var

                                    addMeasureToElements(measure.document ? measure.document : measure);
                                });
                                buildTree();
                                updateProperties($scope.rootTerms, 1);
                                // console.log($scope.terms, $scope.rootTerms,existing);
                            }
                        })
                        // .then(function(){
                        //
                        //     newMeasureMatrix();
                        //
                        // });
                    }
                };

                function buildTree() {

                    if (($scope.layout || "tree") == "tree") //Default layout
                        $scope.rootTerms = thesaurus.buildTree($scope.terms);
                    else
                        $scope.rootTerms = Enumerable.from($scope.terms).Select("o=>{identifier : o.identifier, name : o.name, title : o.title, description : o.description}").ToArray();
                  // console.log($scope.rootTerms)
                }
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
                }

                function addMeasureToElements(measure) {
                    let grElement = undefined ;
                    if(!measure)
                        return;
                    if($scope.type!='single' && measure.absMeasures){
                        if(measure.absMeasures.geneticResources && measure.absMeasures.geneticResources.elements) {                            
                            // var geneticResource = measure.absMeasures.geneticResourcesElements;
                            var identifier = newMeasureElement({identifier:'CD2EF4DD-1B94-4283-9E97-8DDC7F23CB6F', section:{}}, measure);
                            grElement = _.find($scope.terms, {'identifier': identifier});
                            grElement.geneticResourcesTerms = measure.absMeasures.geneticResources.elements;
                        };
                        _.forEach(measure.absMeasures.relevantElements, function(measureElement) {
                            newMeasureElement(measureElement, measure);
                        });
                    }
                    if($scope.type=='single'){

                        _.forEach(measure.measureAmendedBy, function(measureElement) {
                            if(measureElement.measure && measureElement.measure.absMeasures){
                                if(measureElement.measure.absMeasures.geneticResources && measureElement.measure.absMeasures.geneticResources.elements) {    
                                    if(geneticResourceTermCopy)
                                        $scope.terms.push(geneticResourceTermCopy);
                                    var identifier = newMeasureElement({identifier:'CD2EF4DD-1B94-4283-9E97-8DDC7F23CB6F', section:{}}, measureElement.measure, 'amended', measureElement.measure.header.identifier);
                                    grElement = _.find($scope.terms, {'identifier': identifier});
                                    grElement.geneticResourcesTerms = measureElement.measure.absMeasures.geneticResources.elements;
                                };
                                _.forEach(measureElement.measure.absMeasures.relevantElements, function(element) {
                                    newMeasureElement(element, measureElement.measure, 'amended', measure.header.identifier);
                                });
                            }
                        });
                    }
                }

                function addCustomElement(title, parent, sort){
                    var elementMeasure = {};
                    elementMeasure.identifier = guid();
                    elementMeasure.name = elementMeasure.identifier;
                    elementMeasure.title = title;
                    elementMeasure.sort = sort;
                    elementMeasure.broaderTerms = [];
                    elementMeasure.broaderTerms.push(parent);

                    $scope.terms.push(elementMeasure);

                    var parentElement = _.find($scope.terms, {'identifier': parent});

                    if(!parentElement.narrowerTerms)
                        parentElement.narrowerTerms = [];
                    parentElement.narrowerTerms.push(elementMeasure.identifier);
                    if($scope.identifiers)
                        $scope.identifiers[elementMeasure.identifier] = true;

                    return elementMeasure.identifier;

                }

                var existing = [];
                function newMeasureElement(measureElement, measure, type, parentMeasure){
                    var identifier = measureElement.identifier;

                    if(identifier == "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED#24E809DA-20F4-4457-9A8A-87C08DF81E8A" && measureElement.answer)
                        return;

                    if(measureElement.parent){
                        if(measureElement.parent.indexOf('#') > 0)
                            identifier = measureElement.parent;
                        else
                            identifier += '#' + measureElement.parent;
                    }

                    var element = _.find($scope.terms, {'identifier': identifier});

                    if(!element)
                        return;

                    var measureElementExists = _.some(existing, function(term){
                            return (term.measureId == measure.header.identifier || term.measureId == parentMeasure) &&
                                    term.elementId == measureElement.identifier && (term.type=='linked' || term.type=='amended');
                        });
                    // //measure is already added for the element ignore.
                    if(measureElementExists)
                        return;
                    if($scope.type=='single' && (type=='linked' || type=='amended')){
                        var parentMeasureElementExists = _.find($scope.terms, function(term){
                                                       return term.measureIdentifier == parentMeasure && term.name == identifier;
                                                   });
                        if(parentMeasureElementExists)
                            element = parentMeasureElementExists;
                    }

                    if (element) {
                        var elementMeasure = {};
                        elementMeasure.identifier = guid();
                        elementMeasure.measureIdentifier = measure.header.identifier;
                        elementMeasure.name = element.identifier;
                        elementMeasure.title = measure.title;
                        elementMeasure.measureType = type;

                        elementMeasure.broaderTerms = [];
                        elementMeasure.broaderTerms.push(element.identifier);
                        if(!element.narrowerTerms)
                            element.narrowerTerms = [];
                        element.narrowerTerms.push(elementMeasure.identifier);

                        $scope.terms.push(elementMeasure);

                        if($scope.identifiers)
                            $scope.identifiers[elementMeasure.identifier] = true;
                        if(measureElement.section ||measureElement.elements)
                            $scope.sections[elementMeasure.identifier] = measureElement.section||{};
                         if(measureElement.customValue){
                             if(!$scope.otherCustomValues)
                                $scope.otherCustomValues = [];
                            $scope.otherCustomValues[elementMeasure.identifier] = measureElement.customValue||{};
                         }


                        existing.push({measureId:measure.header.identifier, elementId:element.identifier, type:type});

                        return elementMeasure.identifier;
                    }
                }

                function updateProperties(terms, level) {

                    _.forEach(terms, function(term) {

                        var element = _.find($scope.terms, {
                            identifier: term.identifier
                        });
                        term.level = level;

                        term.answer = element.answer||$scope.identifiers[term.identifier];

                        if (element.measureIdentifier) {
                            term.sortOrder = 1;
                            term.isMeasure = true;
                            term.measure = {};
                            var doc;
                            var amendedForTitle;
                            if($scope.type=='multiple'){
                                doc = _.find($scope.document , function(measure){return measure.document && measure.document.header.identifier==element.measureIdentifier;});
                                if(doc && doc.document.amendedMeasures){
                                    amendedForTitle='';
                                    _.forEach(doc.document.amendedMeasures, function(msr){
                                        var amendedFor = _.find($scope.document , function(measure){return measure.document.header.identifier== msr.identifier;});
                                        if(amendedFor)
                                            amendedForTitle += amendedFor.rec_title;
                                    });
                                }
                                term.sortOrder = getJurisdictionSortIndex(doc.document.jurisdiction.identifier);
                                term.sortOrder2 = getDocumentTypeSortIndex(doc.document.type.identifier);
                                term.createdDate_dt = doc.createdDate_dt;
                            }
                            else{
                                doc ={document: _.head($scope.document.measureAmendedBy)};
                            }

                            term.measure = {identifier: doc.document.identifier_s||doc.identifier_s,
                                            government_s : doc.document.government_s||doc.government_s,
                                            documentID:commonjs.hexToInteger(doc.document.id||doc.id),
                                            type: doc.document.schema_s||doc.schema_s,
                                            amendedFor:amendedForTitle, revision:doc.document._revision_i||doc._revision_i};
                           term.measureType = element.measureType;

                           if(element.geneticResourcesTerms){
                                term.geneticResourcesTerms = element.geneticResourcesTerms;
                                term.isChildSelected = true;
                            }

                            _.map(term.broaderTerms, function(brTerm) {
                                brTerm.hasMeasure = true;
                            });
                        }
                        else {
                            term.sortOrder = 10;
                        }

                        if(element.sort)
                            term.sortOrder = element.sort;
                        //special case for genetic resource
                        if(term.identifier=='CD2EF4DD-1B94-4283-9E97-8DDC7F23CB6F' && term.answer==true){
                            term.isChildSelected = true;
                            updateProperties(term.narrowerTerms, level + 1);
                        }
                        else if (term.narrowerTerms) {
                                term.isChildSelected = updateProperties(term.narrowerTerms, level + 1);
                        }
                        if(!term.isChildSelected) {
                            if($scope.sections[term.identifier])
                                term.isChildSelected = true;
                        }
                        if(term.isChildSelected){
                            _.map(term.broaderTerms, function(brTerm) {
                                brTerm.isChildSelected = true;
                            });
                        }

                    });
                    return _.some(terms, function(term){
                        return $scope.sections[term.identifier] || term.isChildSelected;
                    });
                }

                $scope.showHideNode = function(elementId){
                    $element.find('#'+elementId).toggle();
                };

                $scope.showHideAll = function(collapse){
                    _.forEach($scope.rootTerms, function(term){
                        term.showUp = collapse;
                        if(collapse)
                            $element.find('#'+term.identifier).hide();
                        else
                            $element.find('#'+term.identifier).show();
                    })
                };

                function getJurisdictionSortIndex(term){

                    switch (term) {
                        case '528B1187-F1BD-4479-9FB3-ADBD9076D361':
                            return 1;
                        case '7437F880-7B12-4F26-AA91-CED37250DD0A':
                            return 2;
                        case 'DEBB019D-8647-40EC-8AE5-10CA88572F6E':
                            return 3;
                        case '9627DF2B-FFAC-4F85-B075-AF783FF2A0B5':
                            return 4;
                        default:
                            return 5

                    }
                }

                function getDocumentTypeSortIndex(term){

                    switch (term) {
                        case '8165BF22-EEF0-4DF8-B3F2-8E0AEED13E2F':
                            return 1;
                        case '383BDFAC-7AD0-4A22-840D-086CC836EEF8':
                            return 2;
                        case '679A7709-05AF-4B03-8532-ABB425021D93':
                            return 3;
                        case '14CE4B07-ABF7-41C3-884A-5982C22690E0':
                            return 4;
                        case '6DD06795-ADF2-468E-A6C1-01399E5FF934':
                            return 5;
                        case 'BF41B8A3-D653-4E1D-8C69-A5FE352D9957':
                            return 6;
                        default:
                            return 7

                    }

                }

                function updateABSMeasureHierarchy(data){

                    _.forEach(data, function(element){
                        //change hierarchy are required by abs measure matrix
                        if(element.identifier == 'A896179F-833E-4F76-B3F4-81CC95C66592'){// Mutually agreed terms
                            var benefitSharing = _.find(data, {identifier:'9847FA8A-16C3-4466-A378-F20AF9FF883B'})
                            if(benefitSharing)
                                benefitSharing.narrowerTerms = element.narrowerTerms;
                        }
                    });
                    // remove Mutually agreed terms
                    return _.filter(data, function(element){
                        return element.identifier != 'A896179F-833E-4F76-B3F4-81CC95C66592'
                    });
                }

                $scope.isEmpty = function(section){
                    return _.isEmpty(section);
                }

            }]
        };
    });



