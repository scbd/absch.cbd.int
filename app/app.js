import angular from "angular-flex";
import "angular-animate";
import "angular-sanitize";
import "angular-loggly-logger";
import "angular-joyride";
import "ngMeta";
import { CreateAngularVuePlainPlugin,  AngularVueRouterPlugin } from 'angular-vue-plugins';
import AngularVueAuthPlugin from '~/plugins/angular-vue-auth-plugin';

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


app.run(["realm", "locale", '$injector', 'authentication', function (realm, locale, $injector,authentication) {

  registerVuePlugin('$realm', realm);
  registerVuePlugin('$locale', locale);
  registerVuePlugin('$accountsBaseUrl', authentication.accountsBaseUrl())
  registerVuePlugin('$ngApp', app);
  registerVuePlugin('$ngInjector', $injector);

  window.Vue.use(new AngularVueAuthPlugin  ($injector));
  window.Vue.use(new AngularVueRoutePlugin ($injector));
  window.Vue.use(new AngularVueRouterPlugin($injector));
  window.Vue.use(new AngularVueAuthPlugin($injector));
  
}]);

function registerVuePlugin(name, service){
  const newPlugin = new CreateAngularVuePlainPlugin(name, service)
  window.Vue.use(newPlugin);
}


export const AngularVueAuthPlugin = ($injector) =>{

  if(!$injector)
      throw new Error('Angular $injector not provided, cannot use AngularVueRoutePlugin plugin');

  let user;
  let userToken;

  const auth ={
      get user()          { return user; },
      get loggedIn()      { return user && user.isAuthenticated },
      setUser(newUser)    { user = newUser },
      setUserToken(token) { userToken = token; },

      logout()        { 
          const authentication = $injector.get('authentication');
          return authentication.signOut();
      },
      fetchUser()     { 
          const authentication = $injector.get('authentication');
          return authentication.getUser();
      },
      hasScope(scopeName)      { 

          let rolesToValidate = [];
          if(typeof scopeName == 'string')
              rolesToValidate = [scopeName];
          else if(!Array.isArray(scopeName))
              throw new Error("`scopeName` must be string or array od string");

          rolesToValidate = scopeName;

          const hasRole = rolesToValidate.find(scope=>user?.roles.includes(scope));

          return !!hasRole;
      },
      refreshTokens() { throw new Error('Not Implemented'); },
      onError()       { throw new Error('Not Implemented'); },
      onRedirect()    { throw new Error('Not Implemented'); },
      strategy :      { 
          token : { 
              get()      { return userToken; },
              set(token) { userToken = token }                
          },
          get refreshToken() { throw new Error('Not Implemented');  }            
       },
  }

  return {
      install(Vue, options) {
          if(!Vue.prototype.$auth)
              Vue.prototype.$auth = auth;
      }
    }
};
export default app;


function AngularVueRoutePlugin($injector) {

  if(!$injector)
      throw new Error('Angular $injector not provided, cannot use AngularVueRoutePlugin plugin');

  const $location  = $injector.get('$location');
  const $route     = $injector.get('$route');
  const $rootScope = $injector.get('$rootScope');

  if(!$location)
      throw new Error('Angular $location service not available, cannot use AngularVueRoutePlugin plugin');
  if(!$route)
      throw new Error('Angular $route service not available, cannot use AngularVueRoutePlugin');

  const observableRoute = window.Vue.observable({
    _route : null
  })

  function updateRoute() {
    const path   = $location.path();
    const query  = { ...($location.search()    || {})};
    const params = { ...($route.current?.params|| {})};

    observableRoute._route = {
      get path()   { return path; },
      get query()  { return { ...query  }; },
      get params() { return { ...params }; }
    }
  }

  $rootScope.$on('$routeUpdate', ()=> { 
    updateRoute();
  })

  if(!$route.current) { // initial route (at boot time)
    const cancelWatch = $rootScope.$watch(()=>$route.current, (currentRoute)=>{
      if(currentRoute===undefined) return;
      cancelWatch();
      updateRoute();
    });
  }

  updateRoute();

  return {
      install(Vue, options) {
          if(!Vue.prototype.$route) {
            Object.defineProperty(Vue.prototype, '$route', {
              get () { return observableRoute._route }
            })
          }
      }
    }
};