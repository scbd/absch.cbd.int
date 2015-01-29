define(['app',
	'/app/views/directives/login.directive.html.js',
	'/app/views/register/register-record-list.directive.js',
	'/app/views/tasks/my-completed-tasks.directive.html.js',
	'/app/views/tasks/my-pending-tasks.directive.html.js',
	'/app/views/tasks/my-tasks.directive.html.js',
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
//require("app", "dragAndDrop")

app.controller("ContactsController",
	["$rootScope", "$location" , "$scope", "$q", "$window", "IStorage", "underscore",
	 "schemaTypes", "$compile", "$timeout","lstringFilter", "$routeParams",
	 function ($rootScope, $location, $scope, $q, $window, storage, _,
	  schemaTypes,$compile,$timeout,lstringFilter, $routeParams) {

    //TODO: this is almost identical to type_document_list.html.js... inherit them

    $scope.dashboardFilter = "All";



    $scope.setDashFilter = function(filter){
        $scope.dashboardFilter = filter;
    }
    $scope.isFilter = function(filter){
        return	$scope.dashboardFilter == filter || $scope.dashboardFilter == "All";
    }

    $rootScope.loadRecords('contact');
   }]);
});
