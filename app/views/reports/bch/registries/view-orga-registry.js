define(['app', 'lodash', 'services/search-service', 'js/common',
	'./view-orga-registry','views/reports/bch/registries/view-registry.directive'], function(app, _) { 'use strict';

	app.controller("orgaRegistryController", ['$scope', '$routeParams',   'searchService', '$element',
		function($scope, $routeParams,  searchService,$element ) { 
			$scope.isArray = angular.isArray;
 
		}]);

});
