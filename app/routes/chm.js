import app from '~/app';
import commonRoutes from "./common-routes";
import "angular-route";
import { securize, asyncLogError, mapView, currentUser, injectRouteParams } from './mixin';
import * as angularViewWrapper from '~/views/shared/angular-view-wrapper';
import * as vueViewWrapper     from '~/views/shared/vue-view-wrapper'
import routesLabelsTranslations from '~/app-text/routes/chm-route-labels.json';
import * as theChm from '~/views/home/chm';
import { mergeTranslationKeys } from '../services/translation-merge';
const routesLabels = mergeTranslationKeys(routesLabelsTranslations);
const chmRouteUrls = {
  theChm,
  register_NR_edit                    : { component: ()=>asyncLogError(import('~/views/forms/edit/chm/edit-chm-national-report')) },
  register_marineEbsa_edit            : { component: ()=>asyncLogError(import('~/views/forms/edit/chm/edit-chm-marine-ebsa')) },
  onlineReporting                     : { component: ()=>asyncLogError(import('~/views/reports/chm/legacy/online-reporting')) },
  financialAnalyzer                   : { component: ()=>asyncLogError(import('~/views/reports/chm/legacy/financial-reporting')) }


};


app.config(["$routeProvider", function ($routeProvider) {
  $routeProvider.
  whenAsync('/',                      { ...mapView(chmRouteUrls.theChm),                 "label":routesLabels.theChm}).
  whenAsync('/register/NR/new',       { ...mapView(angularViewWrapper),   "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"NR","resolve":{ ...chmRouteUrls.register_NR_edit,   "securized":securize(null,true,true)}}).
  whenAsync('/register/NBSAP/new',    { ...mapView(angularViewWrapper),   "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"NBSAP","resolve":{ ...chmRouteUrls.register_NR_edit,"securized":securize(null,true,true), "routePrams":injectRouteParams({ "documentType":"NBSAP"})}}).
  whenAsync('/register/EBSA/new',   { ...mapView(angularViewWrapper),   "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"EBSA","resolve":{ ...chmRouteUrls.register_marineEbsa_edit,   "securized":securize(null,true,true)}}).
    
  whenAsync('/register/NR/:identifier/edit',       { ...mapView(angularViewWrapper),   "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"NR","resolve":{ ...chmRouteUrls.register_NR_edit,   "securized":securize(null,true,true)}}).
  whenAsync('/register/EBSA/:identifier/edit',   { ...mapView(angularViewWrapper),   "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"EBSA","resolve":{ ...chmRouteUrls.register_marineEbsa_edit,   "securized":securize(null,true,true)}}).
  whenAsync('/register/NBSAP/:identifier/edit',    { ...mapView(angularViewWrapper),   "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"NBSAP","resolve":{ ...chmRouteUrls.register_NR_edit,"securized":securize(null,true,true), "routePrams":injectRouteParams({ "documentType":"NBSAP"})}}).

  whenAsync('/reports/national-reports',       { ...mapView(angularViewWrapper),   "label":routesLabels.onlineReporting,  "resolve":{ ...chmRouteUrls.onlineReporting,       },"param":"true","resolveController":true,"reloadOnSearch":false}).
  whenAsync('/reports/financial-analyzer',     { ...mapView(angularViewWrapper),   "label":routesLabels.financialAnalyzer,"resolve":{ ...chmRouteUrls.financialAnalyzer,     },"param":"true","resolveController":true,"reloadOnSearch":false}).
  
  otherwise({
    templateUrl: commonRoutes.baseUrl + "views/shared/404.html",
    label: routesLabels.pageNotFound
  });
    
}]);
