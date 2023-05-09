import angular from "angular-flex";
import "angular-animate";
import "angular-sanitize";
import "angular-loggly-logger";
import "angular-joyride";
import "ngMeta";

import { 
  CreateAngularVuePlainPlugin,  
  AngularVueRouterPlugin, 
  AngularVueRoutePlugin, 
  AngularVuePlugin,
  AngularVueDirective,
  AngularVueAuthPlugin
} from 'angular-vue';

var app = angular.module("app", angular.defineModules(["ngAnimate", "ngSanitize", "ngRoute", "ngCookies", "chieffancypants.loadingBar", "toastr", "angular-intro", "scbdControls", "angularTrix", "ng-breadcrumbs", "scbdServices", "scbdFilters", "smoothScroll", "ngMessages", "ngStorage", "ngDialog", "infinite-scroll", "logglyLogger", "angular-joyride", "ngMeta", "dndLists", "angucomplete-alt", "angular-cache"]));
app.config(["LogglyLoggerProvider", "ngMetaProvider", function (LogglyLoggerProvider, ngMetaProvider) {
  var logToConsole = true;
  LogglyLoggerProvider.includeUrl(true).includeUserAgent(true).includeTimestamp(true).sendConsoleErrors(true).logToConsole(logToConsole).ignoreMessageRegex(/\bDocument not found in the specified realm\b/).endpoint("/error-logs");
  ngMetaProvider.useTitleSuffix(true);
  ngMetaProvider.setDefaultTitle(window.scbdApp.title);
  ngMetaProvider.setDefaultTitleSuffix(" | " + window.scbdApp.title);
  ngMetaProvider.setDefaultTag("description", " | " + (window.scbdApp.description || window.scbdApp.title));
}]);
app.factory("$exceptionHandler", ["$log", function ($log) {
  return function myExceptionHandler(exception, cause) {
    if (typeof exception == "string" && (/^Possibly unhandled rejection: /).test(exception)) {
      try {
        exception = exception.replace(/^Possibly unhandled rejection: /, "");
        exception = JSON.parse(exception);
        var parsedException = {
          data: exception.data || exception.message,
          status: exception.status,
          url: (exception.config || ({})).url,
          params: (exception.config || ({})).params
        };
        exception = JSON.stringify(parsedException || exception);
      } catch (e) {}
    }
    if (typeof exception == "string")
      exception += `\n URl : ${window.location.href}`
    else
      exception.errorUrl = exception += `\n URl : ${window.location.href}`;
    $log.error(exception);
  };
}]);
app.run(["ngMeta", "LogglyLogger", "realm", "$window",'$templateCache', 
async function (ngMeta, logglyLogger, realm, $window, $templateCache) {
  
  var appVersion = $window.scbdApp.version || "localhost";
  logglyLogger.fields({
    realm: realm.value,
    appVersion: appVersion
  });
  ngMeta.init();

  let joyrideTemplate  = (await import('~/views/directives/joyride-template.html')).default;
  const joyrideTemplateT = (await import('~/app-text/views/directives/joyride-template.json')).default;

  for (const key in joyrideTemplateT) {
    joyrideTemplate = joyrideTemplate.replace(`{{${key}}}`, joyrideTemplateT[key]);    
  } 
  $templateCache.put('ngJoyrideDefault.html', joyrideTemplate);
  
}]);

app.directive('ngVue', AngularVueDirective);
app.run(["realm", "locale", '$injector', 'authentication', function (realm, locale, $injector,authentication) {

  registerVuePlugin('$realm', realm);
  registerVuePlugin('$locale', locale);
  registerVuePlugin('$accountsBaseUrl', authentication.accountsBaseUrl())
  registerVuePlugin('$ngApp', app);
  registerVuePlugin('$ngInjector', $injector);

  const vueRootApp = new Vue({});

  window.Vue.use(new AngularVuePlugin({ $injector, ngApp: app, vueApp: vueRootApp }));
  window.Vue.use(new AngularVueRoutePlugin());
  window.Vue.use(new AngularVueRouterPlugin());
  window.Vue.use(new AngularVueAuthPlugin({
    fetchUser() { return authentication.getUser(); },
    logout() { authentication.signOut(); },
    async login() {
      console.log("$auth: force sign in");

      const { $route, $router, $ngVue } = Vue.prototype;
      const appConfigService = $ngVue.$injector.get('appConfigService')

      const { fullPath, query } = $route;
      let { returnUrl } = query;

      if (!returnUrl) returnUrl = fullPath;

      const path = appConfigService.getSiteMapUrls().user.signIn

      $router.push({ path, query: {...query, returnUrl }, hash: null });
    }
  }));
  
}]);

function registerVuePlugin(name, service){
  const newPlugin = new CreateAngularVuePlainPlugin(name, service)
  window.Vue.use(newPlugin);
}

export default app;
