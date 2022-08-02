import app from '~/app';
import template from "text!./view-national-report.directive.html";
import '~/views/forms/view/directives/view-record-reference.directive';
import viewNationalReportT from '~/app-text/views/forms/view/bch/view-national-report.json';
import numbers from '~/app-text/numbers.json';
 
app.directive("viewNationalReport",  ['translationService', function (translationService) {
	return {
		restrict   : "EA",
		template: template ,
		replace    : true,
		scope: {
			reportQuestions : "=",
			document        : "=",
			locale          : "=",
			target          : "@linkTarget",
        },
        link : function($scope){
			
            //====================
			//
			//====================
			translationService.set('viewNationalReportT', viewNationalReportT);
			translationService.set('numbers', numbers);
			$scope.display = function(field) {
				
				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}

			$scope.spaceSubQuestion = function(number){
				if((number||'')=='')return '';            
			   return number.replace(/([0-9]{1,3})([a-z])/, '$1 $2') + '. '
				
			}
			
			$scope.displayText = function(answer, question){
				if(question.options && answer){
					var option = _.find(question.options, {value : answer});
					return option && option.title||answer;
				}
				return answer;
			}
        }		
	};
}]);


