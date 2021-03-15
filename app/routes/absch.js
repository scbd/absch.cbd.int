import app from "app";
import commonRoutes from "./common-routes";
import { securize, resolveLiteral, mapView, currentUser, importQ, injectRouteParams } from './mixin';
import * as angularViewWrapper from '~/views/shared/angular-view-wrapper'

app.value("showHelp", {
  value: false
});

const abschRouteUrls = {
   theAbs                                         : { component: ()=>import('~/views/home/index') },
   forums                                         : { component: ()=>import('~/views/forums/forum-list-view') },
   forums_cc                                      : { component: ()=>import('~/views/forums/thread-list-view') },
   post_list_view                                 : { component: ()=>import('~/views/forums/post-list-view') },   
   register_admin_ircc_counts                     : { component: ()=>import('~/views/register/admin/ircc-counts') },
   register_MSR_edit                   : { component: ()=>import('~/views/forms/edit/abs/edit-measure') },
   register_NDB_edit                   : { component: ()=>import('~/views/forms/edit/edit-database') },
   register_IRCC_edit                  : { component: ()=>import('~/views/forms/edit/abs/edit-absPermit') },
   register_CP_edit                    : { component: ()=>import('~/views/forms/edit/abs/edit-absCheckpoint') },
   register_PRO_edit                   : { component: ()=>import('~/views/forms/edit/abs/edit-absProcedure') },
   register_CPC_edit                   : { component: ()=>import('~/views/forms/edit/abs/edit-absCheckpointCommunique') },
   register_NR_edit                    : { component: ()=>import('~/views/forms/edit/abs/edit-absNationalReport') },
   register_CBI_edit                   : { component: ()=>import('~/views/forms/edit/edit-capacityBuildingInitiative') },
   register_A19A20_edit                : { component: ()=>import('~/views/forms/edit/edit-modelContractualClause') },
   register_CPP_edit                   : { component: ()=>import('~/views/forms/edit/edit-communityProtocol') },
   register_ORG_edit                   : { component: ()=>import('~/views/forms/edit/edit-organization') },
   register_NMCC_edit                  : { component: ()=>import('~/views/forms/edit/abs/edit-abs-national-model-contractual-clause') },
   help_videos_videoId                            : { component: ()=>import('~/views/about/videos') },
  //  help_common_formats_commonFormat               : { component: ()=>import('~/views/about/common-formats') },
   about                                         : { component: ()=>import('~/views/about/about') },
   pdf_templates_contacts_schema                  : { component: ()=>import('~/views/pdf-templates/abs-contacts-pdf') },
   pdf_templates_checkpoint_communique_documentId : { component: ()=>import('~/views/pdf-templates/checkpoint-communique') },
   pdf_templates_ircc_documentId                  : { component: ()=>import('~/views/pdf-templates/ircc') },
};

