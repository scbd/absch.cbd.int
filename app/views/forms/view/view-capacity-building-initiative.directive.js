define(['app', "text!views/forms/view/view-capacity-building-initiative.directive.html",
'views/directives/record-options', './directives/view-record-reference.directive'
], function (app, template) {

app.directive("viewCapacityBuildingInitiative", [function () {
	return {
		restrict   : "EAC",
		template: template ,
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			hide : "@",
			heading	:	"@",
			shortHeading : "@"
		},
		controller : ["$scope", "IStorage", "$http", function ($scope, storage, $http)
		{

			
			

            $scope.options  = {

    			regions       : function() { return $q.all([$http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }),
									    $http.get("/api/v2013/thesaurus/domains/regions/terms",   { cache: true })]).then(function(o) {
									    	return Enumerable.From($filter('orderBy')(o[0].data, 'name')).Union(
												   Enumerable.From($filter('orderBy')(o[1].data, 'name'))).ToArray();
									   }); }
    		};

			//====================
			//
			//====================
			$scope.display = function(field) {

				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			};

		}]
	};
}]);

});
