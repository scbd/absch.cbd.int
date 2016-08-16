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

				$scope.isCNA = false;
				$scope.isPerson = false;
				$scope.isOrganization= false;

				//==================================================
				function checkCNA(doc) {
					if(!doc)
						return false;
				if(!doc.type && doc.header){
						if(doc.header.schema==='authority') {
							doc.type = "CNA";
							return true;
						}
					}

					return false;
				};

				//==================================================
				function checkPerson(doc) {
					if(!doc)
						return false;
					if(doc.type==="person")
						return true;
					if(!doc.type && (doc.firstName))
						return true; //default behaviour
					return false;
				};


				//==================================================
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
									$scope.documentForUID = angular.copy(data.data);
									$scope.document = angular.copy(data.data.body);
									delete data.data.body;
									$scope.document.info = data.data;
									if($scope.document && $scope.document.contactOrganization){
										storage.documents
												.get($scope.document.contactOrganization.identifier)
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

				});

				//==================================================
				$scope.$watch("document", function(newVal, oldVal) {
					if(newVal){
						$scope.isCNA = checkCNA(newVal);
						$scope.isPerson = checkPerson(newVal);
						$scope.isOrganization = !$scope.isPerson;
					}
				});

			}]
		};
	}]);
});
