define(['app'], function (app) {

app.directive("viewHistory", [function () {
	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/view/view-history-directive.html",
		replace    : true,
		transclude : false,
		scope: {
			documentID: "=documentId",
			loadDocuments: "=loadDocuments",
			government:  "=government"
		},
		link: function($scope, $element) {
			// $element.find("[data-toggle='tooltip']").tooltip({trigger:'hover'});
		},
		controller: ['$scope', 'IStorage', "$q","$route","$filter","$timeout",
			function ($scope, storage, $q,$route, $filter,$timeout) {

			$scope.$watch('documentID', function(value){
				if(value && !$scope.documents){
					$scope.load(value);
				}
				else
					$scope.loading=false;
			});

			// $scope.$watch('loadDocuments', function(value){
			// 	if(value && !$scope.documents){
			// 		$scope.load($scope.documentID);
			// 	}
			// 	else
			// 		$scope.loading=false;
			// });


			//==================================
			//
			//==================================
			$scope.load = function (identifier) {

				$scope.error = undefined;

				if($scope.loading)
					return

				if(!identifier)
				{
					$scope.loading=false;
					return;
				}

				$scope.loading=true;
				var qDocument     = storage.documentVersions.get(identifier,{body:true});
				// .then(function(result) { return result.data || result });

				$q.when(qDocument).then(function(results) {

						$scope.documents     = results.data.Items;
						if($scope.documents && $scope.documents.length >0 && ($scope.documents[0].type=="absPermit" || $scope.documents[0].type=="absCheckpointCommunique"))
						 	$scope.showFile = true;

						if(results.data.Items && results.data.Items.length >0 && $scope.documents[0].type=="absPermit"){
							loadPermitCPC(identifier, results.data.Items);
							$scope.isPermit = true;
						}
						$scope.loading=false;
						$timeout(function(){
							console.log($("[data-toggle='tooltip']"));
							$("[data-toggle='tooltip']").tooltip({trigger:'hover'});
						},200);

				}).then(null, function(error) {
					$scope.error = "error loading document history";
					 console.log( $scope.error );
				});

			};


	      function loadPermitCPC(identifier, documents) {

			if(!documents)
				return;

	        if(!identifier)
	        {
	          $scope.loading=false;
	          return;
	        }
	        var filter = ["type eq 'absCheckpointCommunique'"];
	        var query = [[{permit : identifier}]];

	        var qDocument     = storage.documentQuery.body(filter,query,{body:true});
	         $q.when(qDocument).then(function(results) {
			    $q.when(results.data.forEach(function(cpc){
					 var qDoc = storage.documentVersions.get(cpc.identifier,{body:true});
					  $q.when(qDoc).then(function(results) {
						  results.data.Items.forEach(function(history){
								$scope.documents.push(history);
							});
					});
				}));
			});
		  };

		$scope.$watch("documents", function(){
			$scope.column = 'createdOn';
		})


		}]
	};
}]);
});
