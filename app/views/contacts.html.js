define(['app',
	'../views/directives/login.directive.html.js',
	'./register-record-list.directive.js',
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
