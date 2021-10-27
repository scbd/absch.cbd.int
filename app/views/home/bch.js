import app from 'app';
import 'services/main';
import 'views/directives/map/home-map';
import 'views/directives/home-articles';
import nationalRecords from '~/components/common/national-records.vue';
import referenceRecords from '~/components/common/reference-records.vue';
export { default as template } from './bch.html';
export default ['$scope', 'articlesService', function ($scope, articlesService) {
        
        articlesService.getArticle('5ce467f7452a5c00015e3406')
        .then(function(article){
            $scope.betaArticle = article;
        })
    }];

app.directive('exploreMoreOnClick', ['$anchorScroll', function ($anchorScroll) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: '<div class="cursor-pointer bs5 my-2 my-lg-5 mt-lg-5 p-2 pt-lg-5 text-center   hidden-sm hidden-xs"><a class= "text-decoration-none"><span class="bs5 display-6 fs-1 rounded  py-3 px-5 color-white new-explore-btn">Explore the map <i class="fa  fa-arrow-down"></i></span></a></div >',
    scope: {
    },
    link: function (scope, element) {
      element.on('click', function () {
        $('html, body').animate({
          scrollTop: $("#hpmePageMapSection").offset().top
        }, 1000);
      });
    }
  };
}]);

app.directive('referenceRecord', [function () {
  return {
    restrict : 'E',
    template : `<div ng-if="exportVueComponent">
                  <reference-records ng-vue="exportVueComponent"></reference-records>
                </div>`,
    scope : {},
    link : function ( scope, $element, attr ) {
      scope.exportVueComponent = {
        components : { referenceRecords }
      }
    }
  }
}]);

app.directive('nationalRecord', [function () {
  return {
    restrict : 'E',
    template : `<div ng-if="exportVueComponent">
                  <national-records ng-vue="exportVueComponent"></national-records>
                </div>`,
    scope : {},
    link : function ( scope, $element, attr ) {

      scope.exportVueComponent = {
        components : { nationalRecords }
      }
    }
  }
}]);
