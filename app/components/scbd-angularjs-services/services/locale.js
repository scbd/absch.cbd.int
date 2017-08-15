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

    app.filter("locale", ['locale', function(defaultLocale) {
    	return function(ltext, locale) {

            locale = locale || defaultLocale;

            if(!ltext)
    			return locale;

            if(typeof(ltext) == 'string')
    			return locale;

    		if(ltext[locale])
                return locale;

    		if(ltext[defaultLocale])
                return defaultLocale;

    		if(ltext.en)
    			return 'en';

			for(var key in ltext) {
                if(ltext[key])
                    return key;
			}

    		return locale;
    	};
    }]);

    app.filter("direction", ['$filter', function($filter) {
    	return function(text, locale) {

            locale = $filter('locale')(text, locale);

            return $filter('localeDirection')(locale);
    	};
    }]);

    app.filter("localeDirection", ['locale', function(defaultLocale) {
    	return function(locale) {
            return (locale||defaultLocale) == 'ar' ? 'rtl' : 'ltr';
        };
    }]);
});
