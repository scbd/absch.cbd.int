import app from '~/app';
import template from 'text!./document-selector.html';
import _ from 'lodash';
import '~/views/directives/search-filter-dates.partial';
import '~/views/search/search-results/result-default';
import '~/components/scbd-angularjs-controls/main';
import 'ngDialog';
import '~/services/main'; // jshint ignore:line
import documentSelectorT from '~/app-text/views/forms/edit/document-selector.json';

app.directive("documentSelector", ["$timeout", 'locale', "$filter", "$q", "searchService", "solr", "IStorage", 'ngDialog', '$compile', 'toastr', 'translationService',
    function ($timeout, locale, $filter, $q, searchService, solr, IStorage, ngDialog, $compile, toastr, translationService) {

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
            query    : "=",
            onRecordsFetched    : '&?',
            onBuildQuery        : '&?'
		},
		link : function($scope, $element, $attr, ngModelController) {
            var dialogId;
            var focalPointRegex = /^52000000cbd022/;
            translationService.set('documentSelectorT', documentSelectorT);
            $scope.rawDocuments = [];
            $scope.selectedDocuments=[];
            $scope.tempSelectedDocuments=[];
			$scope.areVisible = false;
            $scope.userGov = $scope.$root.user?.government;
            $scope.showAddButton = false;
            $scope.listView     = $attr.listView=="true";
            $scope.search       = {keyword:''}
            $scope.activeTab    ='allRecords';
            if(!$scope.type) $scope.type = "checkbox";
            
            $scope.searchResult = {
                rowsPerPage :25,
                currentPage :1,
                sortBy      :$attr.sortByField||'updatedDate_dt',
                sortSequence:' asc'  
            }
            $scope.allowNew = {
                show    : $attr.allowNew=='true',
                schema  : $attr.allowNewSchema,
                title   : $attr.allowNewButtonTitle,
                schemas : _.compact(($attr.allowNewSchema||'').split(',')),
            };     

            $scope.showMyGovFilter = $scope.allowNew.schemas.includes('contact')
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
                $scope.selectedDocuments     = [];
                $scope.selectedRawDocuments  = [];
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
	                    _.forEach($scope.model, function (mod) {
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
                                return _.includes(selectedDocuments, doc.identifier_s);
                            });
                            //possible that the existing raw doc is not in rawDocuments.doc since it might be from difference page/search query just append
                            _.forEach($scope.selectedRawDocuments, function(doc){
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
                        if(removeRevisionNumber((doc.header||{}).identifier||doc.identifier_s) !== removeRevisionNumber(removeId) ){
                            return doc;
                        }
                    });
                    $scope.selectedRawDocuments =  _.filter($scope.selectedRawDocuments, function (doc) {
                        if(removeRevisionNumber(doc.identifier_s) !== removeRevisionNumber(removeId) ){
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

            $scope.$on('event:remove-selected-record', function (evt, data) {

                if($attr.instanceId){
                    if(data.instanceId == $attr.instanceId)
                        $scope.removeDocument(data.document);
                }
                else{
                    console.warn('event:remove-selected-record raised without unique instance id, please set instance-id attribute on the element to process the event')
                }
            });

            $scope.$on('event:remove-selected-records', function (evt, data) {

                if($attr.instanceId){
                    if(data.instanceId == $attr.instanceId)
                        $scope.clearSelectedDocuments();
                }
                else{
                    console.warn('event:remove-selected-record raised without unique instance id, please set instance-id attribute on the element to process the event')
                }
            });

            $scope.$on('evt:loadDocumentSelectorSelectedRecords', async (evt)=>{
                $scope.isLoadingSelectedRawDocuments = true
                try{
                    $scope.selectedRawDocuments = await loadSelectedDocumentDetails();
                }
                catch(e){
                    console.error(e);
                }
                finally{$scope.isLoadingSelectedRawDocuments = undefined};
                
            })
             //==================================
            //
            //==================================
            function getDocs (options) {
                options = options||{};

                var searchOperation;
				$scope.isLoading = true;
                var rawQuery = {};

                if(typeof $scope.onBuildQuery == 'function'){
                    rawQuery = $scope.onBuildQuery({searchText:$scope.search.keyword, tab:$scope.activeTab});
                }
                else{
                    throw Error('Obsolete code called in document-selector');
                }
                if(rawQuery.fields){
                    const metaFields = ['rec_meta1:meta1_EN_txt', 'rec_meta2:meta2_EN_txt', 'rec_meta3:meta3_EN_txt',
                    'uniqueIdentifier_s:uniqueIdentifier_s', 'rec_summary:summary_t', 'url_ss']
                    metaFields.forEach(f=>{
                        if(rawQuery.fields.indexOf(f)<0)
                            rawQuery.fields += `,${f}`;
                    });
                
                }
                
                rawQuery = rawQuery || {fieldQueries:[]};
                //tabs query
                if($scope.activeTab == 'myRecords'){
                    var myRecordsQuery = '_contributor_is:' + solr.escape($scope.$root.user.userID);
                    rawQuery.fieldQueries.push(myRecordsQuery);
                }
                else if($scope.activeTab == 'myGovernmentRecords' && $scope.userGov){
                    var myGovernmentQuery = '_ownership_s:country\\:'+solr.escape($scope.userGov.toLowerCase());
                    rawQuery.fieldQueries.push(myGovernmentQuery);
                }
                //if the custom query wants custom pagination
                if(rawQuery.currentPage)
                    $scope.searchResult.currentPage = rawQuery.currentPage;
                if(rawQuery.rowsPerPage)
                    $scope.searchResult.rowsPerPage = rawQuery.rowsPerPage;

                var queryParameters = {
                    fields        : rawQuery.fields,
                    fieldQuery    : rawQuery.fieldQueries,
                    query         : rawQuery.query,
                    currentPage   : $scope.searchResult.currentPage-1,
                    rowsPerPage   : $scope.searchResult.rowsPerPage                    
                };

                if(!options.sorting && rawQuery.sort)
                    queryParameters.sort = rawQuery.sort;
                else if(!$scope.search.keyword || options.sorting){
                    var sortExpression  = getSortField(rawQuery.fields)
                    var sortSequence    = $scope.search.sortSequence||' asc';

                    if(!sortExpression)
                        sortExpression = rawQuery.sort||('updatedDate_dt' + sortSequence);
                    else
                        sortExpression+= sortSequence;

                    queryParameters.sort = sortExpression;
                }

                searchOperation = searchService.list(queryParameters, null);

                return $q.when(searchOperation)
                    .then(function(data) {
                       if(!$scope.onRecordsFetched) 
                            $scope.rawDocuments = data.data.response;
                       else 
                            $scope.rawDocuments = $scope.onRecordsFetched({data:data.data.response, query:queryParameters})||data.data.response;

                       $scope.rawDocuments.pageCount = Math.ceil($scope.rawDocuments.numFound / $scope.searchResult.rowsPerPage)
                       
                       _.forEach($scope.rawDocuments.docs, function(doc){
                            
                            _.forEach(doc, function(val, key){
                                //convert meta fields to [] if it is of type string
                                if(['rec_meta1', 'rec_meta2', 'rec_meta3'].includes(key)){
                                    if(_.isString(doc.rec_meta1))
                                        doc.rec_meta1 = [doc.rec_meta1];
                                    if(_.isString(doc.rec_meta2))
                                        doc.rec_meta2 = [doc.rec_meta2];
                                    if(_.isString(doc.rec_meta3))
                                        doc.rec_meta3 = [doc.rec_meta3];
                                    
                                    doc.meta = [...(doc.rec_meta1||[]), ...(doc.rec_meta2||[]), ...(doc.rec_meta3||[])].join(', ')
                                }
                                else{
                                    //incase if the directive receives fl list from view, convert _txt to string 
                                    if(_.isArray(val)) 
                                        doc[key] = val.join(', ');
                                }
                            })
                            return doc;
                       });
                       
                       var selectedRecords = _($scope.tempSelectedDocuments||[])
                            .map(function(doc){ return doc.header && doc.header.identifier || doc.identifier || doc.identifier_s }).value();
   
                        _.forEach(selectedRecords, function(identifier){
                            var newDocument = _.find($scope.rawDocuments.docs, {identifier_s:removeRevisionNumber(identifier)});
                            if(newDocument)
                                newDocument.__checked = true
                        })


                    }).catch(function(error) {
                        toastr.error('Error processing search')
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

            $scope.onSort = function(sortField, sortSequence){
                $scope.search.sortSequence  = sortSequence == ' desc' ? ' asc' : ' desc';
                $scope.search.sort          = sortField;
                getDocs({sorting:true});
            } 

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
                    _.forEach($scope.rawDocuments.docs, function(d){
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
                if(['allRecords', 'myRecords', 'myGovernmentRecords'].includes(tab)){
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
                return searchService.list(queryParameters, null).then(function(result){                    
                    return $scope.tempSelectedDocuments = _.map(result.data.response.docs, function(doc){
                        doc.__checked=true;
                        return doc;
                    });
                });
            }

            function getSortField(sortFields){
                //, rec_meta:meta1_EN_txt, rec_meta:meta2_EN_txt, rec_meta:meta3_EN_txt
                const sortFieldMapping = {
                    uniqueIdentifier_s     : 'uniqueIdentifier_s',
                    title_t                : 'title_s',
                    summary_t              : 'summary_s',
                    [`title_${locale}_t`]  : 'title_EN_s',
                    [`summary_${locale}_t`]: 'summary_EN_s'
                }
                var field  = $scope.search.sort;
                var fields = sortFields||$attr.displayFields||'rec_date:updatedDate_dt,uniqueIdentifier_s:uniqueIdentifier_s,rec_countryName:government_EN_t, rec_title:title_EN_s, rec_summary:summary_t,rec_type:type_EN_t,rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt,rec_meta3:meta3_EN_txt'
                if(~fields.indexOf(field)){
                    var sortField = _(fields.split(',')).map(function(f){
                                        if(~f.indexOf(field)){
                                            const sortField = f.split(':')[1];
                                            return sortFieldMapping[sortField] || sortField;
                                        }
                                    }).compact().join($scope.search.sortSequence + ' ')
                    return sortField;
                }
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
                })
                
                function onDialogOpened(name){
                    $scope.openingDialog = false;
                    var height = ($(window).height()/2)+20; 
                    $(`#${dialogId} .modal-body .tab-content`).css('max-height', height + 'px');  
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
                    $('#' + dialogId + ' [data-bs-toggle="tooltip"]').tooltip()
                }, 300); 
            }

			function removeRevisionNumber(identifier){
                
                if(identifier && identifier.indexOf('@')>=0)
				    return identifier.substr(0, identifier.indexOf('@'))
                
                return identifier;
			}


            $scope.loadEditDirective = async function(schema){

                if (!schema)
                    return;

                var divSelector = ' #divNewRecord'
                var name 		= snake_case(schema);
                
                $scope.loadingEditDirective = true;
                $scope.allowNew.activeSchema = schema;
                $('#'+dialogId + divSelector).empty()
                
                await fetchEditDirective(schema);
                    
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
                    $scope.loadingEditDirective = false;
                });

            }
            function snake_case(name, separator) {

                separator = separator || '-';
                return name.replace(/[A-Z]/g, function (letter, pos) {
                    return (pos ? separator : '') + letter.toLowerCase();
                });
            }

            async function fetchEditDirective(schema){
                if(schema == 'modifiedOrganism' 			){ return await import('~/views/forms/edit/bch/directives/edit-modified-organism.directive'); }
                if(schema == 'dnaSequence' 				    ){ return await import('~/views/forms/edit/bch/directives/edit-dna-sequence.directive'); }
                if(schema == 'organism' 					){ return await import('~/views/forms/edit/bch/directives/edit-organism.directive'); }
                if(schema == 'biosafetyDecision' 		    ){ return await import('~/views/forms/edit/bch/directives/edit-biosafety-decision.directive'); }
                if(schema == 'biosafetyLaw' 				){ return await import('~/views/forms/edit/bch/directives/edit-law.directive'); }
                if(schema == 'nationalRiskAssessment'       ){ return await import('~/views/forms/edit/bch/directives/edit-risk-assessment.directive'); }
                if(schema == 'independentRiskAssessment'    ){ return await import('~/views/forms/edit/bch/directives/edit-risk-assessment.directive'); }
                if(schema == 'biosafetyNews'                ){ return await import('~/views/forms/edit/bch/directives/edit-biosafety-news.directive'); }
                if(schema == 'authority'                    ){ return await import('~/views/forms/edit/directives/edit-authority.directive'); }
                if(schema == 'supplementaryAuthority'       ){ return await import('~/views/forms/edit/directives/edit-authority.directive'); }
                if(schema == 'contact'                      ){ return await import('~/views/forms/edit/directives/edit-contact.directive'); }
                if(schema == 'organization'                 ){ return await import('~/views/forms/edit/directives/edit-organization.directive'); }                
                if(schema == 'resource'                     ){ return await import('~/views/forms/edit/directives/edit-resource.directive'); }
                if(schema == 'capacityBuildingInitiative'   ){ return await import('~/views/forms/edit/directives/edit-capacity-building-initiative.directive'); }
            }
		},

	};
}]);


