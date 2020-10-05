define(['app','text!./km-rich-textbox.html','angular','angular-trix','css!./km-control.css'], function(app,template,angular) {

	app.directive('kmRichTextbox', ['$filter', '$timeout', function($filter, $timeout) {
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
						$scope.termLocales = {};	
						$scope.text = {};	
							if(!$scope.toolbar)
									$scope.toolbar = "[['bold', 'italics', 'ul', 'ol', 'redo', 'undo', 'clear']]";

							$scope.$watch('locales', watchLocales);
							$scope.$watch('binding', watchBinding);
							
							//==============================
							//Remove value of not selected languages/empty languages
							//==============================
							function watchLocales() {
								var oLocales = $scope.locales || [];
								var oBinding = $scope.binding || {};
								var oText = {};

								angular.forEach(oLocales, function(locale, i) {
									oText[locale] = oBinding[locale] || oText[locale];
									if(!$scope.termLocales[locale]){
										$scope.termLocales[locale] = { identifier: 'lang-'+locale };
									}
								});
								$scope.text = oText;
								$scope.onchange();
								$timeout(function(){element.find('.lang-tooltip').tooltip()}, 300)
							};

							//==============================
							//Remove value of not selected languages/empty languages
							//==============================
							function watchBinding() {
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

									ngModelController.$setViewValue($scope.binding);
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

							/// Add underline button to the toolbar.
							$scope.trixInitialize = function(e, ed){

								Trix.config.textAttributes.underline = { 
									style: { 'text-decoration': "underline" },
								  parser: function(element) {
									return element.style['text-decoration'] === "underline"
								  },
								  inheritable: true
								 }
								
								var buttonHTML = '<button type="button" class="trix-button trix-button--icon-underline" data-trix-attribute="underline" data-trix-key="u" title="Underline" tabindex="-1">U</button>'
								e.target.toolbarElement.querySelector(".trix-button-group.trix-button-group--text-tools")
									.insertAdjacentHTML("beforeend", buttonHTML)
							}
					}
			};
	}]);
});
