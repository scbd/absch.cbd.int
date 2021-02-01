define(['app','lodash', "text!views/forms/view/view-authority.directive.html",
'views/directives/record-options','views/directives/party-status', 'services/app-config-service',
'views/forms/view/directives/view-reference-records.directive', 'views/forms/directives/view-terms-hierarchy'], function (app, _, template) {

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

				$scope.onReferencedRecordsDataFetch = function(data){
					if(data && (data.authorities||{}).docs){
						if(data.authorities.docs.length)
							$scope.policyBasisForCompetencyRef = _.map(data.authorities.docs, 'identifier')
					}
				}
				$scope.contacts = undefined;
				$scope.display = function(field) {

					if(!$scope.hide) return true; //show all fields

					return( $scope.hide.indexOf(field) >= 0 ? false : true);
				}

			}
		};
	}]);
});
