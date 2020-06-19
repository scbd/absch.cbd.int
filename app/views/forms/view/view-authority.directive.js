define(['app', "text!views/forms/view/view-authority.directive.html", 'views/forms/view/directives/view-contact-reference.directive',
'views/directives/record-options','views/directives/party-status', 'services/app-config-service',
'views/forms/view/directives/view-reference-records.directive', 'views/forms/directives/view-terms-hierarchy'], function (app, template) {

	app.directive("viewAuthority", ["IStorage", "realm", function (storage, realm) {
		return {
			restrict   : "EAC",
			template: template ,
			replace    : true,
			transclude : false,
			scope: {
				document: "=ngModel",
				target  : "@linkTarget",
				locale      : "=",
				allowDrafts : "@",
				hide : "@"
			},
			link : function ($scope)
			{
				if(realm.is('ABS'))		$scope.isABS=true;
				else if(realm.is('BCH'))$scope.isBCH=true;

				$scope.contacts = undefined;
				$scope.display = function(field) {

					if(!$scope.hide) return true; //show all fields

					return( $scope.hide.indexOf(field) >= 0 ? false : true);
				}

			}
		};
	}]);
});
