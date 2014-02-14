require("app").directive("viewDatabase", [function () {
	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/view/view-database.directive.html",
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
