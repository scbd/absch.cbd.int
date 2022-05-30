import app from 'app';
import 'services/main';
import 'views/directives/map/home-map';
import 'views/directives/home-articles';
import homepageRecords from '~/components/common/homepage-records.vue';
export { default as template } from './bch.html';
export default ['$scope', 'articlesService', '$rootScope', function ($scope, articlesService, $rootScope) {
        $scope.recordCount = 4;
        $scope.announcementCounts = 3;
        if($rootScope.deviceSize == 'lg' || $rootScope.deviceSize == 'xl'){
          $scope.recordCount = 8;
          $scope.announcementCounts = 6;
        }
        $scope.exportVueComponent = {
          components: { homepageRecords }
        }

      $scope.exploreMore = function (  ){
        $('html, body').animate({
          scrollTop: $("#homePageMapSection").offset().top
        }, 1000);
      }
    }];
