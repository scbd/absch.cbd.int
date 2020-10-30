define(['app', 'lodash', 'services/search-service', 'js/common',
	'./view-lmo-registry','views/reports/bch/registries/view-registry.directive'], function(app, _) { 'use strict';

	app.controller("lmoRegistryController", ['$scope', '$routeParams',   'searchService', '$element',
		function($scope, $routeParams,  searchService,$element ) { 
			$scope.isArray = angular.isArray;  
		}]);

});
