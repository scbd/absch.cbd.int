define(['app', 'lodash', 'services/search-service', 'js/common',
	'./view-report'], function(app, _) { 'use strict';

	app.controller("RegistryReportController", ['$scope', '$routeParams',   'searchService', '$element',
		function($scope, $routeParams,  searchService,$element ) {
			loadRecords();
			$scope.isArray = angular.isArray;

			function loadRecords( ){
				$scope.title = "Living Modified Organism (LMO) Registry";
				$scope.isLoading = true;
				var displayFields = 'UniqueIdentification:uniqueIdentification_s,Identity:identity_s,TransformationEvent:transformationEvent_s,CommonNames:lmoCommonNames_EN_txt,Summary:summary_t';
				var displaySchema = 'modifiedOrganism';
				if($routeParams.registry =='orga'){
					displayFields = 'Taxonomic-Status:title_s,Common-name:commonNames_EN_txt';
					displaySchema = 'organism';
					$scope.title = "Organism Registry";
				} else if($routeParams.registry =='gene'){
					displayFields = 'Name:name_s,Title:title_s,Donor-organism:geneDonorOrganismCommonNames_EN_txt';
					displaySchema = 'dnaSequence';
					$scope.title = "Gene and DNA Sequence Registry";
				}
				// else if($routeParams.registry =='lmo'){
				// 	displayFields = 'Unique-Identification:uniqueIdentification_s,Identity:identity_s,TransformationEvent:transformationEvent_s,CommonNames:lmoCommonNames_EN_txt,Summary:summary_t';
				// 	displaySchema = 'modifiedOrganism';
				// }
				var searchQuery = {
					fields  : displayFields,
					query   :  'schema_s:'+displaySchema,
					rowsPerPage    :20
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
