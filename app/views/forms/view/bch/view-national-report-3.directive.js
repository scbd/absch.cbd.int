import app from '~/app';
import template from "text!./view-national-report-3.directive.html";
import _ from 'lodash';
import {cpbNationalReport3} from '~/app-data/bch/report-analyzer/cpbNationalReport3';
import '~/views/forms/view/bch/view-national-report.directive';
import '~/views/directives/record-options';

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
						
					cpbNationalReport3[0].questions.splice(1, 2);  //Q012_partyInProgress, Q013

				}
				$scope.nr3Data = cpbNationalReport3;			
			}
		};
	}]);


