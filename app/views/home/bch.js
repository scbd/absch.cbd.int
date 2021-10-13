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
