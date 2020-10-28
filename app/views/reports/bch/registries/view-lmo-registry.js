define(['app', 'lodash', 'services/search-service', 'js/common',
	'./view-lmo-registry','views/reports/bch/registries/view-registry.directive'], function(app, _) { 'use strict';

	app.controller("lmoRegistryController", ['$scope', '$routeParams',   'searchService', '$element',
		function($scope, $routeParams,  searchService,$element ) { 
			$scope.isArray = angular.isArray;
	
			$scope.export = function(){
				$scope.dataToExport = $scope.data;
				$scope.readyForExport = true;
				require(['tableexport'], function(){
					$element.find('#forExport').tableExport({
						formats: ["xlsx", "xls", "csv"],
						filename: "ABSCH-registeries-List",
					});
					$element.find('.xlsx').click();
					$timeout(function(){
						$scope.readyForExport = false;
					}, 200)
				});
			}
 
		}]);

});
