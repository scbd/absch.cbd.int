define(['app', 'underscore'], function (app, _) { 'use strict';

	app.factory('appConfigService',  ["$location", function($location) {

        var nationalSchemas = ["absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database", "focalPoint"];
        var referenceSchemas = ["resource", "meeting", "notification", "pressRelease", "statement", "news", "modelContractualClause", "communityProtocol", "capacityBuildingInitiative", "capacityBuildingResource"];
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
                    'Administrator': 'Administrator-dev'
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
                'host': '127.0.0.1',
                'realm': 'ABS-DEV',
                'roles': [{
                    'User': 'User'
                }, {
                    'Administrator': 'Administrator-dev'
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
                'host': 'dev-absch.cbd.int',
                'realm': 'ABS-DEV',
                'roles': [{
                    'User': 'User'
                }, {
                    'Administrator': 'Administrator-dev'
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

        var realmConfig = _.find(realmConfigurations,{host:$location.$$host});
        var currentRealm = realmConfig.realm;

        function setCurrentRealm(newRealm){
			if(_.find(realmConfigurations,{realm:newRealm})){
				realmConfig = _.find(realmConfigurations,{realm:newRealm});
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
                        throw roleName + ' role is not configured for realm ' + realmConfig[0].realm + ', please update realm-configuration.js';
                } else
                    throw 'Realm not configured, please update realm-configuration.js';
            }
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
		            signIn: "/signin"
		        }
			};
		}

		return {
			nationalSchemas     :   nationalSchemas,
			referenceSchemas    :   referenceSchemas,

			currentRealm        :   currentRealm,
			setCurrentRealm  	:   setCurrentRealm,

			getRoles            :   getRoles,
			getRoleName			:	getRoleName,

			getSiteMapUrls		:	getSiteMapUrls
	   };

    }]);
});
