define(['app', 'text!./common-formats-directive.html',  'components/scbd-angularjs-services/services/locale'], 
function(app, template){

    app.directive('commonFormatLinks', ['locale', '$route', function (locale, $route) {
      return {
        restrict: 'EA',
        template : template,
        link : function($scope, elm, attrs){
            $scope.language = locale;

            if(attrs.allowNavigation && $route.current.params.commonFormat){
                var link = $element.find('#'+$route.current.params.commonFormat.toUpperCase());
                
                if(link)
                    window.location = link.attr('href').replace('{{language}}', locale);
            }
        }
      }
    }])

});
