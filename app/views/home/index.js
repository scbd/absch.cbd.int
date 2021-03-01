define(['app','moment','services/main',
    'views/directives/home-country-dashboard-directive',
    'views/directives/map/home-map',
    'views/directives/home-articles-small',
    'angular-cookies'
], function (app, moment) {
    app.controller('IndexController', ['$scope',
    function ($scope) {

        $scope.locale = 'en';
        var today= moment.utc();
        var entry= moment.utc("2014-10-12");
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
