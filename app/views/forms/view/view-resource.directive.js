define(['app','/app/views/directives/discussion-directive.html.js'], function (app) {

app.directive("viewResource", [function () {
	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/view/view-resource.directive.html",
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			hide : "@"
		},
		controller : ["$scope", "IStorage", "$http", function ($scope, storage, $http)
		{
			// $scope.load();

			// //====================
			// //
			// //====================
			// $scope.load = function() {

			//         if(!$scope.document)


			//       item.data = {'schema':item.schema, 'url_ss': item.url_ss, 'data': item};
			//         $http.get("/api/v2013/documents/"+item.identifier_s).then(function (result) {
			//             item.data = result.data;

			//             $http.get("/api/v2013/documents/"+item.identifier_s + "?info").then(function (result) {
			//                 item.data.info = result.data;
			//             });

			//         });

			//     }



			//====================
			//
			//====================
			$scope.display = function(field) {

				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}

			//====================
			//
			//====================
			$scope.$watch("document.organizations", function(_new)
			{
				$scope.organizations = angular.fromJson(angular.toJson(_new||[]));

				if($scope.organizations)
					$scope.loadReferences($scope.organizations);
			});

			$scope.tryme = function(){
				console.log('tryme');
			}

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
