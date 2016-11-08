define(['app', 'underscore'], function (app, _) { 'use strict';

	app.factory('ammap3Service',  ["$http","$location","locale","$q","$timeout", function($http,$location,locale,$q,$timeout) {

				var countries=null;
				var mapObject = {};
				var mapCtrls = {};

				var leggends = {
 					parties: [{
            id: 3,
            title: 'Parties',
            visible: true,
            color: '#3F8EFC'
          }, {
            id: 2,
            title: 'Non-Parties',
            visible: true,
            color: '#2667FF'
          }, {
            id: 0,
            title: 'RATIFIED NOT YET PARTY',
            visible: true,
            color: '#dddddd'
          } ]};

					// $http.get('https://api.cbd.int/api/v2015/countries', {
	        //   cache: true,
	        // }).then(function(res) {
					//
	        //   res.data.forEach(function(c) {
	        //     c.name = c.name[locale];
	        //   });
	        //   items = res.data;
					// 	writeMaps ();
					// //	generateMaps ();
	        // });




					//=======================================================================
	        //
	        //=======================================================================
	        function resetLegend(legend) {

	          _.each(legend, function(legendItem) {
	            legendItem.visible = true;
	          });
	        } //$scope.legendHide

					//=======================================================================
	        //
	        //=======================================================================


					// //=======================================================================
	        // //
	        // //=======================================================================
					// var registrarGenerateMap = [];
					// function registerGenerateMap (callback){
					//  		registrarGenerateMap.push(callback);
					// }

					//=======================================================================
	        //
	        //=======================================================================
					var registrarWriteMap = [];
					function registerWriteMap (callback){
					 		registrarWriteMap.push(callback);

					}

					// //=======================================================================
	        // //
	        // //=======================================================================
					// function generateMaps (){
					// 		 _.each(registarGenerateMap, function(callback){
					// 			 callback(items);
					// 		 });
					// }

					//=======================================================================
	        //
	        //=======================================================================
					function loadCountries (data){
									countries=data;
									writeMaps();
					}

					//=======================================================================
	        //
	        //=======================================================================
					function writeMaps (){
							 _.each(registrarWriteMap, function(callback){
								 callback(countries);
							 });
					}


					//=======================================================================
					//
					//=======================================================================
					function setMapObject (map){
							mapObject = map;
					}

					//=======================================================================
					//
					//=======================================================================
					function setMapCtrl (mapCtrl){

						if(mapCtrl.getCtrlMapId()){
							mapCtrls[mapCtrl.getCtrlMapId()] = mapCtrl;
						}else
							throw "Error: thrying to register a map controler in the ammap3Service withont a mapID";

					}

					//=======================================================================
					//
					//=======================================================================
					function getCountries(){
								var deferred = $q.defer();
								deferred.resolved=0;

								var cancelId =   setInterval(function() {
								    									if (countries){

																				 deferred.resolve(countries);
																				 deferred.resolved=1;
																				 clearInterval(cancelId);
																				 return deferred.promise;
																			}
																 }, 100);
								 setTimeout(function(){
											if(!deferred.resolved){deferred.reject('Receiving country data timed out.');
											clearInterval(cancelId);}
									},7000);
						  return deferred.promise;
						}

						//=======================================================================
						//
						//=======================================================================
						function setGlobalClickListener(mapId,onClickToDo){


							var cancelId =  setInterval(function() {
																	if (mapCtrls[mapId].getMap()){
																			clearInterval(cancelId);
																			return mapCtrls[mapId].getMap().addListener("click",onClickToDo);}
															 },1000);


															setTimeout(function(){
																	clearInterval(cancelId);
																	if (!mapCtrls[mapId].getMap())
																	 throw('Error: no controller or map initialazed on mapID:'+mapId);

															 },7000);
						}//setGlobalClickListener

						//=======================================================================
						//
						//=======================================================================
						function setCountryClickListener(mapId,onClickToDo){


							var cancelId =  setInterval(function() {
																	if (mapCtrls[mapId].getMap()){
																			clearInterval(cancelId);
																			return mapCtrls[mapId].getMap().addListener("clickMapObject",onClickToDo);}
															 },1000);


															setTimeout(function(){
																	clearInterval(cancelId);
																	if (!mapCtrls[mapId].getMap())
																	 throw('setGlobalClickListener:Error: no controller or map initialazed on mapID:'+mapId);

															 },7000);
						}//setGlobalClickListener

					// //=======================================================================
					// //
					// //=======================================================================
					// function setMapClickListener (mapCtrl){
					// 	if(mapCtrl.madId)
					// 		mapCtrls[mapCtrl.mapId] = mapCtrl;
					// 	else
					// 		throw "Error: thrying to register a map controler in the ammap3Service withont a mapID";
					//
					// }

				return {
					setMapCtrl:setMapCtrl,
					setMapObject:setMapObject,
					registerWriteMap:registerWriteMap,
					loadCountries:loadCountries,
					getCountries:getCountries,
					setGlobalClickListener:setGlobalClickListener,
					setCountryClickListener:setCountryClickListener
				};

    }]);
});