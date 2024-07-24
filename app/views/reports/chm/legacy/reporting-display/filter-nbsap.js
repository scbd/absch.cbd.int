import app from '~/app';
import _ from 'lodash';
import template from "text!./filter-nbsap.html";
import filterNbsapT from '~/app-text/views/reports/chm/reporting-display/filter-nbsap.json';



  app.directive('filterNbsap', 'translationService',[function(translationService) {
    return {
      restrict: 'E',
      template: template,
      replace: true,
      require: '^reportingDisplay',
      scope: {
        title: '@title',
      },
      link: function($scope, $element, $attr, reportingDisplayCtrl) {

          translationService.set('filterNbsapT', filterNbsapT );

          $scope.queries = {
            'nbsaps': {
              'schema_s': ['nationalReport'],
              'reportType_s': ['B0EBAE91-9581-4BB2-9C02-52FCF9D82721'],
              '_latest_s': ['true'],
              '_state_s': ['public']
            }
          };
          //=======================================================================
          //
          //=======================================================================
          $scope.loadRecords = function() {

            reportingDisplayCtrl.addSubQuery(_.cloneDeep($scope.queries), 'nbsaps');
            reportingDisplayCtrl.search();
          }; // loadRecords

        } //link
    }; // return
  }]); //app.directive('sfilterNbsap

