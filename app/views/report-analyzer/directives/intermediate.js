import app from 'app';

    app.directive('indeterminate', [function() {

        return {
            restrict: 'A',
            scope: {
                indeterminateFn: '&indeterminate'
            },
            link: function ($scope, $element) {

                $scope.$watch('indeterminateFn()', function(value) {

                    $element.prop('indeterminate', value);

                });
            }
        };
    }]);

