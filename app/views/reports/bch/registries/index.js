import app from 'app';
import _ from 'lodash';
import 'css!/app/css/registry.css';
import 'services/main'; ;

	export { default as template } from './index.html';
export default ['$scope', 'searchService', 'toastr', '$log', 'solr',
			function ($scope, searchService, toastr, $log, solr) {
				var schemas = ["organism", "modifiedOrganism", "dnaSequence"];
				
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

	