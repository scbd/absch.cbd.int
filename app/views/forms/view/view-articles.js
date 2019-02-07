define(['app','underscore',
  './view-articles',
  'components/scbd-angularjs-services/services/locale',
  'services/articles-service',
  'ng-breadcrumbs',
  'views/directives/pagination'
], function(app, _) {

  app.controller("viewArticles",
  ["$scope","$route", "$http", "$location", "locale", '$q', 'breadcrumbs','articlesService',
    function($scope,$route, $http,  $location, locale, $q, breadcrumbs, articlesService) {
      
      $scope.currentPage=0;
      $scope.itemCount=0;
      $scope.itemsPerPage=9;

      $scope.status   = "loading";
      $scope.error    = null;

      var id = $route.current.params.id;
   
      if (id) 
        loadArticle(id);
      else
        
        loadArticles(0);

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
      function loadArticles(page){
        var tag = "ABSCH-Announcement";
        var ag = [];
        var agLimit = [];
        var agCount = [];
        ag.push({"$match":{"$and":[{"adminTags.title.en":encodeURIComponent(tag)}]}});
        ag.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1, "summary":1}});
               
        if(page==0 && $scope.itemCount == 0){
            agCount = JSON.parse(JSON.stringify(ag))
            agCount.push({"$count" : "mycount"});
            var qsCount = {
                "ag" : JSON.stringify(agCount) 
            };
            
            articlesService.getArticles(qsCount).then(function(data){
                $scope.itemCount = (data[0]||{}).mycount||0;
              })
        }
        if($scope.itemCount == 0)
          $scope.itemCount == $scope.itemsPerPage;
        
        agLimit = JSON.parse(JSON.stringify(ag))
        agLimit.push({"$sort" : {"meta.modifiedOn":-1}});
        agLimit.push({"$skip" : (page||0)*$scope.itemsPerPage});
        agLimit.push({"$limit": $scope.itemsPerPage });

        var qsLimit = {
            "ag" : JSON.stringify(agLimit)
        };

        articlesService.getArticles(qsLimit).then(function(result){
            $scope.articles      = result;
            $scope.pageCount     = Math.ceil(9 / $scope.itemsPerPage);
            $scope.currentPage   = page;
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

      $scope.onPageChange = function(page){
        loadArticles(page);
      } 
   

    }
  ]);

});
