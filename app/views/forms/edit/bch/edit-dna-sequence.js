define(['app', 'lodash', 'views/forms/edit/edit', 'services/thesaurus-service', 'views/forms/directives/traits-selector.directive',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-dna-sequence.directive"], 
function (app, _) {

	app.controller("editDnaSequence", ["$scope", "$routeParams", "$route", "Thesaurus", "$q", "$controller", "thesaurusService",
	function($scope, $routeParams, $route, Thesaurus, $q, $controller, thesaurusService) {
		
		$controller('editController', {
			$scope: $scope
		});
		
		$scope.synonymNames = [{}];


		_.extend($scope.options, {	
			family : thesaurusService.getDomainTerms('dnaSequenceFamily')
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

			if((document.traits||[]).length == 0)
				document.traits = undefined;
				
			if(!_.isEmpty($scope.synonymNames))
				document.synonymNames = _($scope.synonymNames).pluck('value').compact().value();
			if(_.isEmpty(document.synonymNames))
				document.synonymNames = undefined;		
			
				
			return document;
		};

		$scope.setDocument({}, true)
		.then(function(doc){
			
			if(doc.synonymNames)
				$scope.synonymNames = _.map(doc.synonymNames, function(t){return { value: t}});

		});

		$scope.isDonorMandatory = function(){
			return !!$scope.document.isSynthetic;
		}
		$scope.removeItem = function(type, $index){
			if(type.length>1)
				type.splice($index, 1)
		}

   }]);

});
