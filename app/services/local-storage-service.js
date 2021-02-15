define(['app', 'jquery', 'lodash', 'toastr', 'ngStorage'],
 function (app, $, _) { 'use strict';

	app.factory('localStorageService',  ["$http","$location", "$rootScope","toastr",
    "$sessionStorage", 'realm',//"$localStorage",
	 function($http,$location, $rootScope, toastr, $localStorage, realm) {

		return new function(){

            this.get = function(key){
                
                var lKey = realm.value + key

                if(!$localStorage.$supported)
                    return;

                var existing = angular.copy($localStorage[lKey]);

                if(!existing)
                    return;

                if(new Date() < new Date(existing.expiry))
                    return existing.data;

                //remove expired data from storage;                
                this.remove(lKey);

                return;
            };

            this.set = function(key, data){

                var lKey = realm.value + key

                if(!$localStorage.$supported)
                    return;
                    
                var ldata = {};

                var expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + 2);

                ldata.expiry = expiryDate;
                ldata.data   = data;

                $localStorage[lKey] = ldata;
            };

            this.remove = function(key){
                delete $localStorage[realm.value + key];
            };

            this.removeAll = function(){
                $localStorage.$reset();
            };

            this.hasStorageExpired = function(key, expiryDate){
                var lKey = realm.value + key
                var today = new Date();
                return expiryDate.getFullYear() < today.getFullYear()
                    && expiryDate.getDate()     < today.getDate()
                    && expiryDate.getMonth()    < today.getMonth();
            };
		};

    }]);
});
