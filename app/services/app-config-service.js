define(['app', 'underscore'], function (app, _) { 'use strict';

	app.factory('appConfigService',  ["$location", function($location) {
		var realmConfigurations = [
			//Production
			{
				'host': 'absch.cbd.int',
				'realm': 'ABS',
				'roles': [{
						'User': 'User'
						}, {
							'Administrator': 'Administrator'
						}, {
							'AbsAdministrator': 'AbsAdministrator'
						}, {
							'AbsPublishingAuthorities': 'AbsPublishingAuthorities'
						}, {
							'abschiac': 'abschiac'
						}, {
							'AbsNationalAuthorizedUser': 'AbsNationalAuthorizedUser'
						}, {
							'AbsNationalFocalPoint': 'AbsNationalFocalPoint'
						}]
			},

			//Development
			{
				'host': 'localhost',
				'realm': 'ABS-DEV',
				'roles': [{
					'User': 'User'
				}, {
					'Administrator': 'Administrator'
				}, {
					'AbsAdministrator': 'AbsAdministrator-dev'
				}, {
					'AbsPublishingAuthorities': 'AbsPublishingAuthorities-dev'
				}, {
					'abschiac': 'abschiac-dev'
				}, {
					'AbsNationalAuthorizedUser': 'AbsNationalAuthorizedUser-dev'
				}, {
					'AbsNationalFocalPoint': 'AbsNationalFocalPoint-dev'
				}]
			},
			{
				'host': 'absch.local',
				'realm': 'ABS-DEV',
				'roles': [{
					'User': 'User'
				}, {
					'Administrator': 'Administrator'
				}, {
					'AbsAdministrator': 'AbsAdministrator-dev'
				}, {
					'AbsPublishingAuthorities': 'AbsPublishingAuthorities-dev'
				}, {
					'abschiac': 'abschiac-dev'
				}, {
					'AbsNationalAuthorizedUser': 'AbsNationalAuthorizedUser-dev'
				}, {
					'AbsNationalFocalPoint': 'AbsNationalFocalPoint-dev'
				}]
			}, {
				'host': 'absch.cbddev.xyz',
				'realm': 'ABS-DEV',
				'roles': [{
					'User': 'User'
				}, {
					'Administrator': 'Administrator'
				}, {
					'AbsAdministrator': 'AbsAdministrator-dev'
				}, {
					'AbsPublishingAuthorities': 'AbsPublishingAuthorities-dev'
				}, {
					'abschiac': 'abschiac-dev'
				}, {
					'AbsNationalAuthorizedUser': 'AbsNationalAuthorizedUser-dev'
				}, {
					'AbsNationalFocalPoint': 'AbsNationalFocalPoint-dev'
				}]
			},
			//staginh
                        {
				'host': 'absch.staging.cbd.int',
				'realm': 'ABS-DEV',
				'roles': [{
					'User': 'User'
				}, {
					'Administrator': 'Administrator'
				}, {
					'AbsAdministrator': 'AbsAdministrator-dev'
				}, {
					'AbsPublishingAuthorities': 'AbsPublishingAuthorities-dev'
				}, {
					'abschiac': 'abschiac-dev'
				}, {
					'AbsNationalAuthorizedUser': 'AbsNationalAuthorizedUser-dev'
				}, {
					'AbsNationalFocalPoint': 'AbsNationalFocalPoint-dev'
				}]
			},
			//Training
			{
				'host': 'training-absch.cbd.int',
				'realm': 'ABS-TRG',
				'roles': [{
					'User': 'ABSRegisteredUser-trg'
				}, {
					'Administrator': 'Administrator'
				}, {
					'AbsAdministrator': 'AbsAdministrator-trg'
				}, {
					'AbsPublishingAuthorities': 'AbsPublishingAuthorities-trg'
				}, {
					'abschiac': 'abschiac-trg'
				}, {
					'AbsNationalAuthorizedUser': 'AbsNationalAuthorizedUser-trg'
				}, {
					'AbsNationalFocalPoint': 'AbsNationalFocalPoint-trg'
				}]
			},

		]

        var nationalSchemas 	= [ "absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database", "focalPoint", "absNationalReport", "contact"];
        var referenceSchemas 	= [ "resource", "modelContractualClause", "communityProtocol", "capacityBuildingInitiative", "capacityBuildingResource"];
		var scbdSchemas			= [ "meeting", "notification", "pressRelease", "statement", "news", "new" ];

        var realmConfig 		= _.find(realmConfigurations,{host:$location.$$host});
        var currentRealm 		= realmConfig.realm;

        function setCurrentRealm(newRealm){
			if(_.find(realmConfigurations,{realm : newRealm})){
				realmConfig = _.find(realmConfigurations,{realm : newRealm});
				currentRealm = newRealm;
			}
			else{
				throw 'Realm not found, please contact ABSCH team';
			}

        }

        function getRoles(){
            return realmConfig.roles;
        }

		function getRoleName(roleName) {
            if (roleName) {

                if (realmConfig) {
                    var role = _.find(realmConfig.roles, function(key) {
                        return _.keys(key)[0] == roleName;
                    });
                    // console.log(realmConfig, role)
                    if (role)
                        return _.values(role)[0];
                    else
						throw roleName + ' role is not configured for realm ' + realmConfig.realm + ', please update realm-configuration.js';
                } else
                    throw 'Realm not configured, please update realm-configuration.js';
            }
        }
		function nationalRoles(){

		   return _.without(
					   _.flatten(
					       _.map(getRoles(), function(role) {
					           return _.values(role);
				       	   })
			   			),
				 'User');
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

			getRoles            :   getRoles,
			nationalRoles		:	nationalRoles,
			getRoleName			:	getRoleName,

			getSiteMapUrls		:	getSiteMapUrls
	   };

    }]);
});
