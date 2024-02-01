import app from '~/app';
import '~/services/main';
import '~/views/directives/map/home-map';
import '~/views/directives/home-articles';
import homepageRecords from '~/components/common/homepage-records.vue';
export { default as template } from './chm.html';
import chmHomeT from '~/app-text/views/home/chm.json';

export default ['$scope', 'articlesService', '$rootScope', 'translationService', function ($scope, articlesService, $rootScope, translationService) {
        translationService.set('chmHomeT', chmHomeT);
        
        $scope.recordCount = 4;
        if($rootScope.deviceSize == 'lg' || $rootScope.deviceSize == 'xl'){
          $scope.recordCount = 8;
        }

        $scope.exportVueComponent = {
          components: { homepageRecords }
        }
      $scope.scrollTo = function (anchor){
        $('html, body').animate({
          scrollTop: $("#"+ anchor).offset().top
        }, 0);
      }

      
    }];
