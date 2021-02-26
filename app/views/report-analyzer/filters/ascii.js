define(['app', 'diacritics'], function(app, diacritics) { ;

    app.filter("ascii", [function() {
    	return function(text) {

    		if(!text)
    			return '';

    		if(typeof(text) !== 'string')
    			return text;

            return diacritics.clean(text);
    	};
    }]);
});
