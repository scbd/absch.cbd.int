
define(['app', 'underscore', 'linqjs','bootbox'], function (app, _, Enumerable,bootbox) {

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

    app.factory('bootbox', [function() {
		return bootbox;
	}]);
	
});
