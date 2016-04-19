define(['app','underscore', 'scbd-angularjs-services'], function (app, _) {

app.directive("viewContactReference", [function () {
	return {
		restrict: "EAC",
		templateUrl: "/app/views/forms/view/view-contact-reference.directive.html",
		replace: true,
		transclude: false,
		scope: {
			model: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		controller: ["$scope", "IStorage", "$filter", function ($scope, storage, $filter) {
            
             $scope.uid = "";
            
			$scope.$watch("model", function(newVal) {
				if(!newVal)
					return;

				if(!newVal.header && newVal.identifier && !$scope.document ){
					//tweak for old versions after migration as of Feb 16
					if(newVal.document){
						$scope.document = newVal.document;
					}
					else{
						storage.documents.get(newVal.identifier, {info:true})
							.then(function(data){
								$scope.document = angular.copy(data.data.body);
								delete data.data.body;
								$scope.document.info = data.data;
								if($scope.document && $scope.document.contactOrganization){
									storage.documents.get($scope.document.contactOrganization)
									.then(function(data){
										_.extend($scope.document.contactOrganization, data.data);
									});
								}

							});
					}
				}
				else if(newVal.header || newVal.source) {
					$scope.document = newVal;
				}
				if($scope.document)
                    $scope.uid = $filter("uniqueID")($scope.document);


			});
            
        

            $scope.isCNA = function() {

				var doc = $scope.document;

				if(!doc)
					return false;

                if(doc.header.schema==='authority') {
                    doc.type = "CNA";
                    return true;
                }

				return false;
			};



			$scope.isPerson = function() {

				var doc = $scope.document;

				if(!doc)
					return false;

				if(doc.type=="person")
					return true;

				if(!doc.type && (document.firstName || document.lastName))
					return true; //default behaviour

				return false;
			};

			$scope.isOrganization = function() {

				return !$scope.isPerson();
			};
		}]
	};
}]);
});
