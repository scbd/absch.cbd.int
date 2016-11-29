define(['app'], function(app) { 'use strict';

    app.provider('locale', [function() {

        this.$get = ['$document', '$window', function($document, $window) {
        
            var urlLangRegex       = /^\/(en|ar|fr|es|ru|zh)/;
            var langRegex = /(ar|en|es|fr|ru|zh)/;
            var location = window.location;
            var lang = location.pathname.split(urlLangRegex);
            
            if(lang && langRegex.test(lang[1]))
                return lang[1];

            return 'en';

        }];
    }]);
    
    app.service('localeService', ['$document', '$window', function($document, $window) {

        var urlLangRegex       = /^\/(en|ar|fr|es|ru|zh)/;
        var langRegex = /(ar|en|es|fr|ru|zh)/;

        this.urlHasLocale = function () {
                var location = window.location;
                var lang = location.pathname.split(urlLangRegex);
                
                if(lang && langRegex.test(lang[1]))
                    return true;
                
                return false;
        };
    }]);
});
