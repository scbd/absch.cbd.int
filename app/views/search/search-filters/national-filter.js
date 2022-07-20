import app from '~/app';
import template from 'text!./national-filter.html';
import nationalFilterT from '~/app-text/views/search/search-filters/national-filter.json';

app.directive('nationalFilter', ['$timeout', 'translationService', function ($timeout, translationService) {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            template: template, 
            scope:false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
               translationService.set('nationalFilterT', nationalFilterT);
               $scope.nf_searchFilters = searchDirectiveCtrl.getSearchFilters('schema', function(item){
                   return item.otherType == 'national'
               });
               $scope.nf_partyStatus = searchDirectiveCtrl.getSearchFilters("partyStatus");
               
               
                  $timeout(function(){
                                $element.find('[data-bs-toggle="tooltip"]').tooltip();
                            },50);
   
            }//link
        };
    }]);

