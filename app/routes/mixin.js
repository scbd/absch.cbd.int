import 'app'
import 'jquery'
import 'angular-route'
import 'components/scbd-angularjs-services/main'
import 'ngDialog'
import 'angular-cookies'
import _ from 'lodash'

//============================================================
//
//============================================================
export function mapView(comp) {

    const template   = comp.template;
    const controller = comp.default;

    return { template, controller }
}
//============================================================
//
//============================================================
export function resolveLiteral(value) {
    return function () { return value; };
}

export function importQ(module) {
    var importFn = function ($q) {
      return $q(function (resolve, reject) {
        require([module], resolve, function (e) {
          console.error(e);
          reject(e);
        });
      });
    };
    importFn.$inject = ["$q"];
    return importFn;
}

//============================================================
//
//============================================================
export function injectRouteParams(params) {
  return ["$route", function ($route) {
    return _.defaults($route.current.params, params);
  }];
}

export function currentUser() {
  return ["$q", "authentication", function ($q, authentication) {
    return $q.when(authentication.getUser());
  }];
}

export function securize(roleList, useSchemaRoles, checkEmailVerified, userNationalRoles)
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
                roles = _.flatten(_.map(roles, function(role){ return realm.getRole(role)}));
            }
            if(useSchemaRoles || userNationalRoles){
                var path = $location.path().replace('/register/','');
                var schema;

                if(path.indexOf('/')>0)
                    schema = path.substr(0, path.indexOf('/'));
                else
                    schema = path;

                if(userNationalRoles){
                    roles = (roles || []).concat(realm.nationalRoles());
                }
                else{
                    var schemaName = $filter('mapSchema')(schema);
                    var appSchemas = ([]).concat(realm.nationalSchemas, realm.referenceSchemas).concat(realm.scbdSchemas);

                    if(_.intersection(realm.referenceSchemas, appSchemas).length){
                        roles = (roles || []).concat(realm.schemaRoles(schemaName));
                    }
                    else{
                        roles = (roles || []).concat(realm.nationalRoles());
                    }
                }

                roles = (roles || []).concat(realm.getRole("Administrator")||[]);
            }
            if (!user.isAuthenticated) {

                console.log("securize: force sign in");

                if (!$location.search().returnUrl)
                    $location.search({ returnUrl: $location.url() });

                $location.path(appConfigService.getSiteMapUrls().user.signIn);
                // throw "Force sign-in";

            }
            else if ((userNationalRoles && !user.government) || (roles && !_.isEmpty(roles) && _.isEmpty(_.intersection(roles, user.roles)))){

                console.log("securize: not authorized");

                $location.search({ path: $location.url() });
                $location.path(appConfigService.getSiteMapUrls().errors.notAuthorized);
            }

            return user;
        })
        .catch(function(e){
            console.log(e)
            $location.path(appConfigService.getSiteMapUrls().errors.notAuthorized);
        });
    }];
}