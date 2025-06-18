import template from 'text!./pagination.html';
import app from '~/app';
import paginationT from '~/app-text/components/scbd-angularjs-controls/form-control-directives/pagination.json';
import numbers from '~/app-text/common/numbers.json';

app.directive('pagination', ['$location', 'translationService', 
    function ($location, translationService) {
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
                translationService.set('paginationT', paginationT);
                translationService.set('numbers', numbers);
                $scope.allRecordsKey = $attr.storageKey || '';
                // get from localStorage
                const allRecordsValue = localStorage.getItem($scope.allRecordsKey);
                if (allRecordsValue) { // means all
                    $scope.pageSize = parseInt(allRecordsValue, 10); 
                    if ($scope.onPageSizeChanged) {
                        $scope.onPageSizeChanged({ size: $scope.pageSize });
                    }
                }
                $scope.range = function (start, end) {
                    if(end<1)
                        return
                    var ret = [];
                    if (!end) {
                        end = start;
                        start = 0;
                    }
                    var showPages = 6;
                    if(window.innerWidth <= 768){
                        showPages = 3;
                    }
                    var maxCount = Number($attr.maxPageCount || showPages);
                    var middle = Math.floor(maxCount/2);
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
                };
                // move to the all parent's onPageSizeChanged if watch is not required.
                $scope.$watch('pageSize', function (newVal) {
                    if (newVal && $scope.allRecordsKey) {
                        if (newVal===10000)  // 10000 means all records.
                            localStorage.setItem($scope.allRecordsKey, newVal);
                          else 
                          localStorage.setItem($scope.allRecordsKey, '');
                    } 
                });
            }
            
        }
    }])


