define(['text!./bbi-contact.html', 'app', 'angular', 'lodash',
	'utilities/km-storage',
	'scbd-angularjs-services/locale',
], function(template, app, angular, _) {
	'use strict';

	app.directive('viewBbiContact', ['$http', "$rootScope", "$filter", "$q", "$location", 'IStorage', '$route', '$timeout', 'locale',
	 function($http, $rootScope, $filter, $q, $location, storage, $route, $timeout, locale) {
		return {
			restrict: 'E',
			template: template,
			replace: true,
			transclude: false,
			scope: {
				document: '=ngModel',
				locale: '=',
				loading: "=?",
				user: "=?",
				header: "=?"
			},
			link: function($scope) {
				if (typeof $scope.header === 'undefined') $scope.header = true;
				//====================
				//
				//====================
				var killWatchConOrg = $scope.$watch("document.contactOrganization", function() {
					if (!$scope.document || ($scope.document && !$scope.document.contactOrganization)) return;

					$scope.contactOrganization = angular.fromJson(angular.toJson($scope.document.contactOrganization));

					if ($scope.contactOrganization)
						$scope.loadReferences($scope.contactOrganization).then(function(data) {
							Object.assign($scope.contactOrganization, data[0]);
							delete(data[0].websites);
							delete(data[0].phones);
							delete(data[0].faxes);
							delete(data[0].emails);
							delete(data[0].header);
							delete(data[0].libraries);
							delete(data[0].name);
							delete(data[0].acronym);
							delete(data[0].profileLink);
							delete(data[0].organizationTypes);
							delete(data[0].relevantDocuments);
							delete(data[0].absThematicAreas);
							delete(data[0].aichiTargets);
							delete(data[0].bchSubjects);
							delete(data[0].operationalLanguages);
							delete(data[0].thematicAreas);
							delete(data[0].coordinates);
							delete(data[0].establishmentGooglePlaceId);
							delete(data[0].zip);
							Object.assign($scope.document, data[0]);
							killWatchConOrg();
						});
				});
				//====================
				//
				//====================
				$scope.isReview = function() {
					return !!($location.url().indexOf('/view') > -1);
				};
				//====================
				//
				//====================
				$scope.isAdmin = function() {
					if ($scope.user)
						return !!_.intersection($scope.user.roles, ["Administrator", "BBiAdministrator"]).length;
				};
				//====================
				//
				//====================
				$scope.getLogo = function() {

					if (!$scope.contactOrganization || !$scope.contactOrganization.relevantDocuments) return false;
					return _.find($scope.contactOrganization.relevantDocuments, {
						name: 'logo'
					});
				};
				//====================
				//
				//====================
				$scope.loadReferences = function(ref, index) {

					if (Number.isInteger(index) && Array.isArray(ref)) ref = ref[index];
					return storage.documents.get(ref.identifier, {
							cache: true
						})
						.then(function(data) {
							ref = [];
							ref[0] = data.data;
							ref[1] = index;
							return ref;
						})
						.catch(function(error, code) {
							if (error.status == 404) {

								return storage.drafts.get(ref.identifier, {
										cache: true
									})
									.then(function(data) {
										ref = [];
										ref[0] = data.data;
										ref[1] = index;
										return ref;
									})
									.catch(function(error) {
										return {
											error: error,
											errorCode: code
										};
									});
							} else {
								return {
									error: error,
									errorCode: code
								};
							}
						});
				};

			}
		};
	}]);
});