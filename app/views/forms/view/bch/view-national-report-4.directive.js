import app from 'app';
import template from "text!./view-national-report-4.directive.html";
import _ from 'lodash';
import nr4Data from 'app-data/bch/report-analyzer/cpbNationalReport4.json';
import 'views/forms/view/bch/view-national-report.directive';
import 'views/directives/record-options';

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


