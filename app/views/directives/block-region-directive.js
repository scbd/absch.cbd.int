define(['app'], function(app) {

    app.directive('blockRegion', ['$compile', function($compile) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                activate : '=',
                blockText: '=?'
            },
            link: function($scope, $element, attrs) {

                function buildBlockText(){
                    var blockText = ''; 
                    if(!attrs.skipLoadingIcon){
                        blockText = 'Loading...';
                        if($scope.blockText)
                            blockText = $scope.blockText;
                        if(!$scope.blockText && attrs.defaultText)
                            blockText = attrs.defaultText;
                            
                        blockText = '<i class="fa fa-spin fa-cog fa-3x" /> <strong>' + blockText + '</strong>';
                    }

                    $element.addClass('blockRegion');
                    var loadtHtml = '<div class="inverted dimmer" ng-class="{\'active\': activate}"><div class="medium loader block-text">'+ blockText + ' </div></div>';

                    $element.empty().append($compile(loadtHtml)($scope));
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
                $scope.$watch('blockText', function(newVal){
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
