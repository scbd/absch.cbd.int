import app from '~/app'
import '~/views/forms/edit/edit'
import '~/views/forms/directives/nr-yes-no'
import '~/views/forms/edit/document-selector'
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

    $scope.reviewData = { body: {} }

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

    $scope.getCleanDocument = (doc) => {
      if (vueCleanDocument) {
        const cleanDocument = vueCleanDocument?.getCleanDocument(doc)
        $scope.reviewData = { body: cleanDocument }

        return cleanDocument
      }
    }

    $scope.setDocument()
  }]
