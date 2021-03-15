import app from 'app';
import template from "text!./view-national-report-2.directive.html";
import _ from 'lodash';
import nr2Data from 'app-data/bch/report-analyzer/cpbNationalReport2.json';
import 'views/forms/view/bch/view-national-report.directive';
import 'views/directives/record-options';

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
				
				if(($scope.document["Q012"]||{}).value == "true"){
						
					nr2Data[0].questions.splice(1, 2);  //Q013, Q014

				}
				$scope.nr2Data = nr2Data;			
			}
		};
	}]);


