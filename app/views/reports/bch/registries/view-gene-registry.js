define(['app','css!/app/css/registry.css','services/search-service'], function(app) { 'use strict';

return ['$scope','searchService','$element', '$rootScope',
function($scope,searchService,$element, $rootScope) {  
		$scope.isLoading = false;
		$scope.isError = false;
		$scope.deviceSize = $rootScope.deviceSize;
		
		function loadRecords(){ 

			$scope.isLoading = true;
			var searchQuery = {
				fields:  'recordId:uniqueIdentifier_s,name:name_s,trait:summary_t,organismCommonNames:geneDonorOrganismCommonNames_EN_txt,organismScientificNames:geneDonorOrganismScientificNames_ss,geneFunction:biologicalFunction_EN_t,url_ss',
				query:  'schema_s:dnaSequence',
				sort:	'name_s asc',
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
				$element.find('#geneExport').tableExport({
					formats: ['xlsx'],
					filename: 'GENE-registry',
				});
				$element.find('.xlsx').click();
				$element.find('.xlsx').remove();
				$scope.$applyAsync(function () {
					$scope.readyForExport = false;
				}, 200)
			});
		}

		loadRecords();
}];

});
