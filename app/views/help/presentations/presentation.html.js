define(['app'], function (app) {

"use strict";
//require("app", "dragAndDrop")

app.controller("presentationController",
	["$rootScope", "$location" , "$scope", "$q", "$window", "IStorage", "underscore",
	 "schemaTypes", "$compile", "$timeout","lstringFilter", "$routeParams",
	 function ($rootScope, $location, $scope, $q, $window, storage, _,
	  schemaTypes,$compile,$timeout,lstringFilter, $routeParams) {


		//$rootScope.params = "";

		//==================================
       	 $scope.addParam = function (p) {


	
				if(!$rootScope.params)
					$rootScope.params = p;
				else
					$rootScope.params = $rootScope.params + " " + p;
       	 }

   }]);
});
