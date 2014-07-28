
define(['app', 'underscore', 'linqjs','bootbox'], function (app, _, Enumerable,bootbox) {

	app.factory("htmlUtility", function() {
		return {
			encode: function(srcText) {
				return $('<div/>').text(srcText).html();
			}
		};
	})

	app.factory('guid', function() {
		function S4() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}
		return function() {
			return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()).toUpperCase();
		}
	})

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
	}])

  //TODO: this is also in form-controls... it should only be in one place
	app.factory('Thesaurus', [function() {
		return {
			buildTree : function(terms) {
				var oTerms    = [];
				var oTermsMap = {};

				Enumerable.from(terms).forEach(function(value) {
					var oTerm = {
						identifier  : value.identifier,
						title       : value.title,
						description : value.description
					}

					oTerms.push(oTerm);
					oTermsMap[oTerm.identifier] = oTerm;
				});

				for (var i = 0; i < oTerms.length; ++i) {
					var oRefTerm = terms [i];
					var oBroader = oTerms[i];

					if (oRefTerm.narrowerTerms && oRefTerm.narrowerTerms.length > 0) {
						angular.forEach(oRefTerm.narrowerTerms, function(identifier) {
							var oNarrower = oTermsMap[identifier];

							if (oNarrower) {
								oBroader.narrowerTerms = oBroader.narrowerTerms || [];
								oNarrower.broaderTerms = oNarrower.broaderTerms || [];

								oBroader.narrowerTerms.push(oNarrower);
								oNarrower.broaderTerms.push(oBroader);
							}
						});
					}
				}

				return Enumerable.from(oTerms).where("o=>!o.broaderTerms").toArray();
			}
		}
	}])

	app.factory('localization', ["$browser", function($browser) {
		return {
			locale: function(newLocale) {

				var internal_SetLocale = function(newLocale) {

					if (!/^[a-z]{2,3}$/.test(newLocale))
						throw "invalid locale";

					var oExpire = new Date();

					oExpire.setFullYear(oExpire.getFullYear() + 1);

					document.cookie = "Preferences=Locale=" + escape(newLocale) + "; path=/; expires="+oExpire.toGMTString();
				}

				if (newLocale)
					internal_SetLocale(newLocale);

				var sPreferences = $browser.cookies().Preferences;
				var sLocale      = "en";
				var oLocaleRegex = /;?Locale=([a-z]{2,3});?/

				if (sPreferences && oLocaleRegex.test(sPreferences))
					sLocale = $browser.cookies().Preferences.replace(oLocaleRegex, "$1");
				else
					internal_SetLocale(sLocale);

				return sLocale;
			}
		}
	}])
});
