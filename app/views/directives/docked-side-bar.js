define(['app', 'lodash',
'text!views/directives/docked-side-bar.html', 'services/articles-service'],
    function(app, _, template) {
        app.directive('dockedSideBar', ['realm','$rootScope', '$route', '$location', 'articlesService',
        function(realm, $rootScope, $route, $location, articlesService) {
            return {
                restrict: 'AE',
                replace: true,
                template: template,
                scope   : {
                    tags: '@?',
                    type: '='
                },
                link: function($scope){
                    
                        $scope.status   = "loading";
                        $scope.error    = null;

                        $scope.articles = [];

                        //---------------------------------------------------------------------
                        function loadArticles(queryTags, isRetry){
                            $scope.loading = true;

                            var ag        = [];
                            var agLimit   = [];
                            var tags      = [];
                                queryTags = queryTags || $scope.tags;
                            
                            if(queryTags)
                                tags = _(queryTags.split(',')).compact().map(function(tag){
                                            return {"adminTags":encodeURIComponent(_.trim(tag))}
                                        }).value();
                            else{
                                if(realm.is('ABS')){
                                    tags =  [{"adminTags":encodeURIComponent("absch-announcement")}]
                                }
                                else if(realm.is('BCH')){
                                    if($scope.type == 'announcements')
                                        tags =  [{"adminTags":encodeURIComponent("bch-announcement")}];
                                    else{
                                        var paths = $location.path().split('/')
                                        if($location.path() == '/')
                                            paths = ['Home'];
                                        
                                        paths = _.union(paths, ['guide1']);

                                        if(paths){
                                            tags =  _(paths).compact().map(function(path){
                                                return {"adminTags":encodeURIComponent(_.trim(path))}
                                            }).value();
                                        }
                                    }
                                }
                            }

                            // tags.push({"adminTags":encodeURIComponent(realm.value.toLowerCase().replace(/-.*/,''))});

                            if(tags.length)
                                ag.push({"$match":{"$and":tags}});

                            ag.push({"$project" : {"title":1, "coverImage":1, "meta":1, "content":1, "summary":1}});
                            ag.push({"$sort" : {"meta.modifiedOn":-1}});

                            agLimit = JSON.parse(JSON.stringify(ag))
                            agLimit.push({"$limit" : 20});

                            var qs = {
                              "ag" : JSON.stringify(agLimit)
                            };


                            articlesService.getArticles(qs)
                            .then(function(data){
                                if((data||[]).length)
                                    $scope.articles = data;
                                else if(!isRetry){
                                    return loadArticles('guide', true);
                                }
                            })
                            .finally(function(){
                                $scope.loading=false
                            });
                        }

                        var evtRouteChangeSuccess = $rootScope.$on('$routeChangeSuccess', function (evt, current) {
                            if($scope.type == 'help')
                                loadArticles();
                        });

                        $scope.$on('$destroy', function(){
                            evtRouteChangeSuccess();
                        });

                        //---------------------------------------------------------------------
                         $scope.getSizedImage = function(url, size){
                            // return url;
            
                            return url && url
                            .replace(/attachments.cbd.int\//, '$&'+size+'/')
                            .replace(/\.s3-website-us-east-1\.amazonaws\.com\//, '$&'+size+'/')
                        }
                        //---------------------------------------------------------------------
                       
                        $scope.closeLeftSideBar = function(){
                            $rootScope.$broadcast('event:open-left-side-bar', $scope.openSideBarType)
                        }

                        if($scope.type)
                            loadArticles();

                            $('.help-header').affix({})

                }                
            };
        }]);
    });
