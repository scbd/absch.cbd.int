define(['app','css!/app/css/registry.css','services/search-service'], function(app) { 'use strict';

return ['$scope','searchService','$element', '$rootScope',
function($scope,searchService,$element, $rootScope) { 
		$scope.isLoading = false;
		$scope.isError = false;
		$scope.deviceSize = $rootScope.deviceSize;
		
		function loadRecords(){ 

			$scope.isLoading = true;
			var searchQuery = {
				fields:  'recordId:uniqueIdentifier_s,uniqueIdentification_s,identity:identity_s,transformationEvent:transformationEvent_s,lmoScientificName:lmoScientificNames_ss,lmoCommonNames:lmoCommonNames_EN_txt,description:summary_EN_t,url_ss',
				query:  'schema_s:modifiedOrganism',
				sort:	'uniqueIdentification_s asc, lmoScientificNames_ss asc, transformationEvent_s asc',
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
					filename: 'LMO-registry',
				});
				$element.find('.xlsx').click();
				$scope.$applyAsync(function () {
					$scope.readyForExport = false;
				})
			});
		}

		loadRecords();
}];

});
