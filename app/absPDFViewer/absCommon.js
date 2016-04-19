var app = angular.module('appCommon',[]);

app.directive("viewContact", [function () {
	return {
			restrict   : "EAC",
			templateUrl: "../views/forms/view/view-contact.directive.html",
			replace    : true,
			transclude : false,
			scope: {
				document: "=ngModel",
				locale: "=",
				target: "@linkTarget"
			},
			controller: [function () {
			}]
		};
	}]);

app.directive("viewContactReference", [function () {
	return {
		restrict: "EAC",
		templateUrl: "../views/forms/view/view-contact-reference.directive.html",
		replace: true,
		transclude: false,
		scope: {
			model: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		controller: ["$scope","$http","$filter", function ($scope,$http,$filter) {
            
           	//========================================
            $scope.$watch("model", function(newVal) {
				
                if(!newVal)
					return;
           
                $http.get('/api/v2013/documents/' +  $scope.model.identifier,  {}).success(function(data){
                    $scope.document = data;
                });
                
                $scope.uid = $filter("uniqueID")($scope.document);
               
            });
            
            //========================================
             $scope.isCNA = function() {

				var doc = $scope.document;

				if(!doc)
					return false;

                if(doc.header.schema==='authority') {
                    doc.type = "CNA";
                    return true;
                }

				return false;
			};
            
            //========================================
			$scope.isPerson = function() {

				var doc = $scope.document;

				if(!doc)
					return false;

				if(doc.type=="person")
					return true;

				if(!doc.type && (document.firstName || document.lastName))
					return true; //default behaviour

				return false;
			};

            //========================================
			$scope.isOrganization = function() {

				return !$scope.isPerson();
			};
		}]
	};
}]);


app.filter("lstring", function() {
	return lstring;
});

app.filter("yesno", function(){
	return function(boolValue){
		return boolValue ? "Yes" :  "No";
	}
});

app.filter("renderhtml", function(){
	return function(html_code){
		return html_code;
		//return $sce.trustAsHtml(html_code);
	}
});

app.filter("formatDate", function(){
	return function(date,formart){
		if(formart== undefined)
			formart = 'MMMM Do YYYY';
		return moment.utc(date).format(formart);
	}
});

app.filter("term", ["$http", function($http) {
		var cacheMap = {};

		return function(term, locale) {

			if(!term)
				return "";

			if(term && angular.isString(term))
				term = { identifier : term };

			locale = locale||"en";

			if(term.customValue)
				return lstring(term.customValue, locale);

			if(cacheMap[term.identifier])
				return lstring(cacheMap[term.identifier].title, locale) ;

			cacheMap[term.identifier] = $http.get("/api/v2013/thesaurus/terms/"+encodeURI(term.identifier),  {cache:true}).then(function(result) {

				cacheMap[term.identifier] = result.data;

				return lstring(cacheMap[term.identifier].title, locale);

			}).catch(function(){

				cacheMap[term.identifier] = term.identifier;

				return term.identifier;

			});
		};
}]);


//============================================================
//
//
//
//============================================================
app.filter("formatDate", function(){
	return function(date,formart){
		//if(formart== undefined)
			formart = 'DD MMM YYYY';
		return moment.utc(date).format(formart);
	}
});

//============================================================
//
//
//
//============================================================
app.filter("formatDateWithTime", function(){
	return function(date,formart){
		//if(formart== undefined)
			formart = 'DD MMM YYYY hh:mm';
		return moment.utc(date).format(formart);
	}
});


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
	//============================================================
	//
	//
	//
	//============================================================
	app.filter("formatDate", function(){
		return function(date,formart){
			if(formart== undefined)
				formart = 'DD MMM YYYY';
			return moment.utc(date).format(formart);
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
				formart = 'DD MMM YYYY hh:mm';
			return moment.utc(date).format(formart);
		}
	});

app.filter("uniqueID", ['$filter', '$q','$http', function( $filter, $q, $http) {
		var cacheMap = {};

		return function(term, revision) {

			if(!term)
				return "";

			var document;

			if(term && term.identifier){
				if(cacheMap[term.identifier + (revision ? '_revision':'')])
					return cacheMap[term.identifier+ (revision ? '_revision':'')] ;

				document = $http.get('/api/v2013/documents/' +  term.identifier +'?info=true');
			}


			if(!document)
				return;

			cacheMap[term.identifier+ (revision ? '_revision':'')] = $q.when(document).then(function(document) {

				document = document.data;

				var government = ''
				if(document.government)
					government = document.government.identifier;
				else if(document.metadata && document.metadata.government)
					government = document.metadata.government;
				else if(document.body && document.body.government)
					government = document.body.government.identifier;

				var unique = 'ABSCH' + (document.realm.toUpperCase().replace('ABS','').replace('-','')) + '-' + $filter("schemaShortName")($filter("lowercase")(document.type)) +
						(government != '' ? '-' + $filter("uppercase")(government) : '') +
						'-' + document.documentID + (revision ? ('-' + document.revision) : '');


				cacheMap[term.identifier+ (revision ? '_revision':'')] = unique;

				return unique;

			}).catch(function(){

				cacheMap[term.identifier+ (revision ? '_revision':'')] = term.identifier;

				return term.identifier;

			});
		};
	}]);
    
    
    //============================================================
    app.filter("uniqueID", ["$http", '$filter', '$q',
	 						function($http, $filter, $q) {
		var cacheMap = {};

		return function(term) {

			if(!term)
				return "";

            var document;

			if(term && angular.isString(term)){

                term = { identifier : term };
    		    if(cacheMap[term.identifier])
    			     return cacheMap[term.identifier] ;

                document = $http.get('/api/v2013/documents/' +  term.identifier +'?info=true');

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

            if(!document)
                return;

			cacheMap[term.identifier] = $q.when(document).then(function(document) {

                if(document.data)
                    document = document.data;
                else
                    document = document;

                if(document.schema_s && (document.schema_s.toLowerCase() == "statement" || document.schema_s.toLowerCase() == "notification" ||  document.schema_s.toLowerCase() == "news" ||
                    document.schema_s.toLowerCase() == "meeting" ||  document.schema_s.toLowerCase() == "pressrelease" ||  document.schema_s.toLowerCase() == "new" ||
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

                var unique = 'ABSCH' + 
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
			
            return '';

		};
	}]);

        //==================================================================================
        this.hexToInteger = function(hex) {
            if (hex && hex.length == 24)
                return parseInt(hex.substr(15, 9), 16);

            return hex;
        }
        //==================================================================================
        this.integerToHex = function(d, schema) {
            var schemaCode = '';
            if (_.contains(["pressrelease", "statement", "news", "new", "pr", "st", "news", "new"], schema.toLowerCase()))
                schemaCode = "52000000cbd0180000000000";
            else if (schema.toLowerCase() == "notification" || schema.toLowerCase() == "nt")
                schemaCode = "52000000cbd0120000000000";
            else if (schema.toLowerCase() == "meeting" || schema.toLowerCase() == "mt")
                schemaCode = "52000000cbd0050000000000";
            else if (schema.toLowerCase() == "focalpoint" || schema.toLowerCase() == "nfp")
                schemaCode = "52000000cbd0220000000000";

            if (schemaCode == '')
                return d;

            var hex = Number(d).toString(16);
            hex = schemaCode.substr(0, 24 - hex.length) + hex;

            return hex;
        }

app.filter("schemaShortName", [function() {

	return function( schame ) {

		if(schame.toLowerCase() =="focalpoint"				  ) return "NFP";
		if(schame.toLowerCase() =="authority"				  ) return "CNA";
		if(schame.toLowerCase() =="contact"					  ) return "CON";
		if(schame.toLowerCase() =="database"				  ) return "NDB";
		if(schame.toLowerCase() =="resource"				  ) return "VLR";
		if(schame.toLowerCase() =="organization"			  ) return "ORG";
		if(schame.toLowerCase() =="measure" 				  ) return "MSR";
		if(schame.toLowerCase() =="abscheckpoint"			  ) return "CP";
		if(schame.toLowerCase() =="abscheckpointcommunique"	  ) return "CPC";
		if(schame.toLowerCase() =="abspermit"				  ) return "IRCC";
		if(schame.toLowerCase() =="statement"				  ) return "ST";
		if(schame.toLowerCase() =="notification"			  ) return "NT";
		if(schame.toLowerCase() =="meeting"					  ) return "MT";
		if(schame.toLowerCase() =="pressrelease"			  ) return "PR";
		if(schame.toLowerCase() =="meetingdocument"    		  ) return "MTD";
		if(schame.toLowerCase() =="capacitybuildinginitiative") return "CBI";
		if(schame.toLowerCase() =="capacitybuildingresource"  ) return "CBR";


		return schame;
	};
}]);



app.directive("permit", [function () {
	return {
			restrict   : "EAC",
			templateUrl: "absPermit-directive.html",
			scope: {
				documentId: "="
			},
			controller: ['$scope','$http','$location','$filter',
				function($scope,$http,$location, $filter) {

				var sLocale      = "en";
				$scope.locale = sLocale;

				$scope.load = function(){
					$http.get('/api/v2013/documents/' +  $scope.documentId, { }).success(function(data){

							$scope.document = data;
							var usageDetails = []

							if($scope.document.usage){
								$scope.document.usage.forEach(function(usage){

									$scope.getTerm(usage.identifier).success(function(data){
															usageDetails.push( data);
														});
								});
							}
							$scope.document.usage = usageDetails;
							$scope.getTerm($scope.document.government.identifier)
								.success(function(data){
										$scope.document.government = data;
									});
					});

					$http.get('/api/v2013/documents/'+$scope.documentId+'/versions?body=true&cache=true')
								.success(function(data){
										$scope.versions  = data.Items;
										console.log(data);
					});

					$http.get('/api/v2013/documents/' +  $scope.documentId + '?info', { }).success(function(data){
							$scope.documentInfo = data;
					});
				}
				$scope.renderHtml = function(html_code)
				{
					//console.log(($filter("lstring")(html_code,$scope.locale)))
					return ($filter("lstring")(html_code,$scope.locale));
				};

				$scope.$watch('documentId', function(newVal,oldVal){
					if(newVal)
						$scope.load();
				})

				$scope.getTerm = function(identifier)
				{
					return	 $http.get('/api/v2013/thesaurus/terms/' +  identifier, { });
				}

			}]
		};
	}]);
