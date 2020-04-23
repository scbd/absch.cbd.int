define(['app', 'angular', 'jquery', 'text!./km-link.html','lodash'], function(app, angular, $, template,_) { 'use strict';
//============================================================
//
//
//============================================================
app.directive('kmLink', ['IStorage', function (storage)
	{
		return {
			restrict: 'EAC',
			template : template,
			replace: true,
			transclude: {
				linkControls: '?linkControls',
				linkDisplay:  '?linkDisplay'
			},
			require : "?ngModel",
			scope: {
				binding    : '=ngModel',
				required   : "@",
				allowLink  : '@',
				allowFile  : '@',
				identifier : '=',
				mimeTypes  : "@"
			},
			link: function ($scope, $element, $attr, ngModelController)
			{
				$scope.locales = {
					"lang-ar" :"Arabic"  ,
					"lang-en" :"English" ,
					"lang-es" :"Spanish" ,
					"lang-fr" :"French"  ,
					"lang-ru" :"Russian" ,
					"lang-zh" :"Chinese" 
				};
				// init
				$scope.links = [];
				$.extend($scope.editor, {
					link     : null,
					url      : null,
					name     : null,
					progress : null,
					error    : null,
					type     : null,
					visible  : false,
					uploadPlaceholder : $element.find("#uploadPlaceholder"),
					mimeTypes : storage.attachments.mimeTypeWhitelist
				});

				if ($attr.mimeTypes)
					$scope.editor.mimeTypes = $attr.mimeTypes.split(";");

						//Watchers
						$scope.$watch("binding", function() {$scope.load()});
						$scope.$watch('binding', function() {
								ngModelController.$setViewValue($scope.binding);
						});


				$scope.$watch("editor.visible", function(_new, _old)
				{
					if(_new!=_old &&  _new) $element.find($scope.editor.type=="file" ? "#editFile" : "#editLink").modal("show");
					if(_new!=_old && !_new) $element.find("#editFile,#editLink").modal("hide");
				});
			},
			controller: ["$scope", function ($scope)
			{
				$scope.editor = {};

				//==============================
				//
				//==============================
				$scope.isAllowLink   = function() { return $scope.allowLink!="false"; };
				$scope.isAllowFile   = function() { return $scope.allowFile!="false"; };

				//==============================
				//
				//==============================
				$scope.load = function()
				{
					var oNewLinks = [];

					angular.forEach($scope.binding || [], function(link)
					{
						oNewLinks.push({
							url  : link.url,
							name : link.name,
							tag  : link.tag,
							language  : link.language
						});
					});

					$scope.links = oNewLinks;
				};

				//==============================
				//
				//==============================
				$scope.save = function()
				{
					var oNewBinding = [];

					angular.forEach($scope.links, function(link)
					{
						var oNewLink = { url : $.trim(link.url) };

						if(link.name && $.trim(link.name||"")!=="")
							oNewLink.name = $.trim(link.name);

						if(link.tag && $.trim(link.tag||"")!=="")
							oNewLink.tag = $.trim(link.tag);

						if(link.language && $.trim(link.language||"")!=="")
							oNewLink.language = $.trim(link.language);

						oNewBinding.push(oNewLink);
					});

					$scope.binding = !$.isEmptyObject(oNewBinding) ? oNewBinding : undefined;
				};

				//==============================
				//
				//==============================
				$scope.isRequired = function()
				{
					return $scope.required!=undefined && $.isEmptyObject($scope.binding);// jshint ignore:line
				};

				//==============================
				//
				//==============================
				$scope.addLink = function()
				{
					if(!this.isAllowLink())
						return;

					$scope.editor.editLink(null);
				};

				//==============================
				//
				//==============================
				$scope.edit = function(link)
				{
					if(link){
						if(/\/api\/v2013\/documents\//.test(link.url)){
							$scope.editor.editFile(link, true)
						}
						else{
							if(!this.isAllowLink())
								return;

							$scope.editor.editLink(link);
						}
					}
				};
				//==============================
				//
				//==============================
				$scope.addFile = function()
				{
					if(!$scope.isAllowFile())
						return;

					if(!$scope.identifier)
						throw "identifier not specified";

					$scope.editor.editFile(null);
				};

				//==============================
				//
				//==============================
				$scope.remove = function(link)
				{
					$scope.links.splice($scope.links.indexOf(link), 1);
					$scope.save();
				};

				//==============================
				//
				//==============================
				$scope.editor.editLink = function(link)
				{
					link = link || {url:"http://www.", name:""};

					$scope.editor.close();

					$scope.editor.link    = link;
					$scope.editor.url     = link.url;
					$scope.editor.name    = link.name;
					$scope.editor.type    = "link";
					$scope.editor.tag 	  = link.tag;
					$scope.editor.language = link.language;
					$scope.editor.visible = true;
				};
				//==============================
				//
				//==============================
				$scope.editor.editFile = function(link, isEdit)
				{
					if(link!=null && !isEdit)// jshint ignore:line
						throw "Only new file is allowed";

					link = link || {url:"", name:"", tag:"", language:""};

					$scope.editor.close();

					$scope.editor.link = link;
					$scope.editor.url  = link.url;
					$scope.editor.name = link.name;
					$scope.editor.type = "file";
					$scope.editor.tag = link.tag;
					$scope.editor.language = link.language;
					if(!isEdit){
						$scope.editor.startUploadProcess(function() {
							$scope.editor.visible = true;
						});
					}
					else{
						$scope.editor.visible = true;
					}
				};

				//==============================
				//
				//==============================
				$scope.editor.close = function()
				{
					$scope.editor.link    = null;
					$scope.editor.url     = null;
					$scope.editor.name    = null;
					$scope.editor.error   = null;
					$scope.editor.type    = null;
					$scope.editor.visible = false;
					$scope.editor.tag     = null;
					$scope.editor.language     = null;
				};

				//==============================
				//
				//==============================
				$scope.editor.save = function()
				{
					var oLink = { url:  $scope.editor.url };

					if($.trim($scope.editor.name||"")!=="")
						oLink.name = $scope.editor.name;

					if($.trim($scope.editor.tag||"")!=="")
						oLink.tag = $scope.editor.tag;

					if($.trim($scope.editor.language||"")!=="")
						oLink.language = $scope.editor.language;

					var iIndex = $scope.links.indexOf($scope.editor.link);

					if(iIndex>=0) $scope.links.splice(iIndex, 1, oLink);
					else          $scope.links.push  (oLink);

					$scope.editor.close();
					$scope.save();
				};

				//==============================
				//
				//==============================
				$scope.editor.startUploadProcess = function(onStartCallback)
				{
					//Clear old <input[file] />;
					$scope.editor.progress = null;
					$scope.editor.uploadPlaceholder.children('input[type=file]').remove();
					$scope.editor.uploadPlaceholder.prepend("<input type='file' style='display:none' />");

					var qHtmlInputFile = $scope.editor.uploadPlaceholder.children("input[type=file]:first");

					qHtmlInputFile.change(function()
					{
						var file = this.files[0];
						var type = storage.attachments.getMimeType(file);
						var link = {
							url: null,
							name: file.name,
							tag : '',
							language: ''
						};

						$scope.safeApply(function() {
							if (onStartCallback)
								onStartCallback();

							$scope.editor.link = link;

							if ($scope.editor.name == "" && file.name != "")// jshint ignore:line
								$scope.editor.name = file.name;

							if ($scope.editor.mimeTypes.indexOf(type) < 0) {
								$scope.editor.onUploadError(link, "File type not supported: " + type);
								return;
							}

							$scope.editor.progress = {
								style: "active",
								position: 0,
								percent:100,
								size: file.size
							};

							storage.attachments.put($scope.identifier, file).then(
								function(result) { //success
									link.url = result.url;
									$scope.editor.onUploadSuccess(link, result.data);
								},
								function(result) { //error
									link.url = result.data.url;
									$scope.editor.onUploadError(link, result.data);
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
				$scope.editor.onUploadProgress = function(link, progress)
				{
					if(!$scope.editor.progress)                 return;
					if( $scope.editor.progress.style!="active") return;
					if( $scope.editor.link !=link)              return;

					console.log('xhr.upload progress: ' + (progress*100) + "%");

					$scope.editor.progress.percent  = Math.round(progress*100);
				};

				//==============================
				//
				//==============================
				$scope.editor.onUploadSuccess = function(link)
				{
					if($scope.editor.link!=link)
						return;

					$scope.editor.url              = link.url;
					$scope.editor.progress.percent = 100;
					$scope.editor.progress.style   = "complete";

					if(link.name && $scope.editor.name!="")// jshint ignore:line
						$scope.editor.name = link.name;

					$scope.editor.progress = null;

					//$scope.editor.save();
				};

				//==============================
				//
				//==============================
				$scope.editor.onUploadError = function(link, message)
				{
					if($scope.editor.link!=link)
						return;

					console.log('xhr.upload error: ' + message);

					$scope.editor.error = message;

					if($scope.editor.progress)
						$scope.editor.progress.style   = "error";
				};

				//====================
				//
				//====================
				$scope.safeApply = function(fn)
				{
					var phase = this.$root.$$phase;

					if (phase == '$apply' || phase == '$digest') {
						if (fn && (typeof (fn) === 'function')) {
							fn();
						}
					} else {
						this.$apply(fn);
					}
				};

			}]
		};
	}]);

});