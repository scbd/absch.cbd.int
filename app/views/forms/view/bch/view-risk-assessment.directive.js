import app from 'app';
import template from "text!./view-risk-assessment.directive.html";
import 'views/directives/record-options';
import 'views/forms/view/bch/view-lmo-reference.directive';
import 'views/forms/view/directives/view-record-reference.directive';
import 'views/forms/directives/view-terms-hierarchy';
import _ from 'lodash';

app.directive("viewNationalRiskAssessment", viewRiskAssessment);
app.directive("viewIndependentRiskAssessment", viewRiskAssessment);

function viewRiskAssessment() {
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
		link:function($scope){
			$scope.onRiskAssessmentScopeTerms = function(terms){
				
				if(($scope.document||{}).scopes){
					var termId = 'D6B59E8A-D82C-4516-917A-A745ACDA5931' // LMOs for Introduction into the environment

					var term = _.find(terms, {identifier:termId})
					if(term){
						
						var scopes = $scope.document.scopes;
						if(_(scopes).map('identifier').intersection(term.narrowerTerms).value().length ==  term.narrowerTerms.length){
							return _.filter(terms, function(t){
								return !_.includes(term.narrowerTerms, t.identifier)
							})
						}

					}
				}
				return terms;
			}
		}
	};
}


