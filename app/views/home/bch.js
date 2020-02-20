define(['app', 'services/articles-service',
    'views/directives/map/home-map',
'views/directives/home-articles'], function (app) {
    return ['$scope', 'articlesService', function ($scope, articlesService) {
        
        articlesService.getArticle('5ce467f7452a5c00015e3406')
        .then(function(article){
            $scope.betaArticle = article;
        })
        
    }];
});
