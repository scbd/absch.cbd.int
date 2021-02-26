define(['text!components/scbd-angularjs-controls/form-control-directives/pagination.html', 'app'], function (template, app) {
    ;

    app.directive('pagination', ['$location', function ($location) {
        return {
            restrict: 'EA',
            template: template,
            scope: {
                currentPage: '=',
                pageCount: '=',
                onPageChange: '&',
                pageSize    : '=',
                numFound    : '=',
                onPageSizeChanged: '&?'
            },
            link: function ($scope, $element, $attr) {

                $scope.range = function (start, end) {
                    if(end<1)
                        return
                    var ret = [];
                    if (!end) {
                        end = start;
                        start = 0;
                    }

                    var maxCount = Number($attr.maxPageCount || 6);
                    var middle = maxCount/2;
                    var count = end - start;

                    if (count > maxCount) {
                        if ($scope.currentPage > middle)
                            start = $scope.currentPage - middle;

                        end = Math.min(count, start + maxCount);
                        start = Math.max(0, end - maxCount);
                    }

                    for (var i = start; i < end; i++) {
                        ret.push(i);
                    }
                    return ret;
                };

                $scope.actionSetPage = function (n) {
                    if(n<1 || n>$scope.pageCount)
                        return;
                    $scope.onPageChange({
                        page: n
                    });                   
                }

            }
        }
    }])

});
