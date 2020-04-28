define(['app'], function (app) {
    app.directive('compareVal', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope:{
                compareClass:'@compareVal'
            },
            link: function ($scope, $element, $attr) {
                var compareClass = $element.siblings().filter('label').text();
                compareClass     = compareClass.replace(/[^A-Z0-9]+/ig, '');
                if(compareClass=='')
                    compareClass = $scope.compareClass;                

                compareClass = 'compare_' + compareClass;

                $element.addClass('compare-diff');
                $element.addClass(compareClass);
                
            }
        }
    })
})
