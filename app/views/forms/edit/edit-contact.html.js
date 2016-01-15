define(['app', '/app/views/forms/edit/edit.js',
		"/app/views/forms/edit/edit-contact-base.directive.js",
		"/app/views/forms/view/view-contact.directive.html"
], function(app) {

    app.controller("editContact", ["$scope", "$http", "$filter", "$controller", "$location", function($scope, $http, $filter, $controller, $location) {
        $controller('editController', {
            $scope: $scope
        });
        $scope.path = $location.path();
        $scope.options = {
            countries: function() {
                return $http.get("/api/v2013/thesaurus/domains/countries/terms", {
                    cache: true
                }).then(function(o) {
                    return $filter("orderBy")(o.data, "name");
                });
            },
            organizationTypes: function() {
                return $http.get("/api/v2013/thesaurus/domains/Organization%20Types/terms", {
                    cache: true
                }).then(function(o) {
                    return o.data;
                });
            }
        };

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
