define(['app','text!./km-inputtext-list.html','angular'], function(app,template,angular) {
	//============================================================
	//
	//
	//============================================================
	app.directive('kmInputtextList', function() {
			return {
					restrict: 'EAC',
					template: template,
					replace: true,
					transclude: false,
					require: "?ngModel",
					scope: {
							placeholder: "@",
							binding: "=ngModel",
							type: "@type",
							required: "@"
					},
					link: function($scope, $element, attrs, ngModelController) {
							$scope.skipLoad = false;
							$scope.texts = [];
							$scope.$watch('binding', $scope.load);
							$scope.$watch('binding', function() {
									ngModelController.$setViewValue($scope.binding);
							});
					},
					controller: ["$scope", function($scope) {
							//==============================
							//
							//==============================
							$scope.load = function() {
									if ($scope.skipLoad) {
											$scope.skipLoad = false;
											return;
									}

									var oBinding = $scope.binding || [];

									$scope.texts = [];

									angular.forEach(oBinding, function(text, i) {
											$scope.texts.push({
													value: text
											});
									});
							};

							//==============================
							//
							//==============================
							$scope.remove = function(index) {
									$scope.texts.splice(index, 1);

									$scope.save();
							};

							//==============================
							//
							//==============================
							$scope.save = function() {
									var oNewBinding = [];
									var oText = $scope.texts;

									angular.forEach(oText, function(text, i) {
											if ($.trim(text.value) !== "")
													oNewBinding.push($.trim(text.value));
									});

									$scope.binding = !$.isEmptyObject(oNewBinding) ? oNewBinding : undefined;
									$scope.skipLoad = true;
							};

							//==============================
							//
							//==============================
							$scope.getTexts = function() {
									if ($scope.texts.length === 0)
											$scope.texts.push({
													value: ""
											});

									var sLastValue = $scope.texts[$scope.texts.length - 1].value;

									//NOTE: IE can set value to 'undefined' for a moment
									if (sLastValue && sLastValue !== "")
											$scope.texts.push({
													value: ""
											});

									return $scope.texts;
							};

							//==============================
							//
							//==============================
							$scope.isRequired = function() {
									return $scope.required !== undefined && $.isEmptyObject($scope.binding);
							};
					}]
			};
	});
});