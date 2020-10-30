define(['app', 'services/search-service'], function(app) { 'use strict';

	app.controller("geneRegistryController", ['$scope','searchService','$element', '$timeout',
		function($scope,searchService,$element,$timeout) { 
				$scope.isLoading = false;
				loadRecords();
				function loadRecords(){ 
					$scope.isLoading = true;
				var searchQuery = {
					fields:  'Record_ID:uniqueIdentifier_s,Name:name_s,Trait:summary_t,Donor_organism:geneDonorOrganism,geneFunction:biologicalFunction_EN_t,url_ss',
					query:  'schema_s:dnaSequence',
					rowsPerPage: 10000					
				};
				return searchService.list(searchQuery)
					.then(function(result){ 
						$scope.geneRecords = [];
						$scope.numFound = 0;
						if(result.data){
							$scope.geneRecords = result.data.response.docs;
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
						filename: 'GENE-registry',
					});
					$element.find('.xlsx').click();
					$timeout(function () {
						$scope.readyForExport = false;
					}, 200)
				});
			}
		}]);

});
