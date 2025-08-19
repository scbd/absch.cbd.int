import app from '~/app';
import _ from 'lodash';
import '~/services/main';
import template from './docked-side-bar.html';
import SolrApi from "~/api/solr.js";
import 'ck-editor-css';
import dockedSideBarT from '~/app-text/views/directives/docked-side-bar.json';
import { escape, andOr, localizeFields } from '../../services/solr/queries.js';
import { OASIS_REALM } from '~/services/filters/constant';
import ArticlesApi from '~/components/kb/article-api';

app.directive('dockedSideBar', ['realm', '$rootScope', '$route', '$location', 'translationService', 'locale',
    function (realm, $rootScope, $route, $location, translationService, locale) {
    return {
        restrict: 'AE',
        replace: true,
        template: template,
        scope   : {
            tags: '@?',
            type: '='
        },
        
        link: async function($scope, $element){
                $scope.error = false;
                const articlesApi = new ArticlesApi();
                $scope.articles = [];
                translationService.set('dockedSideBarT', dockedSideBarT);
                
                $scope.search = async (text)=>{ 
                    await loadArticles({queryTags:$scope.type == 'announcements' ? 'announcement' : 'context-help', searchText:text, skipRefetch:true});
                }

                $scope.showTagArticles = async (tag)=>{
                    $scope.back();
                    await loadArticles({queryTags:tag, skipRefetch:true});
                }

                //---------------------------------------------------------------------
                async function loadArticles({queryTags, skipRefetch, searchText}){
                    $scope.loading = true;
                    const localeKey = locale.toUpperCase(); 
                    let query = [`realm_ss:${OASIS_REALM}`];
                    let tags = [];
                    queryTags = queryTags || $scope.tags;
                    
                    if(queryTags)
                        tags = _(queryTags.split(',')).compact().map(function(tag){
                                    return _.trim(tag)
                                }).value();
                    else{
                        if($scope.type == 'announcements')
                            tags =  ["announcement"];
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
                                    return path.trim()
                                }).value();
                            }
                        }
                    }

                    tags.push(realm.value.toLowerCase().replace(/-.*/,'')); 

                    if(tags.length)
                        query.push(andOr(tags.map(t => `adminTags_ss:${t}`), 'AND'));

                    const searchTextTrimmed = (searchText || '').trim();
                    if(searchTextTrimmed) {
                        const escapedSearchText = escape(searchTextTrimmed);    
                        const fields = ['text_EN_txt', 'title_EN_txt', 'summary_EN_txt', 'content_EN_txt'];
                        const queryFields = fields.map(f => `${localizeFields(f, localeKey)}:${escapedSearchText}`);
                        query.push(andOr(queryFields, 'OR'));
                    }

                    const solrQuery = query.length ? andOr(query, 'AND') : '*:*';

                    const solrAPI = new SolrApi();
                    try {
                        const result = await solrAPI.query({
                            query: solrQuery,
                            fields: `title:${localizeFields('title_EN_s', localeKey)},summary:${localizeFields('summary_EN_s', localeKey)},coverImage:coverImage_ss,adminTags:adminTags_ss,createdDate:createdDate_dt,id`,
                            rowsPerPage: 20
                        }); 
 
                        if(result?.response?.docs.length>0){
                            $scope.$applyAsync(() => {
                                $scope.articles = result.response.docs;
                            }); 
                        }
                        else if(!skipRefetch){ 
                            return await loadArticles({queryTags:'context-help', skipRefetch:true});
                        }

                    } catch (e) {
                        console.error("error in load article",e);
                        $scope.error = true;
                    }
                    finally {
                        $scope.$applyAsync(() => {
                            $scope.loading = false;
                        });
                    };
                } 

                var evtRouteChangeSuccess = $rootScope.$on('$routeChangeSuccess', async function (evt, current) {
                    $scope.freeText = '';
                    if($scope.type == 'help')
                       await loadArticles({});
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

                $scope.details = async function(article) {
                    try {
                        $scope.loading = true;
                        $scope.showArticle = true;
                        $scope.error = false;
                        
                        const articleData = await articlesApi.getArticleById(article.id);
                        $scope.$applyAsync(() => {
                            $scope.articleData = articleData;
                        });
                    } catch (err) {
                        console.error("Error loading article", err);
                        $scope.error = true;
                    } finally {
                        $scope.$applyAsync(() => {
                            $scope.loading = false;
                        });
                    }
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
                    await loadArticles({});

        }                
    };
}]);
