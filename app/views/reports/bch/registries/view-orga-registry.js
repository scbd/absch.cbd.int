define(['app', 'css!/app/css/registry.css','services/search-service'], function(app) { 'use strict';

	app.controller("orgaRegistryController", ['$scope','searchService','$element', '$timeout', 'toastr', '$log',
		function($scope,searchService,$element,$timeout, toastr, $log) { 
				$scope.isLoading = false;
				$scope.isError = false;
				loadRecords();
				function loadRecords(){ 
					$scope.isLoading = true;
				var searchQuery = {
					fields:  'recordId:uniqueIdentifier_s,identity:identity_s,taxonomicStatus:title_s,commonName:commonNames_EN_txt,description:relevantInformation_EN_t,url_ss',
					query:  'schema_s:organism',
					rowsPerPage: 10000
					
				};
				return searchService.list(searchQuery)
					.then(function(result){ 
						$scope.orgaRecords = [];
						$scope.numFound = 0;
						if(result.data){
							$scope.orgaRecords = result.data.response.docs;
							$scope.numFound = result.data.response.numFound;
						}
					  }) 
					.catch(function(e){
						$scope.isError = true;
						throw e;
					})
					.finally(function(){
                        $scope.isLoading = false;
                    })	  
			}
			$scope.export = function () {
				$scope.readyForExport = true;
				require(['tableexport'], function () {
					$element.find('#forExport').tableExport({
						formats: ['xlsx'],
						filename: 'ORGA-registry',
					});
					$element.find('.xlsx').click();
					$timeout(function () {
						$scope.readyForExport = false;
					}, 200)
				});
			}
		}]);

});
