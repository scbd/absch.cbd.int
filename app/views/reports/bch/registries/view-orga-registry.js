define(['app', 'services/search-service'], function(app) { 'use strict';

	app.controller("orgaRegistryController", ['$scope','searchService','$element', '$timeout',
		function($scope,searchService,$element,$timeout) { 
				$scope.isLoading = false;
				loadRecords();
				function loadRecords(){ 
					$scope.isLoading = true;
				var searchQuery = {
					fields:  'Record_ID:uniqueIdentifier_s,Identity:identity_s,Taxonomic_status:title_s,Common_name:commonNames_EN_txt,Description:relevantInformation_EN_t,url_ss',
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
						$scope.isLoading = false;
					  }) 
					  
			}
			$scope.export = function () {
				$scope.dataToExport = $scope.data;
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
