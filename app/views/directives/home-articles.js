define(['app',
'text!./home-articles.html', 'services/articles-service'],
    function(app, template, _) {
        app.directive('homeArticles', function($http) {
            return {
                restrict: 'EAC',
                replace: true,
                template: template,
                scope   : {
                    tags: '@?'
                },
                controller: ['$scope', '$http','$q', '$filter', '$location', 'articlesService',
                    function($scope, $http, $q, $filter, $location, articlesService) {
                    
                        $scope.status   = "loading";
                        $scope.error    = null;

                        $scope.articles = [];

                        loadArticles();
                        //---------------------------------------------------------------------
                        function loadArticles(){
                            var ag = [];
                            ag.push({"$match":{"$and":[{"adminTags.title.en":encodeURIComponent($scope.tags||"ABSCH-Announcement")}]}});
                            ag.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1, "summary":1}});
                            
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
                ]
            };

        });
    });
