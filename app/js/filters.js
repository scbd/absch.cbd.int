
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

//============================================================
    app.filter("uniqueID", ["IStorage", '$filter', '$q','commonjs', 'realm',
	 						function(storage, $filter, $q, commonjs, realm) {
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

                var government = '';
				var documentId;

				if(document.documentID)
					documentId = document.documentID;
				else if(document.id){

						if(document.id.indexOf('_')>0)
							documentId = commonjs.hexToInteger(document.id.substr(0,document.id.indexOf('_')));
						else
							documentId = commonjs.hexToInteger(document.id);
				}
				if(document.government_s)
                    government = document.government_s;
                else if(document.government)
                    government = document.government.identifier;
                else if(document.metadata && document.metadata.government)
                    government = document.metadata.government;
                else if(document.body && document.body.government)
                    government = document.body.government.identifier;

                var unique = 'ABSCH' + (realm.value.toUpperCase().replace('ABS','').replace('-','')) +
						'-' + $filter("schemaShortName")($filter("lowercase")(document.type||document.schema_s||document.schema)) +
                        '-' + (government != '' ?  $filter("uppercase")(government) : 'SCBD') +
                        '-' + documentId;
				if( document.revision)
					unique = unique + '-' + document.revision;

				cacheMap[term.identifier] = unique;

				return unique;

			}).catch(function(){

				cacheMap[term.identifier] = term.identifier;

				return term.identifier;

			});
			return cacheMap[term.identifier];
		};
	}])
//============================================================
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

