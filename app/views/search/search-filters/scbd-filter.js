import app from 'app';
import template from 'text!./scbd-filter.html';
import scbdFilterT from '~/app-text/views/search/search-filters/scbd-filter.json';

app.directive('scbdFilter', ['translationService', function (translationService) {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            template: template, 
            scope:false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
               translationService.set('scbdFilterT', scbdFilterT);
               $scope.sf_searchFilters = searchDirectiveCtrl.getSearchFilters('schema', function(item){
                return item.otherType == 'scbd'
            })
            }//link
        };
    }]);

