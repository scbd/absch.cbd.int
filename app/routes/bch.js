define(['require', 'app', 'underscore', 'angular-route', 'services/app-config-service'], function (require, app, _) { 'use strict';

    var baseUrl = require.toUrl('').replace(/\?v=.*$/,''); // '/app/'

    app.provider("realm", {
        $get : ['appConfigService', function(appConfigService) {
            return { value : appConfigService.currentRealm || 'BCH' };
        }]
    });
    
    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        
        $routeProvider.whenAsync = whenAsync;

        $routeProvider.
               whenAsync('/',                                { templateUrl: 'views/home/bch.html',              controller: true, label:'The BCH'}).
               
               whenAsync('/signin',                          { templateUrl: 'views/shared/login-dialog.html',   controller: true, label:'Sign in'}).

               whenAsync('/register',                        { templateUrl: 'views/register/dashboard.html',    controller: true, label:'Management Center',  param:'true' }).
               whenAsync('/dashboard',                       { redirectTo:  '/register/dashboard'}).
               whenAsync('/register/dashboard',              { templateUrl: 'views/register/dashboard.html',    controller: true, label:'Dashboard',  param:'true', resolve : { user : securize() }}).

               whenAsync('/mailbox',                         { templateUrl: 'views/mailbox/inbox.html',         controller: true, label:'Mailbox', resolve : { user : securize() } }).
               whenAsync('/mailbox/:mailId',                 { templateUrl: 'views/mailbox/inbox.html',         controller: true, label:'Mailbox', resolve : { user : securize() } }).

               // BCH4 PAGES
               whenAsync('/about/countryprofile.shtml',      { redirectTo:'/countries/:country' }).
               whenAsync('/countries/:country',              { templateUrl: 'views/shared/cms-content.html', target:'http://bilodeaux7.local/about/countryprofile.shtml?country={country}', controller: true }).
               whenAsync('/about/:subpath*?',                { templateUrl: 'views/shared/cms-content.html', target:'http://bilodeaux7.local/about/{subpath}',                              controller: true }).
               whenAsync('/protocol/:subpath*?',             { templateUrl: 'views/shared/cms-content.html', target:'http://bilodeaux7.local/protocol/{subpath}',                           controller: true }).
               whenAsync('/onlineconferences/:subpath*?',    { templateUrl: 'views/shared/cms-content.html', target:'http://bilodeaux7.local/onlineconferences/{subpath}',                  controller: true }).

               whenAsync('/help/forbidden',   { templateUrl: 'views/shared/403.html', label:'Forbidden'}).
               whenAsync('/help/not-found',   { templateUrl: 'views/shared/404.html', label:'Not found'}).
               
               
               otherwise({ templateUrl: 'views/shared/404.html', label:'Page not found'});
    }]);
    
    //============================================================
    //
    //
    //============================================================
    function whenAsync(path, route) {

        route = route || {};

        var templateUrl = route.templateUrl;

        if(route.templateUrl && !/^\//.test(route.templateUrl)) {
            route.templateUrl = baseUrl+route.templateUrl;
        }

        if(route.controller===true || route.resolveController) { // requirejs 

            route.resolve = route.resolve || {};

            route.resolve.lazyController = ['$q', function($q){
                
                var controllerModule = templateUrl.replace(/\.html$/, '');
                
                return $q(function(resolve, reject) {
                    require([controllerModule], resolve, reject);
                });
            }];
        }
        else if(route.controller && angular.isFunction(route.controller)) { // Webpack
        
            var controllerFn = route.controller;
        
            route.resolve = route.resolve || {};
        
            route.resolve.lazyController = ['$injector', function($injector) {
                return $injector.invoke(controllerFn, {});
            }];
        }

        if(route.resolve && route.resolve.lazyController) {

            route.controller = ['$injector', '$scope', '$route', 'lazyController', function ($injector, $scope, $route, lazyController) {

                if(!lazyController) return;

                var locals = angular.extend($route.current.locals, { $scope: $scope });

                return $injector.instantiate(lazyController, locals);
            }];
        }

        this.when(path, route);

        return this;
    }
    
    //============================================================
    //
    //
    //============================================================
    function currentUser() {
        return ['$q', 'authentication', function($q, authentication) {
            return $q.when(authentication.getUser());
        }];
    }

    //============================================================
    //
    //
    //============================================================
    function securize(roleList)
    {
        return ['$q', '$injector', '$location', function ($q, $injector, $location) {
            
            var currentUrl = $location.url();

            return $q.when($injector.invoke(currentUser())).then(function (user) {
                
                if (!user.isAuthenticated) {

                    console.log("securize: force sign in");

                    if (!$location.search().returnUrl)
                        $location.search({ returnUrl: $location.url() });

                    
                    $location.url("/signin");
                    $location.search({ returnUrl: currentUrl });
                    
                    throw "Force sign-in";
                }
                
                var roles = _.clone(roleList||[]);

                if (roles && !_.isEmpty(roles) && _.isEmpty(_.intersection(roles, user.roles))){

                    console.log("securize: not authorized");
                    
                    $location.url('/help/forbidden');
                    $location.search({ path: currentUrl });
                    
                    throw "Forbidden";
                }

                return user;
            });
        }];
    }    
    
});
