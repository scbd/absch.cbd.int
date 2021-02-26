define(['app', 'text!./km-link-list.html','lodash', 'components/scbd-angularjs-services/services/mime.type.service'], function(app, template,_) { ;
//============================================================
//
//
//============================================================
app.directive('kmLinkList', ['MimeService', function (MimeService){
		return {
			restrict: 'EA',
			template : template,
			replace: true,
			transclude: false,
			require : "?ngModel",
			scope: {
				ngModel    : '=ngModel'
			},
			link: function ($scope, $element, $attr)
			{
				$scope.locales = {
					"lang-ar" :"Arabic"  ,
					"lang-en" :"English" ,
					"lang-es" :"Spanish" ,
					"lang-fr" :"French"  ,
					"lang-ru" :"Russian" ,
					"lang-zh" :"Chinese" 
				};
                $scope.target = $attr.target||'_blank'
                // storage.attachments.mimeTypeWhitelist

                $scope.getIcon = function(item){
                    if(item){
                        var fileName = item.url||item.name
                        var mime = MimeService.lookup(fileName);
                        if(mime)
                            return MimeService.mimeIcon(mime)
                    }

                    return 'fa-link'
				}
				
				$scope.getNameFromUrl = function(url){
					url = decodeURI(url);

					if(/\/api\/v201/.test(url)){
						try{
							return url.substr(url.lastIndexOf('/')+1, url.length);
						}
						catch(e){}
					}

					return url;
				}

				$scope.getNonUNLanguage = function(lang){
					return {
						identifier:'lang-'+lang
					}
				}
			}
		};
	}]);

});