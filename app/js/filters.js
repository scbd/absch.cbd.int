
define(['app'], function (app) {


	function lstring(ltext, locale)
	{
		if(!ltext)
			return "";

		if(angular.isString(ltext))
			return ltext;

		var sText = undefined;

		if(!sText && locale)
			sText = ltext[locale];

		if(!sText)
			sText = ltext["en"];

		if(!sText) {
			for(key in ltext) {
				sText = ltext[key]
				if(sText)
					break;
			}
		}

		return sText||"";

	}


	app.filter("term", ["$http", function($http) {
		var cacheMap = {};

		return function(term, locale) {

			if(!term)
				return "";

			locale = locale||"en";

			if(term.customValue)
				return lstring(term.customValue, locale);

			if(cacheMap[term.identifier])
				return lstring(cacheMap[term.identifier].title, locale) ;

			cacheMap[term.identifier] = $http.get("/api/v2013/thesaurus/terms/"+encodeURI(term.identifier),  {cache:true}).then(function(result) {

				cacheMap[term.identifier] = result.data;

				return lstring(cacheMap[term.identifier].title, locale);

			}).catch(function(error){

				cacheMap[term.identifier] = term.identifier;

				return term.identifier;

			});
		}
	}]);

	app.filter("lstring", function() {
		return lstring;
	});

	app.filter("orderPromiseBy", ["$q", "$filter", function($q, $filter) {
		return function(promise, expression, reverse) {
			return $q.when(promise).then(function(collection){
				return $filter("orderBy")(collection, expression, reverse);
			});
		}
	}]);

	app.filter("markdown", ["$window", "htmlUtility", function($window, html) {
		return function(srcText) {
			if (!$window.marked)//if markdown is not install then return escaped html! to be safe!
				return '<div style="word-break: break-all; word-wrap: break-word; white-space: pre-wrap;">'+html.encode(srcText)+'</div>';
			return $window.marked(srcText, { sanitize: true });
		}
	}]);

	app.filter("truncate", function() {
		return function(text, maxSize, suffix) {

			if (!maxSize)
				return text;

			if (!suffix)
				suffix = "";

			if(!text)
				return "".su;

			if (text.length > maxSize)
				text = text.substr(0, maxSize) + suffix;

			return text;
		}
	});
});