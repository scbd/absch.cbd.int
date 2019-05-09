define(['app', "text!views/forms/view/bch/view-national-report-2.directive.html", 
'lodash', 'json!app-data/bch/report-analyzer/cpbNationalReport2.json', 'views/forms/view/bch/view-national-report.directive',
 	'views/directives/record-options'], function (app, template, _, nr4Data) {

	app.directive("viewCpbNationalReport2", [function () {
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
				
				$scope.nr3Data = nr4Data;			
			}
		};
	}]);

});
