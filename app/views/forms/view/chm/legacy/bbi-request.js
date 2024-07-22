import app from '~/app';
import _ from 'lodash';
import template from "text!./bbi-request.html";
import '~/components/scbd-angularjs-controls/main';
import bbiRequest from '~/app-text/views/reports/chm/bbi-request.json';

app.directive('viewBbiRequest', ["IStorage", "$location", 'translationService', function(storage, $location,translationService) {
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
			translationService.set('bbiRequest', bbiRequest);

			if (typeof $scope.header === 'undefined') $scope.header = true;
			var killWatchContact = $scope.$watch("document.contact", function() {
				if ($scope.document)
					$scope.contact = angular.fromJson(angular.toJson($scope.document.contact));

				if ($scope.contact)
					$scope.loadReferences($scope.contact).then(function(data) {
						$scope.contact = data[0];
						killWatchContact();
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
			$scope.isOwnerOrAdmin = function() {
				var isAdmin;
				if ($scope.user)
					isAdmin = !!_.intersection($scope.user.roles, ["Administrator", "BBiAdministrator"]).length;
				var isNotReview = !!($location.url().indexOf('/view') > -1);
				var isOwner = ($scope.document && $scope.document.meta && $scope.user && $scope.user.userID === $scope.document.meta.createdBy);

				return ((isOwner || isAdmin) && isNotReview);
			};

			// //====================
			// //
			// //====================
			// var killWatchPriCon = $scope.$watch("document.primaryOrganization", function()
			// {
			//     if($scope.document && !$scope.document.primaryOrganization) return;
			//
			//     $scope.primaryOrganization = angular.fromJson(angular.toJson($scope.document.primaryOrganization));
			//     if($scope.primaryOrganization)
			//         $scope.loadReferences($scope.primaryOrganization).then(function(data){
			//             $scope.primaryOrganization = data[0];
			// 						$scope.loadReferences($scope.primaryOrganization.organization).then(function(orgData){
			// 								Object.assign($scope.primaryOrganization,orgData[0]);
			// 						});
			// 						killWatchPriCon();
			//         });
			// });

			//====================
			//
			//====================
			var killWatchOrg = $scope.$watch("document.organization", function() {
				if (!$scope.document || !$scope.document.organization) return;

				$scope.organization = angular.fromJson(angular.toJson($scope.document.organization));

				if ($scope.organization)
					$scope.loadReferences($scope.organization).then(function(data) { //jshint ignore:line
						Object.assign($scope.organization, data[0]);
						killWatchOrg();
					});


			});
			//====================
			//
			//====================
			$scope.getLogo = function(o) {

				if (!o || !o.relevantDocuments) return false;
				return _.find(o.relevantDocuments, {
					name: 'logo'
				});
			};
			//====================
			//
			//====================
			$scope.loadReferences = function(ref, index) {


				return storage.documents.get(ref.identifier, {
						cache: true
					})
					.then(function(data) {
						ref = data.data;
						ref[0] = data.data;
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
