
define(["app",'/app/js/common.js'], function (app) {


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

    app.filter("uniqueID", ["IStorage", '$filter', '$q','commonjs', function(storage, $filter, $q, commonjs) {
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
// console.log(term);
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

            if(!document)
                return;

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
				var documentId;

				if(document.documentID)
					documentId = document.documentID;
				else if(document.id)
					documentId = commonjs.hexToInteger(document.id);

				if(document.government_s)
                    government = document.government_s;
                else if(document.government)
                    government = document.government.identifier;
                else if(document.metadata && document.metadata.government)
                    government = document.metadata.government;
                else if(document.body && document.body.government)
                    government = document.body.government.identifier;

                var unique = 'ABSCH-' + $filter("schemaShortName")($filter("lowercase")(document.type||document.schema_s)) +
                        (government != '' ? '-' + $filter("uppercase")(government) : '') +
                        '-' + documentId + '-' + document.revision;
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
                return unique.substring(0,unique.lastIndexOf('-'));
			// else if(angular.isString(unique) && document.identifier)
            //     return unique.substring(0,unique.lastIndexOf('-'));

            return '';

		};
	}]);


	app.filter("checkpointTitle", ["$http", '$filter', function($http, $filter) {
		var cacheMap = {};

		return function(term, locale) {

			if(!term)
				return "";

			if(term && angular.isString(term))
				term = { identifier : term };

			locale = locale||"en";

			if(cacheMap[term.identifier])
				return cacheMap[term.identifier].title;

			cacheMap[term.identifier] = $http.get("/api/v2013/documents/" + encodeURIComponent(term.identifier),  {cache:true}).then(function(result) {

				cacheMap[term.identifier] = result.data;

				return $filter("lstring")(cacheMap[term.identifier].title, locale);

			}).catch(function(){

				cacheMap[term.identifier] = term.identifier;

				return term.identifier;

			});
		};
	}])

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
			if(!schame)
				return schame;
			if(schame.toLowerCase()=="focalpoint"				) return "Focal Point";
			if(schame.toLowerCase()=="authority"				) return "Competent National Authority";
			if(schame.toLowerCase()=="contact"				) return "Contact";
			if(schame.toLowerCase()=="database"				) return "National Website or Database";
			if(schame.toLowerCase()=="resource"				) return "Virtual Library Resource";
			if(schame.toLowerCase()=="organization"			) return "Organization";
			if(schame.toLowerCase()=="measure" 				) return "Legislative, Administrative or Policy Measures";
			if(schame.toLowerCase()=="abscheckpoint"			) return "Checkpoint";
			if(schame.toLowerCase()=="abscheckpointcommunique") return "Checkpoint Communiqué";
			if(schame.toLowerCase()=="abspermit"				) return "Internationally Recognized Certificate of Compliance";
            if(schame.toLowerCase()=="meetingdocument"		) return "Meeting Document";
            if(schame.toLowerCase()=="pressrelease"			) return "Press Release";
			if(schame.toLowerCase()=="news"					) return "News";


			return schame;
		};
	}]);

	//============================================================
	//
	//
	//
	//============================================================
	app.filter("schemaNamePlural", [function() {

		return function( schame ) {
			if(!schame)
				return schame;
			if(schame.toLowerCase()=="focalpoint"				) return "Focal Points";
			if(schame.toLowerCase()=="authority"				) return "Competent National Authorities";
			if(schame.toLowerCase()=="contact"				) return "Contact";
			if(schame.toLowerCase()=="database"				) return "National Websites or Databases";
			if(schame.toLowerCase()=="resource"				) return "Virtual Library Resources";
			if(schame.toLowerCase()=="organization"			) return "Organizations";
			if(schame.toLowerCase()=="measure" 				) return "Legislative, Administrative or Policy Measures";
			if(schame.toLowerCase()=="abscheckpoint"			) return "Checkpoints";
			if(schame.toLowerCase()=="abscheckpointcommunique") return "Checkpoint Communiqués";
			if(schame.toLowerCase()=="abspermit"				) return "Internationally Recognized Certificates of Compliance";
            if(schame.toLowerCase()=="meetingdocument"		) return "Meeting Documents";
            if(schame.toLowerCase()=="pressrelease"			) return "Press Releases";
			if(schame.toLowerCase()=="news"					) return "News";


			return schame;
		};
	}]);

	//============================================================
	//
	//
	//
	//============================================================
	app.filter("schemaIcon", [function() {

		return function( schame ) {

			if(!schame)
				return schame;
			//if(schame.toLowerCase()=="focalpoint"				) return "ABS National Focal Point";
			if(schame.toLowerCase()=="authority"				) return "mdi-action-account-box";
			//if(schame.toLowerCase()=="contact"				) return "Contact";
			if(schame.toLowerCase()=="database"				) return "mdi-file-folder";
			if(schame.toLowerCase()=="resource"				) return "mdi-editor-insert-drive-file";
			//if(schame.toLowerCase()=="organization"			) return "Organization";
			if(schame.toLowerCase()=="measure" 				) return "mdi-action-stars";
			if(schame.toLowerCase()=="abscheckpoint"			) return "mdi-action-verified-user";
			if(schame.toLowerCase()=="abscheckpointcommunique") return "mdi-communication-message";
			if(schame.toLowerCase()=="abspermit"				) return "mdi-action-bookmark";
			//if(schame.toLowerCase()=="meetingdocument"		) return "Meeting Document";
			//if(schame.toLowerCase()=="pressrelease"			) return "Press Release";
			//if(schame.toLowerCase()=="news"					) return "News";


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

			if(!schame)
				return schame;

			if(schame.toLowerCase() =="focalpoint"				) return "FP";
			if(schame.toLowerCase() =="authority"				) return "CNA";
			if(schame.toLowerCase() =="contact"					) return "CON";
			if(schame.toLowerCase() =="database"				) return "NDB";
			if(schame.toLowerCase() =="resource"				) return "VLR";
			if(schame.toLowerCase() =="organization"			) return "ORG";
			if(schame.toLowerCase() =="measure" 				) return "MSR";
			if(schame.toLowerCase() =="abscheckpoint"			) return "CP";
			if(schame.toLowerCase() =="abscheckpointcommunique"	) return "CPC";
			if(schame.toLowerCase() =="abspermit"				) return "IRCC";
            if(schame.toLowerCase() =="statement"				) return "ST";
        	if(schame.toLowerCase() =="notification"			) return "NT";
        	if(schame.toLowerCase() =="meeting"					) return "MT";
        	if(schame.toLowerCase() =="pressrelease"			) return "PR";
            if(schame.toLowerCase() =="meetingdocument"    		) return "MTD";
			if(schame.toLowerCase() =="news"					) return "NWS";


			return schame;
		};
	}]);

    //============================================================
	//
	//
	//
	//============================================================
	app.filter("mapSchema", [function() {

		return function( schame ) {

			if(!schame)
				return schame;

			if(schame.toLowerCase()=="focalpoint"				    ) return "FP";
			if(schame.toLowerCase()=="authority"				    ) return "CNA";
			if(schame.toLowerCase()=="contact"				        ) return "CON";
			if(schame.toLowerCase()=="database"				        ) return "NDB";
			if(schame.toLowerCase()=="resource"				        ) return "VLR";
			if(schame.toLowerCase()=="organization"			        ) return "ORG";
			if(schame.toLowerCase()=="measure" 				        ) return "MSR";
			if(schame.toLowerCase()=="abscheckpoint"			    ) return "CP";
			if(schame.toLowerCase()=="abscheckpointcommunique"      ) return "CPC";
			if(schame.toLowerCase()=="abspermit"				    ) return "IRCC";
            if(schame.toLowerCase()=="statement"				    ) return "ST";
        	if(schame.toLowerCase()=="notification"			        ) return "NT";
        	if(schame.toLowerCase()=="meeting"				) return "MT";
        	if(schame.toLowerCase()=="pressrelease"			) return "PR";
			if(schame.toLowerCase() =="news"					) return "NWS";

			if(schame.toUpperCase()=="NWS"				        ) return "news";
            if(schame.toUpperCase()=="FP"				        ) return "focalPoint";
			if(schame.toUpperCase()=="CNA"				    ) return "authority";
			if(schame.toUpperCase()=="CON"				    ) return "contact";
			if(schame.toUpperCase()=="NDB"				    ) return "database";
			if(schame.toUpperCase()=="VLR"				    ) return "resource";
			if(schame.toUpperCase()=="ORG"			        ) return "organization";
			if(schame.toUpperCase()=="MSR" 				    ) return "measure";
			if(schame.toUpperCase()=="CP"			            ) return "absCheckpoint";
			if(schame.toUpperCase()=="CPC"                    ) return "absCheckpointCommunique";
			if(schame.toUpperCase()=="IRCC"				    ) return "absPermit";
            if(schame.toUpperCase()=="ST"				        ) return "statement";
        	if(schame.toUpperCase()=="NT"			            ) return "notification";
        	if(schame.toUpperCase()=="MT"				        ) return "meeting";
        	if(schame.toUpperCase()=="PR"			            ) return "pressRelease";

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

	app.filter('groupBy',["underscore","$parse",function(_,$parse) {
		var cacheMap = {};
		return _.memoize(function(items, field) {
			var getter = $parse(field);
			return _.groupBy(items, function(item) {
				return getter(item);
			});
		});
	}]);
});
