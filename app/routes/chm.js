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
  register_NR_edit        :{ component: ()=>asyncLogError(import('~/views/forms/edit/chm/edit-chm-national-report')) },
};


app.config(["$routeProvider", function ($routeProvider) {
  $routeProvider.
    whenAsync('/',                 { ...mapView(chmRouteUrls.theChm),    "label":routesLabels.theChm}).
    whenAsync('/register/NR/new',   { ...mapView(angularViewWrapper),   "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"NR","resolve":{ ...chmRouteUrls.register_NR_edit,   "securized":securize(null,true,true)}}).
    whenAsync('/register/NBSAP/new',{ ...mapView(angularViewWrapper),   "label":routesLabels.new,"param":"true","resolveController":true,"documentType":"NBSAP","resolve":{ ...chmRouteUrls.register_NR_edit,"securized":securize(null,true,true), "routePrams":injectRouteParams({ "documentType":"NBSAP"})}}).

    otherwise({
      templateUrl: commonRoutes.baseUrl + "views/shared/404.html",
      label: routesLabels.pageNotFound
    });
}]);
