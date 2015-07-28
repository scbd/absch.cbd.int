define(['app', 'underscore'], function(app, _) {

    app.directive("measureMatrixElements", function() {
        return {
            restrict: "EAC",
            templateUrl: "/app/views/search/measure-matrix-elements-derective.html",
            replace: true,
            transclude: false,
            require: "?ngModel",
            scope: {
                binding: "=ngModel",
                locales: "=",
                type: "@",
                layout: "@",
                document: "=document"
            },
            link: function($scope, $element, $attr, ngModelController) {
                $scope.identifiers = null;
                $scope.sections = null;
                $scope.terms = null;
                $scope.rootTerms = [];

                $scope.init();
                $scope.$watch("document", $scope.onTerms);
                $scope.$watch("binding", $scope.load);
                $scope.$watch("binding", function() {
                    ngModelController.$setViewValue($scope.binding);
                });


            },
            controller: ["$scope", "$q", "Thesaurus", "Enumerable", "$http", "guid",
            function($scope, $q, thesaurus, Enumerable, $http, guid) {

                $scope.termsFn = function(){  return  [
                       {
                         "identifier": "1D2710D3-75C8-475D-8634-F912F06DAF25",
                         "name": "Competent national authority/ies",
                         "title": {
                           "en": "Competent national authority/ies"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "24E809DA-20F4-4457-9A8A-87C08DF81E8A",
                         "name": "Scope of the measure",
                         "title": {
                           "en": "Scope of the measure"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [],
                         "narrowerTerms": [
                             "357DBB22-6A6C-4C49-BA1F-037320B09247",
                             "9C146B09-097E-4CFF-B9CC-D4785496952F",
                             "33A6BF46-3699-4B5E-A3C0-506FAFDA2D76",
                             "F9EF6CC8-3709-43D5-839C-1A93A23DE51B",
                             "http://data.gbif.org/species/13140807",
                             "2D2CAF72-A892-42CE-87F7-975EFBADAF4F",
                             "35E029ED-D92F-41C8-9CDC-52F3F35D7E36",
                             "29C670AB-C198-484F-A2ED-9BAB1DAC7431",
                             "D570A745-D8C3-4698-BB77-0A90C140F3F2",
                             "47DD3FF6-D369-4E64-B0BC-5DADF3B70C95",
                             "9EC60226-A7E4-441E-AC7D-2580F111EC3B",
                             "507D46E0-DC49-47F0-B273-26ECD9CC8948",
                             "EAE641FD-6A82-4C15-84CD-0F12ABA5CBC1",
                             "DFEECF62-EC3D-4F5C-BAC6-2FD308F81277",
                             "2C87B4AD-684C-48DC-91B7-82938CE37B5A",
                             "CB918E1A-E171-4C10-BA35-088C81F668A3",
                             "B8A150E054154AD3AD97856ABD485E90"
                         ],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "357DBB22-6A6C-4C49-BA1F-037320B09247",
                         "name": "Plants",
                         "title": {
                           "en": "Plants"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "4E2974DF-216E-46C8-8797-8E3A33D6A048"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "9C146B09-097E-4CFF-B9CC-D4785496952F",
                         "name": "Animals",
                         "title": {
                           "en": "Animals"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "4E2974DF-216E-46C8-8797-8E3A33D6A048"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "33A6BF46-3699-4B5E-A3C0-506FAFDA2D76",
                         "name": "Microorganism",
                         "title": {
                           "en": "Microorganism"
                         },
                         "shortTitle": {},
                         "description": "This could include, among others, archae, bacteria, fungi, chromista, protozoa and viruses.",
                         "source": "",
                         "broaderTerms": [
                           "4E2974DF-216E-46C8-8797-8E3A33D6A048"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "F9EF6CC8-3709-43D5-839C-1A93A23DE51B",
                         "name": "Domestic species",
                         "title": {
                           "en": "Domestic species"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "4E2974DF-216E-46C8-8797-8E3A33D6A048"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "http://data.gbif.org/species/13140807",
                         "name": "Fungi",
                         "title": {
                           "en": "Fungi"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "GBIF",
                         "broaderTerms": [
                           "4E2974DF-216E-46C8-8797-8E3A33D6A048"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "2D2CAF72-A892-42CE-87F7-975EFBADAF4F",
                         "name": "Wild species",
                         "title": {
                           "en": "Wild species"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "4E2974DF-216E-46C8-8797-8E3A33D6A048"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "35E029ED-D92F-41C8-9CDC-52F3F35D7E36",
                         "name": "Agricultural areas",
                         "title": {
                           "en": "Agricultural areas"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "A862ABFC-B97D-4E6A-9A70-812A82A7CC19"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "29C670AB-C198-484F-A2ED-9BAB1DAC7431",
                         "name": "Dry and sub-humid areas",
                         "title": {
                           "en": "Dry and sub-humid areas"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "A862ABFC-B97D-4E6A-9A70-812A82A7CC19"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "D570A745-D8C3-4698-BB77-0A90C140F3F2",
                         "name": "Forest",
                         "title": {
                           "en": "Forest"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "A862ABFC-B97D-4E6A-9A70-812A82A7CC19"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "47DD3FF6-D369-4E64-B0BC-5DADF3B70C95",
                         "name": "Inland waters",
                         "title": {
                           "en": "Inland waters"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "A862ABFC-B97D-4E6A-9A70-812A82A7CC19"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "9EC60226-A7E4-441E-AC7D-2580F111EC3B",
                         "name": "Islands",
                         "title": {
                           "en": "Islands"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "A862ABFC-B97D-4E6A-9A70-812A82A7CC19"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "507D46E0-DC49-47F0-B273-26ECD9CC8948",
                         "name": "Marine and coastal areas",
                         "title": {
                           "en": "Marine and coastal areas"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "A862ABFC-B97D-4E6A-9A70-812A82A7CC19"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "EAE641FD-6A82-4C15-84CD-0F12ABA5CBC1",
                         "name": "Mountains",
                         "title": {
                           "en": "Mountains"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "A862ABFC-B97D-4E6A-9A70-812A82A7CC19"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "DFEECF62-EC3D-4F5C-BAC6-2FD308F81277",
                         "name": "Protected areas",
                         "title": {
                           "en": "Protected areas"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "A862ABFC-B97D-4E6A-9A70-812A82A7CC19"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "2C87B4AD-684C-48DC-91B7-82938CE37B5A",
                         "name": "Ex-situ collections",
                         "title": {
                           "en": "Ex-situ collections"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "A862ABFC-B97D-4E6A-9A70-812A82A7CC19"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "CB918E1A-E171-4C10-BA35-088C81F668A3",
                         "name": "Soil and/or water samples",
                         "title": {
                           "en": "Soil and/or water samples"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "A862ABFC-B97D-4E6A-9A70-812A82A7CC19"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "B8A150E054154AD3AD97856ABD485E90",
                         "name": "Traditional knowledge associated with genetic resources",
                         "title": {
                           "en": "Traditional knowledge associated with genetic resources"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "01DA2D8E-F2BB-4E85-A17E-AB0219194A17",
                         "name": "Relationship with other international instruments",
                         "title": {
                           "en": "Relationship with other international instruments"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [],
                         "narrowerTerms": [
                           "A71B36E8-D2CE-4254-A628-6DBFB902394C"
                         ],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "A71B36E8-D2CE-4254-A628-6DBFB902394C",
                         "name": "Plant genetic resources for food and agriculture exchanged using the standard material transfer agreement of the International Treaty on Plant Genetic Resources for Food and Agriculture",
                         "title": {
                           "en": "Plant genetic resources for food and agriculture exchanged using the standard material transfer agreement of the International Treaty on Plant Genetic Resources for Food and Agriculture"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "01DA2D8E-F2BB-4E85-A17E-AB0219194A17"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "08B2CDEC-786F-4977-AD0A-6A709695528D",
                         "name": "Access",
                         "title": {
                           "en": "Access"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [],
                         "narrowerTerms": [
                           "1E824A31-BDFB-4C47-9593-8006B5FC7D60",
                           "5427EB8F-5532-4AE2-88EE-5B9619917480"
                         ],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "1E824A31-BDFB-4C47-9593-8006B5FC7D60",
                         "name": "Access to genetic resources, including prior informed consent",
                         "title": {
                           "en": "Access to genetic resources, including prior informed consent"
                         },
                         "shortTitle": {},
                         "description": "Access / Access to genetic resources, including prior informed consent",
                         "source": "",
                         "broaderTerms": [
                           "08B2CDEC-786F-4977-AD0A-6A709695528D"
                         ],
                         "narrowerTerms": [
                           "7CAC5B93-7E27-441F-BFEB-9E416D48B1BE",
                           "A7769659-17DB-4ED4-B1CA-A3ADD9CBD3A4"
                         ],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "7CAC5B93-7E27-441F-BFEB-9E416D48B1BE",
                         "name": "For commercial purposes",
                         "title": {
                           "en": "For commercial purposes"
                         },
                         "shortTitle": {},
                         "description": "Access / Access to genetic resources, including prior informed consent / For commercial purposes",
                         "source": "",
                         "broaderTerms": [
                           "1E824A31-BDFB-4C47-9593-8006B5FC7D60"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "A7769659-17DB-4ED4-B1CA-A3ADD9CBD3A4",
                         "name": "For non-commercial purposes",
                         "title": {
                           "en": "For non-commercial purposes"
                         },
                         "shortTitle": {},
                         "description": "Access / Access to genetic resources, including prior informed consent / For non-commercial purposes",
                         "source": "",
                         "broaderTerms": [
                           "1E824A31-BDFB-4C47-9593-8006B5FC7D60"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "5427EB8F-5532-4AE2-88EE-5B9619917480",
                         "name": "Access to traditional knowledge associated with genetic resources, including prior informed consent or approval and involvement",
                         "title": {
                           "en": "Traditional knowledge associated with genetic resources"
                         },
                         "shortTitle": {},
                         "description": "Access / Access to traditional knowledge associated with genetic resources, including prior informed consent or approval and involvement",
                         "source": "",
                         "broaderTerms": [
                           "08B2CDEC-786F-4977-AD0A-6A709695528D"
                         ],
                         "narrowerTerms": [
                           "3AC68883-4DD9-4F07-A941-30F7B910D24C",
                           "7E3ECD30-1972-487B-A920-DDB439DC2DF6"
                         ],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "3AC68883-4DD9-4F07-A941-30F7B910D24C",
                         "name": "For commercial purposes",
                         "title": {
                           "en": "For commercial purposes"
                         },
                         "shortTitle": {},
                         "description": "Access / Access to traditional knowledge associated with genetic resources, including prior informed consent or approval and involvement / For commercial purposes",
                         "source": "",
                         "broaderTerms": [
                           "5427EB8F-5532-4AE2-88EE-5B9619917480"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "7E3ECD30-1972-487B-A920-DDB439DC2DF6",
                         "name": "For non-commercial purposes",
                         "title": {
                           "en": "For non-commercial purposes"
                         },
                         "shortTitle": {},
                         "description": "Access / Access to traditional knowledge associated with genetic resources, including prior informed consent or approval and involvement / For non-commercial purposes",
                         "source": "",
                         "broaderTerms": [
                           "5427EB8F-5532-4AE2-88EE-5B9619917480"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "NEED-NEW-GUID",
                         "name": "Benefit-sharing",
                         "title": {
                           "en": "Benefit-sharing"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [],
                         "narrowerTerms": [
                           "A896179F-833E-4F76-B3F4-81CC95C66592"
                         ],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "A896179F-833E-4F76-B3F4-81CC95C66592",
                         "name": "Mutually agreed terms",
                         "title": {
                           "en": "Mutually agreed terms"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": ["NEED-NEW-GUID"],
                         "narrowerTerms": [
                           "628FA533-5B81-481A-8374-A0CF8DF0CF22",
                           "0AE1295D-0797-44B6-B0AC-974EA356096D"
                         ],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "628FA533-5B81-481A-8374-A0CF8DF0CF22",
                         "name": "Monetary Benefits",
                         "title": {
                           "en": "Monetary Benefits"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "A896179F-833E-4F76-B3F4-81CC95C66592"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "0AE1295D-0797-44B6-B0AC-974EA356096D",
                         "name": "Non-monetary Benefits",
                         "title": {
                           "en": "Non-monetary Benefits"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "A896179F-833E-4F76-B3F4-81CC95C66592"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63",
                         "name": "Compliance",
                         "title": {
                           "en": "Compliance"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [],
                         "narrowerTerms": [
                           "NEED-NEW-GUID-COMPLIANCE-2",
                           "4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C",
                           "1FCC6CA9-022F-42FD-BD02-43AE674FEB56"
                         ],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "NEED-NEW-GUID-COMPLIANCE-2",
                         "name": "Compliance with domestic legislation or regulatory requirements",
                         "title": {
                           "en": "Compliance with domestic legislation or regulatory requirements"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63"
                         ],
                         "narrowerTerms": ["F2E6038A-6E99-4BCE-9582-155B72CC7730",
                                            "0C7D5977-E5B8-4311-A26F-94E775EFB137",
                                            "8C3BBBA1-3663-4F6E-B366-B70DC91391A3"
                                        ],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "F2E6038A-6E99-4BCE-9582-155B72CC7730",
                         "name": "On access to genetic resources and benefit-sharing",
                         "title": {
                           "en": "On access to genetic resources and benefit-sharing"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "NEED-NEW-GUID-COMPLIANCE-2"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "0C7D5977-E5B8-4311-A26F-94E775EFB137",
                         "name": "On access to traditional knowledge associated with genetic resources and benefit-sharing",
                         "title": {
                           "en": "On access to traditional knowledge associated with genetic resources and benefit-sharing"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "NEED-NEW-GUID-COMPLIANCE-2"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "8C3BBBA1-3663-4F6E-B366-B70DC91391A3",
                         "name": "Non-compliance with domestic legislation or regulatory requirements",
                         "title": {
                           "en": "Non-compliance with domestic legislation or regulatory requirements"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "NEED-NEW-GUID-COMPLIANCE-2"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C",
                         "name": "Monitoring the utilization of genetic resources",
                         "title": {
                           "en": "Monitoring the utilization of genetic resources"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63"
                         ],
                         "narrowerTerms": [
                           "52D71068-71D3-4082-875D-D6190892E760",
                           "99018940-7B01-4BB7-996D-7C71A0B262F9"
                         ],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "7CB2A03A-F0CF-4458-BB3B-A60DEC1F942E",
                         "name": "Transboundary cooperation ",
                         "title": {
                           "en": "Transboundary cooperation "
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "52D71068-71D3-4082-875D-D6190892E760",
                         "name": "Checkpoints",
                         "title": {
                           "en": "Checkpoints"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "99018940-7B01-4BB7-996D-7C71A0B262F9",
                         "name": "Permits or their equivalent constituting an internationally recognized certificate of compliance",
                         "title": {
                           "en": "Permits or their equivalent constituting an internationally recognized certificate of compliance"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "1FCC6CA9-022F-42FD-BD02-43AE674FEB56",
                         "name": "Compliance with mutually agreed terms",
                         "title": {
                           "en": "Compliance with mutually agreed terms"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [
                           "E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63"
                         ],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "ECE508D3-26C6-42E6-A8B8-162606E5BA04",
                         "name": "Awareness-raising",
                         "title": {
                           "en": "Awareness-raising"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "ECBDB95A-B389-4DB4-AD9B-DA3590DF7781",
                         "name": "Capacity",
                         "title": {
                           "en": "Capacity"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": [],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       },
                       {
                         "identifier": "ECBDB95A-B389-4DB4-AD9B-DA3590BLAISE",
                         "name": "Capacity",
                         "title": {
                           "en": "Capacity"
                         },
                         "shortTitle": {},
                         "description": "",
                         "source": "",
                         "broaderTerms": ["ECBDB95A-B389-4DB4-AD9B-DA3590DF7781"],
                         "narrowerTerms": [],
                         "relatedTerms": [],
                         "nonPreferedTerms": []
                       }
                     ]
                 };



                //==============================
                //
                //==============================
                $scope.init = function() {

                    return $q.when($scope.terms||$scope.termsFn(),
                        function(data) { // on success
                            $scope.terms = data;
                        });
                }

                //==============================
                //
                //==============================
                $scope.load = function() {

                    // if (!$scope.terms) // Not initialized
                    //     return;
                    return $q.when($scope.init())
                        .then(function(){
                            var oNewIdentifiers = {};
                            var oNewSections = {};

                            // if (!$.isArray($scope.terms))
                            //     throw "Type must be array";

                            if ($scope.binding) {

                                if (!$.isArray($scope.binding))
                                    throw "Type must be array";

                                for (var i = 0; i < $scope.binding.length; ++i) {
                                    oNewIdentifiers[$scope.binding[i].identifier] = true;
                                    oNewSections[$scope.binding[i].identifier] = $scope.binding[i].section||{};
                                }
                            }

                            if (!angular.equals(oNewIdentifiers, $scope.identifiers)) $scope.identifiers = oNewIdentifiers;
                            if (!angular.equals(oNewSections, $scope.sections)) $scope.sections = oNewSections;
                        });
                }


                //==============================
                //
                //==============================
                $scope.onTerms = function(refTerms) {

                    $scope.rootTerms = [];

                    if (refTerms) {
                        $q.when($scope.load())
                        .then(function(){
                            if (!$.isArray($scope.document)){
                                if ($scope.document.amendedMeasures) {

                                    var amendedMeasures = _.map($scope.document.amendedMeasures, function(item) {
                                        return $http.get('/api/v2013/documents/' + item.identifier)
                                    })
                                    $q.all(amendedMeasures)
                                        .then(function(data) {
                                            data.forEach(function(measure) {
                                                appendElementMeasure(measure.data, $scope.terms);
                                                return;
                                            });
                                        })
                                        .then(function(data) {
                                            buildTree();
                                            updateProperties($scope.rootTerms, 1)
                                        });
                                } else {
                                    $.when($scope.init())
                                    .then(function(){
                                        buildTree();
                                    });
                                }
                            }
                            else if ($.isArray($scope.document)){

                                _.each($scope.document, function(measure){
                                    addMeasureToElements(measure.document ? measure.document : measure);

                                        buildTree();
                                        updateProperties($scope.rootTerms, 1);

                                });
                                console.log($scope.terms, $scope.rootTerms,existing);
                            }
                        });
                    }
                };

                function buildTree() {

                    if (($scope.layout || "tree") == "tree") //Default layout
                        $scope.rootTerms = thesaurus.buildTree($scope.terms);
                    else
                        $scope.rootTerms = Enumerable.from($scope.terms).Select("o=>{identifier : o.identifier, name : o.name, title : o.title, description : o.description}").ToArray();

                }
                //==============================
                //
                //==============================
                $scope.setError = function(error) {
                    if (!error) {
                        $scope.error = null;
                        return;
                    }

                    if (error.status == 404) $scope.error = "Terms not found";
                    else $scope.error = error.data || "unkown error";
                }

                function getRleatedMeasures() {

                    _.each(document.amendedMeasures, function(amended) {
                        $http.get('/api/v2013/documents/' + amended.identifier)
                            .success(function(data) {
                                appendElementMeasure(amended);
                                // amended.measure = data;
                                // relatedElement(measure.document, amended.measure);

                            });
                    });

                    // {
                    //   "identifier": "DOC-GUID",
                    //   "title": "DOC-TITLE",
                    //   "broaderTerms": [
                    //     "4E2974DF-216E-46C8-8797-8E3A33D6A048"
                    //   ]
                    // }
                }

                function addMeasureToElements(measure) {
                    if($scope.type=='multiple'){
                        _.forEach(measure.absMeasures, function(measureElement) {
                            newElement(measureElement, measure);
                        });
                    }
                    _.forEach(measure.linkedMeasures, function(measureElement) {
                        if(measureElement.measure)
                            _.forEach(measureElement.measure.absMeasures, function(element) {
                                newElement(element, measureElement.measure, 'linked', measure.header.identifier);
                            });

                    });
                    // _.forEach(measure.relatedMeasures, function(measureElement) {
                    //     if(measureElement.measure)
                    //         _.forEach(measureElement.measure.absMeasures, function(element) {
                    //             newElement(element, measureElement.measure, 'amended', measure.header.identifier);
                    //         });
                    // });
                }
                var existing = [];
                function newElement(measureElement, measure, type, parentMeasure){

                    var element = _.findWhere($scope.terms, {'identifier': measureElement.identifier});

                    if(!element)
                        return;

                    var measureElementExists = _.some(existing, function(term){
                            return (term.measureId == measure.header.identifier || term.measureId == parentMeasure) &&
                                    term.elementId == measureElement.identifier && (term.type=='linked' || term.type=='amended');
                        });
                    // //measure is already added for the element ignore.
                    if(measureElementExists)
                        return;
                    if($scope.type=='multiple' && (type=='linked' || type=='amended')){
                        var parentMeasureElementExists = _.find($scope.terms, function(term){
                                                       return term.measureIdentifier == parentMeasure && term.name == measureElement.identifier;
                                                   });
                        if(parentMeasureElementExists)
                            element = parentMeasureElementExists;
                    }
                    // console.log(measureElementExists);


                    if (element) {
                        var elementMeasure = {};
                        elementMeasure.identifier = guid();
                        elementMeasure.measureIdentifier = measure.header.identifier;
                        elementMeasure.name = element.identifier;
                        elementMeasure.title = measure.title;

                        elementMeasure.broaderTerms = [];
                        elementMeasure.broaderTerms.push(element.identifier);
                        if(!element.narrowerTerms)
                            element.narrowerTerms = [];
                        element.narrowerTerms.push(elementMeasure.identifier);

                        $scope.terms.push(elementMeasure);

                        $scope.identifiers[elementMeasure.identifier] = true;
                        if(measureElement.section)
                            $scope.sections[elementMeasure.identifier] = measureElement.section||{};

                        existing.push({measureId:measure.header.identifier, elementId:element.identifier, type:type});
                    }
                }


                function appendElementMeasure(measure, terms) {

                    _.forEach(measure.absMeasures, function(measureElement) {
                        var element = _.findWhere(terms, {
                            'identifier': measureElement.identifier
                        });
                        if (element) {
                            var elementMeasure = {};
                            elementMeasure.identifier = guid();
                            elementMeasure.measureIdentifier = measure.header.identifier;
                            elementMeasure.name = elementMeasure.identifier;
                            elementMeasure.title = measure.title;
                            elementMeasure.broaderTerms = [];

                            elementMeasure.broaderTerms.push(element.identifier);

                            element.narrowerTerms.push(elementMeasure.identifier);

                            terms.push(elementMeasure);

                            $scope.identifiers[elementMeasure.identifier] = true;
                            $scope.sections[elementMeasure.identifier] = measureElement.section||{};
                        }
                    });
                    console.log(terms);
                }

                $scope.isMeasure = function(entity) {
                    return entity && _.findWhere($scope.terms, {
                        identifier: entity.identifier
                    }).measureIdentifier;
                }

                $scope.hasMeasure = function(entity) {

                    if (!entity)
                        return false;

                    if (!entity.hasMeasure === undefined)
                        return entity.hasMeasure;

                    if (!entity.narrowerTerms) {
                        entity.hasMeasure = false;
                        return entity.hasMeasure;
                    }

                    entity.hasMeasure = _.some($scope.terms, function(item) {
                        return item.measureIdentifier && _.findWhere(item.broaderTerms, {
                            identifier: entity.identifier
                        });
                    });

                    return entity.hasMeasure;
                }

                function updateProperties(terms, level) {

                    _.each(terms, function(term) {

                        var element = _.findWhere($scope.terms, {
                            identifier: term.identifier
                        });
                        term.level = level;

                        if (element.measureIdentifier) {
                            term.isMeasure = true;
                            _.map(term.broaderTerms, function(brTerm) {
                                brTerm.hasMeasure = true;
                            });
                        }

                        if (term.narrowerTerms) {
                            term.isChildSelected = updateProperties(term.narrowerTerms, level + 1);
                        }
                        else {
                            if($scope.sections[term.identifier])
                                term.isChildSelected = true;
                        }
                        if(term.isChildSelected){
                            _.map(term.broaderTerms, function(brTerm) {
                                brTerm.isChildSelected = true;
                            });
                        }

                    });
                    return _.some(terms, function(term){
                        return $scope.sections[term.identifier];
                    });
                }


            }]
        }
    });


});
