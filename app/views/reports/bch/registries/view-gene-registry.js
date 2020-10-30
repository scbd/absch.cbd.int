define(['app', 'lodash', 'services/search-service', 'js/common',
	'./view-gene-registry','views/reports/bch/registries/view-registry.directive'], function(app, _) { 'use strict';

	app.controller("geneRegistryController", ['$scope', '$routeParams',   'searchService', '$element',
		function($scope, $routeParams,  searchService,$element ) { 
			$scope.isArray = angular.isArray;
 
		}]);

});
