import app from '~/app';
import template from "text!./view-supplementary-authority.directive.html";
import "~/views/forms/view/view-authority.directive";

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
