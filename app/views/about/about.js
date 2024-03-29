import app from '~/app';
import _ from 'lodash';
import '~/components/scbd-angularjs-services/main';
import '~/views/about/article-search.directive';
import '~/views/about/article-guides.directive';
import '~/services/main';
import 'ng-breadcrumbs';

  export { default as template } from './about.html';

  export default ["$scope","$route", "$location", "locale", 'breadcrumbs', 'articlesService', 'ngMeta', 'realm',
    function($scope,$route, $location, locale, breadcrumbs,  articlesService, ngMeta, realm) {
      
      $scope.status   = "loading";
      $scope.error    = null;
      $scope.show = "articles";
      $scope.searchText ="";
      $scope.showSearch = true;

      loadLinks();

      var breadcrumb = {    
        label : 'About ABSCH',
        originalPath : "about",
        param:'about',
        path:"/about/"
      }

      $scope.id = $route.current.params.id;
      $scope.type = $route.current.params.type;
      $scope.faqType = $route.current.params.faqType;

      function init(){
        if($scope.id == "guides" && $scope.type){
          $scope.show = "guides";
          breadcrumbs.options = {'about_code': "Step-by-step guides" };
        }
        else if($scope.id == "faqs"){
          //$scope.faqs = "ABSCH-About, faqs"; 
          //$scope.showSearch = true;
          //$scope.show = "faqs";
          loadFaqs($scope.type);
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
      }
     
       //---------------------------------------------------------------------
       function loadLinks(){
      
        articlesService.getArticle("5be4b1828a5b94000193d1e9").then(function(data){
          $scope.links = data;
        })
      }

    
      //---------------------------------------------------------------------
      function loadArticles(tags){
        var ag = [];
        
        for(var i=0;i < tags.length;++i){
          ag.push({"$match":{"$and":[{"adminTags":encodeURIComponent(tags[i])}]}});
        }
        ag.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1, "adminTags":1, "customTags":1, "tags":1}});
        
        var qs = {
          "ag" : JSON.stringify(ag)
        };
      
        articlesService.getArticles(qs).then(function(data){
          $scope.articles = data;

          if($scope.articles){
            breadcrumbs.options = {'about_code': $scope.articles[0].title[locale] };
            $scope.setMetaTags()
          }
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
      $scope.loadGuides = function(){
        $scope.show = "guides";
        breadcrumbs.options = {'about_code': "Step-by-step guides" };
      }

      //==================================================
      $scope.$watch("searchText", function(newVal, oldVal) {
        if ($scope.searchText.length >= 3) {
          $scope.show = "search";
        }
      });

      $scope.setMetaTags = function(title){
          title = title||'';          
          if(title!='')
            title += ' | ';
          title += breadcrumbs.options.about_code + ' | About ' + realm.chShortName;

          ngMeta.resetMeta();  
          ngMeta.setTitle(title);
          // ngMeta.setTag('description', summary || window.scbdApp.title);
      }     

      function loadFaqs(faqType){
        $scope.faqs = "ABSCH-About, faqs"; 
        $scope.showSearch = true;

        if(faqType){
          $scope.faqs = "ABSCH-About, faqs, " + faqType; 
          $scope.showSearch = false;
        }
        $scope.show = "faqs";
        breadcrumbs.options = {'about_code': "FAQs" };
        $scope.setMetaTags();
      }

      init();
    }
  ];


