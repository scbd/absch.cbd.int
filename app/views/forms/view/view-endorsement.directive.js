define(['app', './record-loader.directive.html.js'], function (app) {

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
		controller : ["$scope", 'IStorage', '$q', function ($scope, storage,$q)
		{

			$scope.$watch('document', function(newVal){
                if(newVal){
                    $scope.referenceDocument = {};
                    var documentInfo = storage.documents.get(newVal.reference.identifier, {info:true});
                    var document = storage.documents.get(newVal.reference.identifier);
                    $q.all([document,documentInfo])
                    .then(function(results){

                        var document = results[0].data;
                        document.info = results[1].data;

                        $scope.referenceDocument = document;
                    });
                }
            });
		}]
	};
}]);

});
