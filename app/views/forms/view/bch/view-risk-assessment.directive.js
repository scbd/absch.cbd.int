define(['app', "text!views/forms/view/bch/view-risk-assessment.directive.html", 	
'views/directives/record-options', './view-lmo-reference.directive',
'views/forms/view/view-contact-reference.directive'], function (app, template) {

app.directive("viewNationalRiskAssessment", viewRiskAssessment);
app.directive("viewRiskAssessment", viewRiskAssessment);

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
