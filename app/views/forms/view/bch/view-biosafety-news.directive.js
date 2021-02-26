define(['app', "text!./view-biosafety-news.directive.html", 
	'views/directives/record-options'
], function (app, template) {
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

});
