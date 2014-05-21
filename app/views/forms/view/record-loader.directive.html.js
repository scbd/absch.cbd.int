define(['app',
	'./view-abs-checkpoint.directive.js',
    './view-abs-checkpoint-communique.directive.js',
    './view-abs-permit.directive.js',
    './view-authority.directive.js',
    './view-authority-reference.directive.js',
    './view-contact.directive.js',
    './view-contact-reference.directive.js',
    './view-database.directive.js',
    './view-measure.directive.js',
    './view-organization.directive.js',
    './view-organization-reference.directive.js',
    './view-resource.directive.js',    
    './view-focalpoint.directive.html.js',
    './view-meeting.directive.html.js',
    './view-statement.directive.html.js',
    './view-pressrelease.directive.html.js',
    './view-notification.directive.html.js',
    '/app/js/common.js',
    '/app/views/directives/document-metadata-directive.html.js'
    ], function (app) {
app.directive('recordLoader', [function () {
	return {
		restrict: 'EAC',
		templateUrl: '/app/views/forms/view/record-loader.directive.html',
		replace: true,
		transclude: false,
		scope: {
			linkTarget: "@",
			document: "=",
			locale  : "=",
			hide: "@"
		},
		link: function($scope) {

			//debugger;
			$scope.internalDocument     = undefined;
			$scope.internalDocumentInfo = undefined;

			$scope.$watch("document", function(_new) { 
				$scope.error = null;
				$scope.internalDocument = _new; 
			});
			
			if(!$scope.document)
				$scope.init();
		},
		controller: ['$scope', "$route", 'IStorage', "authentication", "localization", "$q", "$location", "commonjs",
			function ($scope, $route, storage, authentication, localization, $q, $location,commonjs) {
			
			//==================================
			//
			//==================================
			$scope.init = function () {

				if ($scope.internalDocument)
					return;

				if ($scope.document || $scope.schema)
					return;

				var documentID = $route.current.params.documentID;
				var documentSchema = $route.current.params.documentSchema;

				if(documentSchema=="FOCALPOINT" || documentSchema=="MEETING" || documentSchema=="NOTIFICATION"
                   || documentSchema=="PRESSRELEASE" || documentSchema=="STATEMENT")
				{
					 commonjs.getReferenceRecordIndex(documentSchema,documentID).then(function(data){
						$scope.internalDocument = data.data;
					//console.log($scope.internalDocument );
					});
				}										
				else if (documentID){
					$scope.load(documentID);
				}
				// else
				// 	$scope.error = "documentID not specified";
				
			}

			//==================================
			//
			//==================================
			$scope.getLocale = function () {
				return $scope.$root.locale;
			}

			//==================================
			//
			//==================================
			$scope.load = function (identifier) {

				$scope.error = undefined;

				var qDocument     = storage.documents.get(identifier)                .then(function(result) { return result.data || result });
				var qDocumentInfo = storage.documents.get(identifier, { info: true }).then(function(result) { return result.data || result });

				$q.all([qDocument, qDocumentInfo]).then(function(results) {

					$scope.internalDocument     = results[0];
					$scope.internalDocumentInfo = results[1];

				}).then(null, function(error) {
					//debugger;
					 // $scope.error = error.Message || error || "Http Error: " + errorCode;
					 console.log( $scope.error );
				})
				
			};

			//==================================
			//
			//==================================
			$scope.user = function() {
				return authentication.getUser();
			};

			//==================================
			//
			//==================================
			$scope.edit = function() {
				if (!$scope.canEdit())
					throw "Cannot edit form";

				var schema     = $scope.internalDocumentInfo.type;
				var identifier = $scope.internalDocumentInfo.identifier;

				$location.path("/register/" + schema + "/" + identifier);
				$location.search({});
			}

			//==================================
			//
			//==================================
			$scope.canEdit = function() {
				if (!$scope.user().isAuthenticated)
					return false;

				if (!$scope.internalDocumentInfo)
					return false;

				if ($scope.internalCanEdit === undefined) {

					$scope.internalCanEdit = null; // avoid recall => null !== undefined

					var hasDraft   = !!$scope.internalDocumentInfo.workingDocumentCreatedOn;
					var identifier =   $scope.internalDocumentInfo.identifier;
					var schema     =   $scope.internalDocumentInfo.type;

					var qCanEdit = hasDraft
							     ? storage.drafts.security.canUpdate(identifier, schema)  // has draft
								 : storage.drafts.security.canCreate(identifier, schema); // has no draft

					qCanEdit.then(function(isAllowed) {
						
						$scope.internalCanEdit = isAllowed || false;

					}).then(null, function(error) {

						$scope.internalCanEdit = false;
					});
				}

				return $scope.internalCanEdit===true;
			};
		}]
	}
}]);
});