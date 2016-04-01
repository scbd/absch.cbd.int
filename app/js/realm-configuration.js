define(['app', 'underscore'], function(app, _) {
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
                    }],
            'nationalSchemas': nationalSchemas,
            'referenceSchemas': referenceSchemas
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
            }],
            'nationalSchemas': nationalSchemas,
            'referenceSchemas': referenceSchemas
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
            }],
            'nationalSchemas': nationalSchemas,
            'referenceSchemas': referenceSchemas
        }, {
                'host': 'absch.cbddev.xyz',
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
            }],
            'nationalSchemas': nationalSchemas,
            'referenceSchemas': referenceSchemas
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
            }],
            'nationalSchemas': nationalSchemas,
            'referenceSchemas': referenceSchemas
        },

    ]



    app.value("realmConfiguration", realmConfigurations);

});
