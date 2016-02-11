define(['app', '/app/js/common.js', 'scbd-angularjs-services',
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

                $scope.showContacts = function() {
                    if (!modalEdit.is(":visible")) {
                        modalEdit.modal("show");
                        $scope.loadExisting();
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

                        if (workingContacts === null) {
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
                            var contactType = 'contact';

                            if ($scope.organizationOnly)
                                contactType = 'organization';

                            var qDrafts = storage.documentQuery
                            .body("(type eq 'authority' or type eq 'contact')", $scope.subFilter ? [$scope.subFilter] : undefined,
                                  {collection:"my",body: true});
                            $scope.existingContacts = [];

                            $q.all([qDrafts]).then(function(results) {
                                    results[0].data.forEach(function(contact) {
                                        var lContact = contact.body;
                                        lContact.revision = contact.revision;
                                        $scope.existingContacts.push(lContact);
                                    });
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
                                identifier: contact.header.identifier + '@' + contact.revision
                            });
                            $scope.model = contacts;
                        } else {
                            $scope.model = {identifier:contact.header.identifier + '@' + contact.revision};
                        }
                        $scope.showContacts();
                        //clear the dropdown list display text which remains after the dialog is closed.
                        $scope.$broadcast('clearSelectSelection');

                    }

                    $scope.isSelected = function(contact) {

                        if (!workingContacts || workingContacts.length == 0)
                            return true;

                        return !_.some(workingContacts, function(cont) {
                            return contact.header.identifier == cont.identifier;
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

                    //////////////////////////////

                }
            ]
        };
    }]);

});

//============================================================
//
//
//============================================================
// $scope.editContact = function(index) {
//
// 	var contacts = $scope.getContacts();
//
// 	var cnaContact = contacts[index];
// 	if(cnaContact && cnaContact.type == 'CNA'){
// 		alert('Please use the Competent National Authority form to edit this contact.');
// 		return;
// 	}
//
// 	if(index<0 || index>=contacts.length) {
// 		var id = guid();
// 		if(!$scope.organizationOnly)
// 			$scope.edition = {
// 				contact : {
// 							header: {
// 										schema   : "contact",
// 										languages: ["en"]
// 									},
// 							type: "organization" ,
// 							source: id
// 						  },
// 				index   : -1
// 			};
// 		else
// 			$scope.edition = {
// 				contact : {
// 							header: {
// 										identifier : id,
// 										schema   : "organization",
// 										languages: ["en"]
// 									},
// 							type: "organization",libraries: [{ identifier: "cbdLibrary:abs-ch" }]
// 						  },
// 				index   : -1
// 			};
// 	}
// 	else {
//
// 		$scope.edition = {
// 			contact : angular.fromJson(angular.toJson(contacts[index])),
// 			index   : index
// 		};
// 		if($scope.organizationOnly){
// 			$scope.edition.contact.type = "organization";
// 		}
// 	}
// };

//============================================================
//
//
//============================================================
// $scope.saveContact = function(saveContact) {
//
// 	if(!$scope.edition)
// 		return;
//
// 	var contact = $scope.edition.contact;
// 	var empty = /^\s*$/;
//
// 	if(contact.firstName !==undefined && (!contact.firstName  || empty.test(contact.firstName ))) delete contact.firstName;
// 	if(contact.middleName!==undefined && (!contact.middleName || empty.test(contact.middleName))) delete contact.middleName;
// 	if(contact.lastName  !==undefined && (!contact.lastName   || empty.test(contact.lastName  ))) delete contact.lastName;
//
// 	var saveOperation;
// 	//save the contact to db for furture use.
// 	if(saveContact!=false){
// 		var cont = _.clone(contact)
// 		saveOperation = saveContactDraft(cont);
// 	}
// 	$q.when(saveOperation)
// 	.then(function(){
//
// 		if(!$scope.showFilter && !$scope.organizationOnly){
// 			delete contact.government;
// 			delete contact.header;
// 		}
// 			// console.log(contact);
// 		if($scope.multiple) {
//
// 			var contacts =  _.clone($scope.getContacts());
//
// 			if($scope.edition.index>=0)
// 				contacts[$scope.edition.index] = contact;
// 			else
// 				contacts.push(contact);
//
// 			$scope.model = contacts;
//
//
// 		}
// 		else {
//
// 			$scope.model = contact;
// 		}
// 		$scope.existingContacts = null;
// 		$scope.edition = null;
//
// 		//clear the dropdown list display text which remains after the dialog is closed.
// 		$scope.$broadcast('clearSelectSelection');
//
// 	})
// 	.catch(function(error){
// 		if(error.data && error.data.message){
// 			$scope.errorMessage =  error.data.message;
// 		}
// 	});
// };

// function saveContactDraft(contact){
// 		if(!contact)
// 			throw "Invalid document";
// 		if(!$scope.organizationOnly){
//
// 			var government = $scope.$root.user.government;
// 			if(!contact.header)
// 			{
// 				contact.header = {schema   : "contact",languages: ["en"]};
// 			}
// 			contact.header.identifier = contact.source;
// 			contact.government = government ? { identifier: government } : undefined;
//
// 			return editFormUtility.saveDraft(contact);
// 		}
// 		else{
//
// 			return $q.when(updateSecurity(contact)).then(function(){
// 				if(!$scope.security)
// 					return;
// 				delete contact.type
// 				if($scope.security.canSave)
// 					return editFormUtility.publish(contact);
// 				else
// 					return editFormUtility.publishRequest(contact);
// 			});
// 		}
//
// }

// function updateSecurity(document)
// {
// 	$scope.security = {};
// 	$scope.loading = true;
//
// 	if(!document || !document.header)
// 		return;
//
// 	var identifier = document.header.identifier;
// 	var schema     = document.header.schema;
//
// 	var a = storage.documents.exists(identifier).then(function(exist){
//
// 		var q = exist
// 			  ? storage.documents.security.canUpdate(document.header.identifier, schema)
// 			  : storage.documents.security.canCreate(document.header.identifier, schema);
//
// 		return q.then(function(allowed) {
// 			$scope.security.canSave = allowed
// 		});
// 	})
//
// 	var b = storage.drafts.exists(identifier).then(function(exist){
//
// 		var q = exist
// 			  ? storage.drafts.security.canUpdate(document.header.identifier, schema)
// 			  : storage.drafts.security.canCreate(document.header.identifier, schema);
//
// 		return q.then(function(allowed) {
// 			$scope.security.canSaveDraft = allowed
// 		});
// 	})
//
// 	return $q.all([a,b]);
// }
