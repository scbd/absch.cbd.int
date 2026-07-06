import app from '~/app';
import { getRealm } from '~/services/realm';

        app.factory("realm", [function() {
            return getRealm();
        }]);

        app.factory('appConfigService',  ["$injector", function($injector) {

            var { nationalSchemas, referenceSchemas, scbdSchemas } = getRealm();


            //===========================
            //
            //===========================
            function getRoleName(roleName) {
                
                console.warn("OBSOLETE: use realm.getRole(roleName);");
                
                return $injector.invoke(['realm', function(realm) {
                    return realm.getRole(roleName);
                }]);
            }
            
            //===========================
            //
            //===========================
            function nationalRoles(){

                console.warn("OBSOLETE: use realm.nationalRoles();");

                return $injector.invoke(['realm', function(realm) {
                    return realm.nationalRoles();
                }]);
            }

            //===========================
            //
            //===========================
            function getSiteMapUrls(){
                return {
                    register: {
                        dashboard	: "/register/dashboard",
                        requests	: "/register/requests"
                    },

                    errors: {
                        notFound: "/help/404",
                        notAuthorized: "/help/403"
                    },

                    user: {
                        signIn: "/signin",
                        verifyEmail : '/verify-email'
                    }
                };
            }

            return {
                nationalSchemas     :   nationalSchemas,
                referenceSchemas    :   referenceSchemas,
                scbdSchemas			:	scbdSchemas,

                get currentRealm()  { return $injector.invoke(['realm', function(realm) { return realm.value; }]); },
                setCurrentRealm  	: function() { throw new Error("not supported") },

                nationalRoles		:	nationalRoles,
                getRoleName			:	getRoleName,

                getSiteMapUrls		:	getSiteMapUrls
        };

        }]);

