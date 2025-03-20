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
  register_marineEbsa_edit            : { component: ()=>asyncLogError(import('~/views/forms/edit/chm/edit-chm-marine-ebsa')) }
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


  whenAsync('/submit/marineEbsa/new',                    {"redirectTo":"/register/EBSA/new","resolve":{}}). 
  whenAsync('/submit/marineEbsa/:uid',                   {"redirectTo":"/register/EBSA/:uid/edit","resolve":{}}). 
  whenAsync('/submit/organization/new',                  {"redirectTo":"/register/ORG/new","resolve":{}}). 
  whenAsync('/submit/organization/:uid',                 {"redirectTo":"/register/ORG/:uid/edit","resolve":{}}). 
  whenAsync('/submit/contact/new',                       {"redirectTo":"/register/CON/new","resolve":{}}). 
  whenAsync('/submit/contact/:uid',                      {"redirectTo":"/register/CON/:uid/edit","resolve":{}}). 
  whenAsync('/submit/resource/new',                      {"redirectTo":"/register/VLR/new","resolve":{}}). 
  whenAsync('/submit/resource/:uid',                     {"redirectTo":"/register/VLR/:uid/edit","resolve":{}}). 
  
  
  whenAsync('/submit/capacityBuildingInitiative/new',    {"redirectTo":"/register/CDI/new","resolve":{}}). 
  whenAsync('/submit/capacityBuildingInitiative/:uid',   {"redirectTo":"/register/CDI/:uid/edit","resolve":{}}). 
  // whenAsync('/submit/capacityBuildingResource/new',      {"redirectTo":"/register/CBR/new","resolve":{}}). 
  // whenAsync('/submit/capacityBuildingResource/:uid',     {"redirectTo":"/register/CBR/:uid/edit","resolve":{}}).
  whenAsync('/submit/submission/new' ,              {"redirectTo":"/register/SUB/new","resolve":{}}). 
  whenAsync('/submit/submission/:uid',              {"redirectTo":"/register/SUB/:uid/edit","resolve":{}}).  
  
  whenAsync('/management/requests',                      {"redirectTo":"/register/requests","resolve":{}}). 
  whenAsync('/management/requests/:id',                  {"redirectTo":"/register/requests","resolve":{}}). 
  whenAsync('/management/requests/:id/:activity',        {"redirectTo":"/register/requests","resolve":{}}). 
  whenAsync('/management/user-preferences',              {"redirectTo":"/register/user-preferences","resolve":{}}). 
  whenAsync('/management/national-users',                {"redirectTo":"/register/national-users","resolve":{}}). 
  
  whenAsync('/submit/undbAction/:uid',  { redirectTo: redirectUndbActions } ).
  whenAsync('/submit/undbPartner/:uid', { redirectTo: redirectUndbPartner } ).
  


  otherwise({
    templateUrl: commonRoutes.baseUrl + "views/shared/404.html",
    label: routesLabels.pageNotFound
  });
    
}]);


const redirectUndbActions = (routeParams, path, search) => {
  
  var id = routeParams.uid||'';
  if(id=='new')
      id = undefined;
  var workflowId = search.workflowId ? '?workflowId=' +search.workflowId : '';
  
  if(id || workflowId)
      window.location.href = 'https://www.cbd.int/undb-new/actions/submit-form/' + id + workflowId;
  
}

const redirectUndbPartner = (routeParams, path, search) => {
  
  var id = routeParams.uid||'';
  if(id=='new')
      id = undefined;
  var workflowId = search.workflowId ? '?workflowId=' +search.workflowId : '';

  if(id || workflowId)
      window.location.href = 'https://www.cbd.int/undb-new/actors/partners/edit/'+id + workflowId;
  else
      window.location.href = 'https://www.cbd.int/undb-new/actors/partners/register';

}
