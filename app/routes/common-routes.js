define(['require', 'app', 'lodash', 'angular-route', 
'services/app-config-service', 'js/services', 'js/filters',
'components/scbd-angularjs-services/filters/scbd-filters', 
'components/scbd-angularjs-services/services/main'], function (require, app, _) { 'use strict';

    var baseUrl = require.toUrl('').replace(/\?v=.*$/,'');
    var lang    = window.scbdApp.lang;

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        
        $routeProvider.whenAsync    = whenAsync;
        $routeProvider.
                whenAsync('/lang/:langCode',  { templateUrl: 'views/shared/lang.html',label:'ABSCH', resolveController: true}).
                whenAsync('/signin',          {templateUrl: 'views/shared/login-dialog.html',resolveController: true, label:'Sign in'}).
                whenAsync('/verify-email',    {templateUrl: 'views/shared/verify-email.html', label:'Email Verification Pending'}).
                whenAsync('/help/403',        {templateUrl: 'views/shared/403.html', label:'403 Error'}).
                
                
                whenAsync('/mailbox',                        { templateUrl: 'views/mailbox/inbox.html',         label:'Mailbox',       resolveController: true, resolve : { securized : securize() } }).
                whenAsync('/mailbox/:mailId',                { templateUrl: 'views/mailbox/inbox.html',         label:'Mailbox',       resolveController: true, resolve : { securized : securize() } }).

                whenAsync('/search/countries/:countryCode?',                        { redirectTo:'/countries/:countryCode' }).
                whenAsync('/search/countries/:countryCode/:documentType',           { redirectTo:'/countries/:countryCode/:documentType' }).
                whenAsync('/search/:recordType',                     { templateUrl: 'views/search/search-page.html',   label:'SEARCH',         resolveController: true, reloadOnSearch:false}).
                whenAsync('/search',                                 { templateUrl: 'views/search/search-page.html',   label:'SEARCH',         resolveController: true, reloadOnSearch:false}).
                whenAsync('/search/national-records/:documentSchema?',              { redirectTo:'/search' }).
                whenAsync('/search/reference-records/:documentSchema?',             { redirectTo:'/search' }).

                whenAsync('/countries',                   { templateUrl: 'views/countries/country-list.html',       label:'Country Profiles',      resolveController: true, resolveUser: true}).
                whenAsync('/countries/status/:status',    { templateUrl: 'views/countries/country-list.html',       label:'Country Profiles',      resolveController: true, resolveUser: true}).
                whenAsync('/countries/:code/:schema?',             { templateUrl: 'views/countries/country-profile.html',       label:'Country Profile', param:'true',      resolveController: true, resolveUser: true}).
                                
                whenAsync('/reports',                     { templateUrl: 'views/report-analyzer/reports.html',    label:'Reports',      resolveController: true}).
                whenAsync('/reports/analyzer',    { templateUrl: 'views/report-analyzer/analyzer.html',  label:'Analyzer',      resolveController: true}).
                
                whenAsync('/articles',   { templateUrl: 'views/forms/view/view-articles.html',     label:"Announcements", resolveController: true, resolveUser: true}).
                whenAsync('/articles/:id',   { templateUrl: 'views/forms/view/view-articles.html', label: "articleTitle",  param:'true', resolveController: true, resolveUser: true}).
                       
                whenAsync('/database/record',             { templateUrl: 'views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
                whenAsync('/database/record/:documentID',  { templateUrl: 'views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
                whenAsync('/database/record/:documentID/:revision', { templateUrl: 'views/forms/view/records-id.html'     ,resolveController: true, resolveUser: true}).
                whenAsync('/certificate/:documentID',                        { templateUrl: 'views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
                whenAsync('/database/:documentID',                           { templateUrl: 'views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
                whenAsync('/database/:documentSchema/:documentID',           { templateUrl: 'views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
                whenAsync('/database/:documentSchema/:documentID/:revision', { templateUrl: 'views/forms/view/records-id.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
                
                whenAsync('/pdf/:type/:schema/:documentId/:revision?',               { templateUrl: 'views/pdf-viewer/records-pdf-viewer.html', label:'Record',  param:'true',  resolveController: true, resolveUser: true}).
                                
                // whenAsync('/register',                                           { templateUrl: 'views/register/dashboard.html',         label:'Management Center',  param:'true', resolveController: true, resolve : { securized : securize() }}).
                whenAsync('/register',                                           { templateUrl: 'views/register/dashboard.html',         label:'Dashboard',  param:'true', resolveController: true, resolve : { securized : securize() }}).
                whenAsync('/dashboard',                                          { redirectTo:  '/register/dashboard'}).
                whenAsync('/register/dashboard',                                 { templateUrl: 'views/register/dashboard.html',         label:'Dashboard',  param:'true', resolveController: true, resolve : { securized : securize() }}).
                whenAsync('/register/requests',                          { templateUrl: 'views/register/requests.html',            label:'Pending Requests',  param:'true', resolveController: true,resolve : { securized : securize() }}).
                whenAsync('/register/user-preferences/:tab?',                    { templateUrl: 'views/register/user-preferences/preferences.html',          label:'ABSCH Admin',    param:'true', resolveController: true,resolve : { securized : securize() }}).
                whenAsync('/register/admin',                                     { templateUrl: 'views/register/admin.html',          label:'ABSCH Admin',    param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
                whenAsync('/register/notifications',                             { templateUrl: 'views/register/notifications.html',  label:'Notifications',  param:'true', resolveController: true,resolve : { securized : securize() }}).
                whenAsync('/register/stats',                                     { templateUrl: 'views/register/manage/stats.html',   label:'Statistics',  param:'true', resolveController: true,resolve : { securized : securize() }}).

                whenAsync('/register/:document_type/status/:status',             {templateUrl: 'views/register/record-list.html',          param:'true', resolveController: true,resolve : { securized : securize(null,true) }}).
                whenAsync('/register/national-users',                            {templateUrl: 'views/register/national-users/national-user-list.html', label:'Manage user roles',  param:'true', resolveController: true,resolve : { securized : securize(null,true) }}).
                whenAsync('/register/:document_type',                            {templateUrl: 'views/register/record-list.html',       label:'document_type',  param:'true', resolveController: true,resolve : { securized : securize(null,true) }}).

                whenAsync('/register/CON/new',           {templateUrl: 'views/forms/edit/edit-contact.html',                   label:'New',  param:'true', resolveController: true,documentType :'CON' , resolve : { securized : securize(null,null, true) }, }).
                whenAsync('/register/CNA/new',           {templateUrl: 'views/forms/edit/edit-authority.html',                 label:'New',  param:'true', resolveController: true,documentType :'CNA' , resolve : { securized : securize(null,true, true) }, }).
                whenAsync('/register/NDB/new',           {templateUrl: 'views/forms/edit/edit-database.html',                  label:'New',  param:'true', resolveController: true,documentType :'NDB' , resolve : { securized : securize(null,true, true) }, }).
                whenAsync('/register/VLR/new',           {templateUrl: 'views/forms/edit/edit-resource.html',                  label:'New',  param:'true', resolveController: true,documentType :'VLR' , resolve : { securized : securize(null, null, true) }, }).
                whenAsync('/register/ORG/new',           {templateUrl: 'views/forms/edit/edit-organization.html',              label:'New',  param:'true', resolveController: true,documentType :'ORG' , resolve : { securized : securize(null, null, true) }, }).
                
                whenAsync('/register/CNA/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-authority.html',                 label:'Edit',  param:'true', resolveController: true, documentType :'CNA' , resolve : { securized : securize(null,true, true) }, }).
                whenAsync('/register/CON/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-contact.html',                   label:'Edit',  param:'true', resolveController: true, documentType :'CON' , resolve : { securized : securize(null,null, true) }, }).
                whenAsync('/register/NDB/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-database.html',                  label:'Edit',  param:'true', resolveController: true, documentType :'NDB' , resolve : { securized : securize(null,true, true) }, }).
                whenAsync('/register/ORG/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-organization.html',              label:'Edit',  param:'true', resolveController: true, documentType :'ORG' , resolve : { securized : securize(null, null, true) }, }).
                whenAsync('/register/VLR/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-resource.html',                  label:'Edit',  param:'true', resolveController: true, documentType :'VLR' , resolve : { securized : securize(null, null, true) }, }).
 
                whenAsync('/register/:document_type/:documentID/view',           {templateUrl: 'views/register/record-details.html',    label:'View',  param:'true', resolveController: true,resolve : { securized : securize(null,true) }}).

                whenAsync('/register/admin/requests',         { templateUrl: 'views/register/requests.html',            label:'Pending Requests',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
                whenAsync('/register/admin/reported-records',         { templateUrl: 'views/register/admin/reported-records.html',   label:'Reported Records',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
                whenAsync('/register/admin/reported-records/:id',     { templateUrl: 'views/register/admin/reported-records.html',   label:'Record',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
                whenAsync('/register/admin/report-counts',            { templateUrl: 'views/register/admin/report-count.html',       label:'Report Counts',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
                whenAsync('/register/admin/error-logs',               { templateUrl: 'views/register/admin/error-logs.html',         label:'Error Logs',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
                whenAsync('/register/admin/subscriptions',            { templateUrl: 'views/register/admin/subscriptions.html',      label:'Subscriptions',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).
                whenAsync('/register/admin/user-role-report',         { templateUrl: 'views/register/admin/user-role-report.html',   label:'user Role Report',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).

                whenAsync('/register/admin/common-issues',         { templateUrl: 'views/register/admin/common-issues.html',   label:'Common issues',  param:'true', resolveController: true,resolve : { securized : securize(['Administrator']) }}).

    
                whenAsync('/oauth2/callback',             { templateUrl: 'views/oauth2/callback.html',          resolveController: true, resolveUser: true})
           
    }]);

    return {
        currentUser : currentUser,
        securize    : securize,
        importQ     : importQ,
        baseUrl     : baseUrl,
        injectRouteParams : injectRouteParams
    }
    //============================================================
    //
    //
    //============================================================
    function injectRouteParams(params) {
        return ['$route', function($route) {
            return _.defaults($route.current.params, params);
        }];
    }
    //============================================================
    //
    //
    //============================================================
    function currentUser() {
        return ['$q', 'authentication', function($q, authentication) {
            return $q.when(authentication.getUser());
        }];
    }

    //============================================================
    //
    //
    //============================================================
    function securize(roleList, useNationalRoles, checkEmailVerified)
    {
        return ["$location", "authentication", "appConfigService", "$filter", "$route", "realm",
         function ($location, authentication, appConfigService, $filter, $route, realm) {

            return authentication.getUser().then(function (user) {

                if(checkEmailVerified && user.isAuthenticated && !user.isEmailVerified){
                    $location.path(appConfigService.getSiteMapUrls().user.verifyEmail);
                    return;
                }

                var roles = _.clone(roleList||[]);

                if (roles && !_.isEmpty(roles)) {
                    roles = _.flatten(_.map(roles, realm.getRole));
                }
                if(useNationalRoles){
                    var path = $location.$$url.replace('/register/','');
                    var schema;

                    if(path.indexOf('/')>0)
                        schema = path.substr(0, path.indexOf('/'));
                    else
                        schema = path;

                    var schemaName = $filter('mapSchema')(schema);
                    if(!_.contains(_.union(['contact'], realm.referenceSchemas), schemaName)){
                        var rolesToAppend = [];

                        rolesToAppend = realm.nationalSchemaRoles(schemaName);
                        if(rolesToAppend.length == 0)//if there are not schema roles fallback to national roles
                            rolesToAppend = realm.nationalRoles(true);//skip schema roles from national roles

                        roles = (roles || []).concat(rolesToAppend).concat(realm.getRole("Administrator")||[]);
                    }
                }
                if (!user.isAuthenticated) {

                    console.log("securize: force sign in");

                    if (!$location.search().returnUrl)
                        $location.search({ returnUrl: $location.url() });

                    $location.path(appConfigService.getSiteMapUrls().user.signIn);
                    // throw "Force sign-in";

                }
                else if (roles && !_.isEmpty(roles) && _.isEmpty(_.intersection(roles, user.roles))){

                    console.log("securize: not authorized");

                    $location.search({ path: $location.url() });
                    $location.path(appConfigService.getSiteMapUrls().errors.notAuthorized);
                }

                return user;
            });
        }];
    }
    //============================================================
    //
    //
    //============================================================
    function importQ(module) { // fake webpack lazyload import()
        
        var importFn = function($q) {
            return $q(function(resolve, reject) {
                require([module], resolve, function(e) { 
                    console.error(e);
                    reject(e);
                });
            });
        };
        
        importFn.$inject = ['$q'];

        return importFn;
    }
    
    //============================================================
    //
    //
    //============================================================
    function whenAsync(path, route) {

        route = route || {};
        var localBaseUrl = '/' + lang + baseUrl;

        if(route.templateUrl && !/^\//.test(route.templateUrl)) {
            route.templateUrl = localBaseUrl+route.templateUrl;
        }
        
        if(!route.controller && route.resolveController) { // Legacy
            var module = route.templateUrl.replace(new RegExp('^'+escapeRegExp(localBaseUrl)), '').replace(/\.html$/, '');
            route.controller = importQ(module);
        }
        
        if(route.controller && angular.isFunction(route.controller)) { // Webpack
        
            var controllerFn = route.controller;
        
            route.resolve = route.resolve || {};
        
            route.resolve.lazyController = ['$injector', function($injector) {
                
                var result =  $injector.invoke(controllerFn, {});
                
                if(result.$inject) {
                    result = $injector.invoke(result, {});
                }
                
                return result;
            }];
            
            if(!route.controllerAs && route.templateUrl) {

                var matches = route.templateUrl.match(/\/([A-z\-]+)\.html/);

                if(matches) {
                    route.controllerAs = _.camelCase(matches[1])+'Ctrl';
                }
            }
        }

        if(route.resolve && route.resolve.lazyController) {

            route.controller = ['$injector', '$scope', '$route', 'lazyController', function ($injector, $scope, $route, lazyController) {

                if(!lazyController) return;

                var locals = angular.extend({}, $route.current.locals, { $scope: $scope });

                return $injector.instantiate(lazyController, locals);
            }];
        }

        if((route.templateUrl||'').length > 0 && window.scbdApp.version){
            route.templateUrl += (route.templateUrl.indexOf('?') === -1 ? '?' : '&') + 'v=' + window.scbdApp.version;
        }

        this.when(path, route);

        return this;
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
      }
    
});
