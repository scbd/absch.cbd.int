'use strict';
define(['app', 'underscore', 'js/extended-route-provider','scbd-angularjs-services', 'js/services', 'js/filters',
 '/app/services/app-config-service.js'], function (app, _) {
      
    app.value("realm", {value:"ABS"});
    app.value("showHelp", { value : false });

    app.provider("realm", {

        $get : ["$location", 'appConfigService', function($location, appConfigService) {
            return { value : appConfigService.currentRealm || 'ABS' };
        }]
    });
    app.config(['extendedRouteProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        
        $routeProvider.
               when('/',               { templateUrl: '/app/views/home/index.html', label:'ABSCH', resolveController: true, resolveUser : true}).
               when('/lang/:langCode', { templateUrl: '/app/views/shared/lang.html',label:'ABSCH', resolveController: true}).
               when('/signin',     {templateUrl: '/app/views/shared/login-dialog.html',resolveController: true, label:'Sign in'}).
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

               when('/search/countries/:countryCode?',                        { redirectTo:'/countries/:countryCode' }).
               when('/search/countries/:countryCode/:documentType',           { redirectTo:'/countries/:countryCode' }).
               when('/search/:recordType',                     { templateUrl: '/app/views/search/search-page.html',   label:'SEARCH',         resolveController: true}).
               when('/search',                                 { templateUrl: '/app/views/search/search-page.html',   label:'SEARCH',         resolveController: true}).
               when('/search/national-records/:documentSchema?',              { redirectTo:'/search' }).
               when('/search/reference-records/:documentSchema?',             { redirectTo:'/search' }).

               when('/countries',                   { templateUrl: '/app/views/countries/country-list.html',       label:'Country Profiles',      resolveController: true, resolveUser: true}).
               when('/countries/status/:status',    { templateUrl: '/app/views/countries/country-list.html',       label:'Country Profiles',      resolveController: true, resolveUser: true}).
               when('/countries/:code',             { templateUrl: '/app/views/countries/country-profile.html',       label:'Country Profile', param:'true',      resolveController: true, resolveUser: true}).

               when('/database/record',             { templateUrl: '/app/views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
               when('/database/record/:documentID',  { templateUrl: '/app/views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
               when('/database/record/:documentID/:revision', { templateUrl: '/app/views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
               when('/certificate/:documentID',                        { templateUrl: '/app/views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
               when('/database/:documentID',                           { templateUrl: '/app/views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
               when('/database/:documentSchema/:documentID',           { templateUrl: '/app/views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
               when('/database/:documentSchema/:documentID/:revision', { templateUrl: '/app/views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
               
               when('/register',                                           {templateUrl: '/app/views/register/dashboard.html',         label:'Management Center',  param:'true', resolveController: true, resolve : { securized : securize() }}).
               when('/dashboard',                                          {redirectTo:  '/register/dashboard'}).
               when('/register/dashboard',                                 {templateUrl: '/app/views/register/dashboard.html',         label:'Dashboard',  param:'true', resolveController: true, resolve : { securized : securize() }}).
               
               when('/register/user-preferences',                          { templateUrl: '/app/views/register/user-preferences/preferences.html',          label:'ABSCH Admin',    param:'true', resolveController: true,resolve : { securized : securize() }}).
               when('/register/admin',                                     { templateUrl: '/app/views/register/admin.html',          label:'ABSCH Admin',    param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
               when('/register/notifications',                             { templateUrl: '/app/views/register/notifications.html',  label:'Notifications',  param:'true', resolveController: true,resolve : { securized : securize() }}).
               when('/register/requests',                                  { redirectTo:'/register/notifications' }).

               when('/register/:document_type/status/:status',             {templateUrl: '/app/views/register/record-list.html',          param:'true', resolveController: true,resolve : { securized : securize(null,true) }}).
               when('/register/national-users',                            {templateUrl: '/app/views/register/national-users/national-user-list.html', label:'Manage user roles',  param:'true', resolveController: true,resolve : { securized : securize(null,true) }}).
               when('/register/:document_type',                            {templateUrl: '/app/views/register/record-list.html',       label:'document_type',  param:'true', resolveController: true,resolve : { securized : securize(null,true) }}).

               when('/register/CON/new',           {templateUrl: '/app/views/forms/edit/edit-contact.html',                   label:'New',  param:'true', resolveController: true,documentType :'CON' , resolve : { securized : securize(null,true) }, }).
               when('/register/CNA/new',           {templateUrl: '/app/views/forms/edit/edit-authority.html',                 label:'New',  param:'true', resolveController: true,documentType :'CNA' , resolve : { securized : securize(null,true) }, }).
               when('/register/MSR/new',           {templateUrl: '/app/views/forms/edit/edit-measure.html',                   label:'New',  param:'true', resolveController: true,documentType :'MSR' , resolve : { securized : securize(null,true) }, }).
               when('/register/NDB/new',           {templateUrl: '/app/views/forms/edit/edit-database.html',                  label:'New',  param:'true', resolveController: true,documentType :'NDB' , resolve : { securized : securize(null,true) }, }).
               when('/register/IRCC/new',          {templateUrl: '/app/views/forms/edit/edit-absPermit.html',                 label:'New',  param:'true', resolveController: true,documentType :'IRCC', resolve : { securized : securize(null,true) }, }).
               when('/register/CP/new',            {templateUrl: '/app/views/forms/edit/edit-absCheckpoint.html',             label:'New',  param:'true', resolveController: true,documentType :'CP'  , resolve : { securized : securize(null,true) }, }).
               when('/register/CPC/new',           {templateUrl: '/app/views/forms/edit/edit-absCheckpointCommunique.html',   label:'New',  param:'true', resolveController: true,documentType :'CPC' , resolve : { securized : securize(null,true) }, }).
               when('/register/NR/new',            {templateUrl: '/app/views/forms/edit/edit-absNationalReport.html',         label:'New',  param:'true', resolveController: true,documentType :'NR'  , resolve : { securized : securize(null,true) }, }).
               when('/register/VLR/new',           {templateUrl: '/app/views/forms/edit/edit-resource.html',                  label:'New',  param:'true', resolveController: true,documentType :'VLR' , resolve : { securized : securize() }, }).
               when('/register/CBI/new',           {templateUrl: '/app/views/forms/edit/edit-capacityBuildingInitiative.html',label:'New',  param:'true', resolveController: true,documentType :'CBI' , resolve : { securized : securize() }, }).
               when('/register/A19A20/new',        {templateUrl: '/app/views/forms/edit/edit-modelContractualClause.html',    label:'New',  param:'true', resolveController: true,documentType :'A19A20' , resolve : { securized : securize() }, }).
               when('/register/CPP/new',           {templateUrl: '/app/views/forms/edit/edit-communityProtocol.html',         label:'New',  param:'true', resolveController: true,documentType :'CPP' , resolve : { securized : securize() }, }).

               when('/register/CON/:identifier/edit',           {templateUrl: '/app/views/forms/edit/edit-contact.html',                   label:'Edit',  param:'true', resolveController: true, documentType :'CON' , resolve : { securized : securize(null,true) }, }).
               when('/register/CNA/:identifier/edit',           {templateUrl: '/app/views/forms/edit/edit-authority.html',                 label:'Edit',  param:'true', resolveController: true, documentType :'CNA' , resolve : { securized : securize(null,true) }, }).
               when('/register/MSR/:identifier/edit',           {templateUrl: '/app/views/forms/edit/edit-measure.html',                   label:'Edit',  param:'true', resolveController: true, documentType :'MSR' , resolve : { securized : securize(null,true) }, }).
               when('/register/NDB/:identifier/edit',           {templateUrl: '/app/views/forms/edit/edit-database.html',                  label:'Edit',  param:'true', resolveController: true, documentType :'NDB' , resolve : { securized : securize(null,true) }, }).
               when('/register/IRCC/:identifier/edit',          {templateUrl: '/app/views/forms/edit/edit-absPermit.html',                 label:'Edit',  param:'true', resolveController: true, documentType :'IRCC', resolve : { securized : securize(null,true) }, }).
               when('/register/CP/:identifier/edit',            {templateUrl: '/app/views/forms/edit/edit-absCheckpoint.html',             label:'Edit',  param:'true', resolveController: true, documentType :'CP'  , resolve : { securized : securize(null,true) }, }).
               when('/register/CPC/:identifier/edit',           {templateUrl: '/app/views/forms/edit/edit-absCheckpointCommunique.html',   label:'Edit',  param:'true', resolveController: true, documentType :'CPC' , resolve : { securized : securize(null,true) }, }).
               when('/register/NR/:identifier/edit',            {templateUrl: '/app/views/forms/edit/edit-absNationalReport.html',         label:'Edit',  param:'true', resolveController: true, documentType :'NR'  , resolve : { securized : securize(null,true) }, }).
               when('/register/VLR/:identifier/edit',           {templateUrl: '/app/views/forms/edit/edit-resource.html',                  label:'Edit',  param:'true', resolveController: true, documentType :'VLR' , resolve : { securized : securize() }, }).
               when('/register/CBI/:identifier/edit',           {templateUrl: '/app/views/forms/edit/edit-capacityBuildingInitiative.html',label:'Edit',  param:'true', resolveController: true, documentType :'CBI' , resolve : { securized : securize() }, }).
               when('/register/A19A20/:identifier/edit',        {templateUrl: '/app/views/forms/edit/edit-modelContractualClause.html',    label:'Edit',  param:'true', resolveController: true, documentType :'A19A20' , resolve : { securized : securize() }, }).
               when('/register/CPP/:identifier/edit',           {templateUrl: '/app/views/forms/edit/edit-communityProtocol.html',         label:'Edit',  param:'true', resolveController: true, documentType :'CPP' , resolve : { securized : securize() }, }).
               when('/register/ORG/:identifier/edit',           {templateUrl: '/app/views/forms/edit/edit-organization.html',              label:'Edit',  param:'true', resolveController: true, documentType :'ORG' , resolve : { securized : securize() }, }).

               when('/register/:document_type/:documentID/view',           {templateUrl: '/app/views/register/record-details.html',    label:'View',  param:'true', resolveController: true,resolve : { securized : securize(null,true) }}).

               when('/register/admin/pending-requests',         { templateUrl: '/app/views/register/admin/pending-tasks.html',      label:'Pending Requests',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
               when('/register/admin/reported-records',         { templateUrl: '/app/views/register/admin/reported-records.html',   label:'Reported Records',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
               when('/register/admin/reported-records/:id',     { templateUrl: '/app/views/register/admin/reported-records.html',   label:'Record',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
               when('/register/admin/report-counts',            { templateUrl: '/app/views/register/admin/report-count.html',       label:'Report Counts',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
               when('/register/admin/error-logs',               { templateUrl: '/app/views/register/admin/error-logs.html',         label:'Error Logs',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).

               when('/workshops/lac',               { templateUrl: '/app/views/workshops/lac.html',            label:'Workshops',            resolveController: true, resolveUser: true}).
               when('/workshops/caribbean',         { templateUrl: '/app/views/workshops/caribbean.html',      label:'Workshops',        resolveController: true, resolveUser: true}).

               when('/oauth2/callback',             { templateUrl: '/app/views/oauth2/callback.html',          resolveController: true, resolveUser: true}).
 
               when('/about/faq', {templateUrl: '/app/views/about/faq.html', resolveController: true, resolveUser: true, label:'FAQs'}).
               when('/guides', {templateUrl: '/app/views/about/guides.html', resolveController: true, resolveUser: true, label:'Step-by-step guides'}).

               
               otherwise({templateUrl: '/app/views/shared/404.html', label:'404 Error'});

    }]);


    function securize(roleList, useNationalRoles)
    {
        return ["$location", "authentication", "appConfigService", "$filter", "$route",
         function ($location, authentication, appConfigService, $filter, $route) {

            return authentication.getUser().then(function (user) {

                var roles = _.clone(roleList||[]);

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

                    var schemaName = $filter('mapSchema')(schema);
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
