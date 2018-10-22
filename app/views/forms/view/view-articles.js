define(['app','underscore',
  '/forms/view/view-articles',
  '/js/common',
  '/components/scbd-angularjs-services/services/locale',
  'services/articles-service',
  'ng-breadcrumbs',
], function(app, _) {

  app.controller("viewArticles",
  ["$scope","$route", "$http", "$timeout", "$location","locale", 'commonjs', '$q', 'breadcrumbs', '$element', '$compile', 'realm','articlesService',
    function($scope,$route, $http, $timeout, $location,locale, commonjs, $q, breadcrumbs, $element, $compile, realm, articlesService) {
      
      $scope.status   = "loading";
      $scope.error    = null;

      var id = $route.current.params.id;
   
      if (id) 
        loadArticle(id);
      else
        loadArticles("ABSCH-Announcement");

      //---------------------------------------------------------------------
      function loadArticle(id){
          $q.when($http.get('https://api.cbd.int/api/v2017/articles/' + id))
          .then(function(results){
              $scope.article = results.data;
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
