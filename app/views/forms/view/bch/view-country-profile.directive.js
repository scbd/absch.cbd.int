define(['app', "text!./view-country-profile.directive.html", 
	'views/directives/record-options'
], function (app, template) {
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

});
