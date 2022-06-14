import app from 'app';
import _ from 'lodash';
import 'ngStorage'; ;

	app.factory('translationService',  ['locale', "localStorageService", "$cacheFactory", 'realm',
	    function(locale, localStorageService, $cacheFactory, realm) {

            return new function(){ 

                this.set = function (key, values) {
                    // console.log("set is called ", key)
                    localStorageService.set([locale][key], values);

                };

                this.get = function(key){

                    console.log("get is called ", key)

                    return localStorageService.get([locale][key]) || key;                
                };
                
                this.remove = function(key){
                    delete $localStorage[locale + key];
                };

                this.removeAll = function(){
                    $localStorage.$reset();
                };
            };

    }]);

