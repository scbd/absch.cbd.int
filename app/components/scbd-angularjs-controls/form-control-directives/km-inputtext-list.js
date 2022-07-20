import app from '~/app';
import template from 'text!./km-inputtext-list.html';
import angular from 'angular';
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
							required: "@",
							locales:"=?"
					},
					link: function($scope, $element, $attr, ngModelController) {
							$scope.skipLoad = false;
							$scope.texts = [];
							$scope.$watch('binding', function(){
								$scope.load()
							});
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
										if($scope.type!='lstring'){
											if ($.trim(text.value) !== "")
													oNewBinding.push($.trim(text.value));
										}
										else{
											if (!_.isEmpty(text.value))
													oNewBinding.push(text.value);
										}
									});

									$scope.binding = !$.isEmptyObject(oNewBinding) ? oNewBinding : undefined;
									$scope.skipLoad = true;
									ngModelController.$setViewValue($scope.binding);
							};

							//==============================
							//
							//==============================
							$scope.getTexts = function() {

								var maxEntries = $attr.maxEntries;
									if ($scope.texts.length === 0)
											$scope.texts.push({
													value: $scope.type!='lstring' ? "" : {}
											});

									var sLastValue = $scope.texts[$scope.texts.length - 1].value;

									//NOTE: IE can set value to 'undefined' for a moment
									if (sLastValue && 
										(($scope.type!='lstring' && sLastValue !== "") || $scope.type=='lstring' && !_.isEmpty(sLastValue))
										&& (!maxEntries || $scope.texts.length<maxEntries))
											$scope.texts.push({
													value: $scope.type!='lstring' ? "" : {}
											});

									return $scope.texts;
							};

							//==============================
							//
							//==============================
							$scope.isRequired = function() {
									return $scope.required !== undefined && $.isEmptyObject($scope.binding);
							};
					}
			};
	});

