define(['app', 'underscore'], function(app, _) {

    app.directive("measureMatrixElements", function() {
        return {
            restrict: "EAC",
            templateUrl: "/app/views/search/measure-matrix-elements-derective.html",
            replace: true,
            transclude: false,
            require: "?ngModel",
            scope: {
                binding: "=ngModel",
                locales: "=",
                termsFn: "&terms",
                type: "@",
                layout: "@",
                document: "=document"
            },
            link: function($scope, $element, $attr, ngModelController) {
                $scope.identifiers = null;
                $scope.sections = null;
                $scope.terms = null;
                $scope.rootTerms = [];

                $scope.$watch("document", $scope.onTerms);
                $scope.$watch("binding", $scope.load);
                $scope.$watch("binding", function() {
                    ngModelController.$setViewValue($scope.binding);
                });
                $scope.init();


            },
            controller: ["$scope", "$q", "Thesaurus", "Enumerable", "$http", "guid", function($scope, $q, thesaurus, Enumerable, $http, guid) {
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
                }

                //==============================
                //
                //==============================
                $scope.load = function() {
                    if (!$scope.terms) // Not initialized
                        return;

                    var oNewIdentifiers = {};
                    var oNewSections = {};

                    if (!$.isArray($scope.terms))
                        throw "Type must be array";

                    if ($scope.binding) {

                        if (!$.isArray($scope.binding))
                            throw "Type must be array";

                        for (var i = 0; i < $scope.binding.length; ++i) {
                            oNewIdentifiers[$scope.binding[i].identifier] = true;
                            oNewSections[$scope.binding[i].identifier] = $scope.binding[i].section
                        }
                    }

                    if (!angular.equals(oNewIdentifiers, $scope.identifiers)) $scope.identifiers = oNewIdentifiers;
                    if (!angular.equals(oNewSections, $scope.sections)) $scope.sections = oNewSections;
                }


                //==============================
                //
                //==============================
                $scope.onTerms = function(refTerms) {

                    $scope.rootTerms = [];

                    if (refTerms) {
                        $scope.load();
                        if (!$.isArray($scope.document)){
                            if ($scope.document.amendedMeasures || $scope.document.linkedMeasures) {
                                var measures = _.union(($scope.document.amendedMeasures || []), ($scope.document.linkedMeasures || []));
                                var amendedMeasures = _.map(measures, function(item) {
                                    return $http.get('/api/v2013/documents/' + item.identifier)
                                })
                                $q.all(amendedMeasures)
                                    .then(function(data) {
                                        console.log(data)
                                        data.forEach(function(measure) {
                                            appendElementMeasure(measure.data, $scope.terms);
                                            return;
                                        });
                                    })
                                    .then(function(data) {
                                        buildTree();
                                        updateProperties($scope.rootTerms, 1)
                                    });
                            } else {
                                buildTree();
                            }
                        }
                        else if ($.isArray($scope.document)){

                            _.each($scope.document, function(measure){
                                addMeasureToElements(measure);
                                buildTree();
                                updateProperties($scope.rootTerms, 1);
                                console.log($scope.rootTerms, $scope.sections);
                            });

                        }

                    }
                }

                function buildTree() {
                    if (($scope.layout || "tree") == "tree") //Default layout
                        $scope.rootTerms = thesaurus.buildTree($scope.terms);
                    else
                        $scope.rootTerms = Enumerable.from($scope.terms).Select("o=>{identifier : o.identifier, name : o.name, title : o.title, description : o.description}").ToArray();

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

                function getRleatedMeasures() {

                    _.each(document.amendedMeasures, function(amended) {
                        $http.get('/api/v2013/documents/' + amended.identifier)
                            .success(function(data) {
                                appendElementMeasure(amended);
                                // amended.measure = data;
                                // relatedElement(measure.document, amended.measure);

                            });
                    });

                    // {
                    //   "identifier": "DOC-GUID",
                    //   "title": "DOC-TITLE",
                    //   "broaderTerms": [
                    //     "4E2974DF-216E-46C8-8797-8E3A33D6A048"
                    //   ]
                    // }
                }

                function addMeasureToElements(measure) {
                    if($scope.type=='multiple'){
                        _.forEach(measure.absMeasures, function(measureElement) {
                            newElement(measureElement, measure);
                        });
                    }
                    _.forEach(measure.linkedMeasures, function(measureElement) {
                        _.forEach(measureElement.measure.absMeasures, function(element) {
                            newElement(element, measureElement.measure);
                        });

                    });
                    _.forEach(measure.relatedMeasures, function(measureElement) {
                        _.forEach(measureElement.measure.absMeasures, function(element) {
                            newElement(element, measureElement.measure);
                        });
                        //newElement(measureElement, measureElement.measure);
                    });
                    //åååååconsole.log(terms);
                }

                function newElement(measureElement, measure){

                    var element = _.findWhere($scope.terms, {'identifier': measureElement.identifier});
                    if (element) {
                        var elementMeasure = {};
                        elementMeasure.identifier = guid();
                        elementMeasure.measureIdentifier = measure.header.identifier;
                        elementMeasure.name = elementMeasure.identifier;
                        elementMeasure.title = measure.title;

                        elementMeasure.broaderTerms = [];
                        elementMeasure.broaderTerms.push(element.identifier);
                        element.narrowerTerms.push(elementMeasure.identifier);

                        $scope.terms.push(elementMeasure);

                        $scope.identifiers[elementMeasure.identifier] = true;
                        $scope.sections[elementMeasure.identifier] = measureElement.section;
                    }
                }


                function appendElementMeasure(measure, terms) {

                    _.forEach(measure.absMeasures, function(measureElement) {
                        var element = _.findWhere(terms, {
                            'identifier': measureElement.identifier
                        });
                        if (element) {
                            var elementMeasure = {};
                            elementMeasure.identifier = guid();
                            elementMeasure.measureIdentifier = measure.header.identifier;
                            elementMeasure.name = elementMeasure.identifier;
                            elementMeasure.title = measure.title;
                            elementMeasure.broaderTerms = [];

                            elementMeasure.broaderTerms.push(element.identifier);

                            element.narrowerTerms.push(elementMeasure.identifier);

                            terms.push(elementMeasure);

                            $scope.identifiers[elementMeasure.identifier] = true;
                            $scope.sections[elementMeasure.identifier] = measureElement.section;
                        }
                    });
                    console.log(terms);
                }

                $scope.isMeasure = function(entity) {
                    return entity && _.findWhere($scope.terms, {
                        identifier: entity.identifier
                    }).measureIdentifier;
                }

                $scope.hasMeasure = function(entity) {

                    if (!entity)
                        return false;

                    if (!entity.hasMeasure === undefined)
                        return entity.hasMeasure;

                    if (!entity.narrowerTerms) {
                        entity.hasMeasure = false;
                        return entity.hasMeasure;
                    }

                    entity.hasMeasure = _.some($scope.terms, function(item) {
                        return item.measureIdentifier && _.findWhere(item.broaderTerms, {
                            identifier: entity.identifier
                        });
                    });

                    return entity.hasMeasure;
                }

                function updateProperties(terms, level) {

                    _.each(terms, function(term) {

                        var element = _.findWhere($scope.terms, {
                            identifier: term.identifier
                        });
                        term.level = level;

                        if (element.measureIdentifier) {
                            term.isMeasure = true;
                            _.map(term.broaderTerms, function(brTerm) {
                                brTerm.hasMeasure = true;
                            });
                        }

                        if (term.narrowerTerms) {
                            updateProperties(term.narrowerTerms, level + 1);
                        }

                    });

                }

            }]
        }
    });


});
