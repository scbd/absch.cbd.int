define(['app', 'lodash', 'views/forms/edit/edit', 'services/thesaurus-service',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-biosafety-decision.directive"], 
function (app, _) {

	app.controller("editBiosafetyDecision", ["$scope", "$http", "$filter", "Thesaurus", "$q", "$controller", "thesaurusService",
	function($scope, $http, $filter, Thesaurus, $q, $controller, thesaurusService) {
	   	$scope.disabledOtherDecisions = true
		$scope.decisions = {}

		$controller('editController', {
			$scope: $scope
		});

		var commonDecisionsIdentifiers = ["E8C5A15C-A736-4fb7-A1B6-192412BE7E45", "BE64016A-C3BD-4C61-9620-C3FEF96B2A24"]
		_.extend($scope.options, {

			commonDecisions: function() {
				return $q.when(thesaurusService.getDomainTerms('decisionTypes')).then(function(o) {					
					return _.filter(o, function(item){
						return _.includes(commonDecisionsIdentifiers, item.identifier)
					});
				});
			},
			otherDecisions: function() {
				return $q.when(thesaurusService.getDomainTerms('decisionTypes')).then(function(o) {					
					return _.filter(o, function(item){
						return !_.includes(commonDecisionsIdentifiers, item.identifier) 
							&& _.intersection(commonDecisionsIdentifiers, item.broaderTerms).length ==0
					});
				});
			},
			intentionDecisions: function() {
				return $q.when(thesaurusService.getDomainTerms('decisionTypes')).then(function(o) {					
					return _.filter(o, function(item){
						return _.includes(item.broaderTerms, commonDecisionsIdentifiers[0])
					});
				});
			},
			directUseDecisions: function() {
				return $q.when(thesaurusService.getDomainTerms('decisionTypes')).then(function(o) {					
					return _.filter(o, function(item){
						return _.includes(item.broaderTerms, commonDecisionsIdentifiers[1])
					});
				});
			},
			decisionLMOFFPSubject: function() {
				return thesaurusService.getDomainTerms('DecisionLMOFFPSubject');
			},
			decisionResult: function() {
				return thesaurusService.getDomainTerms('DecisionResults');
			}
			
		});
		

		$scope.onCommonDecisionChanged = function(){
			$scope.isLmoDecisionForIntentionalIntroduction	= _($scope.decisions.commonDecisions||[]).map('identifier').includes(commonDecisionsIdentifiers[0]);
			$scope.isLmoDecisionForDirectUse				= _($scope.decisions.commonDecisions||[]).map('identifier').includes(commonDecisionsIdentifiers[1]);
		}
		//==================================
		//
		//==================================
		$scope.getCleanDocument = function(document) {

			document = document || $scope.document;

			if (!document)
				return undefined;

			//////////////////////////////////
			/////make decision Types field
			//////////////////////////////////

			var decisionTypes = [];
			decisionTypes	=	$scope.decisions.commonDecisions||$scope.decisions.otherDecisions||[];

			if($scope.isLmoDecisionForIntentionalIntroduction && document.addressesTransboundaryMovement)
				decisionTypes = _.union(decisionTypes, [$scope.decisions.intentionDecisions]);

			if(!$scope.isLmoDecisionForIntentionalIntroduction && $scope.isLmoDecisionForDirectUse)
				decisionTypes = _.union(decisionTypes, $scope.decisions.directUseDecisions);

			if(decisionTypes && decisionTypes.length > 0)
				document.decisionTypes = _(decisionTypes).compact().flatten().value();
			else
				document.decisionTypes = undefined;

			if (/^\s*$/g.test(document.notes))
				document.notes = undefined;

			return document;
		};
		
		$q.when($scope.setDocument({}))
		.then(function(){
			console.log($scope.document);
			var document = $scope.document;
			if(document.decisionTypes && document.decisionTypes.length > 0){
				$scope.decisions.commonDecisions = [];
				var decisionTypesIdentifiers = _.map(document.decisionTypes, 'identifier');
				if(_.includes(decisionTypesIdentifiers, commonDecisionsIdentifiers[0])){
					$scope.decisions.commonDecisions.push({identifier:commonDecisionsIdentifiers[0]});
					$scope.isLmoDecisionForIntentionalIntroduction = true
				}
				if(_.includes(decisionTypesIdentifiers, commonDecisionsIdentifiers[1])){
					$scope.decisions.commonDecisions.push({identifier:commonDecisionsIdentifiers[1]});
					$scope.isLmoDecisionForDirectUse = true
				}
				$q.when($scope.options.intentionDecisions())
				.then(function(options){
					var selectedOption = _.find(options, function(o){
						return _.includes(decisionTypesIdentifiers, o.identifier);
					})
					if(selectedOption)
						$scope.decisions.intentionDecisions = {identifier:selectedOption.identifier}
				})
				$q.when($scope.options.directUseDecisions())
				.then(function(options){
					var selectedOption =  _.find(options, function(o){
						return _.includes(decisionTypesIdentifiers, o.identifier);
					})
					if(selectedOption)
						$scope.decisions.directUseDecisions =  {identifier:selectedOption.identifier}
				})
			}

		});

   }]);

});
