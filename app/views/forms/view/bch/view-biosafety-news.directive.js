import app from 'app';
import template from "text!./view-biosafety-news.directive.html";
import 'views/directives/index';
app.directive("viewBiosafetyNews", [function () {
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


