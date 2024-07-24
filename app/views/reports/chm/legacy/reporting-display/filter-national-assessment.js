import app from '~/app';
import _ from 'lodash';
import template from "text!./filter-national-assessment.html";
import filterNationalAssessmentT from '~/app-text/views/reports/chm/reporting-display/filter-national-assessment.json';

 
  app.directive('filterNationalAssessment','translationService', [function(translationService) {
    return {
      restrict: 'E',
      template: template,
      replace: true,
      require: '^reportingDisplay',
      scope: {
        title: '@title',
      },
      link: function($scope, $element, $attr, reportingDisplayCtrl) {

          translationService.set('filterNationalAssessmentT', filterNationalAssessmentT );

          $scope.queries = {
            'nationalAssessment': {
              'schema_s': ['nationalAssessment'],
              '_latest_s': ['true'],
              '_state_s': ['public'],
              'type_s'    : ['national']
            }
          };
          //=======================================================================
          //
          //=======================================================================
          $scope.loadRecords = function() {

            reportingDisplayCtrl.addSubQuery(_.cloneDeep($scope.queries), 'nationalAssessment');
            reportingDisplayCtrl.search();
          }; // loadRecords

        } //link
    }; // return
  }]); //app.directive('searchFilterCountries

