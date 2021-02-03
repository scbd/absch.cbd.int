define(['app'], function (app) {

"use strict";
//require("app", "dragAndDrop")

app.controller("presentationController",
	["$rootScope", "$location" , "$scope", "$q", "$window", "IStorage", "lodash",
	 "$compile", "$timeout","lstringFilter", "$routeParams",
	 function ($rootScope, $location, $scope, $q, $window, storage, _,
	  $compile,$timeout,lstringFilter, $routeParams) {

		$scope.slide = $scope.subTemplateUrl.replace('.html','');

		//==================================
       	$scope.restart = function () {

			$rootScope.userPoints = undefined;

			// $rootScope.userPoints.r = 0;
			// $rootScope.userPoints.b = 0;
			// $rootScope.userPoints.c = 0;

			$rootScope.providerPoints = undefined;

			// $rootScope.providerPoints.r = 0;
			// $rootScope.providerPoints.i = 0;
			// $rootScope.providerPoints.b = 0;
			// $rootScope.providerPoints.c = 0;

			$rootScope.params = undefined;
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

					if(!$rootScope.userPoints ){
						$rootScope.userPoints = [];
						$rootScope.userPoints.r = value[0];
						$rootScope.userPoints.c = value[1];
						$rootScope.userPoints.b = value[2];
					}
					else{
						$rootScope.userPoints.r = $rootScope.userPoints.r + value[0];
						$rootScope.userPoints.b = $rootScope.userPoints.b + value[1];
						$rootScope.userPoints.c = $rootScope.userPoints.c + value[2];
					}

				}
				if(type =="provider"){

					if(!$rootScope.providerPoints ){
						$rootScope.providerPoints = [];
						$rootScope.providerPoints.i = value[0];
						$rootScope.providerPoints.r = value[1];
						$rootScope.providerPoints.c = value[2];
						$rootScope.providerPoints.b = value[3];
					}
					else{

						$rootScope.providerPoints.i = $rootScope.providerPoints.i + value[0];
						$rootScope.providerPoints.r = $rootScope.providerPoints.r + value[1];
						$rootScope.providerPoints.c = $rootScope.providerPoints.c + value[2];
						$rootScope.providerPoints.b = $rootScope.providerPoints.b + value[3];
					}
				}
		}

		//==================================
       	 $scope.toggleHelp = function () {

				if($rootScope.help == undefined){
					$rootScope.help = true;
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

					if(!$scope.checkLastParam(p, 1))
						$rootScope.params.push(p);


					//}
				}
       	 }

			//==================================
       	 $scope.addParamCheck = function (p,n) {

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

					if(!$scope.checkLastParam(p, n))
						$rootScope.params.push(p);


					//}
				}
       	 }

			//==================================
       	 $scope.addParamR = function (p) {

				if(!$rootScope.params){
					$rootScope.params = [];
					$rootScope.params.push(p);
				}
				else{

					var i = $rootScope.params.lastIndexOf(p);

					if(i >= 0 )
						$rootScope.params.splice(i, 1);
					else{
						$rootScope.params.push(p);
					}
				}
       	 }

			//==================================
       	 	$scope.removeParamCheck = function (p, n) {
				if($rootScope.params){
					var i = $rootScope.params.lastIndexOf(p);

					var l = $rootScope.params.length;

					if( i >= 0 && i >= (l-n))
						$rootScope.params.splice(i, 1);

				}
       	 	}

			//==================================
       	 $scope.removeParam = function (p) {
				if($rootScope.params){
					var i = $rootScope.params.lastIndexOf(p);

					if(i >= ($rootScope.params.length - 2) )
						$rootScope.params.splice(i, 1);

				}
       	 }

				//==================================
       	 $scope.removeParamALL = function (p) {
				if($rootScope.params){
					var i = $rootScope.params.lastIndexOf(p);

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

			if (!n) n=1;

			if($rootScope.params && $rootScope.params.length > 0){


				var l = $rootScope.params.length;

				for(var i=l-n; i<l;i++){
						if($rootScope.params[i] == p)
							return true;
				}
			}
			return false;
       	 }


		//==================================
       	 $scope.calcPoints = function () {

			var	scoring = [
				{
					'param': 'CP_journal',
					'user': [2,1,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'CP_grants',
					'user': [2,1,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'CP_patent',
					'user': [2,1,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'CP_market',
					'user': [2,1,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'CP_exam',
					'user': [2,1,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'CP_no_exam',
					'user': [0,0,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'MSR_good',
					'user': [0,0,0],
					'provider':[2,1,1,1]
				},
				{
					'param': 'MSR_bad',
					'user': [0,0,0],
					'provider':[-1,1,0,1]
				},
				{
					'param': 'MSR_none',
					'user': [0,0,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'user_no_beans',
					'user': [0,0,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'user_store',
					'user': [0,0,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'store_no_absch',
					'user': [-1,0,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'store_absch',
					'user': [0,0,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'contact_cna',
					'user': [0,0,1],
					'provider':[0,0,0,0]
				},
				{
					'param': 'ignore_msr_research',
					'user': [-1,0,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'plan_exp_no_absch',
					'user': [-1,0,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'plan_exp_absch',
					'user': [0,0,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'ignore_msr_store',
					'user': [-1,0,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'ingnore_msr_exp',
					'user': [-1,0,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'cna_consult_ilc',
					'user': [0,0,0],
					'provider':[1,0,1,1]
				},
				{
					'param': 'cna_no_consult',
					'user': [0,0,0],
					'provider':[-1,1,0,0]
				},
				{
					'param': 'user_consult_ilc',
					'user': [0,0,0],
					'provider':[1,0,0,0]
				},
				{
					'param': 'picmat_research',
					'user': [0,0,0],
					'provider':[0,1,1,1]
				},
				{
					'param': 'picmat_commercial',
					'user': [0,0,0],
					'provider':[0,2,1,2]
				},
				{
					'param': 'picmat_none',
					'user': [0,0,0],
					'provider':[0,-1,0,0]
				},
				{
					'param': 'cp_journal_accepts',
					'user': [1,0,1],
					'provider':[0,0,0,0]
				},
				{
					'param': 'cp_journal_rejects',
					'user': [-1,4,-2],
					'provider':[0,0,0,0]
				},
				{
					'param': 'cp_grants_accepts',
					'user': [1,0,1],
					'provider':[0,0,0,0]
				},
				{
					'param': 'cp_grants_rejects',
					'user': [-1,4,-2],
					'provider':[0,0,0,0]
				},
					{
					'param': 'cp_market_accepts',
					'user': [1,0,1],
					'provider':[0,0,0,0]
				},
				{
					'param': 'cp_market_rejects',
					'user': [-1,4,-2],
					'provider':[0,0,0,0]
				},
					{
					'param': 'cp_patent_accepts',
					'user': [1,0,1],
					'provider':[0,0,0,0]
				},
				{
					'param': 'cp_patent_rejects',
					'user': [-1,4,-2],
					'provider':[0,0,0,0]
				},
				{
					'param': 'userCNA_file_CPC',
					'user': [1,0,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'userCNA_contactuser_CPC',
					'user': [1,0,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'userCNA_takemsr_CPC',
					'user': [1,0,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'userCNA_ignore_CPC',
					'user': [-1,0,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'proCNA_file_CPC',
					'user': [0,0,0],
					'provider':[0,1,0,2]
				},
				{
					'param': 'proCNA_callUser_CPC',
					'user': [0,0,0],
					'provider':[0,1,1,1]
				},
				{
					'param': 'proCNA_callCNA_CPC',
					'user': [0,0,0],
					'provider':[0,1,1,1]
				},
				{
					'param': 'proCNA_sueUser_CPC',
					'user': [-1,4,-4],
					'provider':[0,-1,3,-1]
				},
				{
					'param': 'proCNA_ignore_CPC',
					'user': [0,0,0],
					'provider':[0,0,0,0]
				},
				{
					'param': 'proCNA_trust',
					'user': [0,0,0],
					'provider':[0,1,0,0]
				},
				{
					'param': 'proCNA_ok',
					'user': [0,0,0],
					'provider':[0,-1,2,0]
				},
				{
					'param': 'proCNA_angry',
					'user': [-1,4,-4],
					'provider':[0,-1,3,-1]
				},
					{
					'param': 'user_finalize',
					'user': [3,0,4],
					'provider':[3,3,0,4]
				}


			];


			for(var i=0; i < $rootScope.params.length; i++)
			{
				for(var j=0; j < scoring.length; j++){

					if($rootScope.params[i] == scoring[j].param){
						$scope.addPoints( scoring[j].param, "user", scoring[j].user );
						$scope.addPoints( scoring[j].param, "provider", scoring[j].provider );
					}
				}
			}

       	 }


   }]);
});
