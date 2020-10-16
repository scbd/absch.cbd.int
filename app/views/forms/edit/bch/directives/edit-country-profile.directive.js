define(['app', 'lodash', 'text!./edit-country-profile.directive.html', 'views/forms/edit/edit',
	"views/forms/view/bch/view-country-profile.directive"], 
function (app, _, template) { 
	app.directive("editCountryProfile", ["$controller",'IStorage', '$routeParams', 'ngDialog',"searchService", function($controller,IStorage, $routeParams, ngDialog,searchService) {
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
				$scope.setDocument({})  
				$scope.checkRecordAlreadyExists = function(){
					if($routeParams.identifier){ 
						return;
					}  
					var searchQuery  = {
						fields  : 'identifier_s',
						query   : 'schema_s:countryProfile AND government_s:' + $scope.userGovernment().toLowerCase() 
					}; 
					searchService.list(searchQuery) 
					.then(function(result) { 
						if(result.data.response.docs.length){ 
							const identifier = result.data.response.docs[0].identifier_s;
							if(identifier){
								$scope.validateCountryProfileExists(identifier)
							}
						  }
						
					});
				} 
				$scope.checkRecordAlreadyExists();
				$scope.validateCountryProfileExists = function(identifier){ 
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
						else{
			
						} 
				}
			}
			
		} 
	 
   }]);

});
