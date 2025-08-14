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
                        async function loadArticles(){
                            $scope.loading = true;
                            const tag = $scope.tags;
                            const pinnedAnnouncementReq = [];
                            const allAnnouncementReq = [];
                            allAnnouncementReq.push({"$match":{
                                    "$and":[
                                        {"adminTags":encodeURIComponent(tag)},
                                        {
                                            $or: [
                                                {'customProperties.pinned':false},
                                                {'customProperties.pinned':{$exists:false}}
                                            ]
                                        }
                                    ]}});
                            allAnnouncementReq.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1, "summary":1}});
                            allAnnouncementReq.push({"$sort": { 'meta.createdOn': -1 }})
                            allAnnouncementReq.push({ "$limit": parseInt($scope.counts)});

                            pinnedAnnouncementReq.push({"$match":{
                                    "$and":[
                                        {
                                            "adminTags":encodeURIComponent(tag),
                                            'customProperties.pinned':true
                                        }
                                    ]
                                }});
                            pinnedAnnouncementReq.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1, "summary":1, 'customProperties':1}});
                            pinnedAnnouncementReq.push({"$sort": {'customProperties.pinSequence':1 }})
                            pinnedAnnouncementReq.push({ "$limit": parseInt($scope.counts)});
                            
                            
                            var requests = [
                                articlesService.getArticles({"ag" : JSON.stringify(pinnedAnnouncementReq)}),
                                articlesService.getArticles({"ag" : JSON.stringify(allAnnouncementReq)}),
                            ]
                              
                            try{
                                const [pinned, allAnnouncements] = await Promise.all(requests)
                                const data = [...(pinned||[]), ...(allAnnouncements||[])].filter((e,i)=>i<$scope.counts)
                                console.log(data)
                                $scope.articles = data?.map(e=>{
                                    const title = $filter('lstring')(e.title, locale)?.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
                                    e.url = `kb/tags/${tag}/${title}/${e._id}`
                                    e.isPinned = e.customProperties?.pinned
                                    return e;
                                });
                            }
                            catch(e){
                                console.error(e);
                            }
                            finally{
                                $scope.loading = false
                            }

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
    
