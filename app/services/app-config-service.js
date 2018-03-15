define(['app', 'underscore'], function (app, _) { 'use strict';

	var realmConfigurations = {
        
        /////////////
        //  ABSCH  //
		//Production
		'ABS' : {
			hosts: ['absch.cbd.int'],
			realm: 'ABS',
			roles: {
				'AbsAdministrator':           'AbsAdministrator',
				'AbsPublishingAuthorities':   'AbsPublishingAuthorities',
				'abschiac':                   'abschiac',
				'AbsNationalAuthorizedUser':  'AbsNationalAuthorizedUser',
				'AbsNationalFocalPoint':      'AbsNationalFocalPoint',
			}
		},

		//Development
		'ABS-DEV': {
			hosts: ['absch.staging.cbd.int', 'absch.cbddev.xyz', 'absch.cbd.local', 'absch.local'],
			realm: 'ABS-DEV',
			roles: {
                'AbsAdministrator':           'AbsAdministrator-dev',
				'AbsPublishingAuthorities':   'AbsPublishingAuthorities-dev',
				'abschiac':                   'abschiac-dev',
				'AbsNationalAuthorizedUser':  'AbsNationalAuthorizedUser-dev',
				'AbsNationalFocalPoint':      'AbsNationalFocalPoint-dev',
			}
		},
        
		//Training
		'ABS-TRG': {
			hosts: ['training-absch.cbd.int'],
			realm: 'ABS-TRG',
			roles: {
				'User':                       'ABSRegisteredUser-trg',
				'AbsAdministrator':           'AbsAdministrator-trg',
				'AbsPublishingAuthorities':   'AbsPublishingAuthorities-trg',
				'abschiac':                   'abschiac-trg',
				'AbsNationalAuthorizedUser':  'AbsNationalAuthorizedUser-trg',
				'AbsNationalFocalPoint':      'AbsNationalFocalPoint-trg',
			}
		},

        /////////////
        //   BCH   //
		'BCH': {
			hosts: ['bch.cbd.int'],
			realm: 'BCH',
			roles: { 
				'NationalFocalPoint': 'NationalFocalPoint',
				'AuthorizedUser':     'AuthorizedUser',
			},
        },
        
		'BCH-TRG': {
			hosts: ['training-bch.cbd.int'],
			realm: 'BCH-TRG',
			roles: { 
				'NationalFocalPoint': 'NationalFocalPoint-Train',
				'AuthorizedUser':     'AuthorizedUser-Train',
			},
        },
		
        'BCH-DEV': {
			hosts: ['bch.staging.cbd.int', 'bch.cbddev.xyz', 'bch.cbd.local'],
			realm: 'BCH-DEV',
			roles: { 
				'NationalFocalPoint': 'BchNationalFocalPoint:dev',
				'AuthorizedUser':     'BchAuthorizedUser:dev',
			},
        }
	}

    var nationalSchemas 	= [ "absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database", "focalPoint", "absNationalReport", "contact"];
    var referenceSchemas 	= [ "resource", "modelContractualClause", "communityProtocol", "capacityBuildingInitiative", "capacityBuildingResource"];
	var scbdSchemas			= [ "meeting", "notification", "pressRelease", "statement", "news", "new" ];

    var fallbackRealm;
    var overrideRealm;

    function getRealmConfig(realm){

		var realmConfig = realmConfigurations[realm];

        if(!realmConfig)
			throw 'Realm "'+realm+'" not found, please contact SCBD';
            
        return realmConfig;
    }

    app.provider("realm", function() {
        
        var realmProvider = this;
        
        realmProvider.setFallbackRealm = function(realm) {
            fallbackRealm = getRealmConfig(realm).realm;
            return fallbackRealm;
        };
        
        realmProvider.setRealm = function(realm) {
            overrideRealm = realm && getRealmConfig(realm).realm;
            return overrideRealm;
        };
        
        var realmConfig;
        
        realmProvider.$get = ['$location', function($location) {
            
            realmConfig = overrideRealm && realmConfigurations[overrideRealm] || 
                          _.find(realmConfigurations, function(c){ return ~c.hosts.indexOf($location.$$host); }) || 
                          fallbackRealm && realmConfigurations[fallbackRealm];
                            
            if(!realmConfig)
                throw new Error("Unknow realm for host: "+$location.$$host);

            return { 
                get value() { 
                    return realmConfig.realm; 
                },
                
                is : function(realm, strict) {
                    
                    var realmRe = strict ? new RegExp('^'+escapeRegExp(realm)+'($)')     //  MATCH realm exactly
                                         : new RegExp('^'+escapeRegExp(realm)+'(\b|$)'); //  MATCH realm with boundaries eg: ABS, ABS-*, BCH, BCH-*
                    
                    return realmRe.test(realmConfig.realm);
                },
                
                setRealm : function(realm) {
                    realmProvider.setRealm(realm);
                    this.value  = realm;
                    realmConfig = realmConfigurations[realm];
                },

                getRole : function(roleName) {
                    
                    if(!realmConfig.roles[roleName])
                        console.warn(roleName + ' role is not configured for realm ' + realmConfig.realm + ', please update realm-configuration');
                        
                    return realmConfig.roles[roleName] || roleName;
                },
                
                nationalRoles : function() {
                    
                    var roles = _.without(_.keys(realmConfig.roles), 'User');
                    
                    return _.map(roles, function(role) {
                        return realmConfig.roles[role] || role;
                    });
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
