define(['app','underscore',
  '/about/new-about',
  '/js/common',
  '/components/scbd-angularjs-services/services/locale',
  './article-search.directive',
  './article-guides.directive',
  'components/scbd-angularjs-services/filters/scbd-filters',
  'services/articles-service',
  'ng-breadcrumbs',
], function(app, _) {

  app.controller("newAbout",
  ["$scope","$route", "$http", "$timeout", "$location","locale", 'commonjs', '$q', 'breadcrumbs', '$element', '$compile', 'realm','$window', '$location', 'articlesService',
    function($scope,$route, $http, $timeout, $location,locale, commonjs, $q, breadcrumbs, $element, $compile, realm, $window, $location, articlesService) {
      
      $scope.status   = "loading";
      $scope.error    = null;
      $scope.show = "articles";
      $scope.searchText ="";
      $scope.showSearch = true;

      $scope.id = $route.current.params.id;
      $scope.guide = $route.current.params.guide;

      if($scope.id == "guides" && $scope.guide){
        $scope.show = "guides";
      }
      else if($scope.id == "faqs"){
        $scope.faqs = "ABSCH-About, faqs"; 
        $scope.showSearch = true;
        $scope.show = "faqs";
      }
      else if($scope.id == "feedback"){
        $scope.show = "feedback";
      }
      else if($scope.id){
        loadArticles(["ABSCH-About", $scope.id]);
      }
      else{
        loadArticles(["ABSCH-About", "Introduction"]);
      }
     
      //---------------------------------------------------------------------
      function loadArticles(tags){
        var ag = [];
        
        for(var i=0;i < tags.length;++i){
          ag.push({"$match":{"$and":[{"adminTags.title.en":encodeURIComponent(tags[i])}]}});
        }
        ag.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1, "adminTags":1, "customTags":1, "tags":1}});
        
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
      $scope.loadArticle = function(tag){
        $location.url("/about/" + tag);
        $scope.show = "articles";
      }

      //---------------------------------------------------------------------
      $scope.loadFaqs = function(faqType){
        $scope.faqs = "ABSCH-About, faqs"; 
        $scope.showSearch = true;

        if(faqType){
          $scope.faqs = "ABSCH-About, faqs, " + faqType; 
          $scope.showSearch = false;
        }
        $scope.show = "faqs";
      }

      //---------------------------------------------------------------------
      $scope.loadGuides = function(){
        $scope.show = "guides";
      }

      //==================================================
      $scope.$watch("searchText", function(newVal, oldVal) {
        if ($scope.searchText.length >= 3) {
          $scope.show = "search";
        }
      });

     
   
    }
  ]);

});
