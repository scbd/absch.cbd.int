import app from '~/app';
import _ from 'lodash';
import template from "text!./filter-report.html";
// import filterReportT from '~/app-text/views/reports/chm/reporting-display/filter-report.json';


  app.directive('filterReport', ['$http', 'Thesaurus', '$location','translationService', function($http, thesaurus, $location,translationService) {
    return {
      restrict: 'EAC',
      template: template,
      replace: true,
      require: '^reportingDisplay',
      scope: {
        title: '@title',
        items: '=ngModel',
        schema: '=schema',
      },
      link: function($scope, $element, $attr, reportingDisplayCtrl) {

          // translationService.set('filterReportT',filterReportT );

          $scope.classPanelCollapse = "panel-collapse";
          $scope.classCollapse = "collapse";

          $scope.terms = [{
            id: 'nr6',
            title: '6th National Report',
            selected: 0
          }, {
            id: 'nr5',
            title: '5th National Report',
            selected: 0
          }, {
            id: 'nr4',
            title: '4th National Report',
            selected: 0
          }, {
            id: 'nr3',
            title: '3rd National Report',
            selected: 0
          }, {
            id: 'nr2',
            title: '2nd National Report',
            selected: 0
          }, {
            id: 'nr1',
            title: '1st National Report',
            selected: 0
          }];

          $scope.queries = {
            'nr6': {
              'schema_s': ['nationalReport6'],
              '_latest_s': ['true'],
              '_state_s': ['public']
            }, 
            'nr5': {
              'schema_s': ['nationalReport'],
              'reportType_s': ['B3079A36-32A3-41E2-BDE0-65E4E3A51601'],
              '_latest_s': ['true'],
              '_state_s': ['public']
            },
            'nr4': {
              'schema_s': ['nationalReport'],
              'reportType_s': ['272B0A17-5569-429D-ADF5-2A55C588F7A7'],
              '_latest_s': ['true'],
              '_state_s': ['public']
            },
            'nr3': {
              'schema_s': ['nationalReport'],
              'reportType_s': ['DA7E04F1-D2EA-491E-9503-F7923B1FD7D4'],
              '_latest_s': ['true'],
              '_state_s': ['public']
            },
            'nr2': {
              'schema_s': ['nationalReport'],
              'reportType_s': ['A49393CA-2950-4EFD-8BCC-33266D69232F'],
              '_latest_s': ['true'],
              '_state_s': ['public']
            },
            'nr1': {
              'schema_s': ['nationalReport'],
              'reportType_s': ['F27DBC9B-FF25-471B-B624-C0F73E76C8B3'],
              '_latest_s': ['true'],
              '_state_s': ['public']
            }
          };

          var filter = _([$location.search().filter]).flatten().compact().value()[0];
          if (filter === 'nr6' || filter === 'nr5' || filter === 'nr4' || filter === 'nr3' || filter === 'nr2' || filter === 'nr1') {
            var term = _.find($scope.terms, function(term) {
              return term.id === filter;
            });
            term.selected = 1;
            $scope.classCollapse = "in";
          }

          //=======================================================================
          //
          //=======================================================================
          $scope.termsNotSelected = function() {
            _.each($scope.terms, function(term) {
              term.selected = 0;
            });
          }; //buildTermsAndQuery()

          //=======================================================================
          //
          //=======================================================================
          $scope.loadReports = function(type) {

            var query = {};
            $scope.schema = type;
            query[type] = $scope.queries[type];

            reportingDisplayCtrl.addSubQuery(_.cloneDeep(query), type);
            reportingDisplayCtrl.search();
          }; // flatten

        } //link
    }; // return
  }]); //app.directive('searchFilterCountries

