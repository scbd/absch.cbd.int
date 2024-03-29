import app from '~/app';
import _ from 'lodash';
import angular from 'angular';
import '~/views/forms/edit/edit';
import '~/services/main';
import '~/views/forms/edit/document-selector';
import '~/views/forms/view/abs/view-measure.directive';
import '~/views/forms/edit/abs/edit-measure-matrix-directive';
import editAbsMeasureT from '~/app-text/views/forms/edit/abs/edit-measure.json';

    export { default as template } from './edit-measure.html';

export default ["$scope", "realm", "$http", "$filter", "$q", "Enumerable", "$controller", "$location", 'commonjs', 'solr', 'translationService',
    function ($scope, realm, $http, $filter, $q, Enumerable, $controller, $location, commonjs, solr, translationService) {
            $controller('editController', {
                $scope: $scope
            });

            translationService.set('editAbsMeasureT', editAbsMeasureT);
            $scope.path = $location.path();

            _.extend($scope.options, {
                languages: function() {
                    return $http.get("/api/v2013/thesaurus/domains/52AFC0EE-7A02-4EFA-9277-8B6C327CE21F/terms", {
                        cache: true
                    }).then(function(o) {
                        return $filter("orderBy")(o.data, "name");
                    });
                },
                other: function() {
                    return $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED", {
                        cache: true
                    });
                },
                typeOfDocuments: function() {
                    return $q.all([
                        $http.get("/api/v2013/thesaurus/domains/144CF550-7629-43F3-817E-CACDED34837E/terms", {
                            cache: true
                        }),
                        $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED", {
                            cache: true
                        })
                    ]).then(function(o) {
                        var data = o[0].data;
                        data.push(o[1].data);
                        return data;
                    });
                },
                jurisdictions: function() {
                    return $q.all([
                        $http.get("/api/v2013/thesaurus/domains/7A56954F-7430-4B8B-B733-54B8A5E7FF40/terms", {
                            cache: true
                        }),
                        $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED", {
                            cache: true
                        })
                    ]).then(function(o) {
                        var jurisdictions = o[0].data;
                        jurisdictions.push(o[1].data)

                        _.forEach(jurisdictions, function(element) {
                            element.__value = element.name;
                        });

                        return jurisdictions;
                    });
                },
                statuses: function() {
                    return $http.get("/api/v2013/thesaurus/domains/ED7CDBD8-7762-4A84-82DD-30C01458A799/terms", {
                        cache: true
                    }).then(function(o) {
                        var statuses = o.data;
                        _.forEach(statuses, function(element) {
                            element.__value = element.name;
                        });
                        return statuses;
                    });
                },
                measures: function() {
                    return commonjs.loadSchemaDocumentsForDropdown('measure', $scope.document.header.identifier);
                },
                documentLinksExt: [{
                    model: "language",
                    title: "Language",
                    required: true,
                    mapping: function(item){ return item.identifier;},
                    options: function() {
                        return $http.get(
                            "/api/v2013/thesaurus/domains/ISO639-2/terms", {
                                cache: true
                            }
                        ).then(function(o) {
                            $scope.options.documentLinksExt[0].options = $filter("orderBy")(o.data, "name");
                            _.forEach($scope.options.documentLinksExt[0].options, function(element) {
                                element.__value = element.name;
                            });

                            return $scope.options.documentLinksExt[0].options;
                        });
                    },
                }],
                documentTranslationsExt: [{
                        model: "language",
                        title: "Language",
                        required: true,
                        mapping: function(item){ return item.identifier;},
                        options: function() {
                            return $http.get("/api/v2013/thesaurus/domains/52AFC0EE-7A02-4EFA-9277-8B6C327CE21F/terms", {
                                cache: true
                            }).then(function(o) {
                                $scope.options.documentTranslationsExt[0].options = $filter("orderBy")(o.data, "name");
                                _.forEach($scope.options.documentTranslationsExt[0].options, function(element) {
                                    element.__value = element.name;
                                });

                                return $scope.options.documentTranslationsExt[0].options;
                            });
                        },
                    }, {
                        model: "translationType",
                        title: "Translation Type",
                        required: true,
                        mapping: function(item){ return item.identifier;},
                        options: function() {
                            return $http.get("/api/v2013/thesaurus/domains/19E3C535-2919-4804-966C-E62728507291/terms", {
                                cache: true
                            }).then(function(o) {

                                $scope.options.documentTranslationsExt[1].options = $filter("orderBy")(o.data, "name");
                                _.forEach($scope.options.documentTranslationsExt[1].options, function(element) {
                                    element.__value = element.name;
                                });
                                return $scope.options.documentTranslationsExt[1].options;
                            });
                        },
                    },

                ],
            });


            //==================================
            //
            //==================================
            $scope.getCleanDocument = function(document) {

                document = document || $scope.document;

                if (!document)
                    return undefined;

                document = angular.fromJson(angular.toJson(document));

                if (!document.isAmendment) {
                    document.amendedMeasures = undefined;
                    document.amendmentsDescription = undefined;
                }
                if (document.expires !== undefined)
                    delete document.expires;

                if (!realm.is('ABS'))
                    document.absMeasures = undefined;

                if (!$scope.isJurisdictionRegional(document))
                    document.jurisdictionRegions = undefined;

                if (!$scope.isJurisdictionSubNationalOrCommunity(document))
                    document.jurisdictionName = undefined;

                if (!$scope.isNotLegallyBinded(document))
                    document.adoption = undefined;

                if (!$scope.isLegallyBinded(document))
                    document.entryIntoForce = undefined;

                if (!$scope.isRetired(document))
                    document.retired = undefined;

                if (document.adoption == '')
                    document.adoption = undefined;
                if (document.entryIntoForce == '')
                    document.entryIntoForce = undefined;
                if (document.retired == '')
                    document.retired = undefined;
                
                if(!$scope.isTypeOther())
                    document.otherTypeName = undefined;

                if (/^\s*$/g.test(document.notes))
                    document.notes = undefined;

                if (document.limitedApplication == '')
                    document.limitedApplication = undefined;

                if(!document.isModelContractualClause)
                    document.modelContractualClauseDescription = undefined;

                if (document.absMeasures && !_.find(document.absMeasures, {
                        identifier: '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'
                    }))
                    document.otherAbsMeasure = undefined;
                
                if(document.absMesasureNotApplicable)
                     document.absMeasures = undefined;
                     
                if(document.absMeasures && !document.absMeasures.geneticResource && !document.absMeasures.relevantElements)
                    document.absMeasures = undefined;
                
                if(document.absMeasures){
                    _.forEach(document.absMeasures.relevantElements, function (element) {
                        if(element && element.identifier == '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED' && 
                           element.parent.indexOf('5B6177DD-5E5E-434E-8CB7-D63D67D5EBED#')>=0){
                                
                            if(!element.customValue && !element.section){
                                var index = document.absMeasures.relevantElements.indexOf(element);
                                document.absMeasures.relevantElements.splice(index, 1);                              
                            }
                        }
                    });
                    document.absMeasures.relevantElements = _.compact(document.absMeasures.relevantElements);
                    
                }

                if(document.absMeasuresForDelete)
                    document.absMeasuresForDelete = undefined;

                return $scope.sanitizeDocument(document);
            };

            $scope.setDocument({});

            $scope.onContactQuery = function(searchText){
                var queryOptions = {
                schemas : ['contact', 'authority'],
                realm : realm.value,
                searchText: searchText,
                query : `((schema_s:authority AND government_s:${$scope.document.government.identifier}) OR schema_s:contact)`
                }
                return $scope.onBuildDocumentSelectorQuery(queryOptions);
            }

            
            $scope.onAmendedMeasuresQuery = function(searchText){
                var queryOptions = {
                schemas	  : ['measure'],
                realm     : realm.value,
                fieldQueries : [],
                searchText: searchText
                }
                if($scope.document?.header?.identifier)
                    queryOptions.fieldQueries = [`NOT identifier_s:${solr.escape($scope.document.header.identifier)}`];
                 return $scope.onBuildDocumentSelectorQuery(queryOptions);
            }

            $scope.onMeaureQuery = function(searchText){
                
                var queryOptions = {
                    schemas	  : ['measure'],
                    realm     : realm.value,
                    fieldQueries : [],
                    searchText: searchText
                }
                if($scope.document?.header?.identifier)
                    queryOptions.fieldQueries = [`NOT identifier_s:${solr.escape($scope.document.header.identifier)}`];                if ($scope.document && $scope.document.government)
                    queryOptions.government = $scope.document.government.identifier;
                return $scope.onBuildDocumentSelectorQuery(queryOptions);
            }
            //==================================
            //
            //==================================
            $scope.isTypeOther = function(document) {
                document = document || $scope.document;

                if (!document || !document.type)
                    return false;

                var qStatus = Enumerable.from([document.type]);

                return qStatus.any(function(o) {
                    return o.identifier == "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED"
                });
            }

            $scope.$on("loadDocument", function(evt, info) {
                if (info.schema != "measure")
                    return;
            });

            

        }
    ];
 


