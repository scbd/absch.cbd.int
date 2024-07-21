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
  online_Reporting     : { component: ()=>asyncLogError(import('~/views/reports/chm/legacy/online-reporting')) },
  financial_Analyzer   : { component: ()=>asyncLogError(import('~/views/reports/chm/legacy/financial-reporting')) },

};


app.config(["$routeProvider", function ($routeProvider) {
  $routeProvider.
    whenAsync('/',                              { ...mapView(chmRouteUrls.theChm),    "label":routesLabels.theChm}).
    whenAsync('/search/reporting-map',          { ...mapView(angularViewWrapper),   "label":routesLabels.onlineReporting,  "resolve":{ ...chmRouteUrls.online_Reporting,       },"param":"true","resolveController":true,"reloadOnSearch":false}).
    whenAsync('/search/financial-analyzer',     { ...mapView(angularViewWrapper),   "label":routesLabels.financialAnalyzer,"resolve":{ ...chmRouteUrls.financial_Analyzer,     },"param":"true","resolveController":true,"reloadOnSearch":false}).
    
 
  otherwise({
    templateUrl: commonRoutes.baseUrl + "views/shared/404.html",
    label: routesLabels.pageNotFound
  });
}]);
