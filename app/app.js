import angular from "angular-flex";
import "angular-animate";
import "angular-sanitize";
import "angular-loggly-logger";
import "angular-joyride";
import "ngMeta";
import { 
    VueRegistry,
    createNgVue,
    createAuth,
    createRouter,
    createRoute,
    createService,
    NgVueDirective, 
    VueNgComponent
}     from '@scbd/angular-vue/src/index.js' 
import {
    createI18n
} from 'vue-i18n';
 import { mergeTranslationKeys} from './services/translation-merge';

var app = angular.module("app", angular.defineModules(["ngAnimate", "ngSanitize", "ngRoute", "ngCookies", "chieffancypants.loadingBar", "toastr", "angular-intro", "scbdControls", "angularTrix", "ng-breadcrumbs", "scbdServices", "scbdFilters", "smoothScroll", "ngMessages", "ngStorage", "ngDialog", "infinite-scroll", "logglyLogger", "angular-joyride", "ngMeta", "dndLists", "angucomplete-alt", "angular-cache", 'leaflet-directive']));
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
  const joyrideTemplateM = mergeTranslationKeys(joyrideTemplateT);

  for (const key in joyrideTemplateM) {  
    joyrideTemplate = joyrideTemplate.replace(`{{${key}}}`, joyrideTemplateM[key]);    
  } 
  $templateCache.put('ngJoyrideDefault.html', joyrideTemplate);
  
}]);

app.directive('ngVue', NgVueDirective);

app.run(["realm", "locale", '$injector', 'apiToken', 'authentication', function (realm, locale, $injector, apiToken, authentication) {

  const ngVue   = createNgVue({ $injector, ngApp: app });
  const $i18n   = createI18n({ locale, fallbackLocale: 'en', legacy:false});
  const $route  = createRoute ({ plugins: { ngVue }});
  const $router = createRouter ({ plugins: { ngVue }});

  VueRegistry
    .use(createService('$realm', realm)) // use  useRealm() | import { useRealm  } from '~/services/composables/realm.js';
    .use(createService('$locale', locale))
    .use(createService('$accountsBaseUrl', authentication.accountsBaseUrl()))
    .component('ng', VueNgComponent) // simple component used as a placeholder for `v-vue-ng` directive bridge
    .use(ngVue)
    .use($i18n)
    .use($route)
    .use( $router)

  const authPlugin = createAuth ({ 
    fetchUser() { return authentication.getUser(); },
    logout() { authentication.signOut(); },
    async login() {
      console.log("$auth: force sign in");

      $('#loginDialog').modal("show");
      
    }
  });

  authentication.onUserChange ((user)  => authPlugin.user(user) );
  apiToken      .onTokenChange((token) => authPlugin.token(undefined, token, token?.expiration) );

  VueRegistry.use(authPlugin);
  
}]);

export default app;
