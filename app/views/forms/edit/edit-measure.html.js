define(['app', 'underscore', 'angular', '/app/views/forms/edit/edit.js', '/app/js/common.js', '/app/views/forms/edit/document-selector.html.js',
    '../view/view-measure.directive.js', '/app/views/forms/edit/edit-measure-matrix-directive.html.js'
], function(app, _, angular) {

    app.controller("editMeasure", ["$scope", "$http", "$filter", "$q", "Enumerable", "$controller", "$location", 'commonjs',
        function($scope, $http, $filter, $q, Enumerable, $controller, $location, commonjs) {
            $controller('editController', {
                $scope: $scope
            });


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

                        _.each(jurisdictions, function(element) {
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
                        _.each(statuses, function(element) {
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
                    options: function() {
                        return $http.get(
                            "/api/v2013/thesaurus/domains/ISO639-2/terms", {
                                cache: true
                            }
                        ).then(function(o) {
                            $scope.options.documentLinksExt[0].options = $filter("orderBy")(o.data, "name");
                            _.each($scope.options.documentLinksExt[0].options, function(element) {
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
                        options: function() {
                            return $http.get("/api/v2013/thesaurus/domains/52AFC0EE-7A02-4EFA-9277-8B6C327CE21F/terms", {
                                cache: true
                            }).then(function(o) {
                                $scope.options.documentTranslationsExt[0].options = $filter("orderBy")(o.data, "name");
                                _.each($scope.options.documentTranslationsExt[0].options, function(element) {
                                    element.__value = element.name;
                                });

                                return $scope.options.documentTranslationsExt[0].options;
                            });
                        },
                    }, {
                        model: "translationType",
                        title: "Translation Type",
                        required: true,
                        options: function() {
                            return $http.get("/api/v2013/thesaurus/domains/19E3C535-2919-4804-966C-E62728507291/terms", {
                                cache: true
                            }).then(function(o) {

                                $scope.options.documentTranslationsExt[1].options = $filter("orderBy")(o.data, "name");
                                _.each($scope.options.documentTranslationsExt[1].options, function(element) {
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

                if (!$scope.isInLibrary("absch", document))
                    document.absMeasures = undefined;

                if (!$scope.isInLibrary("bch", document)) {
                    document.cpbSubjectAreas = undefined;
                    document.cpbSubjectLmos = undefined;
                }

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

                if (/^\s*$/g.test(document.notes))
                    document.notes = undefined;

                if (document.limitedApplication == '')
                    document.limitedApplication = undefined;

                if(!document.isModelContractualClause)
                    document.isModelContractualClauseDescription = undefined;

                if (document.absMeasures && !_.findWhere(document.absMeasures, {
                        identifier: '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'
                    }))
                    document.otherAbsMeasure = undefined;
                
                if(document.absMesasureNotApplicable)
                     document.absMeasures = undefined;
                     
                if(document.absMeasures && !document.absMeasures.geneticResourceElements && !document.absMeasures.relevantElements)
                    document.absMeasures = undefined;
                
                if(document.absMeasures){
                    _.each(document.absMeasures.relevantElements, function (element) {
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

                return document;
            };

            $scope.setDocument({
                libraries: [{
                    identifier: "cbdLibrary:abs-ch"
                }]
            });

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


                // if($scope.document && $scope.document.absMeasures){
                // var queries = [$scope.options.absMeasures(), $scope.options.other()]
                // $q.all(queries)
                //     .then(function(data) {
                //         var elementMeasures = data[0];
                //         var other = data[1].data;
                //         elementMeasures = appendOthers(elementMeasures, other);
                //         if($scope.absMeasureApi)
                //             $scope.absMeasureApi.updateTerms(elementMeasures);

                //     });
                // }
            });

            // function appendOthers(elementMeasures, other) {
            //     _.each(elementsForOthers, function(element, key) {
            //         var otherElement = angular.copy(other);
            //         // if(otherElement.identifier.indexOf('#')>0)
            //         //     otherElement.identifier = otherElement.identifier;
            //         // else
            //             otherElement.identifier = otherElement.identifier + '#' + key;
            //         otherElement.broaderTerms.push(key);
            //         var el = _.findWhere(elementMeasures, {identifier:key});
            //         otherElement.title.en = element.title;
            //         otherElement.description = element.description;
            //         elementMeasures.push(otherElement);


            //         var parentElement = _.find(elementMeasures, {
            //             identifier: key
            //         })
            //         if (parentElement)
            //             parentElement.narrowerTerms.push(otherElement.identifier);

            //     });
            //     return elementMeasures;
            // }
            // var elementsForOthers = {
            //     "24E809DA-20F4-4457-9A8A-87C08DF81E8A" : {
            //         title : 'Reference to any other relevant articles and sections', description : ''
            //     },
            //     "08B2CDEC-786F-4977-AD0A-6A709695528D" : {
            //         title : 'Any other element relevant to access',
            //         description : 'This may include, for instance, additional information on the scope of the access provisions of the measure, special considerations for access, or other relevant access provisions.'
            //     },
            //     "9847FA8A-16C3-4466-A378-F20AF9FF883B" : {
            //         title : 'Any other element relevant to benefit-sharing',
            //         description : 'This may include, for instance, additional information on the scope of the benefit-sharing provisions of the measure, establishment of benefit-sharing funds or other relevant benefit-sharing provisions'
            //     },
            //     "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63" : {
            //         title : 'Any other element relevant to compliance',
            //         description : 'This may include, for instance, additional information on the scope of the compliance provisions of the measure, or other relevant compliance provisions.'
            //     },
            //     "01DA2D8E-F2BB-4E85-A17E-AB0219194A17" : {
            //         title : 'Any other element relevant to relationship with other international instrument', description : ''
            //     },
            //     "BE944E70-2098-45AC-891B-D5E94AFECB99" : {
            //         title : 'Reference to any other relevant articles and sections', description : ''
            //     }
            // };

            // $scope.gettext = function(identifier){

            //     var terms = getABSMeasure();
            //     term = _.findWhere(terms, {identifier:identifier})
            //     if(term)
            //         return term.title.en;

            //     return '';
            // }

            // function updateABSMeasureText(data){

            //     var absMeasureUpdatedText = {
            //         "08B2CDEC-786F-4977-AD0A-6A709695528D": {
            //             "title": {
            //             "en": "Does the measure cover access?"
            //             }
            //         },
            //         "1E824A31-BDFB-4C47-9593-8006B5FC7D60":{
            //             "title": {"en": "Does it cover access to genetic resources?"}
            //         },
            //         "5427EB8F-5532-4AE2-88EE-5B9619917480": {
            //             "title": {
            //                 "en": "Does it cover access to traditional knowledge associated with genetic resources?"
            //             }
            //         },
            //         "9AE45FB8-7788-4D26-B8E9-6B1647055519":{
            //             "title": {
            //                 "en": "Does the measure provides for the issuance of a permit of its equivalent at the time of access for constituting an internationally recognized certificate of compliance?"
            //             }
            //         },
            //         "8FA89F2D-3D6B-46A2-93BC-8B157054D726":{
            //             "title": {
            //                 "en": "Does the measure establish rules and procedures for mutually agreed terms?"
            //             }
            //         },
            //         "9847FA8A-16C3-4466-A378-F20AF9FF883B":{
            //             "title": {
            //                 "en": "Does the measure cover benefit-sharing?"
            //             }
            //         },
            //         "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63":{
            //             "title": {
            //                 "en": "Does the measure cover compliance?"
            //             }
            //         },
            //         "F2E6038A-6E99-4BCE-9582-155B72CC7730":{
            //             "title": {
            //                 "en": "Does it cover compliance with domestic legislation or regulatory requirements of the other Party (Article 15 and 16)?"
            //             }
            //         },
            //         "4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C":{
            //             "title": {
            //                 "en": "Does it cover issues related to monitoring the utilization of genetic resources (Article 17)?"
            //             }
            //         },
            //         "1FCC6CA9-022F-42FD-BD02-43AE674FEB56":{
            //             "title": {
            //                 "en": "Does it cover compliance with mutually agreed terms (Article 18)?"
            //             }
            //         },
            //         "01DA2D8E-F2BB-4E85-A17E-AB0219194A17":{
            //             "title": {
            //                 "en": "Does this measure include provisions on how its application relates to other international instruments?"
            //             }
            //         }
            //     }

            //     _.each(data, function(element){
            //         if(absMeasureUpdatedText[element.identifier]){
            //             element.title = absMeasureUpdatedText[element.identifier].title;
            //         }
            //         //change hierarchy are required by abs measure matrix
            //         if(element.identifier == 'A896179F-833E-4F76-B3F4-81CC95C66592'){// Mutually agreed terms
            //             var benefitSharing = _.findWhere(data, {identifier:'9847FA8A-16C3-4466-A378-F20AF9FF883B'})
            //             benefitSharing.narrowerTerms = element.narrowerTerms;
            //         }
            //     });
            //     // remove Mutually agreed terms
            //     return _.filter(data, function(element){
            //         return element.identifier != 'A896179F-833E-4F76-B3F4-81CC95C66592'
            //     });
            // }

        }
    ]);
 

});
