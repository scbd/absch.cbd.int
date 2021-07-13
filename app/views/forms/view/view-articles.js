import app from 'app';
import _ from 'lodash';
import 'views/forms/view/view-articles';
import 'components/scbd-angularjs-services/main';
import 'services/main';
import 'ng-breadcrumbs';
import 'components/scbd-angularjs-controls/main';
import 'ck-editor-css';

  export { default as template } from './view-articles.html';

  export default ["$scope","$route", "$http", "$location", "locale", '$q', 'breadcrumbs','articlesService','ngMeta',
    function($scope,$route, $http,  $location, locale, $q, breadcrumbs, articlesService, ngMeta) {
      
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
            
            ngMeta.resetMeta();   
            ngMeta.setTitle( $scope.article.title[locale]);
            ngMeta.setTag('description',  $scope.article.summary[locale]);
         }
        })
      }

      //---------------------------------------------------------------------
      function loadArticles(page){
        var tag = "ABSCH-Announcement";
        var ag = [];
        var agLimit = [];
        var agCount = [];
        var itemCountQuery;

        ag.push({"$match":{"$and":[{"adminTags.title.en":encodeURIComponent(tag)}]}});
        ag.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1, "summary":1}});

        agLimit = JSON.parse(JSON.stringify(ag))
        agLimit.push({"$sort" : {"meta.modifiedOn":-1}});
        agLimit.push({"$skip" : (page||0)*$scope.itemsPerPage});
        agLimit.push({"$limit": $scope.itemsPerPage });

        var qsLimit = {
            "ag" : JSON.stringify(agLimit)
        };
               
        if($scope.itemCount == 0){

            agCount = JSON.parse(JSON.stringify(ag))
            agCount.push({"$count" : "mycount"});
            var qsCount = {
                "ag" : JSON.stringify(agCount) 
            };
            
            itemCountQuery = articlesService.getArticles(qsCount).then(function(data){
                if(data)
                  return (data[0]||{}).mycount||0;
                return 0;
              })
        } 
        else{
          itemCountQuery = $scope.itemCount;
        }     
       
        $q.all([articlesService.getArticles(qsLimit), itemCountQuery]).then(function(results){
            $scope.articles      = results[0];
            $scope.itemCount     = results[1];
            $scope.pageCount     = Math.ceil( $scope.itemCount / $scope.itemsPerPage);
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
  ];


