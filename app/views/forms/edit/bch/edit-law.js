define(['app', 'lodash', 'views/forms/edit/edit', 'services/thesaurus-service',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-law.directive"], 
function (app, _) {

	app.controller("editLaw", ["$scope", "$routeParams", "$filter", "Thesaurus", "$q", "$controller", "thesaurusService",
	function($scope, $routeParams, $filter, Thesaurus, $q, $controller, thesaurusService) {
		// $scope.jurisdictionNames = [{}]
		
		$controller('editController', {
			$scope: $scope
		});

		_.extend($scope.options, {	
			jurisdiction : 	function(){
				return $q.all([thesaurusService.getDomainTerms('countries'),
							thesaurusService.getTerms('others')])
				.then(function(result){
					var filtered = $filter('orderBy')(result[0], 'title.en');
					filtered.push(result[1]);
					return filtered;
				});
			},
			legislationAgreementTypes : 	function(){
				return thesaurusService.getDomainTerms('legislationAgreementTypes')
			},
			subjectAreas : 	function(){
				return thesaurusService.getDomainTerms('subjectAreas')
			},
			typeOfOrganisms: 	function(){
				return thesaurusService.getDomainTerms('typeOfOrganisms')
			},

		});
		
		$scope.hasOther = function(selectedTerms){
			return selectedTerms && _(selectedTerms).map('identifier').some('5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'); 
		}
		//==================================
		//
		//==================================
		$scope.getCleanDocument = function(document) {

			document = document || $scope.document;

			if (!document)
				return undefined;

			if (/^\s*$/g.test(document.notes))
				document.notes = undefined;

				if(!document.amendedRecords || document.amendedRecords.length ==0){
					document.amendedRecords = undefined;
					document.isAmendment = false;
				}
				else{
					document.isAmendment = true;
				}
			// if(!_.isEmpty($scope.jurisdictionNames))
			// 	document.jurisdictionNames = _($scope.jurisdictionNames).pluck('value').compact().value();
			// if(_.isEmpty(document.jurisdictionNames))
			// 	document.jurisdictionNames = undefined;
				
			return document;
		};

		// $scope.addSynonymName = function(){
		// 	if(!$scope.jurisdictionNames)
		// 		$scope.jurisdictionNames = [];
		// 	if($scope.jurisdictionNames.length > 0 && _.isEmpty($scope.jurisdictionNames[$scope.jurisdictionNames.length]))
		// 		return;
		// 	jurisdictionNames.push({})
		// }
		
		$scope.setDocument({});

   }]);

});
