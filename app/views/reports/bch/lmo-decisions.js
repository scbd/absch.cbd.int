define(['app', 'lodash', 'text!./lmo-decisions.html', 'angular-cookies','views/forms/view/bch/view-lmo-reference.directive',
'angucomplete-alt','views/directives/block-region-directive', 'services/search-service', 'js/common', 'services/solr'], 
function(app, _, template) { ;

app.directive("lmoDecisions", [ '$http', 'solr', '$cookies', 'searchService', 'commonjs', '$q',
	function($http, solr, $cookies, searchService, commonjs, $q) {
	
		return{
			template:template,
			restrict:'EA',
			replace:true,
			scope:{
				identifier:'@'
			},
			link($scope){

				var countries  = {};

				//============================================================
				//
				//
				//============================================================
				$q.when(commonjs.getCountries()).then(function(data) {

					_.forEach(data, function(c) { countries[c.code.toLowerCase()] = c.name.en; });

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

				$scope.getCountryName = function(o) {
					return countries[o.country] || o.country;
				};

				function lmoDecisions(identifier){
					var query = {
						query : 'identifier_s:' + solr.escape(identifier),
						fields: 'id'
					}
					searchService.list(query)
					.then(function(r) {
						return commonjs.hexToInteger(r.data.response.docs[0].id);
					})
					.then(function(id){		
						$scope.lmo = undefined;
						$http.get('/api/v2013/lmos/' + bchStorageIdToObjectId(id) + '/decisions').then(function(r) {
							$scope.lmo = r.data;					
						}).catch(function(error) {
							console.log('ERROR:', error);
						});
					})
			
				}

				function bchStorageIdToObjectId(d) {
					var hex = Number(d).toString(16);

					return '52000000cbd0900000000000'.substr(0, 24 - hex.length) + hex;
				}

				lmoDecisions($scope.identifier);
			}
		}
		
	}]);
	
});
