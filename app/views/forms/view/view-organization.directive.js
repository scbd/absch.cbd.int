import app from '~/app';
import template from "text!./view-organization.directive.html";
import '~/views/forms/view/directives/view-record-reference.directive';
import '~/views/directives/record-options';
import viewOrganizationT from '~/app-text/views/forms/view/view-organization.json';



app.directive("viewOrganization", ['translationService','realm',function (translationService, realm) {
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
			translationService.set('viewOrganizationT',viewOrganizationT)
			$scope.target = $scope.target || '_blank';		
            $scope.isChm        = realm.is('CHM');
		}
	};
}]);
