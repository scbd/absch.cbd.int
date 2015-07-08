define(['app'], function (app) {

app.directive("viewAbsNationalReport", [function () {
	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/view/view-abs-national-report.directive.html",
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

			//====================
			//
			//====================
			$scope.display = function(field) {

				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}


			//==================================
		    //
		    //==================================
		    $scope.booleanToText = function(item) {
		        if (item===undefined)
		        	return "No selection made";
		        
				return item ? "Yes" :  "No";
			}

			//==================================
		    //
		    //==================================
		    $scope.conditionalBooleanToText = function(condition, item) {
		    	if(condition)
		    		return "Not applicable";
		    	if(!condition)
		    	{
		    		if (item===undefined)
		        		return "No selection made";
		        
					return item ? "Yes" :  "No";
				}
		    }


			//==================================
		    //
		    //==================================
		    $scope.text = function(input) {
		        if (input===undefined)
		        	return "No information provided";
		        
				return input;
			}

		}]
	};
}]);

});


