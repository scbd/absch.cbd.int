define(['app', "text!views/forms/view/bch/view-risk-assessment.directive.html", 	
'views/directives/record-options', './view-lmo-reference.directive',
'views/forms/view/directives/view-default-reference.directive', 'views/forms/directives/view-terms-hierarchy'], function (app, template) {

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

});
