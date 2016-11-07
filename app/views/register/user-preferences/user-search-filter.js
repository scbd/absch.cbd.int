define(['app', 'underscore', 'ngDialog',
    '/app/views/search/search-directive.js'], function (app, _) {

    app.directive("userSearchFilters", ['$rootScope', 'ngDialog', function ($rootScope, ngDialog) {

        return {
            restrict: "EA",
            templateUrl: "/app/views/register/user-preferences/user-search-filter.html",
            replace: true,
            scope: {
                runQuery: '&'
            },
            link: function ($scope, element, attrs, searchDirective) { },
            controller: ['$scope', '$http', function ($scope, $http) {

                $scope.user = $rootScope.user;

                function loadSavedFilters(){
                    if($scope.user && $scope.user.isAuthenticated){
                        $http.get('/api/v2016/me/search-queries')
                            .then(function (data) {
                                $scope.userFilters = data.data
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

                $scope.add = function(){

                    ngDialog.open({
                                    className : 'ngdialog-theme-default wide',
                                    template : 'newFilterDialog',
                                    controller : ['$scope', '$http', function($scope, $http){
                                            

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
                loadSavedFilters();
            }]
        };
    }]);
});
