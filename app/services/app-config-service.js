define(['app', 'underscore'], function (app, _) { 'use strict';

	app.factory('appConfigService',  ["$location", function($location) {

        // var appConfigSrv =
		// 				{
		//                     nationalSchemas     :   nationalSchemas,
		//                     referenceSchemas    :   referenceSchemas,
		//                     currentRealm        :   currentRealm,
		//
		//                     setCurrentRealm  	:   setCurrentRealm,
		//                     getRoles            :   getRoles
		//                };

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
            }, {
                'host': '127.0.0.1',
                'realm': 'ABS-DEV',
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
            }, {
                'host': 'dev-absch.cbd.int',
                'realm': 'ABS-DEV',
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


		return {
			nationalSchemas     :   nationalSchemas,
			referenceSchemas    :   referenceSchemas,
			currentRealm        :   currentRealm,

			setCurrentRealm  	:   setCurrentRealm,
			getRoles            :   getRoles
	   };

    }]);
});
