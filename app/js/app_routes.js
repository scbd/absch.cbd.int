'use strict';

define(['app', 'authentication', 'services', 'filters', 'storage', 'workflows'], function (app) {

	var resolveUser = ['$rootScope', 'authentication', function($rootScope, authentication) {
		return authentication.getUser().then(function (user) { $rootScope.user = user; return user; });
	}];

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    
        $routeProvider.
            when('/',                           { templateUrl: '/app/views/index.html'                      , resolve: { user: resolveUser }}).
            when('/find',                       { templateUrl: '/app/views/find.html'                       , resolve: { user: resolveUser }}).
            when('/register',                   { templateUrl: '/app/views/register.html'                   , resolve: { user: resolveUser }}).
            when('/countries',                   { templateUrl: '/app/views/countries.html'                   , resolve: { user: resolveUser }}).
            when('/database/records/:id',        { templateUrl: '/app/views/forms/view/records-id.html'     , resolve: { user: resolveUser }}).
            when('/oauth2/callback',            { templateUrl: '/app/views/oauth2/callback.html'            , resolve: { user: resolveUser }}).
            otherwise({redirectTo:'/help/404'});
    }]);
});