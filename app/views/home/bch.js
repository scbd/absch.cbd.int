import app from '~/app';
import '~/services/main';
import '~/views/directives/map/home-map';
import '~/views/directives/home-articles';
import homepageRecords from '~/components/common/homepage-records.vue';
export { default as template } from './bch.html';
import bchHomeT from '~/app-text/views/home/bch.json';

export default ['$scope', 'articlesService', '$rootScope', 'translationService', function ($scope, articlesService, $rootScope, translationService) {
        translationService.set('bchHomeT', bchHomeT);
        $scope.recordCount = 4;
        $scope.announcementCounts = 3;
        if($rootScope.deviceSize == 'lg' || $rootScope.deviceSize == 'xl'){
          $scope.recordCount = 8;
        }
        $scope.exportVueComponent = {
          components: { homepageRecords }
        }

      $scope.exploreMore = function (  ){
        $('html, body').animate({
          scrollTop: $("#homePageMapSection").offset().top
        }, 1000);
      }

      $scope.scrollTo = function (anchor){
        $('html, body').animate({
          scrollTop: $("#"+ anchor).offset().top
        }, 1000);
      }

      
    }];
