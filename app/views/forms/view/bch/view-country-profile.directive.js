import app from 'app';
import template from "text!./view-country-profile.directive.html";
import 'views/directives/record-options';
app.directive("viewCountryProfile", [function () {
	return {
		restrict   : "EA",
		template: template ,
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
		}
	};
}]);


