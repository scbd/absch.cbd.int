define(['app', 'underscore'], function (app, _) { 'use strict';

	app.factory('appConfigService',  ["$location", function($location) {
		var realmConfigurations = [
            
            /////////////
            //  ABSCH  //
			//Production
			{
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
			{
				hosts: ['absch.staging.cbd.int', 'absch.cbddev.xyz', 'absch.local', 'localhost'],
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
			{
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
			{
				hosts: ['bch.cbd.int'],
				realm: 'BCH',
				roles: { 
					'NationalFocalPoint': 'NationalFocalPoint',
					'AuthorizedUser':     'AuthorizedUser',
				},
            },
			{
				hosts: ['training-bch.cbd.int'],
				realm: 'BCH-TRG',
				roles: { 
					'NationalFocalPoint': 'NationalFocalPoint-Train',
					'AuthorizedUser':     'AuthorizedUser-Train',
				},
            },
			{
				hosts: ['bch.staging.cbd.int', 'bch.cbddev.xyz', 'bch.cbd.local'],
				realm: 'BCH-DEV',
				roles: { 
					'NationalFocalPoint': 'BchNationalFocalPoint:dev',
					'AuthorizedUser':     'BchAuthorizedUser:dev',
				},
            }
		]

        var nationalSchemas 	= [ "absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database", "focalPoint", "absNationalReport", "contact"];
        var referenceSchemas 	= [ "resource", "modelContractualClause", "communityProtocol", "capacityBuildingInitiative", "capacityBuildingResource"];
		var scbdSchemas			= [ "meeting", "notification", "pressRelease", "statement", "news", "new" ];

        var realmConfig 		= _.find(realmConfigurations, function(c){ return ~c.hosts.indexOf($location.$$host); });
        var currentRealm 		= realmConfig.realm;

        function setCurrentRealm(newRealm){
			if(_.find(realmConfigurations,{realm : newRealm})){
				realmConfig = _.find(realmConfigurations,{realm : newRealm});
				currentRealm = newRealm;
			}
			else{
				throw 'Realm not found, please contact SCBD';
			}

        }

		function getRoleName(roleName) {
            
            if (!realmConfig)
                throw 'Realm not configured, please update realm-configuration.js';
                
            if(!realmConfig.roles[roleName])
                console.warn(roleName + ' role is not configured for realm ' + realmConfig.realm + ', please update realm-configuration');
                
            return realmConfig.roles[roleName] || roleName;
        }
        
		function nationalRoles(){

            if (!realmConfig)
                throw 'Realm not configured, please update realm-configuration.js';
            
            var roles = _.without(_.keys(realmConfig.roles), 'User');
            
            return _.map(roles, function(role) {
                return realmConfig.roles[role] || role;
            });
		}

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

			currentRealm        :   currentRealm,
			setCurrentRealm  	:   setCurrentRealm,

			nationalRoles		:	nationalRoles,
			getRoleName			:	getRoleName,

			getSiteMapUrls		:	getSiteMapUrls
	   };

    }]);
});
