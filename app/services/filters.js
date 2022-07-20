import app from '~/app';
import _ from 'lodash';
import scbdSchemas from '~/components/scbd-angularjs-services/main';
import './common';


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
    app.filter("uniqueID", ["IStorage", '$filter', '$q','commonjs', 'realm', 'appConfigService',
	 						function(storage, $filter, $q, commonjs, realm, appConfigService) {
		var cacheMap = {};

		return function(term) {

			if(!term)
				return "";

            var document;

			if(term && angular.isString(term)){

                term = { identifier : term };
    		    if(cacheMap[term.identifier])
    			     return cacheMap[term.identifier] ;
				//'include-deleted':true,
                document = storage.documents.get(term.identifier, { info:""});

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
				
				if( document.documentID === undefined && !document.id)
                    revision = "DRAFT";

                term = { identifier : identifier + revision};

        		if(cacheMap[term.identifier]){
        				return cacheMap[term.identifier] ;
				}
            }

            if(!document)
                return;

			cacheMap[term.identifier] = $q.when(document).then(function(document) {
				var isDeletedRecord = document.deletedOn!=null;
				
                if(document.data)
                    document = document.data;
                else
                    document = document;

                let government = '';
				let uIdPrefix	= realm.uIdPrefix;
				let documentId;

				if(document.documentID)
					documentId = document.documentID;
				else if(document.id){

						if(document.id.indexOf('_')>0)
							documentId = commonjs.hexToInteger(document.id.substr(0,document.id.indexOf('_')));
						else
							documentId = commonjs.hexToInteger(document.id);
				}

                if(documentId === undefined)
                    documentId = "DRAFT";

				if(document.government_s)
                    government = document.government_s;
                else if(document.government)
                    government = document.government.identifier;
                else if(document.metadata && document.metadata.government)
                    government = document.metadata.government;
                else if(document.body && document.body.government)
                    government = document.body.government.identifier;

				if(document.type == 'focalPoint')
					uIdPrefix = 'CHM';
					
				var unique = uIdPrefix +
							'-' + $filter("schemaShortName")(document.type||document.schema_s||document.schema) +
							'-' + (government != '' ?  $filter("uppercase")(government) : 'SCBD') +
							'-' + documentId;

				if(document.revision === 'draft'){
                    document.revision = "0";
                }

                if( document.revision)
					unique = unique + '-' + document.revision;

				if(isDeletedRecord)
					unique = '[DELETED] ' + unique;
					
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
	app.filter("uniqueIDWithoutRevision", ['$filter', 'commonjs', 'appConfigService',
	 function($filter, commonjs, appConfigService) {

		return function( document ) {
            var unique = $filter("uniqueID")(document);			

            if(angular.isString(unique) && document){

				if(document.header && _.includes(appConfigService.scbdSchemas, document.header.schema))
					return unique;

				return unique.substring(0,unique.lastIndexOf('-'));
			}
			// else if(angular.isString(unique) && document.identifier)
            //     return unique.substring(0,unique.lastIndexOf('-'));

            return '';

		};
	}]);



	app.filter("partyStatus", ['$q', 'commonjs',	function($q, commonjs) {
		var partyStatusMap = {};

		return function(term) {

			if(!term)
				return "";

			if (term && angular.isString(term))
                term = {
                    identifier: term
                };

			term.identifier = term.identifier.toUpperCase();

			if(partyStatusMap[term.identifier])
				return partyStatusMap[term.identifier] ;

			partyStatusMap[term.identifier] = $q.when(commonjs.getCountry(term.identifier))
			.then(function(country) {

				partyStatusMap[term.identifier] = country;
				console.log(country);
				return country;

			}).catch(function(){

				partyStatusMap[term.identifier] = term.identifier;

				return term.identifier;

			});
			return partyStatusMap[term];
		};
	}]);

	//============================================================
	//
	//
	//
	//============================================================
	app.filter("schemaNamePlural", ['realm', 'locale', '$filter', function(realm, locale, $filter) {

		return function( schemaName ) {
			if(!schemaName)return schemaName;
			
			var pluralTitle;
			var schema = realm.schemas[schemaName]||{};
			
			if(!schema)
				schema = scbdSchemas[schemaName];

			if(schema.titlePlural)
				pluralTitle = schema.titlePlural;

			if(!pluralTitle)
				pluralTitle = schema.title;

			var result = $filter('lstring')(pluralTitle, locale);

			if(!result || result == '')
				result = schemaName;//legacy

			return result;
			
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
			if(schema.toLowerCase()=="capacitybuildinginitiative" ||	schema.toLowerCase()=="cdi"	) return "insert_drive_file";
			if(schema.toLowerCase()=="capacitybuildingresource"   ||	schema.toLowerCase()=="cbr"	) return "insert_drive_file";
			if(schema.toLowerCase()=="endorsement" 				||	schema.toLowerCase()=="edr"	) return "folder";

			return schema;
		};
	}]);
	
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
	
	app.filter('unsafe', function ($sce) {
        return $sce.trustAsHtml;
    });