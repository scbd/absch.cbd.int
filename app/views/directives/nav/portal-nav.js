define(['app', 'text!views/directives/nav/portal-nav.html', 'underscore','ng-breadcrumbs','jquery', 'services/help-service'],
 function (app, template, _, showHelp, $) {
app.directive('portalNav', function () {
    return {
    restrict: 'EAC',
    replace: true,
    // transclude: true,
    template: template,
    // scope: {
    //         uid: '@',
    // },
    link: ['$scope', '$q', '$element', function ($scope, $q, $element) {
        
    }]
    , controller: ['$scope','$rootScope', '$q','$element','$http', '$filter','breadcrumbs', 'helpService',
            function ($scope, $rootScope, $q, $element, $http, $filter, breadcrumbs, helpService) {

        $http.get('/api/v2015/countries', {params: { f: { code:1, name:1 } }, cache:1 }).then(function(res){
            $scope.countries = res.data;
        });

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
