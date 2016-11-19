define(['app'], function(app) { 'use strict';

    app.provider('locale', [function() {

        this.$get = ['$document', '$window', function($document, $window) {
        
        var urlLangRegex       = /^\/(en|ar|fr|es|ru|zh)/;
        var langRegex = /(ar|en|es|fr|ru|zh)/;
        var location = window.location;
        var lang = location.pathname.split(urlLangRegex);
        
        //var matches = /locale=(\w{2,3})/g.exec($document[0].cookie);

            //if(matches)
               // return matches[1]; //
        if(lang && langRegex.test(lang[1]))
            return lang[1];
            
            return 'en';

        }];
    }]);
});
