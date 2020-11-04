define(['app','css!/app/css/registry.css','services/search-service'], function(app) { 'use strict';

app.controller("geneRegistryController", ['$scope','searchService','$element', '$rootScope',
function($scope,searchService,$element, $rootScope) {  
		$scope.isLoading = false;
		$scope.isError = false;
		$scope.deviceSize = $rootScope.deviceSize;
		
		function loadRecords(){ 

			$scope.isLoading = true;
			var searchQuery = {
				fields:  'recordId:uniqueIdentifier_s,name:name_s,trait:summary_t,donorOrganism:geneDonorOrganismCommonNames_EN_txt,geneFunction:biologicalFunction_EN_t,url_ss',
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
					filename: 'GENE-registry',
				});
				$element.find('.xlsx').click();
				$scope.$applyAsync(function () {
					$scope.readyForExport = false;
				}, 200)
			});
		}

		loadRecords();
}]);

});
