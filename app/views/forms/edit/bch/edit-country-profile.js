define(['app',  './directives/edit-country-profile.directive' ], 
function (app, _) {
	app.controller("editCountryProfileController", ["$scope",   "$controller",   'IStorage', '$routeParams', 'ngDialog',"searchService",
	function($scope,  $controller,  IStorage, $routeParams, ngDialog,searchService) {
		$controller('editController', {
			$scope: $scope ,
			 
		});
		(function(){ 
			if($routeParams.identifier){ 
				return;
			} 
			console.log('I m in return')
			var searchQuery = $scope.exportQuery = {
				fields  : 'identifier_s',
				query   : 'schema_s:countryProfile AND government_s:' + $scope.userGovernment().toLowerCase() 
			}; 
			searchService.list(searchQuery) 
            .then(function(result) { 
				if(result.data.response.docs.length){ 
					const identifier = result.data.response.docs[0].identifier_s || (result.data.response.docs[1] && result.data.response.docs[1].identifier_s)
					IStorage.documents.get(identifier)
					.then(function (document) {  
					  notifyLoadExistingRecord(document.data)
					});
				  }
                
            });
		}())

		function notifyLoadExistingRecord(published){ 
			if (published && published.header) {
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
							$location.path('register/BCP/' + published.header.identifier+'/edit');
						}
					}]
				});
			}
			else{

			}
		}
   }]);
});
