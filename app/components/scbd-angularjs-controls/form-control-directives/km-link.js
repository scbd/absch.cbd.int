define(['app', 'angular', 'jquery', 'text!./km-link.html','lodash'], function(app, angular, $, template,_) { 'use strict';
//============================================================
//
//
//============================================================
app.directive('kmLink', function() {
		return {
				restrict: 'EAC',
				template: template,
				replace: true,
				transclude: false,
				require: "?ngModel",
				scope: {
						binding: '=ngModel',
						required: "@",
						allowLink: '@',
						allowFile: '@',
						identifier: '=',
						mimeTypes: "@",
						extensions: "="
				},
				link: function($scope, $element, $attr, ngModelController) {
						// init
						$scope.links = [];
						$.extend($scope.editor, {
								link: null,
								url: null,
								name: null,
								progress: null,
								error: null,
								type: null,
								uploadPlaceholder: $element.find("#uploadPlaceholder"),
								mimeTypes: [ //	"application/octet-stream",
										"application/json",
										"application/ogg",
										"application/pdf",
										"application/xml",
										"application/zip",
										"audio/mpeg",
										"audio/x-ms-wma",
										"audio/x-wav",
										"image/gif",
										"image/jpeg",
										"image/png",
										"image/tiff",
										"text/csv",
										"text/html",
										"text/plain",
										"text/xml",
										"video/mpeg",
										"video/mp4",
										"video/quicktime",
										"video/x-ms-wmv",
										"video/x-msvideo",
										"video/x-flv",
										"application/vnd.oasis.opendocument.text",
										"application/vnd.oasis.opendocument.spreadsheet",
										"application/vnd.oasis.opendocument.presentation",
										"application/vnd.oasis.opendocument.graphics",
										"application/vnd.ms-excel",
										"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
										"application/vnd.ms-powerpoint",
										"application/msword",
										"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
								]
						});

						if ($attr.mimeTypes)
								$scope.editor.mimeTypes = $attr.mimeTypes.split(";");

						//Watchers
						$scope.$watch("binding", $scope.load);
						$scope.$watch('binding', function() {
								ngModelController.$setViewValue($scope.binding);
						});


						$scope.editor.show = function(visibility) {
								if (visibility) {
										$element.find($scope.editor.type == "file" ? "#editLink" : "#editFile").modal("hide");
										$element.find($scope.editor.type == "file" ? "#editFile" : "#editLink").modal("show");
								} else {
										$element.find("#editFile,#editLink").modal("hide");
								}

						};
				},
				controller: ["$scope", "IStorage", "$filter", function($scope, storage, $filter) {
						$scope.editor = {};

						//==============================
						//
						//==============================
						$scope.isAllowLink = function() {
								return $scope.allowLink != "false";
						};
						$scope.isAllowFile = function() {
								return $scope.allowFile != "false";
						};

						//==============================
						//
						//==============================
						$scope.load = function() {
								var oNewLinks = [];

								angular.forEach($scope.binding || [], function(link, i) {

										oNewLinks.push(clone(link));
								});

								$scope.links = oNewLinks;
						};

						$scope.showModel = function(model, type) {

								if (type == 'file') {
										return $filter("term")(model);
								} else
										return model;
						};

						//==============================
						//
						//==============================
						$scope.save = function() {
								var oNewBinding = [];

								angular.forEach($scope.links, function(link, i) {
										var oNewLink = clone(link);

										oNewLink.url = $.trim(link.url);

										if (link.name && $.trim(link.name) !== "")
												oNewLink.name = $.trim(link.name);

										//
										_.each(oNewLink, function(val, key) {

												if (!val)
														oNewLink[key] = undefined;
										});
										oNewBinding.push(oNewLink);
								});

								oNewBinding = _.compact(oNewBinding);

								$scope.binding = !$.isEmptyObject(oNewBinding) ? oNewBinding : undefined;
						};

						//==============================
						//
						//==============================
						$scope.isRequired = function() {
								return $scope.required != undefined && $.isEmptyObject($scope.binding);
						};

						//==============================
						//
						//==============================
						$scope.addLink = function() {
								if (!this.isAllowLink())
										return;

								$scope.editor.editLink(null);
						};

						//==============================
						//
						//==============================
						$scope.addFile = function() {
								if (!$scope.isAllowFile())
										return;

								if (!$scope.identifier)
										throw "identifier not specified";

								$scope.editor.editFile(null);
						};

						//==============================
						//
						//==============================
						$scope.remove = function(link) {
								$scope.links.splice($scope.links.indexOf(link), 1);
								$scope.save();
						};

						//==============================
						//
						//==============================
						$scope.editor.editLink = function(link) {
										link = link || {
												url: "",
												name: ""
										};

										$scope.editor.close();

										$scope.editor.link = link;
										$scope.editor.url = link.url;
										$scope.editor.name = link.name;
										$scope.editor.extensions = clone(_.omit(link, "url", "name")) || {};
										$scope.editor.type = "link";
										$scope.editor.show(true);
								};
								//==============================
								//
								//==============================
						$scope.editor.editFile = function(link) {
								if (link !== null)
										throw "Only new file is allowed";

								link = link || {
										url: "",
										name: ""
								};

								$scope.editor.close();

								$scope.editor.link = link;
								$scope.editor.url = link.url;
								$scope.editor.name = link.name;
								$scope.editor.extensions = clone(_.omit(link, "url", "name"));
								$scope.editor.type = "file";

								$scope.editor.startUploadProcess(function() {
										$scope.editor.show(true);
								});
						};

						//==============================
						//
						//==============================
						$scope.editor.close = function() {
								$scope.editor.link = null;
								$scope.editor.url = null;
								$scope.editor.name = null;
								$scope.editor.error = null;
								$scope.editor.extensions = null;
								$scope.editor.type = null;
								$scope.editor.show(false);
						};

						//==============================
						//
						//==============================
						$scope.editor.save = function(type) {
								var oLink = {
										url: $scope.editor.url
								};

								if ($.trim($scope.editor.name || "") !== "")
										oLink.name = $scope.editor.name;

								oLink = _.extend(oLink, clone($scope.editor.extensions));
								oLink.type = type;
								var iIndex = $scope.links.indexOf($scope.editor.link);

								if (iIndex >= 0) $scope.links.splice(iIndex, 1, oLink);
								else $scope.links.push(oLink);

								$scope.editor.close();
								$scope.save();
						};

						//==============================
						//
						//==============================
						$scope.editor.startUploadProcess = function(onStartCallback) {
								//Clear old <input[file] />;
								$scope.editor.progress = null;
								$scope.editor.uploadPlaceholder.children('input[type=file]').remove();
								$scope.editor.uploadPlaceholder.prepend("<input type='file' style='display:none' />");

								var qHtmlInputFile = $scope.editor.uploadPlaceholder.children("input[type=file]:first");

								qHtmlInputFile.change(function() {
										var file = this.files[0];
										var type = storage.attachments.getMimeType(file);
										var link = {
												url: null,
												name: file.name
										};

										$scope.safeApply(function() {
												if (onStartCallback)
														onStartCallback();

												$scope.editor.link = link;

												if ($scope.editor.name === "" && file.name !== "")
														$scope.editor.name = file.name;

												if ($scope.editor.mimeTypes.indexOf(type) < 0) {
														$scope.editor.onUploadError(link, "File type not supported: " + type);
														return;
												}

												$scope.editor.progress = {
														style: "active",
														position: 0,
														percent: 100,
														size: file.size
												};

												if ((file.size / (1024 * 1024)).toFixed(2) > 20) {

														$scope.editor.onUploadError(link, {
																'status': 413
														});
														return;
												}
												storage.attachments.put($scope.identifier, file).then(
														function(result) { //success
																link.url = result.url;
																$scope.editor.onUploadSuccess(link, result.data);
														},
														function(result) { //error
																link.url = result.data.url;
																$scope.editor.onUploadError(link, result);
														},
														function(progress) { //progress
																$scope.editor.onUploadProgress(link, progress);
														});
										});
								});

								qHtmlInputFile.click();
						};


						//==============================
						//
						//==============================
						$scope.editor.onUploadProgress = function(link, progress) {
								if (!$scope.editor.progress) return;
								if ($scope.editor.progress.style != "active") return;
								if ($scope.editor.link != link) return;

								console.log('xhr.upload progress: ' + (progress * 100) + "%");

								$scope.editor.progress.position = position;
								$scope.editor.progress.percent = Math.round(progress * 100);
						};

						//==============================
						//
						//==============================
						$scope.editor.onUploadSuccess = function(link, message) {
								if ($scope.editor.link != link)
										return;

								$scope.editor.url = link.url;
								$scope.editor.progress.percent = 100;
								$scope.editor.progress.style = "complete";

								if (link.name && $scope.editor.name !== "")
										$scope.editor.name = link.name;

								if (!$scope.extensions || !$scope.extensions.length)
										$scope.editor.save();
						};

						//==============================
						//
						//==============================
						$scope.editor.onUploadError = function(link, message) {
								if ($scope.editor.link != link)
										return;

								console.log('xhr.upload error: ', message);
								if (message.status == 401)
										$scope.editor.error = 'Unauthorised access, please make sure you are logged in.';
								else if (message.status == 413)
										$scope.editor.error = 'File too big, maxium file size allowed is 20 MB.';
								else
										$scope.editor.error = 'There was a error uploading your file, please try again.';
										//message.data;

								if ($scope.editor.progress)
										$scope.editor.progress.style = "error";
						};

						//====================
						//
						//====================
						$scope.safeApply = function(fn) {
								var phase = this.$root.$$phase;

								if (phase == '$apply' || phase == '$digest') {
										if (fn && (typeof(fn) === 'function')) {
												fn();
										}
								} else {
										this.$apply(fn);
								}
						};

						//====================
						//
						//====================
						function clone(obj) {
								if (obj === undefined) return undefined;
								if (obj === null) return null;

								return _.clone(obj);
						}

				}]
		};
	});
});