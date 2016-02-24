define(['app', './record-loader.directive.html.js', '/app/js/common.js'], function (app) {

app.directive("viewEndorsement", [function () {
	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/view/view-endorsement.directive.html",
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			hide	: "@"
		},
		controller : ["$scope", 'IStorage', '$q', 'commonjs', function ($scope, storage,$q, commonjs)
		{

			$scope.$watch('document', function(newVal){
                if(newVal && newVal.reference){
                    $scope.referenceDocument = {};
                    $q.when(commonjs.loadReferenceDocument(newVal.reference.identifier))
                    .then(function(document){
                        $scope.referenceDocument = document;
                    })

                }
            });
		}]
	};
}]);

});
