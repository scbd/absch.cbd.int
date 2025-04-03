import app from '~/app';
import 'angular-cookies';
import { getLocaleDirection } from '~/services/filters/lstring';

    var urlLangRegex       = /^\/(en|ar|fr|es|ru|zh)(\/|$)/;
    app.provider('locale', [function() {

        this.$get = ['$window', '$cookies', function($window, $cookies) {
        
            var location = $window.location;
            var lang = location.pathname.match(urlLangRegex);
            
            if(lang)
                return lang[1];

            lang = $cookies.get("locale");

            return lang || 'en';

        }];
    }]);
    
    app.service('localeService', ['$window', function($window) {

        this.urlHasLocale = function () {
                var location = $window.location;
                var lang = location.pathname.match(urlLangRegex);
                
                if(lang)
                    return true;
                
                return false;
        };
    }]);
    //ToDo: Duplicate code , already available in scbd-filters
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
    //ToDo: Duplicate code , already available in scbd-filters
    app.filter("direction", ['$filter', function($filter) {
    	return function(text, locale) {

            locale = $filter('locale')(text, locale);

            return $filter('localeDirection')(locale);
    	};
    }]);
    //ToDo: Duplicate code , already available in scbd-filters
    app.filter("localeDirection", ['locale', function(defaultLocale) {
    	return function(locale) {
            return getLocaleDirection(locale || defaultLocale);
        };
    }]);

