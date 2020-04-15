define(['app','underscore', "text!views/forms/view/view-default-reference.directive.html", 
'components/scbd-angularjs-services/services/main'], function (app, _, template) {

app.directive("viewDefaultReference", ["IStorage", function (storage) {
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
					loadReferenceDocument($scope.model).then(function(data) {
						$scope.document = data;
					}).finally(function(){$scope.loading = false;});

		        }
		    });


			function loadReferenceDocument(identifier){

				return storage.documents.get(identifier, { info : true})
						.then(function(result){
							return result.data;
						})
						.catch(function(error, code){
							if (error.status == 404) {
								return storage.drafts.get(identifier, { info : true})
									.then(function(result){
										$scope.errorCode = undefined;
										var document = result.data;
										document.body = {
											header : { schema: result.data.type}
										}
										return document;
									})
									.catch(function(error, code){
										if (error.status == 404)$scope.errorCode = 404;
										else
											$scope.error = true;
									});
							};
						});
			}

		 }
	};
}]);
});
