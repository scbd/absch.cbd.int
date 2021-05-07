import app from "app";
import commonRoutes from "./common-routes";
import "angular-route";
import { securize, resolveLiteral, mapView, currentUser, importQ, injectRouteParams } from './mixin';
import * as angularViewWrapper from '~/views/shared/angular-view-wrapper'

const bchRouteUrls = {
  thBch                                : { component: ()=>import('~/views/home/bch') },
  submit                               : { component: ()=>import('~/views/register/record-types') },
  register_BCHN_new                    : { component: ()=>import('~/views/forms/edit/bch/edit-biosafety-news') },
  register_DEC_new                     : { component: ()=>import('~/views/forms/edit/bch/edit-biosafety-decision') },
  register_RA_new                      : { component: ()=>import('~/views/forms/edit/bch/edit-risk-assessment') },
  register_IRA_new                     : { component: ()=>import('~/views/forms/edit/bch/edit-risk-assessment') },
  register_LAW_new                     : { component: ()=>import('~/views/forms/edit/bch/edit-law') },
  register_ORGA_new                    : { component: ()=>import('~/views/forms/edit/bch/edit-organism') },
  register_GENE_new                    : { component: ()=>import('~/views/forms/edit/bch/edit-dna-sequence') },
  register_LMO_new                     : { component: ()=>import('~/views/forms/edit/bch/edit-modified-organism') },
  register_BIRC_new                    : { component: ()=>import('~/views/forms/edit/edit-resource') },
  register_NR4_new                     : { component: ()=>import('~/views/forms/edit/bch/edit-national-report-4') },
  register_SPCA_new                    : { component: ()=>import('~/views/forms/edit/edit-authority') },
  register_LAB_new                     : { component: ()=>import('~/views/forms/edit/bch/edit-laboratory-detection') },
  register_EXP_new                     : { component: ()=>import('~/views/forms/edit/bch/edit-biosafety-expert') },
  register_BCP_new                     : { component: ()=>import('~/views/forms/edit/bch/edit-country-profile') },
  register_DEC_identifier_edit         : { component: ()=>import('~/views/forms/edit/bch/edit-biosafety-decision') },
  register_RA_identifier_edit          : { component: ()=>import('~/views/forms/edit/bch/edit-risk-assessment') },
  register_IRA_identifier_edit         : { component: ()=>import('~/views/forms/edit/bch/edit-risk-assessment') },
  register_LAW_identifier_edit         : { component: ()=>import('~/views/forms/edit/bch/edit-law') },
  register_ORGA_identifier_edit        : { component: ()=>import('~/views/forms/edit/bch/edit-organism') },
  register_GENE_identifier_edit        : { component: ()=>import('~/views/forms/edit/bch/edit-dna-sequence') },
  register_LMO_identifier_edit         : { component: ()=>import('~/views/forms/edit/bch/edit-modified-organism') },
  register_BIRC_identifier_edit        : { component: ()=>import('~/views/forms/edit/edit-resource') },
  register_NR4_identifier_edit         : { component: ()=>import('~/views/forms/edit/bch/edit-national-report-4') },
  register_SPCA_identifier_edit        : { component: ()=>import('~/views/forms/edit/edit-authority') },
  register_LAB_identifier_edit         : { component: ()=>import('~/views/forms/edit/bch/edit-laboratory-detection') },
  register_BCHN_identifier_edit        : { component: ()=>import('~/views/forms/edit/bch/edit-biosafety-news') },
  register_EXP_identifier_edit         : { component: ()=>import('~/views/forms/edit/bch/edit-biosafety-expert') },
  reports_lmo_documentId_tab           : { component: ()=>import('~/views/reports/bch/lmo-decisions-risk-assessments') },
  register_BCP_identifier_edit         : { component: ()=>import('~/views/forms/edit/bch/edit-country-profile') },
  registries                           : { component: ()=>import('~/views/reports/bch/registries/index') },
  registries_living_modified_organisms : { component: ()=>import('~/views/reports/bch/registries/view-lmo-registry') },
  registries_organisms                 : { component: ()=>import('~/views/reports/bch/registries/view-orga-registry') },
  registries_genetic_elements          : { component: ()=>import('~/views/reports/bch/registries/view-gene-registry') },
  cms_content                          : { component: ()=>import('~/views/shared/cms-content') },
  help_forbidden                       : { component: ()=>import('~/views/shared/403') },
  help_not_found                       : { component: ()=>import('~/views/shared/404') },
};

