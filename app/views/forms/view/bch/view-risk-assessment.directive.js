define(['app', "text!views/forms/view/bch/view-risk-assessment.directive.html", 	'views/directives/record-options'], function (app, template) {
<<<<<<< HEAD
app.directive("viewRiskAssessment", [function () {
=======

app.directive("viewRiskAssignment", [function () {
>>>>>>> add language field to edit form
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
		controller : ["$scope", function ($scope)
		{
			
			
			
			//====================
			//
			//====================
			$scope.display = function(field) {
				
				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}
		}]
	};
}]);

});
