define(['app',
'js/common',"text!views/forms/edit/document-selector.html",
'views/directives/search-filter-dates.partial',
'views/search/search-results/result-default',
'services/search-service',
'services/app-config-service', 'ngDialog'
], function (app, commonjs, template) { // jshint ignore:line

app.directive("documentSelector", ["$http",'$rootScope', "$filter", "underscore", "$q", "searchService", "appConfigService", "IStorage", 'ngDialog', 'commonjs',
function ($http, $rootScope, $filter, _,  $q, searchService, appConfigService, IStorage, ngDialog, commonjs) {

	return {
		restrict   : "EA",
		template: template,
		replace    : true,
		transclude : false,
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
		},
		link : function($scope, $element, $attr) {
            var focalPointRegex = /^52000000cbd022/;
            $scope.rawDocuments = [];
            $scope.selectedDocuments=[];
			$scope.areVisible = false;
            $scope.userGov = $scope.$root.user.government;
            $scope.showAddButton = false;

            if(!$scope.type) $scope.type = "checkbox";


            //==================================
            //
            //==================================
			$scope.saveDocuments = function(){

                //$scope.model=undefined;

                _.forEach($scope.rawDocuments.docs, function (doc) {

                    if(doc.__checked === true)
                    {
                        if(!$scope.model && $scope.type != 'radio')
                            $scope.model=[];

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

                $scope.syncDocuments();

                ngDialog.close();
				$scope.areVisible = true;
			};


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
            function load() {
                if(!$scope.rawDocuments || _.isEmpty($scope.rawDocuments))
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

                ngDialog.open({
                    template: 'documentSelectionModal',
                    closeByDocument: false,
                    scope: $scope
                });

                 $q.when(load())
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
                ngDialog.close();
            };
			function removeRevisonNumber(identifier){
                
                if(identifier.indexOf('@')>=0)
				    return identifier.substr(0, identifier.indexOf('@'))
                
                return identifier;
			}

		},

	};
}]);

});
