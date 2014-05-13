'use strict';

define(['app', 'extended-route-provider','authentication', 'services', 'filters', 'storage', 'workflows'], function (app) {

    app.value("realm", "ABS");
    app.value("schemaTypes", [ "absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database", "resource" ]);

	// var resolveUser = ['$rootScope', 'authentication', function($rootScope, authentication) {
	// 	return authentication.getUser().then(function (user) { $rootScope.user = user; return user; });
	// }];

    app.config(['extendedRouteProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
          $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    
        $routeProvider.
            when('/',                            { templateUrl: '/app/views/index.html'                     ,resolveController: true, resolveUser: true}).
            when('/about',                       { templateUrl: '/app/views/about.html'                     ,resolveController: true, resolveUser: true}).
            when('/database/record',             { templateUrl: '/app/views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
            when('/find',                        { templateUrl: '/app/views/find.html'                      ,resolveController: true, resolveUser: true}).
            when('/register',                    { templateUrl: '/app/views/register.html'                  ,resolveController: true, resolveUser: true}).
            when('/countries',                   { templateUrl: '/app/views/countries.html'                 ,resolveController: true, resolveUser: true}).
            when('/countries/:code',             { templateUrl: '/app/views/profiles.html'                  ,resolveController: true, resolveUser: true}).
            //when('/database/record',             { templateUrl: '/app/views/forms/view/records-id.html'     , resolve: { user: resolveUser }}).
            when('/database/record/:documentID', { templateUrl: '/app/views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
            when('/register/tasks/:id',          { templateUrl: '/app/views/tasks/tasks-id.html'            ,resolveController: true, resolveUser: true}).
            when('/register/tasks/:id/:activity',{ templateUrl: '/app/views/tasks/tasks-id-activity.html'   ,resolveController: true, resolveUser: true}).
            when('/oauth2/callback',             { templateUrl: '/app/views/oauth2/callback.html'           ,resolveController: true, resolveUser: true}).
            when('/workshops/lac',               { templateUrl: '/app/views/workshops/lac.html'             ,resolveController: true, resolveUser: true}).
            
            otherwise({redirectTo:'/help/404'});
    }]);
});