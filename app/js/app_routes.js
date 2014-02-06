'use strict';

define(['app', 'authentication'], function (app) {

	var resolveUser = ['$rootScope', 'authentication', function($rootScope, authentication) {
		return authentication.getUser().then(function (user) { $rootScope.user = user; return user; });
	}];

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    
        $routeProvider.
            when('/',                     { templateUrl: '/app/views/index.html'                , resolve: { user: resolveUser }}).
            otherwise({redirectTo:'/help/404'});
    }]);
});