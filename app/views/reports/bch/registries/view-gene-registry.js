define(['app','css!/app/css/registry.css','services/search-service'], function(app) { 'use strict';

app.controller("geneRegistryController", ['$scope','searchService','$element', '$timeout', 'toastr', '$log',
function($scope,searchService,$element,$timeout, toastr, $log) { 
		$scope.isLoading = false;
		loadRecords();
		function loadRecords(){ 
			$scope.isLoading = true;
		var searchQuery = {
			fields:  'recordId:uniqueIdentifier_s,name:name_s,trait:summary_t,donorOrganism:geneDonorOrganism,geneFunction:biologicalFunction_EN_t,url_ss',
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
				toastr.error('There was an error running search query.')
				var exception = {
					data    :  e.data||e.message, status:e.status,
					url     : (e.config||{}).url, params: (e.config||{}).params,
					stack   : e.stack
				}                                
				$log.error(JSON.stringify(exception))
			})
			.finally(function(){
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
