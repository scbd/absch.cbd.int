define(['app',
'text!views/directives/home-articles.html'],
    function(app, template, _) {
        app.directive('homeArticles', function($http) {
            return {
                restrict: 'EAC',
                replace: true,
                template: template,
                controller: ['$scope', '$http','$q', '$filter', '$location',
                    function($scope, $http, $q, $filter, $location) {
                    
                        $scope.status   = "loading";
                        $scope.error    = null;

                        $scope.articles = [];

                        loadArticles();

                        function loadArticles(){
                            var ag = [];
                            ag.push({"$match":{"$and":[{"adminTags.title.en":encodeURIComponent("ABSCH-Announcement")}]}});
                            ag.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1}});
                            
                            var qs = {
                              "ag" : JSON.stringify(ag)
                            };

                            $q.when($http.get('https://api.cbd.int/api/v2017/articles', {params: qs}))
                            .then(function(results){
                              if((results||{}).data && results.data.length > 0)
                                $scope.articles = results.data;
                            })
                          }

                         $scope.getSizedImage = function(url, size){
                            // return url;
            
                            return url && url
                            .replace(/attachments.cbd.int\//, '$&'+size+'/')
                            .replace(/\.s3-website-us-east-1\.amazonaws\.com\//, '$&'+size+'/')
                        }

                        $scope.loadArticle = function(id){
                            $location.path('/articles/' + id );
                        }
                       

                    }
                ]
            };

        });
    });
