define(['app'], function(app){

    var realmConfigurations =
                        [
                            //Production
                            {'host':'absch.cbd.int', 'realm' : 'ABS', 'roles': [{'User':'User'},{'Administrator':'Administrator'},{'AbsAdministrator':'AbsAdministrator'},{'AbsPublishingAuthorities':'AbsPublishingAuthorities'},{'abschiac':'abschiac'},{'AbsNationalAuthorizedUser':'AbsNationalAuthorizedUser'},{'AbsNationalFocalPoint':'AbsNationalFocalPoint'}] },

                            //Development
                            {'host':'localhost', 'realm' : 'ABS-DEV', 'roles': [{'User':'User'},{'Administrator':'Administrator'},{'AbsAdministrator':'AbsAdministrator'},{'AbsPublishingAuthorities':'AbsPublishingAuthorities'},{'abschiac':'abschiac'},{'AbsNationalAuthorizedUser':'AbsNationalAuthorizedUser'},{'AbsNationalFocalPoint':'AbsNationalFocalPoint'}] },
                            {'host':'127.0.0.1', 'realm' : 'ABS-DEV', 'roles': [{'User':'User'},{'Administrator':'Administrator'},{'AbsAdministrator':'AbsAdministrator'},{'AbsPublishingAuthorities':'AbsPublishingAuthorities'},{'abschiac':'abschiac'},{'AbsNationalAuthorizedUser':'AbsNationalAuthorizedUser'},{'AbsNationalFocalPoint':'AbsNationalFocalPoint'}] },
                            {'host':'dev-absch.cbd.int', 'realm' : 'ABS-DEV', 'roles': [{'User':'User'},{'Administrator':'Administrator'},{'AbsAdministrator':'AbsAdministrator'},{'AbsPublishingAuthorities':'AbsPublishingAuthorities'},{'abschiac':'abschiac'},{'AbsNationalAuthorizedUser':'AbsNationalAuthorizedUser'},{'AbsNationalFocalPoint':'AbsNationalFocalPoint'}] },

                            //Training
                            {'host':'training-absch.cbd.int', 'realm' : 'ABS-TRG', 'roles': [{'User':'ABSRegisteredUser-trg'},{'Administrator':'Administrator'},{'AbsAdministrator':'AbsAdministrator-trg'},{'AbsPublishingAuthorities':'AbsPublishingAuthorities-trg'},{'abschiac':'abschiac-trg'},{'AbsNationalAuthorizedUser':'AbsNationalAuthorizedUser-trg'},{'AbsNationalFocalPoint':'AbsNationalFocalPoint-trg'}] },

                        ]



    app.value("realmConfiguration", realmConfigurations);

});
