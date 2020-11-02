define(['app', 'lodash', 'css!/app/css/registry.css', 'services/search-service', 'js/common','views/register/directives/register-top-menu',
		'./index'], function(app, _) { 'use strict';

		app.controller("registryReportController", ['$scope', 'searchService', 'toastr', '$log',
			function ($scope, searchService, toastr, $log) {
				var schemas = ["organism", "modifiedOrganism", "dnaSequence"];
				loadRecords();
				function loadRecords(schema) {
					var recordQuery = { 
                        fields: 'schema_s',
                        query: 'schema_s:(' + schemas.join(' ') + ')'
                    };
				 
					return searchService.facets(recordQuery)
						.then(function (result) { 
							$scope.count = result.schema_s;
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
				}
			}]);

	});