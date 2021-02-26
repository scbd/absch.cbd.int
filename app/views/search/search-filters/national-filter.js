define(['app',
'text!./national-filter.html',], function(app, template) {

    app.directive('nationalFilter', function($timeout) {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            template: template, 
            scope:false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
               
               $scope.nf_searchFilters = searchDirectiveCtrl.getSearchFilters('schema', function(item){
                   return item.otherType == 'national'
               });
               $scope.nf_partyStatus = searchDirectiveCtrl.getSearchFilters("partyStatus");
               
               
                  $timeout(function(){
                                $element.find('[data-toggle="tooltip"]').tooltip();
                            },50);
   
            }//link
        };
    });
});
