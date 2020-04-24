define(['app','underscore', "text!views/forms/view/view-default-reference.directive.html", 
'components/scbd-angularjs-services/services/main'], function (app, _, template) {

app.directive("viewDefaultReference", ["IStorage", '$timeout', function (storage, $timeout) {
	return {
		restrict: "EAC",
		template: template ,
		replace: true,
		transclude: {
			default:'?default',
			extra:'?extra'
		},
		scope: {
			model: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		link:function($scope, $element, $attr){

			$scope.hideSchema = $attr.hideSchema=='true'
			$scope.$watch('model', function(newValue, oldValue){
		        if(newValue){
					$scope.loading = true;
					loadReferenceDocument($scope.model)
					.then(function(data) {
						$scope.document = data;
					})
					.finally(function(){$scope.loading = false;});

		        }
		    });


			function loadReferenceDocument(identifier){

				return storage.documents.get(identifier, { info : true})
						.then(function(result){
							return result.data;
						})
						.catch(function(error, code){
							if (error.status == 404) {
								return loadDraftDocument(identifier);
							};
						});
			}

			function loadDraftDocument(identifier, count){
				return storage.drafts.get(identifier, { info : true})
						.then(function(result){
							$scope.errorCode = undefined;
							var document = result.data;
							count = count||1
							if($attr.waitForWorkflow=='true' && !document.workingDocumentLock && count <= 5){
								return $timeout(function(){return loadDraftDocument(identifier, count++);}, 2000);
							}
							else{
								document.body = {
									header : { schema: result.data.type}
								}
								return document;
							}
						})
						.catch(function(error, code){
							if (error.status == 404)$scope.errorCode = 404;
							else
								$scope.error = true;
						});
			}

		 }
	};
}]);
});
