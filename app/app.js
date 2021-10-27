import angular from "angular-flex";
import "angular-animate";
import "angular-sanitize";
import "angular-loggly-logger";
import "angular-joyride";
import "ngMeta";
import { CreateAngularVuePlainPlugin, AngularVueRoutePlugin, AngularVueRouterPlugin } from 'angular-vue-plugins';

var app = angular.module("app", angular.defineModules(["ngAnimate", "ngSanitize", "ngRoute", "ngCookies", "chieffancypants.loadingBar", "toastr", "angular-intro", "scbdControls", "angularTrix", "cbd-forums", "ng-breadcrumbs", "scbdServices", "scbdFilters", "smoothScroll", "ngMessages", "ngStorage", "ngDialog", "infinite-scroll", "logglyLogger", "angular-joyride", "ngMeta", "dndLists", "angucomplete-alt", "angular-cache", "angularVue"]));
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

  const joyrideTemplate = (await import('~/views/directives/joyride-template.html')).default;
  $templateCache.put('ngJoyrideDefault.html', joyrideTemplate)

}]);


app.run(["realm", "locale", '$injector', '$filter', function (realm, locale, $injector, $filter) {

  registerVuePlugin('$realm', realm);
  registerVuePlugin('$locale', locale);
  registerVuePlugin('$filter', $filter);

  window.Vue.use(new AngularVueRoutePlugin ($injector));
  window.Vue.use(new AngularVueRouterPlugin($injector));
  window.Vue.use(new AngularVueRouterPlugin($injector));
  
}]);

function registerVuePlugin(name, service){
  const newPlugin = new CreateAngularVuePlainPlugin(name, service)
  window.Vue.use(newPlugin);
}

export default app;
