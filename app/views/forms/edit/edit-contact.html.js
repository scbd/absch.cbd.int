define(['app', '/app/views/forms/edit/edit.js',
		"/app/views/forms/view/view-contact.directive.js"
], function(app) {

    app.controller("editContact", ["$scope", "$http", "$filter", "$controller", "$location", "$q", 'IStorage',
	function($scope, $http, $filter, $controller, $location, $q, storage) {
        $controller('editController', {
            $scope: $scope
        });

		$scope.doc = {};
        $scope.path = $location.path();
        _.extend($scope.options, {
            organizationTypes: function() {
                return $http.get("/api/v2013/thesaurus/domains/Organization%20Types/terms", {
                    cache: true
                }).then(function(o) {
                    return o.data;
                });
            },
			addressCountries         : function() {
				return $http.get("/api/v2013/thesaurus/domains/countries/terms",            { cache: true })
						.then(function(o){ return $filter("orderBy")(o.data, "name"); });
			},
			organizationTypes : function() {
				return $q.all([$http.get("/api/v2013/thesaurus/domains/Organization%20Types/terms", { cache: true })
						,$http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",   { cache: true })])
				.then(function(o){
					var orgs = o[0].data;
					orgs.push(o[1].data);
					return orgs;
				});
			}
		}) ;

        $scope.setDocument({
            type : 'person'
        });


        //==================================
        //
        //==================================
        $scope.getCleanDocument = function(document) {

            document = document || $scope.document;

            if (!document)
                return undefined;

            document = angular.fromJson(angular.toJson(document));

			document.source = undefined;
            if (/^\s*$/g.test(document.firstName)) document.firstName = undefined;
            if (/^\s*$/g.test(document.middleName)) document.middleName = undefined;
            if (/^\s*$/g.test(document.lastName)) document.lastName = undefined;
            if (/^\s*$/g.test(document.notes)) document.notes = undefined;

            return document;
        };

		$scope.$watch("document.websites", function(){

			var doc_websites = ($scope.document ? $scope.document.websites : []);
			var doc_urls = _.compact(_.pluck(doc_websites||[], "url"));
			var    _urls = _.compact($scope.doc._urls||[]);

			if(!_.isEqual(doc_urls, _urls)) {
				$scope.doc._urls = doc_urls;
			}
		});

		$scope.$watch("doc._urls", function(){

			var doc_websites = ($scope.document ? $scope.document.websites : []);
			var doc_urls = _.compact(_.pick(doc_websites||[], "url"));
			var    _urls = _.compact($scope.doc._urls||[]);

			if(!_.isEqual(doc_urls,  _urls) && $scope.document) {
				$scope.document.websites = _.map(_urls, function(url){
					return { url : url };
				});
			}
		});

		$scope.$watch('document.organizationType', function(newValue){
			if(newValue && newValue.identifier!='5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'){
				if(document.organizationType && document.organizationType.customValue)
					document.organizationType.customValue = undefined;
			}
		});

		$scope.$watch('document.contactOrganization', function(newValue){
			if(newValue ){
				document.address	= undefined;
				document.city		= undefined;
				document.state		= undefined;
				document.postalCode	= undefined;
				document.country	= undefined;
			}
		});


    }]);
});

// //==================================
// //
// //==================================
// function load(identifier) {
//
// 	$scope.status = "loading";
//
// 	var qDocument = null;
//
// 	if(identifier) {
// 		qDocument = editFormUtility.load(identifier, "contact");
// 	}
// 	else {
// 		qDocument = {
// 			header: {
// 				identifier: guid(),
// 				schema   : "contact",
// 				languages: ["en"]
// 			}
// 		};
// 	}
//
// 	$q.when(qDocument).then(function(doc) {
//
// 		$scope.tab    = "edit";
// 		$scope.status = "ready";
// 		$scope.document = doc;
//
// 	}).catch(function(err) {
//
// 		$scope.onError(err.data, err.status);
// 		throw err;
//
// 	});
// }
//
//
// //==================================
// //
// //==================================
// $scope.$on("loadDocument", function(evt, info) {
//
// 	if(info.schema!="contact")
// 		return;
//
// 	load(info.identifier);
// });
//
// //==================================
// //
// //==================================
// $scope.$on("documentInvalid", function(){
// 	$scope.tab = "review";
// });
//
// //==================================
// //
// //==================================
// $scope.$watch("tab", function(tab) {
// 	if(tab == "review")
// 		validate();
// });

// //==================================
// //
// //==================================
// function validate() {
//
// 	$scope.validationReport = null;
//
// 	var oDocument = $scope.reviewDocument = $scope.getCleanDocument();
//
// 	return storage.documents.validate(oDocument).then(function(success) {
//
// 		$scope.validationReport = success.data;
// 		return !!(success.data && success.data.errors && success.data.errors.length);
//
// 	}).catch(function(error) {
//
// 		$scope.onError(error.data);
// 		return true;
//
// 	});
// }
//
// //==================================
// //
// //==================================
// $scope.isLoading = function() {
// 	return $scope.status=="loading";
// };
//
// //==================================
// //
// //==================================
// $scope.hasError = function() {
// 	return $scope.error!==null;
// };
//
// //==================================
// //
// //==================================
// $scope.isFieldValid = function(field) {
// 	if (field && $scope.validationReport && $scope.validationReport.errors)
// 		return !Enumerable.from($scope.validationReport.errors).any(function(x){return x.property==field;});
//
// 	return true;
// };
//
// //==================================
// //
// //==================================
// $scope.onError = function(error, status)
// {
// 	$scope.status = "error";
//
// 	if (status == "notAuthorized") {
// 		$scope.status = "hidden";
// 		$scope.error  = "You are not authorized to modify this record";
// 	}
// 	else if (status == 404) {
// 		$scope.status = "hidden";
// 		$scope.error  = "Record not found.";
// 	}
// 	else if (status == "badSchema") {
// 		$scope.status = "hidden";
// 		$scope.error  = "Record type is invalid.";
// 	}
// 	else if (error.Message)
// 		$scope.error = error.Message;
// 	else
// 		$scope.error = error;
// };
