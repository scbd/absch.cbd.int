import app from '~/app';
import _ from 'lodash';
import template from "text!./filter-target.html";
import filterTargetT from '~/app-text/views/reports/chm/reporting-display/filter-target.json';



  app.directive('filterTarget', 'translationService',[function(translationService) {
    return {
      restrict: 'E',
      template: template,
      replace: true,
      require: '^reportingDisplay',
      scope: {
        title: '@title',
      },
      link: function($scope, $element, $attr, reportingDisplayCtrl) {
          translationService.set('filterTargetT',filterTargetT );

          $scope.queries = {
            'nationalTarget': {
              'schema_s': ['nationalTarget'],
              '_latest_s': ['true'],
              '_state_s': ['public']
            }
          };
          //=======================================================================
          //
          //=======================================================================
          $scope.loadRecords = function() {

            reportingDisplayCtrl.addSubQuery(_.cloneDeep($scope.queries), 'nationalTarget');
            reportingDisplayCtrl.search();
          }; // loadRecords

        } //link
    }; // return
  }]); //app.directive('searchFilterCountries
