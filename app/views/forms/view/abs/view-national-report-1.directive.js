import app from '~/app';
import template from "text!./view-national-report-1.directive.html";
import _ from 'lodash';
import { absNationalReport1 } from '~/app-data/abs/report-analyzer/absNationalReport1';
import '~/views/forms/view/view-national-report.directive';
import '~/views/directives/record-options';
import '~/views/forms/view/directives/view-record-reference.directive';
import viewNr1T from '~/app-text/views/forms/view/abs/view-national-report.json';
import numbers from '~/app-text/numbers.json';

	app.directive("viewNationalReport1", ['translationService', function (translationService) {
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
				translationService.set('viewNr1T', viewNr1T);
				translationService.set('numbers', numbers);
				$scope.nr1Data = absNationalReport1;			
			}
		};
	}]);


