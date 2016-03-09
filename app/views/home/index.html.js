define(['app','/app/js/common.js','moment',
    '/app/views/directives/map/home-map.js',
    '/app/views/directives/home-country-dashboard-directive.html.js'], function (app) {
    app.controller('IndexController', ['$scope', '$http', '$window', '$cookies','realm', '$filter','$rootScope','commonjs','$element',
    function ($scope, $http, $window, $cookies, realm, $filter, $rootScope, commonjs,$element) {
            
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


    }]);
});
