define(['app',
	'../views/directives/login.directive.html.js',
	'./register-record-list.directive.js',
	'./directives/task-id-directive.html.js',
	'./directives/user-details.directive.html.js',
  './directives/ngxLazy.directive.js'], function (app) {

  "use strict";
// angular.module([]);

  app.controller("RegisterController",
    ["$rootScope", "$location" , "$scope", "$q", "$window", "IStorage", "underscore",
     "schemaTypes", "$timeout","lstringFilter", "$routeParams", "$cookies",
	  function ($rootScope, $location, $scope, $q, $window, storage, _,
      schemaTypes, $timeout, lstringFilter, $routeParams, $cookies) {






    //TODO: stop using so many globals =P I should inherit the controller scope or something.
    $rootScope.subheadings = {
      	'National Entities':{
		'title': 'National Entities',
		'formats': ['authority', 'absCheckpoint'],
		'roles':['AbsPublishingAuthorities', 'abschiac','AbsNationalAuthorizedUser','AbsNationalFocalPoint','AbsAdministrator','Administrator']
		},
      	'National Records': {
		'title': 'National Records',
		'formats': ['measure', 'absPermit', 'absCheckpointCommunique', 'database'],
		'roles':['AbsPublishingAuthorities', 'abschiac','AbsNationalAuthorizedUser','AbsNationalFocalPoint','AbsAdministrator','Administrator']
		},
	  	'Reference Records': {
		'title': 'Reference Records',
		'formats': ['resource'],
		'roles':['AbsPublishingAuthorities', 'abschiac','AbsNationalAuthorizedUser','AbsNationalFocalPoint', 'AbsAdministrator','Administrator', 'User']
		}
    };

    $rootScope.document_types = {
      measure: {
        abbreviation: 'MSR',
        title: 'Legislative, administrative or policy measures on access and benefit-sharing',
        help: 'This common format is to be used for legislative, administrative and policy measures on access and benefit-sharing. This information shall be made available to the Access and Benefit-Sharing Clearing-House (ABS-CH) in accordance with Article 14, paragraph 2(a), of the Nagoya Protocol on Access and Benefit-sharing. <br /><br /> Access and benefit-sharing measures may include strategies, policies, legislation or regulations. They may also include measures undertaken at the regional, national, sub-national or community level. For each ABS measure a new common format has to be filled. The format includes a list of ABS elements and the possibility of pointing out to the specific articles and sections where the specific element is addressed in the measure. Having this information for all existing ABS measures of a country displayed in the ABS Clearing-House would help users to find the specific information they are looking for in order to access to genetic resources and traditional knowledge associated to genetic resources.'
               + '<br><div class="alert alert-warning" ng-show="help">'
               + '  Please submit a new form for each legislative, administrative or policy measure. You will need to submit as many forms as number of ABS measures are available within your jurisdiction. Amendments to existing measures will also need to be included through an independent form and provide a link to the measure that is being amended, so the two records can be displayed together.'
               + '  <br><br>You can also use this form to make explanatory information on how to apply for prior informed consent or other processes and procedures available, including information flowcharts or summary information.'
               + '</div>',
        tips: [
          'Remember to upload the document text in its <strong>original language</strong>.',
          'Please upload <strong>courtesy or official translations</strong> of the measure if available.',
        ],
      },
      authority: {
        abbreviation: 'CNA',
        title: 'Competent National Authority',
        help: 'Article 13 of the Nagoya Protocol requires the designation of one or more competent national authorities on access and benefit-sharing. This information shall be made available to the Access and Benefit-Sharing Clearing-House (ABS-CH) in accordance with Article 14, paragraph 2(b), of the Nagoya Protocol on Access and Benefit-sharing. <br /><br /> CNAs are bodies established by governments and are responsible for granting access to users of their genetic resources. Parties can decide to establish one or more CNAs, however if more than one CNAs are established, their responsibilities need to be clearly identified. National implementation measures establish how CNAs work in a given country. Therefore, this common format has been prepared for facilitating the submission of information on competent national authorities by Parties.'
         + '<div class="alert alert-warning" ng-show="help">'
         + '  <strong>Timeframe for confirmation or updating of information</strong>'
         + '  <br>Please note that this category of information requires confirmation or updating after two years from the date of submission. After the deadline you will be asked to confirm or update the record within 3 months. After this period, if no confirmation has been received, the record will be marked as “Not confirmed”.'
         + '</div>',
        tips: [
          '<strong>Register the related ABSCH-MSR</strong>: To include the legal, administrative or policy basis for the competence of the CNA, please complete the ABSCH-MSR common format registering this information before starting the CNA form.',
          '<strong>CNA Responsibilities</strong>: Please note that when adding a CNA that is not responsible for all functions or when adding multiple CNAs you will be required to describe the responsibilities for each CNA. When adding or updating a CNA, it can be helpful to review all responsibilities of all CNAs are correct.',
        ],
      },
      absPermit: {
        abbreviation: 'IRCC',
        title: 'Permit or its equivalent constituting an internationally recognized certificate of compliance',
        //TODO: use partials instead. For the entire help portion... because this is ridiculous.
        help: 'This common format is to be used for registering permits or their equivalent issued at the time of access as evidence of the decision to grant prior informed consent (PIC) and of the establishment of mutually agreed terms (MAT) in accordance with Article 6, paragraph 3 (e) of the Nagoya Protocol on Access and Benefit-sharing. This information is to be made available to the ABS Clearing-House in accordance with Article 14, paragraph 2 (c).<br />'
         + '<br />In accordance with Article 17, paragraph 2, a permit or its equivalent issued in accordance with Article 6, paragraph 3 (e) and made available to the ABS Clearing-House, shall constitute an internationally recognized certificate of compliance.<br />'
         + '<br />Article 17, paragraph 3, further establishes that the internationally recognized certificate of compliance shall serve as evidence that the genetic resource which it covers has been accessed in accordance with PIC and that MAT have been established, as required by the domestic ABS legislation or regulatory requirements of the Party providing PIC.<br />'
         + '<br />Article 17, paragraph 4, sets out the minimum information required for the internationally recognized certificate of compliance when it is not confidential, which in turn provides the minimum information to be reported to the ABS Clearing-House in this regard. This information includes:'
         + '<ol type="a" ng-show="help">'
         + '  <li>Issuing authority;</li>'
         + '         <li>Date of issuance;</li>'
         + '         <li>The provider;</li>'
         + '         <li>Unique identifier of the certificate;</li>'
         + '         <li>The person or entity to whom prior informed consent was granted;</li>'
         + '         <li>Subject-matter or genetic resources covered by the certificate;</li>'
         + '         <li>Confirmation that mutually agreed terms were established;</li>'
         + '         <li>Confirmation that prior informed consent was obtained; and</li>'
         + '         <li>Commercial and/or non-commercial use.</li>'
         + '</ol>'
         + 'On the basis of the information provided through this common format on the permit or its equivalent, the ABS Clearing-House will send a courtesy copy of the internationally recognized certificate of compliance constituted from information on the permit or its equivalent made available to the ABS Clearing-House by electronic means to:'
         + '<ol type="a">'
         + '  <li>The national focal point and the competent national authority or authorities of the country responsible for issuing the permits or its equivalent; and</li>'
         + '  <li>The person or entity to whom prior informed consent was granted.</li>'
         + '</ol>'
         + '<div class="alert alert-warning">Please note that all information submitted to the ABS Clearing-House will be made public and therefore, confidential information should not be submitted. Publishing authorities are reminded that it is their responsibility to ensure that any confidentiality clauses in mutually agreed terms are respected.</div>',
        tips: [
          '<strong>Please Note:</strong>All information submitted to the ABS Clearing-House will be made public and therefore, confidential information should not be submitted. Publishing authorities are reminded that it is their responsibility to ensure that any confidentiality clauses in mutually agreed terms are respected.',
          '<strong>Register the ABSCH-CNA:</strong>the appropriate CNA will need to have been previously registered in the system.',
        ],
      },
      absCheckpoint: {
        abbreviation: 'CP',
        title: 'Checkpoint',
        help: 'This common format is to be used for registering contact details of checkpoints designated under paragraph 1 (a) of Article 17, who would collect or receive, as appropriate, relevant information related to prior informed consent, to the source of the genetic resource, to the establishment of mutually agreed terms, and/or to the utilization of genetic resources.',
        tips: [
        ],
      },
      absCheckpointCommunique: {
        abbreviation: 'CPC',
        title: 'Information for the Checkpoint Communiqué',
        help: 'This common format is to be used to provide relevant information related to prior informed consent, to the source of the genetic resource, to the establishment of mutually agreed terms, and/or to the utilization of genetic resources (Article 17, paragraph 1 (a) (i)), including from the internationally recognized certificate of compliance, when such a certificate is available. In accordance with paragraph 1 (a) (iii) of Article 17 of the Nagoya Protocol, such information collected by the checkpoint needs to be provided to relevant national authorities, to the Party providing prior informed consent and to the ABS Clearing-House, as appropriate'
         + '<br><div class="alert alert-warning" ng-show="help">'
               + '  On the basis of the information collected or received by the checkpoint and provided by the national publishing authority to the ABS Clearing-House, a courtesy copy of the record will be automatically sent by electronic means to the following entities, as appropriate:'
               + '  <br><br><ul> <li>The designated national authority/ies as determined in the common format on checkpoints; and</li>'
               +                 '<li>The national focal point of the country and the competent national authority/ies of the country which is the provider of the genetic resource</li></ul>'
               + '</div>',
        tips: [
        ],
      },
      resource: {
        abbreviation: 'VLR',
        title: 'Virtual Library Record',
        help: 'The forms under the “reference records” category will allow the submission of non-mandatory information relevant to the Protocol from any registered user (e.g. governments, representatives of indigenous and local communities, academia, NGOs, research institutions, business representatives, etc.) to the ABS Clearing-House .The Secretariat would be responsible for validating all reference records.<br />'
         + '<br>Through its virtual library, the ABS Clearing-House provides access to different categories of information and publications categorised in a list of thematic areas. The information provided through this common format will facilitate online searches of information on the ABS relevant resources made available through the ABS Clearing-House, such as books, articles, papers, videos, and others.',
        tips: [
        ],
      },
      database: {
        abbreviation: 'NDB',
        title: 'ABS National Website or Database',
        help: 'This common format is to be used for registering information on national website or databases relevant to access and benefit-sharing.',
        tips: [
        ],
      },
      contacts: {
        abbreviation: 'CON',
        title: 'Contacts',
        help: '',
        tips: [],
      },

    };

    if($routeParams.document_type) //this is used to highlight the item on the left
      $scope.document_type = $routeParams.document_type;

    $scope.msg="";
    $scope.records = [];
    $scope.isLoaded = []; //What schemas are currently loaded

    $scope.localeRegister= ["en"];

    $scope.schemaTypesFacets = [
      {"schema":"measure","schemaType":"nationalRecords", "draftCount":0,"requestCount":0,"publishCount": 0},
      {"schema":"authority","schemaType":"nationalRecords", "draftCount":0,"requestCount":0,"publishCount": 0},
      {"schema":"absPermit","schemaType":"nationalRecords", "draftCount":0,"requestCount":0,"publishCount": 0},
      {"schema":"absCheckpoint","schemaType":"nationalRecords", "draftCount":0,"requestCount":0,"publishCount": 0},
      {"schema":"absCheckpointCommunique","schemaType":"nationalRecords", "draftCount":0,"requestCount":0,"publishCount": 0},
      {"schema":"database","schemaType":"nationalRecords", "draftCount":0,"requestCount":0,"publishCount": 0},
      {"schema":"resource","schemaType":"referenceRecords", "draftCount":0,"requestCount":0,"publishCount": 0},
      {"schema":"contact","schemaType":"others", "draftCount":0,"requestCount":0,"publishCount": 0}
    ];

    //============================================================

    $scope.isDraft = function(entity){
      return entity && entity.workingDocumentCreatedOn;
    };

    $scope.isRequest = function(entity){
      return entity && entity.workingDocumentLock;
    };

    $scope.isPublished = function(entity){
      return entity && entity.documentID;
    };

	//============================================================
	$scope.PAroles= ['AbsPublishingAuthorities', 'AbsNationalFocalPoint','AbsAdministrator','Administrator'];

	 $scope.compareRoles = function(array1, array2) {

		if(!array1) return false;
		if(!array2) return false;

		for(var i=0; i < array1.length; i++){
			for(var j=0; j < array2.length; j++){
				if(array1[i] == array2[j])
					return true;
			}
		}
    };


    //============================================================

    $scope.facets = function(entity,type){
      var schemaCount = _.where($scope.schemaTypesFacets,{"schema":entity});

      if(schemaCount.length>0)
      {
        if(type=='draft')
          return schemaCount[0].draftCount;
        else if(type=='publish')
          return schemaCount[0].publishCount;
        else if(type=='request')
          return schemaCount[0].requestCount;
      }
      return 0;
    };

    //============================================================

    $scope.userActivities = []; //Jason: what does this do?
    function loadRecords(schema)
    {
      console.log('schema: ', schema);

      $("a[role*='button']").toggleClass('ui-disabled');
      if(schema === null || schema===undefined ){
        schema = schemaTypes.join("' or type eq '");
      }

      if(schema === null || schema==undefined )
        return;


      if(_.contains($scope.isLoaded, schema))
        return;

      if(!$rootScope.user.isAuthenticated)
        return $scope.records = null;

      var qAnd = [];
      qAnd.push("(type eq '" + schema + "')");

      var qDocuments = storage.documents.query(qAnd.join(" and ")||undefined,undefined,{cache:false});

      var draftParams = {cache:false};
      if(schema =="contact")
         draftParams.body=true;

      var qDrafts    = storage.drafts   .query(qAnd.join(" and ")||undefined,draftParams);

      $q.all([qDocuments, qDrafts]).then(function(results) {

        var documents = results[0].data.Items;
        var drafts    = results[1].data.Items;

        var map = {};

        _.map(documents, function(o) { map[o.identifier] = o; });
        _.map(drafts,    function(o) { map[o.identifier] = o; });

        $scope.isLoaded.push(schema);

        _.values(map).forEach(function(row){

          if(schema!="dashboard" && schema!="contact"){
            var schemaCount = _.where($scope.schemaTypesFacets,{"schema":row.type});

            if(schemaCount !== null && schemaCount.length > 0)
            {
              schemaCount[0].draftCount 	+= $scope.isDraft(row) ? 1:0;
              schemaCount[0].requestCount += $scope.isRequest(row) ? 1:0;
              schemaCount[0].publishCount += $scope.isPublished(row) ? 1:0;
            }
            else
            {
              $scope.schemaTypesFacets.push({"schema":row.type, "draftCount":$scope.isDraft(row) ? 1:0
                ,"requestCount":$scope.isPublished(row) ? 1:0
                ,"publishCount":$scope.isRequest(row) ? 1:0});
            }
            if($scope.isRequest(row)){
              $scope.userActivities.push({
                            "title" : row.createdBy.firstName + ' ' + row.createdBy.lastName + ' has requested '+
                              _.where($scope.schemaTypesFacets,{"schema":row.type})[0].header
                              + ' draft ' + (lstringFilter(row.workingDocumentTitle||row.title,$rootScope.locale))
                              + ' to be published',
                            "identifier" : row.identifier,
                            "schema"	 : row.type
                             });
            }
            else if($scope.isDraft(row)){
              $scope.userActivities.push({
                            "title" : row.createdBy.firstName + ' ' + row.createdBy.lastName + ' is working on ' +
                              _.where($scope.schemaTypesFacets,{"schema":row.type})[0].header + ' draft '
                              +(lstringFilter(row.workingDocumentTitle||row.title,$rootScope.locale))

                              +(row.workingDocumentTitle||row.title)
                              ,
                            "identifier" : row.identifier,
                            "schema"	 : row.type
                             });
            }
          }
          $scope.records.push(row);
          if(schema =="contact"){

            if(!$scope.contacts)
              $scope.contacts = [];
            //console.log(row);
            if(!row.body.source && row.body.header)
              row.body.source = row.body.header.identifier;
            $scope.contacts.push(row.body)
          }
        })
        // var recrords _.groupBy($scope.records,'')
        $("a[role*='button']").toggleClass('ui-disabled');

        return $scope.records;
      });
    }
    //TODO: this is a scoping disaster. Needed for contacts, fix later.
    $rootScope.loadRecords = loadRecords;

    loadRecords();

    //So this is like a request for info... I don't like the idea of using JS as an message driven language. KISS
    $scope.$on("getDocumentInfo", function(evt) {

      if($scope.lastSchema)
        $scope.$broadcast("loadDocument", {
          schema : $scope.lastSchema,
          identifier : $scope.lastIdentifier
        });
    });

    //============================================================
    //
    // Occurs when edit-form is closed without saving
    //
    //============================================================
    $scope.$on("documentClosed", function(evt){

      evt.stopPropagation();
      $scope.editing = false;
      $scope.msg = "Your record has been closed without saving.";
      $timeout(function() {
        if($rootScope.next_url)
          $window.location.href = $rootScope.next_url;
        else
          $window.location.href = '/register/'+$scope.document_type;
      }, 500);

    });

    //============================================================
    //
    // Occurs when edit-form is closed and document is saved as draft
    //
    //============================================================
    $scope.$on("documentDraftSaved", function(evt, draftInfo) {
      //debugger;
      evt.stopPropagation();
      $scope.editing = false;
      $scope.msg = "Your record has been saved as a draft.";
      $timeout(function() { $location.path('/register/'+$scope.document_type); }, 500);
    });

    //============================================================
    //
    // Occurs when edit-form is closed and document is saved as draft
    // and a request for publication is sent to a FocalPoint/Admin
    //
    //============================================================
    $scope.$on("documentPublishRequested", function(evt, workflowInfo){

      evt.stopPropagation();
      $scope.editing = false;
      $scope.msg = "Record saved. A publishing request has been sent to your Publishing Authority.";
      $timeout(function() { $location.path('/register/'+$scope.document_type); }, 500);

    });

    //============================================================
    //
    // Occurs when edit-form is closed and document is saved
    // and published directly to the repository
    //
    //============================================================
    $scope.$on("documentPublished", function(evt, documentInfo){

      evt.stopPropagation();
      $scope.editing = false;
      $scope.msg = "Record published.";

      $timeout(function() { $location.path('/register/'+$scope.document_type); }, 500);
    });

    //============================================================
    //
    // Occurs when record-list delete a record or a draft
    //
    //============================================================
    $scope.$on("documentDeleted", function(evt, doc){
      for(var i=0; i!=$scope.records.length; ++i)
        if($scope.records[i] == doc)
          $scope.records.splice(i, 1);

      evt.stopPropagation();
      $scope.editing = false;
      $scope.msg = "Record deleted.";

    });

    $scope.$watch('msg',function(newValue){
      if(newValue !== "")
      {
        $timeout(function() {
          $scope.msg ="";
        }, 10000);
      }
    });

  }]);
});
