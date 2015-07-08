
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
			return false;


			for(var i=0; i>arr.count(); i++) {
				if(arr[i] == str)
					return true;
			}

			return false;


	}


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

                document = storage.documents.get(term.identifier, {info:""});

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

                var unique = 'ABSCH-' + $filter("schemaShortName")($filter("lowercase")(document.type||document.schema_s||document.schema)) +
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
			if(schame.toLowerCase()=="contact"					) return "Contact";
			if(schame.toLowerCase()=="database"					) return "National Website or Database";
			if(schame.toLowerCase()=="resource"					) return "Virtual Library Resource";
			if(schame.toLowerCase()=="organization"				) return "Organization";
			if(schame.toLowerCase()=="measure" 					) return "Legislative, Administrative or Policy Measures";
			if(schame.toLowerCase()=="abscheckpoint"			) return "Checkpoint";
			if(schame.toLowerCase()=="abscheckpointcommunique"	) return "Checkpoint Communiqué";
			if(schame.toLowerCase()=="abspermit"				) return "Internationally Recognized Certificate of Compliance";
            if(schame.toLowerCase()=="meetingdocument"			) return "Meeting Document";
            if(schame.toLowerCase()=="pressrelease"				) return "Press Release";
			if(schame.toLowerCase()=="news"						) return "News";
			if(schame.toLowerCase()=="absnationalreport"		) return "National Report";


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
			if(schame.toLowerCase()=="contact"					) return "Contact";
			if(schame.toLowerCase()=="database"					) return "National Websites or Databases";
			if(schame.toLowerCase()=="resource"					) return "Virtual Library Resources";
			if(schame.toLowerCase()=="organization"				) return "Organizations";
			if(schame.toLowerCase()=="measure" 					) return "Legislative, Administrative or Policy Measures";
			if(schame.toLowerCase()=="abscheckpoint"			) return "Checkpoints";
			if(schame.toLowerCase()=="abscheckpointcommunique"	) return "Checkpoint Communiqués";
			if(schame.toLowerCase()=="abspermit"				) return "Internationally Recognized Certificates of Compliance";
            if(schame.toLowerCase()=="meetingdocument"			) return "Meeting Documents";
            if(schame.toLowerCase()=="pressrelease"				) return "Press Releases";
			if(schame.toLowerCase()=="news"						) return "News";
			if(schame.toLowerCase()=="absnationalreport"		) return "National Reports";



			return schame;
		};
	}]);

	//============================================================
	//
	//
	//
	//============================================================
	app.filter("schemaIcon", [function() {

		return function( schema ) {

			if(!schema)
				return schema;

			if(schema.toLowerCase()=="focalpoint" 				||	schema.toLowerCase()=="nfp"	) return "account_box";
			if(schema.toLowerCase()=="authority"  				||	schema.toLowerCase()=="cna"	) return "account_box";
			//if(schema.toLowerCase()=="contact"  				||	schema.toLowerCase()=="con"	) return "Contact";
			if(schema.toLowerCase()=="database"	 				||	schema.toLowerCase()=="ndb"	) return "folder";
			if(schema.toLowerCase()=="resource"	  				||	schema.toLowerCase()=="vlr"	) return "insert_drive_file";
			//if(schema.toLowerCase()=="organization"  			||	schema.toLowerCase()=="org"	) return "Organization";
			if(schema.toLowerCase()=="measure" 	  				||	schema.toLowerCase()=="msr"	) return "stars";
			if(schema.toLowerCase()=="abscheckpoint" 			||	schema.toLowerCase()=="cp"	) return "verified_user";
			if(schema.toLowerCase()=="abscheckpointcommunique"  ||	schema.toLowerCase()=="cpc"	) return "message";
			if(schema.toLowerCase()=="abspermit"  				||	schema.toLowerCase()=="ircc") return "bookmark";
			if(schema.toLowerCase()=="absnationalreport" 		||	schema.toLowerCase()=="nr"	) return "folder";
			//if(schema.toLowerCase()=="meetingdocument" 		||	schema.toLowerCase()=="nfp"	) return "Meeting Document";
			//if(schema.toLowerCase()=="pressrelease"	 		||	schema.toLowerCase()=="nfp"	) return "Press Release";
			//if(schema.toLowerCase()=="news"		 			||	schema.toLowerCase()=="nfp"	) return "News";

			return schema;
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
			if(schame.toLowerCase() =="absnationalreport"		) return "NR";


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

			if(schame.toLowerCase()=="focalpoint"				) return "FP";
			if(schame.toLowerCase()=="authority"				) return "CNA";
			if(schame.toLowerCase()=="contact"				   	) return "CON";
			if(schame.toLowerCase()=="database"				   	) return "NDB";
			if(schame.toLowerCase()=="resource"				   	) return "VLR";
			if(schame.toLowerCase()=="organization"			   	) return "ORG";
			if(schame.toLowerCase()=="measure" 				   	) return "MSR";
			if(schame.toLowerCase()=="abscheckpoint"			) return "CP";
			if(schame.toLowerCase()=="abscheckpointcommunique" 	) return "CPC";
			if(schame.toLowerCase()=="abspermit"				) return "IRCC";
            if(schame.toLowerCase()=="statement"				) return "ST";
        	if(schame.toLowerCase()=="notification"			   	) return "NT";
        	if(schame.toLowerCase()=="meeting"					) return "MT";
        	if(schame.toLowerCase()=="pressrelease"				) return "PR";
			if(schame.toLowerCase()=="news"						) return "NWS";
			if(schame.toLowerCase()=="absnationalreport"		) return "NR";

			if(schame.toUpperCase()=="NWS"				        ) return "news";
            if(schame.toUpperCase()=="FP"				        ) return "focalPoint";
			if(schame.toUpperCase()=="CNA"				    	) return "authority";
			if(schame.toUpperCase()=="CON"				    	) return "contact";
			if(schame.toUpperCase()=="NDB"				    	) return "database";
			if(schame.toUpperCase()=="VLR"				    	) return "resource";
			if(schame.toUpperCase()=="ORG"			        	) return "organization";
			if(schame.toUpperCase()=="MSR" 				    	) return "measure";
			if(schame.toUpperCase()=="CP"			           	) return "absCheckpoint";
			if(schame.toUpperCase()=="CPC"                    	) return "absCheckpointCommunique";
			if(schame.toUpperCase()=="IRCC"				    	) return "absPermit";
            if(schame.toUpperCase()=="ST"				        ) return "statement";
        	if(schame.toUpperCase()=="NT"			            ) return "notification";
        	if(schame.toUpperCase()=="MT"				        ) return "meeting";
        	if(schame.toUpperCase()=="PR"			            ) return "pressRelease";
			if(schame.toUpperCase()=="NR"						) return "absNationalReport";

			return schame;
		};
	}]);


});
