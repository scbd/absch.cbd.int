import app from '~/app'
import '~/views/forms/edit/edit'
import editLegalFrameworkOverview from './edit-legal-framework-overview.vue'
import legalFrameworkOverview from '~/views/forms/view/abs/legal-framework-overview.vue'
import { provide, reactive } from 'vue'
import { safeDelegate } from '~/services/common'
export { default as template } from './edit-legal-framework-overview.html'

export default ['$scope', '$controller',
  function ($scope, $controller) {
    $controller('editController', {
      $scope
    })

    let vueCleanDocument = null

    function setupFunctions () {
      provide('getCleanDocument', safeDelegate($scope, (options) => {
        options = options || {}
        vueCleanDocument = options
      }))
    }

    $scope.reactive = reactive

    $scope.shareVueComponent = {
      components: { editLegalFrameworkOverview, legalFrameworkOverview },
      setup: setupFunctions
    }

    $scope.getCleanDocument = function (doc) {
      if (vueCleanDocument) { return vueCleanDocument?.getCleanDocument(doc) }
    }

    $scope.setDocument()
  }]
