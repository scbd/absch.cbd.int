import app from 'app';
import _ from 'lodash';
import 'services/articles-service';
import template from './docked-side-bar.html';

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
        link: function($scope, $element){
            
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
                                    paths = ['home'];
                                
                                paths = _.union(paths, ['context-help']);

                                if(paths){
                                    tags =  _(paths).compact().map(function(path){
                                        return {"adminTags":encodeURIComponent(_.trim(path))}
                                    }).value();
                                }
                            }
                        }
                    }

                    tags.push({"adminTags":encodeURIComponent(realm.value.toLowerCase().replace(/-.*/,''))});

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
                            return loadArticles('context-help', true);
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

                var scrollHandlerfn = function() {                               
                    if ($(this).scrollTop() > 0){
                        $('#sidebar-wrapper').css('top', '0px');
                        $('#docketSideBar').css('height', '90vh');
                    }
                    else{
                        $('#sidebar-wrapper').css('top', 'unset');
                        $('#docketSideBar').css('height', '95vh');
                    }
                }
                $(window).scroll(scrollHandlerfn);
                $scope.$on('$destroy', function(){
                    evtRouteChangeSuccess();
                    $(window).off('scroll', scrollHandlerfn)
                });

                $scope.details =function(article)
                {
                    $scope.showArticle = true;
                    $scope.articleData = article;
                }
                $scope.back =function()
                {
                    $scope.showArticle = false;
                    $scope.articleData = undefined;
                }
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

        }                
    };
}]);
