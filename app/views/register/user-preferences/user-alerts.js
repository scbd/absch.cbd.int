define(['app',
    "text!views/register/user-preferences/user-alerts.html",
    'underscore',
    'moment',
    'ngDialog',
    'views/search/search-directive',
    'js/common',
    'views/register/directives/register-top-menu',
    'ngDialog',
    'views/register/user-preferences/user-alerts',
    'services/local-storage-service',
    'components/scbd-angularjs-services/services/generic-service',
    'services/role-service'
], function (app, template, _, moment) {

    app.directive("userAlerts", ['$rootScope', 'ngDialog', function ($rootScope, ngDialog) {

        return {
            restrict: "EA",
            template: template,
            replace: true,
            scope: {
                runQuery: '&',
                collection: '@',
                collectionFilter: '@?'
            },
            link: function ($scope, element, attrs) {},
            controller: ['$rootScope', '$scope', '$http', 'IGenericService', 'realm', '$timeout', '$location', 'roleService', '$route', '$element', 'localStorageService',
                function ($rootScope, $scope, $http, IGenericService, realm, $timeout, $location, roleService, $route, $element, localStorageService) {

                    var systemSearches = [];
                    $scope.user = $rootScope.user;
                    $scope.skipKeywordsFilter = false;
                    $scope.skipTextFilter = false;
                    $scope.systemAlertsSubscription = [];

                    if ($scope.collection == "subscriptions") {
                        $scope.skipKeywordsFilter = true;
                        $scope.skipTextFilter = true;
                    } else {
                        systemSearches = [{
                            system: true,
                            "filters": [{
                                "type": "custom",
                                "name": "Search certificate(s) (IRCC) that are constituted indicating that prior informed consent (PIC) has been granted to a user within my jurisdiction",
                                "id": "entitiesToWhomPICGrantedCountry",
                                "query": 'entitiesToWhomPICGrantedCountry_ss:'
                            }],
                            "queryTitle": "Search certificate(s) (IRCC) that are constituted indicating that prior informed consent (PIC) has been granted to a user within my jurisdiction",
                            "meta": {
                                "createdOn": moment.utc().format()
                            }
                        }];
                    }

                    if ($scope.user.government) {
                        if (roleService.isAbsPublishingAuthority() ||
                            roleService.isAbsNationalAuthorizedUser() ||
                            roleService.isAbsNationalFocalPoint()) {

                            $scope.showSystemAlerts = true;
                            var query = {
                                realm: realm.value,
                                isSystemAlert: true
                            };
    
                            IGenericService.query('v2016', 'me/subscriptions', query)
                                .then(function (data) {
                                    $scope.systemAlertsSubscription = data;
                            });
                        }
                    }

                    //==============================================================
                    function loadSavedFilters() {
                        if ($scope.user && $scope.user.isAuthenticated) {
                            var query = {};
                            if ($scope.collectionFilter)
                                query = JSON.parse($scope.collectionFilter);

                            query.realm = realm.value;
                            IGenericService.query('v2016', 'me/' + $scope.collection, query)
                                .then(function (data) {
                                    if ($scope.collection == "search-queries" && $scope.user.government) {
                                        _.first(systemSearches).filters[0].query += $scope.user.government;
                                        $scope.userFilters = _.union(systemSearches, data);
                                    } else
                                        $scope.userFilters = data;
                                });
                        }
                    }

                    //==============================================================
                    $rootScope.$on('signIn', function (evt, user) {
                        $scope.user = user;
                        loadSavedFilters();
                    });

                    //==============================================================
                    $scope.runUserQuery = function (record) {
                        if ($scope.runQuery)
                            $scope.runQuery({
                                filter: record
                            });
                    };

                    //==============================================================
                    $scope.runFilter = function (filter) {
                        localStorageService.set("run-query", filter.filters)
                        $location.path('/search/run-query')
                    };

             

                    //==============================================================
                    $scope.hasUserSubscribed = function (event) {
                        return $scope.systemAlertsSubscription &&
                            _.some($scope.systemAlertsSubscription, function (alert) {
                                return alert.isSystemAlert &&
                                    _.contains(_.pluck(alert.filters, 'id'), event);
                            });
                    };

                    //==============================================================
                    $scope.subscribe = function (event) {
                        var document = {
                            queryTitle: event + " system alert",
                            isSystemAlert: true,
                            realm: realm.value,
                            filters: [{
                                    "type": "national",
                                    "id": event
                                },
                                {
                                    "type": "country",
                                    "id": $scope.user.government
                                }
                            ]
                        };
                        IGenericService.create('v2016', 'me/subscriptions', document)
                            .then(function (data) {
                                document._id = data.id;
                                $scope.systemAlertsSubscription.push(document);
                            });
                    };

                    //==============================================================
                    $scope.unsubscribe = function (event) {
                        if ($scope.systemAlertsSubscription) {
                            var event = _.find($scope.systemAlertsSubscription, function (alert) {
                                return alert.isSystemAlert &&
                                    _.contains(_.pluck(alert.filters, 'id'), event);
                            })
                            IGenericService.delete('v2016', 'me/subscriptions', event._id)
                                .then(function (event) {
                                    $scope.systemAlertsSubscription
                                        .splice($scope.systemAlertsSubscription.indexOf(event), 1)
                                });
                        }
                    };

                    //==============================================================
                    $scope.confirmDelete = function (record) {
                        $scope.loading = true;
                        $http.delete('/api/v2016/me/' + $scope.collection + '/' + record._id)
                            .then(function () {
                                $scope.userFilters.splice($scope.userFilters.indexOf(record), 1);
                            });
                        $scope.loading = false;
                    };

                    //==============================================================
                    $scope.addEdit = function (existingFilter) {
                        if (existingFilter && !existingFilter._id)
                            return;
                        if ($rootScope.user && !$rootScope.user.isAuthenticated) {
                            var signIn = $scope.$on('signIn', function (evt, data) {
                                $scope.addEdit();
                                signIn();
                            });

                            $('#loginDialog').modal("show");
                        } else {

                            var collection = $scope.collection;

                            ngDialog.open({
                                className: 'ngdialog-theme-default wide',
                                template: 'newFilterDialog',
                                controller: ['$scope', 'IGenericService', '$timeout', 'realm', function ($scope, IGenericService, $timeout, realm) {

                                    if (existingFilter) {
                                        $scope.document = angular.copy(existingFilter);
                                        $timeout(function () {
                                            $scope.setSearchFilters(existingFilter.filters);
                                        }, 100);
                                    }
                                    $scope.save = function (document) {
                                        $scope.errors = [];
                                        if (!document || document.queryTitle == '') {
                                            $scope.errors.push('Please enter title of the alert')
                                        }
                                        if (!document || !$scope.setFilters || _.isEmpty($scope.setFilters)) {
                                            $scope.errors.push('Please select at least one filter')
                                        }
                                        if ($scope.errors && $scope.errors.length > 0) {
                                            $("#dialog-errors").animate({
                                                scrollTop: 0
                                            }, 600);
                                            return;
                                        }

                                        $scope.loading = true;
                                        var operation;

                                        document.isSystemAlert = false;
                                        document.filters = _.values($scope.setFilters);
                                        document.realm = realm.value;
                                        if (!document._id)
                                            operation = IGenericService.create('v2016', 'me/' + collection, document);
                                        else
                                            operation = IGenericService.update('v2016', 'me/' + collection, document._id, document);

                                        operation.then(function (data) {
                                            $scope.closeDialog();
                                            if (!document._id)
                                                document._id = data.id;
                                            updateRecord(document);
                                        });
                                    };
                                    $scope.closeDialog = function () {
                                        ngDialog.close();
                                    };

                                }]
                            });

                            function updateRecord(document, delay) {
                                if (!$scope.userFilters)
                                    $scope.userFilters = [];
                                var existing = _.findWhere($scope.userFilters, {
                                    '_id': document._id
                                });
                                if (!existing) {
                                    $scope.userFilters.push(document);
                                    existing = document;
                                }
                                existing.pendingStatus = true;
                                IGenericService.get('v2016', 'me/' + $scope.collection, document._id)
                                    .then(function (data) {
                                        existing = _.extend(existing, data);
                                        existing.pendingStatus = false;
                                    })
                                    .catch(function (err) {
                                        if (err && err.status == 404) {
                                            delay = (delay || 0) + 1000
                                            $timeout(updateRecord(document, delay), delay);
                                        }
                                    });
                            }
                        }
                    };

                    loadSavedFilters();
                }
            ]
        };
    }]);
});