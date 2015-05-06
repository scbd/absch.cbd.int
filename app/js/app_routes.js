'use strict';

define(['app', 'extended-route-provider','authentication', 'services', 'filters', 'storage', 'workflows', 'realm-configuration', 'user-notifications'], function (app) {

     app.value("realm", {value:"ABS"});
    app.value("schemaTypes", [ "absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database", "resource" ]);

    app.config(['extendedRouteProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
          $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        $routeProvider.
            when('/',                            { templateUrl: '/app/views/home/index.html',                       label:'ABSCH',                              resolveController: true, resolveUser: true}).
            when('/commonformat',                { templateUrl: '/app/views/common-formats.html',                   label:'Common Formats',                     resolveController: true, resolveUser: true}).
            when('/help',                        { templateUrl: '/app/views/help/help.html',                        label:'Help',                               resolveController: true, resolveUser: true}).
            when('/help/about',                  { templateUrl: '/app/views/help/about/about.html',                 label:'About the ABSCH',                    resolveController: true, resolveUser: true}).
            when('/help/presentations/',         { templateUrl: '/app/views/help/presentations/home.html',          label:'Presentations',                      resolveController: true, resolveUser: true}).
            when('/help/accounts',               { templateUrl: '/app/views/help/accounts/accounts.html',           label:'CBD Accounts',                       resolveController: true, resolveUser: true}).
            when('/help/search',                 { templateUrl: '/app/views/help/search/search.html',               label:'Finding Information',                resolveController: true, resolveUser: true}).
            when('/help/tours',                  { templateUrl: '/app/views/help/tours/tours.html',                 label:'Tours',                              resolveController: true, resolveUser: true}).
            when('/help/register',               { templateUrl: '/app/views/help/register/register.html',           label:'Submitting Information',             resolveController: true, resolveUser: true}).

            when('/forums',                        { templateUrl: '/app/views/forums/forum-list-view.html',         label:'Forums',       resolveController: true, resolveUser: true }).
            when('/forums/iac',              { templateUrl: '/app/views/forums/thread-list-view.html'   ,resolveController: true, resolveUser: true, forumId:17415, postUrl:'/forums/iac', text:'IAC' }).
            when('/forums/iac/:threadId',    { templateUrl: '/app/views/forums/post-list-view.html'     ,resolveController: true, resolveUser: true, forumId:17415, forumListUrl:'/forums/iac/', text:'IAC'}).
            when('/forums/vlr',                    { templateUrl: '/app/views/forums/thread-list-view.html'   ,resolveController: true, resolveUser: true, forumId:17384, postUrl:'/forums/vlr', text:'VLR' }).
            when('/forums/vlr/:threadId',          { templateUrl: '/app/views/forums/post-list-view.html'     ,resolveController: true, resolveUser: true, forumId:17384, forumListUrl:'/forums/vlr/', text:'VLR'}).
            when('/forums/caribbean',              { templateUrl: '/app/views/forums/thread-list-view.html'   ,resolveController: true, resolveUser: true, forumId:17378, postUrl:'/forums/caribbean', text:'Caribbean Region Forum' }).
            when('/forums/caribbean/:threadId',    { templateUrl: '/app/views/forums/post-list-view.html'     ,resolveController: true, resolveUser: true, forumId:17378, forumListUrl:'/forums/caribbean/', text:'Caribbean Region Forum'}).
            //when('/forums/caribbean region',              { templateUrl: '/app/views/forums/thread-list-view.html'   ,resolveController: true, resolveUser: true, forumId:17378, postUrl:'/forums/caribbean region' }).
            //when('/forums/caribbean region/:threadId',    { templateUrl: '/app/views/forums/post-list-view.html'     ,resolveController: true, resolveUser: true, forumId:17378, forumListUrl:'/forums/caribbean region/'}).
            when('/forums/art10_groups',              { templateUrl: '/app/views/forums/thread-list-view.html'   ,resolveController: true, resolveUser: true, forumId:17316, postUrl:'/forums/art10_groups', text:'Forum on Article 10' }).
            when('/forums/art10_groups/:threadId',    { templateUrl: '/app/views/forums/post-list-view.html'     ,resolveController: true, resolveUser: true, forumId:17316, forumListUrl:'/forums/art10_groups/', text:'Forum on Article 10' }).


            when('/search',                                 { templateUrl: '/app/views/search/find.html',   label:'Search',         resolveController: true, resolveUser: true}).
            when('/search/:documentSchema',                 { templateUrl: '/app/views/search/find.html',   label:'Search',         resolveController: true, resolveUser: true}).
            when('/search/:documentSchema/:countryCode',    { templateUrl: '/app/views/search/find.html',   label:'Search',         resolveController: true, resolveUser: true}).
            when('/find/simple',                            { templateUrl: '/app/views/find/simple.html',   label:'Simple Search',  resolveController: true, resolveUser: true}).
            when('/find',                                   { redirectTo:'/search'}).

            when('/countries',                   { templateUrl: '/app/views/countries/profiles.html',       label:'Country Information',      resolveController: true, resolveUser: true}).
            when('/countries/:code',             { templateUrl: '/app/views/countries/profiles.html',       label:'Country Profile', param:'true',      resolveController: true, resolveUser: true}).

            // when('/database/record',             { templateUrl: '/app/views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
            // when('/database/record/:documentID',  { templateUrl: '/app/views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
            // when('/database/record/:documentID/:revision', { templateUrl: '/app/views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).


            when('/database/:documentID',                           { templateUrl: '/app/views/forms/view/records-id.html'    ,resolveController: true, resolveUser: true}).
            when('/database/:documentSchema/:documentID',           { templateUrl: '/app/views/forms/view/records-id.html'    ,resolveController: true, resolveUser: true}).
            when('/database/:documentSchema/:documentID/:revision', { templateUrl: '/app/views/forms/view/records-id.html'    ,resolveController: true, resolveUser: true}).

            when('/register',                    { templateUrl: '/app/views/register.html'                  ,resolveController: true, resolveUser: true}).
            when('/register/tasks/:id',          { templateUrl: '/app/views/tasks/tasks-id.html'            ,resolveController: true, resolveUser: true}).
            when('/register/tasks/:id/:activity',{ templateUrl: '/app/views/tasks/tasks-id-activity.html'   ,resolveController: true, resolveUser: true}).
            when('/oauth2/callback',             { templateUrl: '/app/views/oauth2/callback.html'           ,resolveController: true, resolveUser: true}).
            when('/workshops/lac',               { templateUrl: '/app/views/workshops/lac.html'             ,resolveController: true, resolveUser: true}).
            when('/workshops/caribbean',         { templateUrl: '/app/views/workshops/caribbean.html'       ,resolveController: true, resolveUser: true}).
            //when('/searchforum.shtml',           { templateUrl:'/app/views/about.html#iac'}).

            when('/certificate/:documentNumber',{ templateUrl: '/app/views/forms/view/records-id.html'       ,resolveController: true, resolveUser: true}).

            //TODO: rename document_type to something more generic... or make this feature more flexible
                when('/commonformat', {
              templateUrl: '/app/views/about/about.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/about/common-formats.html',
              ignoreSubController: true,
            }).
            when('/about', { redirectTo: '/about/absch' }).

            when('/help/presentations/:folder/:document_type', {
              templateUrl: '/app/views/help/presentations/presentation.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/help/presentations/:folder/-',
              ignoreSubController: true,
            }).
            when('/help/presentations/:folder', { redirectTo: '/help/presentations/:folder/start' }).





            when('/dashboard', {
              templateUrl: '/app/views/register/register.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/register/dashboard.html',
            }).

            when('/register/dashboard', {
                templateUrl: '/app/views/register/register.html',
                resolveController: true,
                resolveUser: true,
                subTemplateUrl: '/app/views/register/dashboard.html',
            }).

            when('/register', {
              templateUrl: '/app/views/register/register.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/register/dashboard.html',
            }).
            // when('/dashboard/:tour', {
            //   templateUrl: '/app/views/register.html',
            //   resolveController: true,
            //   resolveUser: true,
            //   subTemplateUrl: '/app/views/dashboard.html',
            // }).

            //  when('/dashboard/completed', {
            //   templateUrl: '/app/views/register/register.html',
            //   resolveController: true,
            //   resolveUser: true,
            //   subTemplateUrl: '/app/views/tasks/my-completed-tasks.directive.html',
            // }).
            //  when('/dashboard/pending', {
            //   templateUrl: '/app/views/register/register.html',
            //   resolveController: true,
            //   resolveUser: true,
            //   subTemplateUrl: '/app/views/tasks/my-tasks.directive.html',
            //   type : 'my'
            // }).
            // when('/dashboard/mytasks', {
            //     templateUrl: '/app/views/register/register.html',
            //     resolveController: true,
            //     resolveUser: true,
            //     subTemplateUrl: '/app/views/tasks/my-pending-tasks.directive.html',
            // }).
            //


            when('/register/requests', {
                templateUrl: '/app/views/register/register.html',
                resolveController: true,
                resolveUser: true,
                subTemplateUrl: '/app/views/tasks/my-tasks.directive.html',
                type : 'all'
            }).
            when('/register/requests/:workflowId', {
                templateUrl: '/app/views/register/register.html',
                resolveController: true,
                resolveUser: true,
                subTemplateUrl: '/app/views/tasks/my-tasks.directive.html',
                type : 'all'
            }).
            when('/register/requests/:type/:status', {
                templateUrl: '/app/views/register/register.html',
                resolveController: true,
                resolveUser: true,
                subTemplateUrl: '/app/views/tasks/my-tasks.directive.html',
            }).







            when('/contacts', {
              templateUrl: '/app/views/register/register.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/register/contacts.html',
            }).

            when('/register/:document_type', {
              templateUrl: '/app/views/register/register.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/register/type_document_list.html',
            }).

            when('/register/:document_type/new', {
              templateUrl: '/app/views/register/register.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/forms/edit/edit--', //filled in through controller
            }).

            when('/register/:document_type/help', {
              templateUrl: '/app/views/register/register.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/register/type_document_list.html',
            }).

             when('/register/:document_type/:identifier/edit', {
              templateUrl: '/app/views/register/register.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/forms/edit/edit--', //filled in through controller
            }).

             when('/register/:document_type/:identifier/edit/:tour', {
              templateUrl: '/app/views/register/register.html',
              resolveController: true,
              resolveUser: true,
              subTemplateUrl: '/app/views/forms/edit/edit--', //filled in through controller
            }).

            when('/searchforum.shtml',           { redirectTo:'/about/portal10' }).

            when('/commonformat',           { redirectTo:'/about/common-formats' }).

            otherwise({redirectTo:'/help/404'});
    }]);
});
