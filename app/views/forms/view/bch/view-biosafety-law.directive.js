define(['app', "text!./view-biosafety-law.directive.html", 	'views/directives/record-options'], function (app, template) {

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
				console.log(data)
				if(data && (data.amendedRecords||{}).docs){
					if(data.amendedRecords.docs.length)
						$scope.amendedByRecords = _.map(data.amendedRecords.docs, 'identifier')
				}
			}
		}]
	};
}]);

});
