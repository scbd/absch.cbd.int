import app from '~/app';
import _ from 'lodash';
import template from "text!./filter-resource-mobilisation2020.html";
import filterResourceMobilisation2020T from '~/app-text/views/reports/chm/reporting-display/filter-resource-mobilisation2020.json';


  app.directive('filterResourceMobilisation2020', 'translationService',[function(translationService) {
    return {
      restrict: 'E',
      template: template,
      replace: true,
      require: '^reportingDisplay',
      scope: {
        title: '@title',
      },
      link: function($scope, $element, $attr, reportingDisplayCtrl) {

          translationService.set('filterResourceMobilisation2020T',filterResourceMobilisation2020T );


          $scope.queries = {
            'resourceMobilisation2020': {
              'schema_s': ['resourceMobilisation2020'],
              '_latest_s': ['true'],
              '_state_s': ['public']
            }
          };
          //=======================================================================
          //
          //=======================================================================
          $scope.loadRecords = function() {

            reportingDisplayCtrl.addSubQuery(_.cloneDeep($scope.queries), 'resourceMobilisation2020');
            reportingDisplayCtrl.search();
          }; // flatten

        } //link
    }; // return
  }]); //app.directive('searchFilterCountries

