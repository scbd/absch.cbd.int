define(['app', 'lodash', 'text!views/forms/view/bch/view-biosafety-expert.directive.html', 	'views/directives/record-options','services/thesaurus-service'], function (app, _, template) {
	app.directive("viewBiosafetyExpert", ["thesaurusService", function (thesaurusService) {
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
		controller : ["$scope", function ($scope){
					$scope.$watch( "document.countryRegionsWorkedIn", function ( value ) {
						if(value == undefined) return;
						return thesaurusService.getDomainTerms('countries').then(function(countries) {
							$scope.document.countriesWorkedIn = _.filter(value, function(country){
								return _.find(countries, {identifier:country.identifier});
							});
							$scope.document.regionsWorkedIn = _.filter(value, function(region){
								return !_.find(countries, {identifier:region.identifier});
							});
						});
					});		
			//====================
			//
			//====================
			$scope.display = function(field) {
				
				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}
		}]
	};
}]);

});
