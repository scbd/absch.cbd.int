import app from 'app';
import moment from 'moment';
import 'services/main';
import 'views/directives/home-country-dashboard-directive';
import 'views/directives/map/home-map';
import 'views/directives/home-articles';
import homepageRecords from '~/components/common/homepage-records.vue';

import 'angular-cookies';
    export { default as template } from './index.html';
export default ['$scope','$rootScope',
    function ($scope, $rootScope) {

        $scope.recordCount = 4;
        if($rootScope.deviceSize !=undefined && $rootScope.deviceSize == 'lg'){
          $scope.recordCount = 8;
        }
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

        $scope.exportVueComponent = {
          components: { homepageRecords }
        }

      $scope.exploreMore = function (  ){
        $('html, body').animate({
          scrollTop: $("#homePageMapSection").offset().top
        }, 1000);
      }

    }];
