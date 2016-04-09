define(['app', 'underscore', 'angular', '/app/views/forms/edit/edit.js', '/app/js/common.js', '/app/views/forms/edit/document-selector.html.js',
    '../view/view-measure.directive.js'
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
                absMeasures: function() {
                    return $q.all([
                        $http.get("/api/v2013/thesaurus/domains/50616B56-12F3-4C46-BC43-2DFC26679177/terms", {
                            cache: true
                        }),
                        $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED", {
                            cache: true
                        })
                    ]).then(function(o) {
                        var data = getABSMeasure();
                        //TODO: this function appears generic to returning from .all, perhaps cut code by making this function and reusing it?
                        //   var data = o[0].data;
                        //data.push(o[1].data);

                        //   console.log(JSON.stringify(data));

                        return data;
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

                        data.push({
                            "identifier": "8165BF22-EEF0-4DF8-B3F2-8E0AEBLAISE1",
                            "name": "Community protocol and procedures",
                            "title": {
                                "en": "Community protocol and procedures"
                            },
                            "shortTitle": {},
                            "description": "Community protocol and procedures Description.",
                            "source": "",
                            "broaderTerms": [],
                            "narrowerTerms": [],
                            "relatedTerms": [],
                            "nonPreferedTerms": []
                        });
                        data.push({
                            "identifier": "8165BF22-EEF0-4DF8-B3F2-8E0AEBLAISE2",
                            "name": "Customary Laws",
                            "title": {
                                "en": "Customary Laws"
                            },
                            "shortTitle": {},
                            "description": "Customary Laws Description.",
                            "source": "",
                            "broaderTerms": [],
                            "narrowerTerms": [],
                            "relatedTerms": [],
                            "nonPreferedTerms": []
                        });

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
                var queries = [$scope.options.absMeasures(), $scope.options.other()]
                $q.all(queries)
                    .then(function(data) {
                        var elementMeasures = data[0];
                        var other = data[1].data;
                        elementMeasures = appendOthers(elementMeasures, other);
                        $scope.absMeasureApi.updateTerms(elementMeasures);

                    });
                // }
            });

            function appendOthers(elementMeasures, other) {
                _.each(elementsForOthers, function(element) {
                    var otherElement = angular.copy(other);
                    // if(otherElement.identifier.indexOf('#')>0)
                    //     otherElement.identifier = otherElement.identifier;
                    // else
                        otherElement.identifier = otherElement.identifier + '#' + element;
                    otherElement.broaderTerms.push(element);
                    var el = _.findWhere(elementMeasures, {identifier:element});
                    otherElement.title.en = el.title.en.replace('Does the measure cover ', 'Does the measure cover any other ');
                    elementMeasures.push(otherElement);


                    var parentElement = _.find(elementMeasures, {
                        identifier: element
                    })
                    if (parentElement)
                        parentElement.narrowerTerms.push(otherElement.identifier);

                });
                return elementMeasures;
            }

            var elementsForOthers = [
                "24E809DA-20F4-4457-9A8A-87C08DF81E8A", "08B2CDEC-786F-4977-AD0A-6A709695528D","9847FA8A-16C3-4466-A378-F20AF9FF883B",
                "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63", "01DA2D8E-F2BB-4E85-A17E-AB0219194A17", "5B6177DD-5E5E-434E-8CB7-D63D6BLAISE8"
            ];

            $scope.gettext = function(identifier){

                var terms = getABSMeasure();
                term = _.findWhere(terms, {identifier:identifier})
                if(term)
                    return term.title.en;

                return '';
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
                    "name": "Does it cover all types of genetic resources",
                    "title": {
                        "en": "Does it cover all types of genetic resources"
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
                    "name": "Does it cover traditional knowledge associated with genetic resources",
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
                    "name": "Does it include provisions on temporal scope",
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
                    "name": "Does the measure cover access?",
                    "title": {
                        "en": "Does the measure cover access?"
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
                    "name": "Does it cover access to genetic resources",
                    "title": {
                        "en": "Does it cover access to genetic resources"
                    },
                    "shortTitle": {},
                    "description": "Does it cover access to genetic resources",
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
                    "description": "Access and/or prior informed consent / To genetic resources / For non-commercial purposes",
                    "source": "",
                    "broaderTerms": ["1E824A31-BDFB-4C47-9593-8006B5FC7D60"],
                    "narrowerTerms": [],
                    "relatedTerms": [],
                    "nonPreferedTerms": []
                }, {
                    "identifier": "5427EB8F-5532-4AE2-88EE-5B9619917480",
                    "name": "Does it cover Access to traditional knowledge associated with genetic resources, including prior informed consent or approval or involvement",
                    "title": {
                        "en": "Does it cover Access to traditional knowledge associated with genetic resources, including prior informed consent or approval or involvement"
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
                    "description": "Access and/or prior informed consent / To traditional knowledge associated with genetic resources / For commercial purposes",
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
                    "description": "Access and/or prior informed consent / To traditional knowledge associated with genetic resources / For non-commercial purposes",
                    "source": "",
                    "broaderTerms": ["5427EB8F-5532-4AE2-88EE-5B9619917480"],
                    "narrowerTerms": [],
                    "relatedTerms": [],
                    "nonPreferedTerms": []
                }, {
                    "identifier": "5427EB8F-5532-4AE2-88EE-5B961BLAISE4",
                    "name": "Does the measure provides for the issuance of a permit of its equivalent at the time of access for constituting an internationally recognized certificate of compliance?",
                    "title": {
                        "en": "Does the measure provides for the issuance of a permit of its equivalent at the time of access for constituting an internationally recognized certificate of compliance?"
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
                    "name": "Does the measure establish rules and procedures for mutually agreed terms?",
                    "title": {
                        "en": "Does the measure establish rules and procedures for mutually agreed terms?"
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
                    "name": "Does the measure cover benefit-sharing?",
                    "title": {
                        "en": "Does the measure cover benefit-sharing?"
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
                    "name": "Commercial purpose",
                    "title": {
                        "en": "Commercial purpose"
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
                    "name": "Non-commercial purpose",
                    "title": {
                        "en": "Non-commercial purpose"
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
                    "name": "Does the measure cover compliance?",
                    "title": {
                        "en": "Does the measure cover compliance?"
                    },
                    "shortTitle": {},
                    "description": "",
                    "source": "",
                    "broaderTerms": [],
                    "narrowerTerms": ["4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C", "1FCC6CA9-022F-42FD-BD02-43AE674FEB56", "4C57FDB4-3B92-46DD-B4C2-BB93DBLAISE8"],
                    "relatedTerms": [],
                    "nonPreferedTerms": []
                },  {
                    "identifier": "4C57FDB4-3B92-46DD-B4C2-BB93DBLAISE8",
                    "name": "Does it cover compliance with domestic legislation or regulatory requirements of the other Party (Article 15 and 16)?",
                    "title": {
                        "en": "Does it cover compliance with domestic legislation or regulatory requirements of the other Party (Article 15 and 16)?"
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
                    "name": "Does it cover issues related to monitoring the utilization of genetic resources, (Article 17)",
                    "title": {
                        "en": "Does it cover issues related to monitoring the utilization of genetic resources, (Article 17)"
                    },
                    "shortTitle": {},
                    "description": "",
                    "source": "",
                    "broaderTerms": ["E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63"],
                    "narrowerTerms": [],
                    "relatedTerms": [],
                    "nonPreferedTerms": []
                }, {
                    "identifier": "1FCC6CA9-022F-42FD-BD02-43AE674FEB56",
                    "name": "Does it cover compliance with mutually agreed terms (Article 18)?",
                    "title": {
                        "en": "Compliance with mutually agreed terms"
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
                    "name": "Does this measure include provisions on how its application relates to other international instruments?",
                    "title": {
                        "en": "Does this measure include provisions on how its application relates to other international instruments?"
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
                    "name": "Capacity",
                    "title": {
                        "en": "Capacity"
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
                    "description": "Other",
                    "source": "In house (ICCP report)",
                    "broaderTerms": [],
                    "narrowerTerms": ["ECBDB95A-B389-4DB4-AD9B-DA3590DF7781", "ECE508D3-26C6-42E6-A8B8-162606E5BA04", "7CB2A03A-F0CF-4458-BB3B-A60DEC1F942E"],
                    "relatedTerms": [],
                    "nonPreferedTerms": ["OTHER-OBSOLETE"]
                }]
            }

            // {
            //     "identifier": "1E824A31-BDFB-4C47-9593-8006B5BLAISE1*****",
            //     "name": "Does the measure cover access?",
            //     "title": {
            //         "en": "Does the measure cover access?"
            //     },
            //     "shortTitle": {},
            //     "description": "Access / Access to genetic resources",
            //     "source": "",
            //     "broaderTerms": ["08B2CDEC-786F-4977-AD0A-6A709695528D"],
            //     "narrowerTerms": ["1E824A31-BDFB-4C47-9593-8006B5FC7D60", "5427EB8F-5532-4AE2-88EE-5B9619917480",
            //         "5427EB8F-5532-4AE2-88EE-5B961BLAISE4", "5427EB8F-5532-4AE2-88EE-5B961BLAISE5"
            //     ],
            //     "relatedTerms": [],
            //     "nonPreferedTerms": []
            // },
            //     {
            //        "identifier": "A896179F-833E-4F76-B3F4-81CC95C66592",
            //        "name": "Does the measure cover benefit-sharing?",
            //        "title": {
            //            "en": "Does the measure cover benefit-sharing?"
            //        },
            //        "shortTitle": {},
            //        "description": "",
            //        "source": "",
            //        "broaderTerms": ["9847FA8A-16C3-4466-A378-F20AF9FF883B"],
            //        "narrowerTerms": ["628FA533-5B81-481A-8374-A0CF8DF0CF22", "0AE1295D-0797-44B6-B0AC-974EA356096D",
            //            "628FA533-5B81-481A-8374-A0CF8BLAISE6", "0AE1295D-0797-44B6-B0AC-974EABLAISE7"
            //        ],
            //        "relatedTerms": [],
            //        "nonPreferedTerms": []
            //    },{
            //     "identifier": "F2E6038A-6E99-4BCE-9582-155B72CC7730",
            //     "name": "Does the measure cover compliance?",
            //     "title": {
            //         "en": "Does the measure cover compliance?"
            //     },
            //     "shortTitle": {},
            //     "description": "",
            //     "source": "",
            //     "broaderTerms": ["E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63"],
            //     "narrowerTerms": ["4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C", "1FCC6CA9-022F-42FD-BD02-43AE674FEB56", "4C57FDB4-3B92-46DD-B4C2-BB93DBLAISE8"],
            //     "relatedTerms": [],
            //     "nonPreferedTerms": []
            // },{
            //     "identifier": "01DA2D8E-F2BB-4E85-A17E-AB02BLAISE10",
            //     "name": "Does this measure include provisions on how its application relates to other international instruments?",
            //     "title": {
            //         "en": "Does this measure include provisions on how its application relates to other international instruments?"
            //     },
            //     "shortTitle": {},
            //     "description": "",
            //     "source": "",
            //     "broaderTerms": ["01DA2D8E-F2BB-4E85-A17E-AB0219194A17"],
            //     "narrowerTerms": ["A71B36E8-D2CE-4254-A628-6DBFB902394C"],
            //     "relatedTerms": [],
            //     "nonPreferedTerms": []
            // },
        }
    ]);


    //============================================================
    //
    //
    //============================================================
    app.directive("editMeasureAbs", function() {
        return {
            restrict: "EAC",
            templateUrl: "/app/views/forms/edit/edit-measure.directive/abs",
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
                api: '=?'
            },
            link: function($scope, $element, $attr, ngModelController) {
                $scope.identifiers = null;
                $scope.sections = null;
                $scope.otherCustomValues = null;
                $scope.terms = null;
                $scope.rootTerms = [];
                $scope.otherTerms = [];

                $scope.$watch("terms", $scope.onTerms);
                $scope.$watch("binding", $scope.load);
                $scope.$watch("binding", function() {
                    ngModelController.$setViewValue($scope.binding);
                });

                $scope.$watch(function() {
                    return angular.toJson($scope.identifiers)
                }, function(){$scope.save(true)}); //use tojson to detect changes
                $scope.$watch(function() {
                    return angular.toJson($scope.sections)
                }, $scope.save);
                $scope.$watch(function() {
                    return angular.toJson($scope.otherCustomValues)
                }, $scope.save);

                $scope.init();

                if (!$attr["class"])
                    $element.addClass("list-unstyled");

            },
            controller: ["$scope", "$q", "Thesaurus", "Enumerable", '$element', function($scope, $q, thesaurus, Enumerable, $element) {

                var readOnlyElements = [
                    "24E809DA-20F4-4457-9A8A-87C08DF81E8A", "A862ABFC-B97D-4E6A-9A70-812ABLAISE11", "4E2974DF-216E-46C8-8797-8E3A33D6A048",
                    "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63", "08B2CDEC-786F-4977-AD0A-6A709695528D",
                    "01DA2D8E-F2BB-4E85-A17E-AB0219194A17", "9847FA8A-16C3-4466-A378-F20AF9FF883B", "5B6177DD-5E5E-434E-8CB7-D63D6BLAISE8"
                ];

                var mainElements = [
                    "24E809DA-20F4-4457-9A8A-87C08DF81E8A", "08B2CDEC-786F-4977-AD0A-6A709695528D", "9847FA8A-16C3-4466-A378-F20AF9FF883B",
                    "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63", "01DA2D8E-F2BB-4E85-A17E-AB0219194A17", "5B6177DD-5E5E-434E-8CB7-D63D6BLAISE8"
                ];
                var secondaryElements = [];

                var yesnoElements = [
                    "4E2974DF-216E-46C8-8797-8E3A3BLAISE1", "B8A150E054154AD3AD97856ABD485E90", "2A8B467A-5FC5-41C5-8D7B-71B78E3AFEDD",
                    "1E824A31-BDFB-4C47-9593-8006B5FC7D60", "08B2CDEC-786F-4977-AD0A-6A709695528D",
                    "5427EB8F-5532-4AE2-88EE-5B9619917480", "5427EB8F-5532-4AE2-88EE-5B961BLAISE4",
                    "5427EB8F-5532-4AE2-88EE-5B961BLAISE5", "9847FA8A-16C3-4466-A378-F20AF9FF883B",
                    "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63", "4C57FDB4-3B92-46DD-B4C2-BB93DBLAISE8",
                    "1FCC6CA9-022F-42FD-BD02-43AE674FEB56", "01DA2D8E-F2BB-4E85-A17E-AB0219194A17",
                    "4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C", "5B6177DD-5E5E-434E-8CB7-D63D6BLAISE8"
                ];

                var elementsForOthers = [
                    "24E809DA-20F4-4457-9A8A-87C08DF81E8A", "08B2CDEC-786F-4977-AD0A-6A709695528D","9847FA8A-16C3-4466-A378-F20AF9FF883B",
                    "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63", "01DA2D8E-F2BB-4E85-A17E-AB0219194A17", "5B6177DD-5E5E-434E-8CB7-D63D6BLAISE8"
                ];
                var staticIdentifiers = ["24E809DA-20F4-4457-9A8A-87C08DF81E8A", "4E2974DF-216E-46C8-8797-8E3A3BLAISE1",
                                        "B8A150E054154AD3AD97856ABD485E90", "2A8B467A-5FC5-41C5-8D7B-71B78E3AFEDD",
                                        "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED#24E809DA-20F4-4457-9A8A-87C08DF81E8A"];

                var scopeofMeasureElements = ["4E2974DF-216E-46C8-8797-8E3A3BLAISE1"];
                $scope.scopeOfMeasureTerm = "4E2974DF-216E-46C8-8797-8E3A3BLAISE1";
                $scope.scopeElement = {};
                var initialized = false;

                $scope.api = {
                    updateTerms: updateTerms
                }

                function updateTerms(newElements) {
                    $scope.terms = newElements;
                    // $scope.onTerms(newElements);
                }
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
                                if(!initialized && ((!$scope.binding.relevantElements[i].answer && identifier != $scope.scopeOfMeasureTerm)
                                || ($scope.binding.relevantElements[i].answer && identifier == $scope.scopeOfMeasureTerm)))
                                    setChildrenSelected(identifier, identifier != $scope.scopeOfMeasureTerm);
                            }
                            // else
                            //     oNewIdentifiers[identifier] = true;
                            oNewSections[identifier] = $scope.binding.relevantElements[i].section;

                        }
                        initialized = true;
                    }

                    if (!angular.equals(oNewIdentifiers, $scope.identifiers)){
                         $scope.identifiers = oNewIdentifiers;

                     }
                    if (!angular.equals(oNewSections, $scope.sections)) $scope.sections = oNewSections;
                    if (!angular.equals(oNewOtherCustomValues, $scope.otherCustomValues)) $scope.otherCustomValues = oNewOtherCustomValues;
                    if (!angular.equals(oNewOtherTerms, $scope.otherTerms)) $scope.otherTerms = oNewOtherTerms;

                }

                //==============================
                //
                //==============================
                $scope.save = function(setParent) {
                    if (!$scope.identifiers)
                        return;

                    var oNewBinding = [];

                    angular.forEach($scope.terms, function(term, i) {
                        if (term == undefined) return //IE8 BUG

                        if ($scope.identifiers[term.identifier]!=undefined) {

                            var oTerm = {
                                identifier  : term.identifier,
                                answer      : $scope.identifiers[term.identifier]
                            };
                            term.answer = $scope.identifiers[term.identifier];

                            //handle others|| oTerm.identifier == '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'
                            if (oTerm.identifier.indexOf('#') > 0
                                && $scope.identifiers[term.identifier]==undefined) {
                                var identifiers = oTerm.identifier.split('#');
                                oTerm.identifier = identifiers[0];
                                oTerm.parent = identifiers[1];
                                oTerm.customValue = $scope.otherCustomValues[term.identifier];
                            }

                            if ($scope.sections[term.identifier]
                            && $scope.identifiers[term.identifier]!=undefined)
                                oTerm.section = $scope.sections[term.identifier];

                            oNewBinding.push(oTerm);

                            if($scope.otherTerms && $scope.otherTerms[term.identifier]){
                                _.each($scope.otherTerms[term.identifier], function(otherTerm){
                                    if(otherTerm.name!=''){
                                        var lOtherTerm = {
                                            identifier  : '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED',
                                            customValue : otherTerm.name,
                                            section     : otherTerm.section,
                                            parent      : term.identifier
                                        };

                                        oNewBinding.push(lOtherTerm);
                                    }
                                });

                            }
                        }
                    });

                    if ($.isEmptyObject(oNewBinding))
                        oNewBinding = undefined;

                    if(!$scope.binding)
                        $scope.binding = {};

                    if (!angular.equals(oNewBinding, $scope.binding.relevantElements))
                        $scope.binding.relevantElements = oNewBinding;
                }

                function updateProperties(terms, level) {

                    _.each(terms, function(term) {
                        term.level = level;
                        _.findWhere($scope.terms, {identifier:term.identifier}).level = level;
                        //
                        // var lbterm = _.findWhere($scope.terms, {identifier:_.first(term.broaderTerms)});
                        // if(_.intersection(scopeofMeasureElements, _.pluck(term.broaderTerms,'identifier')).length > 0)
                        //     scopeofMeasureElements.push(term.identifier);

                        updateProperties(term.narrowerTerms, level + 1);
                    });
                }

                $scope.updateSelected = function(term, answer, answerText){
                    if(term.narrowerTerms){

                        if((answerText == 'no' && term.identifier != $scope.scopeOfMeasureTerm ) ||
                        (term.identifier == $scope.scopeOfMeasureTerm && answerText == 'yes')){
                            removeSelectedChildren(term.identifier);
                        }
                        else{

                            if(term.identifier == $scope.scopeOfMeasureTerm){
                                setChildrenSelected(term.identifier);
                            }
                            else{
                                _.each(term.narrowerTerms, function(term){
                                    var lterm = _.findWhere($scope.terms, {identifier:term.identifier});
                                    lterm.showElement = true;
                                });
                            }
                        }
                    }
                    else if(term.identifier.indexOf('#') > 0){
                        if(answerText=="yes")
                            $scope.initializeOther(term);
                        else if(answerText=="no")
                            $scope.deleteOther(term);
                    }
                    // console.log(term, answer);
                }

                function removeSelectedChildren(identifier){
                        var term = _.findWhere($scope.terms, {identifier:identifier});

                        _.each(term.narrowerTerms, function(narrowerIdentifier){
                            var narrowerTerm = _.findWhere($scope.terms, {identifier:narrowerIdentifier});
                            narrowerTerm.showElement = false;

                            if($scope.identifiers[narrowerIdentifier]!=undefined){
                                delete $scope.identifiers[narrowerIdentifier];
                                delete $scope.sections[identifier];
                                delete $scope.otherCustomValues[identifier];
                            }

                            if(narrowerTerm.narrowerTerms && narrowerTerm.narrowerTerms.length > 0)
                                removeSelectedChildren(narrowerIdentifier);
                        });
                }

                function setChildrenSelected(identifier, skipRecurvsive){
                        var term = _.findWhere($scope.terms, {identifier:identifier});
                        term.showElement = true;
                        _.each(term.narrowerTerms, function(narrowerIdentifier){
                            var narrowerTerm = _.findWhere($scope.terms, {identifier:narrowerIdentifier});
                            narrowerTerm.showElement = true;

                            if(!skipRecurvsive && narrowerTerm.narrowerTerms && narrowerTerm.narrowerTerms.length > 0)
                                setChildrenSelected(narrowerIdentifier);
                        });
                }

                //==============================
                //
                //==============================
                $scope.isRequired = function() {
                    return $scope.required != undefined && $.isEmptyObject($scope.binding);
                }

                //==============================
                //
                //==============================
                $scope.onTerms = function(refTerms) {

                    $scope.rootTerms = [];

                    if (refTerms) {
                        if (($scope.layout || "tree") == "tree") //Default layout
                            $scope.rootTerms = thesaurus.buildTree(refTerms);
                        else
                            $scope.rootTerms = Enumerable.from(refTerms).Select("o=>{identifier : o.identifier, name : o.name, title : o.title, description : o.description}").ToArray();
                        updateProperties($scope.rootTerms, 1);
                    }

                    $scope.load();
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

                $scope.$emit("getDocumentInfo", {});

                $scope.isReadOnly = function(identifier) {
                    return _.indexOf(readOnlyElements, identifier) >= 0;
                }

                $scope.isMainElement = function(identifier) {
                    return _.indexOf(mainElements, identifier) >= 0;
                }
                $scope.isSecondaryElement = function(identifier) {
                    return _.indexOf(secondaryElements, identifier) >= 0;
                }
                $scope.isYesNo = function(identifier) {
                    return _.indexOf(yesnoElements, identifier) >= 0 ||
                          identifier.indexOf('#') > 0;
                };

                $scope.showHideNode = function(elementId) {
                    $element.find('#' + elementId).toggle();
                };

                $scope.isParentSelected = function(identifier, level){

                    var term = _.findWhere($scope.terms, {identifier:identifier});

                    return term && term.showElement;
                };

                $scope.isOther = function(term){
                    // console.log(term.broaderTerms);
                    return term.broaderTerms && _.contains(_.pluck(term.broaderTerms, 'identifier'), '5B6177DD-5E5E-434E-8CB7-D63D6BLAISE8');
                }

                $scope.options = {
                    grTypes : function(){

                        var scopeElement = _.findWhere($scope.rootTerms, {identifier:'24E809DA-20F4-4457-9A8A-87C08DF81E8A'});

                        var elements = _.findWhere(scopeElement.narrowerTerms, {identifier:'4E2974DF-216E-46C8-8797-8E3A3BLAISE1'});
                        var grTypes = [];
                        var all = _.findWhere($scope.terms,  {identifier:'4E2974DF-216E-46C8-8797-8E3A33D6A048'});
                        grTypes.push(all);
                        grTypes = _.union(grTypes, angular.copy(elements.narrowerTerms[0].narrowerTerms));
                        return grTypes;
                    },
                    grAreas : function(){
                        var scopeElement = _.findWhere($scope.rootTerms, {identifier:'24E809DA-20F4-4457-9A8A-87C08DF81E8A'});
                        var elements = _.findWhere(scopeElement.narrowerTerms, {identifier:'4E2974DF-216E-46C8-8797-8E3A3BLAISE1'});
                        return elements.narrowerTerms[1].narrowerTerms;
                    }
                };

                $scope.addGRRecord = function(geneticResource, grTypesApi, grAreasApi){
                    if(!geneticResource || (!geneticResource.types && !geneticResource.areas)){
                        alert('please select a GR Type or GR Area');
                        return;
                    }
                    if(!$scope.binding.geneticResource.elements)
                        $scope.binding.geneticResource.elements = [];
                    $scope.binding.geneticResource.elements.push({
                        types : geneticResource.types,
                        areas : geneticResource.areas
                    });
                    geneticResource.types = undefined;
                    geneticResource.areas = undefined;
                    grTypesApi.unSelectAll();
                    grAreasApi.unSelectAll();
                };

                $scope.deleteElement = function(element){
                    $scope.binding.geneticResource.elements.splice($scope.binding.geneticResource.elements.indexOf(element), 1);
                }

                $scope.addOther = function(term){
                    if(!term)
                        term =[];

                    term.push({
                        name:'', section:''
                    });
                }

                $scope.deleteOtherElement = function(element, otherElements){
                    otherElements.splice(otherElements.indexOf(element), 1);
                                        $scope.save();
                };

                $scope.appendEmptyOther = function(otherElements){
                    var lastItem = otherElements[otherElements.length-1];
                    if(lastItem.name != "" )//&& lastItem.section != "")
                        otherElements.push({name:'', section:''});

                    $scope.save();
                }

                $scope.initializeOther = function(otherElement){
                    $scope.otherTerms[otherElement.identifier] = [];
                    //.scopeOtherElements = [];
                    $scope.otherTerms[otherElement.identifier].push({name:'', section:''});
                    // otherElement.scopeOtherElements.push({name:'', section:''});
                                        $scope.save();
                }

                $scope.deleteOther = function(otherElement){
                    $scope.otherTerms[otherElement.identifier] = undefined;
                                        $scope.save();
                }

                $scope.applyPadding = function(term){

                    return term.identifier != '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED#08B2CDEC-786F-4977-AD0A-6A709695528D' &&
                           term.identifier != '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED#E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63' &&
                           !term.narrowerTerms && (term.identifier.indexOf('5B6177DD-5E5E-434E-8CB7-D63D67D5EBED')>=0 ||
                                                   !$scope.isYesNo(term.identifier))

                };

                $scope.isStaticIdentifier = function(identifier) {
                    //use indexof to catch #others
                    return _.indexOf(staticIdentifiers, identifier)>=0
                }

            }]
        }
    });

});
