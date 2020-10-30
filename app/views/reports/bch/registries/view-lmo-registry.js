define(['app', 'services/search-service'], function(app) { 'use strict';

	app.controller("lmoRegistryController", ['$scope','searchService','$element', '$timeout',
		function($scope,searchService,$element,$timeout) { 
				$scope.isLoading = false;
				loadRecords();
				function loadRecords(){ 
					$scope.isLoading = true;
				var searchQuery = {
					fields:  'Record_ID:uniqueIdentifier_s,Identity:identity_s,Transformation_event:transformationEvent_s,Organism:lmoCommonNames_EN_txt,Description:summary_t,url_ss',
					query:  'schema_s:modifiedOrganism',
					rowsPerPage: 10000
					
				};
				return searchService.list(searchQuery)
					.then(function(result){ 
						$scope.lmoRecords = [];
						$scope.numFound = 0;
						if(result.data){
							$scope.lmoRecords = result.data.response.docs;
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
						filename: 'LMO-registry',
					});
					$element.find('.xlsx').click();
					$timeout(function () {
						$scope.readyForExport = false;
					}, 200)
				});
			}
		}]);

});
