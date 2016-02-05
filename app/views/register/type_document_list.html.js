define(['app',
	'/app/views/register/register-record-list.directive.js',
	//'../js/directives/forms/form-controls.js',
	//'./tasks/my-completed-tasks.directive.js',
	//'./tasks/my-pending-tasks.directive.js',
	//'./tasks/my-tasks.directive.js',
	'/app/views/forms/edit/km-form-buttons.js',
	'/app/views/forms/edit/editFormUtility.js',
	'/app/views/forms/edit/field-embed-contact.directive.js',
	'/app/views/forms/edit/edit-contact-base.directive.js',
	'/app/views/forms/view/view-contact-reference.directive.js',
	'/app/views/forms/view/view-organization-reference.directive.js',
	'/app/views/forms/view/record-loader.directive.html.js',
	'/app/views/forms/view/view-organization.directive.js',
	'/app/views/forms/view/view-organization-reference.directive.js',
	'/app/views/directives/task-id-directive.html.js',
	'/app/views/directives/user-details.directive.html.js',
	'/app/views/directives/ngxLazy.directive.js'], function (app) {

  "use strict";

  app.controller("TypeDocumentListController",
    ["$rootScope", "$scope", "$q", "$window", "IStorage", "underscore",
     "schemaTypes", "$compile", "$timeout","lstringFilter", "$routeParams","$filter",'$location',
    function ($rootScope, $scope, $q, $window, storage, _,
      schemaTypes,$compile,$timeout,lstringFilter, $routeParams, $filter, $location) {

    $scope.type = $rootScope.document_types[$filter("mapSchema")($routeParams.document_type)];

	$scope.path = $location.path();


    $scope.dashboardFilter = "All";

    $scope.setDashFilter = function(filter){
        $scope.dashboardFilter = filter;
    }
    $scope.isFilter = function(filter){
        return	$scope.dashboardFilter == filter || $scope.dashboardFilter == "All";
    }


  }]);
});
