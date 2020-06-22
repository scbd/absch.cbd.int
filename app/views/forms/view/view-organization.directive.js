define(['app', "text!views/forms/view/view-organization.directive.html", './directives/view-default-reference.directive',
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
