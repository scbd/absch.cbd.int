import app from '~/app';
import template from "text!./filter-indicator.html";
import filterIndicatorT from '~/app-text/views/reports/chm/reporting-display/filter-indicator.json';

  app.directive('filterIndicator','translationService', [function(translationService) {
    return {
      restrict: 'E',
      template: template,
      replace: true,
      require: '^reportingDisplay',
      scope: {
        title: '@title',
      },
      link: function($scope, $element, $attr, reportingDisplayCtrl) {

        translationService.set('filterIndicatorT', filterIndicatorT );

        $scope.queries = {
            'nationalIndicator': {
              'schema_s': ['nationalAssessment'],
              '_latest_s': ['true'],
              '_state_s': ['public'],
              'nationalIndicators_s' : ['*']
            }
          };
          //=======================================================================
          //
          //=======================================================================
          $scope.loadRecords = function() {

            reportingDisplayCtrl.addSubQuery(_.cloneDeep($scope.queries),'nationalIndicator');
            reportingDisplayCtrl.search();
          }; // loadRecords
          
        } //link
    }; // return
  }]); //app.directive('searchFilterCountries

