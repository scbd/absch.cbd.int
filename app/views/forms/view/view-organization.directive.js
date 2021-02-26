define(['app', "text!./view-organization.directive.html", 'views/forms/view/directives/view-record-reference.directive',
'views/directives/record-options'], function (app, template) {

app.directive("viewOrganization", [function () {
	return {
		restrict   : "EAC",
		template: template, 
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			allowDrafts : "@"
		},
		link : function ($scope)
		{
			$scope.target = $scope.target || '_blank';
		}
	};
}]);

});
