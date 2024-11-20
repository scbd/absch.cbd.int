import app from '~/app';
import _ from 'lodash';
import template from 'text!./lmo-decisions.html';
import 'angular-cookies';
import '~/views/forms/view/bch/view-lmo-reference.directive';
import 'angucomplete-alt';
import '~/views/directives/block-region-directive';
import '~/services/main'; ;
import lmoDecisionsT from '~/app-text/views/reports/bch/lmo-decisions.json';

app.directive("lmoDecisions", ['$http', 'solr', '$cookies', 'searchService', 'commonjs', '$q', 'translationService',
	function ($http, solr, $cookies, searchService, commonjs, $q, translationService) {
	
		return{
			template:template,
			restrict:'EA',
			replace:true,
			scope:{
				identifier:'@'
			},
			link($scope){
				translationService.set('lmoDecisionsT', lmoDecisionsT);
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
						fields: 'id,uniqueIdentification_s,_documentId_i,title_s,identifier_S'
					}
					searchService.list(query)
					.then(function(r) {
						const doc = r.data.response.docs[0];
						doc.id = commonjs.hexToInteger(doc.id)
						return doc;
					})
					.then(function(doc){		
						$scope.lmo = undefined;
						// $http.get('/api/v2013/lmos/' + bchStorageIdToObjectId(doc.id) + '/decisions').then(function(r) {
						// 	$scope.lmo = r.data;								
						// }).catch(function(error) {
						// 	console.log('ERROR:', error);
						// });

						var lmoQuery = {
							query : 'schema_s:biosafetyDecision AND modifiedOrganisms_ss:' + solr.escape(identifier),
							fields: 'title_s,identifier_s,government_s,government_EN_s,_documentId_i,bioTradeStatus_txt,decisionStatus_s,scopeFood_b,scopeFeed_b,scopeProcessing_b,scopeRelease_b,scopeFieldTrials_b,scopeContainedUse_b,scopePharmaceutical_b,scopeTransit_b,scopeOther_b',
							sort  : 'government_EN_s asc,_documentId_i asc',
							rowsPerPage:5000
						}
	
						searchService.list(lmoQuery)
						.then(function(res) {
							const data = res.data?.response?.docs;
							if(data?.length){
								
								let bioTradeEventID;
								data.map(e=>{
									e.bioTradeStatus_txt_new = [...(e.bioTradeStatus_txt||[])]
									e.bioTradeStatus_txt = e.bioTradeStatus_txt?.map(status=>JSON.parse(status));
									e.bioTradeStatus_txt = e.bioTradeStatus_txt?.filter(status=>status.uniqueIdentification == doc.uniqueIdentification_s)
									if(e.bioTradeStatus_txt?.length){
										bioTradeEventID = e.bioTradeStatus_txt[0].eventID
									}
									return e;
								});

								const countries = {};
								data.forEach(decision => {
									if(!countries[decision.government_s]){
										countries[decision.government_s] = {
											bch : [],
											country: decision.government_s
										}
									}

									countries[decision.government_s].bch.push(_.pickBy({
										decisionID		   : decision._documentId_i,
										decision		   : decision.decisionStatus_s,
										food          : decision.scopeFood_b,
										feed          : decision.scopeFeed_b,
										processing    : decision.scopeProcessing_b,
										release       : decision.scopeRelease_b,
										fieldTrials   : decision.scopeFieldTrials_b,
										containedUse  : decision.scopeContainedUse_b,
										pharmaceutical: decision.scopePharmaceutical_b,
										transit       : decision.scopeTransit_b,
										other         : decision.scopeOther_b,
									}, _.identity));

									if(decision.bioTradeStatus_txt?.length && !countries[decision.government_s].biotrade){
										
										const bioTradeStatus = decision.bioTradeStatus_txt[0];

										countries[decision.government_s].biotrade = [];
										countries[decision.government_s].biotrade.push(_.pickBy({
											food                      : bioTradeStatus.decisions?.food,
											feed                      : bioTradeStatus.decisions?.feed,
											environmentalCultivation  : bioTradeStatus.decisions?.environmentalCultivation,
											environmentalImport       : bioTradeStatus.decisions?.environmentalImport,
											safetyCertificate         : bioTradeStatus.decisions?.safetyCertificate,
											referIndividualEventStatus: bioTradeStatus.decisions?.referIndividualEventStatus,
										}, _.identity));
									}

								});

								const lmoDecisions = {
									bioTradeEventID,
									countries : Object.values(countries),
									identifier : doc.identifier_s,
									lmoID:doc._documentId_i,
									name:doc.title_s,
									uniqueIdentification:doc.uniqueIdentification_s
								}
								$scope.lmo = lmoDecisions
							}
						})
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
	

