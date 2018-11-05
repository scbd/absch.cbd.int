define(['app', './common-routes'], function (app, commonRoutes) { 'use strict';

    app.value("showHelp", { value : false });

    app.config(['$routeProvider', function ($routeProvider) {
        
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

               whenAsync('/register/MSR/new',           {templateUrl: 'views/forms/edit/abs/edit-measure.html',                   label:'New',  param:'true', resolveController: true,documentType :'MSR' , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/NDB/new',           {templateUrl: 'views/forms/edit/edit-database.html',                  label:'New',  param:'true', resolveController: true,documentType :'NDB' , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/IRCC/new',          {templateUrl: 'views/forms/edit/abs/edit-absPermit.html',                 label:'New',  param:'true', resolveController: true,documentType :'IRCC', resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/CP/new',            {templateUrl: 'views/forms/edit/abs/edit-absCheckpoint.html',             label:'New',  param:'true', resolveController: true,documentType :'CP'  , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/PRO/new',            {templateUrl: 'views/forms/edit/abs/edit-absProcedure.html',             label:'New',  param:'true', resolveController: true,documentType :'PRO'  , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/CPC/new',           {templateUrl: 'views/forms/edit/abs/edit-absCheckpointCommunique.html',   label:'New',  param:'true', resolveController: true,documentType :'CPC' , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/NR/new',            {templateUrl: 'views/forms/edit/abs/edit-absNationalReport.html',         label:'New',  param:'true', resolveController: true,documentType :'NR'  , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/CBI/new',           {templateUrl: 'views/forms/edit/edit-capacityBuildingInitiative.html',          label:'New',  param:'true', resolveController: true, documentType :'CBI' ,       resolve : { securized : commonRoutes.securize(null, null, true) }, }).
               whenAsync('/register/A19A20/new',        {templateUrl: 'views/forms/edit/edit-modelContractualClause.html',              label:'New',  param:'true', resolveController: true, documentType :'A19A20',     resolve : { securized : commonRoutes.securize(null, null, true) }, }).
               whenAsync('/register/CPP/new',           {templateUrl: 'views/forms/edit/edit-communityProtocol.html',                   label:'New',  param:'true', resolveController: true, documentType :'CPP' ,       resolve : { securized : commonRoutes.securize(null, null, true) }, }).
               whenAsync('/register/NMCC/new',           {templateUrl: 'views/forms/edit/abs/edit-abs-national-model-contractual-clause.html',  label:'New',  param:'true', resolveController: true, documentType :'NMCC' ,      resolve : { securized : commonRoutes.securize(null, null, true) }, }).

               whenAsync('/register/MSR/:identifier/edit',           {templateUrl: 'views/forms/edit/abs/edit-measure.html',                   label:'Edit',  param:'true', resolveController: true, documentType :'MSR' , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/NDB/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-database.html',                  label:'Edit',  param:'true', resolveController: true, documentType :'NDB' , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/IRCC/:identifier/edit',          {templateUrl: 'views/forms/edit/abs/edit-absPermit.html',                 label:'Edit',  param:'true', resolveController: true, documentType :'IRCC', resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/CP/:identifier/edit',            {templateUrl: 'views/forms/edit/abs/edit-absCheckpoint.html',             label:'Edit',  param:'true', resolveController: true, documentType :'CP'  , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/PRO/:identifier/edit',            {templateUrl: 'views/forms/edit/abs/edit-absProcedure.html',             label:'Edit',  param:'true', resolveController: true, documentType :'PRO'  , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/CPC/:identifier/edit',           {templateUrl: 'views/forms/edit/abs/edit-absCheckpointCommunique.html',   label:'Edit',  param:'true', resolveController: true, documentType :'CPC' , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/NR/:identifier/edit',            {templateUrl: 'views/forms/edit/abs/edit-absNationalReport.html',         label:'Edit',  param:'true', resolveController: true, documentType :'NR'  , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/CBI/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-capacityBuildingInitiative.html',label:'Edit',  param:'true', resolveController: true, documentType :'CBI' , resolve : { securized : commonRoutes.securize(null, null, true) }, }).
               whenAsync('/register/A19A20/:identifier/edit',        {templateUrl: 'views/forms/edit/edit-modelContractualClause.html',    label:'Edit',  param:'true', resolveController: true, documentType :'A19A20' , resolve : { securized : commonRoutes.securize(null, null, true) }, }).
               whenAsync('/register/CPP/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-communityProtocol.html',         label:'Edit',  param:'true', resolveController: true, documentType :'CPP' , resolve : { securized : commonRoutes.securize(null, null, true) }, }).
               whenAsync('/register/ORG/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-organization.html',              label:'Edit',  param:'true', resolveController: true, documentType :'ORG' , resolve : { securized : commonRoutes.securize(null, null, true) }, }).
               whenAsync('/register/NMCC/:identifier/edit',          {templateUrl: 'views/forms/edit/abs/edit-abs-national-model-contractual-clause.html',  label:'Edit',  param:'true', resolveController: true, documentType :'NMCC'  , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               
            //    whenAsync('/workshops/lac',               { templateUrl: 'views/workshops/lac.html',            label:'Workshops',            resolveController: true, resolveUser: true}).
            //    whenAsync('/workshops/caribbean',         { templateUrl: 'views/workshops/caribbean.html',      label:'Workshops',        resolveController: true, resolveUser: true}).
               
               whenAsync('/guides',                      {redirectTo: '/about/guides'}).
               whenAsync('/faqs',                        {redirectTo: '/about/faqs'}).
               whenAsync('/commonformats',               {redirectTo: '/about/offline'}).
               whenAsync('/common-formats',              {redirectTo: '/about/offline'}).
               whenAsync('/nationalreport',              {redirectTo: '/about/interimReport'}).               
               whenAsync('/help',                        {redirectTo  : '/about'}).
               whenAsync('/help/faq',                    {redirectTo  : '/about/faqs'}).
               whenAsync('/help/guides',                 {redirectTo  : '/about/guides'}).
               whenAsync('/help/about',                  {redirectTo  : '/about'}).
               whenAsync('/help/national-report',        {redirectTo  : '/about/interimReport'}).
               whenAsync('/help/guides/:guideId?',       {redirectTo  : '/about/guide/:guideId?'}).
               whenAsync('/about/getting-started',       {redirectTo  : '/about/gettingStartedGovernments'}).
               whenAsync('/about/developer',             {redirectTo  : '/about/api'}).
               whenAsync('/about/videos',            {redirectTo  : '/help/videos'}).

               whenAsync('/help/videos/:videoId?',   {templateUrl: 'views/about/videos.html', resolveController: true, resolveUser: false, label:'ABSCH Videos'}).
               whenAsync('/help/common-formats/:commonFormat?',     {templateUrl: 'views/about/common-formats.html', resolveController: true, resolveUser: true, label:'Common formats'}).

               whenAsync('/about/',           { templateUrl: 'views/about/about.html',   label:'About the ABSCH', resolveController:true, resolveUser : false}).
               whenAsync('/about/:id',        { templateUrl: 'views/about/about.html',   label:'aboutCode',       param:'true',  resolveController:true, resolveUser : false}).
               whenAsync('/about/:id/:guide', { templateUrl: 'views/about/about.html',   param:'true',   resolveController:true, resolveUser : false}).


               otherwise({templateUrl: commonRoutes.baseUrl+'views/shared/404.html', label:'404 Error'});

    }]);


    

});
