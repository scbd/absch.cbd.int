define(['app', 'lodash', 'text!./risk-assessments.html', 'services/search-service','views/forms/view/bch/view-lmo-reference.directive',
'angucomplete-alt','views/directives/block-region-directive'], function(app, _, template) { 'use strict';

app.directive("lmoRiskAssessments", ['searchService', function(searchService) {
	return{
		template:template,
		restrict:'EA',
		replace:true,
		scope:{
			documentId:'@'
		},
		link($scope){
			var documentId = $scope.documentId;

			function loadLMORiskAssessments(documentId){
				var query = {
					query : 'schema_s:nationalRiskAssessment AND referenceRecord_ss:' + documentId,
					additionalFields : 'lmoTransformationEvents_ss,scopeRelease_b,scopeConfined_b,scopeFood_b,scopeFeed_b,scopeProcessing _b',
					sort: 'government_EN_t asc'
				}
				//  AND scopes_ss:*
				$scope.identifier = documentId
				searchService.list(query).then(function(r) {
					$scope.riskAssessments = r.data.response;
				}).catch(function(error) {
					console.log('ERROR:', error);
				});
			}

			$scope.loadLMos = function(userInputString, timeoutPromise){
				$scope.loadingData=true;
				var query = {
					fieldQuery: ['schema_s:modifiedOrganism'],
					query : userInputString,
					fields: 'identifier_s,title:title_EN_t,summary:summary_EN_t'
				}
				return searchService.list(query).then(function(r) {
					return {data : r.data.response.docs};
				})
				.finally(function(){$scope.loadingData=false;});
			}
			$scope.$watch('newLmo', function(newVal){
				if(newVal)
					loadLMORiskAssessments(newVal.originalObject.identifier_s)
			})

			loadLMORiskAssessments(documentId);
		}
	}

	}]);
	
});

