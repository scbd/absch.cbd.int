import app from '~/app';
import '~/services/main'; ;
import viewLabRegistryT from '~/app-text/views/reports/bch/registries/view-lab-registry.json';

export { default as template } from './view-lab-registry.html';
export default ['$scope', 'searchService', '$element', '$rootScope', 'translationService',
	function ($scope, searchService, $element, $rootScope, translationService) { 
		$scope.isLoading = false;
		$scope.isError = false;
		$scope.deviceSize = $rootScope.deviceSize;
		translationService.set('viewLabRegistryT', viewLabRegistryT);
		function loadRecords(){ 

			$scope.isLoading = true;
			//ToDo: need laboratoryName 
			var searchQuery = {
				fields:  'recordId:uniqueIdentifier_s,laboratoryName:title_EN_s,servicesAndActivities:services_EN_ss,typesOfDetection:detectionMethods_EN_ss,url_ss',
				query:  'schema_s:laboratoryDetection',
				sort:	'title_EN_s asc',
				rowsPerPage: 10000
			};
			return searchService.list(searchQuery)
			.then(function(result){ 
				$scope.labRecords = [];
				$scope.numFound = 0;
				if(result.data){
					$scope.labRecords = result.data.response.docs;
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
				$element.find('#labExport').tableExport({
					formats: ['xlsx'],
					filename: 'LAB-registry',
				});
				$element.find('.xlsx').click();
				$element.find('.xlsx').remove();
				$scope.$applyAsync(function () {
					$scope.readyForExport = false;
				}, 200)
			});
		}
		$scope.removeLabFromStart= function (str) {
			return str.replace(/^LAB\s*-\s*/i, '');
		}

		loadRecords();
}];


