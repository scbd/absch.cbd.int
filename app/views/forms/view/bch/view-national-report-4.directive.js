define(['app', "text!views/forms/view/bch/view-national-report-4.directive.html", 
'lodash', 'json!app-data/bch/report-analyzer/cpbNationalReport4.json', 'views/forms/view/bch/view-national-report.directive',
 	'views/directives/record-options'], function (app, template, _, nr4Data) {

	app.directive("viewCpbNationalReport4", [function () {
		return {
			restrict   : "EAC",
			template: template ,
			replace    : true,
			transclude : false,
			scope: {
				document: "=ngModel",
				locale  : "=",
				target  : "@linkTarget",
				hide	: "@"
			},
			link : function ($scope){
				
				$scope.nr4Data = nr4Data;			
			}
		};
	}]);

});
