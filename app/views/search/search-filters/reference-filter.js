import app from 'app';
import template from 'text!./reference-filter.html';
import referenceFilterT from '~/app-text/views/search/search-filters/reference-filter.json';

app.directive('referenceFilter', ['$timeout', 'translationService', function ($timeout, translationService) {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            template: template, 
            scope:false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
               translationService.set('referenceFilterT', referenceFilterT);
               $scope.rf_searchFilters = searchDirectiveCtrl.getSearchFilters('schema', function(item){
                return item.otherType == 'reference'
            })
               
               
                  $timeout(function(){
                                $element.find('[data-bs-toggle="tooltip"]').tooltip();
                            },50);
               
            }//link
        };
    }]);

