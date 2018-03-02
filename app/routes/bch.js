define(['require', 'app', 'underscore', 'angular-route', 'services/app-config-service'], function (require, app, _) { 'use strict';

    var baseUrl = require.toUrl('').replace(/\?v=.*$/,''); // '/app/'

    app.config(['$routeProvider', '$locationProvider', 'realmProvider', function ($routeProvider, $locationProvider, realmProvider) {
        
        realmProvider.setFallbackRealm('BCH-DEV');

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        
        $routeProvider.whenAsync = whenAsync;

        $routeProvider.
               whenAsync('/',                                { templateUrl: 'views/home/bch.html',              controller: function() { return importQ('views/home/bch'); }, label:'The BCH'}).
               
               whenAsync('/signin',                          { templateUrl: 'views/shared/login-dialog.html',   controller: function() { return importQ('views/shared/login-dialog'); }, label:'Sign in'}).

               whenAsync('/register',                               { templateUrl: 'views/register/dashboard.html',    controller: function() { return importQ('views/register/dashboard'); }, label:'Management Center',  param:'true' }).
               whenAsync('/dashboard',                              { redirectTo:  '/register/dashboard'}).
               whenAsync('/register/dashboard',                     { templateUrl: 'views/register/dashboard.html',    controller: function() { return importQ('views/register/dashboard');   }, label:'Dashboard', resolve : { user : securize() }}).
               whenAsync('/register/:document_type/status/:status', { templateUrl: 'views/register/record-list.html',  controller: function() { return importQ('views/register/record-list'); }, label:'Status',    resolve : { user : securize(null,true) }}).

               whenAsync('/mailbox',                         { templateUrl: 'views/mailbox/inbox.html',         controller: function() { return importQ('views/mailbox/inbox'); }, label:'Mailbox', resolve : { user : securize() } }).
               whenAsync('/mailbox/:mailId',                 { templateUrl: 'views/mailbox/inbox.html',         controller: function() { return importQ('views/mailbox/inbox'); }, label:'Mailbox', resolve : { user : securize() } }).

               // BCH4 PAGES
               whenAsync('/about/countryprofile.shtml',      { redirectTo:  '/countries/:country' }).
               whenAsync('/countries/:country',              { templateUrl: 'views/shared/cms-content.html', target:'https://bch.cbd.int/about/countryprofile.shtml?country=:country', controller: function() { return importQ('views/shared/cms-content'); } }).
               whenAsync('/about/:subpath*?',                { templateUrl: 'views/shared/cms-content.html', target:'https://bch.cbd.int/about/:subpath',                              controller: function() { return importQ('views/shared/cms-content'); } }).
               whenAsync('/protocol/:subpath*?',             { templateUrl: 'views/shared/cms-content.html', target:'https://bch.cbd.int/protocol/:subpath',                           controller: function() { return importQ('views/shared/cms-content'); } }).
               whenAsync('/onlineconferences/:subpath*?',    { templateUrl: 'views/shared/cms-content.html', target:'https://bch.cbd.int/onlineconferences/:subpath',                  controller: function() { return importQ('views/shared/cms-content'); } }).

               whenAsync('/help/forbidden',   { templateUrl: 'views/shared/403.html', label:'Forbidden'}).
               whenAsync('/help/not-found',   { templateUrl: 'views/shared/404.html', label:'Not found'}).

               otherwise({ templateUrl: baseUrl+'views/shared/404.html', label:'Page not found'});
    }]);

    //============================================================
    //
    //
    //============================================================
    function whenAsync(path, route) {

        route = route || {};

        if(route.templateUrl && !/^\//.test(route.templateUrl)) {
            route.templateUrl = baseUrl+route.templateUrl;
        }

        if(route.controller && angular.isFunction(route.controller)) { // Webpack
        
            var controllerFn = route.controller;
        
            route.resolve = route.resolve || {};
        
            route.resolve.lazyController = ['$injector', function($injector) {
                
                var result =  $injector.invoke(controllerFn, {});
                
                if(result.$inject) {
                    result = $injector.invoke(result, {});
                }
                
                return result;
            }];
        }

        if(route.resolve && route.resolve.lazyController) {

            route.controller = ['$injector', '$scope', '$route', 'lazyController', function ($injector, $scope, $route, lazyController) {

                if(!lazyController) return;

                var locals = angular.extend({}, $route.current.locals, { $scope: $scope });

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
    function importQ(module) { // fake webpack lazyload import()
        
        var importFn = function($q) {
            return $q(function(resolve, reject) {
                require([module], resolve, function(e) { 
                    console.error(e);
                    reject(e);
                });
            });
        };
        
        importFn.$inject = ['$q'];

        return importFn;
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
