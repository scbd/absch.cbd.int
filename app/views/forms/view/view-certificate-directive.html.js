define(['app'], function (app) {

app.directive("viewCertificate", [function () {
	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/view/view-certificate-directive.html",
		replace    : true,
		transclude : false,
		scope: {
			documentID: "=documentId",
			loadDocuments: "=loadDocuments",
			government:  "=government"
		},
		link: function($scope) {
		},
		controller: ['$scope', 'IStorage', "$q","$route", 
			function ($scope, storage, $q,$route) {
			

			$scope.$watch('loadDocuments', function(value){
				if(value && !$scope.documents){
					$scope.load($scope.documentID);
				}
			});


			//==================================
			//
			//==================================
			$scope.load = function (identifier) {

				$scope.error = undefined;

				var qDocument     = storage.documentVersions.get(identifier,{body:true});
				// .then(function(result) { return result.data || result });
				
				$q.when(qDocument).then(function(results) {

					$scope.documents     = results.data.Items;


				}).then(null, function(error) {
					$scope.error = "error loading document history";
					 console.log( $scope.error );
				})
				
			};

			
		}]
	};
}]);
});