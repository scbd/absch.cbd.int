define(['app', 'lodash', 'services/search-service', 'js/common',
	'./view-orga-registry'], function(app, _) { 'use strict';

	app.controller("orgaRegistryController", ['$scope', '$routeParams',   'searchService', '$element',
		function($scope, $routeParams,  searchService,$element ) {
			loadRecords();
			$scope.isArray = angular.isArray;

			function loadRecords( ){
				$scope.isLoading = true;
				var displayFields = 'UniqueIdentification:uniqueIdentifier_s,taxonomicStatus:title_s,commonName:commonNames_EN_txt,Summary:summary_t,numFound,url_ss';
				var displaySchema = 'organism';				
				var searchQuery = {
					fields  : displayFields,
					query   :  'schema_s:'+displaySchema,
					rowsPerPage    :10
				};
				return searchService.list(searchQuery)
					.then(function(result){
						$scope.data =result.data.response.docs;
					})
					.finally(function(){
						$scope.isLoading = false;
					})

			}
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
