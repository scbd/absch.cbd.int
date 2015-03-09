
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
			document: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		controller: ["$scope", function ($scope) {

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
		return moment(date).format(formart);
	}
});

app.filter("term", ["$http", function($http) {
		var cacheMap = {};

		return function(term, locale) {

			if(!term)
				return "";

			if(term && app.isString(term))
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



function lstring(ltext, locale)
	{
		if(!ltext)
			return "";

		if(app.isString(ltext))
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

	app.filter("uniqueID", ['$filter', '$q','$http', function( $filter, $q, $http) {
			var cacheMap = {};

			return function(term) {

				if(!term)
					return "";

				var document;

				if(term ){
					if(cacheMap[term.identifier])
						return cacheMap[term.identifier] ;

					document = $http.get('/api/v2013/documents/' +  term.identifier +'?info=true');
				}


				if(!document)
					return;

				cacheMap[term.identifier] = $q.when(document).then(function(document) {

					document = document.data;

					var government = ''
					if(document.government)
						government = document.government.identifier;
					else if(document.metadata && document.metadata.government)
						government = document.metadata.government;
					else if(document.body && document.body.government)
						government = document.body.government.identifier;

					var unique = 'ABSCH-' + $filter("schemaShortName")($filter("lowercase")(document.type)) +
							(government != '' ? '-' + $filter("uppercase")(government) : '') +
							'-' + document.documentID;
					cacheMap[term.identifier] = unique;

					return unique;

				}).catch(function(){

					cacheMap[term.identifier] = term.identifier;

					return term.identifier;

				});
			};
		}]);


			app.filter("schemaShortName", [function() {

			return function( schame ) {

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


				return schame;
			};
		}]);
