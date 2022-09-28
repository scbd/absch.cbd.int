import app from '~/app';
import template from "text!./user-alerts.html";
import _ from 'lodash';
import moment from 'moment';
import 'ngDialog';
import '~/services/main';
import '~/views/register/directives/register-top-menu';
import '~/components/scbd-angularjs-services/main';
import userAlertsT from '~/app-text/views/register/user-preferences/user-alerts.json';
import frequencies from '~/app-text/views/register/user-preferences/frequency.json'

    app.directive("userAlerts", ['$rootScope', 'ngDialog', '$routeParams', function ($rootScope, ngDialog, $routeParams) {

        return {
            restrict: "EA",
            template: template,
            replace: true,
            scope: {
                runQuery: '&',
                collection: '@',
                runQueryInPage: '@',
                collectionFilter: '@?'
            },
            link: function ($scope, element, attrs) {},
            controller: ['$rootScope', '$scope', '$http', 'IGenericService', 'realm', '$timeout', 'searchService', 'roleService', '$route', '$element', 'localStorageService', 'solr', 'locale', 'translationService',
                function ($rootScope, $scope, $http, IGenericService, realm, $timeout, searchService, roleService, $route, $element, localStorageService, solr, locale, translationService) {
                    $scope.realm = realm;
                    $scope.user = $rootScope.user;
                    $scope.skipKeywordsFilter = false;
                    $scope.skipKeywordsFilter = true; // ToDo: remove one skipKeywordsFilter
                    $scope.skipTextFilter = false;
                    $scope.skipTextFilter = true; // ToDo: remove one skipTextFilter
                    $scope.systemAlertsSubscription = [];
                    $scope.isABS = realm.is('ABS');
                    $scope.isDeleteAllow = false ;
                    $scope.frequencies = frequencies;
                    $scope.userSettings = {};
                    translationService.set('userAlertsT', userAlertsT); 
                    
                    const systemQueries = {
                        recordsOverview : {
                            filters : [{
                                    "type": "recordsOverview",
                                    "id": "recordsOverview"
                                }
                            ],
                            title : userAlertsT.systemOverviewFilterTitle
                        }
                    }
                    const systemQueries = {
                        recordsOverview : {
                            filters : [{
                                    "type": "recordsOverview",
                                    "id": "recordsOverview"
                                }
                            ],
                            title : userAlertsT.systemOverviewFilterTitle
                        }
                    }

                    //==============================================================
                    function loadSavedFilters() {
                        $scope.loading = false;
                        if ($scope.user && $scope.user.isAuthenticated) {
                            var query = {};
                            if ($routeParams.id) {
                                    query['_id'] = { $oid : $routeParams.id};
                                    $scope.isDeleteAllow = true;
                            }
                            else{
                            if ($scope.collectionFilter)
                                query = JSON.parse($scope.collectionFilter);
                                $scope.loading = true;
                                query.realm = realm.value;
                                query['$and'] = [
                                    { $or : [{ isSystemAlert : false},{ isSystemAlert :{$exists: false}}]},
                                    { $or : [{ isSharedQuery : false},{ isSharedQuery :{$exists: false}}]}
                                ]
                            } 
                            IGenericService.query('v2016', 'me/subscriptions', query)
                                .then(function (data) {
                                    $scope.loading = false;
                                    $scope.userFilters = data;
                                });

                            var overviewAlertQuery = {
                                realm: realm.value,
                                isSystemAlert: true,
                                $or : [{ isSharedQuery : false},{ isSharedQuery :{$exists: false}}],
                                'filters.type': 'recordsOverview',
                            };

                            IGenericService.query('v2016', 'me/subscriptions', overviewAlertQuery)
                                .then(function (data) {
                                    $scope.systemAlertsSubscription = data;
                            });
                        }
                    }

                    //==============================================================
                    $rootScope.$on('signIn', function (evt, user) {
                        $scope.user = user;
                        init();
                    });

                    //==============================================================
                    $scope.runUserQuery = function (record) {
                        if ($scope.runQuery)
                            $scope.runQuery({
                                filter: record
                            });
                    };

                     //==============================================================
                     $scope.runSystemFilter = function () {
                        // $scope.runFilter();
                     }
                    //==============================================================
                    $scope.runFilter = function (id)
                    {
                        if(id)
                        {
                            if(!$scope.runQueryInPage){
                                window.open(
                                '/search/'+id,
                                '_blank'
                                ); 
                            }
                            else
                            {
                                window.location.href =  '/search/'+id;
                            }
                        }
                    };

             

                    //==============================================================
                    $scope.hasUserSubscribed = function (event) {
                        
                        const query = systemQueries[event];
                        const hasSubscribed = $scope.systemAlertsSubscription &&
                            $scope.systemAlertsSubscription.find(alert=>{
                                return alert.isSystemAlert &&
                                    alert.filters.find(e=>e.id == event && e.type == query.filters[0].type);
                            });

                            return hasSubscribed;
                    };

                    //==============================================================
                    $scope.subscribe = function (event) {
                       
                        var document = {
                            queryTitle: systemQueries[event].title,
                            isSystemAlert: true,
                            realm: realm.value,
                            sendEmail: true,
                            filters: systemQueries[event].filters
                        };
                        IGenericService.create('v2016', 'me/subscriptions', document)
                            .then(function (data) {
                                document._id = data.id;
                                $scope.systemAlertsSubscription.push(document);
                            });
                    };

                    //==============================================================
                    $scope.emailSubscribe = function (record, flag) {
                     
                        if (record) {
                            
                            record.sendEmail = flag;

                            const operation = IGenericService.update('v2016', 'me/subscriptions', record._id, record);

                            operation.then(function (data) {
                                
                                if (!record._id)
                                    record._id = data.id;

                                //updateRecord(record);
                            });
                        }
                    };

                    //==============================================================
                    $scope.hasUserEmailSubscribed = function (record) {
                     
                        if (record) {
                            
                            if(record.sendEmail){
                                return true;
                            }
                        }
                        return false;
                    };


                    //==============================================================
                    $scope.unsubscribe = function (event) {
                        if ($scope.systemAlertsSubscription) {
                            const query = systemQueries[event];
                            var event =  $scope.systemAlertsSubscription.find(alert=>{
                                return alert.isSystemAlert &&
                                    alert.filters.find(e=>e.id == event && e.type == query.filters[0].type)
                            });
                            IGenericService.delete('v2016', 'me/subscriptions', event._id)
                                .then(function (result) {
                                    $scope.systemAlertsSubscription
                                        .splice($scope.systemAlertsSubscription.indexOf(event), 1)
                                });
                        }
                    };

                    //==============================================================
                    $scope.confirmDelete = function (record) {
                        $scope.loading = true;
                        $http.delete('/api/v2016/me/subscriptions/' + record._id)
                            .then(function () {
                                $scope.userFilters.splice($scope.userFilters.indexOf(record), 1);
                            });
                        $scope.loading = false;
                    };

                    //==============================================================
                    $scope.addEdit = function (existingFilter) {
                        if (existingFilter && !existingFilter._id)
                            return;
                        if (!$rootScope.user || !$rootScope.user.isAuthenticated) {
                            var signIn = $scope.$on('signIn', function (evt, data) {
                                $scope.addEdit();
                                signIn();
                            });

                            $('#loginDialog').modal("show");
                        } else {

                            var collection = $scope.collection;

                            ngDialog.open({
                                className: 'ngdialog-theme-default wide user-search-alert',
                                template: 'newFilterDialog',
                                controller: ['$scope', 'IGenericService', '$timeout', 'realm', function ($scope, IGenericService, $timeout, realm) {
                                    $timeout(function () {
                                        $scope.clearFilter();
                                    }, 100);
                                    if (existingFilter) {
                                        $scope.document = angular.copy(existingFilter);
                                        $timeout(function () {
                                            existingFilter.filters.forEach( f => {
                                              $scope.savedAlertFilter( f,existingFilter.subFilters );
                                            } );
                                               //$scope.setFilters = existingFilter.filters;
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
                                        //ToDo: will update as per API accepted format
                                        //Duplicate Code exists in search-directive.js
                                        let userAlertSearchFilter = $scope.getLeftSubFilters();
                                        let leftFilterQuery = {}
                                        _.forEach(userAlertSearchFilter, function(filters, key){
                                            _.forEach(filters, function(filter){
                                                 if(!_.isEmpty(filter.selectedItems)){
                                                    leftFilterQuery[key] = leftFilterQuery[key] || [];
                                                    const  {field, relatedField, searchRelated, term, title, type } = filter
                                                    leftFilterQuery[key].push({field, relatedField, searchRelated, selectedItems:filter.selectedItems, term, title, type});
                                                }
                                            });
                                        });
                                        document.filters = _.values($scope.setFilters);
                                        document.subFilters = leftFilterQuery; // pass only selected sub-filters query 
                                        document.realm = realm.value;

                                        document.solrQuery = buildSolrQuery()

                                        if (!document._id)
                                            operation = IGenericService.create('v2016', 'me/subscriptions', document);
                                        else
                                            operation = IGenericService.update('v2016', 'me/subscriptions', document._id, document);

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

                                    function buildSolrQuery(){
        
                                        const searchQuery = $scope.buildSearchQuery();
                                        
                                        var fieldQueries = _([searchQuery.tagQueries]).flatten().compact().value();
        
                                        if(!_.find(fieldQueries, function(q){ return ~q.indexOf('realm_ss:')})){
                                            fieldQueries.push('realm_ss:' + realm.value.toLowerCase())
                                        }
        
                                        var solrQuery = {
                                            df    : searchService.localizeFields(searchQuery.df||'text_EN_txt'),
                                            fq    : _(fieldQueries).flatten().compact().uniq().value(),
                                            q     : searchQuery.query,
                                            fl    : 'identifier_s',
                                        }
        
                                        return solrQuery;
                                    }

                                }]
                            });
                            
                            //==============================================================
                            function updateRecord(document, delay) {
                                if (!$scope.userFilters)
                                    $scope.userFilters = [];
                                var existing = _.find($scope.userFilters, {
                                    '_id': document._id
                                });
                                if (!existing) {
                                    $scope.userFilters.push(document);
                                    existing = document;
                                }
                                existing.pendingStatus = true;
                                IGenericService.get('v2016', 'me/subscriptions', document._id)
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

                    $scope.getFilterName = function (name) {
                        if(typeof name === "object")
                            return name[locale]
                        else return name;
                    }
                    

                    $scope.updateFrequency = async function(alertFrequency){
                        $scope.userSettings.alertFrequency = alertFrequency;

                        await updateUserSettings($scope.userSettings);
                    };

                    async function init(){
                        $scope.updating = true;
                        try{
                            loadSavedFilters();
                            const settings = await $http.get('/api/v2016/settings/'+`${realm.value}-${$scope.user.userID}`);
                            
                            if(settings)
                                $scope.userSettings = settings.data;
                        }
                        catch(e){
                            if(e.status != 404)
                                safeApply(()=>$scope.error = e.data);
                        }
                        finally{
                            safeApply(()=>$scope.updating = false);
                        }
                    }

                    async function updateUserSettings(data){
                        if(!data.realm)
                            data.realm = realm.value;
                        
                        //backend schema was changed to consolidated all setting..to have ch based setting only, create realm + user userID
                        if(!data.userId)
                            data.userId = `${realm.value}-${$scope.user.userID}`;
                                                    
                        $scope.updating = true;
                        $scope.error = undefined;

                        try{
                            let settingPromise;
                            if(data._id)
                                settingPromise = $http.put('/api/v2016/settings/'+data.userId, data);
                            else
                                settingPromise = $http.post('/api/v2016/settings', data);

                            const settingResponse = await settingPromise;
                            if(settingResponse.status == 200 && settingResponse.data.id)
                                $scope.userSettings._id =  settingResponse.data.id;
                        }
                        catch(e){
                            safeApply(()=>$scope.error = e.data);
                        }
                        finally{
                            safeApply(()=>$scope.updating = false);
                        }

                    }
                    function safeApply(fn) {
                        ($scope.$$phase || $scope.$root.$$phase) ? fn() : $scope.$apply(fn);
                    } 

                    init();
                }
            ]
        };
    }]);

