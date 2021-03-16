import app from 'app';
import template from "text!./view-risk-assessment.directive.html";
import 'views/directives/record-options';
import 'views/forms/view/bch/view-lmo-reference.directive';
import 'views/forms/view/directives/view-record-reference.directive';
import 'views/forms/directives/view-terms-hierarchy';

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
		}
	};
}


