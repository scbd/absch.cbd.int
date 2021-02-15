define(['app', 'json!/api/v2018/realm-configurations/'+(window.scbdApp.host||''),
		'lodash', 'json!components/scbd-angularjs-services/filters/schema-name.json'], function (app, realmConfigurations, _, scbdJSonSchemas) { 'use strict';
    
	var realmConfig = _.find(realmConfigurations,{ host : window.location.host}) || _.head(realmConfigurations);
    
    if(!realmConfig)
        throw new Error("Unknow realm for host: "+window.location.host + ' clearingHouseHost: ' + window.scbdApp.host);

	var nationalSchemas  = _.compact(_.map(realmConfig.schemas, function(schema, key){ return schema.type=='national'  ? key : undefined; }));
	var referenceSchemas = _.compact(_.map(realmConfig.schemas, function(schema, key){ return schema.type=='reference' ? key : undefined; }));
    var scbdSchemas      = _.compact(_.map(scbdJSonSchemas, function(schema, key){ 
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

                originalObject      : realmConfig,

                is : function(realm, strict) {
                    
                    var realmRe = strict ? new RegExp('^'+escapeRegExp(realm)+'($)')     //  MATCH realm exactly
                                         : new RegExp('^'+escapeRegExp(realm)+'(\\b|$)'); //  MATCH realm with boundaries eg: ABS, ABS-*, BCH, BCH-*
                    
                    return realmRe.test(realmConfig.realm);
                },

                getRole : function(roleName, schema, schemaType) {
                    var patchedRoleName = patchRoleName(roleName);
                    var roles;
                    if(schema){
                        var schemaDetails = realmConfig.schemas[schema];
                        roles = schemaDetails[patchedRoleName]; //get specific role [PA, NAU, NFP]
                        
                        // if roles are not overridden then apply fallback roles National/Reference
                        roles = roles || this.fallbackRoles(schemaDetails.type, patchedRoleName);
                    }
                    else if(schemaType)
                        roles = this.fallbackRoles(schemaType, patchedRoleName);
                    else 
                        roles = realmConfig.roles[patchedRoleName];
                    
                    if(!roles)
                        console.warn(roleName + ' role is not configured for realm ' + realmConfig.realm + ', please update realm-configuration');
                        
                    return roles || [roleName];
                },
                
                nationalRoles : function(schema) {
                    var nationalfallbackRoles = _(realmConfig.roles)
                                                .map(function(roles, key){
                                                    if(_.includes(['publishingAuthorities','nationalAuthorizedUser','nationalFocalPoint'], key))
                                                        return roles;
                                                }).flatten().compact().uniq().value();
                    
                    var schemas = realmConfig.schemas[schema] ? [realmConfig.schemas[schema]] : realmConfig.schemas;
                    var nationalSchemRoles    =  _(schemas)
                            .map(function(schema, key){
                                if(schema.type == 'national' && key != 'contact')
                                    return _.union(schema.publishingAuthorities||[], schema.nationalAuthorizedUser||[])
                            }).flatten().compact().uniq().value();

                    return _(nationalSchemRoles).union(nationalfallbackRoles)
                            .flatten().compact().uniq().without('User', 'user').value();
                },
                nationalSchemaRoles : function(schema){
                    console.warn("OBSOLETE: use realm.nationalRoles();");
                    
                    return this.nationalRoles(schema);    
                },
                schemaRoles : function(schema, roleName){
                    var schemaDetails = realmConfig.schemas[schema];
                    var roles = [];
                    
                    if(roleName){
                        roles = schemaDetails[role]; //get specific role PA OR NAU oR NFP                    
                        roles = roles || this.fallbackRoles(schemaDetails.type, roleName);
                    }
                    else {
                        roles = _.union(schemaDetails.publishingAuthorities||this.fallbackRoles(schemaDetails.type, 'publishingAuthorities'), 
                                        schemaDetails.nationalAuthorizedUser||this.fallbackRoles(schemaDetails.type, 'nationalAuthorizedUser'));
                        
                    }
                    
                    return _(roles).flatten().compact().uniq().value();
    
                },
                fallbackRoles: function(schemaType, roleName){
                    if(schemaType == 'national')
                        return realmConfig.roles[roleName];
                    else if(schemaType == 'reference'){
                        if(roleName == 'publishingAuthorities')//For all other type SCBD should be Admin
                            return realmConfig.roles['scbdPublishingAuthorities'] || realmConfig.adminRoles; 
                        else
                            return ['User'];// Any registered user can submit request
                    }
                    else
                        console.warn(schemaType + ' is invalid schemaType for role' + roleName);
                    
                    return [roleName];
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
