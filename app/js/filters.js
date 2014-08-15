
define(["app"], function (app) {


	//============================================================
	//
	//
	//
	//============================================================
	function findString(str, arr)
	{
		if(!arr)
			return false;
		if(!str)
			return false


			for(var i=0; i>arr.count(); i++) {
				if(arr[i] == str)
					return true;
			}

			return false;


	}

	//============================================================
	//
	//
	//
	//============================================================
  /*
	function lstring(ltext, locale)
	{
		if(!ltext)
			return "";

		if(angular.isString(ltext))
			return ltext;

		var sText;

		if(!sText && locale)
			sText = ltext[locale];

		if(!sText)
			sText = ltext.en;

		if(!sText) {
			for(var key in ltext) {
				sText = ltext[key];
				if(sText)
					break;
			}
		}

		return sText||"";

	}
  */
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
	app.filter("yesno", function(){
		return function(boolValue){
			return boolValue ? "Yes" :  "No";
		}
	});

	//============================================================
	//
	//
	//
	//============================================================
	app.filter("formatDate", function(){
		return function(date,formart){
			if(formart== undefined)
				formart = 'DD MMM YYYY';
			return moment(date).format(formart);
		}
	});

	//============================================================
	//
	//
	//
	//============================================================
	app.filter("formatDateWithTime", function(){
		return function(date,formart){
			if(formart== undefined)
				formart = 'MM/DD/YYYY hh:mm';
			return moment(date).format(formart);
		}
	});
	//============================================================
	//
	//
	//
	//============================================================
	app.filter("stringToJSON", function(){
		return function(strValue){
			return JSON.parse(strValue);
		}
	});

    app.filter('range', function() {
      return function(input, total) {
        total = parseInt(total);
        for (var i=0; i<total; i++)
          input.push(i);
        return input;
      };
    });

    app.filter("uniqueID", ["IStorage", '$filter', '$q', function(storage, $filter, $q) {
		var cacheMap = {};

		return function(term) {

			if(!term)
				return "";

            var document;

			if(term && angular.isString(term)){

                term = { identifier : term };
    		    if(cacheMap[term.identifier])
    			     return cacheMap[term.identifier] ;

                document = storage.documents.get(term.identifier, {info:true})

            }
            else if(term && angular.isObject(term)){

                document = term.info && term.info.metadata ? term.info : term;

                var revision = ''
                if(document.revision)
                    revision = '-' + document.revision;
                var identifier = '';
                if(term.identifier)
                    identifier = term.identifier;
                else if(document.identifier)
                    identifier = document.identifier;
                else if(document.data && document.data.identifier)
                    identifier = document.data.identifier;
                else if(document.id)
                    identifier = document.id;

                    if(identifier == '')
                        return;

                term = { identifier : identifier + revision};

        		if(cacheMap[term.identifier])
        			return cacheMap[term.identifier] ;
            }

			cacheMap[term.identifier] = $q.when(document).then(function(document) {
                if(document.data)
                    document = document.data;
                else
                    document = document;

                if(document.schema_s && (document.schema_s.toLowerCase() == "statement" || document.schema_s.toLowerCase() == "notification" ||
                    document.schema_s.toLowerCase() == "meeting" ||  document.schema_s.toLowerCase() == "pressrelease" ||
                    document.schema_s.toLowerCase() == "focalpoint")){
                        cacheMap[term.identifier] = document.identifier_s ? document.identifier_s : document.id;
                        return cacheMap[term.identifier];

                    }

                var government = ''
                if(document.government)
                    government = document.government.identifier;
                else if(document.metadata.government)
                    government = document.metadata.government;
                else if(document.body.government)
                    government = document.body.government.identifier;

                var unique = 'ABSCH-' + $filter("schemaShortName")($filter("lowercase")(document.type)) +
                        (government != '' ? '-' + $filter("uppercase")(government) : '') +
                        '-' + document.documentID + '-' + document.revision;
				cacheMap[term.identifier] = unique;

				return unique;

			}).catch(function(){

				cacheMap[term.identifier] = term.identifier;

				return term.identifier;

			});
		};
	}])

    app.filter("uniqueIDWithoutRevision", ['$filter', function($filter) {

		return function( document ) {
            var unique = $filter("uniqueID")(document);

            if(angular.isString(unique) && document)
                return unique.replace('-' + document.revision, '');

            return '';

		};
	}]);
	//============================================================
	//
	//
	//
	//============================================================
  //TODO: this is now duplicated in form-controls. It should be put somewhere else central I think
  /*
	app.filter("lstring", function() {
		return lstring;
	});
  */

	//============================================================
	//
	//
	//
	//============================================================
	app.filter("schemaName", [function() {

		return function( schame ) {

			if(schame=="focalpoint"				) return "ABS National Focal Point";
			if(schame=="authority"				) return "Competent National Authority";
			if(schame=="contact"				) return "Contact";
			if(schame=="database"				) return "National Website or Database";
			if(schame=="resource"				) return "Virtual Library Resource";
			if(schame=="organization"			) return "Organization";
			if(schame=="measure" 				) return "Legislative, Administrative or Policy Measures";
			if(schame=="abscheckpoint"			) return "Checkpoint";
			if(schame=="abscheckpointcommunique") return "Checkpoint Communiqué";
			if(schame=="abspermit"				) return "Internationally Recognized Certificate of Compliance";

			return schame;
		};
	}]);

    //============================================================
	//
	//
	//
	//============================================================
	app.filter("schemaShortName", [function() {

		return function( schame ) {

			if(schame=="focalpoint"				) return "FP";
			if(schame=="authority"				) return "CNA";
			if(schame=="contact"				) return "CON";
			if(schame=="database"				) return "NDB";
			if(schame=="resource"				) return "VLR";
			if(schame=="organization"			) return "ORG";
			if(schame=="measure" 				) return "MSR";
			if(schame=="abscheckpoint"			) return "CP";
			if(schame=="abscheckpointcommunique") return "CPC";
			if(schame=="abspermit"				) return "IRCC";
            if(schame=="statement"				) return "ST";
        	if(schame=="notification"			) return "NT";
        	if(schame=="meeting"				) return "MT";
        	if(schame=="pressrelease"			) return "PR";


			return schame;
		};
	}]);

    //============================================================
	//
	//
	//
	//============================================================
	app.filter("languageLongName", [function() {

		return function( language ) {

			if(language=="ar") return "Arabic";
			if(language=="en") return "English";
			if(language=="es") return "Spanish";
			if(language=="fr") return "French";
			if(language=="ru") return "Russian";
			if(language=="zh") return "Chinese";

			return language;
		};
	}]);
	//============================================================
	//
	//
	//
	//============================================================
	app.filter("orderPromiseBy", ["$q", "$filter", function($q, $filter) {
		return function(promise, expression, reverse) {
			return $q.when(promise).then(function(collection){
				return $filter("orderBy")(collection, expression, reverse);
			});
		};
	}]);

	//============================================================
	//
	//
	//
	//============================================================
	app.filter("markdown", ["$window", "htmlUtility", function($window, html) {
		return function(srcText) {
			return srcText;
			if (!$window.marked)//if markdown is not install then return escaped html! to be safe!
				return "<div style='word-break: break-all; word-wrap: break-word; white-space: pre-wrap;'>"+html.encode(srcText)+"</div>";
			return $window.marked(srcText, { sanitize: true });
		};
	}]);

	//============================================================
	//
	//
	//
	//============================================================
  //TODO: this is now in form-controls.
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
		};
	});
});
