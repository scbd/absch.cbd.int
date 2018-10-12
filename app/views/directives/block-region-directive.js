define(['app'], function(app) {

    app.directive('blockRegion', ['$compile', function($compile) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                activate : '='
            },
            link: function($scope, $element, attrs) {
                var blockText = ''; 
                if(!attrs.skipLoadingIcon){
                    blockText = 'Loading...';                                   
                    if(attrs.blockText)
                        blockText = attrs.blockText;

                    blockText = '<i class="fa fa-spin fa-cog" /> <strong>' + blockText + '</strong>';
                }

                $element.addClass('blockRegion');
                var loadtHtml = '<div class="inverted dimmer" ng-class="{\'active\': activate}"><div class="medium loader">'+ blockText + ' </div></div>';

                $element.append($compile(loadtHtml)($scope));

                $scope.$watch('activate', function(newVal){
                    if(newVal){
                        $element.addClass('blockRegion');
                        if(attrs.updateParentPosition)
                            $element.parent().addClass('blockRegion-parent-position')
                    }
                    else{
                        $element.removeClass('blockRegion');
                        if(attrs.updateParentPosition)
                            $element.parent().removeClass('blockRegion-parent-position')
                    }
                });

                $scope.$on('$destroy', function(){
                    if(attrs.updateParentPosition)
                        $element.parent().removeClass('blockRegion-parent-position')
                })
            }
        }
    }]);

});
