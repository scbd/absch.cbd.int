define(['app', 'json!/api/v2018/realm-configurations/'+ encodeURIComponent(location.host||''),
		'underscore'], function (app,realmConf, _) { 'use strict';

	app.factory('appConfigService',  ["$location", function($location) {
		console.log(realmConf);

		var realmConfigurations = realmConf || window.realmConfigurations;
		var realmConfig; 		
		if(realmConfigurations.length >1)
			realmConfig = _.findWhere(realmConfigurations,{host:location.host});
		else
			realmConfig = _.head(realmConfigurations);

		var nationalSchemas 	= _.compact(_.map(realmConfig.schemas, function(schema, key){ return schema.type=='national' ? key : undefined}))
			//[ "absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database", "focalPoint", "absNationalReport", "contact"];
		var referenceSchemas 	= _.compact(_.map(realmConfig.schemas, function(schema, key){ return schema.type=='reference' ? key : undefined}))
			//[ "resource", "modelContractualClause", "communityProtocol", "capacityBuildingInitiative", "capacityBuildingResource"];
		var scbdSchemas			= [ "meeting", "notification", "pressRelease", "statement", "news", "new" ];


        var currentRealm 		= realmConfig.realm;

        function getRoles(){
            return realmConfig.roles;
        }
		//temporary
		String.prototype.lowerCaseFirstLetter = function() {
			return this.charAt(0).toLowerCase() + this.slice(1);
		}

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

			get currentRealm()  { $injector.invoke(['realm', function(realm) { return realm.value; }]); },
			setCurrentRealm  	: function(newRealm) { return $injector.invoke(['realm', function(realm) { return realm.setRealm(newRealm); }]); },

			nationalRoles		:	nationalRoles,
			getRoleName			:	getRoleName,

			getSiteMapUrls		:	getSiteMapUrls
	   };

    }]);

    //===========================
    //
    //===========================
    function escapeRegExp(str) { 
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); 
    }    
});
