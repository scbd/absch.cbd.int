import app from '~/app';
import template from "text!./view-risk-assessment.directive.html";
import '~/views/directives/record-options';
import '~/views/forms/view/bch/view-lmo-reference.directive';
import '~/views/forms/view/directives/view-record-reference.directive';
import '~/views/forms/directives/view-terms-hierarchy';
import _ from 'lodash';
import viewRiskAssesmentT from '~/app-text/views/forms/view/bch/view-risk-assessment.json';
app.directive("viewNationalRiskAssessment", ["translationService", viewRiskAssessment]);
app.directive("viewIndependentRiskAssessment", ["translationService", viewRiskAssessment]);

function viewRiskAssessment(translationService) {
	return {
		restrict   : "EAC",
		template: template ,
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			hide	: "@"
		},
		link: function ($scope){
			translationService.set('viewRiskAssesmentT', viewRiskAssesmentT);
			$scope.onRiskAssessmentScopeTerms = function(terms){
				if(($scope.document||{}).scopes){
					_.forEach(terms, function(item){
						if(item.broaderTerms.length == 0 || item.broaderTerms == []){
							var parent =_.find($scope.document.scopes, {identifier: item.identifier});
							if(parent){
								terms = _.filter(terms, function(t){
									return !_.includes(item.narrowerTerms, t.identifier)
								})
							}
					}
				});
				return terms;
			}
		}
	}
	};
}


