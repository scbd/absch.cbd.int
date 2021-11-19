import angular from 'angular-flex';
import app from 'app';
import 'bootstrap';
import 'ng-breadcrumbs';
import 'toastr';
import 'angular-animate';
import 'angular-loggly-logger';
import 'services/main'; 
import 'components/scbd-branding/main';
import 'components/scbd-angularjs-services/main';
import 'views/directives/route-loading-directive';
import '~/views/directives/docked-side-bar';
import './directives/cbd-footer';
import './directives/app-loading';

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

export const templateController = ['$rootScope', '$location', '$window', '$scope', 'locale', 'realm', 'localStorageService', 'LogglyLogger','ngMeta',
    function ($rootScope, $location, $window, $scope, locale, realm, localStorageService, logglyLogger, ngMeta) {

        var basePath = (angular.element('base').attr('href') || '').replace(/\/+$/g, '');
        $rootScope.pageTitle = { text: "" };
       
        function basePath() { 
            return (angular.element('base').attr('href') || '').replace(/\/+$/g, '');
        }
        
        function updateSize() {
            $rootScope.$applyAsync(function () {
                $rootScope.deviceSize = $('.device-size:visible').attr('size');
            });
        }

        function setupLocale(){
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
        }

        function setupTranslationValidation(){
            var validate = localStorageService.get('validateTranslation');
            if(validate)    
                $('body#top').addClass('validate-translation')
            else
                $('body#top').removeClass('validate-translation')
        }

        function init(){

            updateSize();
            setupTranslationValidation();
            setupLocale();            
            if (~$location.absUrl().toLowerCase().indexOf("://training")) {
                $scope.development_env = false;
                $scope.training_env = true;
                $scope.production_env = false;
                $scope.env_name = "TRAINING";
            }
                
        }

        $rootScope.$on('signOut', function () {
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
                if (pushNotification.data && pushNotification.data.realm == realm.value) {
                    localStorageService.remove('governmentFacets');
                    localStorageService.remove('searchFilters');
                }
            }
        });
        
        $rootScope.$on('event:open-left-side-bar', function(evt, type){
            
            $("#wrapper").addClass("toggled");
            $("scbd-footer").removeClass("toggled");
            if($scope.openSideBarType == type || type == undefined){
                $scope.openSideBarType = undefined;
            }
            else {
                $scope.openSideBarType = type;
                $("#wrapper").removeClass("toggled");
                $("scbd-footer").addClass("toggled");
            }
        });
        
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

        $scope.$on('signOut', function (evt, data) {
            $window.location.reload();
        });
        
        angular.element($window).on('resize', updateSize);

        init();
    }
]

export const bootstrapApp = ()=>{
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
}