define(['app', 'text!views/directives/nav/portal-nav.html', 'ng-breadcrumbs',
'services/help-service', 'js/common', 'components/scbd-angularjs-services/services/locale'],
 function (app, template) {

app.directive('portalNav', ['locale', '$q','breadcrumbs', 'helpService', 'commonjs',
function (locale, $q, breadcrumbs, helpService, commonjs) {
    return {
        restrict: 'EAC',
        replace: true,
        template: template,
        link: function ($scope) {
            $scope.locale = locale;
            
            var sortField = 'name.'+(locale||'en');
            $q.when(commonjs.getCountries(sortField))
            .then(function(res){
                $scope.countries = res;
            });

            $scope.breadcrumbs     = breadcrumbs;
            $scope.$root.pageTitle = { text: "" };

            $scope.showHelp = helpService.getHelp();

            $scope.toggleHelp = function(){
                $scope.showHelp = !$scope.showHelp;
                helpService.toggleHelp();
            };
        }
    }
  }]);
});
