define(['app', '/app/views/forms/edit/edit.js',
    '../view/view-abs-checkpoint-communique.directive.js',
    '/app/views/forms/edit/permit-selection-directive.html.js',
    '/app/js/common.js'
], function(app) {

    app.controller("editCheckpointCommunique", ["$scope", "$http", "$filter", "$q", "$controller", "IStorage",
        "underscore", "Thesaurus", "Enumerable", "$location", 'commonjs',
        function($scope, $http, $filter, $q, $controller, storage, _, Thesaurus, Enumerable, $location, commonjs) {
            $controller('editController', {
                $scope: $scope
            });

            $scope.path = $location.path();

            $scope.checkpointList = [];
            _.extend($scope.options, {
                permits: function() {
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
                            updateCheckpointBody();
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

            $scope.$watch("document.checkpointSelected", function() {
                updateCheckpointBody();
            });
            //==================================
            //
            //==================================
            $scope.getCleanDocument = function(document) {

                document = document || $scope.document;

                if (!document)
                    return undefined;

                document = angular.fromJson(angular.toJson(document));
                if (document.permitNotAvailable === true) {
                    document.permit = undefined;
                } else {
                    document.originCountries = undefined;
                    document.responsibleAuthority = undefined;
                    document.subjectMatter = undefined;
                    document.specimen = undefined;
                    document.taxonomy = undefined;
                    document.gisFiles = undefined;
                    document.gisMapCenter = undefined;
                    document.keywords = undefined;
                    document.referenceOfInformedConsent = undefined;
                    document.referenceOfAgreedTerms = undefined;
                    document.personeToWhomGranted = undefined;
                    document.responsibleAuthorities = undefined;
                }
                if (document.date == '')
                    document.date = undefined;

                if (document.dateFrom == '')
                    document.dateFrom = undefined;

                if (document.dateTo == '')
                    document.dateTo = undefined;

                if (/^\s*$/g.test(document.notes))
                    document.notes = undefined;

                if (!$scope.isOthers()) {
                    document.keywordOthers = undefined;
                }

                // if (document.checkpointSelected) {
                //     document.checkpoint = [];
                //     document.checkpointSelected.forEach(function(checkpoint) {
                //
                //         var selected = _.where($scope.checkpointList, {
                //             "identifier": checkpoint.identifier
                //         });
                //         if (selected && selected.length > 0 && selected[0].body)
                //             selected = selected[0].body;
                //         // console.log(_.isEmpty(selected));
                //         if (!_.isEmpty(selected))
                //             document.checkpoint.push(selected);
                //     });
                //     if (_.isEmpty(document.checkpoint))
                //         document.checkpoint = undefined;
                // } else
                    document.checkpoint = undefined;
                return document;
            };

            //==================================
            //
            //==================================
            $scope.isPermitNotAvailable = function(document) {
                document = document || $scope.document;

                return document &&
                    document.permitNotAvailable;
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

            function updateCheckpointBody() {
                _.each($scope.document.checkpointSelected, function(checkpoint) {
                    var selected = _.findWhere($scope.checkpointList, {
                        "identifier": checkpoint.identifier
                    });
                    if (selected && !selected.body) {
                        $q.when(storage.documents.get(checkpoint.identifier))
                            .then(function(cpBody) {
                                selected.body = cpBody.data;
                            });
                    }

                });
            }

            $scope.setDocument();
        }
    ]);
});