app.config(["$routeProvider", function ($routeProvider) {
  $routeProvider.
  whenAsync('/',                                                  { ...mapView(angularViewWrapper),                    "label":"BCH", "resolve":{ ...bchRouteUrls.thBch }}). 
  whenAsync('/submit',                                            { ...mapView(angularViewWrapper),                    "label":"Submit","resolve":{ ...bchRouteUrls.submit,                                                      "user":securize()}}). 
  whenAsync('/database/reports*',                                 {"redirectTo":"/reports"}). 
  whenAsync('/register/BCHN/new',                                 { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"BCHN","resolve":{ ...bchRouteUrls.register_BCHN_new,                                           "securized":securize(null,true,true)}}). 
  whenAsync('/register/DEC/new',                                  { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"DEC","resolve":{ ...bchRouteUrls.register_DEC_new,                                            "securized":securize(null,true,true)}}). 
  whenAsync('/register/RA/new',                                   { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"RA","resolve":{ ...bchRouteUrls.register_RA_new,                                             "securized":securize(null,true,true),"routePrams":injectRouteParams({ isNational:true})}}). 
  whenAsync('/register/IRA/new',                                  { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"IRA","resolve":{ ...bchRouteUrls.register_IRA_new,                                            "securized":securize(null,true,true)}}). 
  whenAsync('/register/LAW/new',                                  { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"LAW","resolve":{ ...bchRouteUrls.register_LAW_new,                                            "securized":securize(null,true,true)}}). 
  whenAsync('/register/ORGA/new',                                 { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"ORGA","resolve":{ ...bchRouteUrls.register_ORGA_new,                                           "securized":securize(null,true,true)}}). 
  whenAsync('/register/GENE/new',                                 { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"GENE","resolve":{ ...bchRouteUrls.register_GENE_new,                                           "securized":securize(null,true,true)}}). 
  whenAsync('/register/LMO/new',                                  { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"LMO","resolve":{ ...bchRouteUrls.register_LMO_new,                                            "securized":securize(null,true,true)}}). 
  whenAsync('/register/BIRC/new',                                 { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"BIRC","resolve":{ ...bchRouteUrls.register_BIRC_new,                                           "securized":securize(null,true,true)}}). 
  whenAsync('/register/NR4/new',                                  { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"NR4","resolve":{ ...bchRouteUrls.register_NR4_new,                                            "securized":securize(null,true,true)}}). 
  whenAsync('/register/SPCA/new',                                 { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"SPCA","resolve":{ ...bchRouteUrls.register_SPCA_new,                                           "securized":securize(null,true,true)}}). 
  whenAsync('/register/LAB/new',                                  { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"LAB","resolve":{ ...bchRouteUrls.register_LAB_new,                                            "securized":securize(null,true,true)}}). 
  whenAsync('/register/EXP/new',                                  { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"EXP","resolve":{ ...bchRouteUrls.register_EXP_new,                                            "securized":securize(null,true,true)}}). 
  whenAsync('/register/BCP/new',                                  { ...mapView(angularViewWrapper),                    "label":"New","param":"true","resolveController":true,"documentType":"BCP","resolve":{ ...bchRouteUrls.register_BCP_new,                                            "securized":securize(null,true,true)}}). 
  whenAsync('/register/DEC/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"DEC","resolve":{ ...bchRouteUrls.register_DEC_identifier_edit,                                "securized":securize(null,true,true)}}). 
  whenAsync('/register/RA/:identifier/edit',                      { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"RA","resolve":{ ...bchRouteUrls.register_RA_identifier_edit,                                 "securized":securize(null,true,true),routePrams:injectRouteParams({ isNational:true})}}). 
  whenAsync('/register/IRA/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"IRA","resolve":{ ...bchRouteUrls.register_IRA_identifier_edit,                                "securized":securize(null,true,true)}}). 
  whenAsync('/register/LAW/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"LAW","resolve":{ ...bchRouteUrls.register_LAW_identifier_edit,                                "securized":securize(null,true,true)}}). 
  whenAsync('/register/ORGA/:identifier/edit',                    { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"ORGA","resolve":{ ...bchRouteUrls.register_ORGA_identifier_edit,                               "securized":securize(null,true,true)}}). 
  whenAsync('/register/GENE/:identifier/edit',                    { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"GENE","resolve":{ ...bchRouteUrls.register_GENE_identifier_edit,                               "securized":securize(null,true,true)}}). 
  whenAsync('/register/LMO/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"LMO","resolve":{ ...bchRouteUrls.register_LMO_identifier_edit,                                "securized":securize(null,true,true)}}). 
  whenAsync('/register/BIRC/:identifier/edit',                    { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"BIRC","resolve":{ ...bchRouteUrls.register_BIRC_identifier_edit,                               "securized":securize(null,true,true)}}). 
  whenAsync('/register/NR4/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"NR4","resolve":{ ...bchRouteUrls.register_NR4_identifier_edit,                                "securized":securize(null,true,true)}}). 
  whenAsync('/register/SPCA/:identifier/edit',                    { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"SPCA","resolve":{ ...bchRouteUrls.register_SPCA_identifier_edit,                               "securized":securize(null,true,true)}}). 
  whenAsync('/register/LAB/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"LAB","resolve":{ ...bchRouteUrls.register_LAB_identifier_edit,                                "securized":securize(null,true,true)}}). 
  whenAsync('/register/BCHN/:identifier/edit',                    { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"BCHN","resolve":{ ...bchRouteUrls.register_BCHN_identifier_edit,                               "securized":securize(null,true,true)}}). 
  whenAsync('/register/EXP/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"EXP","resolve":{ ...bchRouteUrls.register_EXP_identifier_edit,                                "securized":securize(null,true,true)}}). 
  whenAsync('/reports/lmo/:documentId/:tab',                      { ...mapView(angularViewWrapper),                    "label":"LMO Decisions","param":"true","resolveController":true,"reloadOnUrl":false,"resolve":{ ...bchRouteUrls.reports_lmo_documentId_tab,                                  }}). 
  whenAsync('/register/BCP/:identifier/edit',                     { ...mapView(angularViewWrapper),                    "label":"Edit","param":"true","resolveController":true,"documentType":"BCP","resolve":{ ...bchRouteUrls.register_BCP_identifier_edit,                                "securized":securize(null,true,true)}}). 
  whenAsync('/registries',                                        { ...mapView(angularViewWrapper),                    "label":"Registries","param":"true","resolveController":true, "resolve":{ ...bchRouteUrls.registries}}). 
  whenAsync('/registries/living-modified-organisms',              { ...mapView(angularViewWrapper),                    "label":"LMO Registry","param":"true","resolveController":true, "resolve":{ ...bchRouteUrls.registries_living_modified_organisms}}). 
  whenAsync('/registries/organisms',                              { ...mapView(angularViewWrapper),                    "label":"Organisms Registry","param":"true","resolveController":true, "resolve":{ ...bchRouteUrls.registries_organisms}}). 
  whenAsync('/registries/genetic-elements',                       { ...mapView(angularViewWrapper),                    "label":"Gene Registry","param":"true","resolveController":true, "resolve":{ ...bchRouteUrls.registries_genetic_elements}}). 
  whenAsync('/about/countryprofile.shtml',                        {"redirectTo":"/countries/:country"}). 
  whenAsync("/countries/:country", { templateUrl: "views/shared/cms-content.html", target: "https://bch.cbd.int/about/countryprofile.shtml?country=:country", controller: function () {   return commonRoutes.importQ("views/shared/cms-content"); }}).
  whenAsync("/about/:subpath*?", { templateUrl: "views/shared/cms-content.html", target: "https://bch.cbd.int/about/:subpath", controller: function () {   return commonRoutes.importQ("views/shared/cms-content"); }}).
  whenAsync("/protocol/:subpath*?", {  templateUrl: "views/shared/cms-content.html",  target: "https://bch.cbd.int/protocol/:subpath",  controller: function () {    return commonRoutes.importQ("views/shared/cms-content");  }}).
  whenAsync("/onlineconferences/:subpath*?", {  templateUrl: "views/shared/cms-content.html",  target: "https://bch.cbd.int/onlineconferences/:subpath",  controller: function () {    return commonRoutes.importQ("views/shared/cms-content");  }}).
  whenAsync('/help/forbidden',                                    { ...mapView(angularViewWrapper),                    "label":"Forbidden", "resolve":{ ...bchRouteUrls.help_forbidden}}). 
  whenAsync('/help/not-found',                                    { ...mapView(angularViewWrapper),                    "label":"Not found", "resolve":{ ...bchRouteUrls.help_not_found}}). 
  otherwise({
    templateUrl: commonRoutes.baseUrl + "views/shared/404.html",
    label: "Page not found"
  });
}]);
