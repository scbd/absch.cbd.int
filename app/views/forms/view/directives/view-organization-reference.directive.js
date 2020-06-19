define(['app', "text!views/forms/view/directives/view-organization-reference.directive.html",], function (app, template) {

app.directive("viewOrganizationReference", [function () {
	return {
		restrict: "EAC",
		template: template, 
		replace: true,
		transclude: false,
		scope: {
			document: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		controller: ["$scope", "IStorage", function ($scope, storage){
			
			$scope.$watch("document", function(newVal)
			{
				if(newVal && newVal.identifier){
					if(!$scope.loading){
						$scope.loading=true;					
						loadReferences(newVal).finally(function(){
							$scope.loading=false;
						});
					}
				}
				else
					$scope.organization = newVal;
			});
			function loadReferences(ref) {
				return storage.documents.get(ref.identifier, { info : true, body:true})
				.then(function(res){
					$scope.organization 	= res.data.body;
					$scope.organizationInfo = res.data;
				})
				.catch(function(error){
					if (error.status == 404) {
						return storage.drafts.get(ref.identifier, { info : true, body:true})
							.then(function(res){
								$scope.organization 	= res.data.workingDocumentBody||res.data.body;
								$scope.organizationInfo = res.data;
							});
					};
				})
			};

		}]
	};
}]);
});
