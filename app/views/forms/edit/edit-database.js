import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import '~/views/forms/view/view-database.directive';

  export { default as template } from './edit-database.html';

  export default ["$scope", "$http", "$filter", "$controller", "$location", function ($scope, $http, $filter, $controller,$location) {
    $controller('editController', {$scope: $scope});
    $scope.formFields = {};
    //==================================
    //
    //==================================
    $scope.path=$location.path();

    $scope.getCleanDocument = function(document) {

      document = document || $scope.document;

      if (!document)
        return undefined;
      
      if(($scope.formFields.websites||[]).length)
        document.websites = _.map($scope.formFields.websites, function(url){ return { url:url } });      
      document.websites = document.websites || (document.website ? [document.website] : undefined);
      document.website = undefined //obsolete field

      document = angular.fromJson(angular.toJson(document));

      if (/^\s*$/g.test(document.notes))
        document.notes = undefined;

      return $scope.sanitizeDocument(document);
    };

    $scope.setDocument({}).then(function(document){
      $scope.formFields.websites = []
      if((document.websites||[]).length){
        $scope.formFields.websites = _.map(document.websites, 'url');
      }
    });
  }];

