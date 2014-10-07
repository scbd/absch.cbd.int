define(['app'], function (app) {

"use strict";
//require("app", "dragAndDrop")

app.controller("presentationController",
	["$rootScope", "$location" , "$scope", "$q", "$window", "IStorage", "underscore",
	 "schemaTypes", "$compile", "$timeout","lstringFilter", "$routeParams",
	 function ($rootScope, $location, $scope, $q, $window, storage, _,
	  schemaTypes,$compile,$timeout,lstringFilter, $routeParams) {


		//==================================
       	$scope.restart = function () {

			$rootScope.userPoints.r = 0;
			$rootScope.userPoints.b = 0;
			$rootScope.userPoints.c = 0;

			$rootScope.providerPoints.r = 0;
			$rootScope.providerPoints.i = 0;
			$rootScope.providerPoints.b = 0;
			$rootScope.providerPoints.c = 0;

			$rootScope.params = [];
		}


		//==================================
       	 $scope.setStart = function (s) {
			$rootScope.startSlide == s;
		}

		 $scope.getStart = function () {
			if(!$rootScope.startSlide)
				$rootScope.startSlide=" ";

			return $rootScope.startSlide;
		}

		//==================================
       	 $scope.getPoints = function (type) {

			if(type=="user"){
				if($rootScope.userPoints == undefined){
					$rootScope.userPoints = [];
					$rootScope.userPoints.r = 0;
					$rootScope.userPoints.b = 0;
					$rootScope.userPoints.c = 0;
				}
				else{
					return $rootScope.userPoints;
				}
			}
			if(type =="provider"){

				if($rootScope.providerPoints == undefined){
					$rootScope.providerPoints = [];
					$rootScope.providerPoints.r = 0;
					$rootScope.providerPoints.i = 0;
					$rootScope.providerPoints.b = 0;
					$rootScope.providerPoints.c = 0;
				}
				else{
					return $rootScope.providerPoints;
				}

			}
		}

		//==================================
       	 $scope.addPoints = function (p, type, value) {



				if(type=="user"){
					if($rootScope.userPoints == undefined){
						$rootScope.userPoints = [];
						$rootScope.userPoints.r = value[0];
						$rootScope.userPoints.b = value[1];
						$rootScope.userPoints.c = value[2];
					}
					else{
						if($scope.hasParam(p)){
							$rootScope.userPoints.r = $rootScope.userPoints.r + value[0];
							$rootScope.userPoints.b = $rootScope.userPoints.b + value[1];
							$rootScope.userPoints.c = $rootScope.userPoints.c + value[2];
						}
						else{
							$rootScope.userPoints.r = $rootScope.userPoints.r - value[0];
							$rootScope.userPoints.b = $rootScope.userPoints.b - value[1];
							$rootScope.userPoints.c = $rootScope.userPoints.c - value[2];
						}
					}
				}
				if(type =="provider"){

					if($rootScope.providerPoints == undefined){
						$rootScope.providerPoints = [];
						$rootScope.providerPoints.r = value[0];
						$rootScope.providerPoints.b = value[1];
						$rootScope.providerPoints.c = value[2];
					}
					else{
					if($scope.hasParam(p)){
							$rootScope.providerPoints.r = $rootScope.providerPoints.r + value[0];
							$rootScope.providerPoints.i = $rootScope.providerPoints.i + value[1];
							$rootScope.providerPoints.b = $rootScope.providerPoints.b + value[2];
							$rootScope.providerPoints.c = $rootScope.providerPoints.c + value[3];
						}
						else{
							$rootScope.providerPoints.r = $rootScope.providerPoints.r - value[0];
							$rootScope.providerPoints.i = $rootScope.providerPoints.i - value[1];
							$rootScope.providerPoints.b = $rootScope.providerPoints.b - value[2];
							$rootScope.providerPoints.c = $rootScope.providerPoints.c - value[3];
						}
					}

				}

		}


		//==================================
       	 $scope.toggleHelp = function () {

				if($rootScope.help == undefined){
					$rootScope.help = false;
					return;
				}

				$rootScope.help =!$rootScope.help;

		}


		//==================================
       	 $scope.addParam = function (p) {

				if(!$rootScope.params){
					$rootScope.params = [];
					$rootScope.params.push(p);
				}
				else{

					// var i = $rootScope.params.indexOf(p);
					//
					// if(i >= 0 )
					// 	$rootScope.params.splice(i, 1);
					// else{
						$rootScope.params.push(p);
					//}
				}
       	 }

			//==================================
       	 $scope.removeParam = function (p) {
				if($rootScope.params){
					var i = $rootScope.params.indexOf(p);
					if(i >= 0 )
						$rootScope.params.splice(i, 1);

				}
       	 }

		//==================================
       	 $scope.hasParam = function (p) {
			if($rootScope.params){
				var i = $rootScope.params.indexOf(p);
				if(i >= 0 )
					return true;
			}
			return false;
       	 }


			//==================================
       	 $scope.checkLastParam = function (p, n) {
			if($rootScope.params){

				var l = $rootScope.params.length;

				for(var i=l-n; i<l;i++){
						if($rootScope.params == p)
							return true;
				}
			}
			return false;
       	 }


   }]);
});
