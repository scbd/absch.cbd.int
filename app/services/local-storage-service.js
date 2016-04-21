define(['app', 'jquery', 'underscore', 'toastr', 'ngStorage'],
 function (app, $, _) { 'use strict';

	app.factory('localStorageService',  ["$http","$location", "$rootScope","toastr", "$localStorage",
	 function($http,$location, $rootScope, toastr, $localStorage) {

		return new function(){

            this.get = function(key){
                return;
                
                var existing = angular.copy($localStorage[key]);

                if(!existing)
                    return;

                if(new Date() < new Date(existing.expiry))
                    return existing.data;

                //remove expired data from storage;
                console.log(key);
                this.remove(key);

                return;
            };

            this.set = function(key, data){
                var ldata = {};

                var expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + 2);

                ldata.expiry = expiryDate;
                ldata.data   = data;

                $localStorage[key] = ldata;
            };

            this.remove = function(key){
                delete $localStorage[key];
            };

            this.removeAll = function(){
                $localStorage.$reset();
            };

            this.hasStorageExpired = function(key, expiryDate){
                var today = new Date();
                return expiryDate.getFullYear() < today.getFullYear()
                    && expiryDate.getDate()     < today.getDate()
                    && expiryDate.getMonth()    < today.getMonth();
            };
		};

    }]);
});
