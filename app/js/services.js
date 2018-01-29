﻿
define(['app', 'underscore', 'linqjs'], function (app, _, Enumerable) {

	app.factory("htmlUtility", function() {
		return {
			encode: function(srcText) {
				return $('<div/>').text(srcText).html();
			}
		};
	});

	app.factory('underscore', [function() {
		return _;
	}])

	app.factory('Enumerable', [function() {
		return Enumerable;
	}])

	app.factory('linqjs', [function() {
		return Enumerable;
	}])
	
});
