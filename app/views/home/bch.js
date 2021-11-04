import app from 'app';
import 'services/main';
import 'views/directives/map/home-map';
import 'views/directives/home-articles';
import homepageRecords from '~/components/common/homepage-records.vue';
export { default as template } from './bch.html';
export default ['$scope', 'articlesService', function ($scope, articlesService) {
        $scope.exportVueComponent = {
          components: { homepageRecords }
        }
        articlesService.getArticle('5ce467f7452a5c00015e3406')
        .then(function(article){
            $scope.betaArticle = article;
        })

      $scope.exploreMore = function (  ){
        $('html, body').animate({
          scrollTop: $("#homePageMapSection").offset().top
        }, 1000);
      }
    }];
