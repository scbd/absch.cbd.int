import app from 'app';
import _ from 'lodash';
import moment from 'moment';
import angular from 'angular';
import 'toastr';
import 'bootstrap';
import 'routes/absch';
import 'angular-loggly-logger';
import 'angular-animate';
import 'components/scbd-branding/main';
import 'services/main';
import 'views/directives/route-loading-directive';
import footerHtml from 'text!./absch-footer.html';
import cbdFooter from 'text!./cbd-footer.html';
import './absch-header';

    app.config(["toastrConfig", function(toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss:true,
            containerId:'toast-container',
            maxOpened:1,
            newestOnTop:true,
            positionClass: 'toast-top-right',
            preventDuplicates:true,
            preventOpenDuplicates:false,
            target:'body',
            timeOut:2000,
            });
        }]);

        app.directive('footer', [function () { return { restrict: 'E', template: footerHtml }; }]);
        app.directive('cbdFooter', [function () { return { restrict: 'E', template: cbdFooter }; }]);
    

    app.controller('AbschTemplateController', ['$scope', '$rootScope', 'showHelp',
        '$location', '$anchorScroll', 'toastr', '$route',
        '$window', '$element', 'localStorageService', 'appConfigService', 'LogglyLogger', 'locale', '$compile', 'ngMeta',
        function ($scope, $rootScope, showHelp, $location, $anchorScroll, toastr, $route,
            $window, $element, localStorageService, appConfigService, logglyLogger, locale, $compile, ngMeta
        ) {

            //set default moment lang
            var lang = locale;
            var basePath = (angular.element('base').attr('href') || '').replace(/\/+$/g, '');
            $scope.env_name = "ABS-CH";
            $scope.production_env = true;
            $scope.development_env = false;
            $scope.training_env = false;
            $scope.controller = "TemplateController";
            $scope.$root.pageTitle = {
                text: ""
            };


            $scope.toggleSideBar = function () {
                $element.find("#wrapper").toggleClass("toggled");
            }

            $scope.gotoAnchor = function (x) {
                var newHash = 'anchor' + x;
                if ($location.hash() !== newHash) {
                    // set the $location.hash to `newHash` and
                    // $anchorScroll will automatically scroll to it
                    $location.hash('anchor' + x);
                } else {
                    // call $anchorScroll() explicitly,
                    // since $location.hash hasn't changed
                    $anchorScroll();
                }
            };

            $scope.scrollToTop = function(){
                $('html, body').animate({scrollTop:0},'50');
            }

            $scope.getClass = function (path) {
                if ($location.path().substr(0, path.length) == path) {
                    return true;
                } else {
                    return false;
                }
            };

            $scope.feedbackHelp = function () {
                if ($scope.showHelp.show)
                    showSimpleToast("Help information is turned on.");

                if (!$scope.showHelp.show)
                    showSimpleToast("Help information is turned off.");
            };

            $scope.feedbackGlossary = function () {
                if ($scope.showHelp.glossary)
                    showSimpleToast("Glossary is turned on.");

                if (!$scope.showHelp.glossary)
                    showSimpleToast("Glossary is turned off.");
            };

            $rootScope.$on("showSimpleToast", function (evt, msg) {
                showSimpleToast(msg);

            });

            $scope.$on('signOut', function (evt, data) {
                $window.location.reload();
            });

            $rootScope.$on('$routeChangeSuccess', function (evt, current) {
                if($window.scbdApp.analytics){
                    $window.ga('set', 'page', basePath + $location.path());
                    $window.ga('send', 'pageview');
                }

                ngMeta.resetMeta();
                if(current.$$route && current.$$route.label)
                    ngMeta.setTitle(current.$$route.label)
                
                ngMeta.setTag('canonical', $window.location.href)
            });

            $rootScope.$on('event:server-pushNotification', function (evt, pushNotification) {
                if (pushNotification.type == 'documentNotification') {
                    // toastr.info(data.message);
                    if (pushNotification.data && pushNotification.data.realm == appConfigService.currentRealm) {
                        localStorageService.remove('governmentFacets');
                        localStorageService.remove('searchFilters');
                    }
                }
            });

            function showSimpleToast(msg) {
                toastr.info(msg);
            }
            function updateSize() {
                $rootScope.$applyAsync(function () {
                    $rootScope.deviceSize = $('.device-size:visible').attr('size');
                });
            }
            
            $rootScope.$watch('user', _.debounce(function (user) {

                if (!user)
                    return;

                require(["slaask"], function (_slaask) {

                    if (user.isAuthenticated && _slaask) {
                        _slaask.identify(user.name, {
                            'user-id': user.userID,
                            'name': user.name,
                            'email': user.email,
                        });

                        if (_slaask.initialized) {
                            if (_slaask.slaaskSendUserInfos)
                                _slaask.slaaskSendUserInfos();
                        }
                    }

                    if (_slaask && !_slaask.initialized) {
                        _slaask.init('8b989bd6ee0cf49384761d4f86ddd945');
                    }
                });

                var fields = logglyLogger.fields()
                fields.user = user.userID;
                logglyLogger.fields(fields);

            }, 1000));

            function loadDepencies(){

                require(['angular-animate', 'components/scbd-angularjs-services/main',
                'angular-animate', 'components/scbd-branding/main',
                'views/directives/nav/portal-branding', 'views/directives/nav/portal-nav'], 
                    function () {

                            $('#divHeader').append('<scbd-header></scbd-header><portal-branding></portal-branding><portal-nav></portal-nav>');
                            $('#divFooter').append('<scbd-footer></scbd-footer>')
                            $compile($('#divHeader').contents())($scope);
                            $compile($('#divFooter').contents())($scope);

                    })
            }

            function setupLanguage(){

                if (lang == 'zh')
                    lang = 'zh-cn'; //moment has two ZH, use ZH-CN

                moment.locale(lang);

                if (lang != 'en')
                    require(['css!/app/css/translation.css'], function(){});

                if (lang == 'ar') {
                    require(['css!https://cdn.cbd.int/bootstrap-rtl@3.3.4/dist/css/bootstrap-flipped.min.css'], function(){});
                }
            }

            function setupTranslationValidation(){
                var validate = localStorageService.get('validateTranslation');
                if(validate)
                    $('body#top').addClass('validate-translation')
                else
                    $('body#top').removeClass('validate-translation')
            }

            function init(){

                setupTranslationValidation()
                setupLanguage()
                if ($location.absUrl().toLowerCase().indexOf("://training-absch.cbd.int") > 0) {
                    $scope.development_env = false;
                    $scope.training_env = true;
                    $scope.production_env = false;
                    $scope.env_name = "TRAINING";
                }

                updateSize();
                angular.element($window).on('resize', updateSize);

                loadDepencies();
            }

            init();
        }
    ]);
    app.directive(
        "mAppLoading",
        function ($animate) {
            // Return the directive configuration.
            return ({
                link: link,
                restrict: "C"
            });
            function link(scope, element, attributes) {
                $animate.leave(element.children().eq(1)).then(
                    function cleanupAfterAnimation() {
                        element.remove();
                        scope = element = attributes = null;
                    }
                );
            }
        }
    );

    try{
        angular.bootstrap(document, [app.name]);
    }
    catch(e){
        $('#appLoadingMessage').css('display', 'none');
        $('.app-loading-icon').css('display', 'none');
        $('#appLoadingError').css('display', 'block');
        
        $('#detailErrorMessage').text(e);
        $('#showError').on('click', function() {
            $('#detailErrorMessage').show();
        })
        console.error(e);
    }

