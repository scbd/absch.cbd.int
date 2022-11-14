import app from '~/app';
import template from 'text!./home-articles.html';
import '~/services/main';
import homeArticlesT from '~/app-text/views/directives/home-articles.json'

        app.directive('homeArticles', function($http) {
            return {
                restrict: 'EAC',
                replace: true,
                template: template,
                scope   : {
                    tags: '@?',
                    counts: '@'
                },
               
                controller: ['$scope', '$http','$q', '$filter', '$location', 'articlesService', 'locale', 'translationService',
                    function($scope, $http, $q, $filter, $location, articlesService, locale, translationService) {
                      
                        translationService.set('homeArticlesT', homeArticlesT);  
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
                            $scope.loading = true;
                            const tag = $scope.tags;
                            var ag = [];
                            ag.push({"$match":{"$and":[{"adminTags":encodeURIComponent(tag)}]}});
                            ag.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1, "summary":1}});
                            ag.push({ "$limit": parseInt($scope.counts)});
                            ag.push({"$sort": { 'meta.createdOn': -1 }})
                            var qs = {
                              "ag" : JSON.stringify(ag)
                            };

                            articlesService.getArticles(qs)
                            .then(function(data){
                                $scope.articles = data.map(e=>{
                                    const title = $filter('lstring')(e.title, locale)?.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
                                    e.url = `kb/tags/${tag}/${title}/${e._id}`
                                    return e;
                                });
                              })
                              .finally(()=>$scope.loading = false)

                          }
                        //---------------------------------------------------------------------
                         $scope.getSizedImage = function(url, size){
                            // return url;
                            return url && url
                            .replace(/attachments.cbd.int\//, '$&'+size+'/')
                            .replace(/\.s3-website-us-east-1\.amazonaws\.com\//, '$&'+size+'/')
                        }
                        
                    }
                ]
            };

        });
    
