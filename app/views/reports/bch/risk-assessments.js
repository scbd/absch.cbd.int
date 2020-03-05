define(['app', 'lodash', 'text!./risk-assessments.html', 'services/search-service','views/forms/view/bch/view-lmo-reference.directive',
'angucomplete-alt','views/directives/block-region-directive'], function(app, _, template) { 'use strict';

app.directive("lmoRiskAssessments", ['searchService', function(searchService) {
	return{
		template:template,
		restrict:'EA',
		replace:true,
		scope:{
			identifier:'@'
		},
		link($scope){

			function loadLMORiskAssessments(identifier){			
				var query = {
					query : 'schema_s:nationalRiskAssessment AND referenceRecord_ss:' + identifier,
					additionalFields : 'lmoTransformationEvents_ss,scopeRelease_b,scopeConfined_b,scopeFood_b,scopeFeed_b,scopeProcessing _b',
					sort: 'government_EN_t asc'
				}
				//  AND scopes_ss:*
				$scope.identifier = identifier
				searchService.list(query).then(function(r) {
					$scope.riskAssessments = r.data.response;
				}).catch(function(error) {
					console.log('ERROR:', error);
				});
			}
						
			loadLMORiskAssessments($scope.identifier);
		}
	}

	}]);
	
});

