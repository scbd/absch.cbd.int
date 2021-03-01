define(['app',
'text!./home-articles-small.html', 'services/main'],
    function(app, template, _) {
        app.directive('homeArticlesSmall', function($http) {
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
                            var agLimit = [];
                            ag.push({"$match":{"$and":[{"adminTags.title.en":encodeURIComponent($scope.tags||"ABSCH-Announcement")}]}});
                            ag.push({"$project" : {"title":1, "coverImage":1, "meta":1, "summary":1}});
                            ag.push({"$sort" : {"meta.modifiedOn":-1}});

                            agLimit = JSON.parse(JSON.stringify(ag))
                            agLimit.push({"$limit" : 6});

                            var qs = {
                              "ag" : JSON.stringify(agLimit)
                            };
                            articlesService.getArticles(qs).then(function(data){
                                $scope.articles = data;
                            })
                          
                            ag.push({"$count" : "mycount"});
                            var qsCount = {
                                "ag" : JSON.stringify(ag) 
                             };
                            
                            articlesService.getArticles(qsCount).then(function(data){
                                $scope.articlesCount = (data[0]||{}).mycount||0;
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
