import app from '~/app';
import _ from 'lodash';
import template from "text!./filter-resource-mobilisation.html";
import filterResourceMobilisationT from '~/app-text/views/reports/chm/reporting-display/filter-resource-mobilisation.json';


  app.directive('filterResourceMobilisation','translationService', [function(translationService) {
    return {
      restrict: 'E',
      template: template,
      replace: true,
      require: '^reportingDisplay',
      scope: {
        title: '@title',
      },
      link: function($scope, $element, $attr, reportingDisplayCtrl) {

        translationService.set('filterResourceMobilisationT',filterResourceMobilisationT );

          $scope.queries = {
            'resourceMobilisation': {
              'schema_s': ['resourceMobilisation'],
              '_latest_s': ['true'],
              '_state_s': ['public']
            }
          };
          //=======================================================================
          //
          //=======================================================================
          $scope.loadRecords = function() {

            reportingDisplayCtrl.addSubQuery(_.cloneDeep($scope.queries), 'resourceMobilisation');
            reportingDisplayCtrl.search();
          }; // flatten

        } //link
    }; // return
  }]); //app.directive('searchFilterCountries

