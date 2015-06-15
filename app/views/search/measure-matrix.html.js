define(['app','underscore'], function (app, _) {

    app.controller('matrixController', ['$scope', '$http','realm','$q','$filter','$routeParams',
        function ($scope, $http, realm, $q, $filter, $routeParams) {

		var scopeOfMeasures = [
                                    { "identifier":"357DBB22-6A6C-4C49-BA1F-037320B09247",      "name":"Plants" ,"parent":"24E809DA-20F4-4457-9A8A-87C08DF81E8A"},
                                    { "identifier":"9C146B09-097E-4CFF-B9CC-D4785496952F",      "name":"Animals","parent":"24E809DA-20F4-4457-9A8A-87C08DF81E8A"},
                                    {  "identifier":"33A6BF46-3699-4B5E-A3C0-506FAFDA2D76",      "name":"Microorganism","parent":"24E809DA-20F4-4457-9A8A-87C08DF81E8A"},
                                    {  "identifier":"http://data.gbif.org/species/13140807",      "name":"Fungi","parent":"24E809DA-20F4-4457-9A8A-87C08DF81E8A"},
                                    {  "identifier":"2D2CAF72-A892-42CE-87F7-975EFBADAF4F",      "name":"Wild species","parent":"24E809DA-20F4-4457-9A8A-87C08DF81E8A"},
                                    {  "identifier":"F9EF6CC8-3709-43D5-839C-1A93A23DE51B",      "name":"Domestic species","parent":"24E809DA-20F4-4457-9A8A-87C08DF81E8A"},
                                    {  "identifier":"35E029ED-D92F-41C8-9CDC-52F3F35D7E36",      "name":"Agricultural areas","parent":"24E809DA-20F4-4457-9A8A-87C08DF81E8A"},
                                    {  "identifier":"D570A745-D8C3-4698-BB77-0A90C140F3F2",      "name":"Forest","parent":"24E809DA-20F4-4457-9A8A-87C08DF81E8A"},
                                    {  "identifier":"47DD3FF6-D369-4E64-B0BC-5DADF3B70C95",      "name":"Inland waters","parent":"24E809DA-20F4-4457-9A8A-87C08DF81E8A"},
                                    {  "identifier":"29C670AB-C198-484F-A2ED-9BAB1DAC7431",      "name":"Dry and sub-humid areas","parent":"24E809DA-20F4-4457-9A8A-87C08DF81E8A"},
                                    {  "identifier":"507D46E0-DC49-47F0-B273-26ECD9CC8948",      "name":"Marine and coastal areas","parent":"24E809DA-20F4-4457-9A8A-87C08DF81E8A"},
                                    {  "identifier":"EAE641FD-6A82-4C15-84CD-0F12ABA5CBC1",     "name":"Mountains","parent":"24E809DA-20F4-4457-9A8A-87C08DF81E8A"},
                                    {  "identifier":"DFEECF62-EC3D-4F5C-BAC6-2FD308F81277",      "name":"Protected areas","parent":"24E809DA-20F4-4457-9A8A-87C08DF81E8A"},
                                    {  "identifier":"9EC60226-A7E4-441E-AC7D-2580F111EC3B",      "name":"Islands","parent":"24E809DA-20F4-4457-9A8A-87C08DF81E8A"},
                                    {  "identifier":"2C87B4AD-684C-48DC-91B7-82938CE37B5A",      "name":"Ex-situ collections","parent":"24E809DA-20F4-4457-9A8A-87C08DF81E8A"},
                                    {  "identifier":"CB918E1A-E171-4C10-BA35-088C81F668A3",      "name":"Soil and/or water samples","parent":"24E809DA-20F4-4457-9A8A-87C08DF81E8A"},
                                    {  "identifier":"B8A150E054154AD3AD97856ABD485E90",         "name":"Traditional knowledge associated with genetic resources","parent":"24E809DA-20F4-4457-9A8A-87C08DF81E8A"}];
        var relations = [
            {"identifier":"A71B36E8-D2CE-4254-A628-6DBFB902394C",
            "name" : "Plant genetic resources for food and agriculture exchanged using the standard material transfer agreement of the International Treaty on Plant Genetic Resources for Food and Agriculture",
            "parent":"01DA2D8E-F2BB-4E85-A17E-AB0219194A17"}
            ];
        var informedConsent = [
                {"identifier":"7CAC5B93-7E27-441F-BFEB-9E416D48B1BE", "name":"For commercial purposes","parent":"08B2CDEC-786F-4977-AD0A-6A709695528D"},
                {"identifier":"A7769659-17DB-4ED4-B1CA-A3ADD9CBD3A4", "name":"For non-commercial purposes","parent":"08B2CDEC-786F-4977-AD0A-6A709695528D"}
            ];
        var traditionalKnowledge = [
            {"identifier":"3AC68883-4DD9-4F07-A941-30F7B910D24C",   "name":"For commercial purposes","parent":"5427EB8F-5532-4AE2-88EE-5B9619917480",},
            {"identifier":"7E3ECD30-1972-487B-A920-DDB439DC2DF6",   "name":"For non-commercial purposes","parent":"5427EB8F-5532-4AE2-88EE-5B9619917480",}
        ];

        var benefitsAgreedTerms = [
            {   "identifier":"628FA533-5B81-481A-8374-A0CF8DF0CF22",    "name":"Monetary Benefits","parent":"A896179F-833E-4F76-B3F4-81CC95C66592"},
            {   "identifier":"0AE1295D-0797-44B6-B0AC-974EA356096D",   "name":"Non-monetary Benefits","parent":"A896179F-833E-4F76-B3F4-81CC95C66592"}
        ];
        var compliance = [
            {"identifier":"F2E6038A-6E99-4BCE-9582-155B72CC7730",      "name":"Compliance with domestic legislation or regulatory requirements on access to genetic resources and benefit-sharing" ,"parent":"E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63" },
            {"identifier":"0C7D5977-E5B8-4311-A26F-94E775EFB137",      "name":"Compliance with domestic legislation or regulatory requirements on ABS for access to traditional knowledge associated with genetic resources and benefit-sharing","parent":"E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63" },
            {"identifier":"8C3BBBA1-3663-4F6E-B366-B70DC91391A3",      "name":"Non-compliance with domestic legislation or regulatory requirements" ,"parent":"E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63"},
            {"identifier":"1FCC6CA9-022F-42FD-BD02-43AE674FEB56",      "name":"Compliance with mutually agreed terms" ,"parent":"E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63"},
        ];
        var monitoringUtilization = [{"identifier":"99018940-7B01-4BB7-996D-7C71A0B262F9",   "name":"Permits or their equivalent constituting an internationally recognized certificate of compliance" ,"parent":"4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C"},
                                     {"identifier":"52D71068-71D3-4082-875D-D6190892E760",    "name":"Checkpoints","parent":"4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C" }
                                 ];

        var scopeElements = [
                          {"identifier":"24E809DA-20F4-4457-9A8A-87C08DF81E8A",      "name":"Scope of the measure", elements:[]},
                          {"identifier":"01DA2D8E-F2BB-4E85-A17E-AB0219194A17",      "name":"Relationship with other international instruments", elements:[]},
                          {"identifier":"08B2CDEC-786F-4977-AD0A-6A709695528D",      "name":"Access to genetic resources, including prior informed consent", elements:[]},
                          {"identifier":"5427EB8F-5532-4AE2-88EE-5B9619917480",      "name":"Access to traditional knowledge associated with genetic resources, including prior informed consent or approval and involvement", elements:[]},
                          {"identifier":"A896179F-833E-4F76-B3F4-81CC95C66592",      "name":"Benefit-sharing", elements:[]},
                          {"identifier":"E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63",      "name":"Compliance", elements:[]},
                          {"identifier":"4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C",      "name":"Monitoring the utilization of genetic resources", elements:[]},
                          {"identifier":"7CB2A03A-F0CF-4458-BB3B-A60DEC1F942E",      "name":"Transboundary cooperation ", elements:[]},
                          {"identifier":"ECE508D3-26C6-42E6-A8B8-162606E5BA04",      "name":"Awareness-raising", elements:[]},
                          {"identifier":"ECBDB95A-B389-4DB4-AD9B-DA3590DF7781",      "name":"Capacity", elements:[]},
                          {"identifier":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",      "name":"Other", elements:[]}
                      ];

		$scope.currentPage=0;
        $scope.itemsPerPage = 25;
        var uniqueIdQuery;
        if($routeParams.uniqueId){
            uniqueIdQuery = ' AND uniqueIdentifier_s:' + $routeParams.uniqueId.toLowerCase();
        }

    	var queryParameters = {
            'q': 'realm_ss:'+ realm.value.toLowerCase() + ' AND schema_s:measure ' + (uniqueIdQuery ? uniqueIdQuery : ''),
            'sort': 'government_EN_t asc',
            'fl': 'id,identifier_s,title_t,createdDate_dt,description_t,government_EN_t,status_EN_t,type_EN_t,jurisdiction_EN_t,adoption_dt,entryIntoForce_dt,retired_dt,limitedApplication_dt',
            'wt': 'json',
            'start': $scope.currentPage * $scope.itemsPerPage,
            'rows': $scope.itemsPerPage
        };

        $http.get('/api/v2013/index/select', { params: queryParameters })
		.success(function (data) {

             $scope.measures = [];
             $scope.measures = data.response.docs;
             $scope.documentCount   = data.response.numFound;
             if($routeParams.uniqueId && $scope.measures.length>0){
                 $scope.loadMatrix($scope.measures[0]);
             }

        }).error(function (error) {
            console.log('onerror'); console.log(error);
         });

         $scope.loadMatrix = function(measure){
             measure.showDocument = !measure.showDocument;
             if(measure && !measure.document){
                 measure.isLoading = true;

                 $http.get('/api/v2013/documents/' + measure.identifier_s)
    			 .success(function (data) {

                     measure.document = data;
                     //to avoid diff filters sort this after loads
                     if(measure.document.absMeasures){
                         var elements = angular.copy(scopeElements);
                         measure.document.scopeOfElements = elements;

                         _.map(measure.document.absMeasures, function(measureScope){
                             var element;
                             var parentElement;
                            if(_.findWhere(scopeElements,{'identifier':measureScope.identifier})){
                                parentElement = _.findWhere( measure.document.scopeOfElements ,{'identifier':measureScope.identifier});
                               parentElement.reference = measureScope.section;
                            }
                            else if(_.findWhere(scopeOfMeasures,{'identifier':measureScope.identifier})){
                                element = _.findWhere( scopeOfMeasures ,{'identifier':measureScope.identifier});
                                parentElement = _.findWhere(measure.document.scopeOfElements ,{'identifier':element.parent});
                                parentElement.elements.push(measureScope);
                            }
                            else if(_.findWhere(relations,{'identifier':measureScope.identifier})){
                                element = _.findWhere(relations ,{'identifier':measureScope.identifier});
                                parentElement = _.findWhere( measure.document.scopeOfElements ,{'identifier':element.parent});
                                parentElement.elements.push(measureScope);
                            }
                            else if(_.findWhere(informedConsent,{'identifier':measureScope.identifier})){
                                element = _.findWhere( informedConsent ,{'identifier':measureScope.identifier});
                                parentElement = _.findWhere( measure.document.scopeOfElements ,{'identifier':element.parent});
                                parentElement.elements.push(measureScope);
                            }
                            else if(_.findWhere(traditionalKnowledge,{'identifier':measureScope.identifier})){
                                element = _.findWhere( traditionalKnowledge ,{'identifier':measureScope.identifier});
                                parentElement = _.findWhere( measure.document.scopeOfElements ,{'identifier':element.parent});
                                parentElement.elements.push(measureScope);
                            }
                            else if(_.findWhere(benefitsAgreedTerms,{'identifier':measureScope.identifier})){
                                element = _.findWhere( benefitsAgreedTerms ,{'identifier':measureScope.identifier});
                                parentElement = _.findWhere( measure.document.scopeOfElements ,{'identifier':element.parent});
                                parentElement.elements.push(measureScope);
                            }
                            else if(_.findWhere(compliance,{'identifier':measureScope.identifier})){
                                element = _.findWhere( compliance ,{'identifier':measureScope.identifier});
                                parentElement = _.findWhere( measure.document.scopeOfElements ,{'identifier':element.parent});
                                parentElement.elements.push(measureScope);
                            }
                            else if(_.findWhere(monitoringUtilization,{'identifier':measureScope.identifier})){
                                element = _.findWhere(monitoringUtilization ,{'identifier':measureScope.identifier});
                                parentElement = _.findWhere( measure.document.scopeOfElements ,{'identifier':element.parent});
                                parentElement.elements.push(measureScope);
                            }
                         });

                         _.each(measure.document.amendedMeasures, function(amended){
                             $http.get('/api/v2013/documents/' + amended.identifier)
    			             .success(function (data) {
                                 amended.measure = data;
                                 relatedElement(measure.document, amended.measure);
                             });
                         });

                         _.each(measure.document.linkedMeasures, function(amended){
                             $http.get('/api/v2013/documents/' + amended.identifier)
    			             .success(function (data) {
                                 amended.measure = data;
                                 relatedElement(measure.document, amended.measure);
                             });
                         });

                     }
                      console.log(scopeElements);
                 }).error(function (error) {
                    console.log('onerror'); console.log(error);
                 })
                 .finally(function(){
                     measure.isLoading=false;
                 });;
             }

         };

         function relatedElement(measure, searchMeasure){

            _.forEach(measure.scopeOfElements, function(parentElement){
                _.forEach(parentElement.elements, function(measureElement){
                    var element = _.findWhere(searchMeasure.absMeasures, {'identifier':measureElement.identifier});
                    if(element){

                        if(!measureElement.relatedElements)
                            measureElement.relatedElements = [];

                        _.extend(element, {title: measure.title });
                        measureElement.relatedElements.push(element);
                    }
                });
            });
         }

	}]);

});
