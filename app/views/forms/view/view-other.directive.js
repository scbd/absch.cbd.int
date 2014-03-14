require("app").directive("viewOther", [function () {
	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/view/view-other.directive.html",
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget"
		},
		controller : [function ()
		{
		}]
	};
}]);
