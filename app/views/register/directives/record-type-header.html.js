define(['app',
	'/app/views/forms/edit/editFormUtility.js',
	'/app/views/forms/edit/field-embed-contact.directive.js',
	'/app/views/forms/edit/edit-contact-base.directive.js',
	'/app/views/forms/view/view-contact-reference.directive.js',
	'/app/views/forms/view/view-organization-reference.directive.js',
	'/app/views/forms/view/record-loader.directive.html.js',
	'/app/views/forms/view/view-organization.directive.js',
	'/app/views/forms/view/view-organization-reference.directive.js',
	'/app/views/directives/task-id-directive.html.js',
	'/app/views/directives/user-details.directive.html.js'
], function (app) {

	"use strict";

	app.directive("recordTypeHeader", [function () {
		return {
			restrict: "EA",
			templateUrl: "/app/views/register/directives/record-type-header.html",
			replace: true,
			transclude: false,
			scope: {},
			controller: ["$rootScope", "$scope", "$routeParams", "$filter", "$route",
			 function ($rootScope, $scope, $routeParams, $filter, $route) {

				var document_types = {

					absNationalReport: {
						abbreviation: 'NR',
						schemaType: "nationalRecords",
						title: 'Interim national report on the implementation of the Nagoya Protocol',
					},
					measure: {
						abbreviation: 'MSR',
						schemaType: "nationalRecords",
						title: 'Legislative, administrative or policy measures on access and benefit-sharing',

					},
					authority: {
						abbreviation: 'CNA',
						schemaType: "nationalRecords",
						title: 'Competent National Authority',

					},
					absPermit: {
						abbreviation: 'IRCC',
						schemaType: "nationalRecords",
						title: 'Permit or its equivalent constituting an internationally recognized certificate of compliance',

					},
					absCheckpoint: {
						abbreviation: 'CP',
						title: 'Checkpoint',
						schemaType: "nationalRecords",

					},
					absCheckpointCommunique: {
						abbreviation: 'CPC',
						schemaType: "nationalRecords",
						title: 'Information for the Checkpoint Communiqué',

					},
					resource: {
						abbreviation: 'VLR',
						schemaType: "referenceRecords",
						title: 'Virtual Library Record',

					},
					database: {
						abbreviation: 'NDB',
						schemaType: "nationalRecords",
						title: 'ABS National Website or Database',

					},
					contact: {
						abbreviation: 'CON',
						schemaType: "nationalRecords",
						title: 'Contact'
					},
					modelContractualClause: {
						abbreviation: 'A19A20',
						schemaType: "referenceRecords",
						title: 'Model Contractual Clauses, Codes of Conduct, Guidelines, Best Practices and/or Standards ',

					},
					communityProtocol: {
						abbreviation: 'CPP',
						schemaType: "referenceRecords",
						title: 'Community protocols and procedures and customary laws',

					},
					capacityBuildingInitiative: {
						abbreviation: 'CBI',
						schemaType: "referenceRecords",
						title: 'Capacity-building Initiative',
					},
					capacityBuildingResource: {
						abbreviation: 'CBR',
						schemaType: "referenceRecords",
						title: 'Capacity-building Resource',
					},
					endorsement: {
						abbreviation: 'EDR',
						schemaType: "nationalRecords",
						title: 'endorsement',

					},
					organization: {
						abbreviation: 'ORG',
						schemaType: "referenceRecords",
						title: 'organization',

					}

				};
				var documentType = $routeParams.document_type || $route.current.$$route.documentType
				$scope.type = document_types[$filter("mapSchema")(documentType)];
				$scope.document_type = documentType;
			}]

		};

	}]);
});
