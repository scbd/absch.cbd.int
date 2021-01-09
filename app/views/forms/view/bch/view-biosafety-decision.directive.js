define(['app','lodash', "text!views/forms/view/bch/view-biosafety-decision.directive.html", 	'views/directives/record-options',
	'components/scbd-angularjs-controls/form-control-directives/km-value-bool'
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
				function onOtherDecisionChanged (identifier){
					if(identifier == undefined){
						return;
					}
					$scope.document.isSimplifiedProcedure	= false;
					$scope.document.isDecisionOnTransitOfLMOs	= false;
					$scope.document.isDecisionOnContainedUseOfLMOs	= false;
					$scope.document.isShowDecisionDocument	= false;
					$scope.document.isTransboundaryMovement = false;
					var identifiersForSectionF = ["83C0DBFB-AD5C-4B88-8ECE-5365991F2956","3FF9FEB3-20FA-4287-B562-46635A1154A3"];
					var identifiersForSectionI = ["0C9BBC54-34F1-431A-A579-F018D8E5CEAD","3293477D-466D-40CB-A890-4B139BCE93AC","8E26ACCB-3358-4BC3-8389-56AA508991E6","2C74A444-32C1-45B0-B1AC-F419773A4A7E","5B6177DD-5E5E-434E-8CB7-D63D67D5EBED","A8C8A4D9-8084-4F6E-88B7-47BA04075E40"];

					if(identifier == "8979219B-330B-424F-A52C-209D4B4B65C0"){ $scope.document.isSimplifiedProcedure	= true; }
					if(identifier == "1B6F702C-0C68-4B53-BCA4-1DA4A25E23A8"){ $scope.document.isDecisionOnTransitOfLMOs	= true;}
					if(identifier == "D698B5F7-A434-49E2-A7FF-FE869AFBEE8D"){ $scope.document.isDecisionOnContainedUseOfLMOs = true;}
					if(identifier == "E8C5A15C-A736-4fb7-A1B6-192412BE7E45"){$scope.isLmoDecisionForIntentionalIntroduction = true;}
					if(identifier == "BE64016A-C3BD-4C61-9620-C3FEF96B2A24"){$scope.isLmoDecisionForDirectUse = true;}
					if(_.includes(identifiersForSectionI,identifier.toString())){ $scope.document.isShowDecisionDocument = true;}
					if(_.includes(identifiersForSectionF,identifier.toString())){
						console.log("here",identifier.toString())
						$scope.document.isTransboundaryMovement = true;
					}
					
				}
				$scope.$watch("document", function (oldVal) {
					onOtherDecisionChanged(oldVal.decisionTypes[0].identifier);

				})
			//====================
			//
			//====================
			$scope.display = function(field) {

				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}
		}]
	};
}]);

});
