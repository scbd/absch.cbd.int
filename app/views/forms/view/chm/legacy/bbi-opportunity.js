import app from '~/app';
import _ from 'lodash';
import template from "text!./bbi-opportunity.html";
import '~/components/scbd-angularjs-controls/main';
import bbiOpportunity from '~/app-text/views/reports/chm/bbi-opportunity.json';

app.directive('viewBbiOpportunity', ["IStorage", "$location", 'translationService',function(storage, $location,translationService) {
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
			translationService.set('bbiOpportunity', bbiOpportunity);

			if (typeof $scope.header === 'undefined') $scope.header = true;

			var killWatchContact = $scope.$watch("document.contact", function() {
				if ($scope.document)
					$scope.contact = angular.fromJson(angular.toJson($scope.document.contact));

				if ($scope.contact)

					if ($scope.contact)
					$scope.loadReferences($scope.contact).then(function(data) {
						$scope.contact = data[0];

						if (data[0] && data[0].contactOrganization)

							$scope.loadReferences(data[0].contactOrganization).then(function(d) {

							$scope.contactOrg = d[0];
							killWatchContact();
						});
						else killWatchContact();
					});
			});
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
			$scope.isReview = function() {
				return !!($location.url().indexOf('/view') > -1);
			};
			//====================
			//
			//====================
			var killWatchPriCon = $scope.$watch("document.primaryOrganization", function() {
				if (!$scope.document || ($scope.document && !$scope.document.primaryOrganization)) return;

				$scope.primaryOrganization = angular.fromJson(angular.toJson($scope.document.primaryOrganization));
				if ($scope.primaryOrganization)
					$scope.loadReferences($scope.primaryOrganization).then(function(data) {
						$scope.primaryOrganization = data[0];
						if ($scope.primaryOrganization.organization)
							$scope.loadReferences($scope.primaryOrganization.organization).then(function(orgData) {
								Object.assign($scope.primaryOrganization, orgData[0]);
							});
						killWatchPriCon();
					});
			});

			//====================
			//
			//====================
			var killWatchOrgs = $scope.$watch("document.organizations", function() {
				if (!$scope.document || ($scope.document && !$scope.document.organizations)) return;

				$scope.organizations = angular.fromJson(angular.toJson($scope.document.organizations));

				if ($scope.organizations && Array.isArray($scope.organizations))
					for (var i = 0; i < $scope.organizations.length; i++) {
						$scope.loadReferences($scope.organizations, i).then(function(data) { //jshint ignore:line
							Object.assign($scope.organizations[data[1]], data[0]);
							if ($scope.organizations[data[1]].organization)
								$scope.loadReferences($scope.organizations[data[1]].organization).then(function(orgData) {
									Object.assign($scope.organizations[data[1]], orgData[0]);
								});
						});
					}
				killWatchOrgs();
			});
			//====================
			//
			//====================
			$scope.getLogo = function(org) {
				if (!org) org = $scope.primaryOrganization;
				if (!org) return false;

				return _.find(org.relevantDocuments, {
					name: 'logo'
				});
			};

			//====================
			//
			//====================
			$scope.loadReferences = function(ref, index) {
				if (!ref) return;
				if (Number.isInteger(index) && Array.isArray(ref)) ref = ref[index];
				return storage.documents.get(ref.identifier, {
						cache: true
					})
					.then(function(data) {
						ref = [];
						ref[0] = data.data;
						ref[0].header.state = 'public';
						ref[0].logo=$scope.getLogo(data.data);
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
									ref[0].header.state = 'draft';
									ref[0].logo=$scope.getLogo(data.data);
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
