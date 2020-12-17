define(['app'], function (app) {
    app.directive('compareVal', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope:{ },
            link: function ($scope, $element, $attr) {

                var compareClass = $attr.compareVal
                compareClass     = compareClass || $element.siblings().filter('label').text();
                compareClass     = compareClass.replace(/[^A-Z0-9]+/ig, '');

                compareClass = 'compare_' + compareClass;

                $element.addClass('compare-diff');
                $element.addClass(compareClass);
                
            }
        }
    })
})
