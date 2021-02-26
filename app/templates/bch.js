define(['app', 'angular', 'text!./bch-footer.html', './bch-header',
        'bootstrap', 'routes/bch', 'ng-breadcrumbs','toastr','angular-animate', 
        'components/scbd-branding/directives/header/header',
        'components/scbd-branding/directives/footer','angular-loggly-logger',
        'components/scbd-angularjs-services/services/locale', 'views/directives/route-loading-directive',
        'services/local-storage-service', 'services/app-config-service'], 
function (app, angular, footerHtml) { ;

    app.directive('bchFooter', [function () { return { restrict: 'E', template: footerHtml }; }]);

    app.controller('BchTemplateController', ['$rootScope', '$location', '$window', '$scope', 'locale', 'realm', 'localStorageService', 'LogglyLogger','ngMeta',
        function ($rootScope, $location, $window, $scope, locale, realm, localStorageService, logglyLogger, ngMeta) {

            $rootScope.pageTitle = { text: "" };

            $rootScope.$on('signOut', function () {
                $window.location.reload();
            });

            //============================================================
            //
            //
            //============================================================
            function basePath() { 
                return (angular.element('base').attr('href') || '').replace(/\/+$/g, '');
            }

            //============================================================
            //
            //
            //============================================================
            function updateSize() {
                $rootScope.$applyAsync(function () {
                    $rootScope.deviceSize = $('.device-size:visible').attr('size');
                });
            }

            updateSize();
            
            angular.element($window).on('resize', updateSize);

            //set default moment lang
            var lang = locale;
            if (lang == 'zh')
                lang = 'zh-cn'; //moment has two ZH, use ZH-CN
            moment.locale(lang);
            if (lang != 'en')
                require(['css!/app/css/translation.css'], function(){});
            if (lang == 'ar') {
                require(['css!https://cdn.cbd.int/bootstrap-rtl@3.3.4/dist/css/bootstrap-flipped.min.css',
                'css!https://cdn.cbd.int/bootstrap-rtl@3.3.4/dist/css/bootstrap-rtl.min.css',
                ], function(){});
            }

            var basePath = (angular.element('base').attr('href') || '').replace(/\/+$/g, '');
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

            $scope.$on('signOut', function (evt, data) {
                $window.location.reload();
            });
            $rootScope.$on('event:server-pushNotification', function (evt, pushNotification) {
                if (pushNotification.type == 'documentNotification') {
                    if (pushNotification.data && pushNotification.data.realm == realm.value) {
                        localStorageService.remove('governmentFacets');
                        localStorageService.remove('searchFilters');
                    }
                }
            });
            
            //============================================================
            //
            //
            //============================================================
            $rootScope.$watch('user', _.debounce(function (user) {

                if (!user)
                    return;

                require(["https://www.cbd.int/app/js/slaask.js"], function (_slaask) {

                    if (user.isAuthenticated) {
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

                    if (!_slaask.initialized) {
                        _slaask.init('8b989bd6ee0cf49384761d4f86ddd945');
                    }
                });

                var fields = logglyLogger.fields()
                fields.user = user.userID;
                logglyLogger.fields(fields);

            }, 1000));


            function setupTranslationValidation(){
                var validate = localStorageService.get('validateTranslation');
                if(validate)    
                    $('body#top').addClass('validate-translation')
                else
                    $('body#top').removeClass('validate-translation')
            }
            setupTranslationValidation();
        }
    ]);
    app.directive("mAppLoading", function ($animate) {
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
});
