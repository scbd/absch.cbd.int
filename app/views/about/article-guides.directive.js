import app from 'app';
import template from "text!./article-guides.directive.html";
import 'services/main';

app.directive("articleGuides", [ function () {

	return {
		restrict   : "E",
		template: template,
		replace    : true,
        transclude : false,
        scope: {
            type  : '@',
            locale: '@',
            title:  '@',
            showFaqs:  '@',
            onFinishLoading: '&'
        },
		controller : ["$scope", "articlesService",
        function($scope,  articlesService)
		{
          
          loadArticles();
          $scope.introABSCH=[];
          $scope.requirements=[];
          $scope.help=[];
          $scope.intro=[];
          $scope.signIn=[];
          $scope.dashboard=[];
          $scope.format=[];
          $scope.review=[];
          $scope.publish=[];
          $scope.expand=false;

          //---------------------------------------------------------------------
          function loadArticles(str){
            var ag = [];
            
            ag.push({"$match":{"adminTags.title.en":{"$in":[encodeURIComponent("absch-guide"), "absch-guide-"  + $scope.type.toLowerCase() ]}}});
            ag.push({"$project" : {"title":1, "summary":1,"content":1,"meta":1, "adminTags":1}});
            
            var qs = {
              "ag" : JSON.stringify(ag)
              
            };
            articlesService.getArticles(qs).then(function(data){
              $scope.articles = data;
            
              for(var i=0;i < data.length;++i){

                  var admintags = JSON.stringify(data[i].adminTags);

                  if(admintags.indexOf("abschintroduction") > 0 ){
                    $scope.introABSCH = data[i];
                    continue;
                  }
                  
                  if(admintags.indexOf("requirements") >  0){
                    $scope.requirements = data[i];
                    continue;
                  }
                  
                  if(admintags.indexOf("help") > 0){
                    $scope.help = data[i];
                    continue;
                  }

                  if(admintags.indexOf("introduction") > 0 && admintags.indexOf($scope.type.toLowerCase()) > 0){
                    $scope.intro = data[i];
                    continue;
                  }


                  if(admintags.indexOf("signin") > 0){
                    $scope.signIn = data[i];
                    continue;
                  }

                  if(admintags.indexOf("dashboard") > 0){
                    $scope.dashboard = data[i];
                    continue;
                  }
                 
                  if(admintags.indexOf("review") > 0){
                    $scope.review = data[i];
                    continue;
                  }

                  if(admintags.indexOf(("absch-guide-" + $scope.type.toLowerCase())) > 0){
                    $scope.format = data[i];
                    $scope.onFinishLoading({title:data[i].summary[$scope.locale]})
                    continue;
                  }

                  if(admintags.indexOf("publish") > 0){
                    $scope.publish = data[i];
                    continue;
                  }

              }
            });

          }
          
          //---------------------------------------------------------------------
          $scope.getSizedImage = function(url, size){
            // return url;
              return url && url
              .replace(/attachments.cbd.int\//, '$&'+size+'/')
              .replace(/\.s3-website-us-east-1\.amazonaws\.com\//, '$&'+size+'/')
          }

          //---------------------------------------------------------------------
          $scope.expandAll = function(expand){
            $scope.show_introABSCH = expand;
            $scope.show_requirements = expand;
            $scope.show_help = expand;
            $scope.show_intro = expand;
            $scope.show_signIn = expand;
            $scope.show_dashboard = expand;
            $scope.show_format = expand;
            $scope.show_review = expand;
            $scope.show_publish = expand;
          }
          
         
		}]
	};
}]);


