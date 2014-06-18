define(['app',
	'../views/directives/login.directive.html.js',
	'./register-record-list.directive.js',
	'./tasks/my-completed-tasks.directive.js',
	'./tasks/my-pending-tasks.directive.js',
	'./tasks/my-tasks.directive.js',
	'../js/directives/forms/form-controls.js',
	'./forms/edit/km-form-buttons.js',
	'./forms/edit/editFormUtility.js',
	'./forms/edit/field-embed-contact.directive.js',
	'./forms/edit/edit-contact-base.directive.js',
	'./forms/view/view-contact-reference.directive.js',
	'./forms/view/view-organization-reference.directive.js',
	'./forms/view/record-loader.directive.html.js',
	'./forms/view/view-organization.directive.js',
	'./forms/view/view-organization-reference.directive.js',
	'./directives/task-id-directive.html.js',
	'./directives/user-details.directive.html.js',
	'./directives/ngxLazy.directive.js'], function (app) {

  "use strict";

  app.controller("TypeDocumentListController", 
    ["$rootScope", "$scope", "$q", "$window", "IStorage", "underscore",
     "schemaTypes", "$compile", "$timeout","lstringFilter", "$routeParams",
    function ($rootScope, $scope, $q, $window, storage, _,
      schemaTypes,$compile,$timeout,lstringFilter, $routeParams) {

    $scope.type = $rootScope.document_types[$routeParams.document_type];

    $scope.dashboardFilter = "All";

    $scope.setDashFilter = function(filter){
        $scope.dashboardFilter = filter;
    }
    $scope.isFilter = function(filter){
        return	$scope.dashboardFilter == filter || $scope.dashboardFilter == "All";
    }
  }]);
});
