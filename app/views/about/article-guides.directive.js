define(['app',"text!./article-guides.directive.html"],
function (app, template) {

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
            showFaqs:  '@'
        },
		controller : ["$scope", "$http", "$filter", "$rootScope", "locale", "$q",
        function($scope, $http, $filter, $rootScope, locale, $q)
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
            
            ag.push({"$match":{"adminTags.title.en":{"$in":[encodeURIComponent("ABSCH-Guide"), "ABSCH-Guide-"  + $scope.type.toUpperCase() ]}}});
            ag.push({"$project" : {"title":1, "summary":1,"content":1,"meta":1, "adminTags":1}});
            
            var qs = {
              "ag" : JSON.stringify(ag)
              
            };

            $q.when($http.get('https://api.cbd.int/api/v2017/articles', {params: qs}))
            .then(function(results){
              if((results||{}).data && results.data.length > 0)
              $scope.article = results.data;

              for(var i=0;i < results.data.length;++i){

                  var admintags = JSON.stringify(results.data[i].adminTags);
                  console.log("a="+admintags);

                  if(admintags.indexOf("ABSCHIntroduction") > 0 ){
                    $scope.introABSCH = results.data[i];
                    continue;
                  }
                  
                  if(admintags.indexOf("Requirements") >  0){
                    $scope.requirements = results.data[i];
                    continue;
                  }
                  
                  if(admintags.indexOf("help") > 0){
                    $scope.help = results.data[i];
                    continue;
                  }

                  if(admintags.indexOf("Introduction") > 0 && admintags.indexOf($scope.type.toUpperCase()) > 0){
                    $scope.intro = results.data[i];
                    continue;
                  }


                  if(admintags.indexOf("SignIn") > 0){
                    $scope.signIn = results.data[i];
                    continue;
                  }

                  if(admintags.indexOf("Dashboard") > 0){
                    $scope.dashboard = results.data[i];
                    continue;
                  }
                 
                  if(admintags.indexOf("Review") > 0){
                    $scope.review = results.data[i];
                    continue;
                  }

                  if(admintags.indexOf(("ABSCH-Guide-" + $scope.type.toUpperCase())) > 0){
                    $scope.format = results.data[i];
                    continue;
                  }

                  if(admintags.indexOf("Publish") > 0){
                    $scope.publish = results.data[i];
                    continue;
                  }

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

});
