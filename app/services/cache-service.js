define(['app', 'lodash', 'angular-cache'], function(app, _) {  'use strict';
    
    app.factory('cacheService', ['CacheFactory', function(CacheFactory){
        return {
            getCacheFactory: getCacheFactory
        }

        function getCacheFactory(options){

            var defaults = {
                name          : 'httpCache',
                deleteOnExpire: 'aggressive',
                recycleFreq   : 10000,
                maxAge        : 5 * 60 * 1000, //5 minutes
                storageMode   : 'memory',
                storagePrefix : 'httpCache_'
            }
            var cacheName = options.name;
            var cahceOptions = _.defaults({}, options, defaults);
            
            var httpCache = CacheFactory.get(cacheName);
            if (!httpCache) {
                httpCache = CacheFactory.createCache(cacheName, {
                    deleteOnExpire: cahceOptions.deleteOnExpire,
                    recycleFreq   : cahceOptions.recycleFreq,
                    maxAge        : cahceOptions.maxAge,
                    storageMode   : cahceOptions.storageMode,
                    storagePrefix : cahceOptions.storagePrefix
                });
            }
            return httpCache;
        }
    }]);

});