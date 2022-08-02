import app from '~/app';
import template from "text!./view-capacity-building-resource.directive.html";

app.directive("viewCapacityBuildingResource", [function () {
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
			$scope.loadReferences = function(targets) {

				angular.forEach(targets, function(ref){

					storage.documents.get(ref.identifier, { cache : true})
					.then(function(res){return res.data}).then(function (data){
							ref.document = data;
						})
						.catch(function(error){
							if (error.status == 404) {

								storage.drafts.get(ref.identifier, { cache : true})
								.then(function(res){return res.data}).then(function (data){
										ref.document = data;
									})
									.catch(function(){
										ref.document  = undefined;
										ref.error     = error.data;
										ref.errorCode = error.status;
									});
							}

							ref.document  = undefined;
							ref.error     = error.data;
							ref.errorCode = error.status;

						});
				});


			};
		}]
	};
}]);


