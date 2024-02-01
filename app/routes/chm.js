import app from '~/app';
import commonRoutes from "./common-routes";
import "angular-route";
import { securize, asyncLogError, mapView, currentUser, injectRouteParams } from './mixin';
import * as angularViewWrapper from '~/views/shared/angular-view-wrapper';
import * as vueViewWrapper     from '~/views/shared/vue-view-wrapper'
import routesLabels from '~/app-text/routes/chm-route-labels.json';
import * as theChm from '~/views/home/chm';

const chmRouteUrls = {
  theChm,
 
};

app.config(["$routeProvider", function ($routeProvider) {
  $routeProvider.
  whenAsync('/',                                                  { ...mapView(chmRouteUrls.theChm),                   "label":routesLabels.theChm}).
 
  otherwise({
    templateUrl: commonRoutes.baseUrl + "views/shared/404.html",
    label: routesLabels.pageNotFound
  });
}]);
