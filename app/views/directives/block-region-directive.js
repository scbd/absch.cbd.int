define(['app'], function(app) {

    app.directive('blockRegion', ['$compile', function($compile) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                activate : '=',
                dynamicText: '=?'
            },
            link: function($scope, $element, attrs) {

                function buildBlockText(){
                    var blockText = 'Loading...';
                    if($scope.dynamicText)
                        blockText = $scope.dynamicText;
                    else if(attrs.blockText)
                        blockText = attrs.blockText;
                        
                    blockText = '<strong>' + blockText + '</strong>';
                    if(!attrs.skipLoadingIcon){
                        blockText = '<i class="fa fa-spin fa-cog fa-3x" />' + blockText;
                    }

                    $element.addClass('blockRegion');
                    var loadtHtml = '<div class="inverted dimmer" ng-class="{\'active\': activate}"><div class="medium loader block-text">'+ blockText + ' </div></div>';

                    $element.remove('.inverted.dimmer');
                    $element.append($compile(loadtHtml)($scope));
                }

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
                $scope.$watch('dynamicText', function(newVal){
                    buildBlockText();
                });

                $scope.$on('$destroy', function(){
                    if(attrs.updateParentPosition)
                        $element.parent().removeClass('blockRegion-parent-position')
                })

                buildBlockText();
            }
        }
    }]);

});
