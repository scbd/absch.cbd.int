define(['app', 'lodash', 'text!./edit-law.directive.html', 'views/forms/edit/edit', 'services/thesaurus-service',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-biosafety-law.directive"], 
function (app, _, template) {

	app.directive("editBiosafetyLaw", ["$controller", "thesaurusService", "$q", "$filter","Enumerable", function($controller, thesaurusService, $q, $filter,Enumerable) {
		return {
			restrict   : "EA",
			template: template,
			replace    : true,
			require    : '?ngModel',
			scope:{
				onPostSubmitFn   : "&onPostSubmit"
			},
			link: function($scope, $element, $attr){

				$scope.scientificNameSynonyms = [{}];
				$scope.commonNames = [{}];
				$scope.container        = $attr.container;
    			$scope.isDialog         = $attr.isDialog;  
				$scope.type 			= $attr.documentType;    
				$controller('editController', {
					$scope: $scope
				});

				_.extend($scope.options, {	
					lawJurisdictions:  thesaurusService.getDomainTerms('lawJurisdictions', {other:true, otherType:'lstring'}),				 
					chmregions: function() { return $q.all([thesaurusService.getDomainTerms('regions'),thesaurusService.getDomainTerms('countries')])
						.then(function(data) { 
							return Enumerable.from($filter('orderBy')(data[0], 'title.en')).union(
							Enumerable.from($filter('orderBy')(data[1], 'title.en'))).toArray();
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
						
					return $scope.sanitizeDocument(document);
				};

				// $scope.addSynonymName = function(){
				// 	if(!$scope.jurisdictionNames)
				// 		$scope.jurisdictionNames = [];
				// 	if($scope.jurisdictionNames.length > 0 && _.isEmpty($scope.jurisdictionNames[$scope.jurisdictionNames.length]))
				// 		return;
				// 	jurisdictionNames.push({})
				// }
				
				$scope.setDocument({});

			}
		}

   }]);

});