define(['app', 'angular-block-ui','linqjs', 'angular-localizer',
		'/app/views/register/register-record-list.directive.js',
		'/app/views/directives/task-id-directive.html.js',
		'/app/views/directives/user-details.directive.html.js',
		'/app/views/directives/help-directive.html.js',
		'bootstrap-datepicker','moment',  'text-angular', 'bootbox',
		'scbd-angularjs-services','scbd-angularjs-filters','scbd-angularjs-controls','toastr', '/app/js/common.js'
	], function (app) {

  "use strict";

  app.controller("RegisterController",
    ["$rootScope", "$location" , "$scope", "$q", "$window", "IStorage", "underscore","breadcrumbs",
     "schemaTypes", "$timeout","$filter", "$routeParams", "$cookies","bootbox","realm","IWorkflows",
	 '$element','$mdSidenav', '$mdUtil', '$mdMedia','toastr', '$compile', 'commonjs',
	function ($rootScope, $location, $scope, $q, $window, storage, _,breadcrumbs,
	schemaTypes, $timeout, $filter, $routeParams, $cookies,bootbox,realm,workflows,
	 $element, $mdSidenav, $mdUtil, $mdMedia, toastr, $compile, commonjs) {

  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');
    //**********************************************************
    $scope.close = function () {
          $mdSidenav('left').close()
            .then(function () {
              $log.debug("close LEFT is done");
            });
        };

    //**********************************************************
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },300);
      return debounceFn;
    }


      //==================================
		//
		//==================================
		$scope.gotoNew = function($event, cftype) {
	 		$event.stopImmediatePropagation();
			 $location.url("/register/" + $filter("mapSchema")(cftype) + "/new");
		}

       //==================================
			//
			//==================================
			$scope.gotoList = function($event, cftype) {
					$location.url("/register/" + $filter("mapSchema")(cftype) );
			}



    //TODO: stop using so many globals =P I should inherit the controller scope or something.

    $rootScope.subheadings = {

	  	'Reference Records': { sort: 1,
		'title': 'Reference Records',
		'formats': ['resource', 'modelContractualClause', 'communityProtocol'],
		'roles':[$scope.$root.getRoleName('AbsPublishingAuthorities'), $scope.$root.getRoleName('abschiac'),$scope.$root.getRoleName('AbsNationalAuthorizedUser'),
				 $scope.$root.getRoleName('AbsNationalFocalPoint'),$scope.$root.getRoleName('AbsAdministrator'),$scope.$root.getRoleName('Administrator'),
				 $scope.$root.getRoleName('User')]
		}
    };

    $rootScope.document_types = {

	  	absNationalReport: {
			abbreviation: 'NR',schemaType:"nationalRecords",
			title: 'Interim national report on the implementation of the Nagoya Protocol',
		},
      measure: {
        abbreviation: 'MSR',schemaType:"nationalRecords",
        title: 'Legislative, administrative or policy measures on access and benefit-sharing',

      },
      authority: {
        abbreviation: 'CNA',schemaType:"nationalRecords",
        title: 'Competent National Authority',

      },
      absPermit: {
        abbreviation: 'IRCC',schemaType:"nationalRecords",
        title: 'Permit or its equivalent constituting an internationally recognized certificate of compliance',

      },
      absCheckpoint: {
        abbreviation: 'CP',
        title: 'Checkpoint',schemaType:"nationalRecords",

      },
      absCheckpointCommunique: {
        abbreviation: 'CPC',schemaType:"nationalRecords",
        title: 'Information for the Checkpoint Communiqué',

      },
      resource: {
        abbreviation: 'VLR',schemaType:"referenceRecords",
        title: 'Virtual Library Record',

      },
      database: {
        abbreviation: 'NDB',schemaType:"nationalRecords",
        title: 'ABS National Website or Database',

      },
      contact: {
        abbreviation: 'CON',schemaType:"nationalRecords",
        title: 'Contact'
      },
      modelContractualClause: {
        abbreviation: 'A19A20',schemaType:"referenceRecords",
        title: 'Model Contractual Clauses, Codes of Conduct, Guidelines, Best Practices and/or Standards ',

      },
      communityProtocol: {
        abbreviation: 'CPP',schemaType:"referenceRecords",
        title: 'Community protocols and procedures and customary laws',

      }

    };

    if($routeParams.document_type){ //this is used to highlight the item on the left
      $scope.document_type = $filter("mapSchema")($routeParams.document_type);
	  breadcrumbs.options = {'document_type': $filter("schemaName")($scope.document_type)};
	}
    $scope.msg="";
    $scope.records = [];
    $scope.isLoaded = []; //What schemas are currently loaded

    $scope.localeRegister= ["en"];

    $scope.schemaTypesFacets = [
      {"schema":"measure","schemaType":"nationalRecords", "header": "MSR","draftCount":0,"requestCount":0,"publishCount": 0},
      {"schema":"authority","schemaType":"nationalRecords", "header": "CNA","draftCount":0,"requestCount":0,"publishCount": 0},
      {"schema":"absPermit","schemaType":"nationalRecords", "header": "IRCC","draftCount":0,"requestCount":0,"publishCount": 0},
      {"schema":"absCheckpoint","schemaType":"nationalRecords", "header": "CP","draftCount":0,"requestCount":0,"publishCount": 0},
      {"schema":"absCheckpointCommunique","schemaType":"nationalRecords", "header": "CPC","draftCount":0,"requestCount":0,"publishCount": 0},
      {"schema":"database","schemaType":"nationalRecords", "header": "NDB","draftCount":0,"requestCount":0,"publishCount": 0},
      {"schema":"resource","schemaType":"referenceRecords", "header": "VLR","draftCount":0,"requestCount":0,"publishCount": 0},
      {"schema":"contact","schemaType":"others", "header": "CON","draftCount":0,"requestCount":0,"publishCount": 0},
      {"schema":"absNationalReport","schemaType":"nationalRecords", "header": "NR","draftCount":0,"requestCount":0,"publishCount": 0},
      {"schema":"modelContractualClause","schemaType":"referenceRecords", "header": "A19A20","draftCount":0,"requestCount":0,"publishCount": 0},
      {"schema":"communityProtocol","schemaType":"referenceRecords", "header": "CPP","draftCount":0,"requestCount":0,"publishCount": 0},

	{"schema":"completedTasks","schemaType":"others", "requestCount":0},
	{"schema":"pendingTasks","schemaType":"others", "requestCount": 0},
	{"schema":"urgentTasks","schemaType":"others", "requestCount": 0}

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
      //console.log('schema: ', schema);

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
		$scope.records = [];
        var documents = results[0].data.Items;
        var drafts    = results[1].data.Items;

        var map = {};

        _.map(documents, function(o) { map[o.identifier] = o; });
        _.map(drafts,    function(o) { map[o.identifier] = o; });

        $scope.isLoaded.push(schema);

        _.values(map).forEach(function(row){ $scope.records.push(row); })
        // var recrords _.groupBy($scope.records,'')
        $("a[role*='button']").toggleClass('ui-disabled');
		flipFacets();
        return $scope.records;
      })
	  .finally(function(){
		$scope.$broadcast('finishedLoadingRecords',{});
	  });
    }
    //TODO: this is a scoping disaster. Needed for contacts, fix later.
    $rootScope.loadRecords = loadRecords;

	if($rootScope.user.isAuthenticated){
		if($scope.document_type)
	    	loadRecords($scope.document_type);

		loadFacets();
		loadActivitiesFacets();
	}

	function loadFacets(){
		var published     = storage.documentQuery.facets("",{collection:"my"});
		var drafts    	  = storage.documentQuery.facets("",{collection:"mydraft"});
		var requests      = storage.documentQuery.facets("",{collection:"request"});
        $q.all([published, drafts, requests]).then(function(results) {

		  var index=0;
		  _.each(results, function(facets){
			  _.each(facets.data, function(count, format){

					var schemaTypeFacet = _.where($scope.schemaTypesFacets,{"schema":format});
					if(schemaTypeFacet.length>0){
						if(index==0)
						  	schemaTypeFacet[0].publishCount = count;
			            else if(index==1)
						  	schemaTypeFacet[0].draftCount = count;
			            else if(index==2)
							schemaTypeFacet[0].requestCount = count;
					}
			  })
			index++;
		  });
		  //

        }).then(null, function(error) {
          toastr.error("error loading permit related checkpoint communiqué.");
           console.log(error );
        })

	}

	function loadActivitiesFacets(){

		var myUserID = $scope.$root.user.userID;

	    var query    = {
	                $and : [
	                    { "createdBy" : myUserID },
	                    { closedOn : { $exists : true } },
	                    { "data.realm" : realm.value }
	                ]
	            };

	    $q.when(workflows.query(query,true), function(data){
			var schemaCount = _.where($scope.schemaTypesFacets,{"schema":"completedTasks"});
	        schemaCount[0].requestCount = data.count;

	    });

		query    = {
				$and : [
					{ "createdBy" : myUserID } ,
					{ closedOn : { $exists : false } },
					{ "data.realm" : realm.value }
				]
			};
	    $q.when(workflows.query(query,true), function(data){
			var schemaCount = _.where($scope.schemaTypesFacets,{"schema":"pendingTasks"});
	        schemaCount[0].requestCount = data.count;
	    });

		query    = {
				$and : [
					{ "activities.assignedTo" : myUserID },
					{ closedOn : { $exists : false } },
					{ "data.realm" : realm.value }
				]
			};
	    $q.when(workflows.query(query,true), function(data){
			var schemaCount = _.where($scope.schemaTypesFacets,{"schema":"urgentTasks"});
	        schemaCount[0].requestCount = data.count;
	    });

	 // flipFacets();
	}

	//============================================================
    //
    // Occurs when external directive like dashboard wants to load schema data
    //
    //============================================================
    $scope.$on("loadActivities", function(evt, schema){

		  if(schema=='dashboard')
			loadRecords();
		  else{
			if(_.contains($scope.isLoaded, schema)){
				$scope.isLoaded.splice(_.indexOf(schema), 1)
			}

			loadRecords(schema);
		  }
    });
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

	  if($scope.showingFeedback)
		return;
	  if($scope.documentInvalid){
		$scope.documentInvalid = false;
		return;
	  }

      evt.stopPropagation();
      $scope.editing = false;
      toastr.info("Your record has been closed without saving.");
	//   $scope.msg = "Your record has been closed without saving.";

	  var absHosts = ['https://dev-absch.cbd.int/', 'https://training-absch.cbd.int/',
  					 'http://localhost:2010/', 'https://absch.cbd.int/']
      $timeout(function() {
        if($rootScope.next_url){
		   var url = $rootScope.next_url.replace($location.$$protocol + '://' +
		             $location.$$host + ($location.$$host != 'absch.cbd.int' ? ':' + $location.$$port : '') + '/', '');
	      _.each(absHosts,function(host){
			  url = url.replace(host,'');
		  });
		  $timeout(function(){$location.path(url);},100)}
        else{
          $timeout(function(){$location.path('/register/'+
		                      $filter("mapSchema")($scope.document_type));},100);}
      }, 500);

    });

    $scope.$on("documentInvalid", function(evt, invalidDocument) {

	   	$scope.documentInvalid = true;
    });

    //============================================================
    //
    // Occurs when edit-form is closed and document is saved as draft
    //
    //============================================================
    $scope.$on("documentDraftSaved", function(evt, draftInfo) {
      evt.stopPropagation();
      $scope.editing = false;
	    $rootScope.updatedRecord = draftInfo;
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

	  $scope.showingFeedback = true;
	  toastr.info('Record saved. A publishing request has been sent to your Publishing Authority.',{onHidden:function(a){
		  $scope.showingFeedback = false;
	  }})

	  $timeout(function(){$location.path('/register/'+$filter("mapSchema")($scope.document_type));},100);
	  $rootScope.updatedRecord = workflowInfo;

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

	  $scope.showingFeedback = true;
	  toastr.info('Record published. The record will be now publicly accessible on ABSCH.',{onHidden:function(a){
		  $scope.showingFeedback = false;
	  }});
	  $timeout(function(){$location.path('/register/'+$filter("mapSchema")($scope.document_type));},100);

	  $rootScope.updatedRecord = documentInfo;
      //$timeout(function() { $location.path('/register/'+$scope.document_type); }, 500);
    });

    //============================================================
    //
    // Occurs when record-list delete a record or a draft
    //
    //============================================================
    $scope.$on("documentDeleted", function(evt, doc){

      for(var i=0; i<=$scope.records.length; ++i){
        if($scope.records[i] == doc){
			$scope.records.splice(i, 1);
			updateFacets(doc, false);
		}
	  }
      evt.stopPropagation();
      $scope.editing = false;
	  toastr.info('<h1>Record deleted.</h1>',{allowHtml:true});
      $scope.msg = "Record deleted.";

    });

	 	//============================================================
    //
    // Occurs when record-list duplicate a record or a draft
    //
    //============================================================
    $scope.$on("documentDuplicated", function(evt, doc){
	  $scope.records.push(doc);
	  updateFacets(doc, true);
      evt.stopPropagation();
      $scope.editing = false;

    });

    //============================================================
    //
    // Occurs when record-list workflow request is deleted.
    //
    //============================================================
    $scope.$on("documentWorkflowRequestDeleted", function(evt, doc){
      toastr.info('<h1>Workflow request deleted.</h1>',{allowHtml:true});
      $scope.msg = "Workflow request deleted.";
	  //update request count
    updateFacets(doc, false);
    var document = _.first(_.where($scope.records, {identifier:doc.identifier}));
    if(document)
      document.workingDocumentLock = null;
	  //update draft count
    updateFacets(document, true);
    evt.stopPropagation();
    $scope.editing = false;

    });

	//============================================================
    //
    // Occurs when there is a action on tasks
    //
    //============================================================
    $scope.$on("taskAction", function(evt, data ){

	  	var schemaCount = _.where($scope.schemaTypesFacets,{"schema":"urgentTasks"});
	  	schemaCount[0].requestCount--;

	    schemaCount = _.where($scope.schemaTypesFacets,{"schema":data.document.header.schema});
		if(data.workflowAction.result.action == 'approve'){
			schemaCount[0].publishCount++;
			schemaCount[0].draftCount--;
			schemaCount[0].requestCount--;
		}
		else if(data.workflowAction.result.action == 'reject'){
			schemaCount[0].requestCount--;
		}
	  flipFacets();
      evt.stopPropagation();
      $scope.editing = false;

    });
	function flipFacets(){

		//sometimes not working...
		//$(".card").toggleClass("flipped");
    	//$timeout(function(){
		//	$(".card").toggleClass("flipped");
		//	}, 500);

		if($rootScope.updatedRecord){
			$timeout(function(){
				//console.log($rootScope.updatedRecord);
				$scope.$broadcast('shakeUpdatedRecord',$rootScope.updatedRecord);
				$rootScope.updatedRecord = null;
			},1000);
		}
	}

	function updateFacets(doc, newRec){
		var schemaCount = _.where($scope.schemaTypesFacets,{"schema":doc.type});
		if($scope.isRequest(doc)){
			if(newRec)
				schemaCount[0].requestCount++;
			else
       			schemaCount[0].requestCount--;
		}
		else if($scope.isDraft(doc)){
			if(newRec)
				schemaCount[0].draftCount++;
			else
       			schemaCount[0].draftCount--;
		}
		else if($scope.isPublished(doc)){
			if(newRec)
				schemaCount[0].publishCount++;
			else
       			schemaCount[0].publishCount--;
		}
  		flipFacets();
	}

    $scope.$watch('msg',function(newValue){
      if(newValue !== "")
      {
        $timeout(function() {
          $scope.msg ="";
        }, 10000);
      }
    });



	$element.find('[data-toggle="tooltip"]').tooltip()

	var isMenuVisisble = true;
	$scope.isMenuVisisble = true;

	$('#toggleMenu').click(function() {
		isMenuVisisble = !isMenuVisisble;

		$( "#leftMenu" ).toggle( "slide" );
		if(!isMenuVisisble){
			$('#main').removeClass('col-xs-9');
			$('#main').addClass('col-xs-12');
		}
		else {
			$('#main').removeClass('col-xs-12');
			$('#main').addClass('col-xs-9');
		}
	});
    var url = $location.$$url;
    if(url.split('/').length>3){
      var splitURL = url.split('/');
      url = '/' + splitURL[1] + '/' + splitURL[2] + '/new';
    }
    $scope.helpSchema = url;

	$scope.$on("refreshDocumentList", function(evt, data) {
		if(data.document_type){
			$scope.records = null;
			$scope.isLoaded = [];
			loadRecords(data.document_type);
			loadFacets();
			loadActivitiesFacets();
		}
	});

	if($scope.user && $scope.user.isAuthenticated && commonjs.hasAbsRoles()){

			require(['/app/views/register/directives/national-records-menu.html.js'], function(menu){
					$scope.$apply(function(){
						console.log(menu);
						$element.find('#menuPlaceholder')
								.append($compile('<div register-national-menu ></div>')($scope));
					});
			});
	}

  }]);
});
