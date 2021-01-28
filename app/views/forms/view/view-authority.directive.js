define(['app','lodash', "text!views/forms/view/view-authority.directive.html",
'views/directives/record-options','views/directives/party-status', 'services/app-config-service',
'views/forms/view/directives/view-reference-records.directive', 'views/forms/directives/view-terms-hierarchy'], function (app, _, template) {

	app.directive("viewAuthority", ["IStorage", "realm","solr","searchService",'$routeParams', function (storage, realm,solr,searchService,$routeParams) {
		return {
			restrict   : "EAC",
			template: template ,
			replace    : true,
			transclude : false,
			scope: {
				document: "=ngModel",
				target  : "@linkTarget",
				locale      : "=",
				allowDrafts : "@",
				hide : "@"
			},
			link : function ($scope)
			{
				$scope.policyBasisForCompetencyRef =[];
				function getCnaLawRecords() {
					var query = {
						query : 'schema_s:biosafetyLaw AND referenceRecord_ss:' + solr.escape( $routeParams.documentID ),
					}
					searchService.list( query ).then( function ( r ) {
						if ( r.data.response.docs.length > 0 ) {
							_.forEach( r.data.response.docs, function ( record ) {
								$scope.policyBasisForCompetencyRef.push({ identifier:record.identifier_s });
							});
						}
					}).catch( function ( error ) {
						console.log( 'ERROR:', error );
					});
				}
				if(realm.is('ABS'))		$scope.isABS=true;
				else if(realm.is('BCH'))$scope.isBCH=true;
				getCnaLawRecords();
				$scope.contacts = undefined;
				$scope.display = function(field) {
					if(!$scope.hide) return true; //show all fields

					return( $scope.hide.indexOf(field) >= 0 ? false : true);
				}

			}
		};
	}]);
});
