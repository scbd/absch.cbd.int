import app from '~/app';
import template from "text!./view-national-report-5.directive.html";
import _ from 'lodash';
import {cpbNationalReport5} from '~/app-data/bch/report-analyzer/cpbNationalReport5';
import '~/views/forms/view/bch/view-national-report.directive';
import '~/views/directives/record-options';

	app.directive("viewCpbNationalReport5", [function () {
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
				$scope.nr5Data = cpbNationalReport5;			
			}
		};
	}]);


