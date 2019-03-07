define(['app',   'services/articles-service',
], function (app) {
    app.controller('GameController', ['$scope', '$route', "articlesService",
    function ($scope, $route, articlesService) {

    //-----------------------------------------------------
    $scope.load = function(tag){
        loadArticle(tag);
    }

    //-----------------------------------------------------
    function loadArticle(tag){
        var ag = [];
        ag.push({"$match":{"$and":[{"adminTags.title.en":encodeURIComponent("ABSCH-Game")}]}});
        ag.push({"$match":{"$and":[{"adminTags.title.en":encodeURIComponent(tag)}]}});
        ag.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1, "adminTags":1, "customTags":1, "tags":1}});

        var qs = {
          "ag" : JSON.stringify(ag)
        };

        articlesService.getArticles(qs).then(function(data){
          $scope.article = data[0];
        });
    }

    var tag="start";
    tag = $route.current.params.tag;
    if(!tag)
        tag="start";

    loadArticle(tag);


    }]);
});
