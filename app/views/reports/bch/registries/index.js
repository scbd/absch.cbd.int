define(['app', 'lodash', 'services/search-service', 'js/common',
	'./index'], function(app, _) { 'use strict';

	app.controller("RegistryReportController", ['$scope',    'searchService',  
		function($scope,searchService) { 
			var schemas = ["organism","modifiedOrganism","dnaSequence"];
			schemas.forEach(function(schema){ 
				loadRecords(schema);
			}) 
			function loadRecords(schema){ 
				var searchQuery = {
					fields:  'numFound',
					query:  'schema_s:'+schema,
					rowsPerPage:1
				};
				return searchService.list(searchQuery)
					.then(function(result){  
					  $scope[schema+"Records"] = result.data.response.numFound;    
					}) 

			}
		}]);

});
