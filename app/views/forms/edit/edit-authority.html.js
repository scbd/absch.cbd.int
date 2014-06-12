define(['app', '/app/views/forms/edit/edit.js'], function (app) {

  app.controller("editAuthority", ["$scope", "authHttp", "guid", "$filter", "Thesaurus", "$q", "$location", "IStorage", "authentication", "Enumerable", "editFormUtility", "$routeParams", "$controller", function ($scope, $http, guid, $filter, Thesaurus, $q, $location, storage, authentication, Enumerable, editFormUtility, $routeParams, $controller) {
    $controller('editController', {$scope: $scope});
		
			$scope.options  = {
				countries					: function () { return $http.get("/api/v2013/thesaurus/domains/countries/terms",            { cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
				organizationTypes			: function () { return $http.get("/api/v2013/thesaurus/domains/Organization%20Types/terms", { cache: true }).then(function(o){ return o.data; }); },
				cbdSubjects					: function () { return $http.get("/api/v2013/thesaurus/domains/CBD-SUBJECTS/terms",         { cache: true }).then(function(o){ return o.data; }); },
				libraries					: function () { return $http.get("/api/v2013/thesaurus/domains/cbdLibraries/terms",         { cache: true }).then(function(o){ return o.data; }); },
				jurisdictions				: function () { return $http.get("/api/v2013/thesaurus/domains/D7BD5BDE-A6B9-4261-B788-16839CCC4F7E/terms",	{ cache: true }).then(function(o){ return o.data; }); },
				absJurisdictions			: function () { return $http.get("/api/v2013/thesaurus/domains/51A113E9-071F-440A-83DC-E3499B7C646D/terms", { cache: true }).then(function (o) { return o.data; }); },
				absGeneticResourceTypes		: function () { return $http.get("/api/v2013/thesaurus/domains/20945FA8-C24C-4AF6-B3D9-367592AFDF48/terms", { cache: true }).then(function (o) { return o.data; }); },
				absGeneticResourceAreas		: function () { return $http.get("/api/v2013/thesaurus/domains/545CD54C-CFF3-41E8-A003-FDD278426A3A/terms", { cache: true }).then(function (o) { return o.data; }); },
				cpbFunctions				: function () { return $http.get("/api/v2013/thesaurus/domains/Subject Areas/terms",        { cache: true }).then(function (o) { return o.data; }); },
				cpbOrganismTypes			: function () { return $http.get("/api/v2013/thesaurus/domains/TypeOfOrganisms/terms",      { cache: true }).then(function (o) { return o.data; }); },
				absFunctions				: function () { return $http.get("/api/v2013/thesaurus/domains/8102E184-E282-47F7-A49F-4C219B0EE235/terms", { cache: true }).then(function (o) { return o.data; }); },
				keywords					: function () { return $http.get("/api/v2013/thesaurus/domains/1A22EAAB-9BBC-4543-890E-DEF913F59E98/terms", { cache: true }).then(function (o) { return Thesaurus.buildTree(o.data); }); },
			};

			//==================================
			//
			//==================================
			$scope.getCleanDocument = function(document) {

				document = document || $scope.document;

				if (!document)
					return undefined;

				document = angular.fromJson(angular.toJson(document));

				if (!document.consentGranted) {
					document.consentInformation = undefined;
					document.consentDocuments = undefined;
				}

				if (!document.mutuallyAgreedTermsEstablished) {
					document.mutuallyAgreedTermsInformation = undefined;
					document.mutuallyAgreedTermsDocuments = undefined;
				}

				if (document.gisFiles && document.gisFiles.length===0) {
					document.gisFiles = undefined;
				}

				if (document.amendedPermits && document.amendedPermits.length===0) {
					document.amendedPermits = undefined;
				}

				if (!document.amendedPermits) {
					document.consentedAmendment = undefined;
					document.amendmentsDescription = undefined;
				}
				if (document.providerConfidential) {
					document.providers = undefined;
				}
				if (document.informedConsentConfidential) {
					document.informedConsents = undefined;
				}
				if (document.geneticResourcesConfidential) {
					document.geneticResources	= undefined;
					document.specimen			= undefined;
					document.taxonomy			= undefined;
					document.gisFiles			= undefined;
					document.gisMapCenter		= undefined;
				}

				if (/^\s*$/g.test(document.notes))
					document.notes = undefined;

				return document;
			};

    $scope.setDocument();
  }]);
});
