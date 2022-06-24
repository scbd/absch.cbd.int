import app from 'app';
import template from "text!./view-country-profile.directive.html";
import 'views/directives/record-options';
import viewCountryProfileT from '~/app-text/views/forms/view/bch/view-country-profile.json';
app.directive("viewCountryProfile", ['translationService', function (translationService) {
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
			translationService.set('viewCountryProfileT', viewCountryProfileT);
		}
	};
}]);