app.config(["$routeProvider", function ($routeProvider) {
  $routeProvider.
  whenAsync('/',                                                  { ...mapView(angularViewWrapper),                    "label":"ABSCH","resolveController":true,"resolveUser":true,"resolve":{ ...abschRouteUrls.theAbs,                                                            }}). 
  whenAsync('/partners/idlo/events',                              { ...mapView(angularViewWrapper),                    "label":"IDLO","resolveController":false,"resolveUser":false,"resolve":{ ...abschRouteUrls.partners_idlo_events,                                        }}). 
  whenAsync('/forums',                                            { ...mapView(angularViewWrapper),                    "label":"Forums","resolveController":true,"resolve":{ ...abschRouteUrls.forums,                                                      "securized":securize()}}). 
  whenAsync('/forums/cc',                                         { ...mapView(angularViewWrapper),                    "label":"Compliance Committee 3","resolveController":true,"resolve":{ ...abschRouteUrls.forums_cc,                                                   "securized":securize()},"forumId":17451,"postUrl":"/forums/cc","text":"Compliance Committee 3"}). 
  whenAsync('/forums/cc/:threadId',                               { ...mapView(angularViewWrapper),                    "label":"Thread-Subject","resolveController":true,"resolve":{ ...abschRouteUrls.post_list_view ,                                          "securized":securize()},"forumId":17451,"forumListUrl":"/forums/cc/","text":"Compliance Committee 3"}). 
  whenAsync('/forums/iac4',                                       { ...mapView(angularViewWrapper),                    "label":"IAC 4","resolveController":true,"resolve":{ ...abschRouteUrls.forums_list_view,                                                 "securized":securize()},"forumId":17607,"postUrl":"/forums/iac4","text":"IAC 4"}). 
  whenAsync('/forums/iac4/:threadId',                             { ...mapView(angularViewWrapper),                    "label":"Thread-Subject","resolveController":true,"resolve":{ ...abschRouteUrls.post_list_view ,                                        "securized":securize()},"forumId":17607,"forumListUrl":"/forums/iac4/","text":"IAC 4"}). 
  whenAsync('/forums/iac',                                        { ...mapView(angularViewWrapper),                    "label":"IAC","resolveController":true,"resolve":{ ...abschRouteUrls.forums_list_view ,                                                  "securized":securize()},"forumId":17433,"postUrl":"/forums/iac","text":"IAC"}). 
  whenAsync('/forums/iac/:threadId',                              { ...mapView(angularViewWrapper),                    "label":"Thread-Subject","resolveController":true,"resolve":{ ...abschRouteUrls.post_list_view ,                                         "securized":securize()},"forumId":17433,"forumListUrl":"/forums/iac/","text":"IAC"}). 
  whenAsync('/forums/ahteg-dsi',                                  { ...mapView(angularViewWrapper),                    "label":"AHTEG on DSI","resolveController":true,"resolve":{ ...abschRouteUrls.forums_list_view ,                                            "securized":securize()},"forumId":17446,"postUrl":"/forums/ahteg-dsi","text":"AHTEG on DSI"}). 
  whenAsync('/forums/ahteg-dsi/:threadId',                        { ...mapView(angularViewWrapper),                    "label":"Thread-Subject","resolveController":true,"resolve":{ ...abschRouteUrls.post_list_view ,                                   "securized":securize()},"forumId":17446,"forumListUrl":"/forums/ahteg-dsi/","text":"AHTEG on DSI"}). 
  whenAsync('/forums/vlr',                                        { ...mapView(angularViewWrapper),                    "label":"VLR","resolveController":true,"resolve":{ ...abschRouteUrls.forums_list_view ,                                                  "securized":securize()},"forumId":17384,"postUrl":"/forums/vlr","text":"VLR"}). 
  whenAsync('/forums/vlr/:threadId',                              { ...mapView(angularViewWrapper),                    "label":"Thread-Subject","resolveController":true,"resolve":{ ...abschRouteUrls.post_list_view ,                                         "securized":securize()},"forumId":17384,"forumListUrl":"/forums/vlr/","text":"VLR"}). 
  whenAsync('/forums/caribbean',                                  { ...mapView(angularViewWrapper),                    "label":"Caribbean","resolveController":true,"resolve":{ ...abschRouteUrls.forums_list_view ,                                            "securized":securize()},"forumId":17378,"postUrl":"/forums/caribbean","text":"Caribbean Region Forum"}). 
  whenAsync('/forums/caribbean/:threadId',                        { ...mapView(angularViewWrapper),                    "label":"Thread-Subject","resolveController":true,"resolve":{ ...abschRouteUrls.post_list_view ,                                   "securized":securize()},"forumId":17378,"forumListUrl":"/forums/caribbean/","text":"Caribbean Region Forum"}). 
  whenAsync('/forums/art10_groups',                               { ...mapView(angularViewWrapper),                    "label":"Art 10 Groups","resolveController":true,"resolve":{ ...abschRouteUrls.forums_list_view ,                                         "securized":securize()},"forumId":17316,"postUrl":"/forums/art10_groups","text":"Forum on Article 10"}). 
  whenAsync('/forums/art10_groups/:threadId',                     { ...mapView(angularViewWrapper),                    "label":"Thread-Subject","resolveController":true,"resolve":{ ...abschRouteUrls.post_list_view ,                                "securized":securize()},"forumId":17316,"forumListUrl":"/forums/art10_groups/","text":"Forum on Article 10"}). 
  whenAsync('/register/admin/ircc-counts',                        { ...mapView(angularViewWrapper),                    "label":"IRCC counts","param":"true","resolveController":true,"resolve":{ ...abschRouteUrls.register_admin_ircc_counts,                                  "securized":securize(['Administrator'])}}). 
  whenAsync('/register/MSR/new',                                  { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"MSR","resolve":{ ...abschRouteUrls.register_MSR_edit,                                            "securized":securize(null,true,true)}}). 
  whenAsync('/register/NDB/new',                                  { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"NDB","resolve":{ ...abschRouteUrls.register_NDB_edit,                                            "securized":securize(null,true,true)}}). 
  whenAsync('/register/IRCC/new',                                 { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"IRCC","resolve":{ ...abschRouteUrls.register_IRCC_edit,                                           "securized":securize(null,true,true)}}). 
  whenAsync('/register/CP/new',                                   { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"CP","resolve":{ ...abschRouteUrls.register_CP_edit,                                             "securized":securize(null,true,true)}}). 
  whenAsync('/register/PRO/new',                                  { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"PRO","resolve":{ ...abschRouteUrls.register_PRO_edit,                                            "securized":securize(null,true,true)}}). 
  whenAsync('/register/CPC/new',                                  { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"CPC","resolve":{ ...abschRouteUrls.register_CPC_edit,                                            "securized":securize(null,true,true)}}). 
  whenAsync('/register/NR/new',                                   { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"NR","resolve":{ ...abschRouteUrls.register_NR_edit,                                             "securized":securize(null,true,true)}}). 
  whenAsync('/register/CBI/new',                                  { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"CBI","resolve":{ ...abschRouteUrls.register_CBI_edit,                                            "securized":securize(null,true,true)}}). 
  whenAsync('/register/A19A20/new',                               { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"A19A20","resolve":{ ...abschRouteUrls.register_A19A20_edit,                                         "securized":securize(null,true,true)}}). 
  whenAsync('/register/CPP/new',                                  { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"CPP","resolve":{ ...abschRouteUrls.register_CPP_edit,                                            "securized":securize(null,true,true)}}). 
  whenAsync('/register/NMCC/new',                                 { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"NMCC","resolve":{ ...abschRouteUrls.register_NMCC_edit,                                           "securized":securize(null,true,true)}}). 
  whenAsync('/register/MSR/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"MSR","resolve":{ ...abschRouteUrls.register_MSR_edit,                                "securized":securize(null,true,true)}}). 
  whenAsync('/register/NDB/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"NDB","resolve":{ ...abschRouteUrls.register_NDB_edit,                                "securized":securize(null,true,true)}}). 
  whenAsync('/register/IRCC/:identifier/edit',                    { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"IRCC","resolve":{ ...abschRouteUrls.register_IRCC_edit,                               "securized":securize(null,true,true)}}). 
  whenAsync('/register/CP/:identifier/edit',                      { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"CP","resolve":{ ...abschRouteUrls.register_CP_edit,                                 "securized":securize(null,true,true)}}). 
  whenAsync('/register/PRO/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"PRO","resolve":{ ...abschRouteUrls.register_PRO_edit,                                "securized":securize(null,true,true)}}). 
  whenAsync('/register/CPC/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"CPC","resolve":{ ...abschRouteUrls.register_CPC_edit,                                "securized":securize(null,true,true)}}). 
  whenAsync('/register/NR/:identifier/edit',                      { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"NR","resolve":{ ...abschRouteUrls.register_NR_edit,                                 "securized":securize(null,true,true)}}). 
  whenAsync('/register/CBI/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"CBI","resolve":{ ...abschRouteUrls.register_CBI_edit,                                "securized":securize(null,true,true)}}). 
  whenAsync('/register/A19A20/:identifier/edit',                  { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"A19A20","resolve":{ ...abschRouteUrls.register_A19A20_edit,                             "securized":securize(null,true,true)}}). 
  whenAsync('/register/CPP/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"CPP","resolve":{ ...abschRouteUrls.register_CPP_edit,                                "securized":securize(null,true,true)}}). 
  whenAsync('/register/ORG/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"ORG","resolve":{ ...abschRouteUrls.register_ORG_edit,                                "securized":securize(null,true,true)}}). 
  whenAsync('/register/NMCC/:identifier/edit',                    { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"NMCC","resolve":{ ...abschRouteUrls.register_NMCC_edit,                               "securized":securize(null,true,true)}}). 
  whenAsync('/guides',                                            {"redirectTo":"/about/guides"}). 
  whenAsync('/faqs',                                              {"redirectTo":"/about/faqs"}). 
  whenAsync('/commonformats',                                     {"redirectTo":"/about/offline"}). 
  whenAsync('/common-formats',                                    {"redirectTo":"/about/offline"}). 
  whenAsync('/nationalreport',                                    {"redirectTo":"/about/interimReport"}). 
  whenAsync('/help',                                              {"redirectTo":"/about"}). 
  whenAsync('/help/faq',                                          {"redirectTo":"/about/faqs"}). 
  whenAsync('/help/guides',                                       {"redirectTo":"/about/guides"}). 
  whenAsync('/help/about',                                        {"redirectTo":"/about"}). 
  whenAsync('/help/national-report',                              {"redirectTo":"/about/interimReport"}). 
  whenAsync('/help/guides/:guideId?',                             {"redirectTo":"/about/guide/:guideId?"}). 
  whenAsync('/about/getting-started',                             {"redirectTo":"/about/gettingStartedGovernments"}). 
  whenAsync('/about/developer',                                   {"redirectTo":"/about/api"}). 
  whenAsync('/about/videos',                                      {"redirectTo":"/help/videos"}). 
  whenAsync('/about/commonformats',                               {"redirectTo":"/about/offline"}). 
  whenAsync('/about/common-formats',                              {"redirectTo":"/about/offline"}). 
  whenAsync('/help/videos/:videoId?',                             { ...mapView(angularViewWrapper),                    "resolveController":true,"resolveUser":false,"label":"ABSCH Videos","resolve":{ ...abschRouteUrls.help_videos_videoId,                                         }}). 
  // whenAsync('/help/common-formats/:commonFormat?',                { ...mapView(angularViewWrapper),                    "resolveController":true,"resolveUser":true,"label":"Common formats","resolve":{ ...abschRouteUrls.help_common_formats_commonFormat,                            }}). 
  whenAsync('/about/',                                            { ...mapView(angularViewWrapper),                    "label":"About the ABSCH","resolveController":true,"resolveUser":false,"resolve":{ ...abschRouteUrls.about,                                                      }}). 
  whenAsync('/about/:id',                                         { ...mapView(angularViewWrapper),                    "label":"aboutCode","param":"true","resolveController":true,"resolveUser":false,"resolve":{ ...abschRouteUrls.about,                                                    }}). 
  whenAsync('/about/:id/:type',                                   { ...mapView(angularViewWrapper),                    "param":"true","resolveController":true,"resolveUser":false,"resolve":{ ...abschRouteUrls.about,                                               }}). 
  whenAsync('/pdf-templates/contacts/:schema',                    { ...mapView(angularViewWrapper),                    "resolveController":true,"resolveUser":false,"label":"ABSCH Contact","resolve":{ ...abschRouteUrls.pdf_templates_contacts_schema,                               }}). 
  whenAsync('/pdf-templates/checkpoint-communique/:documentId',   { ...mapView(angularViewWrapper),                    "resolveController":true,"resolveUser":false,"label":"Checkpoint Commnunique","resolve":{ ...abschRouteUrls.pdf_templates_checkpoint_communique_documentId,              }}). 
  whenAsync('/pdf-templates/ircc/:documentId',                    { ...mapView(angularViewWrapper),                    "resolveController":true,"resolveUser":false,"label":"IRCC","resolve":{ ...abschRouteUrls.pdf_templates_ircc_documentId,                               }}). 
  otherwise({ templateUrl: commonRoutes.baseUrl + "views/shared/404.html", label: "404 Error" });

}]);
