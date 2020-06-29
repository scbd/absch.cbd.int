define(['app', "text!views/forms/view/bch/view-national-report.directive.html", 
'views/forms/view/directives/view-record-reference.directive'
], function (app, template) {

app.directive("viewNationalReport", [function () {
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

});
