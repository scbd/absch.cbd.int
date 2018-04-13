define(['app', 'underscore', 'js/extended-route-provider','scbd-angularjs-services', 'js/services', 'js/filters',
 'services/app-config-service', 'angular-route', 'services/app-config-service'], function (app, _) { 'use strict';

    app.value("showHelp", { value : false });

    app.config(['extendedRouteProvider', '$locationProvider', 'realmProvider', function ($routeProvider, $locationProvider, realmProvider) {
        
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        
        $routeProvider.
               when('/',                { templateUrl: 'views/home/index.html', label:'ABSCH', resolveController: true, resolveUser : true}).
               when('/lang/:langCode',  { templateUrl: 'views/shared/lang.html',label:'ABSCH', resolveController: true}).
               when('/signin',          {templateUrl: 'views/shared/login-dialog.html',resolveController: true, label:'Sign in'}).
               when('/verify-email',    {templateUrl: 'views/shared/verify-email.html', label:'Email Verification Pending'}).
               when('/help/403',        {templateUrl: 'views/shared/403.html', label:'403 Error'}).
               
               when('/partners/idlo/events',              { templateUrl: 'views/partners/idlo.html',           label:'IDLO',             resolveController: false, resolveUser: false}).

               when('/forums',                        { templateUrl: 'views/forums/forum-list-view.html',         label:'Forums',       resolveController: true, resolve : { securized : securize() } }).
               when('/forums/iac-trg',          { redirectTo:'/forums/iac', resolve : { securized : securize() }}).
               when('/forums/iac',              { templateUrl: 'views/forums/thread-list-view.html'   ,label:'IAC', resolveController: true, resolve : { securized : securize() }, forumId:17433, postUrl:'/forums/iac', text:'IAC' }).
               when('/forums/iac/:threadId',    { templateUrl: 'views/forums/post-list-view.html'     ,label:'Thread-Subject', resolveController: true, resolve : { securized : securize() }, forumId:17433, forumListUrl:'/forums/iac/', text:'IAC'}).
               when('/forums/joint-iac',              { templateUrl: 'views/forums/thread-list-view.html'   ,label:'Joint IAC', resolveController: true, resolve : { securized : securize() }, forumId:17446, postUrl:'/forums/joint-iac', text:'Joint IAC' }).
               when('/forums/joint-iac/:threadId',    { templateUrl: 'views/forums/post-list-view.html'     ,label:'Thread-Subject', resolveController: true, resolve : { securized : securize() }, forumId:17446, forumListUrl:'/forums/joint-iac/', text:'Joint IAC'}).
               when('/forums/vlr',                    { templateUrl: 'views/forums/thread-list-view.html'  ,label:'VLR'  ,resolveController: true, resolve : { securized : securize() }, forumId:17384, postUrl:'/forums/vlr', text:'VLR' }).
               when('/forums/vlr/:threadId',          { templateUrl: 'views/forums/post-list-view.html'    ,label:'Thread-Subject'  ,resolveController: true, resolve : { securized : securize() }, forumId:17384, forumListUrl:'/forums/vlr/', text:'VLR'}).
               when('/forums/caribbean',              { templateUrl: 'views/forums/thread-list-view.html'  ,label:'Caribbean'  ,resolveController: true, resolve : { securized : securize() }, forumId:17378, postUrl:'/forums/caribbean', text:'Caribbean Region Forum' }).
               when('/forums/caribbean/:threadId',    { templateUrl: 'views/forums/post-list-view.html'    ,label:'Thread-Subject'  ,resolveController: true, resolve : { securized : securize() }, forumId:17378, forumListUrl:'/forums/caribbean/', text:'Caribbean Region Forum'}).
               when('/forums/art10_groups',              { templateUrl: 'views/forums/thread-list-view.html' ,label:'Art 10 Groups'  ,resolveController: true, resolve : { securized : securize() }, forumId:17316, postUrl:'/forums/art10_groups', text:'Forum on Article 10' }).
               when('/forums/art10_groups/:threadId',    { templateUrl: 'views/forums/post-list-view.html'   ,label:'Thread-Subject'  ,resolveController: true, resolve : { securized : securize() }, forumId:17316, forumListUrl:'/forums/art10_groups/', text:'Forum on Article 10' }).
               when('/cms/ui/forums/attachment.aspx',    { template: '<div></div>'   ,label:'POST-Attachments'  ,resolveController: 'views/forums/post-attachment-view', resolve : { securized : securize() }}).
               when('/mailbox',                        { templateUrl: 'views/mailbox/inbox.html',         label:'Mailbox',       resolveController: true, resolve : { securized : securize() } }).
               when('/mailbox/:mailId',                { templateUrl: 'views/mailbox/inbox.html',         label:'Mailbox',       resolveController: true, resolve : { securized : securize() } }).

               when('/search/countries/:countryCode?',                        { redirectTo:'/countries/:countryCode' }).
               when('/search/countries/:countryCode/:documentType',           { redirectTo:'/countries/:countryCode/:documentType' }).
               when('/search/:recordType',                     { templateUrl: 'views/search/search-page.html',   label:'SEARCH',         resolveController: true}).
               when('/search',                                 { templateUrl: 'views/search/search-page.html',   label:'SEARCH',         resolveController: true}).
               when('/search/national-records/:documentSchema?',              { redirectTo:'/search' }).
               when('/search/reference-records/:documentSchema?',             { redirectTo:'/search' }).

               when('/countries',                   { templateUrl: 'views/countries/country-list.html',       label:'Country Profiles',      resolveController: true, resolveUser: true}).
               when('/countries/status/:status',    { templateUrl: 'views/countries/country-list.html',       label:'Country Profiles',      resolveController: true, resolveUser: true}).
               when('/countries/:code/:schema?',             { templateUrl: 'views/countries/country-profile.html',       label:'Country Profile', param:'true',      resolveController: true, resolveUser: true}).
                              
               when('/reports',                     { templateUrl: 'views/report-analyzer/reports.html',    label:'Reports',      resolveController: true}).
            //    when('/reports/:report',             { templateUrl: 'views/report-analyzer/reports.html',     label:'Reports',      resolveController: true}).
               when('/reports/analyzer',    { templateUrl: 'views/report-analyzer/analyzer.html',  label:'Analyzer',      resolveController: true}).
               
               when('/database/record',             { templateUrl: 'views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
               when('/database/record/:documentID',  { templateUrl: 'views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
               when('/database/record/:documentID/:revision', { templateUrl: 'views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
               when('/certificate/:documentID',                        { templateUrl: 'views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
               when('/database/:documentID',                           { templateUrl: 'views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
               when('/database/:documentSchema/:documentID',           { templateUrl: 'views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
               when('/database/:documentSchema/:documentID/:revision', { templateUrl: 'views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
               
               when('/pdf/:type/:schema/:documentId/:revision?',               { templateUrl: 'views/pdf-viewer/records-pdf-viewer.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
                              
               when('/register',                                           { templateUrl: 'views/register/dashboard.html',         label:'Management Center',  param:'true', resolveController: true, resolve : { securized : securize() }}).
               when('/dashboard',                                          { redirectTo:  '/register/dashboard'}).
               when('/register/dashboard',                                 { templateUrl: 'views/register/dashboard.html',         label:'Dashboard',  param:'true', resolveController: true, resolve : { securized : securize() }}).
               when('/register/pending-requests',                          { templateUrl: 'views/register/pending-tasks.html',            label:'Pending Requests',  param:'true', resolveController: true,resolve : { securized : securize() }}).
               when('/register/user-preferences/:tab?',                    { templateUrl: 'views/register/user-preferences/preferences.html',          label:'ABSCH Admin',    param:'true', resolveController: true,resolve : { securized : securize() }}).
               when('/register/admin',                                     { templateUrl: 'views/register/admin.html',          label:'ABSCH Admin',    param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
               when('/register/notifications',                             { templateUrl: 'views/register/notifications.html',  label:'Notifications',  param:'true', resolveController: true,resolve : { securized : securize() }}).
               when('/register/requests',                                  { redirectTo:'/register/notifications' }).
               when('/register/stats',                                     { templateUrl: 'views/register/manage/stats.html',   label:'Statistics',  param:'true', resolveController: true,resolve : { securized : securize() }}).

               when('/register/:document_type/status/:status',             {templateUrl: 'views/register/record-list.html',          param:'true', resolveController: true,resolve : { securized : securize(null,true) }}).
               when('/register/national-users',                            {templateUrl: 'views/register/national-users/national-user-list.html', label:'Manage user roles',  param:'true', resolveController: true,resolve : { securized : securize(null,true) }}).
               when('/register/:document_type',                            {templateUrl: 'views/register/record-list.html',       label:'document_type',  param:'true', resolveController: true,resolve : { securized : securize(null,true) }}).

               when('/register/CON/new',           {templateUrl: 'views/forms/edit/edit-contact.html',                   label:'New',  param:'true', resolveController: true,documentType :'CON' , resolve : { securized : securize(null,null, true) }, }).
               when('/register/CNA/new',           {templateUrl: 'views/forms/edit/edit-authority.html',                 label:'New',  param:'true', resolveController: true,documentType :'CNA' , resolve : { securized : securize(null,true, true) }, }).
               when('/register/MSR/new',           {templateUrl: 'views/forms/edit/edit-measure.html',                   label:'New',  param:'true', resolveController: true,documentType :'MSR' , resolve : { securized : securize(null,true, true) }, }).
               when('/register/NDB/new',           {templateUrl: 'views/forms/edit/edit-database.html',                  label:'New',  param:'true', resolveController: true,documentType :'NDB' , resolve : { securized : securize(null,true, true) }, }).
               when('/register/IRCC/new',          {templateUrl: 'views/forms/edit/edit-absPermit.html',                 label:'New',  param:'true', resolveController: true,documentType :'IRCC', resolve : { securized : securize(null,true, true) }, }).
               when('/register/CP/new',            {templateUrl: 'views/forms/edit/edit-absCheckpoint.html',             label:'New',  param:'true', resolveController: true,documentType :'CP'  , resolve : { securized : securize(null,true, true) }, }).
               when('/register/CPC/new',           {templateUrl: 'views/forms/edit/edit-absCheckpointCommunique.html',   label:'New',  param:'true', resolveController: true,documentType :'CPC' , resolve : { securized : securize(null,true, true) }, }).
               when('/register/NR/new',            {templateUrl: 'views/forms/edit/edit-absNationalReport.html',         label:'New',  param:'true', resolveController: true,documentType :'NR'  , resolve : { securized : securize(null,true, true) }, }).
               when('/register/VLR/new',           {templateUrl: 'views/forms/edit/edit-resource.html',                  label:'New',  param:'true', resolveController: true,documentType :'VLR' , resolve : { securized : securize(null, null, true) }, }).
               when('/register/CBI/new',           {templateUrl: 'views/forms/edit/edit-capacityBuildingInitiative.html',label:'New',  param:'true', resolveController: true,documentType :'CBI' , resolve : { securized : securize(null, null, true) }, }).
               when('/register/A19A20/new',        {templateUrl: 'views/forms/edit/edit-modelContractualClause.html',    label:'New',  param:'true', resolveController: true,documentType :'A19A20' , resolve : { securized : securize(null, null, true) }, }).
               when('/register/CPP/new',           {templateUrl: 'views/forms/edit/edit-communityProtocol.html',         label:'New',  param:'true', resolveController: true,documentType :'CPP' , resolve : { securized : securize(null, null, true) }, }).

               when('/register/CON/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-contact.html',                   label:'Edit',  param:'true', resolveController: true, documentType :'CON' , resolve : { securized : securize(null,null, true) }, }).
               when('/register/CNA/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-authority.html',                 label:'Edit',  param:'true', resolveController: true, documentType :'CNA' , resolve : { securized : securize(null,true, true) }, }).
               when('/register/MSR/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-measure.html',                   label:'Edit',  param:'true', resolveController: true, documentType :'MSR' , resolve : { securized : securize(null,true, true) }, }).
               when('/register/NDB/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-database.html',                  label:'Edit',  param:'true', resolveController: true, documentType :'NDB' , resolve : { securized : securize(null,true, true) }, }).
               when('/register/IRCC/:identifier/edit',          {templateUrl: 'views/forms/edit/edit-absPermit.html',                 label:'Edit',  param:'true', resolveController: true, documentType :'IRCC', resolve : { securized : securize(null,true, true) }, }).
               when('/register/CP/:identifier/edit',            {templateUrl: 'views/forms/edit/edit-absCheckpoint.html',             label:'Edit',  param:'true', resolveController: true, documentType :'CP'  , resolve : { securized : securize(null,true, true) }, }).
               when('/register/CPC/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-absCheckpointCommunique.html',   label:'Edit',  param:'true', resolveController: true, documentType :'CPC' , resolve : { securized : securize(null,true, true) }, }).
               when('/register/NR/:identifier/edit',            {templateUrl: 'views/forms/edit/edit-absNationalReport.html',         label:'Edit',  param:'true', resolveController: true, documentType :'NR'  , resolve : { securized : securize(null,true, true) }, }).
               when('/register/VLR/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-resource.html',                  label:'Edit',  param:'true', resolveController: true, documentType :'VLR' , resolve : { securized : securize(null, null, true) }, }).
               when('/register/CBI/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-capacityBuildingInitiative.html',label:'Edit',  param:'true', resolveController: true, documentType :'CBI' , resolve : { securized : securize(null, null, true) }, }).
               when('/register/A19A20/:identifier/edit',        {templateUrl: 'views/forms/edit/edit-modelContractualClause.html',    label:'Edit',  param:'true', resolveController: true, documentType :'A19A20' , resolve : { securized : securize(null, null, true) }, }).
               when('/register/CPP/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-communityProtocol.html',         label:'Edit',  param:'true', resolveController: true, documentType :'CPP' , resolve : { securized : securize(null, null, true) }, }).
               when('/register/ORG/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-organization.html',              label:'Edit',  param:'true', resolveController: true, documentType :'ORG' , resolve : { securized : securize(null, null, true) }, }).

               when('/register/:document_type/:documentID/view',           {templateUrl: 'views/register/record-details.html',    label:'View',  param:'true', resolveController: true,resolve : { securized : securize(null,true) }}).

               when('/register/admin/pending-requests',         { templateUrl: 'views/register/pending-tasks.html',            label:'Pending Requests',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
               when('/register/admin/reported-records',         { templateUrl: 'views/register/admin/reported-records.html',   label:'Reported Records',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
               when('/register/admin/reported-records/:id',     { templateUrl: 'views/register/admin/reported-records.html',   label:'Record',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
               when('/register/admin/report-counts',            { templateUrl: 'views/register/admin/report-count.html',       label:'Report Counts',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
               when('/register/admin/ircc-counts',              { templateUrl: 'views/register/admin/ircc-counts.html',         label:'IRCC Counts',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
               when('/register/admin/error-logs',               { templateUrl: 'views/register/admin/error-logs.html',         label:'Error Logs',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
               when('/register/admin/subscriptions',            { templateUrl: 'views/register/admin/subscriptions.html',      label:'Subscriptions',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
               when('/register/admin/user-role-report',         { templateUrl: 'views/register/admin/user-role-report.html',   label:'user Role Report',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
               
               when('/workshops/lac',               { templateUrl: 'views/workshops/lac.html',            label:'Workshops',            resolveController: true, resolveUser: true}).
               when('/workshops/caribbean',         { templateUrl: 'views/workshops/caribbean.html',      label:'Workshops',        resolveController: true, resolveUser: true}).

               when('/oauth2/callback',             { templateUrl: 'views/oauth2/callback.html',          resolveController: true, resolveUser: true}).
 
               when('/about/faq',                   { redirectTo : '/help/faq'}).
               when('/guides',                      {redirectTo: '/help/guides'}).
               when('/commonformats',               {redirectTo:'/help/common-formats'}).
               when('/nationalreport',              {redirectTo:'/help/national-report'}).               
               when('/about',                        {redirectTo  : '/help/about'}).
               when('/about/blog',                   {redirectTo  : '/help/about'}).
               when('/help',                         {redirectTo  : '/help/about'}).
               when('/help/faq',                     {redirectTo  : '/help/faqs'}).

               when('/help/about',                   { templateUrl: 'views/about/about.html',                        label:'About the ABSCH',             reloadOnSearch : false,    resolveController:true, resolveUser : true}).
               when('/help/about/blog',              { templateUrl: 'views/about/blog.html',                        label:'ABSCH Development Blog',                 resolveController:true, resolveUser : true}).
               when('/help/videos/:videoId?',   {templateUrl: 'views/about/videos.html', resolveController: true, resolveUser: false, label:'ABSCH Videos'}).
               when('/help/guides/:guideId?',   {templateUrl: 'views/about/guides.html', resolveController: true, resolveUser: false, label:'Step-by-step guides'}).
               when('/help/common-formats/:commonFormat?',     {templateUrl: 'views/about/common-formats.html', resolveController: true, resolveUser: true, label:'Common formats'}).
               when('/help/national-report',    {templateUrl: 'views/about/nr-faq.html', resolveController: true, resolveUser: true, label:'Information on the Interim National Report'}).
               when('/help/faqs',               {templateUrl: 'views/about/faq.html', resolveController: true, resolveUser: true, label:'FAQs'}).


                when('/about/getting-started',                   { templateUrl: 'views/about/getting-started.html',                        label:'Getting Started Using the ABSCH',             reloadOnSearch : false,    resolveController:true, resolveUser : true}).

                 when('/developer',    {templateUrl: 'views/help/developer/developer.html', resolveController: true, resolveUser: true, label:'ABSCH for developers'}).
                              
               otherwise({templateUrl: 'views/shared/404.html', label:'404 Error'});

    }]);


    function securize(roleList, useNationalRoles, checkEmailVerified)
    {
        return ["$location", "authentication", "appConfigService", "$filter", "$route",
         function ($location, authentication, appConfigService, $filter, $route) {

            return authentication.getUser().then(function (user) {

                if(checkEmailVerified && user.isAuthenticated && !user.isEmailVerified){
                    $location.path(appConfigService.getSiteMapUrls().user.verifyEmail);
                    return;
                }

                var roles = _.clone(roleList||[]);

                if (roles && !_.isEmpty(roles)) {
                    roles = _.flatten(_.map(roles, appConfigService.getRoleName));
                }
                if(useNationalRoles){
                    var path = $location.$$url.replace('/register/','');
                    var schema;

                    if(path.indexOf('/')>0)
                        schema = path.substr(0, path.indexOf('/'));
                    else
                        schema = path;

                    var schemaName = $filter('mapSchema')(schema);
                    if(!_.contains(_.union(['contact'], appConfigService.referenceSchemas), schemaName))
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
