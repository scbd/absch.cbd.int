define(['app',"text!views/forms/edit/document-selector.html",
'underscore','js/common', 'views/directives/search-filter-dates.partial',
'views/search/search-results/result-default', 'services/search-service','services/app-config-service', 'ngDialog'
], function (app, template, _) { // jshint ignore:line

app.directive("documentSelector", ["$http",'$rootScope', "$filter", "$q", "searchService", "appConfigService", "IStorage", 'ngDialog', 'commonjs','$compile',
function ($http, $rootScope, $filter, $q, searchService, appConfigService, IStorage, ngDialog, commonjs, $compile) {

	return {
		restrict   : "EA",
		template: template,
		replace    : true,
        require    : '?ngModel',
		transclude : {
            selectRecords   : '?selectRecords',
            selectedRecords : '?selectedRecords'
        },
		scope      : {
			model     : "=ngModel",
			locales   : "=locales",
			caption   : "@caption",
			disabled  : "=ngDisabled",
            government: "=government",
            question  : "@question",
            schema    : "@schema",
            type     : "@type",
            filter : "@filter",
            hideSelf : "=hideSelf",
            query    : "="
		},
		link : function($scope, $element, $attr, ngModelController) {
            var dialogId;
            var focalPointRegex = /^52000000cbd022/;
            $scope.rawDocuments = [];
            $scope.selectedDocuments=[];
			$scope.areVisible = false;
            $scope.userGov = $scope.$root.user.government;
            $scope.showAddButton = false;
            $scope.sortType     = 'rec_title'; 
            $scope.sortReverse  = false;  
            $scope.search       = {keyword:''}
            if(!$scope.type) $scope.type = "checkbox";
            
            $scope.allowNew = {
                show    : $attr.allowNew=='true',
                schema  : $attr.allowNewSchema,
                title   : $attr.allowNewButtonTitle,
                schemas : ($attr.allowNewSchema||'').split(','),
            };     

            if($attr.listView){
                $scope.listView = true;
            }

            $scope.onRadioClick = function(doc){
                if($scope.type == "radio"){
                    _.each($scope.rawDocuments.docs, function(d){
                        if(d.identifier_s!=doc.identifier_s && d.__checked)
                            d.__checked = false;
                    })
                }
            }
            //==================================
            //
            //==================================
			$scope.saveDocuments = function(){

                //$scope.model=undefined;
                var oldModel = angular.copy($scope.model);
                $scope.selectedRawDocuments = [];
                _.forEach($scope.rawDocuments.docs, function (doc) {

                    if(doc.__checked === true)
                    {
                        if(!$scope.model && $scope.type != 'radio')
                            $scope.model=[];
                        $scope.selectedRawDocuments.push(doc);

                        if(!$scope.isInModel(doc.identifier_s)){
                            var document = {identifier: doc.identifier_s};
                            
                            document.identifier += "@"+ doc._revision_i;

							if($scope.type == 'radio')
								$scope.model = document;
							else
                            	$scope.model.push(document);
                        }                       
                        
                    }
                    if(!doc.__checked && $scope.isInModel(doc.identifier_s)){
                        	$scope.removeDocument(doc)
                    }

                });

                if(!angular.equals(oldModel, $scope.model)){
                    ngModelController.$setViewValue($scope.model);
                }

                $scope.syncDocuments();

                ngDialog.close(dialogId);
				$scope.areVisible = true;
			};

            $scope.clearSelectedDocuments = function(){
                _.forEach($scope.rawDocuments.docs,function(doc){
                    doc.__checked = false;
                });
            }

             //==================================
            //
            //==================================
			$scope.syncDocuments = function(){

               $scope.rawDocuments.docs =  _.filter($scope.rawDocuments.docs, function (doc) {
                    doc.__checked = false;

                    if($scope.hideSelf && $scope.hideSelf === doc.identifier_s)
                    {
                        return false;
                    }
                    return doc;

                });


				var docs = []
                if ($scope.model){
                    
					if($scope.type == 'radio'){
                        var config;                            
                         if(focalPointRegex.test($scope.model.identifier))
                            config = {headers  : {realm:undefined}};
						docs.push(IStorage.documents.get($scope.model.identifier, undefined, config));
					}
					else{
	                    _.each($scope.model, function (mod) {
							if(mod.identifier){
                                var config;
                                if(focalPointRegex.test(mod.identifier))
									config = {headers  : {realm:undefined}};
								docs.push(IStorage.documents.get(mod.identifier,undefined, config));
                            }
	                    });
					}

					$q.all(docs)
					.then(function(results){
							$scope.selectedDocuments = _.map(results, function(result){
                                                            return result.data || {};
                                                        });
                            var selectedDocuments = _.map($scope.model, function(d){return removeRevisonNumber(d.identifier)});
                            $scope.selectedRawDocuments = _.filter($scope.rawDocuments.docs, function(doc){
                                return _.contains(selectedDocuments, doc.identifier_s);
                            });
                                                        
					});

                    if($scope.model.length === 0 || _.isEmpty($scope.model))
                        $scope.model = undefined;
                }

				$scope.areVisible = true;
			};



            //==================================
            //
            //==================================
			$scope.isInModel = function(id){

				if(!$scope.model)
					return false;

				if($scope.type == 'radio')
					return removeRevisonNumber($scope.model.identifier) === id

				return  _.find($scope.model, function (mod) {
		                    return removeRevisonNumber(mod.identifier) === id
		                });

			};

            //==================================
            //
            //==================================
			$scope.isChecked = function(item){
                if(item.__checked){
                    return item;
                }
			};



            //==================================
            //
            //==================================
			$scope.selectDoc = function(document){

                 _.forEach($scope.rawDocuments.docs, function (doc) {
                    doc.__checked = false;

                    if(doc.identifier_s === document.identifier_s ){
                        doc.__checked = true;
                    }
                });
			};


            //==================================
            //
            //==================================
			$scope.removeDocument = function(document){
                var oldModel = $scope.model;

                var removeId;
				 if(document.identifier)
				   removeId = document.identifier;
                 else if(document.header)
                    removeId = document.header.identifier;
                 else
                    removeId = document.identifier_s;

                 if($scope.rawDocuments){
                    _.forEach($scope.rawDocuments.docs, function (doc) {
                            if(doc.identifier_s === removeId ){
                                doc.__checked = false;
                            }
                    });
                 }

                if($scope.selectedDocuments){
                    $scope.selectedDocuments =  _.filter($scope.selectedDocuments, function (doc) {
                        if(doc.header.identifier !== removeId ){
                        return doc;
                        }
                    });
                    $scope.selectedRawDocuments =  _.filter($scope.selectedRawDocuments, function (doc) {
                        if(doc.identifier_s !== removeRevisonNumber(removeId) ){
                        return doc;
                        }
                    });
                }
			   if($scope.type != 'radio')
	               $scope.model =  _.filter($scope.model, function (doc) {
	                    if((doc.identifier !== removeId && removeId.indexOf('@')>=0) || 
                           (removeId.indexOf('@')<0 && removeRevisonNumber(doc.identifier) !== removeRevisonNumber(removeId))){
	                     return doc;
	                    }
	                });
				else
					$scope.model = undefined;

                if($scope.model){
                    if($scope.model.length===0)
                        $scope.model = undefined;
                }
                if(!angular.equals(oldModel, $scope.model)){
                    ngModelController.$setViewValue($scope.model);
                }

			};

             //==================================
            //
            //==================================
            function getDocs () {
                var searchOperation;
				$scope.isLoading = true;
                var schema = "*";
                if ($scope.schema)
                    schema = $scope.schema;

                var q  = "schema_s:"+ schema;

                if($scope.query){ //if query is mentions ignore schem field in query
                    q = $scope.query;
                }

                if(!$attr.skipGovernment){
                    if($scope.government)
                        q  = q + " AND government_s:" + $scope.government.identifier;
                    if(!$scope.government &&  $scope.userGov)
                        q  = q + " AND government_s:" + $scope.userGov;
                }

                if($scope.hideSelf){
                    q  = q + " AND NOT (identifier_s:" + $scope.hideSelf + ")";
                }

                var queryParameters = {
                    'query'    : q,
                    'currentPage' : 0,
                    'rowsPerPage': 1000
                };

                searchOperation = searchService.list(queryParameters, null);

                return $q.when(searchOperation)
                    .then(function(data) {
                       $scope.rawDocuments = data.data.response;
                    }).catch(function(error) {
                        console.log('ERROR: ' + error);
                    })
                    .finally(function(){
                       $scope.isLoading = false;
                    });

            }

           //==================================
            //
            //==================================
            function load(refresh) {
                if(refresh || !$scope.rawDocuments || _.isEmpty($scope.rawDocuments))
                {
                    return getDocs();                    
                }
            };



			//==================================
		    //
		    //==================================
		    $scope.$watch('model', function(newValue, oldValue){
		        if(newValue){
                     $scope.syncDocuments();
                     $scope.showAddButton = true;
		        }
		    });


            //==================================
            //
            //==================================
			$scope.openAddDialog = function(){
                $scope.allowNew.editingOn = false;
                var dialog = ngDialog.open({
                    template: 'documentSelectionModal',
                    closeByDocument: false,
                    scope: $scope
                });
                dialogId = dialog.id

                 $q.when(load(true))
                    .then(function (){                        
                        //$scope.syncDocuments();
                        _.forEach($scope.rawDocuments.docs, function (doc) {
                            doc.__checked = false;
                            if($scope.isInModel(doc.identifier_s)){
                                doc.__checked = true;
                            }

                        });
                    });
			};



			$scope.isContact = function(document){
				return document && _.some($scope.selectedDocuments, function(doc){
						return doc.header.identifier==removeRevisonNumber(document.identifier) && doc.header.schema == "contact"
				});
			}
			$scope.isAuthority = function(document){
				return document && _.some($scope.selectedDocuments, function(doc){
						return doc.header.identifier==removeRevisonNumber(document.identifier) && doc.header.schema == "authority"
				});
			}

			$scope.isFocalPoint = function(document){
				return document && focalPointRegex.test(document.identifier)
			}

			$scope.isMeasure = function(document){
				return document && _.some($scope.selectedDocuments, function(doc){
						return doc.header.identifier==removeRevisonNumber(document.identifier) && doc.header.schema == "measure"
				});
			}

            $scope.closeDialog = function () {
                $scope.syncDocuments();
                ngDialog.close(dialogId);
                $('body').removeClass('modal-open')
            };

            $scope.onNewRecordSubmitted = function(data){
                
                if(!$scope.rawDocuments.docs)
                    $scope.rawDocuments.docs = [];
                
                $scope.rawDocuments.docs.push({                   
                    _revision_i     : 1,
                    identifier_s    : (data.identifier||data.data.identifier),
                    __checked       : true
                })
                $scope.saveDocuments();
            }

			function removeRevisonNumber(identifier){
                
                if(identifier && identifier.indexOf('@')>=0)
				    return identifier.substr(0, identifier.indexOf('@'))
                
                return identifier;
			}


            $scope.loadEditDirective = function(schema){

                if (!schema)
                    return;

                var lschema = _.clone(schema);
                var schemaMapping = {
                    "modifiedOrganism" 			: 'views/forms/edit/bch/directives/edit-modified-organism.directive',
                    "dnaSequence" 				: 'views/forms/edit/bch/directives/edit-dna-sequence.directive',
                    "organism" 					: 'views/forms/edit/bch/directives/edit-organism.directive',

                    "biosafetyDecision" 		: 'views/forms/edit/bch/directives/edit-biosafety-decision.directive',
                    "biosafetyLaw" 				: 'views/forms/edit/bch/directives/edit-law.directive',
                    "nationalRiskAssessment"    : 'views/forms/edit/bch/directives/edit-risk-assessment.directive',
                    "independentRiskAssessment" : 'views/forms/edit/bch/directives/edit-risk-assessment.directive',

                    'authority'                 : 'views/forms/edit/directives/edit-authority.directive',
                    'contact'                   : 'views/forms/edit/directives/edit-contact.directive',
                    'organization'              : 'views/forms/edit/directives/edit-organization.directive'
                }
                $scope.allowNew.activeSchema = lschema;
                var schemaDetails = schemaMapping[lschema];
                var divSelector = ' #divNewRecord'
                var name 		= snake_case(lschema);
                $('#'+dialogId + divSelector).empty()
                var defer = $q.defer();
                require([schemaDetails], function () {
                    
                    var additionalAttributes = '';
                    if($attr.allowNewAttributes)
                        additionalAttributes = $attr.allowNewAttributes;

                    var directiveHtml = ("<DIRECTIVE on-post-submit='onNewRecordSubmitted(data)' additionalAttributes document-type='documentType'" +
                                         " allow-new='false' is-dialog='true' container='.ngdialog' link-target={{linkTarget}} locales='locales'>"  +
                                         "</DIRECTIVE>")
                            .replace(/DIRECTIVE/g, 'edit-' + name)
                            .replace(/\.ngdialog/, '#'+dialogId)
                            .replace('documentType', $filter("schemaShortName")(schema))
                            .replace('additionalAttributes', additionalAttributes);

                    $scope.$apply(function () {                        
                        $('#'+dialogId + divSelector).empty()
                                .append($compile(directiveHtml)($scope));
                        defer.resolve('')
                    });
                });

                return defer.promise

            }
            function snake_case(name, separator) {

                separator = separator || '-';
                return name.replace(/[A-Z]/g, function (letter, pos) {
                    return (pos ? separator : '') + letter.toLowerCase();
                });
            }
		},

	};
}]);

});
