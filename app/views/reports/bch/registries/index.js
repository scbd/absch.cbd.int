import app from '~/app';
import _ from 'lodash';
//import 'css!~/css/registry.css';  ROLLUP UPGRADE - THIS FILE DO NOT EXIST ANYMORE
import '~/services/main'; ;
import indexRegistriesT from '~/app-text/views/reports/bch/registries/index.json';

	export { default as template } from './index.html';
export default ['$scope', 'searchService', 'toastr', '$log', 'solr', 'translationService',
	function ($scope, searchService, toastr, $log, solr, translationService) {
				var schemas = ["organism", "modifiedOrganism", "dnaSequence"];
				translationService.set('indexRegistriesT', indexRegistriesT);      
				loadRecords();
				function loadRecords(schema) {
					var recordQuery = { 
                        fields: 'schema_s',
						query: 'schema_s:(' + _.map(schemas, solr.escape).join(' ') + ')'
						
                    };
					return searchService.facets(recordQuery)
						.then(function (result) { 
							$scope.count = result.schema_s;
						})
					.catch(function(e){

       					 throw e;
					})
				}
		}];

	