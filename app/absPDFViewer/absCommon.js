
angular.directive("viewContact", [function () {
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

angular.directive("viewContactReference", [function () {
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

angular.filter("lstring", function() {
		return lstring;
	});

angular.filter("term", ["$http", function($http) {
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

	angular.filter("yesno", function(){
		return function(boolValue){
			return boolValue ? "Yes" :  "No";
		}
	});

	angular.filter("formatDate", function(){
		return function(date,formart){
			if(formart== undefined)
				formart = 'MMMM Do YYYY';
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
	angular.filter("formatDate", function(){
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
	angular.filter("formatDateWithTime", function(){
		return function(date,formart){
			if(formart== undefined)
				formart = 'MM/DD/YYYY hh:mm';
			return moment(date).format(formart);
		}
	});
