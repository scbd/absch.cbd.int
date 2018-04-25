define(['app', 'underscore', './common-routes', 'js/extended-route-provider','components/scbd-angularjs-services/services/main', 'js/services', 'js/filters',
 'services/app-config-service', 'angular-route', 'services/app-config-service'], function (app, _, commonRoutes) { 'use strict';

    app.value("showHelp", { value : false });

    app.config(['extendedRouteProvider', '$locationProvider', 'realmProvider', function ($routeProvider, $locationProvider, realmProvider) {
        
        $routeProvider.
               whenAsync('/',                { templateUrl: 'views/home/index.html', label:'ABSCH', resolveController: true, resolveUser : true}).

               whenAsync('/partners/idlo/events',              { templateUrl: 'views/partners/idlo.html',           label:'IDLO',             resolveController: false, resolveUser: false}).

               whenAsync('/forums',                        { templateUrl: 'views/forums/forum-list-view.html',         label:'Forums',       resolveController: true, resolve : { securized : commonRoutes.securize() } }).
               whenAsync('/forums/iac-trg',          { redirectTo:'/forums/iac', resolve : { securized : commonRoutes.securize() }}).
               whenAsync('/forums/iac',              { templateUrl: 'views/forums/thread-list-view.html'   ,label:'IAC', resolveController: true, resolve : { securized : commonRoutes.securize() }, forumId:17433, postUrl:'/forums/iac', text:'IAC' }).
               whenAsync('/forums/iac/:threadId',    { templateUrl: 'views/forums/post-list-view.html'     ,label:'Thread-Subject', resolveController: true, resolve : { securized : commonRoutes.securize() }, forumId:17433, forumListUrl:'/forums/iac/', text:'IAC'}).
               whenAsync('/forums/joint-iac',              { templateUrl: 'views/forums/thread-list-view.html'   ,label:'Joint IAC', resolveController: true, resolve : { securized : commonRoutes.securize() }, forumId:17446, postUrl:'/forums/joint-iac', text:'Joint IAC' }).
               whenAsync('/forums/joint-iac/:threadId',    { templateUrl: 'views/forums/post-list-view.html'     ,label:'Thread-Subject', resolveController: true, resolve : { securized : commonRoutes.securize() }, forumId:17446, forumListUrl:'/forums/joint-iac/', text:'Joint IAC'}).
               whenAsync('/forums/vlr',                    { templateUrl: 'views/forums/thread-list-view.html'  ,label:'VLR'  ,resolveController: true, resolve : { securized : commonRoutes.securize() }, forumId:17384, postUrl:'/forums/vlr', text:'VLR' }).
               whenAsync('/forums/vlr/:threadId',          { templateUrl: 'views/forums/post-list-view.html'    ,label:'Thread-Subject'  ,resolveController: true, resolve : { securized : commonRoutes.securize() }, forumId:17384, forumListUrl:'/forums/vlr/', text:'VLR'}).
               whenAsync('/forums/caribbean',              { templateUrl: 'views/forums/thread-list-view.html'  ,label:'Caribbean'  ,resolveController: true, resolve : { securized : commonRoutes.securize() }, forumId:17378, postUrl:'/forums/caribbean', text:'Caribbean Region Forum' }).
               whenAsync('/forums/caribbean/:threadId',    { templateUrl: 'views/forums/post-list-view.html'    ,label:'Thread-Subject'  ,resolveController: true, resolve : { securized : commonRoutes.securize() }, forumId:17378, forumListUrl:'/forums/caribbean/', text:'Caribbean Region Forum'}).
               whenAsync('/forums/art10_groups',              { templateUrl: 'views/forums/thread-list-view.html' ,label:'Art 10 Groups'  ,resolveController: true, resolve : { securized : commonRoutes.securize() }, forumId:17316, postUrl:'/forums/art10_groups', text:'Forum on Article 10' }).
               whenAsync('/forums/art10_groups/:threadId',    { templateUrl: 'views/forums/post-list-view.html'   ,label:'Thread-Subject'  ,resolveController: true, resolve : { securized : commonRoutes.securize() }, forumId:17316, forumListUrl:'/forums/art10_groups/', text:'Forum on Article 10' }).

               whenAsync('/register/CNA/new',           {templateUrl: 'views/forms/edit/edit-authority.html',                 label:'New',  param:'true', resolveController: true,documentType :'CNA' , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/MSR/new',           {templateUrl: 'views/forms/edit/edit-measure.html',                   label:'New',  param:'true', resolveController: true,documentType :'MSR' , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/NDB/new',           {templateUrl: 'views/forms/edit/edit-database.html',                  label:'New',  param:'true', resolveController: true,documentType :'NDB' , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/IRCC/new',          {templateUrl: 'views/forms/edit/edit-absPermit.html',                 label:'New',  param:'true', resolveController: true,documentType :'IRCC', resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/CP/new',            {templateUrl: 'views/forms/edit/edit-absCheckpoint.html',             label:'New',  param:'true', resolveController: true,documentType :'CP'  , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/CPC/new',           {templateUrl: 'views/forms/edit/edit-absCheckpointCommunique.html',   label:'New',  param:'true', resolveController: true,documentType :'CPC' , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/NR/new',            {templateUrl: 'views/forms/edit/edit-absNationalReport.html',         label:'New',  param:'true', resolveController: true,documentType :'NR'  , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/CBI/new',           {templateUrl: 'views/forms/edit/edit-capacityBuildingInitiative.html',label:'New',  param:'true', resolveController: true,documentType :'CBI' , resolve : { securized : commonRoutes.securize(null, null, true) }, }).
               whenAsync('/register/A19A20/new',        {templateUrl: 'views/forms/edit/edit-modelContractualClause.html',    label:'New',  param:'true', resolveController: true,documentType :'A19A20' , resolve : { securized : commonRoutes.securize(null, null, true) }, }).
               whenAsync('/register/CPP/new',           {templateUrl: 'views/forms/edit/edit-communityProtocol.html',         label:'New',  param:'true', resolveController: true,documentType :'CPP' , resolve : { securized : commonRoutes.securize(null, null, true) }, }).

               whenAsync('/register/CNA/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-authority.html',                 label:'Edit',  param:'true', resolveController: true, documentType :'CNA' , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/MSR/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-measure.html',                   label:'Edit',  param:'true', resolveController: true, documentType :'MSR' , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/NDB/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-database.html',                  label:'Edit',  param:'true', resolveController: true, documentType :'NDB' , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/IRCC/:identifier/edit',          {templateUrl: 'views/forms/edit/edit-absPermit.html',                 label:'Edit',  param:'true', resolveController: true, documentType :'IRCC', resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/CP/:identifier/edit',            {templateUrl: 'views/forms/edit/edit-absCheckpoint.html',             label:'Edit',  param:'true', resolveController: true, documentType :'CP'  , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/CPC/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-absCheckpointCommunique.html',   label:'Edit',  param:'true', resolveController: true, documentType :'CPC' , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/NR/:identifier/edit',            {templateUrl: 'views/forms/edit/edit-absNationalReport.html',         label:'Edit',  param:'true', resolveController: true, documentType :'NR'  , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/CBI/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-capacityBuildingInitiative.html',label:'Edit',  param:'true', resolveController: true, documentType :'CBI' , resolve : { securized : commonRoutes.securize(null, null, true) }, }).
               whenAsync('/register/A19A20/:identifier/edit',        {templateUrl: 'views/forms/edit/edit-modelContractualClause.html',    label:'Edit',  param:'true', resolveController: true, documentType :'A19A20' , resolve : { securized : commonRoutes.securize(null, null, true) }, }).
               whenAsync('/register/CPP/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-communityProtocol.html',         label:'Edit',  param:'true', resolveController: true, documentType :'CPP' , resolve : { securized : commonRoutes.securize(null, null, true) }, }).
               whenAsync('/register/ORG/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-organization.html',              label:'Edit',  param:'true', resolveController: true, documentType :'ORG' , resolve : { securized : commonRoutes.securize(null, null, true) }, }).

               whenAsync('/workshops/lac',               { templateUrl: 'views/workshops/lac.html',            label:'Workshops',            resolveController: true, resolveUser: true}).
               whenAsync('/workshops/caribbean',         { templateUrl: 'views/workshops/caribbean.html',      label:'Workshops',        resolveController: true, resolveUser: true}).
               
               whenAsync('/about/faq',                   { redirectTo : '/help/faq'}).
               whenAsync('/guides',                      {redirectTo: '/help/guides'}).
               whenAsync('/commonformats',               {redirectTo:'/help/common-formats'}).
               whenAsync('/nationalreport',              {redirectTo:'/help/national-report'}).               
               whenAsync('/about',                        {redirectTo  : '/help/about'}).
               whenAsync('/about/blog',                   {redirectTo  : '/help/about'}).
               whenAsync('/help',                         {redirectTo  : '/help/about'}).
               whenAsync('/help/faq',                     {redirectTo  : '/help/faqs'}).

               whenAsync('/help/about',                   { templateUrl: 'views/about/about.html',                        label:'About the ABSCH',             reloadOnSearch : false,    resolveController:true, resolveUser : true}).
               whenAsync('/help/about/blog',              { templateUrl: 'views/about/blog.html',                        label:'ABSCH Development Blog',                 resolveController:true, resolveUser : true}).
               whenAsync('/help/videos/:videoId?',   {templateUrl: 'views/about/videos.html', resolveController: true, resolveUser: false, label:'ABSCH Videos'}).
               whenAsync('/help/guides/:guideId?',   {templateUrl: 'views/about/guides.html', resolveController: true, resolveUser: false, label:'Step-by-step guides'}).
               whenAsync('/help/common-formats/:commonFormat?',     {templateUrl: 'views/about/common-formats.html', resolveController: true, resolveUser: true, label:'Common formats'}).
               whenAsync('/help/national-report',    {templateUrl: 'views/about/nr-faq.html', resolveController: true, resolveUser: true, label:'Information on the Interim National Report'}).
               whenAsync('/help/faqs',               {templateUrl: 'views/about/faq.html', resolveController: true, resolveUser: true, label:'FAQs'}).


               whenAsync('/about/getting-started',                   { templateUrl: 'views/about/getting-started.html',                        label:'Getting Started Using the ABSCH',             reloadOnSearch : false,    resolveController:true, resolveUser : true}).

               whenAsync('/developer',    {templateUrl: 'views/help/developer/developer.html', resolveController: true, resolveUser: true, label:'ABSCH for developers'}).                  
               
               otherwise({templateUrl: commonRoutes.baseUrl+'views/shared/404.html', label:'404 Error'});

    }]);


    

});
