define(['app', "text!views/forms/view/bch/view-national-report-4.directive.html", 
'lodash', 'json!app-data/bch/report-analyzer/cpbNationalReport4.json', 
 	'views/directives/record-options'], function (app, template, _, nr4Data) {

app.directive("viewBchNationalReport4", [function () {
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
		controller : ["$scope", function ($scope)
		{
			
			$scope.nr4Data = nr4Data;
			
			//====================
			//
			//====================
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

		}]
	};
}]);

});
