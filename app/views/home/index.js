define(['app','js/common','moment',
    'views/directives/home-country-dashboard-directive',
    'views/directives/map/home-map'    
    ], function (app) {
    app.controller('IndexController', ['$scope', '$http', '$window', '$cookies','realm', '$filter','$rootScope','commonjs','$element', '$timeout', '$compile', 
    function ($scope, $http, $window, $cookies, realm, $filter, $rootScope, commonjs,$element, $timeout, $compile) {
        
        $scope.locale = 'en';
        //var today= moment();
        var today= moment();
        var entry= moment("2014-10-12");
        $scope.entryintoforce = today.diff(entry, 'hours', true) >= 0 ? true:false;

        $scope.yearsSinceEntry = today.diff(entry, 'years', true);
        var years = Math.floor($scope.yearsSinceEntry);

        var monthsYears = entry;
        if(years >= 1){
            monthsYears = entry.add(years, 'year');
            $scope.monthsSinceEntry = today.diff(monthsYears, 'month', true);
        }
        else{
            $scope.monthsSinceEntry = today.diff(monthsYears, 'month', true) ;
        }
        var months = Math.floor($scope.monthsSinceEntry);

        monthsYears = monthsYears.add(months, 'month');
        $scope.daysSinceEntry = today.diff(monthsYears, 'days', true);
        var days = Math.round($scope.daysSinceEntry) ;

        $scope.yearsSinceEntry = years;
        $scope.monthsSinceEntry = months;
        $scope.daysSinceEntry = days;

        // angular.element(document).ready(function () {
        //     console.log('page loading completed');

            
                // require(['views/directives/map/home-map'], function(map){
                //     $scope.loading = false;
                //     $scope.$apply(function(){
                //         var mapElement = $element.find('#Jumbotron')
                //         $compile(mapElement.contents())($scope);
                        
                //     });
                // });
        // });
    }]);
});
