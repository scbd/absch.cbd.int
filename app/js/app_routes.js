'use strict';

define(['app', 'extended-route-provider','authentication', 'services', 'filters', 'storage', 'workflows'], function (app) {

     app.value("realm", {value:"ABS"});
    app.value("schemaTypes", [ "absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database", "resource" ]);

	// var resolveUser = ['$rootScope', 'authentication', function($rootScope, authentication) {
	// 	return authentication.getUser().then(function (user) { $rootScope.user = user; return user; });
	// }];

    app.config(['extendedRouteProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
          $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        $routeProvider.
            when('/',                            { templateUrl: '/app/views/index.html'                     ,resolveController: true, resolveUser: true}).
            when('/commonformat',                { templateUrl: '/app/views/common-formats.html'            ,resolveController: true, resolveUser: true}).
            when('/about',                       { templateUrl: '/app/views/about.html'                     ,resolveController: true, resolveUser: true}).
            when('/help',                        { templateUrl: '/app/views/help.html'                      ,resolveController: true, resolveUser: true}).
            when('/help/presentations/theatre-access',         { templateUrl: '/app/views/help/presentations/theatre-access.html'                      ,resolveController: true, resolveUser: true}).
            when('/help/accounts',              { templateUrl: '/app/views/help/accounts/accounts.html'                      ,resolveController: true, resolveUser: true}).
            when('/help/accounts/:question',              { templateUrl: '/app/views/help/accounts/accounts.html'                      ,resolveController: true, resolveUser: true}).

            when('/help/search',              { templateUrl: '/app/views/help/search/search.html'                      ,resolveController: true, resolveUser: true}).
            when('/help/search/:question',              { templateUrl: '/app/views/help/search/search.html'                      ,resolveController: true, resolveUser: true}).


            when('/help/register',              { templateUrl: '/app/views/help/register/register.html'                      ,resolveController: true, resolveUser: true}).
            when('/help/register/:question',              { templateUrl: '/app/views/help/register/register.html'                      ,resolveController: true, resolveUser: true}).


            when('/find',                        { templateUrl: '/app/views/find.html'                      ,resolveController: true, resolveUser: true}).
            when('/countries',                   { templateUrl: '/app/views/countries.html'                 ,resolveController: true, resolveUser: true}).
            //when('/countries/map',               { templateUrl: '/app/views/countries/countryMap.html'        ,resolveController: true, resolveUser: true}).
            when('/countries/:code',             { templateUrl: '/app/views/profiles.html'                  ,resolveController: true, resolveUser: true}).
            when('/database/record',             { templateUrl: '/app/views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
            when('/database/record/:documentID',  { templateUrl: '/app/views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
            when('/database/record/:documentID/:revision', { templateUrl: '/app/views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
            when('/register',                    { templateUrl: '/app/views/register.html'                  ,resolveController: true, resolveUser: true}).
            when('/register/tasks/:id',          { templateUrl: '/app/views/tasks/tasks-id.html'            ,resolveController: true, resolveUser: true}).
            when('/register/tasks/:id/:activity',{ templateUrl: '/app/views/tasks/tasks-id-activity.html'   ,resolveController: true, resolveUser: true}).
            when('/oauth2/callback',             { templateUrl: '/app/views/oauth2/callback.html'           ,resolveController: true, resolveUser: true}).
            when('/workshops/lac',               { templateUrl: '/app/views/workshops/lac.html'             ,resolveController: true, resolveUser: true}).
            when('/workshops/caribbean',         { templateUrl: '/app/views/workshops/caribbean.html'       ,resolveController: true, resolveUser: true}).
            //when('/searchforum.shtml',           { templateUrl:'/app/views/about.html#iac'}).

            when('/certificate/:documentNumber',{ templateUrl: '/app/views/forms/view/records-id.html'       ,resolveController: true, resolveUser: true}).

            //TODO: rename document_type to something more generic... or make this feature more flexible
            when('/about/:document_type', {
              templateUrl: '/app/views/about.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/about/-',
              ignoreSubController: true,
            }).
            when('/about', { redirectTo: '/about/absch' }).

            when('/dashboard', {
              templateUrl: '/app/views/register.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/dashboard.html',
            }).
             when('/dashboard/completed', {
              templateUrl: '/app/views/register.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/tasks/my-completed-tasks.directive.html',
            }).
             when('/dashboard/pending', {
              templateUrl: '/app/views/register.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/tasks/my-tasks.directive.html',
            }).
             when('/dashboard/mytasks', {
              templateUrl: '/app/views/register.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/tasks/my-pending-tasks.directive.html',
            }).
            when('/register/:document_type', {
              templateUrl: '/app/views/register.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/type_document_list.html',
            }).
            when('/contacts', {
              templateUrl: '/app/views/register.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/contacts.html',
            }).

            when('/register/:document_type/new', {
              templateUrl: '/app/views/register.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/forms/edit/edit--', //filled in through controller
            }).

             when('/register/:document_type/:identifier/edit', {
              templateUrl: '/app/views/register.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/forms/edit/edit--', //filled in through controller
            }).

             when('/forum', {
              templateUrl: '/app/views/forum.html',
              resolveController: true,
              resolveUser: true,
            }).

            when('/searchforum.shtml',           { redirectTo:'/about/iac' }).

            otherwise({redirectTo:'/help/404'});
    }]);
});
