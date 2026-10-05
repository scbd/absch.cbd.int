import app from '~/app'
import template from 'text!./view-abs-legal-framework.directive.html'
import legalFrameworkOverview from '~/views/forms/view/abs/abs-legal-framework-overview.vue'

app.directive('viewAbsLegalFramework', [function () {
  return {
    restrict: 'EAC',
    template,
    replace: true,
    transclude: false,
    scope: {
      document: '=ngModel',
      documentInfo: '=?',
      locale: '='
    },
    link: function ($scope) {
      $scope.mergedDocumentInfo = Object.assign({}, $scope.documentInfo, { body: $scope.document })

      $scope.legalFrameworkOverviewVue = {
        components: { legalFrameworkOverview }
      }
    }
  }
}])
