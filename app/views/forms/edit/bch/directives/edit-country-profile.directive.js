define(['app', 'lodash', 'text!./edit-country-profile.directive.html', 'views/forms/edit/edit',
	"views/forms/view/bch/view-country-profile.directive",'services/solr'], 
function (app, _, template) { 
	app.directive("editCountryProfile", ["$controller", '$routeParams', 'ngDialog',"searchService", 'solr', function($controller, $routeParams, ngDialog,searchService,solr) {
		return {
			restrict   : "EA",
			template: template,
			replace    : true,
			require    : '?ngModel',
			scope:{
				onPostSubmitFn   : "&onPostSubmit"
			},
			link: function($scope, $element, $attr){  
				$scope.container        = $attr.container;
    			$scope.isDialog         = $attr.isDialog;  
				$scope.type 			= $attr.documentType;  
                $controller('editController', {
                    $scope: $scope
                }); 
                $scope.getCleanDocument = function(document) {
                     document = document || $scope.document;  
                    if (!document)
						return undefined; 
						
					return $scope.sanitizeDocument(document);
				}; 
				$scope.onGovernmentChange = function(){
					if($scope.document.government)
						checkRecordAlreadyExists($scope.document.government.identifier);
				}	
				$scope.setDocument({})
				.then(function(doc){
					checkRecordAlreadyExists(doc.government.identifier);
					});
				function checkRecordAlreadyExists(government){
						if($routeParams.identifier){ 
							return;
						}  
						government  = government || $rootScope.user.government;
						var searchQuery  = {
							fields  : 'identifier_s',
							query   : 'schema_s:countryProfile AND government_s:' + solr.escape(government.toLowerCase())
						}; 
						searchService.list(searchQuery) 
						.then(function(result) { 
							if(result.data.response.docs.length){ 
								var identifier = result.data.response.docs[0].identifier_s;
								if(identifier){
									validateCountryProfileExists(identifier)
								}
							}
							
						});
				}  
				function validateCountryProfileExists(identifier){ 
					if (identifier) {
						$scope.blockEditForm = true; 
						ngDialog.open({
							template: 'recordExistsTemplate.html',													
							closeByDocument: false,
							closeByEscape: false,
							showClose: false,
							closeByNavigation: false,
							controller: ['$scope', '$timeout', '$location', function($scope, $timeout, $location) {
								$scope.alertSeconds = 10;
								time(); 
								function time(){
									$timeout(function(){
										if($scope.alertSeconds == 1){																	
											$scope.openExisting();
										}
										else{
											$scope.alertSeconds--;																
											time()
										}
									}, 1000)
								}
								$scope.openExisting = function() {
									ngDialog.close();
									$location.path('register/BCP/' + identifier+'/edit');
								}
							}]
						});
					}

				}
			}
			
		} 
	 
   }]);

});
