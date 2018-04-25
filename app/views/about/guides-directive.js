define(['app', 'text!./guides-directive.html', 'json!app-data/help-guides.json',
  'components/scbd-angularjs-services/services/locale'], 
function(app, template, guidesData){

    app.directive('guidesPartial', ['locale', '$route', function (locale, $route) {
      return {
        restrict: 'EA',
        template : template,
        link : function($scope, elm, attrs){
            
            if(attrs.allowNavigation && 
                $route.current.params.guideId && guidesData[$route.current.params.guideId]){
                    window.location = guidesData[$route.current.params.guideId];
            }
        }
      }
    }])

});
