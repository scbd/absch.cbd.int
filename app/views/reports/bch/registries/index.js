define(['app', 'lodash', 'css!/app/css/registry.css', 'services/search-service', 'js/common', 'services/solr',
		'views/reports/bch/registries/index'], function(app, _) { ;

	return ['$scope', 'searchService', 'toastr', '$log', 'solr',
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

	});