import app from '~/app';
import moment from 'moment';
import '~/services/main';
import '~/views/directives/home-country-dashboard-directive';
import '~/views/directives/map/home-map';
import '~/views/directives/home-articles';
import homepageRecords from '~/components/common/homepage-records.vue';
import 'angular-cookies';
import absHomeT from '~/app-text/views/home/index.json';

export { default as template } from './index.html';

export default ['$scope','$rootScope', 'translationService', function ($scope, $rootScope, translationService) {

        translationService.set('absHomeT', absHomeT);
       
        $scope.exportVueComponent = {
          components: { homepageRecords }
        }

      $scope.scrollTo = function (anchor){
        $('html, body').animate({
          scrollTop: $("#"+ anchor).offset().top
        }, 0);
      }

    }];
