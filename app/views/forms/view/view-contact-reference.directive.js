define(['app', "text!/app/views/forms/view/view-contact-reference.directive.html",'underscore', 
'scbd-angularjs-services', '/app/js/common.js'], function (app, template, _) {

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
							 var focalPointRegex = /^52000000cbd022/;
							if(focalPointRegex.test(newVal.identifier)){
								commonjs.getReferenceRecordIndex('NFP', newVal.identifier)
								.then(function(result){
									if(result.data && result.data.schema_s == 'focalPoint'){
										result.data.addressHTML = result.data.description_EN_t.replace(/\n/g, '<br/>');
										result.data.phones = result.data.telephone_ss;
										result.data.country = {identifier:result.data.government_s};
										result.data.emails = result.data.email_ss;
										result.data.faxes = result.data.fax_ss;
										result.data.firstName = result.data.title_EN_t;
										$scope.document = result.data;
									}
								})
							
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
