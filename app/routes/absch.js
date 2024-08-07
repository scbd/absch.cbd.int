import app from '~/app';
import commonRoutes from "./common-routes";
import { securize, asyncLogError, mapView } from './mixin';
import * as angularViewWrapper from '~/views/shared/angular-view-wrapper'
import routesLabelsTranslations from '~/app-text/routes/abs-route-labels.json';
import { mergeTranslationKeys } from '../services/translation-merge';
import * as theAbs from '~/views/home/index';

app.value("showHelp", {
  value: false
});
const routesLabels = mergeTranslationKeys(routesLabelsTranslations);
const abschRouteUrls = {
   theAbs,
   register_admin_ircc_counts          : { component: ()=>asyncLogError(import('~/views/register/admin/ircc-counts')) },
   register_MSR_edit                   : { component: ()=>asyncLogError(import('~/views/forms/edit/abs/edit-measure')) },
  //  register_SMSR_edit                   : { component: ()=>asyncLogError(import('~/views/forms/edit/abs/edit-measure-status')) },
   register_NDB_edit                   : { component: ()=>asyncLogError(import('~/views/forms/edit/edit-database')) },
   register_IRCC_edit                  : { component: ()=>asyncLogError(import('~/views/forms/edit/abs/edit-absPermit')) },
   register_CP_edit                    : { component: ()=>asyncLogError(import('~/views/forms/edit/abs/edit-absCheckpoint')) },
   register_PRO_edit                   : { component: ()=>asyncLogError(import('~/views/forms/edit/abs/edit-absProcedure')) },
   register_CPC_edit                   : { component: ()=>asyncLogError(import('~/views/forms/edit/abs/edit-absCheckpointCommunique')) },
   register_NR_edit                    : { component: ()=>asyncLogError(import('~/views/forms/edit/abs/edit-absNationalReport')) },
   register_NR1_edit                    : { component: ()=>asyncLogError(import('~/views/forms/edit/abs/edit-national-report-1')) },
   register_CDI_edit                   : { component: ()=>asyncLogError(import('~/views/forms/edit/edit-capacityBuildingInitiative')) },
   register_A19A20_edit                : { component: ()=>asyncLogError(import('~/views/forms/edit/edit-modelContractualClause')) },
   register_CPP_edit                   : { component: ()=>asyncLogError(import('~/views/forms/edit/edit-communityProtocol')) },
   register_ORG_edit                   : { component: ()=>asyncLogError(import('~/views/forms/edit/edit-organization')) },
   register_NMCC_edit                  : { component: ()=>asyncLogError(import('~/views/forms/edit/abs/edit-abs-national-model-contractual-clause')) },
   help_videos_videoId                            : { component: ()=>asyncLogError(import('~/views/about/videos')) },
  //  help_common_formats_commonFormat            : { component: ()=>asyncLogError(import('~/views/about/common-formats')) },
   about                                          : { component: ()=>asyncLogError(import('~/views/about/about')) },
   pdf_templates_contacts_schema                  : { component: ()=>asyncLogError(import('~/views/pdf-templates/abs-contacts-pdf')) },
   pdf_templates_checkpoint_communique_documentId : { component: ()=>asyncLogError(import('~/views/pdf-templates/checkpoint-communique')) },
   pdf_templates_ircc_documentId                  : { component: ()=>asyncLogError(import('~/views/pdf-templates/ircc')) },
};

