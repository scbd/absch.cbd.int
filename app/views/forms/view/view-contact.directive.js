require("app").directive("viewContact", [function () {
	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/view/view-contact.directive.html",
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		controller: [function () {
		}]
	};
}]);