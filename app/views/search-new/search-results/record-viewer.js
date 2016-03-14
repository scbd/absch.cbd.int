/* global . */
define(['app', 'underscore', '/app/js/common.js',
	'scbd-angularjs-filters',
	'/app/views/forms/view/view-history-directive.html.js',
    '/app/views/directives/document-metadata-directive.html.js',
	'/app/views/directives/report-record.js'
], function(app, _) {

    app.directive('recordViewer', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            templateUrl: '/app/views/search-new/search-results/record-viewer.html',
            scope: {
                docId:'=',
                docSchema:'='
            },

           controller: ['$scope', "$route", 'IStorage', "authentication", "$q", "$location", "commonjs","$timeout",
		"$filter","$http","$http","realm", "$element", '$compile',
			function ($scope, $route, storage, authentication, $q, $location,
				commonjs, $timeout, $filter, $http, $httpAWS, realm, $element, $compile) {

              var schemaMapping = {
					news 				: '/app/views/forms/view/view-news.directive.html.js',
	  				new 				: '/app/views/forms/view/view-new.directive.html.js',
					absNationalReport 	: '/app/views/forms/view/view-abs-national-report.directive.js',
					absCheckpoint		: '/app/views/forms/view/view-abs-checkpoint.directive.js',
				    absCheckpointCommunique: '/app/views/forms/view/view-abs-checkpoint-communique.directive.js',
				    absPermit			:	'/app/views/forms/view/view-abs-permit.directive.js',
				    authority			: '/app/views/forms/view/view-authority.directive.js',
				    authorityReference	:'/app/views/forms/view/view-authority-reference.directive.js',
				    contact				:'/app/views/forms/view/view-contact.directive.js',
				    contactReference	:'/app/views/forms/view/view-contact-reference.directive.js',
				    database			:'/app/views/forms/view/view-database.directive.js',
				    measure				:'/app/views/forms/view/view-measure.directive.js',
				    organization		:'/app/views/forms/view/view-organization.directive.js',
				    organizationReference:'/app/views/forms/view/view-organization-reference.directive.js',
				    resource			:'/app/views/forms/view/view-resource.directive.js',
				    focalPoint			:'/app/views/forms/view/view-focalpoint.directive.html.js',
				    meeting				:'/app/views/forms/view/view-meeting.directive.html.js',
				    statement			:'/app/views/forms/view/view-statement.directive.html.js',
				    pressRelease		:'/app/views/forms/view/view-pressrelease.directive.html.js',
				    notification		:'/app/views/forms/view/view-notification.directive.html.js',
					capacityBuildingInitiative : '/app/views/forms/view/view-capacity-building-initiative.directive.js',
					capacityBuildingResource   : '/app/views/forms/view/view-capacity-building-resource.directive.js'
				}


                //*************************************************************************************************************************************
                $scope.loadDocument = function(documentSchema, documentID){
                        if(documentSchema && (documentSchema.toUpperCase()=="FOCALPOINT" || documentSchema.toUpperCase()=="MEETING" || documentSchema.toUpperCase()=="NOTIFICATION"
                        || documentSchema.toUpperCase()=="PRESSRELEASE" || documentSchema.toUpperCase()=="STATEMENT" || documentSchema.toUpperCase()=="NEWS"))
                        {
                            commonjs.getReferenceRecordIndex(documentSchema,documentID).then(function(data){
                                $scope.internalDocument = data.data;
                            });
                            loadViewDirective(documentSchema);
                        }
                        else if (documentID){
                            $scope.load(documentID);
                        }
                 };

                //*************************************************************************************************************************************
                $scope.load = function (identifier, version) {

                    $scope.error = undefined;
					$scope.loading = true;

                    var qDocument;
                    var qDocumentInfo;

                    qDocument = storage.documents.get(identifier).then(function(result) { return result.data || result });
                    qDocumentInfo = storage.documents.get(identifier,{ info: true}).then(function(result) { return result.data || result });

                    $q.all([qDocument, qDocumentInfo]).then(function(results) {
                        $scope.internalDocument     = results[0];
                        $scope.internalDocumentInfo = results[1];
                        $scope.internalDocument.info = results[1];
                        $scope.documentVersionCount = $scope.internalDocumentInfo.revision
                        $scope.revisionNo  = $scope.documentVersionCount
                        loadViewDirective($scope.internalDocument.header.schema);
                    }).then(null, function(error) {
                        //debugger;
                        // $scope.error = error.Message || error || "Http Error: " + errorCode;
                        console.log( $scope.error );
                    })
					.finally(function(){
						$scope.loading = false;
					})
                };

                //*************************************************************************************************************************************
                function loadViewDirective(schema){
					if(schema.toLowerCase() == 'modelcontractualclause' || schema.toLowerCase() == 'communityprotocol')
						schema = 'resource';

                    var schemaDetails = schemaMapping[schema];
                    require([schemaDetails], function() {
                        var name = snake_case(schema);
						var directiveHtml =
                            "<DIRECTIVE ng-show='internalDocument' ng-model='internalDocument' document-info='internalDocumentInfo' locale='getLocale()' link-target={{linkTarget}}></DIRECTIVE>"
                            .replace(/DIRECTIVE/g, 'view-' + name);

                        $scope.$apply(function() {
                            $element.find('#schemaView')
                                .empty()
                                .append($compile(directiveHtml)($scope));
                        });
                    });
                };

                //*************************************************************************************************************************************
                function snake_case(name, separator) {
                    separator = separator || '-';
                    return name.replace(/[A-Z]/g, function(letter, pos) {
                        return (pos ? separator : '') + letter.toLowerCase();
                    });
                };


                if($scope.docId && $scope.docSchema)
                    $scope.loadDocument($scope.docSchema, $scope.docId)

            }],//controller
        };
    });
});
