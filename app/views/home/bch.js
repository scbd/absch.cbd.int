import app from 'app';
import 'services/main';
import 'views/directives/map/home-map';
import 'views/directives/home-articles';

import 'angular-vue'
import tableExport from '~/components/common/export.vue';

export { default as template } from './bch.html';
export default ['$scope', 'articlesService', function ($scope, articlesService) {
        
    $scope.vueOptions = {
        components:{tableExport}
    };

    $scope.getQuery

    articlesService.getArticle('5ce467f7452a5c00015e3406')
    .then(function(article){
        $scope.betaArticle = article;
    })
    
}];

