define(['app', 'lodash', 'views/forms/edit/edit', 'services/thesaurus-service',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-dna-sequence.directive"], 
function (app, _) {

	app.controller("editDnaSequence", ["$scope", "$routeParams", "$route", "Thesaurus", "$q", "$controller", "thesaurusService",
	function($scope, $routeParams, $route, Thesaurus, $q, $controller, thesaurusService) {
		
		$scope.synonymNames = [{}]
		$controller('editController', {
			$scope: $scope
		});

		_.extend($scope.options, {	
			family : thesaurusService.getDomainTerms('dnaSequenceFamily'),
			traits : thesaurusService.getDomainTerms('traits')
		});
		
		//==================================
		//
		//==================================
		$scope.getCleanDocument = function(document) {

			document = document || $scope.document;

			if (!document)
				return undefined;

			if (/^\s*$/g.test(document.notes))
				document.notes = undefined;

			if(!_.isEmpty($scope.synonymNames))
				document.synonymNames = _($scope.synonymNames).pluck('value').compact().value();
			if(_.isEmpty(document.synonymNames))
				document.synonymNames = undefined;
				
			return document;
		};

		$scope.addSynonymName = function(){
			if(!$scope.synonymNames)
				$scope.synonymNames = [];
			if($scope.synonymNames.length > 0 && _.isEmpty($scope.synonymNames[$scope.synonymNames.length]))
				return;
			synonymNames.push({})
		}


		$scope.setDocument({}, true);

   }]);

});
