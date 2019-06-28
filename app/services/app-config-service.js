define(['app', 'json!/api/v2018/realm-configurations/'+(window.clearingHouseHost||''),
		'lodash', 'json!components/scbd-angularjs-services/filters/schema-name.json'], function (app, realmConfigurations, _, scbdSchemas) { 'use strict';
    
	var realmConfig = _.findWhere(realmConfigurations,{ host : window.location.host}) || _.head(realmConfigurations);
    
    if(!realmConfig)
        throw new Error("Unknow realm for host: "+window.location.host + ' clearingHouseHost: ' + window.clearingHouseHost);

	var nationalSchemas  = _.compact(_.map(realmConfig.schemas, function(schema, key){ return schema.type=='national'  ? key : undefined; }));
	var referenceSchemas = _.compact(_.map(realmConfig.schemas, function(schema, key){ return schema.type=='reference' ? key : undefined; }));
    var scbdSchemas      = _.compact(_.map(scbdSchemas, function(schema, key){ 
        realmConfig.schemas[key] = schema;
        return key; 
    }));
    
    console.log("Realm:", (realmConfig||{}).realm || 'NOT_FOUND');

    
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

                getRole : function(roleName, schema) {
                    var patchedRoleName = patchRoleName(roleName);
                    var roles;

                    if(schema)
                        roles = realmConfig.schemas[schema][patchedRoleName]

                    roles = roles || realmConfig.roles[patchedRoleName];
                    
                    if(!roles)
                        console.warn(roleName + ' role is not configured for realm ' + realmConfig.realm + ', please update realm-configuration');
                        
                    return roles || [roleName];
                },
                
                nationalRoles : function(skipSchemaRoles) {
                    return _(skipSchemaRoles ? [] : this.nationalSchemaRoles())
                            .union(_(realmConfig.roles).values().value())
                            .flatten().compact().uniq().without('User', 'user').value();
                },
                nationalSchemaRoles : function(schema){
                    var schemas = realmConfig.schemas[schema] ? [realmConfig.schemas[schema]] : realmConfig.schemas;
                    return _(schemas)
                            .map(function(schema){
                                if(schema.type == 'national')
                                    return _.union(schema.publishingAuthorities||[], schema.nationalAuthorizedUser||[])
                            })
                            .flatten().compact().uniq().value();
    
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
