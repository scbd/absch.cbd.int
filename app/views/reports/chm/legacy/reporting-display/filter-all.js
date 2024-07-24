import app from '~/app';
import _ from 'lodash';
import template from "text!./filter-all.html";
import filterAllT from '~/app-text/views/reports/chm/reporting-display/filter-all.json';


  app.directive('filterAll','translationService', [function(translationService) {
    return {
      restrict: 'E',
      template: template,
      replace: true,
      require: '^reportingDisplay',
      scope: {
        title: '@title',
      },
      link: function($scope, $element, $attr, reportingDisplayCtrl) {

        translationService.set('filterAllT',filterAllT );

          $scope.queries = {
            'all': {
              'schema_s': [
                'nationalReport',
                'nationalReport6',
                'nationalAssessment',
                'resourceMobilisation',
                'resourceMobilisation2020',
                'nationalIndicator',
                'nationalTarget'
              ],
              '_latest_s': ['true'],
              '_state_s': ['public']
            }
          };

          //=======================================================================
          //
          //=======================================================================
          $scope.loadRecords = function() {

            reportingDisplayCtrl.addSubQuery(_.cloneDeep($scope.queries), 'all');
            reportingDisplayCtrl.search();
          }; // loadRecords

        } //link
    }; // return
  }]); //app.directive('searchFilterCountries

