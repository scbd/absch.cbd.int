define(['app',
'text!views/forms/view/view-statement.directive.html',
'views/directives/record-options'], function (app, template) {

app.directive('viewStatement', [function() {
	return {
		restrict: 'EAC',
		template: template, 
		replace: true,
		transclude: false,
		scope: {
			document: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		controller: ['$scope', function ($scope) {

			if((($scope.document||{}).createdDate_dt) || $scope.$parent.internalDocumentInfo)
			$scope.updatedOn = ($scope.document||{}).createdDate_dt || $scope.$parent.internalDocumentInfo.updatedOn;
			
		}]
	}
}]);
});
