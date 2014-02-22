'use strict';

define(['app', 'authentication', 'services', 'filters', 'storage', 'workflows'], function (app) {

    app.value("realm", "ABS");
    app.value("schemaTypes", [ "absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database", "resource" ]);

	var resolveUser = ['$rootScope', 'authentication', function($rootScope, authentication) {
		return authentication.getUser().then(function (user) { $rootScope.user = user; return user; });
	}];

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    
        $routeProvider.
            when('/',                            { templateUrl: '/app/views/index.html'                     , resolve: { user: resolveUser }}).
            when('/about',                       { templateUrl: '/app/views/about.html'                     , resolve: { user: resolveUser }}).
            when('/database/record',             { templateUrl: '/app/views/forms/view/records-id.html'     , resolve: { user: resolveUser }}).
            when('/find',                        { templateUrl: '/app/views/find.html'                      , resolve: { user: resolveUser }}).
            when('/register',                    { templateUrl: '/app/views/register.html'                  , resolve: { user: resolveUser }}).
            when('/countries',                   { templateUrl: '/app/views/countries.html'                 , resolve: { user: resolveUser }}).
            when('/countries/:code',             { templateUrl: '/app/views/profiles.html'                  , resolve: { user: resolveUser }}).
            when('/database/record',             { templateUrl: '/app/views/forms/view/records-id.html'     , resolve: { user: resolveUser }}).
            when('/database/record/:documentID', { templateUrl: '/app/views/forms/view/records-id.html'     , resolve: { user: resolveUser }}).
            when('/register/tasks/:id',          { templateUrl: '/app/views/tasks/tasks-id.html'            , resolve: { user: resolveUser }}).
            when('/register/tasks/:id/:activity',{ templateUrl: '/app/views/tasks/tasks-id-activity.html'   , resolve: { user: resolveUser }}).
            when('/oauth2/callback',             { templateUrl: '/app/views/oauth2/callback.html'           , resolve: { user: resolveUser }}).
            otherwise({redirectTo:'/help/404'});
    }]);
});