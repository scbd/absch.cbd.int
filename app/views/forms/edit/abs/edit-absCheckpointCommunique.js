define(['app','lodash','views/forms/edit/edit',
    'views/forms/view/abs/view-abs-checkpoint-communique.directive',
    'views/forms/edit/permit-selection-directive',
    'js/common'
], function(app,_) {

    app.controller("editCheckpointCommunique", ["$scope", "$http", "$filter", "$q", "$controller", "IStorage",
        "lodash", "Thesaurus", "Enumerable", "$location", 'commonjs',
        function($scope, $http, $filter, $q, $controller, storage, _, Thesaurus, Enumerable, $location, commonjs) {
            $controller('editController', {
                $scope: $scope
            });

            $scope.path = $location.path();

            $scope.checkpointList = [];
            _.extend($scope.options, {
                absIRCCs: function() {
                    return commonjs.loadSchemaDocumentsForDropdown('absPermit');
                },
                keywords: function() {
                    return $q.all([$http.get("/api/v2013/thesaurus/domains/1A22EAAB-9BBC-4543-890E-DEF913F59E98/terms", {
                                cache: true
                            }),
                            $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED", {
                                cache: true
                            })
                        ])
                        .then(function(o) {
                            var data = o[0].data;
                            data.push(o[1].data)
                            return Thesaurus.buildTree(data);
                        });
                },
                checkpoints: function() {
                    return $q.when(commonjs.loadSchemaDocumentsForDropdown('absCheckpoint'))
                        .then(function(data) {
                            $scope.checkpointList = data;
                            return data;
                        });
                }
            });

            //==================================
            //
            //==================================
            //I think this is shared with absCheckpoint... perhas I should put it in base?
            $scope.$watch("document.gisFiles", function() {

                var qLinks = [];
                var qGis = [];

                if ($scope.document)
                    qLinks = $scope.document.gisFiles || [];

                /* global L: true */ // JSHint for leaflet

                angular.forEach(qLinks, function(link) {
                    qGis.push($http.get(link.url).then(function(res) {
                        return L.geoJson(res.data);
                    }));
                });

                $q.all(qGis).then(function(layers) {
                    $scope.gisLayer = layers;
                });
            });

            //==================================
            //
            //==================================
            $scope.getCleanDocument = function(document) {

                document = document || $scope.document;

                if (!document)
                    return undefined;

                document = angular.fromJson(angular.toJson(document));
                if (document.absIRCCsNotAvailable === true) {
                    document.absIRCCs = undefined;
                } else {
                    document.sourceCountries = undefined;
                    document.entityWhoGrantedPIC = undefined;
                    document.subjectMatter = undefined;
                    document.specimens = undefined;
                    document.taxonomies = undefined;
                    document.gisFiles = undefined;
                    document.gisMapCenter = undefined;
                    document.keywords = undefined;
                    document.evidenceOfPIC = undefined;
                    document.evidenceOfMAT = undefined;
                    document.entityToWhomPICGranted = undefined;
                    document.responsibleAuthorities = undefined;
                }
                if (document.dateCollected == '')
                    document.dateCollected = undefined;

                if (document.dateCollectedFrom == '')
                    document.dateCollectedFrom = undefined;

                if (document.dateCollectedTo == '')
                    document.dateCollectedTo = undefined;

                if (/^\s*$/g.test(document.notes))
                    document.notes = undefined;

                if (!$scope.isOthers()) {
                    document.keywordOther = undefined;
                }
                document.checkpointSelected = undefined;
                document.informationDocuments = undefined;

                return $scope.sanitizeDocument(document);
            };

            //==================================
            //
            //==================================
            $scope.isAbsIRCCsNotAvailable = function(document) {
                document = document || $scope.document;

                return document &&
                    document.absIRCCsNotAvailable;
            };

            $scope.isOthers = function(document) {

                document = document || $scope.document;
                if (!document || !document.keywords)
                    return false;

                var qLibraries = Enumerable.from(document.keywords);

                return qLibraries.any(function(o) {
                    return o.identifier == "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED";
                });

            };

            $scope.setDocument();
        }
    ]);
});
