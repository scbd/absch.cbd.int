define(['app', 'lodash', 'angular-cookies','views/forms/view/bch/view-lmo-reference.directive',
'angucomplete-alt','views/directives/block-region-directive', 'services/search-service', 'js/common'], function(app, _) { 'use strict';

app.controller("LmoDesicionsReportController", ['$scope', '$http', '$route', '$cookies', 'searchService', 'commonjs',
	function($scope, $http, $route, $cookies, searchService, commonjs) {

		var documentId = $scope.identifier = parseInt($route.current.params.documentId || '');
		var countries  = {};

		//============================================================
		//
		//
		//============================================================
		$http.get('/api/v2013/countries').then(function(r) {

			_.each(r.data, function(c) { countries[c.code.toLowerCase()] = c.name.en; });

			countries.eur = countries.eur || countries.eu;

		}).catch(function(error) {
			console.log('ERROR:', error);
		});
	
		//============================================================
		//
		//
		//============================================================
		$scope.$watch('showDatabase', function(_new){
			$cookies.showDatabase = _new;
		});

		$scope.showDatabase = $cookies.showDatabase || "";

		//============================================================
		//
		//
		//============================================================
		$scope.isCountryVisible = function(country) {
			return (country.bch && country.bch.length) ||
			       ($scope.showDatabase=='showBiostradestatus' && country.biotrade && country.biotrade.length);
		};

		
		$scope.$watch('newLmo', function(newVal){
			if(newVal){
				$scope.identifier = commonjs.hexToInteger(newVal.originalObject.id);
				lmoDecisions(bchStorageIdToObjectId($scope.identifier));
				
			}
		})
		
		$scope.getCountryName = function(o) {
			return countries[o.country] || o.country;
		};

		$scope.loadLMos = function(userInputString, timeoutPromise){
			$scope.loadingData=true;
			var query = {
				fieldQuery: ['schema_s:modifiedOrganism'],
				query : userInputString,
				fields: 'id,title:title_EN_t,summary:summary_EN_t',
				sort  : 'government_EN_t asc'
			}
		    return searchService.list(query).then(function(r) {
				return {data : r.data.response.docs};
			})
			.finally(function(){$scope.loadingData=false;});
		}

		function lmoDecisions(documentId){
			$scope.lmo = undefined;
			$http.get('/api/v2013/lmos/' + documentId + '/decisions').then(function(r) {

				$scope.lmo = r.data;
	
			}).catch(function(error) {
				console.log('ERROR:', error);
			});
	
		}

		function bchStorageIdToObjectId(d) {
			var hex = Number(d).toString(16);

			return '52000000CBD0900000000000'.substr(0, 24 - hex.length) + hex;
		}

		lmoDecisions(bchStorageIdToObjectId(documentId));
	}]);
	
});
