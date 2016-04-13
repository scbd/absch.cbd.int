define(['app', 'underscore','angular', '/app/js/common.js', '/app/views/directives/block-region-directive.js'], function(app, _, angular) {

    app.directive("measureMatrixElements", function() {
        return {
            restrict: "EAC",
            templateUrl: "/app/views/search/measure-matrix-elements-derective.html",
            replace: true,
            transclude: false,
            require: "?ngModel",
            scope: {
                title:"@",
                binding: "=ngModel",
                locales: "=",
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
                $scope.$watch("binding", $scope.load);
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
                    "5B6177DD-5E5E-434E-8CB7-D63D6BLAISE8" : {
                        title : 'Reference to any other relevant articles and sections', description : ''
                    }
                };
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

                        return getABSMeasure();

                    });
                 };



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
                            _.each(elementsForOthers, function(element, key){

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

                                if (!$.isArray($scope.binding.relevantElements))
                                    throw "ABS Elements must be array";

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
                                        // && identifier != '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED#5B6177DD-5E5E-434E-8CB7-D63D6BLAISE8'
                                        ){
                                            if(!oNewOtherTerms[identifier])
                                                oNewOtherTerms[identifier] = [];

                                            var lOtherTerm = {
                                                identifier  : '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED',
                                                name        : oNewOtherCustomValues[identifier],
                                                section     : $scope.binding.relevantElements[i].section,
                                                parent      : $scope.binding.relevantElements[i].parent
                                            };
                                            oNewOtherTerms[identifier].push(lOtherTerm);
                                        }
                                    }
                                    if($scope.binding.relevantElements[i].answer != undefined){
                                        oNewIdentifiers[identifier] = $scope.binding.relevantElements[i].answer;
                                        // if(((!$scope.binding.relevantElements[i].answer && identifier != $scope.scopeOfMeasureTerm)
                                        // || ($scope.binding.relevantElements[i].answer && identifier == $scope.scopeOfMeasureTerm)))
                                        //     setChildrenSelected(identifier, identifier != $scope.scopeOfMeasureTerm);
                                    }
                                    // else
                                    //     oNewIdentifiers[identifier] = true;
                                    // if($scope.binding.relevantElements[i].identifier.indexOf('5B6177DD-5E5E-434E-8CB7-D63D67D5EBED')<0)
                                        oNewSections[identifier] = $scope.binding.relevantElements[i].section;

                                    var elementTerm = _.findWhere($scope.terms, {identifier:identifier});
                                    if(elementTerm)
                                        elementTerm.answer = $scope.binding.relevantElements[i].answer;
                                }
                                initialized = true;
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
                                        return $http.get('/api/v2013/documents/' + item.identifier_s);
                                    })
                                    $q.all(measureAmendedBy)
                                      .then(function(data) {
                                          _.each(data, function(measure){
                                            var measureId;
                                            measureId = _.findWhere($scope.document.measureAmendedBy, {'identifier_s': measure.data.header.identifier});
                                            if(measureId){
                                                measureId.measure = measure.data;
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

                                _.each($scope.document, function(measure){

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
                    else $scope.error = error.data || "unkown error";
                }

                var grSubsetId;
                var grCoverId
                function addMeasureToElements(measure) {
                    if(!measure)
                        return;
                    if($scope.type!='single'){
                        if(measure.absMeasures.geneticResource) {
                            if(measure.absMeasures.geneticResource.answer){
                                if(!grCoverId)
                                    grCoverId = addCustomElement('Covers all genetic resources', '4E2974DF-216E-46C8-8797-8E3A3BLAISE1', 1);
                                var geneticResource = measure.absMeasures.geneticResource;
                                newMeasureElement({identifier:grCoverId, section:geneticResource.section}, measure);
                            }
                            else{
                                if(!grSubsetId)
                                    grSubsetId = addCustomElement('Covers a subset of genetic resources', '4E2974DF-216E-46C8-8797-8E3A3BLAISE1', 2);

                                var geneticResource = measure.absMeasures.geneticResource;
                                var identifier = newMeasureElement({identifier:grSubsetId, section:{}}, measure);
                                grElement = _.findWhere($scope.terms, {'identifier': identifier});
                                grElement.geneticResourcesTerms = measure.absMeasures.geneticResource.elements;
                            }
                        };
                        _.each(measure.absMeasures.relevantElements, function(measureElement) {
                            newMeasureElement(measureElement, measure);
                        });
                    }
                    if($scope.type=='single'){
                        _.each(measure.measureAmendedBy, function(measureElement) {
                            if(measureElement.measure)
                                _.each(measureElement.measure.absMeasures, function(element) {
                                    newMeasureElement(element, measureElement.measure, 'amended', measure.header.identifier);
                                });

                        });
                        // _.each(measure.linkedMeasures, function(measureElement) {
                        //     if(measureElement.measure)
                        //         _.each(measureElement.measure.absMeasures, function(element) {
                        //             newMeasureElement(element, measureElement.measure, 'linked', measure.header.identifier);
                        //         });
                        //
                        // });
                        // _.each(measure.amendedMeasures, function(measureElement) {
                        //     if(measureElement.measure)
                        //         _.each(measureElement.measure.absMeasures, function(element) {
                        //             newMeasureElement(element, measureElement.measure, 'amended', measure.header.identifier);
                        //         });
                        // });
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

                    var parentElement = _.findWhere($scope.terms, {'identifier': parent});

                    if(!parentElement.narrowerTerms)
                        parentElement.narrowerTerms = [];
                    parentElement.narrowerTerms.push(elementMeasure.identifier);

                    $scope.identifiers[elementMeasure.identifier] = true;

                    return elementMeasure.identifier;

                }

                var existing = [];
                function newMeasureElement(measureElement, measure, type, parentMeasure){
                    var identifier = measureElement.identifier;

                    if(measureElement.parent){
                        if(measureElement.parent.indexOf('#') > 0)
                            identifier = measureElement.parent;
                        else
                            identifier += '#' + measureElement.parent;
                        // identifier = identifier + '#' + measureElement.parent;
                    }

                    var element = _.findWhere($scope.terms, {'identifier': identifier});

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

                        $scope.identifiers[elementMeasure.identifier] = true;
                        if(measureElement.section ||measureElement.elements)
                            $scope.sections[elementMeasure.identifier] = measureElement.section||{};

                        existing.push({measureId:measure.header.identifier, elementId:element.identifier, type:type});

                        return elementMeasure.identifier;
                    }
                }

                function updateProperties(terms, level) {

                    _.each(terms, function(term) {

                        var element = _.findWhere($scope.terms, {
                            identifier: term.identifier
                        });
                        term.level = level;

                        term.answer = element.answer;

                        if (element.measureIdentifier) {
                            term.sortOrder = 1;
                            term.isMeasure = true;
                            term.measure = {};
                            var doc;
                            var amendedForTitle;
                            if($scope.type=='multiple'){
                                doc = _.find($scope.document , function(measure){return measure.document && measure.document.header.identifier==element.measureIdentifier;});
                                if(doc.document.amendedMeasures){
                                    amendedForTitle='';
                                    _.each(doc.document.amendedMeasures, function(msr){
                                        var amendedFor = _.find($scope.document , function(measure){return measure.document.header.identifier== msr.identifier;});
                                        amendedForTitle += amendedFor.rec_title;
                                    });
                                }
                                term.sortOrder = getJurisdictionSortIndex(doc.document.jurisdiction.identifier);
                                term.sortOrder2 = getDocumentTypeSortIndex(doc.document.type.identifier);
                                term.createdDate_dt = doc.createdDate_dt;
                            }
                            else{
                                doc ={document: $scope.document};
                            }

                            term.measure = {identifier: doc.document.header.identifier,government : doc.document.government,
                                            documentID:commonjs.hexToInteger(doc.id),type: doc.document.header.schema, amendedFor:amendedForTitle};
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
                        if(term.identifier=='4E2974DF-216E-46C8-8797-8E3A3BLAISE1'){
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
                    _.each($scope.rootTerms, function(term){
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
                function getABSMeasure() {
                    return [{
                        "identifier": "24E809DA-20F4-4457-9A8A-87C08DF81E8A",
                        "name": "Scope of the measure",
                        "title": {
                            "en": "Scope of the measure"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": [],
                        "narrowerTerms": ["4E2974DF-216E-46C8-8797-8E3A3BLAISE1", "B8A150E054154AD3AD97856ABD485E90",
                         "2A8B467A-5FC5-41C5-8D7B-71B78E3AFEDD"],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "4E2974DF-216E-46C8-8797-8E3A3BLAISE1",
                        "name": "Genetic resources",
                        "title": {
                            "en": "Genetic resources"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["24E809DA-20F4-4457-9A8A-87C08DF81E8A"],
                        "narrowerTerms": ["4E2974DF-216E-46C8-8797-8E3A33D6A048", "A862ABFC-B97D-4E6A-9A70-812ABLAISE11"],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "4E2974DF-216E-46C8-8797-8E3A33D6A048",
                        "name": "All type of genetic resources",
                        "title": {
                            "en": "All type of genetic resources"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["4E2974DF-216E-46C8-8797-8E3A3BLAISE1"],
                        "narrowerTerms": ["9C146B09-097E-4CFF-B9CC-D4785496952F", "357DBB22-6A6C-4C49-BA1F-037320B09247", "http://data.gbif.org/species/13140807", "33A6BF46-3699-4B5E-A3C0-506FAFDA2D76", "F9EF6CC8-3709-43D5-839C-1A93A23DE51B", "2D2CAF72-A892-42CE-87F7-975EFBADAF4F"],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "9C146B09-097E-4CFF-B9CC-D4785496952F",
                        "name": "Animals",
                        "title": {
                            "en": "Animals"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["4E2974DF-216E-46C8-8797-8E3A33D6A048"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "357DBB22-6A6C-4C49-BA1F-037320B09247",
                        "name": "Plants",
                        "title": {
                            "en": "Plants"
                        },
                        "shortTitle": {},
                        "description": "This includes algae",
                        "source": "",
                        "broaderTerms": ["4E2974DF-216E-46C8-8797-8E3A33D6A048"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "http://data.gbif.org/species/13140807",
                        "name": "Fungi",
                        "title": {
                            "en": "Fungi"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "GBIF",
                        "broaderTerms": ["4E2974DF-216E-46C8-8797-8E3A33D6A048"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "33A6BF46-3699-4B5E-A3C0-506FAFDA2D76",
                        "name": "Microorganism",
                        "title": {
                            "en": "Microorganism"
                        },
                        "shortTitle": {},
                        "description": "This could include, among others, archae, bacteria, fungi, chromista, protozoa and viruses.",
                        "source": "",
                        "broaderTerms": ["4E2974DF-216E-46C8-8797-8E3A33D6A048"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "F9EF6CC8-3709-43D5-839C-1A93A23DE51B",
                        "name": "Domesticated species and/or cultivated species",
                        "title": {
                            "en": "Domesticated species and/or cultivated species"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["4E2974DF-216E-46C8-8797-8E3A33D6A048"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "2D2CAF72-A892-42CE-87F7-975EFBADAF4F",
                        "name": "Wild species",
                        "title": {
                            "en": "Wild species"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["4E2974DF-216E-46C8-8797-8E3A33D6A048"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "A862ABFC-B97D-4E6A-9A70-812ABLAISE11",
                        "name": "Areas of areas of access of the genetic resource",
                        "title": {
                            "en": "Areas of areas of access of the genetic resource"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["24E809DA-20F4-4457-9A8A-87C08DF81E8A"],
                        "narrowerTerms": ["A862ABFC-B97D-4E6A-9A70-812A82A7CC19", "48BCA72F-1458-4393-9448-09B4F501CB25",
                                        "2C87B4AD-684C-48DC-91B7-82938CE37B5A", "CB918E1A-E171-4C10-BA35-088C81F668A3"],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "A862ABFC-B97D-4E6A-9A70-812A82A7CC19",
                        "name": "All areas of access of the genetic resource",
                        "title": {
                            "en": "All areas of access of the genetic resource"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["A862ABFC-B97D-4E6A-9A70-812ABLAISE11"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "35E029ED-D92F-41C8-9CDC-52F3F35D7E36",
                        "name": "Agricultural areas",
                        "title": {
                            "en": "Agricultural areas"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["48BCA72F-1458-4393-9448-09B4F501CB25"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "29C670AB-C198-484F-A2ED-9BAB1DAC7431",
                        "name": "Dry and sub-humid areas",
                        "title": {
                            "en": "Dry and sub-humid areas"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["48BCA72F-1458-4393-9448-09B4F501CB25"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "D570A745-D8C3-4698-BB77-0A90C140F3F2",
                        "name": "Forest",
                        "title": {
                            "en": "Forest"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["48BCA72F-1458-4393-9448-09B4F501CB25"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "47DD3FF6-D369-4E64-B0BC-5DADF3B70C95",
                        "name": "Inland waters",
                        "title": {
                            "en": "Inland waters"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["48BCA72F-1458-4393-9448-09B4F501CB25"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "9EC60226-A7E4-441E-AC7D-2580F111EC3B",
                        "name": "Islands",
                        "title": {
                            "en": "Islands"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["48BCA72F-1458-4393-9448-09B4F501CB25"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "507D46E0-DC49-47F0-B273-26ECD9CC8948",
                        "name": "Marine and coastal areas",
                        "title": {
                            "en": "Marine and coastal areas"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["48BCA72F-1458-4393-9448-09B4F501CB25"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "EAE641FD-6A82-4C15-84CD-0F12ABA5CBC1",
                        "name": "Mountains",
                        "title": {
                            "en": "Mountains"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["48BCA72F-1458-4393-9448-09B4F501CB25"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "DFEECF62-EC3D-4F5C-BAC6-2FD308F81277",
                        "name": "Protected areas",
                        "title": {
                            "en": "Protected areas"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["48BCA72F-1458-4393-9448-09B4F501CB25"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "48BCA72F-1458-4393-9448-09B4F501CB25",
                        "name": "In situ",
                        "title": {
                            "en": "In situ"
                        },
                        "shortTitle": {
                            "en": "In situ"
                        },
                        "description": "In situ areas of access of genetic resources",
                        "source": "",
                        "broaderTerms": ["A862ABFC-B97D-4E6A-9A70-812A82A7CC19"],
                        "narrowerTerms": ["35E029ED-D92F-41C8-9CDC-52F3F35D7E36", "29C670AB-C198-484F-A2ED-9BAB1DAC7431", "D570A745-D8C3-4698-BB77-0A90C140F3F2", "47DD3FF6-D369-4E64-B0BC-5DADF3B70C95", "9EC60226-A7E4-441E-AC7D-2580F111EC3B", "507D46E0-DC49-47F0-B273-26ECD9CC8948", "EAE641FD-6A82-4C15-84CD-0F12ABA5CBC1", "DFEECF62-EC3D-4F5C-BAC6-2FD308F81277"],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "2C87B4AD-684C-48DC-91B7-82938CE37B5A",
                        "name": "Ex-situ collections",
                        "title": {
                            "en": "Ex-situ collections"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["A862ABFC-B97D-4E6A-9A70-812A82A7CC19"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "CB918E1A-E171-4C10-BA35-088C81F668A3",
                        "name": "Soil and/or water samples",
                        "title": {
                            "en": "Soil and/or water samples"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["A862ABFC-B97D-4E6A-9A70-812A82A7CC19"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "B8A150E054154AD3AD97856ABD485E90",
                        "name": "Traditional knowledge associated with genetic resources",
                        "title": {
                            "en": "Traditional knowledge associated with genetic resources"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["24E809DA-20F4-4457-9A8A-87C08DF81E8A"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "2A8B467A-5FC5-41C5-8D7B-71B78E3AFEDD",
                        "name": "Provisions on temporal scope",
                        "title": {
                            "en": "Provisions on temporal scope"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["24E809DA-20F4-4457-9A8A-87C08DF81E8A"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "08B2CDEC-786F-4977-AD0A-6A709695528D",
                        "name": "Access",
                        "title": {
                            "en": "Access"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": [],
                        "narrowerTerms": ["1E824A31-BDFB-4C47-9593-8006B5FC7D60", "5427EB8F-5532-4AE2-88EE-5B9619917480",
                            "5427EB8F-5532-4AE2-88EE-5B961BLAISE4", "5427EB8F-5532-4AE2-88EE-5B961BLAISE5"
                        ],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    },  {
                        "identifier": "1E824A31-BDFB-4C47-9593-8006B5FC7D60",
                        "name": "Access to genetic resources",
                        "title": {
                            "en": "Access to genetic resources"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["08B2CDEC-786F-4977-AD0A-6A709695528D"],
                        "narrowerTerms": ["7CAC5B93-7E27-441F-BFEB-9E416D48B1BE", "A7769659-17DB-4ED4-B1CA-A3ADD9CBD3A4"],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "7CAC5B93-7E27-441F-BFEB-9E416D48B1BE",
                        "name": "For commercial use",
                        "title": {
                            "en": "For commercial use"
                        },
                        "shortTitle": {},
                        "description": "Access and/or prior informed consent / To genetic resources / For commercial use",
                        "source": "",
                        "broaderTerms": ["1E824A31-BDFB-4C47-9593-8006B5FC7D60"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "A7769659-17DB-4ED4-B1CA-A3ADD9CBD3A4",
                        "name": "For non-commercial use",
                        "title": {
                            "en": "For non-commercial use"
                        },
                        "shortTitle": {},
                        "description": "Access and/or prior informed consent / To genetic resources / For non-commercial use",
                        "source": "",
                        "broaderTerms": ["1E824A31-BDFB-4C47-9593-8006B5FC7D60"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "5427EB8F-5532-4AE2-88EE-5B9619917480",
                        "name": "Access to traditional knowledge associated with genetic resources",
                        "title": {
                            "en": "Access to traditional knowledge associated with genetic resources"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["08B2CDEC-786F-4977-AD0A-6A709695528D"],
                        "narrowerTerms": ["3AC68883-4DD9-4F07-A941-30F7B910D24C", "7E3ECD30-1972-487B-A920-DDB439DC2DF6"],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "3AC68883-4DD9-4F07-A941-30F7B910D24C",
                        "name": "For commercial use",
                        "title": {
                            "en": "For commercial use"
                        },
                        "shortTitle": {},
                        "description": "Access and/or prior informed consent / To traditional knowledge associated with genetic resources / For commercial use",
                        "source": "",
                        "broaderTerms": ["5427EB8F-5532-4AE2-88EE-5B9619917480"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "7E3ECD30-1972-487B-A920-DDB439DC2DF6",
                        "name": "For non-commercial use",
                        "title": {
                            "en": "For non-commercial use"
                        },
                        "shortTitle": {},
                        "description": "Access and/or prior informed consent / To traditional knowledge associated with genetic resources / For non-commercial use",
                        "source": "",
                        "broaderTerms": ["5427EB8F-5532-4AE2-88EE-5B9619917480"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "5427EB8F-5532-4AE2-88EE-5B961BLAISE4",
                        "name": "Provides for the issuance of a permit of its equivalent at the time of access for constituting an internationally recognized certificate of compliance",
                        "title": {
                            "en": "Provides for the issuance of a permit of its equivalent at the time of access for constituting an internationally recognized certificate of compliance"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["08B2CDEC-786F-4977-AD0A-6A709695528D"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "5427EB8F-5532-4AE2-88EE-5B961BLAISE5",
                        "name": "Established rules and procedures for mutually agreed terms",
                        "title": {
                            "en": "Established rules and procedures for mutually agreed terms"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["08B2CDEC-786F-4977-AD0A-6A709695528D"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "9847FA8A-16C3-4466-A378-F20AF9FF883B",
                        "name": "Benefit-sharing",
                        "title": {
                            "en": "Benefit-sharing"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": [],
                        "narrowerTerms": ["628FA533-5B81-481A-8374-A0CF8DF0CF22", "0AE1295D-0797-44B6-B0AC-974EA356096D",
                            "628FA533-5B81-481A-8374-A0CF8BLAISE6", "0AE1295D-0797-44B6-B0AC-974EABLAISE7"],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "628FA533-5B81-481A-8374-A0CF8DF0CF22",
                        "name": "Monetary benefits",
                        "title": {
                            "en": "Monetary benefits"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["9847FA8A-16C3-4466-A378-F20AF9FF883B"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "0AE1295D-0797-44B6-B0AC-974EA356096D",
                        "name": "Non-monetary benefits",
                        "title": {
                            "en": "Non-monetary benefits"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["9847FA8A-16C3-4466-A378-F20AF9FF883B"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "628FA533-5B81-481A-8374-A0CF8BLAISE6",
                        "name": "For commercial use",
                        "title": {
                            "en": "For commercial use"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["9847FA8A-16C3-4466-A378-F20AF9FF883B"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "0AE1295D-0797-44B6-B0AC-974EABLAISE7",
                        "name": "For non-commercial use",
                        "title": {
                            "en": "For non-commercial use"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["9847FA8A-16C3-4466-A378-F20AF9FF883B"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63",
                        "name": "Does the measure cover compliance",
                        "title": {
                            "en": "Does the measure cover compliance"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": [],
                        "narrowerTerms": ["4C57FDB4-3B92-46DD-B4C2-BB93DBLAISE8", "4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C", "1FCC6CA9-022F-42FD-BD02-43AE674FEB56"],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    },  {
                        "identifier": "4C57FDB4-3B92-46DD-B4C2-BB93DBLAISE8",
                        "name": "Compliance with domestic legislation or regulatory requirements of the other Party (Article 15 and 16)",
                        "title": {
                            "en": "Compliance with domestic legislation or regulatory requirements of the other Party (Article 15 and 16)"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C",
                        "name": "Issues related to monitoring the utilization of genetic resources (Article 17)",
                        "title": {
                            "en": "Issues related to monitoring the utilization of genetic resources (Article 17)"
                        },
                        "shortTitle": {},
                        "description": "This may include, for instance, information on checkpoints or reporting requirements.",
                        "source": "",
                        "broaderTerms": ["E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "1FCC6CA9-022F-42FD-BD02-43AE674FEB56",
                        "name": "Compliance with mutually agreed terms (Article 18)",
                        "title": {
                            "en": "Compliance with mutually agreed terms (Article 18)"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "01DA2D8E-F2BB-4E85-A17E-AB0219194A17",
                        "name": "Included provisions on how its application relates to other international instruments",
                        "title": {
                            "en": "Includes provisions on how its application relates to other international instruments"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": [],
                        "narrowerTerms": ["A71B36E8-D2CE-4254-A628-6DBFB902394C"],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    },  {
                        "identifier": "A71B36E8-D2CE-4254-A628-6DBFB902394C",
                        "name": "Plant genetic resources for food and agriculture exchanged using the standard material transfer agreement of the International Treaty on Plant Genetic Resources for Food and Agriculture",
                        "title": {
                            "en": "Plant genetic resources for food and agriculture exchanged using the standard material transfer agreement of the International Treaty on Plant Genetic Resources for Food and Agriculture"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["01DA2D8E-F2BB-4E85-A17E-AB0219194A17"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "ECBDB95A-B389-4DB4-AD9B-DA359FONSECA",
                        "name": "Competent national authority/ies",
                        "title": {
                            "en": "Competent national authority/ies"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["5B6177DD-5E5E-434E-8CB7-D63D6BLAISE8"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "7CB2A03A-F0CF-4458-BB3B-A60DEC1F942E",
                        "name": "Transboundary cooperation ",
                        "title": {
                            "en": "Transboundary cooperation "
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["5B6177DD-5E5E-434E-8CB7-D63D6BLAISE8"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "ECE508D3-26C6-42E6-A8B8-162606E5BA04",
                        "name": "Awareness-raising",
                        "title": {
                            "en": "Awareness-raising"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["5B6177DD-5E5E-434E-8CB7-D63D6BLAISE8"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "ECBDB95A-B389-4DB4-AD9B-DA3590DF7781",
                        "name": "Capacity-building",
                        "title": {
                            "en": "Capacity-building"
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "",
                        "broaderTerms": ["5B6177DD-5E5E-434E-8CB7-D63D6BLAISE8"],
                        "narrowerTerms": [],
                        "relatedTerms": [],
                        "nonPreferedTerms": []
                    }, {
                        "identifier": "5B6177DD-5E5E-434E-8CB7-D63D6BLAISE8",
                        "name": "Other ABS Element",
                        "title": {
                            "en": "Other",
                        },
                        "shortTitle": {},
                        "description": "",
                        "source": "In house (ICCP report)",
                        "broaderTerms": [],
                        "narrowerTerms": ["ECBDB95A-B389-4DB4-AD9B-DA359FONSECA", "ECE508D3-26C6-42E6-A8B8-162606E5BA04", "7CB2A03A-F0CF-4458-BB3B-A60DEC1F942E", "ECBDB95A-B389-4DB4-AD9B-DA3590DF7781"],
                        "relatedTerms": [],
                        "nonPreferedTerms": ["OTHER-OBSOLETE"]
                    }]
                }


            }]
        };
    });


});
