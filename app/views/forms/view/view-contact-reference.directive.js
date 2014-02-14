require("app").directive("viewContactReference", [function () {
	return {
		restrict: "EAC",
		templateUrl: "/app/views/forms/view/view-contact-reference.directive.html",
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
