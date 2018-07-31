define(['app', 'moment', 'json!./schema-name.json', 'json!./schema-short-name.json', 'scbd-angularjs-services/locale'], 
function (app, moment, schemaName, schemaShortName) {


  app.directive("translationUrl", ['$browser', function($browser){
    return {
      restrict : 'A',
      link :  function($scope, $element, $attrs){

        var lastPath;
        // console.log($attrs.ngClick);
        if(!$attrs.ngClick){
          $attrs.$observe('href', function(){
            // console.log($attrs)        			
            var langRegex 			= new RegExp('^\/(ar|en|es|fr|ru|zh)');
            var externalUrlRegex 	= new RegExp('^(http|https|mailto)');
            var startWithRegex	 	= new RegExp('^\/');

            if(lastPath != $attrs.href && !langRegex.test($attrs.href) && startWithRegex.test($attrs.href)){
              lastPath = $browser.baseHref() + $attrs.href.replace(/^\//, ''); 
              $attrs.$set('href', lastPath);
            };
          })
        }
      }
    };		
  }]);


  //============================================================
  //
  //
  //
  //============================================================
  app.filter('nospace', function () {
    return function (value) {
      return (!value) ? '' : value.replace(/[\s]/g, '');
    };
  });

  //============================================================
  //
  //
  //
  //============================================================
  app.filter("yesno", function () {
    return function (boolValue) {
      return boolValue ? "Yes" : "No";
    };
  });

  //============================================================
  //
  //
  //
  //============================================================
  app.filter("formatDate", ["$filter", function ($filter) {
    return function (date, formart) {
      if (formart === undefined)
        formart = 'DD MMM YYYY';

      return $filter("moment")(date, 'format',formart);
    };
  }]);

  //============================================================
  //
  //
  //
  //============================================================
  app.filter("formatDateWithTime", ["$filter", function ($filter) {
    return function (date, formart) {
      if (formart === undefined)
        formart = 'DD MMM YYYY HH:mm';

      return $filter("moment")(date, 'format',formart);
    };
  }]);

  //============================================================
  //
  //
  //
  //============================================================
  app.filter('moment', [function() {

        return function(datetime, method, arg1, arg2, arg3) {
            return moment.utc(datetime)[method](arg1, arg2, arg3);
        };
  }]);

  //============================================================
  //
  //
  //
  //============================================================
  app.filter("formatDateWithUtc", function () {
    
    return function (date, formart) {
      if (formart === undefined)
        formart = 'DD MMM YYYY';
      
      return $filter("moment")(date, 'format',formart);
      
    };
  });
  //============================================================
  //
  //
  //
  //============================================================
  app.filter("stringToJSON", function () {
    return function (strValue) {
      return JSON.parse(strValue);
    };
  });

  app.filter('range', function () {
    return function (input, total) {
      total = parseInt(total);
      for (var i = 0; i < total; i++)
        input.push(i);
      return input;
    };
  });

  //============================================================
  //
  //
  //
  //============================================================
  app.filter("languageLongName", [function () {

    return function (language) {

      if (language == "ar") return "Arabic";
      if (language == "en") return "English";
      if (language == "es") return "Spanish";
      if (language == "fr") return "French";
      if (language == "ru") return "Russian";
      if (language == "zh") return "Chinese";

      return language;
    };
  }]);
  //============================================================
  //
  //
  //
  //============================================================
  app.filter("orderPromiseBy", ["$q", "$filter", function ($q, $filter) {
    return function (promise, expression, reverse) {
      return $q.when(promise).then(function (collection) {
        return $filter("orderBy")(collection, expression, reverse);
      });
    };
  }]);

  //============================================================
  //
  //
  //
  //============================================================
  app.filter("markdown", ["$window", "htmlUtility", function ($window, html) {
    return function (srcText) {
      return srcText;
      if (!$window.marked) //if markdown is not install then return escaped html! to be safe!
        return "<div style='word-break: break-all; word-wrap: break-word; white-space: pre-wrap;'>" + html.encode(srcText) + "</div>";
      return $window.marked(srcText, {
        sanitize: true
      });
    };
  }]);

  //============================================================
  //
  //
  //
  //============================================================
  app.filter("truncate", function () {
    return function (text, maxSize, suffix) {

      if (!maxSize)
        return text;

      if (!suffix)
        suffix = "";

      if (!text)
        return "".su;

      if (text.length > maxSize)
        text = text.substr(0, maxSize) + suffix;

      return text;
    };
  });

  app.filter('groupBy', ["underscore", "$parse", function (_, $parse) {
    var cacheMap = {};
    return _.memoize(function (items, field) {
      var getter = $parse(field);
      return _.groupBy(items, function (item) {
        return getter(item);
      });
    });
  }]);
  app.filter('to_trusted', function ($sce) {
    return function (html) {
      return $sce.trustAsHtml(html);
    };
  });

  app.filter("toTrusted", function ($sce) {
    return function (value) {
      return $sce.trustAsHtml(value);
    };
  });

  //============================================================
  //
  //
  //
  //============================================================
  app.filter("term", ["$http", '$filter', 'locale', function ($http, $filter, appLocale) {
    var cacheMap = {};

    return function (term, locale) {

      if (!term)
        return "";

      if (term && angular.isString(term))
        term = {
          identifier: term
        };

      locale = locale || appLocale || "en";

      if (term.customValue)
        return $filter("lstring")(term.customValue, locale);

      if (cacheMap[term.identifier])
        return $filter("lstring")(cacheMap[term.identifier].title, locale);

      cacheMap[term.identifier] = $http.get("/api/v2013/thesaurus/terms?termCode=" + encodeURIComponent(term.identifier), {
        cache: true
      }).then(function (result) {

        cacheMap[term.identifier] = result.data;

        return $filter("lstring")(cacheMap[term.identifier].title, locale);

      }).catch(function () {

        cacheMap[term.identifier] = { title : term.identifier };

        return term.identifier;

      });
    };
  }]);


  app.filter("lstring", function () {
    return function (ltext, locale) {
      if (!ltext)
        return "";

      if (angular.isString(ltext))
        return ltext;

      var sText;

      if (!sText && locale)
        sText = ltext[locale];

      if (!sText)
        sText = ltext.en;

      if (!sText) {
        for (var key in ltext) {
          sText = ltext[key];
          if (sText)
            break;
        }
      }

      return sText || "";
    };
  });

  //============================================================
  //
  //
  //
  //============================================================
  app.filter("schemaName", ['realm', 'locale', function(realm, locale) {
    var schemas = realm.schemas();
		return function( schema ) {
			if(!schema)return schema;
      
      var result = ((schemas[schema]||{}).title||{})[locale];

      return result || schemaName[schema.toLowerCase()] || schema;//legacy

		};
	}]);

  //============================================================
	//
	//
	//
	//============================================================
	app.filter("schemaShortName", [function() {

		return function( schema ) {

			if(!schema)
				return schema;

      return schemaShortName[schema.toLowerCase()] || schema;

		};
	}]);

   //============================================================
	//
	//
	//
	//============================================================
	app.filter("urlSchemaShortName", [function() {

		return function( schema ) {

			if(!schema)
				return schema;

			if(schema.toLowerCase()=="focalpoint"				          ) return "NFP";
			if(schema.toLowerCase()=="authority"				          ) return "CNA";
			if(schema.toLowerCase()=="contact"				   	 	      ) return "CON";
			if(schema.toLowerCase()=="database"				   	 	      ) return "NDB";
			if(schema.toLowerCase()=="resource"				   	 	      ) return "VLR";
			if(schema.toLowerCase()=="organization"			   	      ) return "ORG";
			if(schema.toLowerCase()=="measure" 				   	        ) return "MSR";
			if(schema.toLowerCase()=="abscheckpoint"			        ) return "CP";
			if(schema.toLowerCase()=="abscheckpointcommunique" 	  ) return "CPC";
			if(schema.toLowerCase()=="abspermit"				          ) return "IRCC";
      if(schema.toLowerCase()=="statement"				          ) return "ST";
      if(schema.toLowerCase()=="notification"			   	      ) return "NT";
      if(schema.toLowerCase()=="meeting"					          ) return "MT";
      if(schema.toLowerCase()=="pressrelease"				        ) return "PR";
      if(schema.toLowerCase()=="meetingdocument"    		    ) return "MTD";
			if(schema.toLowerCase()=="news"		                    ) return "NEWS";
			if(schema.toLowerCase()=="new"		                    ) return "NEW";
			if(schema.toLowerCase()=="absnationalreport"		      ) return "NR";
			if(schema.toLowerCase()=="modelcontractualclause"	    ) return "A19A20";
			if(schema.toLowerCase()=="communityprotocol"		      ) return "CPP";
			if(schema.toLowerCase()=="capacitybuildinginitiative" ) return "CBI";
			if(schema.toLowerCase()=="capacitybuildingresource"   ) return "CBR";
			if(schema.toLowerCase()=="endorsement"				        ) return "EDR";

      return schema;
		};
	}]);

  //============================================================
	//
	//
	//
	//============================================================
	app.filter("mapSchema", [function() {

		return function( schema ) {
			if(!schema)
				return schema;

			if(schema.toUpperCase()=="NEW"				      ) return "new";
			if(schema.toUpperCase()=="NEWS"				      ) return "news";
      if(schema.toUpperCase()=="NFP"				      ) return "focalPoint";
			if(schema.toUpperCase()=="CNA"				    	) return "authority";
			if(schema.toUpperCase()=="CON"				    	) return "contact";
			if(schema.toUpperCase()=="NDB"				    	) return "database";
			if(schema.toUpperCase()=="VLR"				    	) return "resource";
			if(schema.toUpperCase()=="ORG"			        ) return "organization";
			if(schema.toUpperCase()=="MSR" 				    	) return "measure";
			if(schema.toUpperCase()=="CP"			          ) return "absCheckpoint";
			if(schema.toUpperCase()=="CPC"              ) return "absCheckpointCommunique";
			if(schema.toUpperCase()=="IRCC"				    	) return "absPermit";
      if(schema.toUpperCase()=="ST"				        ) return "statement";
      if(schema.toUpperCase()=="NT"			          ) return "notification";
      if(schema.toUpperCase()=="MT"				        ) return "meeting";
      if(schema.toUpperCase()=="PR"			          ) return "pressRelease";
			if(schema.toUpperCase()=="NR"						    ) return "absNationalReport";
			if(schema.toUpperCase()=="A19A20"				    ) return "modelContractualClause";
			if(schema.toUpperCase()=="CPP"				    	) return "communityProtocol";
			if(schema.toUpperCase()=="RAT"				    	) return "parties";
			if(schema.toUpperCase()=="CBI"				    	) return "capacityBuildingInitiative";
			if(schema.toUpperCase()=="CBR"				    	) return "capacityBuildingResource";
			if(schema.toUpperCase()=="EDR"						  ) return "endorsement";

			return schema;
		};
	}]);

});
