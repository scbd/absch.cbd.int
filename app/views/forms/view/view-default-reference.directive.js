define(['app','underscore', 'scbd-angularjs-services'], function (app, _) {

app.directive("viewDefaultReference", [function () {
	return {
		restrict: "EAC",
		templateUrl: "/app/views/forms/view/view-default-reference.directive.html",
		replace: true,
		transclude: false,
		scope: {
			model: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		controller: ["$scope", "IStorage", "$filter", function ($scope, storage, $filter) {

			
            // $scope.document = $scope.model;
           
            // //==================================
		    // //
		    // //==================================
		    // $scope.$watch('model', function(newValue, oldValue){
		    //     if(newValue != oldValue){
            //          $scope.document = newValue;
		    //     }
		    // }); 

            
		 }] //controller
	};
}]);
});
