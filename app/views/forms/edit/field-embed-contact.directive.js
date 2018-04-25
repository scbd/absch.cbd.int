define(['app', "text!views/forms/edit/field-embed-contact.directive.html", 'js/common', 'components/scbd-angularjs-services/services/main', 'components/scbd-angularjs-controls/form-control-directives/all-controls',
'views/forms/view/view-contact-reference.directive', 'ngDialog',
'views/forms/view/view-organization-reference.directive',
'services/search-service','ngInfiniteScroll'
],
function(app, template) {
    
    app.directive("fieldEmbedContact", [function() {

        return {
            restrict: "EA",
            template: template ,
            replace: true,
            transclude: false,
            scope: {
                model: "=ngModel",
                locales: "=locales",
                caption: "@caption",
                subFilter : "=?"
            },
            link: function($scope, $element, $attrs) {

                $scope.multiple = $attrs.multiple !== undefined;

            },
            controller: ["$scope", "$http", "$window", "$filter", "underscore", "guid", "editFormUtility", "$q", "IStorage", "commonjs", 'ngDialog', 'searchService', 'appConfigService',
                function($scope, $http, $window, $filter, _, guid, editFormUtility, $q, storage, commonjs, ngDialog, searchService, appConfigService) {
                    var workingContacts = null;
                    var currentPage = -1;
                    var queryCanceler;
                    $scope.recordCount = 0;
                    $scope.loadingDocuments = false;
                    $scope.search = {};
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

                    $scope.showContacts = function(index) {                   
                        $scope.loadExisting();
                        $scope.showExisting=true;
                        $scope.errorMessage = undefined;
                        ngDialog.open({
                            template: 'organizationModal',
                            closeByDocument: false,
                            scope: $scope
                        });
                    }
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

                        closeDialog();
                        workingContacts = undefined;
                        //clear the dropdown list display text which remains after the dialog is closed.
                        $scope.$broadcast('clearSelectSelection');
                    };


                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.loadExisting = function() {

                        if($scope.loadingDocuments || $scope.existingContacts && $scope.recordCount == $scope.existingContacts.length)
                            return;

                        $scope.loadingDocuments = true;
                        currentPage += 1;
                        $scope.searchOrganizations();
                    };
                    $scope.$watch('search.keyword', function(newVal) {
                        if(newVal !=undefined){
                            $scope.searchOrganizations(true);
                        }
                    })
                    $scope.searchOrganizations = function(clear) {
                        
                        if (queryCanceler) {
                            console.log('trying to abort pending request...');
                            queryCanceler.resolve(true);
                        }
                        var fields = 'identifier_s, _state_s,revision:_revision_i, name:title_s, acronym:acronym_s, organizationType_s,' +
                                         'address_EN_t, city_EN_t, state_EN_t, postalCode_EN_t, country_s, phones:phones_ss, faxes:faxes_ss, emails:emails_ss, websites:websites_ss'
                            
                        var q = 'realm_ss:' + appConfigService.currentRealm.toLowerCase() + ' AND ';
                        if($scope.search.keyword){
                            var qFields = ['text_EN_txt', 'title_s', 'acronym_s', 'organizationType_EN_s', 'address_s', 'state_s', 'postalCode_s', 'country_EN_s', 'emails_ss']
                            q += '(' + qFields.join(':"*' + $scope.search.keyword + '*" OR ') + ':" *' 
                                     + $scope.search.keyword + '*") AND ';
                            if(clear){
                                currentPage = -1;
                                $scope.recordCount = 0;
                                $scope.loadingDocuments = false;
                            }
                        }
                        if(currentPage===-1)
                            currentPage=0;
                            
                        var queryListParameters = {
                            'q'     : q + 'schema_s:organization',
                            'sort'  : 'updatedDate_dt desc',
                            'fl'    : fields,
                            'wt'    : 'json',
                            'start' : currentPage * 25,
                            'rows'  : 25,
                        };

                        queryCanceler = $q.defer();
                        $q.when($http.get('/api/v2013/index/select', {  params: queryListParameters, timeout: queryCanceler}))
                          .then(function (data) {
                            queryCanceler = null;
                            if(!$scope.existingContacts || currentPage == 0){
                                var docs = data.data.response.docs;
                                    _.each(docs, function(record){
                                    formatOrganization(record);
                                });
                                $scope.existingContacts = docs;
                                $scope.recordCount = data.data.response.numFound;
                                
                            }
                            else {
                                _.each(data.data.response.docs, function(record){
                                    $scope.existingContacts.push(formatOrganization(record));
                                });
                            }
                        }).catch(function(error) {
                            console.log('ERROR: ' + error);
                        })
                        .finally(function(){
                            $scope.loadingDocuments = false;
                        });
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
                        closeDialog()
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

                    function closeDialog() {
                        ngDialog.close();
                        $scope.errorMessage = undefined;
                        currentPage = -1;
                        queryCanceler = null;
                        $scope.recordCount = 0;
                        $scope.loadingDocuments = false;
                        $scope.search = {};
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

                    function formatOrganization(organization){

                        organization.header = {
                            identifier :  organization.identifier_s
                        }
                        if(organization.organizationType_s)
                            organization.organizationType = {
                                identifier :  organization.organizationType_s
                            }
                        if(organization.country_s) 
                            organization.country = {
                                identifier :  organization.country_s
                            }

                        if(organization.address_EN_t)
                            organization.address = { en : organization.address_EN_t }  
                        if(organization.city_EN_t)
                             organization.city = { en : organization.city_EN_t }   
                        if(organization.state_EN_t)
                             organization.state = { en : organization.state_EN_t }   
                        if(organization.postalCode_EN_t)
                             organization.postalCode = { en : organization.postalCode_EN_t }

                        return organization;  
                    }
                }
            ]
        };
    }]);

});
