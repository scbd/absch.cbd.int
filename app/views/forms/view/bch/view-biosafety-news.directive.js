define(['app', "text!views/forms/view/bch/view-biosafety-news.directive.html", 
	'views/directives/record-options',
		'components/scbd-angularjs-controls/form-control-directives/km-value-bool'
], function (app, template) {
app.directive("viewBiosafetyNews", [function () {
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
			$scope.display = function(field) {
				
				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}
		}]
	};
}]);

});
