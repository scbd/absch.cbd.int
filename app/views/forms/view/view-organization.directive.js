import app from '~/app';
import template from "text!./view-organization.directive.html";
import '~/views/forms/view/directives/view-record-reference.directive';
import '~/views/directives/record-options';

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


