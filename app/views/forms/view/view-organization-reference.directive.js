define(['app'], function (app) {

app.directive("viewOrganizationReference", [function () {
	return {
		restrict: "EAC",
		templateUrl: "/app/views/forms/view/view-organization-reference.directive.html",
		replace: true,
		transclude: false,
		scope: {
			document: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		controller: [function () {
		}]
	};
}]);
});