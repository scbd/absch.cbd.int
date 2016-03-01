define(['app', 'underscore'], function (app, _) {

app.directive("viewCapacityBuildingInitiative", [function () {
	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/view/view-capacity-building-initiative.directive.html",
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
		controller : ["$scope", "IStorage", "$http", '$q', function ($scope, storage, $http, $q)
		{

			$scope.documentContacts = {};

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
			$scope.$watch("document.implementingAgencies", function(_new)
    		{
				if(!_new)
					return;
				if($scope.document.implementingAgencies)
		            $q.all(_.map($scope.document.implementingAgencies, loadReferences)).then(function(data){
		                $scope.documentContacts.implementingAgenciesRef = _.pluck(data, 'data');;
		            });
				else
					$scope.documentContacts.implementingAgenciesRef = undefined;
			});
			$scope.$watch("document.executingAgencies", function(_new)
    		{
				if(!_new)
					return;
		        if($scope.document.executingAgencies)
		            $q.all(_.map($scope.document.executingAgencies, loadReferences)).then(function(data){
		                $scope.documentContacts.executingAgenciesRef = _.pluck(data, 'data');
		            });
				else
					$scope.documentContacts.executingAgenciesRef = undefined;
			});
			$scope.$watch("document.collaboratingPartners", function(_new)
    		{
				if(!_new)
					return;
		        if($scope.document.collaboratingPartners)
		            $q.all(_.map($scope.document.collaboratingPartners, loadReferences)).then(function(data){
		                $scope.documentContacts.collaboratingPartnersRef = _.pluck(data, 'data');
		            });
				else
					$scope.documentContacts.collaboratingPartnersRef = undefined;
			});
			$scope.$watch("document.coreFundingSources", function(_new)
    		{
				if(!_new)
					return;
				if($scope.document.coreFundingSources)
		            $q.all(_.map($scope.document.coreFundingSources, loadReferences)).then(function(data){
		                $scope.documentContacts.coreFundingSourcesRef = _.pluck(data, 'data');
		            });
				else
					$scope.documentContacts.coreFundingSourcesRef = undefined;
			});
    		$scope.$watch("document.coFinancingSources", function(_new)
    		{
				if(!_new)
					return;
		        if($scope.document.coFinancingSources)
		            $q.all(_.map($scope.document.coFinancingSources, loadReferences)).then(function(data){
		                $scope.documentContacts.coFinancingSourcesRef = _.pluck(data, 'data');
		            });
				else
					$scope.documentContacts.coFinancingSourcesRef = undefined;
    		});


			//====================
			//
			//====================
			$scope.display = function(field) {

				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			};


			//====================
			//
			//====================
			function loadReferences(organization) {

				if(organization && organization.identifier)
					return storage.documents.get(organization.identifier)
						.catch(function(e) {
							if (e.status == 404) {
								return storage.drafts.get(organization.identifier);
							}
							return {error : error, errorCode : code };
						});

					return storage.documents.get(organization.identifier, { cache : true})
						.error(function(error, code){
							if (code == 404) {
								return storage.drafts.get(organization.identifier, { cache : true})
										.error(function(){
											return {error : error, errorCode : code };
										});
							}
							return {error : error, errorCode : code };

						});
			};
		}]
	};
}]);

});
