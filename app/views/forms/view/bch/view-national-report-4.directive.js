define(['app', "text!./view-national-report-4.directive.html", 
'lodash', 'app-data/bch/report-analyzer/cpbNationalReport4', 'views/forms/view/bch/view-national-report.directive',
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
				
				if(($scope.document && $scope.document["Q012_party"]||{}).value == "true"){
						
					nr4Data[0].questions.splice(1, 2);  //Q012_partyInProgress, Q013

				}
				$scope.nr4Data = nr4Data;			
			}
		};
	}]);

});
