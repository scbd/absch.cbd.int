﻿define(['text!./pagination.html', 'app'], function (template, app) {
    'use strict';

    app.directive('pagination', function () {
        return {
            restrict: 'EA',
            template: template,
            scope: {
                currentPage: '=',
                pageCount: '=',
                onPageChange: '&'
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

                    var maxCount = 6;
                    var middle = 3;
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
                    $scope.onPageChange({
                        page: n
                    });
                }

            }
        }
    })

});
