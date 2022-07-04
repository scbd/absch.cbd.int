import app from 'app';
import _ from 'lodash';
import template from 'text!./risk-assessments.html';
import 'services/main';
import 'views/forms/view/bch/view-lmo-reference.directive';
import 'angucomplete-alt';
import 'views/directives/block-region-directive';
import '~/views/forms/view/bch/icons';
import riskAssessmentsT from '~/app-text/views/reports/bch/risk-assessments.json';

app.directive("lmoRiskAssessments", ['searchService', 'solr', 'translationService', function (searchService, solr, translationService) {
	return{
		template:template,
		restrict:'EA',
		replace:true,
		scope:{
			identifier:'@'
		},
		link($scope){
			translationService.set('riskAssessmentsT', riskAssessmentsT);
			function loadLMORiskAssessments(identifier){			
				var query = {
					query : 'schema_s:nationalRiskAssessment AND referenceRecord_ss:' + solr.escape(identifier),
					additionalFields : 'lmoTransformationEvents_ss,scopeRelease_b,scopeConfined_b,scopeFood_b,scopeFeed_b,scopeProcessing _b,scopeOther_b,scopePharmaceutical_b,scopeTransit_b,',
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
	


