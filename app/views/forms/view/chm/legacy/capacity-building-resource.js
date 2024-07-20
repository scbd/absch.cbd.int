import app from '~/app';
import template from "text!./capacity-building-resource.html";
import '~/components/scbd-angularjs-controls/main';
import capacityBuildingResource from '~/app-text/views/reports/chm/capacity-building-resource.json';

app.directive('viewCapacityBuildingResource','translationService', ["IStorage", "$q",function (storage, $q, translationService) {
	return {
		restrict   : 'E',
		template   : template,
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			allowDrafts : "@"
		},
		link : function ($scope)
		{
			translationService.set('capacityBuildingResource', capacityBuildingResource);

			$scope.authoringOrganizations = [];
			//====================
			//
			//====================
			$scope.$watch("document.organizations", function(newVal)
			{
				var orgs = angular.fromJson(angular.toJson(newVal || []));
				var loadRecords = [];
				angular.forEach(orgs, function(org){
					loadRecords.push($scope.loadRecords(org.identifier));
				});

				$q.all(loadRecords).then(function(data){
					$scope.authoringOrganizations  = data;
				});
			});

			//============================================================
			//
			//============================================================
			$scope.loadRecords = function(identifier) {

				if (identifier) { //lookup single record
					var deferred = $q.defer();

					storage.documents.get(identifier)
						.then(function(r) {
							deferred.resolve(r.data);
						}, function(e) {
							if (e.status == 404) {
								storage.drafts.get(identifier)
									.then(function(r) { deferred.resolve(r.data);},
										function(e) { deferred.reject (e);});
							}
							else {
								deferred.reject (e);
							}
						});
					return deferred.promise;
				}
			};
			//====================
			//
			//====================
			$scope.loadReferences = function(targets) {

				angular.forEach(targets, function(ref){

					storage.documents.get(ref.identifier, { cache : true})
						.success(function(data){
							ref.document = data;
						})
						.error(function(error, code){
							if (code == 404 && $scope.allowDrafts == "true") {

								storage.drafts.get(ref.identifier, { cache : true})
									.success(function(data){
										ref.document = data;
									})
									.error(function(){
										ref.document  = undefined;
										ref.error     = error;
										ref.errorCode = code;
									});
							}

							ref.document  = undefined;
							ref.error     = error;
							ref.errorCode = code;

						});
				});
			};
		}
	};
}]);

