define(['app', '/app/js/common.js', 'scbd-angularjs-services', 'scbd-angularjs-controls',
'/app/views/forms/view/view-contact-reference.directive.js',
'/app/views/forms/view/view-organization-reference.directive.js'],
function(app) {

    app.directive("fieldEmbedContact", [function() {

        return {
            restrict: "EA",
            templateUrl: "/app/views/forms/edit/field-embed-contact.directive.html",
            replace: true,
            transclude: false,
            scope: {
                model: "=ngModel",
                locales: "=locales",
                caption: "@caption",
                subFilter : "=?"
            },
            link: function($scope, $element, $attrs) {

                var modalEdit = $element.find("#editContact");

                $scope.multiple = $attrs.multiple !== undefined;

                $scope.showContacts = function(index) {
                    if (!modalEdit.is(":visible")) {
                        modalEdit.modal("show");
                        $scope.loadExisting();
                        $scope.showExisting=true;
                    }
                    if (modalEdit.is(":visible")) {
                        modalEdit.modal("hide");
                    }
                    $scope.errorMessage = undefined;
                }
            },
            controller: ["$scope", "$http", "$window", "$filter", "underscore", "guid", "editFormUtility", "$q", "IStorage", "commonjs",
                function($scope, $http, $window, $filter, _, guid, editFormUtility, $q, storage, commonjs) {
                    var workingContacts = null;

                    $scope.options  = {
        				countries         : function() { return $http.get("/api/v2013/thesaurus/domains/countries/terms",            { cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
        				organizationTypes : function() {
        					return $q.all([$http.get("/api/v2013/thesaurus/domains/Organization%20Types/terms", { cache: true })
        							,$http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",   { cache: true })])
        					.then(function(o){
        						var orgs = o[0].data;
        						orgs.push(o[1].data);
        						return orgs;
        					});
        				}
        			};


        			$scope.$watch('edition.contact.organizationType', function(newValue){
        				if(newValue && newValue.identifier!='5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'){
        					if($scope.edition.contact.organizationType && $scope.edition.contact.organizationType.customValue)
        						$scope.edition.contact.organizationType.customValue = undefined;
        				}
        			});


                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.$watch("model", function() {
                        workingContacts = null;
                    });

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.getContacts = function() {

                        if (workingContacts === null || workingContacts === undefined) {
                            if (_.isArray($scope.model)) workingContacts = _.clone($scope.model);
                            else if (_.isObject($scope.model)) workingContacts = [$scope.model];
                            else workingContacts = [];
                        }

                        return workingContacts;
                    };


                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.deleteContact = function(index) {

                        var contacts = $scope.getContacts();

                        var indexNo = index;
                        if (index < 0 || index >= contacts.length)
                            return;

                        if (confirm("Are you you want to remove this contact from the list?")) {
                            contacts.splice(index, 1);
                            if ($scope.multiple)
                                $scope.model = contacts;
                            else
                                $scope.model = undefined;

                        }
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.closeContact = function() {

                        $scope.showContacts();
                        workingContacts = undefined;
                        //clear the dropdown list display text which remains after the dialog is closed.
                        $scope.$broadcast('clearSelectSelection');
                    };


                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.loadExisting = function() {

                        if (!$scope.existingContacts) {

                            $scope.loading = true;

                            var qDrafts = storage.drafts.query("(type eq 'organization')", {body: true});
                            var qPublished = storage.documents.query("(type eq 'organization')", "my", {body: true});
                            $scope.existingContacts = [];

                            $q.all([qDrafts, qPublished]).then(function(results) {
                                    _.each(results,  function(result, index){
                                       _.each(result.data.Items,function(contact) {
                                           if(index==0 && !contact.workingDocumentLock){
                                               return;
                                           }
                                           var lContact = contact.body;
                                           var exists = _.some($scope.existingContacts, function(org){return org.header.identifier == lContact.header.identifier});
                                           if(!exists){
                                               lContact.revisonType = index == 0 ? 'request' : 'published';
                                               lContact.revision = contact.revision;
                                               $scope.existingContacts.push(lContact);
                                           }
                                       });
                                   })
                                })
                                .finally(function() {
                                    $scope.loading = false;
                                });
                        }
                    }

                    $scope.selectContact = function(contact) {
                        if ($scope.multiple) {
                            var contacts = _.clone($scope.getContacts());
                            contacts.push({
                                identifier: contact.header.identifier + '@' + (contact.revision||'1')
                            });
                            $scope.model = contacts;
                        } else {
                            $scope.model = {identifier:contact.header.identifier + '@' + (contact.revision||'1')};
                        }
                        $scope.showContacts();
                        workingContacts = undefined;
                        //clear the dropdown list display text which remains after the dialog is closed.
                        $scope.$broadcast('clearSelectSelection');

                    }

                    $scope.isSelected = function(contact) {

                        if (!workingContacts || workingContacts.length == 0)
                            return true;

                        return !_.some(workingContacts, function(cont) {
                            return contact.header.identifier == removeRevisonNumber(cont.identifier);
                        });
                    }

                    $scope.isOrganization = function(entity) {
                        //console.log(entity)		;
                        return entity && entity.type == "organization";
                    }
                    $scope.isPerson = function(entity) {
                        // console.log(entity);
                        return entity && entity.type == "person";
                    }
                    $scope.isCNA = function(entity) {
                        return entity && entity.type == "CNA";
                    }

        			function removeRevisonNumber(identifier){
                        if(identifier)
        				    return identifier.substr(0, identifier.indexOf('@'))
        			}
                    //////////////////////////////
                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.editContact = function(index) {
                    	var contacts = $scope.getContacts();

                    	if(index<0 || index>=contacts.length) {
                    		var id = guid();
                			$scope.edition = {
                				contact : {
                							header: {
                										identifier : id,
                										schema   : "organization",
                										languages: ["en"]
                									},
                							type: "organization",libraries: [{ identifier: "cbdLibrary:abs-ch" }]
                						  },
                				index   : -1
                			};
                    	}
                    	else {

                    		$scope.edition = {
                    			contact : angular.fromJson(angular.toJson(contacts[index])),
                    			index   : index
                    		};
                    		if($scope.organizationOnly){
                    			$scope.edition.contact.type = "organization";
                    		}
                    	}
                    };

                    // ============================================================
                    //
                    //
                    // ============================================================
                    $scope.saveContact = function(saveContact) {
                        $scope.validationReport = undefined;

                    	if(!$scope.edition)
                    		return;

                    	var contact = $scope.edition.contact;
                    	var empty = /^\s*$/;

                    	if(contact.firstName !==undefined && (!contact.firstName  || empty.test(contact.firstName ))) delete contact.firstName;
                    	if(contact.middleName!==undefined && (!contact.middleName || empty.test(contact.middleName))) delete contact.middleName;
                    	if(contact.lastName  !==undefined && (!contact.lastName   || empty.test(contact.lastName  ))) delete contact.lastName;

                    	var saveOperation;
                    	var cont = _.clone(contact)
                    	saveOperation = saveContactDraft(cont);
                        $scope.loading = true;

                    	$q.when(saveOperation)
                    	.then(function(data){

                            $scope.selectContact(contact)
                    		$scope.existingContacts = null;
                    		$scope.edition = null;

                    		//clear the dropdown list display text which remains after the dialog is closed.
                    		$scope.$broadcast('clearSelectSelection');

                    	})
                    	.catch(function(error){
                    		if(error.data && error.data.message){
                    			$scope.errorMessage =  error.data.message;
                    		}
                    	})
                        .finally(function(){
                            $scope.loading = false;
                        });;
                    };

                    function saveContactDraft(contact){
                    		if(!contact)
                    			throw "Invalid document";

                			return $q.when(updateSecurity(contact)).then(function(){
                				if(!$scope.security)
                					return;
                				delete contact.type
                                return $q.when(storage.documents.validate(contact))
                                        .then(function(report){
                                            //Has validation errors ?
                                            var validationReport = report.data;
                    						if(validationReport && validationReport.errors && validationReport.errors.length>0) {
                                                $scope.validationReport = validationReport;
                                                throw 'validation errors';
                    						}
                    						else {
                                				if($scope.security.canSave)
                                					return editFormUtility.publish(contact);
                                				else
                                					return editFormUtility.publishRequest(contact);
                                            }
                                        })
                			});

                    }

                    function updateSecurity(document)
                    {
                    	$scope.security = {};
                    	$scope.loading = true;

                    	if(!document || !document.header)
                    		return;

                    	var identifier = document.header.identifier;
                    	var schema     = document.header.schema;

                    	var a = storage.documents.exists(identifier).then(function(exist){

                    		var q = exist
                    			  ? storage.documents.security.canUpdate(document.header.identifier, schema)
                    			  : storage.documents.security.canCreate(document.header.identifier, schema);

                    		return q.then(function(allowed) {
                    			$scope.security.canSave = allowed
                    		});
                    	})

                    	var b = storage.drafts.exists(identifier).then(function(exist){

                    		var q = exist
                    			  ? storage.drafts.security.canUpdate(document.header.identifier, schema)
                    			  : storage.drafts.security.canCreate(document.header.identifier, schema);

                    		return q.then(function(allowed) {
                    			$scope.security.canSaveDraft = allowed
                    		});
                    	})

                    	return $q.all([a,b]);
                    }
                }
            ]
        };
    }]);

});
