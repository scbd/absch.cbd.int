require("app").directive("editContactBase", [ function () {

	return {
		restrict   : "EA",
		templateUrl: "/app/views/forms/edit/edit-contact-base.directive.html",
		replace    : true,
		transclude : false,
		scope      : {
			document  : "=ngModel",
			locales : "=locales"
		},
		controller : ["$scope", "authHttp", "$filter", function ($scope, $http, $filter)
		{
			$scope.options  = {
				countries         : $http.get("/api/v2013/thesaurus/domains/countries/terms",            { cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }),
				organizationTypes : $http.get("/api/v2013/thesaurus/domains/Organization%20Types/terms", { cache: true }).then(function(o){ return o.data; })
			};
		}]
	};
}]);
