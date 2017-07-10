define(['app', "text!views/forms/view/view-endorsement.directive.html", './record-loader.directive', 
'js/common'], function (app, template) {

app.directive("viewEndorsement", [function () {
	return {
		restrict   : "EAC",
		template: template ,
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
