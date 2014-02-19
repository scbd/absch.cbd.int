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
		controller : ["$scope", "authHttp", "$filter", "underscore", function ($scope, $http, $filter, _)
		{
			$scope._urls = [];

			$scope.options  = {
				countries         : $http.get("/api/v2013/thesaurus/domains/countries/terms",            { cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }),
				organizationTypes : $http.get("/api/v2013/thesaurus/domains/Organization%20Types/terms", { cache: true }).then(function(o){ return o.data; })
			};

			$scope.$watch("document.websites", function(){

				var doc_websites = ($scope.document ? $scope.document.websites : []);
				var doc_urls = _.compact(_.pluck(doc_websites||[], "url"));
				var    _urls = _.compact($scope._urls||[]);

				if(!_.isEqual(doc_urls, _urls)) {
					$scope._urls = doc_urls;
				}
			});

			$scope.$watch("_urls", function(){

				var doc_websites = ($scope.document ? $scope.document.websites : []);
				var doc_urls = _.compact(_.pick(doc_websites||[], "url"));
				var    _urls = _.compact($scope._urls||[]);

				if(!_.isEqual(doc_urls,  _urls) && $scope.document) {
					$scope.document.websites = _.map(_urls, function(url){
						return { url : url };
					});
				}
			});

		}]
	};
}]);
