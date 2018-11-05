define(['app', 'text!views/directives/nav/portal-nav.html', 'underscore','ng-breadcrumbs','jquery', 'services/help-service', 'js/common'],
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
    , controller: ['$scope','$rootScope', '$q','$element','$http', '$filter','breadcrumbs', 'helpService', 'commonjs',
            function ($scope, $rootScope, $q, $element, $http, $filter, breadcrumbs, helpService, commonjs) {


        $q.when(commonjs.getCountries())
                .then(function(data){
                    $scope.countries = data;
                })

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
