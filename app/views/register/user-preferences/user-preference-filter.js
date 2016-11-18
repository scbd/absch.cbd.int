define(['app', 'underscore', 'ngDialog',
    '/app/views/search/search-directive.js', 'scbd-angularjs-services/generic-service'], function (app, _) {

    app.directive("userPreferenceFilter", ['$rootScope', 'ngDialog', function ($rootScope, ngDialog) {

        return {
            restrict: "EA",
            templateUrl: "/app/views/register/user-preferences/user-preference-filter.html",
            replace: true,
            scope: {
                runQuery: '&',
                collection  :  '@',
                collectionFilter : '@?'
            },
            link: function ($scope, element, attrs) { 
            },
            controller: ['$scope', '$http', 'IGenericService', 'realm', function ($scope, $http, IGenericService, realm) {

                $scope.user = $rootScope.user;
                $scope.skipKeywordsFilter = false;
                $scope.skipTextFilter = false;
                if($scope.collection == "subscriptions"){
                    $scope.skipKeywordsFilter = true;
                    $scope.skipTextFilter = true;
                }

                function loadSavedFilters(){
                    if($scope.user && $scope.user.isAuthenticated){
                        var query = {};
                        if($scope.collectionFilter)
                            query = JSON.parse($scope.collectionFilter);
                        IGenericService.query('v2016', 'me/' + $scope.collection, query)
                        .then(function (data) {
                            $scope.userFilters = data
                        });
                    }
                }
                $rootScope.$on('signIn', function(evt, user){
                    $scope.user = user;
                    loadSavedFilters()
                });

                $scope.runUserQuery = function (record) {
                    if ($scope.runQuery)
                        $scope.runQuery({ filter: record });
                }

                $scope.deleteFilter = function(evt, record){

                    evt.stopPropagation();
                    ngDialog.open({
                                    className : 'ngdialog-theme-default wide',
                                    template : 'confirmDeleteDialog',
                                    controller : ['$scope', '$http', function($scope, $http){
                                            
                                            $scope.record = record;

                                            $scope.confirmDelete = function(){
                                                $scope.loading = true;                                            
                                                $http.delete('/api/v2016/me/search-queries/' + $scope.record._id)
                                                .then(function () {
                                                    removeRecord();
                                                    $scope.closeDialog();
                                                });
                                            }
                                            $scope.closeDialog = function(){
                                                ngDialog.close();                                            
                                            }

                                    }]
                                })
                    function removeRecord(){
                        $scope.userFilters.splice($scope.userFilters.indexOf(record), 1);;
                    }
                }

                $scope.addEdit = function(existingFilter){
                    if($rootScope.user && !$rootScope.user.isAuthenticated){
                        var signIn = $scope.$on('signIn', function(evt, data){
                                $scope.addEdit();
                                signIn();
                        });

                        $('#loginDialog').modal("show");
                    }
                    else{
                                        
                        var collection = $scope.collection;

                        ngDialog.open({
                                        className : 'ngdialog-theme-default wide',
                                        template : 'newFilterDialog',
                                        controller : ['$scope', 'IGenericService', '$timeout','realm', function($scope, IGenericService, $timeout, realm){
                                                
                                                if(existingFilter){
                                                    $scope.document = angular.copy(existingFilter);
                                                    $timeout(function(){
                                                        $scope.setSearchFilters(existingFilter.filters);
                                                    },100);
                                                }
                                                $scope.save = function(document){
                                                    $scope.errors = undefined;
                                                    if(!document || document.queryTitle == ''){
                                                        $scope.errors = [];
                                                        $scope.errors.push('Please enter title of the alert')
                                                    }
                                                    if(!document || document.queryTitle == ''){
                                                        if(!$scope.errors)$scope.errors = [];
                                                        $scope.errors.push('Please select at least one filter')
                                                    }
                                                    if($scope.errors && $scope.errors.length > 0){
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
                                                    if(!document._id)
                                                        operation = IGenericService.create('v2016', 'me/'  + collection, document);
                                                    else
                                                        operation = IGenericService.update('v2016', 'me/'  + collection, document._id, document);

                                                    operation.then(function (data) {
                                                            $scope.closeDialog();
                                                            if(!document._id)
                                                                document._id = data.id
                                                            updateRecord(document); 
                                                            });
                                                }
                                                $scope.closeDialog = function(){
                                                    ngDialog.close();                                            
                                                }

                                        }]
                        });
                        function updateRecord(document){
                            if(!$scope.userFilters)
                                $scope.userFilters = [];
                            IGenericService.get('v2016', 'me/'  + $scope.collection, document._id)
                            .then(function(data){                               
                                var existing = _.findWhere($scope.userFilters, {'_id' : document._id});
                                if(existing){
                                    existing.queryTitle = data.queryTitle;
                                    existing.meta = data.meta;
                                    existing.filters = data.filters;
                                }
                                else
                                    $scope.userFilters.push(data);
                            }); 
                        }
                    }
                }
                loadSavedFilters();
            }]
        };
    }]);
});