app.config(["$routeProvider", function ($routeProvider) {
  $routeProvider.
  whenAsync('/',                                                  { ...mapView(abschRouteUrls.theAbs),                 "label":routesLabels.theAbs,"resolveController":true,"resolveUser":true}).
  whenAsync('/partners/idlo/events',                              { ...mapView(angularViewWrapper),                    "label":routesLabels.idlo,"resolveController":false,"resolveUser":false,"resolve":{ ...abschRouteUrls.partners_idlo_events,                                        }}).
  whenAsync('/forums',                                            { redirectTo: "portals/forums", }).
  whenAsync('/forums/cc',                                         { redirectTo: "portals/forums/cc3" }).
  whenAsync('/forums/cc/:threadId',                               { redirectTo: "portals/forums/cc3/thread/:threadId"}).
  whenAsync('/forums/iac4',                                       { redirectTo: "portals/forums/absch-iac/forums/iac4"}).
  whenAsync('/forums/iac4/:threadId',                             { redirectTo: "portals/forums/absch-iac/forums/iac4/thread/:threadId" }).
  whenAsync('/forums/iac',                                        { redirectTo: "portals/forums/absch-iac/forums/iac3" }).
  whenAsync('/forums/iac/:threadId',                              { redirectTo: "portals/forums/absch-iac/forums/iac3/thread/:threadId"}).
  whenAsync('/forums/ahteg-dsi',                                  { redirectTo: "portals/forums/dsi-ahteg" }).
  whenAsync('/forums/ahteg-dsi/:threadId',                        { redirectTo: "portals/forums/dsi-ahteg/thread/:threadId"}).
  // whenAsync('/forums/vlr',                                        { redirectTo: "portals/forums/", "forumId":17384 }).
  // whenAsync('/forums/vlr/:threadId',                              { redirectTo: "portals/forums//threads/:threadId", "forumId":17384 }).
  // whenAsync('/forums/caribbean',                                  { redirectTo: "portals/forums/", "forumId":17378 }).
  // whenAsync('/forums/caribbean/:threadId',                        { redirectTo: "portals/forums//threads/:threadId", "forumId":17378 }).
  whenAsync('/forums/art10_groups',                               { redirectTo: "portals/forums/article-10" }).
  whenAsync('/forums/art10_groups/:threadId',                     { redirectTo: "portals/forums/article-10/threads/:threadId" }).
  whenAsync('/register/admin/ircc-counts',                        { ...mapView(angularViewWrapper),                    "label":routesLabels.irccCounts,"param":"true","resolveController":true,"resolve":{ ...abschRouteUrls.register_admin_ircc_counts,                                  "securized":securize(['Administrator'])}}).
  whenAsync('/register/MSR/new',                                  { ...mapView(angularViewWrapper),                    "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"MSR","resolve":{ ...abschRouteUrls.register_MSR_edit,                                            "securized":securize(null,true,true)}}).
  // whenAsync('/register/SMSR/new',                                 { ...mapView(angularViewWrapper),                    "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"SMSR","resolve":{ ...abschRouteUrls.register_SMSR_edit,                                            "securized":securize(null,true,true)}}).
  whenAsync('/register/NDB/new',                                  { ...mapView(angularViewWrapper),                    "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"NDB","resolve":{ ...abschRouteUrls.register_NDB_edit,                                            "securized":securize(null,true,true)}}).
  whenAsync('/register/IRCC/new',                                 { ...mapView(angularViewWrapper),                    "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"IRCC","resolve":{ ...abschRouteUrls.register_IRCC_edit,                                           "securized":securize(null,true,true)}}).
  whenAsync('/register/CP/new',                                   { ...mapView(angularViewWrapper),                    "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"CP","resolve":{ ...abschRouteUrls.register_CP_edit,                                             "securized":securize(null,true,true)}}).
  whenAsync('/register/PRO/new',                                  { ...mapView(angularViewWrapper),                    "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"PRO","resolve":{ ...abschRouteUrls.register_PRO_edit,                                            "securized":securize(null,true,true)}}).
  whenAsync('/register/CPC/new',                                  { ...mapView(angularViewWrapper),                    "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"CPC","resolve":{ ...abschRouteUrls.register_CPC_edit,                                            "securized":securize(null,true,true)}}).
  whenAsync('/register/NR/new',                                   { ...mapView(angularViewWrapper),                    "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"NR","resolve":{ ...abschRouteUrls.register_NR_edit,                                             "securized":securize(null,true,true)}}).
  whenAsync('/register/NR1/new',                                   { ...mapView(angularViewWrapper),                    "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"NR1","resolve":{ ...abschRouteUrls.register_NR1_edit,                                             "securized":securize(null,true,true)}}).
  whenAsync('/register/CDI/new',                                  { ...mapView(angularViewWrapper),                    "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"CDI","resolve":{ ...abschRouteUrls.register_CDI_edit,                                            "securized":securize(null,true,true)}}).
  whenAsync('/register/A19A20/new',                               { ...mapView(angularViewWrapper),                    "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"A19A20","resolve":{ ...abschRouteUrls.register_A19A20_edit,                                         "securized":securize(null,true,true)}}).
  whenAsync('/register/CPP/new',                                  { ...mapView(angularViewWrapper),                    "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"CPP","resolve":{ ...abschRouteUrls.register_CPP_edit,                                            "securized":securize(null,true,true)}}).
  whenAsync('/register/NMCC/new',                                 { ...mapView(angularViewWrapper),                    "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"NMCC","resolve":{ ...abschRouteUrls.register_NMCC_edit,                                           "securized":securize(null,true,true)}}).
  whenAsync('/register/MSR/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":routesLabels.edit,"param":"true","resolveController":true,"documentType":"MSR","resolve":{ ...abschRouteUrls.register_MSR_edit,                                "securized":securize(null,true,true)}}).
  // whenAsync('/register/SMSR/:identifier/edit',                     { ...mapView(angularViewWrapper),                   "label":routesLabels.edit, "param":"true","resolveController":true,"documentType":"SMSR","resolve":{ ...abschRouteUrls.register_SMSR_edit,                                "securized":securize(null,true,true)}}).
  whenAsync('/register/NDB/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":routesLabels.edit,"param":"true","resolveController":true,"documentType":"NDB","resolve":{ ...abschRouteUrls.register_NDB_edit,                                "securized":securize(null,true,true)}}).
  whenAsync('/register/IRCC/:identifier/edit',                    { ...mapView(angularViewWrapper),                    "label":routesLabels.edit,"param":"true","resolveController":true,"documentType":"IRCC","resolve":{ ...abschRouteUrls.register_IRCC_edit,                               "securized":securize(null,true,true)}}).
  whenAsync('/register/CP/:identifier/edit',                      { ...mapView(angularViewWrapper),                    "label":routesLabels.edit,"param":"true","resolveController":true,"documentType":"CP","resolve":{ ...abschRouteUrls.register_CP_edit,                                 "securized":securize(null,true,true)}}).
  whenAsync('/register/PRO/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":routesLabels.edit,"param":"true","resolveController":true,"documentType":"PRO","resolve":{ ...abschRouteUrls.register_PRO_edit,                                "securized":securize(null,true,true)}}).
  whenAsync('/register/CPC/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":routesLabels.edit,"param":"true","resolveController":true,"documentType":"CPC","resolve":{ ...abschRouteUrls.register_CPC_edit,                                "securized":securize(null,true,true)}}).
  whenAsync('/register/NR/:identifier/edit',                      { ...mapView(angularViewWrapper),                    "label":routesLabels.edit,"param":"true","resolveController":true,"documentType":"NR","resolve":{ ...abschRouteUrls.register_NR_edit,                                 "securized":securize(null,true,true)}}).
  whenAsync('/register/NR1/:identifier/edit',                      { ...mapView(angularViewWrapper),                    "label":routesLabels.edit,"param":"true","resolveController":true,"documentType":"NR1","resolve":{ ...abschRouteUrls.register_NR1_edit,                                 "securized":securize(null,true,true)}}).
  whenAsync('/register/CDI/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":routesLabels.edit,"param":"true","resolveController":true,"documentType":"CDI","resolve":{ ...abschRouteUrls.register_CDI_edit,                                "securized":securize(null,true,true)}}).
  whenAsync('/register/A19A20/:identifier/edit',                  { ...mapView(angularViewWrapper),                    "label":routesLabels.edit,"param":"true","resolveController":true,"documentType":"A19A20","resolve":{ ...abschRouteUrls.register_A19A20_edit,                             "securized":securize(null,true,true)}}).
  whenAsync('/register/CPP/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":routesLabels.edit,"param":"true","resolveController":true,"documentType":"CPP","resolve":{ ...abschRouteUrls.register_CPP_edit,                                "securized":securize(null,true,true)}}).
  whenAsync('/register/ORG/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":routesLabels.edit,"param":"true","resolveController":true,"documentType":"ORG","resolve":{ ...abschRouteUrls.register_ORG_edit,                                "securized":securize(null,true,true)}}).
  whenAsync('/register/NMCC/:identifier/edit',                    { ...mapView(angularViewWrapper),                    "label":routesLabels.edit,"param":"true","resolveController":true,"documentType":"NMCC","resolve":{ ...abschRouteUrls.register_NMCC_edit,                               "securized":securize(null,true,true)}}).
  whenAsync('/guides',                                            {"redirectTo":"/kb/tags/getting-help/Step-by-step-guides/5bc4d04bd70fbc00017d1fd6"}). 
  whenAsync('/faqs',                                              {"redirectTo":"/about/faqs"}). 
  whenAsync('/commonformats',                                     {"redirectTo":"/about/offline"}). 
  whenAsync('/common-formats',                                    {"redirectTo":"/about/offline"}). 
  whenAsync('/nationalreport',                                    {"redirectTo":"/about/interimReport"}). 
  whenAsync('/help',                                              {"redirectTo":"/about"}). 
  whenAsync('/help/faq',                                          {"redirectTo":"/about/faqs"}). 
  whenAsync('/help/guides',                                       {"redirectTo":"/kb/tags/getting-help/Step-by-step-guides/5bc4d04bd70fbc00017d1fd6"}). 
  whenAsync('/help/about',                                        {"redirectTo":"/about"}). 
  whenAsync('/help/national-report',                              {"redirectTo":"/about/interimReport"}). 
  whenAsync('/help/guides/:guideId?',                             {"redirectTo":"/about/guide/:guideId?"}). 
  whenAsync('/about/getting-started',                             {"redirectTo":"/about/gettingStartedGovernments"}). 
  whenAsync('/about/developer',                                   {"redirectTo":"/about/api"}). 
  whenAsync('/about/videos',                                      {"redirectTo":"/help/videos"}). 
  whenAsync('/about/commonformats',                               {"redirectTo":"/about/offline"}). 
  whenAsync('/about/common-formats',                              {"redirectTo":"/about/offline"}). 
  whenAsync('/help/videos/:videoId?',                             { ...mapView(angularViewWrapper),                    "resolveController":true,"resolveUser":false,"label":routesLabels.absVideos,"resolve":{ ...abschRouteUrls.help_videos_videoId,                                         }}).
  // whenAsync('/help/common-formats/:commonFormat?',                { ...mapView(angularViewWrapper),                    "resolveController":true,"resolveUser":true,"label":"Common formats","resolve":{ ...abschRouteUrls.help_common_formats_commonFormat,                            }}). 
  whenAsync('/about/',                                            { ...mapView(angularViewWrapper),                    "label":routesLabels.aboutTheAbs,"resolveController":true,"resolveUser":false,"resolve":{ ...abschRouteUrls.about,                                                      }}).
  whenAsync('/about/:id',                                         { ...mapView(angularViewWrapper),                    "label":routesLabels.aboutCode,"param":"true","resolveController":true,"resolveUser":false,"resolve":{ ...abschRouteUrls.about,                                                    }}).
  whenAsync('/about/:id/:type',                                   { ...mapView(angularViewWrapper),                    "param":"true","resolveController":true,"resolveUser":false,"resolve":{ ...abschRouteUrls.about,                                               }}). 
  whenAsync('/pdf-templates/contacts/:schema',                    { ...mapView(angularViewWrapper),                    "resolveController":true,"resolveUser":false,"label":routesLabels.absContact,"resolve":{ ...abschRouteUrls.pdf_templates_contacts_schema,                               }}).
  whenAsync('/pdf-templates/checkpoint-communique/:documentId',   { ...mapView(angularViewWrapper),                    "resolveController":true,"resolveUser":false,"label":routesLabels.checkpointCommnunique,"resolve":{ ...abschRouteUrls.pdf_templates_checkpoint_communique_documentId,              }}).
  whenAsync('/pdf-templates/ircc/:documentId',                    { ...mapView(angularViewWrapper),                    "resolveController":true,"resolveUser":false,"label":routesLabels.ircc,"resolve":{ ...abschRouteUrls.pdf_templates_ircc_documentId,                               }}).
  otherwise({ templateUrl: commonRoutes.baseUrl + "views/shared/404.html", label: "404 Error" });

}]);
