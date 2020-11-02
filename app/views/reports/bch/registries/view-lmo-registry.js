define(['app','css!/app/css/registry.css', 'services/search-service'], function(app) { 'use strict';

	app.controller("lmoRegistryController", ['$scope','searchService','$element', '$timeout', 'toastr', '$log',
		function($scope, searchService, $element, $timeout, toastr, $log) { 
				$scope.isLoading = false;
				loadRecords();
				function loadRecords(){ 
					$scope.isLoading = true;
				var searchQuery = {
					fields:  'recordId:uniqueIdentifier_s,identity:identity_s,transformationEvent:transformationEvent_s,organism:lmoCommonNames_EN_txt,description:summary_t,url_ss',
					query:  'schema_s:modifiedOrganism',
					rowsPerPage: 10000
					
				};
					return searchService.list(searchQuery)
					.then(function(result){ 
						$scope.lmoRecords = [];
						$scope.numFound = 0;
						if(result.data){
							$scope.lmoRecords = result.data.response.docs;
							$scope.numFound = result.data.response.numFound;
						}
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
					.finally(function(){
                        $scope.isLoading = false;
                    })					  
			}
			$scope.export = function () {
				$scope.dataToExport = $scope.data;
				$scope.readyForExport = true;
				require(['tableexport'], function () {
					$element.find('#forExport').tableExport({
						formats: ['xlsx'],
						filename: 'LMO-registry',
					});
					$element.find('.xlsx').click();
					$timeout(function () {
						$scope.readyForExport = false;
					}, 200)
				});
			}
		}]);

});
