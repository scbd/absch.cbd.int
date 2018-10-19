define(['app',"text!./article-search.directive.html"],
function (app, template) {

app.directive("articleSearch", [ function () {

	return {
		restrict   : "E",
		template: template,
		replace    : true,
        transclude : false,
        scope: {
            adminTags  : '@',
            tags  : '@',
            locale: '@',
            title:  '@',
            search: '=',
            categories: '@',
            keyword:'='
        },
		controller : ["$scope", "$http", "$filter", "$rootScope", "locale", "$q",
        function($scope, $http, $filter, $rootScope, locale, $q)
		{
           if ($scope.adminTags) 
               loadArticles($scope.adminTags);

          if ($scope.keyword) 
              $scope.searchText = $scope.keyword;
          
          //---------------------------------------------------------------------
          function loadArticles(str){

            var adminTags = str.split(",");

            if ($scope.tags) 
              var tags = $scope.tags.split(",");
    
            var ag = [];
            
            for(var i=0;i < adminTags.length;++i){
              ag.push({"$match":{"$and":[{"adminTags.title.en":encodeURIComponent(adminTags[i].trim())}]}});
            }
            if(tags){
              for(var i=0;i < tags.length;++i){
                ag.push({"$match":{"$or":[{"customTags.title.en":encodeURIComponent(tags[i].trim())}]}});
              }
           }
            ag.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1, "adminTags":1, "customTags":1, "tags":1}});

            var qs = {
              "ag" : JSON.stringify(ag)
            };
    
            $q.when($http.get('https://api.cbd.int/api/v2017/articles', {params: qs}))
            .then(function(results){
              if((results||{}).data && results.data.length > 0)
              $scope.articles = results.data;
            })
          }
          //---------------------------------------------------------------------
          $scope.getSizedImage = function(url, size){
            // return url;
              return url && url
              .replace(/attachments.cbd.int\//, '$&'+size+'/')
              .replace(/\.s3-website-us-east-1\.amazonaws\.com\//, '$&'+size+'/')
          }
        //==================================================
        $scope.$watch("keyword", function(newVal, oldVal){
          if (newVal != oldVal) {
            $scope.searchText = $scope.keyword;
          }
        });
        //==================================================
        $scope.$watch("adminTags", function(newVal, oldVal){
          loadArticles($scope.adminTags);
        });
        
        //---------------------------------------------------------------------
        $scope.expandAll = function(expand){
          $scope.showFAQ = expand;
        }
          

		}]
	};
}]);

});
