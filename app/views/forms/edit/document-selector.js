define(['app',"text!views/forms/edit/document-selector.html",
'lodash', 'views/directives/search-filter-dates.partial',
'views/search/search-results/result-default', 'services/search-service','services/app-config-service', 
'components/scbd-angularjs-controls/form-control-directives/pagination','ngDialog', 'services/solr'
], function (app, template, _) { // jshint ignore:line

app.directive("documentSelector", ["$timeout",'locale', "$filter", "$q", "searchService", "solr", "IStorage", 'ngDialog', '$compile',
function ($timeout, locale, $filter, $q, searchService, solr, IStorage, ngDialog, $compile) {

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
            $scope.tempSelectedDocuments=[];
			$scope.areVisible = false;
            $scope.userGov = $scope.$root.user.government;
            $scope.showAddButton = false;
            $scope.sortType     = 'rec_title'; 
            $scope.sortReverse  = false;  
            $scope.listView     = $attr.listView=="true";
            $scope.search       = {keyword:''}
            $scope.activeTab    ='allRecords';
            if(!$scope.type) $scope.type = "checkbox";
            
            $scope.searchResult = {
                rowsPerPage:25,
                currentPage:1
            }
            $scope.allowNew = {
                show    : $attr.allowNew=='true',
                schema  : $attr.allowNewSchema,
                title   : $attr.allowNewButtonTitle,
                schemas : ($attr.allowNewSchema||'').split(','),
            };     

            //==================================
            //
            //==================================
			$scope.saveDocuments = function(){
                $scope.isDialogOpen = false;
                var oldModel = angular.copy($scope.model);
                var currentModel;
                $scope.selectedRawDocuments = [];
                _.forEach($scope.tempSelectedDocuments, function (doc) {

                    if(doc.__checked === true)
                    {
                        if(!currentModel && $scope.type != 'radio')
                            currentModel=[];
                        $scope.selectedRawDocuments.push(doc);

                        var document = {identifier: doc.identifier_s};
                        if($attr.identifierWithoutRevision!='true')
                            document.identifier += "@"+ doc._revision_i;

                        if($scope.type == 'radio')
                            currentModel = document;
                        else
                            currentModel.push(document);
                        
                    }

                });

                if(!angular.equals(oldModel, currentModel)){
                    $scope.model = currentModel;
                    ngModelController.$setViewValue($scope.model);
                }

                $scope.syncDocuments();

                ngDialog.close(dialogId);
				$scope.areVisible = true;
			};

            $scope.clearSelectedDocuments = function(){
                $scope.tempSelectedDocuments = [];
                $scope.selectedDocuments = [];
                _.forEach($scope.rawDocuments.docs,function(doc){
                    doc.__checked = false;
                });
            }

             //==================================
            //
            //==================================
			$scope.syncDocuments = function(){
               

                if ($attr.skipSyncDocuments!='true' && $scope.model){
                    
				    var docs = []
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
                            var selectedDocuments = _.map($scope.model, function(d){return removeRevisionNumber(d.identifier)});
                            var selectedRawDocuments = _.filter($scope.rawDocuments.docs, function(doc){
                                return _.contains(selectedDocuments, doc.identifier_s);
                            });
                            //possible that the existing raw doc is not in rawDocuments.doc since it might be from difference page/search query just append
                            _.each($scope.selectedRawDocuments, function(doc){
                                var identifier =  removeRevisionNumber(doc.identifier_s||doc.identifier);
                                var rawDocument = _.find(selectedRawDocuments, function(d){return removeRevisionNumber(d.identifier||d.identifier_s)==identifier})
                                if(rawDocument)
                                    doc = _.extend(doc, rawDocument)
                            })
                            // $scope.selectedRawDocuments = _.union(selectedRawDocuments||[], missingDocs||[]);
                                                        
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
					return removeRevisionNumber($scope.model.identifier) === id

				return  _.find($scope.model, function (mod) {
		                    return removeRevisionNumber(mod.identifier) === id
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
                        if(((doc.header||{}).identifier||doc.identifier_s) !== removeRevisionNumber(removeId) ){
                            return doc;
                        }
                    });
                    $scope.selectedRawDocuments =  _.filter($scope.selectedRawDocuments, function (doc) {
                        if(doc.identifier_s !== removeRevisionNumber(removeId) ){
                        return doc;
                        }
                    });
                    // $scope.tempSelectedRawDocuments = angular.copy($scope.selectedRawDocuments);
                }
			   if($scope.type != 'radio')
	               $scope.model =  _.filter($scope.model, function (doc) {
	                    if((doc.identifier !== removeId && removeId.indexOf('@')>=0) || 
                           (removeId.indexOf('@')<0 && removeRevisionNumber(doc.identifier) !== removeRevisionNumber(removeId))){
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
            function getDocs (options) {
                options = options||{};

                var searchOperation;
				$scope.isLoading = true;
                var schema = "*";
                if ($scope.schema)
                    schema = $scope.schema;

                var fieldQueries = ["schema_s:"+ schema] // cannot escape for backward compatibility

                if($scope.query){ //if query is mentioned ignore schema field in query
                    fieldQueries = [$scope.query];
                }

                if(!$attr.skipGovernment){
                    if($scope.government)
                        fieldQueries.push("government_s:" + solr.escape($scope.government.identifier));
                    if(!$scope.government &&  $scope.userGov)
                        fieldQueries.push("government_s:" + solr.escape($scope.userGov));
                }

                if($scope.hideSelf){
                    fieldQueries.push("NOT (identifier_s:" + solr.escape($scope.hideSelf) + ")");
                }

                if($scope.activeTab == 'myRecords'){
                    var myRecordsQuery = '_contributor_is:' + solr.escape($scope.$root.user.userID);
                    if($scope.userGov)
                        myRecordsQuery += ' OR _ownership_s:'+solr.escape($scope.userGov.toLowerCase());
                    fieldQueries.push(myRecordsQuery)
                }

                var query = '*:*';
                
                if($scope.search.keyword){
                    var queryText = $scope.search.keyword;
                    if(queryText.indexOf('-')>0) 
                        queryText = '"' + queryText + '"' // Add quotes if text contains - especially if search is by uid
                
                    if(($attr.freeTextQueryField||'')!='')
                        query = $attr.freeTextQueryField + ':' + solr.escape(queryText);
                    else
                        query = 'text_'+(locale||'en').toUpperCase()+'_txt:' + solr.escape(queryText);
                }

                var queryParameters = {
                    fields          : ($attr.displayFields||'')!= '' ? $attr.displayFields : undefined,
                    fieldQuery      : fieldQueries,
                    'query'         : query,
                    'currentPage'   : $scope.searchResult.currentPage-1,
                    'rowsPerPage'   : $scope.searchResult.rowsPerPage                    
                };
                if(!$scope.search.keyword){
                    queryParameters.sort = options.sort||'updatedDate_dt desc';
                }

                searchOperation = searchService.list(queryParameters, null);

                return $q.when(searchOperation)
                    .then(function(data) {
                       $scope.rawDocuments = data.data.response;
                       $scope.rawDocuments.pageCount = Math.ceil($scope.rawDocuments.numFound / $scope.searchResult.rowsPerPage)
                       
                       var selectedRecords = _($scope.tempSelectedDocuments||[])
                            .map(function(doc){ return doc.header && doc.header.identifier || doc.identifier || doc.identifier_s }).value();
   
                        _.each(selectedRecords, function(identifier){
                            var newDocument = _.find($scope.rawDocuments.docs, {identifier_s:removeRevisionNumber(identifier)});
                            if(newDocument)
                                newDocument.__checked = true
                        })


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


            $scope.onPageChange = function(page){
                $scope.searchResult.currentPage = page;
               getDocs();
            } 
            
            $scope.onPageSizeChanged = function(size){
                $scope.searchResult.rowsPerPage = size;
                $scope.searchResult.currentPage = 1;
                getDocs();
            }

            $scope.onSelectAction = function(doc, action){
                // console.log(doc)
                if($scope.type == "radio"){
                    _.each($scope.rawDocuments.docs, function(d){
                        if(d.identifier_s!=doc.identifier_s && d.__checked)
                            d.__checked = false;
                        // if(d.identifier_s==doc.identifier_s){
                        //     console.log(d);
                        // }
                    })
                }
                if(doc.__checked===true){
                    if($scope.type == "checkbox")
                        $scope.tempSelectedDocuments.push(angular.copy(doc));
                    else 
                        $scope.tempSelectedDocuments = [angular.copy(doc)];
                }
                else{
                    if($scope.type == "checkbox"){
                        var index = _.findIndex($scope.tempSelectedDocuments, function(temp){return temp.identifier_s==doc.identifier_s})
                        if(index>=0)
                            $scope.tempSelectedDocuments.splice(index, 1);
                    }
                    // else for type radio uncheck will never raise so ignore.
                }
            }

            $scope.changeTab = function(tab){
                $scope.activeTab = tab;
                if(tab=='allRecords' || tab=='myRecords'){
                    showToolTip();
                    $scope.searchFreeText($scope.search.keyword)
                }
            }

            $scope.changeDisplay = function(type){
                $scope.listView = type=='list';
            }

            $scope.searchFreeText = function(searchKeyword){
                // if(!searchKeyword)return;

                $scope.searchResult.currentPage = 1;
                getDocs();
            }

            function loadSelectedDocumentDetails(){
                                
                if(!$scope.model || ($scope.type == "checkbox" && !$scope.model.length))
                    return;

                var identifiers = [];
                if($scope.type == "checkbox")
                    identifiers = _.map($scope.model, function(item){return removeRevisionNumber(item.identifier)});
                else
                    identifiers = [removeRevisionNumber($scope.model.identifier)];
                
                var queryField = 'identifier_s'
                if(($attr.lookupField||'')!='')
                    queryField = $attr.lookupField;

                var queryParameters = {
                    fields       : ($attr.displayFields||'')!= '' ? $attr.displayFields : undefined,
                    'query'      : queryField + ':("' +_.map(identifiers,solr.escape).join('" "') +'")',
                    'rowsPerPage': $scope.searchResult.rowsPerPage                    
                };
                searchService.list(queryParameters, null).then(function(result){                    
                    $scope.tempSelectedDocuments = _.map(result.data.response.docs, function(doc){
                        doc.__checked=true;
                        return doc;
                    });
                });
            }
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
                $scope.openingDialog=true
                $scope.activeTab = 'allRecords';
                $scope.allowNew.editingOn = false;
                $scope.search.keyword = '';
                $scope.searchResult = {
                    rowsPerPage:25,
                    currentPage:1
                }
                $scope.tempSelectedDocuments = $scope.selectedDocuments||[]
                var dialog = ngDialog.open({
                    template: 'documentSelectionModal',
                    closeByDocument: false,
                    scope: $scope,
                    controller:['$scope', '$q', '$timeout', function($scope, $q, $timeout){
                        $scope.isDialogOpen = true;
                        load(true).then(function(){showToolTip()});
                        loadSelectedDocumentDetails();                        
                    }],
                    onOpenCallback: onDialogOpened
                });
                dialogId = dialog.id;
                dialog.closePromise.then(function(data){
                    $scope.isDialogOpen = false;
                    console.log(data)
                })
                
                function onDialogOpened(name){
                    $scope.openingDialog = false;
                }
			};



			$scope.isContact = function(document){
				return document && _.some($scope.selectedDocuments, function(doc){
						return (doc.identifier_s||doc.header.identifier)==removeRevisionNumber(document.identifier) && (doc.schema_s||(document.header||{}).schema) == "contact"
				});
			}
			$scope.isAuthority = function(document){
				return document && _.some($scope.selectedDocuments, function(doc){
						return (doc.identifier_s||doc.header.identifier)==removeRevisionNumber(document.identifier) && (doc.schema_s||(document.header||{}).schema) == "authority"
				});
			}

			$scope.isFocalPoint = function(document){
				return document && focalPointRegex.test(document.identifier)
			}

			$scope.isMeasure = function(document){
				return document && _.some($scope.selectedDocuments, function(doc){
						return (doc.identifier_s||doc.header.identifier)==removeRevisionNumber(document.identifier) && (doc.schema_s||(document.header||{}).schema) == "measure"
				});
			}

            $scope.closeDialog = function () {
                $scope.isDialogOpen = false;
                $scope.syncDocuments();
                ngDialog.close(dialogId);
                $('body').removeClass('modal-open')
            };

            $scope.onNewRecordSubmitted = function(data){
                if(data.state == 'running'){
                    if(!$scope.runningWorklfows)
                        $scope.runningWorklfows={};
                    $scope.runningWorklfows[data.data.identifier+'@1'] = true;
                }
                if(!$scope.rawDocuments.docs)
                    $scope.rawDocuments.docs = [];
                if(!$scope.tempSelectedDocuments)
                    $scope.tempSelectedDocuments = [];

                var newDoc = {                   
                    _revision_i     : 1,
                    identifier_s    : (data.identifier||data.data.identifier),
                    __checked       : true
                }
                $scope.rawDocuments.docs.push(newDoc);
                $scope.tempSelectedDocuments.push(newDoc);
                $scope.saveDocuments();
            }

            function updateSelectedDocumentStatus(docs){
                _.forEach(docs, function (doc) {
                    doc.__checked = false;
                    if(_.find($scope.tempSelectedDocuments, {identifier_s:doc.identifier_s})){
                        doc.__checked = true;
                    }
                });
            }

            function showToolTip(){
                $timeout(function(){              
                    $('#' + dialogId + ' [data-toggle="tooltip"]').tooltip()
                }, 300); 
            }

			function removeRevisionNumber(identifier){
                
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
                    'organization'              : 'views/forms/edit/directives/edit-organization.directive',
                    'biosafetyNews'             : 'views/forms/edit/directives/edit-biosafety-news.directive'
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
