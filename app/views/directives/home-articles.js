import app from 'app';
import template from 'text!./home-articles.html';
import _ from 'services/main';
        app.directive('homeArticles', function($http) {
            return {
                restrict: 'EAC',
                replace: true,
                template: template,
                scope   : {
                    tags: '@?',
                    counts: '@'
                },
                controller: ['$scope', '$http','$q', '$filter', '$location', 'articlesService', 'locale',
                    function($scope, $http, $q, $filter, $location, articlesService, locale) {
                    
                        $scope.locale = locale;
                        $scope.status   = "loading";
                        $scope.error    = null;
                        $scope.imageSize = {_400 : '400x400'}
                        if (!$scope.counts) {
                            $scope.counts = 20;
                        }
                        $scope.articles = [];

                        loadArticles();
                        //---------------------------------------------------------------------
                        function loadArticles(){
                            var ag = [];
                            ag.push({"$match":{"$and":[{"adminTags":encodeURIComponent($scope.tags||"absch-announcement")}]}});
                            ag.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1, "summary":1}});
                            ag.push({ "$limit": parseInt($scope.counts)});
                            ag.push({"$sort": { 'meta.createdOn': -1 }})
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
    
