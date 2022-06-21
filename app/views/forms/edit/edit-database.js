import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import '~/views/forms/view/view-database.directive';
import editDatabaseT from '~/app-text/views/forms/edit/edit-database.json';

  export { default as template } from './edit-database.html';

export default ["$scope", "$http", "$filter", "$controller", "$location", "translationService",
  function ($scope, $http, $filter, $controller, $location, translationService) {
    $controller('editController', {$scope: $scope});
    translationService.set('editDatabaseT', editDatabaseT);
    $scope.formFields = {};
    //==================================
    //
    //==================================
    $scope.path=$location.path();

    $scope.getCleanDocument = function(document) {

      document = document || $scope.document;

      if (!document)
        return undefined;
      
      document = angular.fromJson(angular.toJson(document));

      if (/^\s*$/g.test(document.notes))
        document.notes = undefined;

      return $scope.sanitizeDocument(document);
    };

    $scope.setDocument({}).then(function(document){
      document.websites = document.websites || (document.website ? [document.website] : undefined);
      document.website = undefined //obsolete field
    });
  }];

