import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import 'views/forms/view/abs/view-abs-checkpoint-communique.directive';
import 'views/forms/edit/permit-selection-directive';
import 'services/main';
import editAbsCheckpointCT from '~/app-text/views/forms/edit/abs/edit-absCheckpointCommunique.json';

    export { default as template } from './edit-absCheckpointCommunique.html';

  export default ["$scope", "realm", "$http", "$filter", "$q", "$controller", "IStorage",
    "Thesaurus", "Enumerable", "$location", "commonjs", "translationService",
    function ($scope, realm, $http, $filter, $q, $controller, storage, Thesaurus, Enumerable, $location, commonjs, translationService) {
            $controller('editController', {
                $scope: $scope
            });

            translationService.set('editAbsCheckpointCT', editAbsCheckpointCT);
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

            $scope.onBuildQuery = function(searchText){
                
                var queryOptions = {
                    schemas	  : ['absCheckpoint'],
                    searchText: searchText
                }
                if ($scope.document && $scope.document.government)
                     queryOptions.government = $scope.document.government.identifier;
                return $scope.onBuildDocumentSelectorQuery(queryOptions);
            }

            $scope.onBuildIRCCsQuery = function(searchText){
                var queryOptions = {
                    schemas	  : ['absPermit'],
                    searchText: searchText
                }


                return $scope.onBuildDocumentSelectorQuery(queryOptions);
            }

            $scope.onContactQuery = function(searchText){
                var queryOptions = {
                schemas : ['contact', 'authority'],
                realm : realm.value,
                searchText: searchText,
                query : `((schema_s:authority AND government_s:${$scope.document.government.identifier}) OR schema_s:contact)`
                }
                return $scope.onBuildDocumentSelectorQuery(queryOptions);
            }
            $scope.onContactSkipGovernmentQuery = function(searchText){
                var queryOptions = {
                    schemas	  : ['contact', 'authority'],
                    realm     : realm.value,
                    searchText: searchText
                }

                return $scope.onBuildDocumentSelectorQuery(queryOptions);
            }

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
    ];

