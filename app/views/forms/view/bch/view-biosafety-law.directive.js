import app from 'app';
import template from "text!./view-biosafety-law.directive.html";
import 'views/directives/record-options';

app.directive("viewBiosafetyLaw", [function () {
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
			
			
			
			//====================
			//
			//====================
			$scope.display = function(field) {
				
				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}

			$scope.onReferencedRecordsDataFetch = function(data){
				if(data && (data.biosafetyLaw||{}).fields){
					var fields = data.biosafetyLaw.fields
					if(fields.amendedRecords && fields.amendedRecords.docs.length)
						$scope.amendedByRecords = _.map(fields.amendedRecords.docs, 'identifier')
				}
			}
		}]
	};
}]);


