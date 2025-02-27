import app from '~/app';
import _ from 'lodash';
import '~/services/main';
import template from './docked-side-bar.html';
import 'ck-editor-css';
import dockedSideBarT from '~/app-text/views/directives/docked-side-bar.json';

app.directive('dockedSideBar', ['realm', '$rootScope', '$route', '$location', 'articlesService', '$q', 'translationService', 'locale',
    function (realm, $rootScope, $route, $location, articlesService, $q, translationService, locale) {
    return {
        restrict: 'AE',
        replace: true,
        template: template,
        scope   : {
            tags: '@?',
            type: '='
        },
        link: function($scope, $element){
                let canceler = null;
                translationService.set('dockedSideBarT', dockedSideBarT);
                $scope.search = (text)=>{                    
                    loadArticles({queryTags:$scope.type == 'announcements' ? 'announcement' : 'context-help', searchText:text, skipRefetch:true});
                }

                $scope.showTagArticles = (tag)=>{
                    $scope.back();
                    loadArticles({queryTags:tag, skipRefetch:true});
                }

                //---------------------------------------------------------------------
                function loadArticles({queryTags, skipRefetch, searchText}){
                    $scope.loading = true;
                    $scope.articles = undefined;

                    var ag        = [];
                    var agLimit   = [];
                    var tags      = [];
                        queryTags = queryTags || $scope.tags;
                    
                    if(queryTags)
                        tags = _(queryTags.split(',')).compact().map(function(tag){
                                    return {"adminTags":encodeURIComponent(_.trim(tag))}
                                }).value();
                    else{
                        if($scope.type == 'announcements')
                            tags =  [{"adminTags":encodeURIComponent("announcement")}];
                        else{
                            let paths = $route.current.originalPath.split('/')
                            if($location.path() == '/')
                                paths = ['home'];
                            else {
                                const pathParamKeys = _.keys($route.current.pathParams);
                                paths = paths.filter(e=>{
                                            return !pathParamKeys.includes(e.replace(':', ''))
                                        });

                                const validParams = ['tag', 'status', 'tab'];
                                const paramsTags = _.values($route.current.pathParams).filter(e=>{
                                    return _.intersection(pathParamKeys, validParams).length
                                });
                                if(paramsTags.length)
                                    paths = [...paths, ...paramsTags]
                            }
                            paths = [...paths, ...['context-help']];

                            if(paths){
                                tags =  _(paths).compact().map(function(path){
                                    return {"adminTags":encodeURIComponent(path.trim())}
                                }).value();
                            }
                        }
                    }

                    tags.push({"adminTags":encodeURIComponent(realm.value.toLowerCase().replace(/-.*/,''))});

                    if(tags.length)
                        ag.push({"$match":{"$and":tags}});

                    if ((searchText || '').trim() != '') {
                        ag.push({
                            "$match": {
                                "$or": [
                                    { [`title.${locale}`]: { "$$contains": searchText } },
                                    { [`content.${locale}`]: { "$$contains": searchText } }
                                ]
                            }
                        });
                    }

                    ag.push({"$project" : {"title":1, "coverImage":1, "meta":1, "content":1, "summary":1, "adminTags":1}});
                    ag.push({"$sort" : {"meta.modifiedOn":-1}});

                    agLimit = JSON.parse(JSON.stringify(ag))
                    agLimit.push({"$limit" : 20});

                    var qs = {
                        "ag" : JSON.stringify(agLimit)
                    };


                    if (canceler) {
                        canceler.resolve(true);
                    }
                    canceler = $q.defer();

                    return articlesService.getArticles(qs, false, canceler.promise)
                    .then(function(data){
                        canceler = null;
                        if((data||[]).length)
                            $scope.articles = data;
                        else if(!skipRefetch){
                            return loadArticles({queryTags:'context-help', skipRefetch:true});
                        }
                    })
                    .finally(function(){
                        $scope.loading=false
                    });
                }

                var evtRouteChangeSuccess = $rootScope.$on('$routeChangeSuccess', function (evt, current) {
                    $scope.freeText = '';
                    if($scope.type == 'help')
                        loadArticles({});
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
                    loadArticles({});

        }                
    };
}]);
