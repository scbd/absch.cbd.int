import app from 'app';
import _ from 'lodash';
import 'css!/app/css/registry.css';
import 'services/main'; ;
import viewGeneRegistryT from '~/app-text/views/reports/bch/registries/view-gene-registry.json';

export { default as template } from './view-gene-registry.html';
export default ['$scope', 'searchService', '$element', '$rootScope', 'translationService',
function($scope,searchService,$element, $rootScope, translationService) {  
		$scope.isLoading = false;
		$scope.isError = false;
		$scope.deviceSize = $rootScope.deviceSize;
		translationService.set('viewGeneRegistryT', viewGeneRegistryT);
		function loadRecords(){ 

			$scope.isLoading = true;
			var searchQuery = {
				fields:  'recordId:uniqueIdentifier_s,name:name_EN_s,trait:summary_t,organismCommonNames:geneDonorOrganismsCommonNames_EN_txt,organismScientificNames:geneDonorOrganismsScientificNames_ss,geneFunction:biologicalFunction_EN_t,url_ss',
				query:  'schema_s:dnaSequence',
				sort:	'name_EN_s asc, geneDonorOrganismsScientificNames_ss asc',
				rowsPerPage: 10000
				
			};
			return searchService.list(searchQuery)
			.then(function(result){ 
				$scope.geneRecords = [];
				$scope.numFound = 0;
				if(result.data){
					$scope.geneRecords = _.sortBy(result.data.response.docs, function(doc){
												if(!doc.organismScientificNames)
													return [ _.trim(doc.name.toLowerCase())];
												return [ _.trim(doc.name.toLowerCase()), _.trim(doc.organismScientificNames[0]) ];
											});
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


