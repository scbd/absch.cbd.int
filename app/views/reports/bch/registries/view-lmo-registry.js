import app from '~/app';
import '~/services/main'; ;
import viewLmoRegistryT from '~/app-text/views/reports/bch/registries/view-lmo-registry.json';

export { default as template } from './view-lmo-registry.html';
export default ['$scope', 'searchService', '$element', '$rootScope', 'translationService',
	function ($scope, searchService, $element, $rootScope, translationService) { 
		$scope.isLoading = false;
		$scope.isError = false;
		$scope.deviceSize = $rootScope.deviceSize;
		translationService.set('viewLmoRegistryT', viewLmoRegistryT);
		function loadRecords(){ 

			$scope.isLoading = true;
			var searchQuery = {
				fields:  'recordId:uniqueIdentifier_s,uniqueIdentification_s,identity:identity_s,transformationEvent:transformationEvent_s,lmoScientificName:lmoScientificNames_ss,lmoCommonNames:lmoCommonNames_EN_txt,geneTraits:traitsHierarchy_EN_txt,url_ss',
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
				$element.find('#lmoExport').tableExport({
					formats: ['xlsx'],
					filename: 'LMO-registry',
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


