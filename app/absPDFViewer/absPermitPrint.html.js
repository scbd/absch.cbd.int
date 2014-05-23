
// define(['app'], function(app){

 var app = angular.module('ngapp',[])


app.controller('printPermit', ['$scope','$http', function($scope,$http) {

	var sLocale      = "en";
	$scope.locale = sLocale;
	$scope.greeting = "hello moto1212121";
	//console.log(printPermitController);

	var params = {};
	// params            = clone(params||{});
	 params.identifier = '32E4D584-EA07-EC34-6CDF-A74E57E334F1';

	// var useCache = !!params.cache;

	// params.cache = false;

	// var oTrans = transformPath(serviceUrls.documentUrl(), params);

	$http.get('/api/v2013/documents/' +  params.identifier, { }).success(function(data){
		 	
		 	$scope.document = data;
		 	var usageDetails = []

		 	$scope.document.usage.forEach(function(usage){

				$scope.getTerm(usage.identifier).success(function(data){										
									 	usageDetails.push( data);
									 });
			});
			$scope.document.usage = usageDetails;

			$scope.getTerm($scope.document.government.identifier)
				  .success(function(data){										
					 	$scope.document.government = data;
					});
			$http.get('/api/v2013/documents/' + $scope.document.authority.identifier)
				  .success(function(data){										
					 	$scope.document.authority = data;
					 	$scope.getTerm($scope.document.authority.government.identifier)
						  .success(function(data){										
							 	$scope.document.authority.government = data;
							});
					});
			console.log(data);
	});


	$http.get('/api/v2013/documents/' +  params.identifier + '?info', { }).success(function(data){
		 	console.log(data	);
		 	$scope.documentInfo = data;
	});
					//TODO: return result.data;

	

	$scope.getTerm = function(identifier)
	{
			//console.log($http.get('/api/v2013/thesaurus/terms/' +  identifier, { }));
		return	 $http.get('/api/v2013/thesaurus/terms/' +  identifier, { });
		// .success(function(data){	
		// 	//console.log(data);
		//  	return data;
		//  });


	}
				

}]);



app.filter("lstring", function() {
		return lstring;
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