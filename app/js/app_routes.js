'use strict';

define(['app', 'extended-route-provider','scbd-angularjs-services', 'services', 'filters', 'realm-configuration'], function (app) {

    app.value("realm", {value:"ABS"});
    app.value("schemaTypes", [ "absNationalReport", "absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database", "resource", "modelContractualClause" ]);

    app.config(['extendedRouteProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        $routeProvider.
            when('/',                            { templateUrl: '/app/views/home/index.html',                       label:'ABSCH',                              resolveController: true, resolveUser: true}).
            when('/commonformat',                { templateUrl: '/app/views/common-formats.html',                   label:'Common Formats',                     resolveController: true, resolveUser: true}).
            when('/help',                        { templateUrl: '/app/views/help/help.html',                        label:'Help',                               resolveController: true, resolveUser: true}).
            when('/help/about',                  { templateUrl: '/app/views/help/about/about.html',                 label:'About the ABSCH',                    resolveController: true, resolveUser: true}).
            when('/about', { redirectTo: '/help/about/absch' }).
            when('/help/presentations/',         { templateUrl: '/app/views/help/presentations/home.html',          label:'Presentations',                      resolveController: true, resolveUser: true}).
            when('/help/accounts',               { templateUrl: '/app/views/help/accounts/accounts.html',           label:'CBD Accounts',                       resolveController: true, resolveUser: true}).
            when('/help/search',                 { templateUrl: '/app/views/help/search/search.html',               label:'Finding Information',                resolveController: true, resolveUser: true}).
            when('/help/tours',                  { templateUrl: '/app/views/help/tours/tours.html',                 label:'Tours',                              resolveController: true, resolveUser: true}).
            when('/help/register',               { templateUrl: '/app/views/help/register/register.html',           label:'Submitting Information',             resolveController: true, resolveUser: true}).

            when('/forums',                        { templateUrl: '/app/views/forums/forum-list-view.html',         label:'Forums',       resolveController: true, resolveUser: true }).

            when('/forums/iac-trg',          { redirectTo:'/forums/iac'}).
            when('/forums/iac',              { templateUrl: '/app/views/forums/thread-list-view.html'   ,label:'IAC', resolveController: true, resolveUser: true, forumId:17433, postUrl:'/forums/iac', text:'IAC' }).
            when('/forums/iac/:threadId',    { templateUrl: '/app/views/forums/post-list-view.html'     ,label:'Thread-Subject', resolveController: true, resolveUser: true, forumId:17433, forumListUrl:'/forums/iac/', text:'IAC'}).

            when('/forums/vlr',                    { templateUrl: '/app/views/forums/thread-list-view.html'  ,label:'VLR'  ,resolveController: true, resolveUser: true, forumId:17384, postUrl:'/forums/vlr', text:'VLR' }).
            when('/forums/vlr/:threadId',          { templateUrl: '/app/views/forums/post-list-view.html'    ,label:'Thread-Subject'  ,resolveController: true, resolveUser: true, forumId:17384, forumListUrl:'/forums/vlr/', text:'VLR'}).
            when('/forums/caribbean',              { templateUrl: '/app/views/forums/thread-list-view.html'  ,label:'Caribbean'  ,resolveController: true, resolveUser: true, forumId:17378, postUrl:'/forums/caribbean', text:'Caribbean Region Forum' }).
            when('/forums/caribbean/:threadId',    { templateUrl: '/app/views/forums/post-list-view.html'    ,label:'Thread-Subject'  ,resolveController: true, resolveUser: true, forumId:17378, forumListUrl:'/forums/caribbean/', text:'Caribbean Region Forum'}).
            //when('/forums/caribbean region',              { templateUrl: '/app/views/forums/thread-list-view.html'   ,resolveController: true, resolveUser: true, forumId:17378, postUrl:'/forums/caribbean region' }).
            //when('/forums/caribbean region/:threadId',    { templateUrl: '/app/views/forums/post-list-view.html'     ,resolveController: true, resolveUser: true, forumId:17378, forumListUrl:'/forums/caribbean region/'}).
            when('/forums/art10_groups',              { templateUrl: '/app/views/forums/thread-list-view.html' ,label:'Art 10 Groups'  ,resolveController: true, resolveUser: true, forumId:17316, postUrl:'/forums/art10_groups', text:'Forum on Article 10' }).
            when('/forums/art10_groups/:threadId',    { templateUrl: '/app/views/forums/post-list-view.html'   ,label:'Thread-Subject'  ,resolveController: true, resolveUser: true, forumId:17316, forumListUrl:'/forums/art10_groups/', text:'Forum on Article 10' }).

            when('/mailbox',                        { templateUrl: '/app/views/mailbox/inbox.html',         label:'Mailbox',       resolveController: true, resolveUser: true }).
            when('/mailbox/:mailId',                { templateUrl: '/app/views/mailbox/inbox.html',         label:'Mailbox',       resolveController: true, resolveUser: true }).

            when('/search/new',                             { templateUrl: '/app/views/search/search.html',   label:'Search',         resolveController: true, resolveUser: true}).
            when('/search/new/byCountry',                   { templateUrl: '/app/views/search/country-search.html',   label:'Search',         resolveController: true, resolveUser: true}).

            // when('/search/new/measurematrix',                   { templateUrl: '/app/views/search/measure-matrix.html',   label:'Matrix',         resolveController: true, resolveUser: true}).
            // when('/search/new/measurematrix/:uniqueId',         { templateUrl: '/app/views/search/measure-matrix.html',   label:'Matrix',         resolveController: true, resolveUser: true}).
            when('/measurematrix/:code',            { templateUrl: '/app/views/search/measure-matrix-countries.html',   label:'Measures Matrix',         resolveController: true, resolveUser: true}).

            when('/search',                                 { templateUrl: '/app/views/search/find.html',   label:'Search',         resolveController: true, resolveUser: true}).
            when('/search/:documentSchema',                 { templateUrl: '/app/views/search/find.html',   label:'Search',         resolveController: true, resolveUser: true}).
            when('/search/:documentSchema/:countryCode',    { templateUrl: '/app/views/search/find.html',   label:'Search',         resolveController: true, resolveUser: true}).
            when('/find/simple',                            { templateUrl: '/app/views/find/simple.html',   label:'Simple Search',  resolveController: true, resolveUser: true}).
            when('/find',                                   { redirectTo:'/search'}).

            when('/countries',                   { templateUrl: '/app/views/countries/index.html',       label:'Country Information',      resolveController: true, resolveUser: true}).
            when('/countries/:code',             { templateUrl: '/app/views/countries/profiles.html',       label:'Country Profile', param:'true',      resolveController: true, resolveUser: true}).
            when('/countries/:code/:schema',     { templateUrl: '/app/views/countries/profiles.html',       label:'Country Profile', param:'true',      resolveController: true, resolveUser: true}).


            when('/database/record',             { templateUrl: '/app/views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
            when('/database/record/:documentID',  { templateUrl: '/app/views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
            when('/database/record/:documentID/:revision', { templateUrl: '/app/views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
            when('/database/:documentID',                           { templateUrl: '/app/views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
            when('/database/:documentSchema/:documentID',           { templateUrl: '/app/views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
            when('/database/:documentSchema/:documentID/:revision', { templateUrl: '/app/views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).

            when('/register/tasks/:id',                                 {templateUrl: '/app/views/tasks/tasks-id.html',             label:'Management Center',  param:'true', resolveController: true, resolveUser: true}).
            when('/register/tasks/:id/:activity',                       {templateUrl: '/app/views/tasks/tasks-id-activity.html',    label:'Management Center',  param:'true', resolveController: true, resolveUser: true}).
            when('/register/dashboard',                                 {templateUrl: '/app/views/register/register.html',          label:'Management Center',  param:'true', resolveController: true,resolveUser: true,subTemplateUrl: '/app/views/register/dashboard.html',}).
            when('/dashboard',                                          {redirectTo:  '/register/dashboard'}).

            when('/register',                                           {templateUrl: '/app/views/register/register.html',          label:'Management Center',  param:'true', resolveController: true,resolveUser: true,subTemplateUrl: '/app/views/register/dashboard.html',}).
            when('/register/requests',                                  {templateUrl: '/app/views/register/register.html',          label:'Requests',  param:'true', resolveController: true,resolveUser: true,subTemplateUrl: '/app/views/tasks/my-tasks.directive.html',    type : 'all'}).
            when('/register/requests/:workflowId',                      {templateUrl: '/app/views/register/register.html',          label:'Requests',  param:'true', resolveController: true,resolveUser: true,subTemplateUrl: '/app/views/tasks/my-tasks.directive.html',type : 'all'}).
            when('/register/requests/:type/:status',                    {templateUrl: '/app/views/register/register.html',          label:'Requests',  param:'true', resolveController: true,resolveUser: true,subTemplateUrl: '/app/views/tasks/my-tasks.directive.html',}).
            when('/register/:document_type',                            {templateUrl: '/app/views/register/register.html',          label:'document_type',  param:'true', resolveController: true,resolveUser: true,subTemplateUrl: '/app/views/register/type_document_list.html',}).
            when('/register/:document_type/new',                        {templateUrl: '/app/views/register/register.html',          label:'New',  param:'true', resolveController: true,resolveUser: true,subTemplateUrl: '/app/views/forms/edit/edit--', }).
            when('/register/:document_type/help',                       {templateUrl: '/app/views/register/register.html',          label:'document_type',  param:'true', resolveController: true,resolveUser: true,subTemplateUrl: '/app/views/register/type_document_list.html',}).
            when('/register/:document_type/:identifier/edit',           {templateUrl: '/app/views/register/register.html',          label:'Edit',  param:'true', resolveController: true,resolveUser: true,subTemplateUrl: '/app/views/forms/edit/edit--', }).
            when('/register/:document_type/:identifier/edit/:tour',     {templateUrl: '/app/views/register/register.html',          label:'Edit',  param:'true', resolveController: true,resolveUser: true,subTemplateUrl: '/app/views/forms/edit/edit--',  }).

            when('/workshops/lac',               { templateUrl: '/app/views/workshops/lac.html',            label:'Workshops',            resolveController: true, resolveUser: true}).
            when('/workshops/caribbean',         { templateUrl: '/app/views/workshops/caribbean.html',      label:'Workshops',        resolveController: true, resolveUser: true}).

            //when('/searchforum.shtml',           { templateUrl:'/app/views/about.html#iac'}).
            when('/oauth2/callback',             { templateUrl: '/app/views/oauth2/callback.html',          resolveController: true, resolveUser: true}).
            when('/certificate/:documentNumber', { templateUrl: '/app/views/forms/view/records-id.html',    resolveController: true, resolveUser: true}).

            when('/commonformat', {templateUrl: '/app/views/about/about.html',resolveController: true,resolveUser: true,subTemplateUrl: '/app/views/about/common-formats.html',ignoreSubController: true,}).
            when('/commonformat',           { redirectTo:'/about/common-formats' }).

            when('/help/presentations/:folder/:document_type', {templateUrl: '/app/views/help/presentations/presentation.html',resolveController: true,resolveUser: true,subTemplateUrl: '/app/views/help/presentations/:folder/-',ignoreSubController: true,}).
            when('/help/presentations/:folder', { redirectTo: '/help/presentations/:folder/start' }).

            when('/contacts', {templateUrl: '/app/views/register/register.html',resolveController: true,resolveUser: true,subTemplateUrl: '/app/views/register/contacts.html',}).

            when('/searchforum.shtml',      { redirectTo:'/about/portal10' }).
            when('/commonformat',           { redirectTo:'/about/common-formats' }).

            when('/help/manage/:term?', {templateUrl: '/app/views/help/forms/edit-help.html',resolveController: true,resolveUser: true, label:'Forms Help'}).
            
            when('/help/glossary', {templateUrl: '/app/views/help/forms/glossary.html',resolveController: true,resolveUser: true, label:'Glossary'}).           
            when('/help/glossary/:term', {templateUrl: '/app/views/help/forms/glossary-term.html',resolveController: true,resolveUser: true, schema:'help-glossarys', label:'lableText'}).
            
            when('/help/faq', {templateUrl: '/app/views/help/forms/faq.html',resolveController: true,resolveUser: true, label:'FAQ'}).           
            when('/help/faq/:term', {templateUrl: '/app/views/help/forms/glossary-term.html',resolveController: true,resolveUser: true, schema:'help-faqs', label:'lableText'}).

            otherwise({templateUrl: '/app/404.html', label:'404 Error'});

    }]);
});
