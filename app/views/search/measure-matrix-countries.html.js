define(['app', 'underscore'], function(app, _) {

    app.controller('countryMatrixController', ['$scope', '$http', 'realm', '$q', '$filter', '$routeParams',
        function($scope, $http, realm, $q, $filter, $routeParams) {


            $scope.compliance = [{
                "identifier": "F2E6038A-6E99-4BCE-9582-155B72CC7730",
                "name": "Compliance with domestic legislation or regulatory requirements on access to genetic resources and benefit-sharing",
                "parent": "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63",
                elements: []
            }, {
                "identifier": "0C7D5977-E5B8-4311-A26F-94E775EFB137",
                "name": "Compliance with domestic legislation or regulatory requirements on ABS for access to traditional knowledge associated with genetic resources and benefit-sharing",
                "parent": "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63",
                elements: []
            }, {
                "identifier": "8C3BBBA1-3663-4F6E-B366-B70DC91391A3",
                "name": "Non-compliance with domestic legislation or regulatory requirements",
                "parent": "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63",
                elements: []
            }, {
                "identifier": "1FCC6CA9-022F-42FD-BD02-43AE674FEB56",
                "name": "Compliance with mutually agreed terms",
                "parent": "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63"
            }, ];
            $scope.monitoringUtilization = [{
                "identifier": "99018940-7B01-4BB7-996D-7C71A0B262F9",
                "name": "Permits or their equivalent constituting an internationally recognized certificate of compliance",
                "parent": "4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C",
                elements: []
            }, {
                "identifier": "52D71068-71D3-4082-875D-D6190892E760",
                "name": "Checkpoints",
                "parent": "4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C",
                elements: []
            }];

            $scope.scopeElements = [{
                "identifier": "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63",
                "name": "Compliance"
            }, {
                "identifier": "F2E6038A-6E99-4BCE-9582-155B72CC7730",
                "name": "Compliance with domestic legislation or regulatory requirements on access to genetic resources and benefit-sharing",
                "parent": "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63"
            }, {
                "identifier": "0C7D5977-E5B8-4311-A26F-94E775EFB137",
                "name": "Compliance with domestic legislation or regulatory requirements on ABS for access to traditional knowledge associated with genetic resources and benefit-sharing",
                "parent": "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63"
            }, {
                "identifier": "8C3BBBA1-3663-4F6E-B366-B70DC91391A3",
                "name": "Non-compliance with domestic legislation or regulatory requirements",
                "parent": "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63"
            }, {
                "identifier": "1FCC6CA9-022F-42FD-BD02-43AE674FEB56",
                "name": "Compliance with mutually agreed terms",
                "parent": "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63"
            }, {
                "identifier": "4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C",
                "name": "Monitoring the utilization of genetic resources"
            }, {
                "identifier": "99018940-7B01-4BB7-996D-7C71A0B262F9",
                "name": "Permits or their equivalent constituting an internationally recognized certificate of compliance",
                "parent": "4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C"
            }, {
                "identifier": "52D71068-71D3-4082-875D-D6190892E760",
                "name": "Checkpoints",
                "parent": "4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C"
            }];
            // $scope.scopeElements[0].subList = $scope.compliance;
            // $scope.scopeElements[1].subList = $scope.monitoringUtilization;

            $scope.currentPage = 0;
            $scope.itemsPerPage = 100;
            if ($routeParams.code) {
                var queryParameters = {
                    'q': 'realm_ss:' + realm.value.toLowerCase() + ' AND schema_s:measure AND government_s:' + $routeParams.code.toLowerCase(),
                    'sort': 'government_EN_t asc',
                    'fl': 'id,identifier_s,title_t,createdDate_dt,description_t,government_EN_t,status_EN_t,type_EN_t,jurisdiction_EN_t,adoption_dt,entryIntoForce_dt,retired_dt,limitedApplication_dt',
                    'wt': 'json',
                    'start': $scope.currentPage * $scope.itemsPerPage,
                    'rows': $scope.itemsPerPage
                };

                $http.get('/api/v2013/index/select', {
                        params: queryParameters
                    })
                    .success(function(data) {

                        $scope.measures = [];
                        var measuresData = data.response.docs;
                        $scope.documentCount = data.response.numFound;

                        var measuresQueryList = _.map(measuresData, function(measure) {
                            return $scope.loadMatrix(measure);
                        });
                        $q.all(measuresQueryList)
                            .then(function() {
                                //measure.isLoading=false;
                                console.log('done');
                                $scope.measures = measuresData;
                            });

                    }).error(function(error) {
                        console.log('onerror');
                        console.log(error);
                    });
            }
            $scope.loadMatrix = function(measure) {

                return $q.when($http.get('/api/v2013/documents/' + measure.identifier_s))
                    .then(function(document) {
                        measure.document = document.data;
                        console.log('measure');

                        var amendedMeasuresQuery = _.map(measure.document.amendedMeasures, function(amended) {
                            return $http.get('/api/v2013/documents/' + amended.identifier);
                        });
                        return $q.all(amendedMeasuresQuery)
                            .then(function(amendedMeasures) {
                                amendedMeasures.forEach(function(amendedMeasureData) {
                                    var amended = _.findWhere(measure.document.amendedMeasures, {
                                        identifier: amendedMeasureData.data.header.identifier
                                    });
                                    amended.measure = amendedMeasureData.data;
                                    relatedElement($scope.scopeElements, amendedMeasureData.data, 'amended');
                                });
                                return measure.document;
                            });
                    })
                    .then(function(data) {

                        var linkedMeasuresQuery = _.map(data.linkedMeasures, function(linked) {
                            return $http.get('/api/v2013/documents/' + linked.identifier);
                        });
                        return $q.all(linkedMeasuresQuery)
                            .then(function(linkedMeasures) {
                                linkedMeasures.forEach(function(linkedMeasureData) {
                                    var amended = _.findWhere(data.linkedMeasures, {
                                        identifier: linkedMeasureData.data.header.identifier
                                    });
                                    amended.measure = linkedMeasureData.data;
                                    relatedElement($scope.scopeElements, linkedMeasureData.data, 'amended');
                                });
                                return data;
                            });
                    })
                    .catch(function(error) {
                        console.log('onerror');
                        console.log(error);
                    })
                    .finally(function() {
                        measure.isLoading = false;
                    });
            };

            function relatedElement(measure, searchMeasure, type) {

                _.forEach(measure, function(parentElement) {
                    // _.forEach(parentElement.elements, function(measureElement){
                    var element = _.findWhere(searchMeasure.absMeasures, {
                        'identifier': parentElement.identifier
                    });
                    if (element) {
                        var parentMeasure = _.findWhere(parentElement.relatedElements, {
                            'identifier': parentElement.identifier
                        });
                        if (!parentMeasure) {
                            if (!parentElement.relatedElements)
                                parentElement.relatedElements = [];

                            _.extend(element, {
                                title: searchMeasure.title,
                                measureIdentifier: measure.identifier,
                                type: type
                            });
                            parentElement.relatedElements.push(element);
                        }
                    }
                    // });
                });
            }

            $scope.hasParent = function(entity, identifier) {

                return entity && entity.parent == identifier;
            }

        }
    ]);

});
