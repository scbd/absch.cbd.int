import app from '~/app';
import template from "text!./view-national-report-5.directive.html";
import _ from 'lodash';
import {cpbNationalReport5} from '~/app-data/bch/report-analyzer/cpbNationalReport5';
import '~/views/forms/view/view-national-report.directive';
import '~/views/directives/record-options';
import '~/views/forms/view/directives/view-record-reference.directive';
import viewNr5T from '~/app-text/views/forms/view/bch/view-national-report.json';
import numbers from '~/app-text/common/numbers.json';

	app.directive("viewCpbNationalReport5", ['translationService', function (translationService) {
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
				translationService.set('viewNr5T', viewNr5T);
				translationService.set('numbers', numbers);
				$scope.nr5Data = cpbNationalReport5;	
				$scope.$watch('document', function(){
					$scope.isParty = $scope.document.Q005.value=='true'?true:false;
				})
			}
		};
	}]);


