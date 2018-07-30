define(['app', "text!views/forms/view/view-contact-reference.directive.html",'underscore', 
'components/scbd-angularjs-services/services/main', 'js/common'], function (app, template, _) {

	app.directive("viewContactReference", [function () {
		return {
			restrict: "EAC",
			template: template ,
			replace: true,
			transclude: false,
			scope: {
				model: "=ngModel",
				locale: "=",
				target: "@linkTarget"
			},
			controller: ["$scope", "IStorage", "$filter", "commonjs", function ($scope, storage, $filter, commonjs) {

				$scope.isCNA = false;
				$scope.isPerson = false;
				$scope.isOrganization= false;
				$scope.isNFP = false;

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
							
								var config;
								var focalPointRegex = /^52000000cbd022/;
								if(focalPointRegex.test(newVal.identifier))
									config = {headers  : {realm:undefined}};
								storage.documents.get(newVal.identifier, {info:true}, config)
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
						$scope.isNFP = $scope.document.schema_s == 'focalPoint';
						$scope.isCNA = checkCNA(newVal);
						$scope.isPerson = checkPerson(newVal) && !$scope.isNFP;
						$scope.isOrganization = !$scope.isPerson && !$scope.isNFP;
						
					}
				});

			}]
		};
	}]);
});