//============================================================
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

		return function( schema ) {
			//return mapSchema(schema);

			if(!schema)
				return schema;
			if(schema.toLowerCase()=="focalpoint"				 ) return "National ABS Focal Point";
			if(schema.toLowerCase()=="authority"				 ) return "Competent National Authority";
			if(schema.toLowerCase()=="contact"					 ) return "Contact";
			if(schema.toLowerCase()=="database"					 ) return "National Website or Database";
			if(schema.toLowerCase()=="resource"					 ) return "Virtual Library Resource";
			if(schema.toLowerCase()=="organization"				 ) return "Organization";
			if(schema.toLowerCase()=="measure" 					 ) return "Legislative, Administrative or Policy Measures";
			if(schema.toLowerCase()=="abscheckpoint"			 ) return "Checkpoint";
			if(schema.toLowerCase()=="abscheckpointcommunique"	 ) return "Checkpoint Communiqué";
			if(schema.toLowerCase()=="abspermit"				 ) return "Internationally Recognized Certificate of Compliance";
            if(schema.toLowerCase()=="meetingdocument"			 ) return "Meeting Document";
            if(schema.toLowerCase()=="pressrelease"				 ) return "Press Release";
			if(schema.toLowerCase()=="news"						 ) return "News";
			if(schema.toLowerCase()=="new"						 ) return "What's New";
            if(schema.toLowerCase()=="statmente"				 ) return "Statement";
			if(schema.toLowerCase()=="absnationalreport"		 ) return "Interim National Report on the Implementation of the Nagoya Protocol";
			if(schema.toLowerCase()=="modelcontractualclause"	 ) return "Model Contractual Clauses, Codes of Conduct, Guidelines, Best Practices and/or Standards";
			if(schema.toLowerCase()=="communityprotocol"		 ) return "Community Protocol and Procedures and Customary Law";
			if(schema.toLowerCase()=="meeting"					 ) return "Meeting";
			if(schema.toLowerCase()=="notification"				 ) return "Notification";
			if(schema.toLowerCase()=="capacitybuildinginitiative") return "Capacity Building Initiative";
			if(schema.toLowerCase()=="capacitybuildingresource"  ) return "Capacity Building Resource";
			if(schema.toLowerCase()=="endorsement"				) return "Endorsements";
			// return schema;
		};
	}]);

	//============================================================
	//
	//
	//
	//============================================================
	app.filter("schemaNamePlural", [function() {

		return function( schema ) {
			if(!schema)
				return schema;

			if(schema.toLowerCase()=="focalpoint"				 ) return "National ABS Focal Points";
			if(schema.toLowerCase()=="authority"				 ) return "Competent National Authorities";
			if(schema.toLowerCase()=="contact"					 ) return "Contact";
			if(schema.toLowerCase()=="database"					 ) return "National Websites or Databases";
			if(schema.toLowerCase()=="resource"					 ) return "Virtual Library Resources";
			if(schema.toLowerCase()=="organization"				 ) return "Organizations";
			if(schema.toLowerCase()=="measure" 					 ) return "Legislative, Administrative or Policy Measures";
			if(schema.toLowerCase()=="abscheckpoint"			 ) return "Checkpoints";
			if(schema.toLowerCase()=="abscheckpointcommunique"   ) return "Checkpoint Communiqués";
			if(schema.toLowerCase()=="abspermit"				 ) return "Internationally Recognized Certificates of Compliance";
            if(schema.toLowerCase()=="meetingdocument"			 ) return "Meeting Documents";
            if(schema.toLowerCase()=="pressrelease"				 ) return "Press Releases";
			if(schema.toLowerCase()=="news"						 ) return "News";
			if(schema.toLowerCase()=="new"						 ) return "What's New";
            if(schema.toLowerCase()=="statement"			     ) return "Statement";
			if(schema.toLowerCase()=="absnationalreport"		 ) return "Interim National Reports on the Implementation of the Nagoya Protocol";
			if(schema.toLowerCase()=="modelcontractualclause"	 ) return "Model Contractual Clauses, Codes of Conduct, Guidelines, Best Practices and/or Standards";
			if(schema.toLowerCase()=="communityprotocol"		 ) return "Community Protocols and Procedures and Customary Laws";
			if(schema.toLowerCase()=="meeting"					 ) return "Meetings";
			if(schema.toLowerCase()=="notification"				 ) return "Notifications";
			if(schema.toLowerCase()=="capacitybuildinginitiative") return "Capacity-building Initiatives";
			if(schema.toLowerCase()=="capacitybuildingresource"  ) return "Capacity-building Resources";
			if(schema.toLowerCase()=="endorsement"				 ) return "Endorsements";


			return schema;
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

			if(schema.toLowerCase()=="focalpoint" 				  ||	schema.toLowerCase()=="nfp"	) return "account_box";
			if(schema.toLowerCase()=="authority"  				  ||	schema.toLowerCase()=="cna"	) return "account_box";
			if(schema.toLowerCase()=="contact"  				  ||	schema.toLowerCase()=="con"	) return "contacts";
			if(schema.toLowerCase()=="database"	 				  ||	schema.toLowerCase()=="ndb"	) return "folder";
			if(schema.toLowerCase()=="resource"	  				  ||	schema.toLowerCase()=="vlr"	) return "insert_drive_file";
			//if(schema.toLowerCase()=="organization"  			  ||	schema.toLowerCase()=="org"	) return "Organization";
			if(schema.toLowerCase()=="measure" 	  				  ||	schema.toLowerCase()=="msr"	) return "stars";
			if(schema.toLowerCase()=="abscheckpoint" 			  ||	schema.toLowerCase()=="cp"	) return "verified_user";
			if(schema.toLowerCase()=="abscheckpointcommunique"    ||	schema.toLowerCase()=="cpc"	) return "message";
			if(schema.toLowerCase()=="abspermit"  				  ||	schema.toLowerCase()=="ircc") return "bookmark";
			if(schema.toLowerCase()=="absnationalreport" 		  ||	schema.toLowerCase()=="nr"	) return "folder";
			//if(schema.toLowerCase()=="meetingdocument" 		  ||	schema.toLowerCase()=="nfp"	) return "Meeting Document";
			//if(schema.toLowerCase()=="pressrelease"	 		  ||	schema.toLowerCase()=="nfp"	) return "Press Release";
			//if(schema.toLowerCase()=="news"		 			  ||	schema.toLowerCase()=="nfp"	) return "News";
			if(schema.toLowerCase()=="modelcontractualclause" 	  ||	schema.toLowerCase()=="a19a20"	) return "folder";
			if(schema.toLowerCase()=="communityprotocol" 		  ||	schema.toLowerCase()=="cpp"	) return "folder";
			if(schema.toLowerCase()=="capacitybuildinginitiative" ||	schema.toLowerCase()=="cbi"	) return "insert_drive_file";
			if(schema.toLowerCase()=="capacitybuildingresource"   ||	schema.toLowerCase()=="cbr"	) return "insert_drive_file";
			if(schema.toLowerCase()=="endorsement" 				||	schema.toLowerCase()=="edr"	) return "folder";

			return schema;
		};
	}]);

    //============================================================
	//
	//
	//
	//============================================================
	app.filter("schemaShortName", [function() {

		return function( schema ) {

			return mapSchema(schema);
		};
	}]);

    //============================================================
	//
	//
	//
	//============================================================
	app.filter("mapSchema", [function() {

		return function( schema ) {

			return mapSchema(schema);

		};
	}]);

	function mapSchema(schema){

			if(!schema)
				return schema;

			if(schema.toLowerCase()=="focalpoint"				 ) return "NFP";
			if(schema.toLowerCase()=="authority"				 ) return "CNA";
			if(schema.toLowerCase()=="contact"				   	 ) return "CON";
			if(schema.toLowerCase()=="database"				   	 ) return "NDB";
			if(schema.toLowerCase()=="resource"				   	 ) return "VLR";
			if(schema.toLowerCase()=="organization"			   	 ) return "ORG";
			if(schema.toLowerCase()=="measure" 				   	 ) return "MSR";
			if(schema.toLowerCase()=="abscheckpoint"			 ) return "CP";
			if(schema.toLowerCase()=="abscheckpointcommunique" 	 ) return "CPC";
			if(schema.toLowerCase()=="abspermit"				 ) return "IRCC";
            if(schema.toLowerCase()=="statement"				 ) return "ST";
        	if(schema.toLowerCase()=="notification"			   	 ) return "NT";
        	if(schema.toLowerCase()=="meeting"					 ) return "MT";
        	if(schema.toLowerCase()=="pressrelease"				 ) return "PR";
            if(schema.toLowerCase()=="meetingdocument"    		 ) return "MTD";
			if(schema.toLowerCase()=="news"						 ) return "NEWS";
			if(schema.toLowerCase()=="new"						 ) return "NEW";
			if(schema.toLowerCase()=="absnationalreport"		 ) return "NR";
			if(schema.toLowerCase()=="modelcontractualclause"	 ) return "A19A20";
			if(schema.toLowerCase()=="communityprotocol"		 ) return "CPP";
			if(schema.toLowerCase()=="capacitybuildinginitiative") return "CBI";
			if(schema.toLowerCase()=="capacitybuildingresource"  ) return "CBR";
			if(schema.toLowerCase()=="endorsement"				) return "EDR";

			if(schema.toUpperCase()=="NEW"				        ) return "new";
			if(schema.toUpperCase()=="NEWS"				        ) return "news";
            if(schema.toUpperCase()=="NFP"				        ) return "focalPoint";
			if(schema.toUpperCase()=="CNA"				    	) return "authority";
			if(schema.toUpperCase()=="CON"				    	) return "contact";
			if(schema.toUpperCase()=="NDB"				    	) return "database";
			if(schema.toUpperCase()=="VLR"				    	) return "resource";
			if(schema.toUpperCase()=="ORG"			        	) return "organization";
			if(schema.toUpperCase()=="MSR" 				    	) return "measure";
			if(schema.toUpperCase()=="CP"			           	) return "absCheckpoint";
			if(schema.toUpperCase()=="CPC"                    	) return "absCheckpointCommunique";
			if(schema.toUpperCase()=="IRCC"				    	) return "absPermit";
            if(schema.toUpperCase()=="ST"				        ) return "statement";
        	if(schema.toUpperCase()=="NT"			            ) return "notification";
        	if(schema.toUpperCase()=="MT"				        ) return "meeting";
        	if(schema.toUpperCase()=="PR"			            ) return "pressRelease";
			if(schema.toUpperCase()=="NR"						) return "absNationalReport";

			if(schema.toUpperCase()=="A19A20"				    ) return "modelContractualClause";
			if(schema.toUpperCase()=="CPP"				    	) return "communityProtocol";
			if(schema.toUpperCase()=="RAT"				    	) return "parties";
			if(schema.toUpperCase()=="CBI"				    	) return "capacityBuildingInitiative";
			if(schema.toUpperCase()=="CBR"				    	) return "capacityBuildingResource";


			if(schema.toUpperCase()=="EDR"						) return "endorsement";

			return schema;
	}


	app.filter('highlight', function($sce) {
		return function(text) {
			var phrase = 'to'
			if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
			'<a ng-href="#" class="highlighted" data-toggle="tooltip" title="2334343 543543 34543543 " data-container="body">' + phrase + ' </a>')
		console.log(text);
			return $sce.trustAsHtml(text)
		}
	});

//https://github.com/HubSpot/humanize/blob/master/public/src/humanize.js
	app.filter('humanizeNumber', function() {
		return function(value) {
		    var end, leastSignificant, number, specialCase;
		    number = parseInt(value, 10);
		    if (number === 0) {
		      return value;
		    }
		    specialCase = number % 100;
		    if (specialCase === 11 || specialCase === 12 || specialCase === 13) {
		      return "" + number + "th";
		    }
		    leastSignificant = number % 10;
		    switch (leastSignificant) {
		      case 1:
		        end = "st";
		        break;
		      case 2:
		        end = "nd";
		        break;
		      case 3:
		        end = "rd";
		        break;
		      default:
		        end = "th";
		    }
		    return "" + number + end;
		};
	});
});
