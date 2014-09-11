define(['app'], function (app) {

app.directive("editContactBase", [ function () {

	return {
		restrict   : "EA",
		templateUrl: "/app/views/forms/edit/edit-contact-base.directive.html",
		replace    : true,
		transclude : false,
		scope      : {
			document  : "=ngModel",
			locales : "=locales",
			form : "=form"
		},
		controller : ["$scope", "authHttp", "$filter", "underscore", "$q", function ($scope, $http, $filter, _, $q)
		{
			$scope._urls = [];

			$scope.options  = {
				countries         : function() { return $http.get("/api/v2013/thesaurus/domains/countries/terms",            { cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
				organizationTypes : function() {
					return $q.all([$http.get("/api/v2013/thesaurus/domains/Organization%20Types/terms", { cache: true })
							,$http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",   { cache: true })])
					.then(function(o){
						var orgs = o[0].data;
						orgs.push(o[1].data);
						return orgs;
					});
				}
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

			$scope.$watch('document.organizationType', function(newValue){
				if(newValue && newValue.identifier!='5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'){
					if(document.organizationType.customValue)
						document.organizationType.customValue = undefined;
				}
			});

		}]
	};
}]);

});
