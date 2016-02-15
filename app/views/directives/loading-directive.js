define(['app'], function(app) {

    app.directive('blockRegion', ['$compile', function($compile) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                activate : '='
            },
            link: function($scope, $element, attrs) {
                $element.addClass('blockRegion');
                var loadtHtml = '<div class="inverted dimmer" ng-class="{\'active\': activate}"><div class="medium loader"><i class="fa fa-spin fa-cog" />Loading</div></div>';

                $element.append($compile(loadtHtml)($scope));

            }
        }
    }]);

});
