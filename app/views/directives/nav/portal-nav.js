define(['app', 'underscore','ng-breadcrumbs','jquery', '/app/services/help-service.js'], function (app, _, showHelp, $) {
app.directive('portalNav', function () {
    return {
    restrict: 'EAC',
    replace: true,
    // transclude: true,
    templateUrl: '/app/views/directives/nav/portal-nav.html',
    // scope: {
    //         uid: '@',
    // },
    link: ['$scope', '$q', '$element', function ($scope, $q, $element) {

    }]
    , controller: ['$scope','$rootScope', '$q','$element','$http', '$filter','breadcrumbs', 'helpService',
            function ($scope, $rootScope, $q, $element, $http, $filter, breadcrumbs, helpService) {

      $scope.breadcrumbs     = breadcrumbs;
      $scope.$root.pageTitle = { text: "" };

      $scope.showHelp = helpService.getHelp();

       $scope.toggleHelp = function(){
           $scope.showHelp = !$scope.showHelp;
           helpService.toggleHelp();
       };

      }]};//end controller
  });
});
