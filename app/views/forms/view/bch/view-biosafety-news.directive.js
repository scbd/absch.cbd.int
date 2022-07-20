import app from '~/app';
import template from "text!./view-biosafety-news.directive.html";
import '~/views/directives/record-options';
import viewBiosafetyNewsT from '~/app-text/views/forms/view/bch/view-biosafety-news.json';
app.directive("viewBiosafetyNews", ['translationService', function (translationService) {
	return {
		restrict   : "EA",
		template: template ,
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
		},
		link: function (){
			translationService.set('viewBiosafetyNewsT', viewBiosafetyNewsT);
		}
	};
}]);


