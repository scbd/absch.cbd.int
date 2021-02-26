define(['app', "text!views/forms/view/bch/view-national-report-3.directive.html", 
'lodash', 'app-data/bch/report-analyzer/cpbNationalReport3', 'views/forms/view/bch/view-national-report.directive',
 	'views/directives/record-options'], function (app, template, _, nr3Data) {

	app.directive("viewCpbNationalReport3", [function () {
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
				
				if(($scope.document["Q012_party"]||{}).value == "true"){
						
					nr3Data[0].questions.splice(1, 2);  //Q012_partyInProgress, Q013

				}
				$scope.nr3Data = nr3Data;			
			}
		};
	}]);

});
