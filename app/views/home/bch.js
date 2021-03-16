import app from 'app';
import 'services/main';
import 'views/directives/map/home-map';
import 'views/directives/home-articles';
    export { default as template } from './bch.html';
export default ['$scope', 'articlesService', function ($scope, articlesService) {
        
        articlesService.getArticle('5ce467f7452a5c00015e3406')
        .then(function(article){
            $scope.betaArticle = article;
        })
        
    }];

