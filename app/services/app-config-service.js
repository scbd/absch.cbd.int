define(['app', 'json!/api/v2018/realm-configurations/'+(window.clearingHouseHost||''),
		'lodash'], function (app, realmConfigurations, _) { 'use strict';
    
	var realmConfig = _.findWhere(realmConfigurations,{ host : window.location.host}) || _.head(realmConfigurations);

	var nationalSchemas  = _.compact(_.map(realmConfig.schemas, function(schema, key){ return schema.type=='national'  ? key : undefined; }));
	var referenceSchemas = _.compact(_.map(realmConfig.schemas, function(schema, key){ return schema.type=='reference' ? key : undefined; }));
	var scbdSchemas      = [ "meeting", "notification", "pressRelease", "statement", "news", "new" ];
    
    console.log("Realm:", (realmConfig||{}).realm || 'NOT_FOUND');

    if(!realmConfig)
        throw new Error("Unknow realm for host: "+window.location.host + ' clearingHouseHost: ' + window.clearingHouseHost);

    app.provider("realm", function() {
        
        var realmProvider = this;
        
        realmProvider.$get = [function() {

            if(!realmConfig)
                throw new Error("Unknow realm for host: "+window.location.host);

            return { 
                value               :   realmConfig.realm,
                uIdPrefix           :   realmConfig.uIdPrefix,
                schemas             :   realmConfig.schemas,
                
                chShortName         :   realmConfig.uIdPrefix,
                chLongName          :   realmConfig.displayName.replace(/(-DEV)|(-TRG)/i, ''),
                protocol            :   realmConfig.protocol || 'Nagoya Protocol',
                protocolShortName   :   realmConfig.protocolShortName || 'ABS',

                nationalSchemas     :   nationalSchemas,
                referenceSchemas    :   referenceSchemas,
                scbdSchemas			:   scbdSchemas,

                is : function(realm, strict) {
                    
                    var realmRe = strict ? new RegExp('^'+escapeRegExp(realm)+'($)')     //  MATCH realm exactly
                                         : new RegExp('^'+escapeRegExp(realm)+'(\\b|$)'); //  MATCH realm with boundaries eg: ABS, ABS-*, BCH, BCH-*
                    
                    return realmRe.test(realmConfig.realm);
                },

                getRole : function(roleName) {
                    
                    var roles = realmConfig.roles[patchRoleName(roleName)];
                    
                    if(!roles)
                        console.warn(roleName + ' role is not configured for realm ' + realmConfig.realm + ', please update realm-configuration');
                        
                    return roles || [roleName];
                },
                
                nationalRoles : function() {
                    return _(realmConfig.roles).values().flatten().compact().uniq().without('User', 'user').value();
                }
            };
        }];
    });    

	app.factory('appConfigService',  ["$injector", function($injector) {
        

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

    //===========================
    //
    //===========================
    function escapeRegExp(str) { 
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); 
    }    
    
    //===========================
    //
    //===========================
    function patchRoleName(roleName) {
        
        roleName = roleName.replace(/^Abs/i,'');
        roleName = roleName[0].toLowerCase() + roleName.substr(1);

        return roleName;
    }
    
});
