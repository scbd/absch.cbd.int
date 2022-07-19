import app from "app";
import _ from "lodash";
import "angular-route";
import "services/main";
import "components/scbd-angularjs-services/main";
import routesLabels from '~/app-text/routes/common-routes-labels.json';
import { securize, resolveLiteral, mapView, currentUser, importQ, injectRouteParams } from './mixin';
import * as vueViewWrapper     from '~/views/shared/vue-view-wrapper'
import * as angularViewWrapper from '~/views/shared/angular-view-wrapper'

var baseUrl = require.toUrl("").replace(/\?v=.*$/, "");
var lang = window.scbdApp.lang;

const commonRouteUrls = {
    lang_langCode                               : { component: ()=>import('~/views/shared/lang') },
    signin                                      : { component: ()=>import('~/views/shared/login-dialog') },
    verify_email                                : { component: ()=>import('~/views/shared/verify-email') },
    help_403                                    : { component: ()=>import('~/views/shared/403') },
    mailbox                                     : { component: ()=>import('~/views/mailbox/inbox') },
    search                                      : { component: ()=>import('~/views/search/search-page') },
    countries                                   : { component: ()=>import('~/views/countries/country-list') },
    countries_code_schema                       : { component: ()=>import('~/views/countries/country-profile') },
    reports                                     : { component: ()=>import('~/views/report-analyzer/reports') },
    reports_analyzer                            : { component: ()=>import('~/views/report-analyzer/analyzer') },
    articles                                    : { component: ()=>import('~/views/forms/view/view-articles') },
    database_record                             : { component: ()=>import('~/views/forms/view/records-id') },
    database_record_documentID                  : { component: ()=>import('~/views/forms/view/records-id') },
    pdf_type_schema_documentId_revision         : { component: ()=>import('~/views/pdf-viewer/records-pdf-viewer') },
    register                                    : { component: ()=>import('~/views/register/dashboard') },
    register_requests                           : { component: ()=>import('~/views/register/requests') },
    register_user_preferences_tab               : { component: ()=>import('~/views/register/user-preferences/preferences') },
    register_admin                              : { component: ()=>import('~/views/register/admin') },
    register_notifications                      : { component: ()=>import('~/views/register/notifications') },
    register_stats                              : { component: ()=>import('~/views/register/manage/stats') },
    register_reports                            : { component: ()=>import('~/views/register/reports/index') },
    register_reports_report                     : { component: ()=>import('~/views/register/reports/report') },
    register_document_type_status_status        : { component: ()=>import('~/views/register/record-list') },
    register_national_users                     : { component: ()=>import('~/views/register/national-users/national-user-list') },
    register_document_type                      : { component: ()=>import('~/views/register/record-list') },
    register_CON_new                            : { component: ()=>import('~/views/forms/edit/edit-contact') },
    register_CNA_new                            : { component: ()=>import('~/views/forms/edit/edit-authority') },
    register_NDB_new                            : { component: ()=>import('~/views/forms/edit/edit-database') },
    register_VLR_new                            : { component: ()=>import('~/views/forms/edit/edit-resource') },
    register_ORG_new                            : { component: ()=>import('~/views/forms/edit/edit-organization') },
    register_SUB_new                            : { component: ()=>import('~/views/forms/edit/edit-submission') },
    register_CDI_new                            : { component: ()=>import('~/views/forms/edit/edit-capacityBuildingInitiative') },
    register_CNA_identifier_edit                : { component: ()=>import('~/views/forms/edit/edit-authority') },
    register_CON_identifier_edit                : { component: ()=>import('~/views/forms/edit/edit-contact') },
    register_NDB_identifier_edit                : { component: ()=>import('~/views/forms/edit/edit-database') },
    register_ORG_identifier_edit                : { component: ()=>import('~/views/forms/edit/edit-organization') },
    register_VLR_identifier_edit                : { component: ()=>import('~/views/forms/edit/edit-resource') },
    register_SUB_identifier_edit                : { component: ()=>import('~/views/forms/edit/edit-submission') },
    register_CDI_identifier_edit                : { component: ()=>import('~/views/forms/edit/edit-capacityBuildingInitiative') },
    register_document_type_documentID_view      : { component: ()=>import('~/views/register/record-details') },
    register_admin_requests                     : { component: ()=>import('~/views/register/requests') },
    register_admin_reported_records             : { component: ()=>import('~/views/register/admin/reported-records') },
    register_admin_report_counts                : { component: ()=>import('~/views/register/admin/report-count') },
    register_admin_error_logs                   : { component: ()=>import('~/views/register/admin/error-logs') },
    register_admin_subscriptions                : { component: ()=>import('~/views/register/admin/subscriptions') },
    register_admin_user_role_report             : { component: ()=>import('~/views/register/admin/user-role-report') },
    register_admin_common_issues                : { component: ()=>import('~/views/register/admin/common-issues') },
    reports_matrix                              : { component: ()=>import('~/views/reports/matrix/index') },
    embed                                       : { component: ()=>import('~/views/embed/index') },

    kb                                          : { component: ()=>import('~/views/kb/home.vue') },
    kbFaqs                                          : { component: ()=>import('~/views/kb/faqs.vue') },
    kbSearch                                          : { component: ()=>import('~/views/kb/article-search.vue') },
    kbArticles: { component: () => import('~/views/kb/articles.vue') },
    kbTags: { component: () => import('~/views/kb/adminTags.vue') },
    shareDocument                               : { component: ()=>import('~/views/forms/view/shared-document') },
    draftDocumentPdf                            : { component: ()=>import('~/views/pdf-viewer/draft-document-pdf-link') },

}

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix("!");
  $routeProvider.whenAsync = whenAsync; 

  $routeProvider.
  whenAsync('/lang/:langCode',                                    { ...mapView(angularViewWrapper),                    "label":routesLabels.languageChange,"resolve":{ ...commonRouteUrls.lang_langCode,                                               },"resolveController":true}).
  whenAsync('/signin',                                            { ...mapView(angularViewWrapper),                    "label":routesLabels.signin,"resolve":{ ...commonRouteUrls.signin,                                                      },"resolveController":true}). 
  whenAsync('/verify-email',                                      { ...mapView(angularViewWrapper),                    "label":routesLabels.verifyEmail,"resolve":{ ...commonRouteUrls.verify_email,                                                },"resolveController":false}). 
  whenAsync('/help/403',                                          { ...mapView(angularViewWrapper),                    "label":routesLabels.help_403,"resolve":{ ...commonRouteUrls.help_403,                                                    },"resolveController":false}). 
  whenAsync('/mailbox',                                           { ...mapView(angularViewWrapper),                    "label":routesLabels.mailbox,"resolve":{ ...commonRouteUrls.mailbox,                                                     "securized":securize()},"resolveController":true}). 
  whenAsync('/mailbox/:mailId',                                   { ...mapView(angularViewWrapper),                    "label":routesLabels.mailbox,"resolve":{ ...commonRouteUrls.mailbox,                                              "securized":securize()},"resolveController":true}). 
  whenAsync('/search/countries/:countryCode?',                    {"redirectTo":"/countries/:countryCode","label":routesLabels.search,"resolve":{}}). 
  whenAsync('/search/countries/:countryCode/:documentType',       {"redirectTo":"/countries/:countryCode/:documentType","label":routesLabels.search,"resolve":{}}). 
  whenAsync('/search/:id',                                { ...mapView(angularViewWrapper),                    "label":routesLabels.search,"resolve":{ ...commonRouteUrls.search,                                           },"resolveController":true,"reloadOnSearch":false}). 
  whenAsync('/search',                                            { ...mapView(angularViewWrapper),                    "label":routesLabels.search,"resolve":{ ...commonRouteUrls.search,                                                      },"resolveController":true,"reloadOnSearch":false}). 
  whenAsync('/search/national-records/:documentSchema?',          {"redirectTo":"/search","label":routesLabels.search,"resolve":{}}). 
  whenAsync('/search/reference-records/:documentSchema?',         {"redirectTo":"/search","label":routesLabels.search,"resolve":{}}). 
  whenAsync('/countries',                                         { ...mapView(angularViewWrapper),                    "label":routesLabels.countryProfiles,"resolve":{ ...commonRouteUrls.countries,                                                   },"resolveController":true,"resolveUser":true}). 
  whenAsync('/countries/status/:status',                          { ...mapView(angularViewWrapper),                    "label":routesLabels.countryProfiles,"resolve":{ ...commonRouteUrls.countries,                                     },"resolveController":true,"resolveUser":true}). 
  whenAsync('/countries/:code/:schema?',                          { ...mapView(angularViewWrapper),                    "label":routesLabels.countryProfile,"resolve":{ ...commonRouteUrls.countries_code_schema,                                       },"resolveController":true,"resolveUser":true,"param":"true","reloadOnSearch":false}). 
  whenAsync('/reports',                                           { ...mapView(angularViewWrapper),                    "label":routesLabels.reports,"resolve":{ ...commonRouteUrls.reports,                                                     },"resolveController":true}). 
  whenAsync('/reports/analyzer',                                  { ...mapView(angularViewWrapper),                    "label":routesLabels.reportsAnalyzer,"resolve":{ ...commonRouteUrls.reports_analyzer,                                            },"resolveController":true}). 
  whenAsync('/articles',                                          { ...mapView(angularViewWrapper),                    "label":routesLabels.articles,"resolve":{ ...commonRouteUrls.articles,                                                   "routePrams":injectRouteParams({ "type":"articles"}) },"resolveController":true,"resolveUser":true }). 
  whenAsync('/articles/:id/:title?',                              { ...mapView(angularViewWrapper),                    "label":routesLabels.articleTitle,"resolve":{ ...commonRouteUrls.articles,                                                 },"resolveController":true,"resolveUser":true,"param":"true"}). 
  whenAsync('/announcements',                                     { ...mapView(angularViewWrapper),                    "label":routesLabels.announcements,"resolve":{ ...commonRouteUrls.articles,                                               "routePrams":injectRouteParams({ "type":"announcement"})     },"resolveController":true,"resolveUser":true, }). 
  whenAsync('/announcements/:id/:title?',                         { ...mapView(angularViewWrapper),                    "label":routesLabels.articleTitle,"resolve":{ ...commonRouteUrls.articles,                                                 },"resolveController":true,"resolveUser":true,"param":"true"}). 
  whenAsync('/database/share/:code',                              { ...mapView(angularViewWrapper),                    "label":routesLabels.sharedCode,"resolve":{ ...commonRouteUrls.shareDocument,                      },"param":"true","resolveController":true}).
  whenAsync('/pdf-links/draft-documents/:documentId/:lang?',      { ...mapView(angularViewWrapper),                    "label":routesLabels.record,"resolve":{ ...commonRouteUrls.draftDocumentPdf,                            },"param":"true","resolveController":true}).
  whenAsync('/database/record',                                   { ...mapView(angularViewWrapper),                    "label":routesLabels.record,"resolve":{ ...commonRouteUrls.database_record,                                             },"resolveController":true,"resolveUser":true}). 
  whenAsync('/database/record/:documentID',                       { ...mapView(angularViewWrapper),                    "label":routesLabels.record,"resolve":{ ...commonRouteUrls.database_record_documentID,                                  },"resolveController":true,"resolveUser":true}). 
  whenAsync('/database/record/:documentID/:revision',             { ...mapView(angularViewWrapper),                    "label":routesLabels.record,"resolve":{ ...commonRouteUrls.database_record_documentID,                         },"resolveController":true,"resolveUser":true}). 
  whenAsync('/certificate/:documentID',                           { ...mapView(angularViewWrapper),                    "label":routesLabels.record,"resolve":{ ...commonRouteUrls.database_record_documentID,                                      },"resolveController":true,"resolveUser":true,"param":"true"}). 
  whenAsync('/database/:documentID',                              { ...mapView(angularViewWrapper),                    "label":routesLabels.record,"resolve":{ ...commonRouteUrls.database_record_documentID,                                         },"resolveController":true,"resolveUser":true,"param":"true"}). 
  whenAsync('/database/:documentSchema/:documentID',              { ...mapView(angularViewWrapper),                    "label":routesLabels.record,"resolve":{ ...commonRouteUrls.database_record_documentID,                          },"resolveController":true,"resolveUser":true,"param":"true"}). 
  whenAsync('/database/:documentSchema/:documentID/:revision',    { ...mapView(angularViewWrapper),                    "label":routesLabels.record,"resolve":{ ...commonRouteUrls.database_record_documentID,                 },"resolveController":true,"resolveUser":true,"param":"true"}). 
  whenAsync('/pdf/:type/:schema/:documentId/:revision?',          { ...mapView(angularViewWrapper),                    "label":routesLabels.record,"resolve":{ ...commonRouteUrls.pdf_type_schema_documentId_revision,                         },"resolveController":true,"resolveUser":true,"param":"true"}). 
  whenAsync('/register',                                          { ...mapView(angularViewWrapper),                    "label":routesLabels.dashboard,resolve:{ ...commonRouteUrls.register,                                                    "securized":securize()},"resolveController":true,"param":"true"}). 
  whenAsync('/dashboard',                                         {"redirectTo":"/register/dashboard","label":routesLabels.dashboard,"resolve":{}}). 
  whenAsync('/register/dashboard',                                { ...mapView(angularViewWrapper),                    "label":routesLabels.dashboard,"resolve":{ ...commonRouteUrls.register,                                          "securized":securize()},"param":"true","resolveController":true}). 
  whenAsync('/register/requests',                                 { ...mapView(angularViewWrapper),                    "label":routesLabels.pendingRequests,"resolve":{ ...commonRouteUrls.register_requests,                                           "securized":securize()},"param":"true","resolveController":true}). 
  whenAsync('/register/user-preferences/:tab?',                   { ...mapView(angularViewWrapper),                    "label":routesLabels.admin,"resolve":{ ...commonRouteUrls.register_user_preferences_tab,                               "securized":securize()},"param":"true","resolveController":true}).
  whenAsync('/register/admin',                                    { ...mapView(angularViewWrapper),                    "label":routesLabels.admin,"resolve":{ ...commonRouteUrls.register_admin,                                              "securized":securize(['Administrator'])},"param":"true","resolveController":true}).
  whenAsync('/register/notifications',                            { ...mapView(angularViewWrapper),                    "label":routesLabels.registerNotifications,"resolve":{ ...commonRouteUrls.register_notifications,                                      "securized":securize()},"param":"true","resolveController":true}). 
  whenAsync('/register/stats',                                    { ...mapView(angularViewWrapper),                    "label":routesLabels.registerStats,"resolve":{ ...commonRouteUrls.register_stats,                                              "securized":securize()},"param":"true","resolveController":true}). 
  whenAsync('/register/reports',                                  { ...mapView(angularViewWrapper),                    "label":routesLabels.reports,"resolve":{ ...commonRouteUrls.register_reports,                                            "securized":securize()},"resolveController":true}). 
  whenAsync('/register/reports/:report',                          { ...mapView(angularViewWrapper),                    "label":routesLabels.report,"resolve":{ ...commonRouteUrls.register_reports_report,                                     "securized":securize()},"resolveController":true}). 
  whenAsync('/register/:document_type/status/:status',            { ...mapView(angularViewWrapper),                    "param":"true","resolve":{ ...commonRouteUrls.register_document_type_status_status,                                "securized":securize(null,true)},"resolveController":true}). 
  whenAsync('/register/national-users',                           { ...mapView(angularViewWrapper),                    "label":routesLabels.manageUserRoles,"resolve":{ ...commonRouteUrls.register_national_users,                        "securized":securize(null,null, null, true)},"param":"true","resolveController":true}). 
  whenAsync('/register/:document_type',                           { ...mapView(angularViewWrapper),                    "label":routesLabels.documentType,"resolve":{ ...commonRouteUrls.register_document_type,                            "securized":securize(null,true)},"param":"true","resolveController":true}). 
  whenAsync('/register/CON/new',                                  { ...mapView(angularViewWrapper),                    "label":routesLabels.registerNew,"resolve":{ ...commonRouteUrls.register_CON_new,                                   "securized":securize(null,true,true)},"param":"true","resolveController":true,"documentType":"CON"}). 
  whenAsync('/register/CNA/new',                                  { ...mapView(angularViewWrapper),                    "label":routesLabels.registerNew,"resolve":{ ...commonRouteUrls.register_CNA_new,                                   "securized":securize(null,true,true)},"param":"true","resolveController":true,"documentType":"CNA"}). 
  whenAsync('/register/NDB/new',                                  { ...mapView(angularViewWrapper),                    "label":routesLabels.registerNew,"resolve":{ ...commonRouteUrls.register_NDB_new,                                   "securized":securize(null,true,true)},"param":"true","resolveController":true,"documentType":"NDB"}). 
  whenAsync('/register/VLR/new',                                  { ...mapView(angularViewWrapper),                    "label":routesLabels.registerNew,"resolve":{ ...commonRouteUrls.register_VLR_new,                                   "securized":securize(null,true,true)},"param":"true","resolveController":true,"documentType":"VLR"}). 
  whenAsync('/register/ORG/new',                                  { ...mapView(angularViewWrapper),                    "label":routesLabels.registerNew,"resolve":{ ...commonRouteUrls.register_ORG_new,                                   "securized":securize(null,true,true)},"param":"true","resolveController":true,"documentType":"ORG"}). 
  whenAsync('/register/SUB/new',                                  { ...mapView(angularViewWrapper),                    "label":routesLabels.registerNew,"resolve":{ ...commonRouteUrls.register_SUB_new,                                   "securized":securize(null,true,true)},"param":"true","resolveController":true,"documentType":"SUB"}). 
  whenAsync('/register/CDI/new',                                  { ...mapView(angularViewWrapper),                    "label":routesLabels.registerNew,"resolve":{ ...commonRouteUrls.register_CDI_new,                                   "securized":securize(null,true,true)},"param":"true","resolveController":true,"documentType":"CDI"}). 
  whenAsync('/register/CNA/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":routesLabels.registerEdit,"resolve":{ ...commonRouteUrls.register_CNA_identifier_edit,                      "securized":securize(null,true,true)},"param":"true","resolveController":true,"documentType":"CNA"}). 
  whenAsync('/register/CON/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":routesLabels.registerEdit,"resolve":{ ...commonRouteUrls.register_CON_identifier_edit,                      "securized":securize(null,true,true)},"param":"true","resolveController":true,"documentType":"CON"}). 
  whenAsync('/register/NDB/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":routesLabels.registerEdit,"resolve":{ ...commonRouteUrls.register_NDB_identifier_edit,                      "securized":securize(null,true,true)},"param":"true","resolveController":true,"documentType":"NDB"}). 
  whenAsync('/register/ORG/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":routesLabels.registerEdit,"resolve":{ ...commonRouteUrls.register_ORG_identifier_edit,                      "securized":securize(null,true,true)},"param":"true","resolveController":true,"documentType":"ORG"}). 
  whenAsync('/register/VLR/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":routesLabels.registerEdit,"resolve":{ ...commonRouteUrls.register_VLR_identifier_edit,                      "securized":securize(null,true,true)},"param":"true","resolveController":true,"documentType":"VLR"}). 
  whenAsync('/register/SUB/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":routesLabels.registerEdit,"resolve":{ ...commonRouteUrls.register_SUB_identifier_edit,                      "securized":securize(null,true,true)},"param":"true","resolveController":true,"documentType":"SUB"}). 
  whenAsync('/register/CDI/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":routesLabels.registerEdit,"resolve":{ ...commonRouteUrls.register_CDI_identifier_edit,                      "securized":securize(null,true,true)},"param":"true","resolveController":true,"documentType":"CDI"}). 
  whenAsync('/register/:document_type/:documentID/view',          { ...mapView(angularViewWrapper),                    "label":routesLabels.view,"resolve":{ ...commonRouteUrls.register_document_type_documentID_view,                    "securized":securize(null,true)},"param":"true","resolveController":true}). 
  whenAsync('/register/admin/requests',                           { ...mapView(angularViewWrapper),                    "label":routesLabels.pendingRequests,"resolve":{ ...commonRouteUrls.register_admin_requests,                        "securized":securize(['Administrator'])},"param":"true","resolveController":true}). 
  whenAsync('/register/admin/reported-records',                   { ...mapView(angularViewWrapper),                    "label":routesLabels.reportedRecords,"resolve":{ ...commonRouteUrls.register_admin_reported_records,                "securized":securize(['Administrator'])},"param":"true","resolveController":true}). 
  whenAsync('/register/admin/reported-records/:id',               { ...mapView(angularViewWrapper),                    "label":routesLabels.record,"resolve":{ ...commonRouteUrls.register_admin_reported_records,                         "securized":securize(['Administrator'])},"param":"true","resolveController":true}). 
  whenAsync('/register/admin/report-counts',                      { ...mapView(angularViewWrapper),                    "label":routesLabels.reportCounts,"resolve":{ ...commonRouteUrls.register_admin_report_counts,                      "securized":securize(['Administrator']),"param":"true","resolveController":true}}). 
  whenAsync('/register/admin/error-logs',                         { ...mapView(angularViewWrapper),                    "label":routesLabels.errorLogs,"resolve":{ ...commonRouteUrls.register_admin_error_logs,                            "securized":securize(['Administrator'])},"param":"true","resolveController":true}). 
  whenAsync('/register/admin/subscriptions',                      { ...mapView(angularViewWrapper),                    "label":routesLabels.subscriptions,    "resolve":{ ...commonRouteUrls.register_admin_subscriptions,                 "securized":securize(['Administrator'])},"param":"true","resolveController":true}). 
  whenAsync('/register/admin/subscriptions/:userId',              { ...mapView(angularViewWrapper),                    "label":routesLabels.subscriptions,    "resolve":{ ...commonRouteUrls.register_admin_subscriptions,                 "securized":securize(['Administrator'])},"param":"true","resolveController":true}). 
  whenAsync('/register/admin/user-role-report',                   { ...mapView(angularViewWrapper),                    "label":routesLabels.userRoleReport,   "resolve":{ ...commonRouteUrls.register_admin_user_role_report,              "securized":securize(['Administrator'])},"param":"true","resolveController":true}). 
  whenAsync('/register/admin/common-issues',                      { ...mapView(angularViewWrapper),                    "label":routesLabels.commonIssues,     "resolve":{ ...commonRouteUrls.register_admin_common_issues,                 "securized":securize(['Administrator'])},"param":"true","resolveController":true}). 
  whenAsync('/reports/matrix',                                    { ...mapView(angularViewWrapper),                    "label":routesLabels.matrix,           "resolve":{ ...commonRouteUrls.reports_matrix,                               },"param":"true","resolveController":true}).
  whenAsync('/kb',                                                { ...mapView(vueViewWrapper),                        "label":routesLabels.kb,               "resolve":{ ...commonRouteUrls.kb,                                           },"param":"true","resolveController":true}).
  whenAsync('/kb/faqs',                                           { ...mapView(vueViewWrapper),                        "label":"FAQs",                        "resolve":{ ...commonRouteUrls.kbFaqs,                                       },"param":"true","resolveController":true}).
  whenAsync('/kb/kbSearch/:search?',                                           { ...mapView(vueViewWrapper),                        "label":"kbSearch",                        "resolve":{ ...commonRouteUrls.kbSearch,                                       },"param":"true","resolveController":true}).
  whenAsync('/kb/faqs/:tag/:title?',                              { ...mapView(vueViewWrapper),                        "label":"FAQs",                        "resolve":{ ...commonRouteUrls.kbFaqs,                                       },"param":"true","resolveController":true}).
  whenAsync('/kb/tags',                                           { ...mapView(vueViewWrapper),                        "label":"Tags",                        "resolve":{ ...commonRouteUrls.kb,                                           },"param":"true","resolveController":true}).
  whenAsync('/kb/tags/:tag/:title?',                              { ...mapView(vueViewWrapper),                        "label":"Articles by tag",             "resolve":{ ...commonRouteUrls.kbTags,                                       },"param":"true","resolveController":true}).
  whenAsync('/kb/tags/:tag/:title/:id',                           { ...mapView(vueViewWrapper),                        "label":"Tag Article",                 "resolve":{ ...commonRouteUrls.kbArticles,                                   },"param":"true","resolveController":true}).
  whenAsync('/kb/articles/:id/:title/:tag',                       { ...mapView(vueViewWrapper),                        "label":"Articles",                    "resolve":{ ...commonRouteUrls.kbArticles,                                   },"param":"true","resolveController":true}).

  whenAsync('/share/embed/:type/:accessKey',                      { ...mapView(angularViewWrapper),                    "label":routesLabels.embed,           "resolve":{ ...commonRouteUrls.embed,                                         },"param":"true","resolveController":true}).
  whenAsync('/share/link/:type/:accessKey',                       { ...mapView(angularViewWrapper),                    "label":routesLabels.embed,           "resolve":{ ...commonRouteUrls.embed,                                         },"param":"true","resolveController":true}).
  whenAsync('/share/email/:type/:accessKey',                      { ...mapView(angularViewWrapper),                    "label":routesLabels.embed,           "resolve":{ ...commonRouteUrls.embed,                                         },"param":"true","resolveController":true}).

  whenAsync('/database',                                          {"redirectTo":"/search","label":routesLabels.search,"resolve":{}})
}]);

export default {
  currentUser: currentUser,
  securize: securize,
  importQ: importQ,
  baseUrl: baseUrl,
  injectRouteParams: injectRouteParams
};

function whenAsync(path, route) {
  route = route || ({});
  var localBaseUrl = baseUrl;
  if (route.templateUrl && !(/^\//).test(route.templateUrl)) {
    route.templateUrl = localBaseUrl + window.getHashFileName(route.templateUrl + ".js");
  }
  if (!route.controller && route.resolveController) {
    var module = route.templateUrl.replace(new RegExp("^" + escapeRegExp(localBaseUrl)), "").replace(/(\.[a-z0-9]{8})?\.html(\.js)?/i, "");
    module = window.getHashFileName(module + ".js").replace(/\.js$/, "");
    route.controller = importQ(module);
  }
  if (route.controller && angular.isFunction(route.controller)) {
    var controllerFn = route.controller;
    route.resolve = route.resolve || ({});
    route.resolve.lazyController = ["$injector", function ($injector) {
      var result = $injector.invoke(controllerFn, {});
      if (result.$inject) {
        result = $injector.invoke(result, {});
      }
      return result;
    }];
    if (!route.controllerAs && route.templateUrl) {
      var matches = route.templateUrl.match(/\/([A-z\-]+)\.html/);
      if (matches) {
        route.controllerAs = _.camelCase(matches[1]) + "Ctrl";
      }
    }
  }
  if (route.resolve && route.resolve.lazyController) {
    route.controller = ["$injector", "$scope", "$route", "lazyController", function ($injector, $scope, $route, lazyController) {
      if (!lazyController) return;
      var $element = angular.element(document).find("ng-view > :first-child");
      var locals = angular.extend({}, $route.current.locals, {
        $scope: $scope,
        $element: $element
      });
      return $injector.instantiate(lazyController, locals);
    }];
  }
  if ((route.templateUrl || "").length > 0 && window.scbdApp.version) {
    route.templateUrl = window.addAppVersionToUrl(route.templateUrl);
  }
  this.when(path, route);
  return this;
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
