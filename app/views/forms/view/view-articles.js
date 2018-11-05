define(['app','underscore',
  '/forms/view/view-articles',
  '/components/scbd-angularjs-services/services/locale',
  'services/articles-service',
  'ng-breadcrumbs',
], function(app, _) {

  app.controller("viewArticles",
  ["$scope","$route", "$http", "$location", "locale", '$q', 'breadcrumbs','articlesService',
    function($scope,$route, $http,  $location, locale, $q, breadcrumbs, articlesService) {
      
      $scope.status   = "loading";
      $scope.error    = null;

      var id = $route.current.params.id;
   
      if (id) 
        loadArticle(id);
      else
        loadArticles("ABSCH-Announcement");

        var breadcrumb = {    
          label : 'Announcement',
          originalPath : "articles",
          param:'articles',
          path:"/articles/"
        }

      //---------------------------------------------------------------------
      function loadArticle(id){
        articlesService.getArticle(id, true).then(function(data){
          
          $scope.article = data;
          
          if($scope.article){
            //breadcrumbs.breadcrumbs.splice(1, 0 , breadcrumb);
            breadcrumbs.options = {'articleTitle':  $scope.article.title[locale] };
         }
        })
      }

      //---------------------------------------------------------------------
      function loadArticles(tag){
        var ag = [];
        ag.push({"$match":{"$and":[{"adminTags.title.en":encodeURIComponent(tag)}]}});
        ag.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1}});
        var qs = {
          "ag" : JSON.stringify(ag)
        };
        articlesService.getArticles(qs).then(function(data){
          $scope.articles = data;
        })
      }
      //---------------------------------------------------------------------
      $scope.getSizedImage = function(url, size){
        // return url;
          return url && url
          .replace(/attachments.cbd.int\//, '$&'+size+'/')
          .replace(/\.s3-website-us-east-1\.amazonaws\.com\//, '$&'+size+'/')
      }
      //---------------------------------------------------------------------
      $scope.loadArticle = function(id){
        $location.path('/articles/' + id );
      }
   

    }
  ]);

});
