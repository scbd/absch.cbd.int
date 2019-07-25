define(['app','text!./km-rich-textbox.html','angular','angular-trix'], function(app,template,angular) {
	//============================================================
	//
	//
	//============================================================
	app.directive('kmRichTextbox', function() {
			return {
					restrict: 'EAC',
					template: template,
					replace: true,
					require: "?ngModel",
					scope: {
							placeholder: '@',
							ngDisabledFn: '&ngDisabled',
							binding: '=ngModel',
							locales: '=',
							rows: '=',
							required: "@",
							ngChange: "&",
							toolbar : "@?"
					},
					link: function($scope, element, attrs, ngModelController) {
							$scope.text = {};
							$scope.$watch('locales', $scope.watchLocales);
							$scope.$watch('binding', $scope.watchBinding);
							$scope.$watch('binding', function() {
									try {
											ngModelController.$setViewValue($scope.binding);
									} catch (e) {}
							});

					},
					controller: ["$scope", function($scope) {
							if(!$scope.toolbar)
									$scope.toolbar = "[['bold', 'italics', 'ul', 'ol', 'redo', 'undo', 'clear']]";
							//==============================
							//Remove value of not selected languages/empty languages
							//==============================
							$scope.watchLocales = function() {
									var oLocales = $scope.locales || [];
									var oBinding = $scope.binding || {};
									var oText = $scope.text;

									angular.forEach(oLocales, function(locale, i) {
											oText[locale] = oBinding[locale] || oText[locale];
									});
							};

							//==============================
							//Remove value of not selected languages/empty languages
							//==============================
							$scope.watchBinding = function() {
									var oLocales = $scope.locales || [];
									var oBinding = $scope.binding || {};
									var oText = $scope.text;

									angular.forEach(oLocales, function(locale, i) {
											oText[locale] = oBinding[locale];
									});
							};

							//==============================
							//Remove value of not selected languages/empty languages
							//==============================
							$scope.onchange = function() {
									var oLocales = $scope.locales || [];
									var oText = $scope.text || {};
									var oNewBinding = {};

									angular.forEach(oLocales, function(locale, i) {
											if ($("<i>").html(oText[locale]).text().trim() !== "")
													oNewBinding[locale] = oText[locale];
									});

									$scope.binding = !$.isEmptyObject(oNewBinding) ? oNewBinding : undefined;
									// https://docs.angularjs.org/api/ng/directive/ngChange
									// if the model is changed programmatically and not by a change to the input value 
									// so manually raise onchange manually
									$scope.ngChange();
							};

							//==============================
							//
							//==============================
							$scope.isRequired = function() {
									return $scope.required !== undefined && $.isEmptyObject($scope.binding);
							};

							//==============================
							//
							//==============================
							$scope.isShowLocale = function() {
									return $scope.locales && $scope.locales.length > 1;
							};
					}]
			};
	});
});
