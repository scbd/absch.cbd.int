define(['app', 'linqjs', 'angular-localizer',
    './register-content.js','./register-menu.js',
    'scbd-angularjs-services', 'scbd-angularjs-filters', 'scbd-angularjs-controls',
    'toastr', '/app/js/common.js'], function(app) {

    app.directive("absRegister", ['$route', function($route) {

            return {
                restrict: "EA",
                templateUrl: "/app/views/register/directives/register-directive.html",
                replace: true,
                transclude: false,
                scope   :{},
                controller : ["$rootScope", "$location", "$scope", "$q", "$window", "IStorage", "underscore", "breadcrumbs",
                                "schemaTypes", "$timeout", "$filter", "$routeParams", "$cookies", "bootbox", "realm", "IWorkflows",
                                '$element', 'toastr', '$compile', 'commonjs',
                    function($rootScope, $location, $scope, $q, $window, storage, _, breadcrumbs,
                                schemaTypes, $timeout, $filter, $routeParams, $cookies, bootbox, realm, workflows,
                                $element, toastr, $compile, commonjs) {

                                var document_type;
                                $scope.user = $rootScope.user;
                                $scope.subTemplateUrl = $rootScope.subTemplateUrl;
                                $scope.msg = "";
                                $scope.PAroles = ['AbsPublishingAuthorities', 'AbsNationalFocalPoint', 'AbsAdministrator', 'Administrator'];

                                $rootScope.document_types = {

                                    absNationalReport: {
                                        abbreviation: 'NR',
                                        schemaType: "nationalRecords",
                                        title: 'Interim national report on the implementation of the Nagoya Protocol',
                                    },
                                    measure: {
                                        abbreviation: 'MSR',
                                        schemaType: "nationalRecords",
                                        title: 'Legislative, administrative or policy measures on access and benefit-sharing',

                                    },
                                    authority: {
                                        abbreviation: 'CNA',
                                        schemaType: "nationalRecords",
                                        title: 'Competent National Authority',

                                    },
                                    absPermit: {
                                        abbreviation: 'IRCC',
                                        schemaType: "nationalRecords",
                                        title: 'Permit or its equivalent constituting an internationally recognized certificate of compliance',

                                    },
                                    absCheckpoint: {
                                        abbreviation: 'CP',
                                        title: 'Checkpoint',
                                        schemaType: "nationalRecords",

                                    },
                                    absCheckpointCommunique: {
                                        abbreviation: 'CPC',
                                        schemaType: "nationalRecords",
                                        title: 'Information for the Checkpoint Communiqué',

                                    },
                                    resource: {
                                        abbreviation: 'VLR',
                                        schemaType: "referenceRecords",
                                        title: 'Virtual Library Record',

                                    },
                                    database: {
                                        abbreviation: 'NDB',
                                        schemaType: "nationalRecords",
                                        title: 'ABS National Website or Database',

                                    },
                                    contact: {
                                        abbreviation: 'CON',
                                        schemaType: "nationalRecords",
                                        title: 'Contact'
                                    },
                                    modelContractualClause: {
                                        abbreviation: 'A19A20',
                                        schemaType: "referenceRecords",
                                        title: 'Model Contractual Clauses, Codes of Conduct, Guidelines, Best Practices and/or Standards ',

                                    },
                                    communityProtocol: {
                                        abbreviation: 'CPP',
                                        schemaType: "referenceRecords",
                                        title: 'Community protocols and procedures and customary laws',

                                    },
                                    capacityBuildingInitiative: {
                                        abbreviation: 'CBI',
                                        schemaType: "referenceRecords",
                                        title: 'Capacity-building Initiative',
                                    },
                                    capacityBuildingResource: {
                                        abbreviation: 'CBR',
                                        schemaType: "referenceRecords",
                                        title: 'Capacity-building Resource',
                                    },
                                    endorsement: {
                                        abbreviation: 'EDR',
                                        schemaType: "nationalRecords",
                                        title: 'endorsement',

                                    }

                                };

                                this.schemaFacets = [
                                      {"schema":"measure","schemaType":"nationalRecords", "header": "MSR","draftCount":0,"requestCount":0,"publishCount": 0},
                                      {"schema":"authority","schemaType":"nationalRecords", "header": "CNA","draftCount":0,"requestCount":0,"publishCount": 0},
                                      {"schema":"absPermit","schemaType":"nationalRecords", "header": "IRCC","draftCount":0,"requestCount":0,"publishCount": 0},
                                      {"schema":"absCheckpoint","schemaType":"nationalRecords", "header": "CP","draftCount":0,"requestCount":0,"publishCount": 0},
                                      {"schema":"absCheckpointCommunique","schemaType":"nationalRecords", "header": "CPC","draftCount":0,"requestCount":0,"publishCount": 0},
                                      {"schema":"database","schemaType":"nationalRecords", "header": "NDB","draftCount":0,"requestCount":0,"publishCount": 0},
                                      {"schema":"resource","schemaType":"referenceRecords", "header": "VLR","draftCount":0,"requestCount":0,"publishCount": 0},
                                      {"schema":"capacityBuildingInitiative","schemaType":"referenceRecords", "header": "CBI","draftCount":0,"requestCount":0,"publishCount": 0},
                                      {"schema":"capacityBuildingResource","schemaType":"referenceRecords", "header": "CBR","draftCount":0,"requestCount":0,"publishCount": 0},
                                      {"schema":"contact","schemaType":"others", "header": "CON","draftCount":0,"requestCount":0,"publishCount": 0},
                                      {"schema":"absNationalReport","schemaType":"nationalRecords", "header": "NR","draftCount":0,"requestCount":0,"publishCount": 0},
                                      {"schema":"modelContractualClause","schemaType":"referenceRecords", "header": "A19A20","draftCount":0,"requestCount":0,"publishCount": 0},
                                      {"schema":"communityProtocol","schemaType":"referenceRecords", "header": "CPP","draftCount":0,"requestCount":0,"publishCount": 0},
                                      {"schema":"completedTasks","schemaType":"others", "requestCount":0},
                                      {"schema":"pendingTasks","schemaType":"others", "requestCount": 0},
                                      {"schema":"urgentTasks","schemaType":"others", "requestCount": 0},

                                      {"schema":"endorsement","schemaType":"nationalRecords", "header": "EDR","draftCount":0,"requestCount":0,"publishCount": 0},


                                ];
                                var schemaFacets = this.schemaFacets;
                                if ($routeParams.document_type) {
                                    document_type =  $filter("mapSchema")($routeParams.document_type);
                                    breadcrumbs.options = {
                                        'document_type': $filter("schemaName")(document_type)
                                    };
                                }


                                this.gotoNew = function($event, cftype) {
                                    $event.stopImmediatePropagation();
                                    $location.url("/register/" + $filter("mapSchema")(cftype) + "/new");
                                }

                                this.gotoList = function($event, cftype) {
                                    $location.url("/register/" + $filter("mapSchema")(cftype));
                                }

                                //============================================================

                                this.isDraft = function(entity) {
                                    return entity && entity.workingDocumentCreatedOn;
                                };

                                this.isRequest = function(entity) {
                                    return entity && entity.workingDocumentLock;
                                };

                                this.isPublished = function(entity) {
                                    return entity && entity.documentID;
                                };
                                //============================================================
                                this.refreshFacets = function(){
                                    loadFacets();
                                    loadActivitiesFacets();
                                };

                                //type = publishCount || RequestCount || DraftCount
                                //schema, type
                                this.getFacets = function(){
                                    return this.schemaFacets;
                                };


                                if ($rootScope.user.isAuthenticated) {

                                    loadFacets();
                                    loadActivitiesFacets();
                                }

                                function loadFacets() {
                                    //  var fromStorage = localStorageService.get('documentRegisterFacets');
                                    // if(fromStorage)
                                    //     return fromStorage;
                                    
                                    var published = storage.documentQuery.facets("", {
                                        collection: "my"
                                    });
                                    var drafts = storage.documentQuery.facets("", {
                                        collection: "mydraft"
                                    });
                                    var requests = storage.documentQuery.facets("", {
                                        collection: "request"
                                    });
                                    $q.all([published, drafts, requests]).then(function(results) {

                                        var index = 0;
                                        _.each(results, function(facets) {
                                            _.each(facets.data, function(count, format) {

                                                var schemaTypeFacet = _.findWhere(schemaFacets, {"schema": format});
                                                if (schemaTypeFacet) {
                                                    if (index == 0)
                                                        schemaTypeFacet.publishCount = count;
                                                    else if (index == 1)
                                                        schemaTypeFacet.draftCount = count;
                                                    else if (index == 2)
                                                        schemaTypeFacet.requestCount = count;
                                                }
                                            })
                                            index++;
                                        });
                                        //

                                    }).then(null, function(error) {
                                        toastr.error("error loading facets.");
                                        console.log(error);
                                    })

                                }

                                function loadActivitiesFacets() {

                                    var myUserID = $rootScope.user.userID;

                                    var query = {
                                        $and: [{
                                            "createdBy": myUserID
                                        }, {
                                            closedOn: {
                                                $exists: true
                                            }
                                        }, {
                                            "data.realm": realm.value
                                        }]
                                    };

                                    $q.when(workflows.query(query, true), function(data) {
                                        var schemaCount = _.where(schemaFacets, {
                                            "schema": "completedTasks"
                                        });
                                        schemaCount[0].requestCount = data.count;

                                    });

                                    query = {
                                        $and: [{
                                            "createdBy": myUserID
                                        }, {
                                            closedOn: {
                                                $exists: false
                                            }
                                        }, {
                                            "data.realm": realm.value
                                        }]
                                    };
                                    $q.when(workflows.query(query, true), function(data) {
                                        var schemaCount = _.where(schemaFacets, {
                                            "schema": "pendingTasks"
                                        });
                                        schemaCount[0].requestCount = data.count;
                                    });

                                    query = {
                                        $and: [{
                                            "activities.assignedTo": myUserID
                                        }, {
                                            closedOn: {
                                                $exists: false
                                            }
                                        }, {
                                            "data.realm": realm.value
                                        }]
                                    };
                                    $q.when(workflows.query(query, true), function(data) {
                                        var schemaCount = _.where(schemaFacets, {
                                            "schema": "urgentTasks"
                                        });
                                        schemaCount[0].requestCount = data.count;
                                    });

                                    // flipFacets();
                                }


                                //So this is like a request for info... I don't like the idea of using JS as an message driven language. KISS
                                $scope.$on("getDocumentInfo", function(evt) {

                                    if ($scope.lastSchema)
                                        $scope.$broadcast("loadDocument", {
                                            schema: $scope.lastSchema,
                                            identifier: $scope.lastIdentifier
                                        });
                                });


                                $scope.$on("documentInvalid", function(evt, invalidDocument) {

                                    $scope.documentInvalid = true;
                                });


                                //============================================================
                                //
                                // Occurs when record-list workflow request is deleted.
                                //
                                //============================================================
                                $scope.$on("documentWorkflowRequestDeleted", function(evt, doc) {
                                    toastr.info('<h1>Workflow request deleted.</h1>', {
                                        allowHtml: true
                                    });
                                    $scope.msg = "Workflow request deleted.";
                                    //update request count
                                    updateFacets(doc, false);
                                    var document = _.first(_.where($scope.records, {
                                        identifier: doc.identifier
                                    }));
                                    if (document)
                                        document.workingDocumentLock = null;
                                    //update draft count
                                    updateFacets(document, true);
                                    evt.stopPropagation();
                                    $scope.editing = false;

                                });

                                //============================================================
                                //
                                // Occurs when there is a action on tasks
                                //
                                //============================================================
                                $scope.$on("taskAction", function(evt, data) {

                                    var schemaCount = _.where($scope.schemaTypesFacets, {
                                        "schema": "urgentTasks"
                                    });
                                    schemaCount[0].requestCount--;

                                    schemaCount = _.where($scope.schemaTypesFacets, {
                                        "schema": data.document.header.schema
                                    });
                                    if (data.workflowAction.result.action == 'approve') {
                                        schemaCount[0].publishCount++;
                                        schemaCount[0].draftCount--;
                                        schemaCount[0].requestCount--;
                                    } else if (data.workflowAction.result.action == 'reject') {
                                        schemaCount[0].requestCount--;
                                    }
                                    flipFacets();
                                    evt.stopPropagation();
                                    $scope.editing = false;

                                });

                                function flipFacets() {

                                    //sometimes not working...
                                    //$(".card").toggleClass("flipped");
                                    //$timeout(function(){
                                    //	$(".card").toggleClass("flipped");
                                    //	}, 500);

                                    if ($rootScope.updatedRecord) {
                                        $timeout(function() {
                                            //console.log($rootScope.updatedRecord);
                                            $scope.$broadcast('shakeUpdatedRecord', $rootScope.updatedRecord);
                                            $rootScope.updatedRecord = null;
                                        }, 1000);
                                    }
                                }

                                function updateFacets(doc, newRec) {
                                    var schemaCount = _.where($scope.schemaTypesFacets, {
                                        "schema": doc.type
                                    });
                                    if ($scope.isRequest(doc)) {
                                        if (newRec)
                                            schemaCount[0].requestCount++;
                                        else
                                            schemaCount[0].requestCount--;
                                    } else if ($scope.isDraft(doc)) {
                                        if (newRec)
                                            schemaCount[0].draftCount++;
                                        else
                                            schemaCount[0].draftCount--;
                                    } else if ($scope.isPublished(doc)) {
                                        if (newRec)
                                            schemaCount[0].publishCount++;
                                        else
                                            schemaCount[0].publishCount--;
                                    }
                                    flipFacets();
                                }

                                $scope.$watch('msg', function(newValue) {
                                    if (newValue !== "") {
                                        $timeout(function() {
                                            $scope.msg = "";
                                        }, 10000);
                                    }
                                });



                                $element.find('[data-toggle="tooltip"]').tooltip()

                                var isMenuVisisble = true;
                                $scope.isMenuVisisble = true;

                                $('#toggleMenu').click(function() {
                                    isMenuVisisble = !isMenuVisisble;

                                    $("#leftMenu").toggle("slide");
                                    if (!isMenuVisisble) {
                                        $('#main').removeClass('col-xs-9');
                                        $('#main').addClass('col-xs-12');
                                    } else {
                                        $('#main').removeClass('col-xs-12');
                                        $('#main').addClass('col-xs-9');
                                    }
                                });
                                var url = $location.$$url;
                                if (url.split('/').length > 3) {
                                    var splitURL = url.split('/');
                                    url = '/' + splitURL[1] + '/' + splitURL[2] + '/new';
                                }
                                $scope.helpSchema = url;

                }]
            };
        }]);
    });


    //TODO: stop using so many globals =P I should inherit the controller scope or something.

    // $rootScope.subheadings = {
    //
    //     'Reference Records': {
    //         sort: 1,
    //         'title': 'Reference Records',
    //         'formats': ['resource', 'modelContractualClause', 'communityProtocol'],
    //         'roles': [$scope.$root.getRoleName('AbsPublishingAuthorities'), $scope.$root.getRoleName('abschiac'), $scope.$root.getRoleName('AbsNationalAuthorizedUser'),
    //             $scope.$root.getRoleName('AbsNationalFocalPoint'), $scope.$root.getRoleName('AbsAdministrator'), $scope.$root.getRoleName('Administrator'),
    //             $scope.$root.getRoleName('User')
    //         ]
    //     }
    // };
