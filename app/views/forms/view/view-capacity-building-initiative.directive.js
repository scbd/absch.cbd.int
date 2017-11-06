define(['app', "text!views/forms/view/view-capacity-building-initiative.directive.html",
'views/directives/record-options',
], function (app, template) {

app.directive("viewCapacityBuildingInitiative", [function () {
	return {
		restrict   : "EAC",
		template: template ,
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
		controller : ["$scope", "IStorage", "$http", function ($scope, storage, $http)
		{

			if((($scope.document||{}).createdDate_dt) || $scope.$parent.internalDocumentInfo)
			$scope.updatedOn = ($scope.document||{}).createdDate_dt || $scope.$parent.internalDocumentInfo.updatedOn;

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
    		$scope.$watch("document.organizations", function(_new)
    		{
    			$scope.organizations = angular.fromJson(angular.toJson(_new || []));

    			if($scope.organizations)
    				$scope.loadReferences($scope.organizations);
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
			$scope.$watch("document.organizations", function(_new)
			{
				$scope.organizations = angular.fromJson(angular.toJson(_new||[]));

				if($scope.organizations)
					$scope.loadReferences($scope.organizations);
			});


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
							if (code == 404) {

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
		}]
	};
}]);

});
