define(['app','css!/app/css/registry.css','services/search-service'], function(app) { ;

return ['$scope','searchService','$element', '$rootScope',
function($scope,searchService,$element, $rootScope) { 
		$scope.isLoading = false;
		$scope.isError = false;
		$scope.deviceSize = $rootScope.deviceSize;
		
		function loadRecords(){ 

			$scope.isLoading = true;
			var searchQuery = {
				fields:  'recordId:uniqueIdentifier_s,taxonomicStatus:scientificName_s,commonName:commonNames_EN_txt,description:relevantInformation_EN_t,url_ss',
				query:  'schema_s:organism',
				sort:	'scientificName_s asc',
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
				$element.find('#orgaExport').tableExport({
					formats: ['xlsx'],
					filename: 'ORGA-registry',
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
