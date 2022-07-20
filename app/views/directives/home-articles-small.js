import app from '~/app';
import template from 'text!./home-articles-small.html';
import _ from 'services/main';
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
                        $scope.imageSize = {_400 : '400x400'}
                        $scope.articles = [];

                        loadArticles();
                        //---------------------------------------------------------------------
                        function loadArticles(){
                            var ag = [];
                            var agLimit = [];
                            ag.push({"$match":{"$and":[{"adminTags":encodeURIComponent($scope.tags||"ABSCH-Announcement")}]}});
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
                                $scope.articlesCount = 0;
                                if(data)
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
    
