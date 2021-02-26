define(['app', "text!./view-supplementary-authority.directive.html",
"views/forms/view/view-authority.directive"], function (app, template) {

	app.directive("viewSupplementaryAuthority", [function () {
		return {
			restrict   : "EAC",
			template: template ,
			replace    : true,
			transclude : false,
			scope: {
				document: "=ngModel",
				target  : "@linkTarget",
				locale      : "=",
				allowDrafts : "@",
				hide : "@"
			},
			link : function ($scope){ }
		};
	}]);
});