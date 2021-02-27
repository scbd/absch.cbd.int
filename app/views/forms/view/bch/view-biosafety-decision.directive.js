define(['app','lodash', "text!./view-biosafety-decision.directive.html", 	'views/directives/record-options',
	'components/scbd-angularjs-controls/main'
], function (app, _, template) {

app.directive("viewBiosafetyDecision", [function () {
	return {
		restrict   : "EAC",
		template: template ,
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			hide	: "@"
		},
		controller : ["$scope", function ($scope)
		{
			function onOtherDecisionChanged (decisionTypes){
				if(!decisionTypes){
					return;
				}
				$scope.isSimplifiedProcedure          = false;
				$scope.isDecisionOnContainedUseOfLMOs = false;
				$scope.isTransboundaryMovement        = false;

				var identifiersForSectionF = ["83C0DBFB-AD5C-4B88-8ECE-5365991F2956","3FF9FEB3-20FA-4287-B562-46635A1154A3"];
				
				_.forEach(decisionTypes, function(decision){
					var identifier = decision.identifier;

					if(identifier == "8979219B-330B-424F-A52C-209D4B4B65C0"){ $scope.isSimplifiedProcedure	= true; }
					if(identifier == "D698B5F7-A434-49E2-A7FF-FE869AFBEE8D"){ $scope.isDecisionOnContainedUseOfLMOs = true;}
					if(identifier == "E8C5A15C-A736-4fb7-A1B6-192412BE7E45"){$scope.document.isLmoDecisionForIntentionalIntroduction = true;}
					if(identifier == "BE64016A-C3BD-4C61-9620-C3FEF96B2A24"){$scope.document.isLmoDecisionForDirectUse = true;}
					if(_.includes(identifiersForSectionF,identifier.toString())){
						$scope.isTransboundaryMovement = true;
					}
				})
				
			}
			$scope.$watch("document", function (oldVal) {
				if(oldVal && oldVal.decisionTypes)
					onOtherDecisionChanged(oldVal.decisionTypes);

			})
			//====================
			//
			//====================
			$scope.display = function(field) {

				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}

			$scope.onReferencedRecordsDataFetch = function(data){
				if(data && (data.amendedRecords||{}).docs){
					if(data.amendedRecords.docs.length)
						$scope.amendedByRecords = _.map(data.amendedRecords.docs, 'identifier')
				}
			}
		}]
	};
}]);

});
