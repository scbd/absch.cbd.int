'use strict';
define(['app', 'underscore', 'extended-route-provider','scbd-angularjs-services', 'services', 'filters',
 '/app/services/app-config-service.js'], function (app, _) {

    app.value("realm", {value:"ABS"});
    app.value("showHelp", { value : false });

    app.provider("realm", {

        $get : ["$location", 'appConfigService', function($location, appConfigService) {

            if(appConfigService.currentRealm){
                return { value : appConfigService.currentRealm };
            }
            return 'ABS';
        }]
    });


    app.config(['extendedRouteProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        $routeProvider.

                when('/',                            { templateUrl: '/app/views/home/index.html',                       label:'ABSCH',                              resolveController: true, resolveUser : true}).
                when('/signin',      {templateUrl: '/app/views/shared/login.html',resolveController: true, label:'Sign in'}).
                when('/help/403',   {templateUrl: '/app/views/shared/403.html', label:'403 Error'}).

                when('/about',                        { templateUrl: '/app/views/about/about.html',                        label:'About the ABSCH',                 resolveController:true, resolveUser : true}).
                when('/about/blog',                        { templateUrl: '/app/views/about/blog.html',                        label:'ABSCH Development Blog',                 resolveController:true, resolveUser : true}).
                when('/partners/idlo/events',              { templateUrl: '/app/views/partners/idlo.html',           label:'IDLO',             resolveController: false, resolveUser: false}).


                when('/forums',                        { templateUrl: '/app/views/forums/forum-list-view.html',         label:'Forums',       resolveController: true, resolve : { securized : securize() } }).
                when('/forums/iac-trg',          { redirectTo:'/forums/iac', resolve : { securized : securize() }}).
                when('/forums/iac',              { templateUrl: '/app/views/forums/thread-list-view.html'   ,label:'IAC', resolveController: true, resolve : { securized : securize() }, forumId:17433, postUrl:'/forums/iac', text:'IAC' }).
                when('/forums/iac/:threadId',    { templateUrl: '/app/views/forums/post-list-view.html'     ,label:'Thread-Subject', resolveController: true, resolve : { securized : securize() }, forumId:17433, forumListUrl:'/forums/iac/', text:'IAC'}).
                when('/forums/joint-iac',              { templateUrl: '/app/views/forums/thread-list-view.html'   ,label:'Joint IAC', resolveController: true, resolve : { securized : securize() }, forumId:17446, postUrl:'/forums/joint-iac', text:'Joint IAC' }).
                when('/forums/joint-iac/:threadId',    { templateUrl: '/app/views/forums/post-list-view.html'     ,label:'Thread-Subject', resolveController: true, resolve : { securized : securize() }, forumId:17446, forumListUrl:'/forums/joint-iac/', text:'Joint IAC'}).
                when('/forums/vlr',                    { templateUrl: '/app/views/forums/thread-list-view.html'  ,label:'VLR'  ,resolveController: true, resolve : { securized : securize() }, forumId:17384, postUrl:'/forums/vlr', text:'VLR' }).
                when('/forums/vlr/:threadId',          { templateUrl: '/app/views/forums/post-list-view.html'    ,label:'Thread-Subject'  ,resolveController: true, resolve : { securized : securize() }, forumId:17384, forumListUrl:'/forums/vlr/', text:'VLR'}).
                when('/forums/caribbean',              { templateUrl: '/app/views/forums/thread-list-view.html'  ,label:'Caribbean'  ,resolveController: true, resolve : { securized : securize() }, forumId:17378, postUrl:'/forums/caribbean', text:'Caribbean Region Forum' }).
                when('/forums/caribbean/:threadId',    { templateUrl: '/app/views/forums/post-list-view.html'    ,label:'Thread-Subject'  ,resolveController: true, resolve : { securized : securize() }, forumId:17378, forumListUrl:'/forums/caribbean/', text:'Caribbean Region Forum'}).
                when('/forums/art10_groups',              { templateUrl: '/app/views/forums/thread-list-view.html' ,label:'Art 10 Groups'  ,resolveController: true, resolve : { securized : securize() }, forumId:17316, postUrl:'/forums/art10_groups', text:'Forum on Article 10' }).
                when('/forums/art10_groups/:threadId',    { templateUrl: '/app/views/forums/post-list-view.html'   ,label:'Thread-Subject'  ,resolveController: true, resolve : { securized : securize() }, forumId:17316, forumListUrl:'/forums/art10_groups/', text:'Forum on Article 10' }).

                when('/mailbox',                        { templateUrl: '/app/views/mailbox/inbox.html',         label:'Mailbox',       resolveController: true, resolve : { securized : securize() } }).
                when('/mailbox/:mailId',                { templateUrl: '/app/views/mailbox/inbox.html',         label:'Mailbox',       resolveController: true, resolve : { securized : securize() } }).

                when('/search/:recordType',                     { templateUrl: '/app/views/search/search-page.html',   label:'SEARCH',         resolveController: true}).
                when('/search',                                 { templateUrl: '/app/views/search/search-page.html',   label:'SEARCH',         resolveController: true}).
                when('/search/national-records/:documentSchema?',              { redirectTo:'/search' }).
                when('/search/countries/:countryCode?',                        { redirectTo:'/countries/:countryCode' }).
                when('/search/countries/:countryCode/:documentType',           { redirectTo:'/countries/:countryCode' }).
                when('/search/reference-records/:documentSchema?',             { redirectTo:'/search' }).

                when('/countries',                   { templateUrl: '/app/views/countries/index.html',       label:'Country Profiles',      resolveController: true, resolveUser: true}).
                when('/countries/status/:status',    { templateUrl: '/app/views/countries/index.html',       label:'Country Profiles',      resolveController: true, resolveUser: true}).
                when('/countries/:code',             { templateUrl: '/app/views/countries/country-profile.html',       label:'Country Profile', param:'true',      resolveController: true, resolveUser: true}).

                when('/database/record',             { templateUrl: '/app/views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
                when('/database/record/:documentID',  { templateUrl: '/app/views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
                when('/database/record/:documentID/:revision', { templateUrl: '/app/views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
                when('/database/:documentID',                           { templateUrl: '/app/views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
                when('/database/:documentSchema/:documentID',           { templateUrl: '/app/views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
                when('/database/:documentSchema/:documentID/:revision', { templateUrl: '/app/views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).

                when('/register/tasks/:id',                                 {templateUrl: '/app/views/tasks/tasks-id.html',             label:'Management Center',  param:'true', resolveController: true, resolve : { securized : securize() }}).
                when('/register/tasks/:id/:activity',                       {templateUrl: '/app/views/tasks/tasks-id-activity.html',    label:'Management Center',  param:'true', resolveController: true, resolve : { securized : securize() }}).
                when('/register/dashboard',                                 {templateUrl: '/app/views/register/dashboard.html',         label:'Management Center',  param:'true', resolveController: true, resolve : { securized : securize() }}).
                when('/dashboard',                                          {redirectTo:  '/register/dashboard'}).
                when('/register/admin',                                     {templateUrl: '/app/views/register/admin.html',          label:'Management Center',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).

                when('/register',                                           {templateUrl: '/app/views/register/register.html',          label:'Management Center',  param:'true', resolveController: true,resolve : { securized : securize() },subTemplateUrl: '/app/views/register/dashboard.html',}).
                when('/register/notifications',                             {templateUrl: '/app/views/register/register.html',          label:'Notifications',  param:'true', resolveController: true,resolve : { securized : securize() }, subTemplateUrl: '/app/views/register/notifications.html',}).
                when('/register/requests',      { redirectTo:'/register/notifications' }).
                when('/register/:document_type/status/:status',             {templateUrl: '/app/views/register/register.html',          label:'document_type',  param:'true', resolveController: true,resolve : { securized : securize(null,true) },subTemplateUrl: '/app/views/register/type_document_list.html',}).

                when('/register/requests/:workflowId',                      {templateUrl: '/app/views/register/register.html',          label:'Requests',  param:'true', resolveController: true,resolve : { securized : securize(null,true) }, subTemplateUrl: '/app/views/tasks/my-tasks.directive.html',type : 'all'}).
                when('/register/requests/:type/:status',                    {templateUrl: '/app/views/register/register.html',          label:'Requests',  param:'true', resolveController: true,resolve : { securized : securize(null,true) }, subTemplateUrl: '/app/views/tasks/my-tasks.directive.html',}).
                when('/register/national-users',                            {templateUrl: '/app/views/register/register.html',          label:'Manage user roles',  param:'true', resolveController: true,resolve : { securized : securize(null,true) },subTemplateUrl: '/app/views/register/national-users/index.html'}).
                
                when('/register/:document_type',                            {templateUrl: '/app/views/register/record-list.html',       label:'document_type',  param:'true', resolveController: true,resolve : { securized : securize(null,true) }}).
                // when('/register/CON/:identifier/edit',           {templateUrl: '/app/views/forms/edit/edit-contact.html',          label:'Edit',  param:'true', resolveController: true,resolve : { securized : securize(null,true) }, document_type:'CON' }).

                when('/register/:document_type/new',                        {templateUrl: '/app/views/register/register.html',          label:'New',  param:'true', resolveController: true,resolve : { securized : securize(null,true) },subTemplateUrl: '/app/views/forms/edit/edit--', }).
                when('/register/:document_type/help',                       {templateUrl: '/app/views/register/register.html',          label:'document_type',  param:'true', resolveController: true,resolve : { securized : securize(null,true) },subTemplateUrl: '/app/views/register/type_document_list.html',}).
                when('/register/:document_type/:identifier/edit',           {templateUrl: '/app/views/register/register.html',          label:'Edit',  param:'true', resolveController: true,resolve : { securized : securize(null,true) },subTemplateUrl: '/app/views/forms/edit/edit--', }).
                when('/register/:document_type/:identifier/edit/:tour',     {templateUrl: '/app/views/register/register.html',          label:'Edit',  param:'true', resolveController: true,resolve : { securized : securize(null,true) },subTemplateUrl: '/app/views/forms/edit/edit--',  }).
                when('/register/:document_type/:documentID/view',           {templateUrl: '/app/views/register/register.html',          label:'View',  param:'true', resolveController: true,resolve : { securized : securize(null,true) },subTemplateUrl: '/app/views/register/record-details.html', }).

                when('/register/admin/pending-requests',                             {templateUrl: '/app/views/register/register.html',          label:'Pending Requests',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) },subTemplateUrl: '/app/views/admin/pending-tasks.html'}).
                when('/register/admin/reported-records',                             {templateUrl: '/app/views/register/register.html',          label:'Reported Records',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) },subTemplateUrl: '/app/views/admin/reported-records.html'}).


                when('/workshops/lac',               { templateUrl: '/app/views/workshops/lac.html',            label:'Workshops',            resolveController: true, resolveUser: true}).
                when('/workshops/caribbean',         { templateUrl: '/app/views/workshops/caribbean.html',      label:'Workshops',        resolveController: true, resolveUser: true}).

                //when('/searchforum.shtml',           { templateUrl:'/app/views/about.html#iac'}).
                when('/oauth2/callback',             { templateUrl: '/app/views/oauth2/callback.html',          resolveController: true, resolveUser: true}).
                when('/certificate/:documentNumber', { templateUrl: '/app/views/forms/view/records-id.html',    resolveController: true, resolveUser: true}).

                when('/commonformat', {templateUrl: '/app/views/about/about.html',resolveController: true,resolveUser: true,subTemplateUrl: '/app/views/about/common-formats.html',ignoreSubController: true,}).
                when('/commonformat',           { redirectTo:'/about/common-formats' }).

                //when('/help/presentations/:folder/:document_type', {templateUrl: '/app/views/help/presentations/presentation.html',resolveController: true,resolveUser: true,subTemplateUrl: '/app/views/help/presentations/:folder/-',ignoreSubController: true,}).
                //when('/help/presentations/:folder', { redirectTo: '/help/presentations/:folder/start' }).

                // when('/help/presentations', {templateUrl: '/app/views/help/presentations.html',   label:'Presentations and Workshops',   resolveController: true,resolveUser: true,subTemplateUrl: '/app/views/register/contacts.html',}).

                when('/contact', {templateUrl: '/app/views/register/register.html',resolveController: true,resolveUser: true,subTemplateUrl: '/app/views/register/contacts.html',}).

                when('/searchforum.shtml',      { redirectTo:'/about/portal10' }).
                when('/commonformat',           { redirectTo:'/about/common-formats' }).

                when('/help/manage/:term?', {templateUrl: '/app/views/help/forms/edit-help.html',resolveController: true,resolveUser: true, label:'Forms Help'}).

                //when('/help/glossary', {templateUrl: '/app/views/help/forms/glossary.html',resolveController: true,resolveUser: true, label:'Glossary'}).
                //when('/help/glossary/tags/:tag', {templateUrl: '/app/views/help/forms/glossary-term.html',resolveController: true,resolveUser: true, schema:'help-glossarys', label:'Tags'}).
                // when('/help/glossary/:term?', {templateUrl: '/app/views/help/forms/glossary-term.html',resolveController: true,resolveUser: true, schema:'help-glossarys', label:'lableText'}).

                when('/about/faq', {templateUrl: '/app/views/about/faq.html', resolveController: true, resolveUser: true, label:'FAQs'}).
                //when('/help/faq/:term?', {templateUrl: '/app/views/help/faq.html',resolveController: true,resolveUser: true, schema:'help-faqs', label:'FAQs'}).
                // when('/help/edit/faq/:term?', {templateUrl: '/app/views/help/forms/glossary-term.html',resolveController: true,resolveUser: true, schema:'help-faqs', label:'FAQs'}).
                //when('/help/faq/tags/:tag', {templateUrl: '/app/views/help/forms/glossary-term.html',resolveController: true,resolveUser: true, schema:'help-faqs', label:'Tags'}).


                when('/search/test', {templateUrl: '/app/test.html',resolveController: true,resolveUser: true}).

                otherwise({templateUrl: '/app/views/shared/404.html', label:'404 Error'});

    }]);


    function securize(roles, useNationalRoles)
    {
        return ["$location", "authentication", "appConfigService", "$filter", "$route",
         function ($location, authentication, appConfigService, $filter, $route) {

            return authentication.getUser().then(function (user) {
                
                if (roles && !_.isEmpty(roles)) {
                    roles = _.map(roles, appConfigService.getRoleName);
                }
                if(useNationalRoles){
                    var path = $location.$$url.replace('/register/','');
                    var schema;

                    if(path.indexOf('/')>0)
                        schema = path.substr(0, path.indexOf('/'));
                    else
                        schema = path;

                    var schemaName = $filter('schemaShortName')(schema);
                    if(!_.contains(appConfigService.referenceSchemas, schemaName))
                        roles = (roles || []).concat(appConfigService.nationalRoles());
                }
                if (!user.isAuthenticated) {

                    console.log("securize: force sign in");

                    if (!$location.search().returnUrl)
                        $location.search({ returnUrl: $location.url() });

                    $location.path(appConfigService.getSiteMapUrls().user.signIn);

                }
                else if (roles && !_.isEmpty(roles) && _.isEmpty(_.intersection(roles, user.roles))){
                    
                    console.log("securize: not authorized");

                    $location.search({ path: $location.url() });
                    $location.path(appConfigService.getSiteMapUrls().errors.notAuthorized);
                }

                return user;
            });
        }];
    }

});
