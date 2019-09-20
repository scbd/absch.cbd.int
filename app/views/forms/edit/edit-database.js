define(['app', 'views/forms/edit/edit',
        '../view/view-database.directive'], function (app) {

  app.controller("editDatabase", ["$scope", "$http", "$filter", "$controller", "$location", function ($scope, $http, $filter, $controller,$location) {
    $controller('editController', {$scope: $scope});

    //==================================
    //
    //==================================
    $scope.path=$location.path();

    $scope.getCleanDocument = function(document) {

      document = document || $scope.document;

      if (!document)
        return undefined;

      document = angular.fromJson(angular.toJson(document));

      if (document.website) {

        var oWebSite = document.website;

        if (_.isEmpty(oWebSite))       oWebSite = undefined;
        if (oWebSite && !oWebSite.url) oWebSite = undefined;

        if (oWebSite)
          oWebSite = _.pick(oWebSite, "url", "name");

        document.website = oWebSite;
      }

      if (/^\s*$/g.test(document.notes))
        document.notes = undefined;

      return document;
    };

    $scope.setDocument({});
  }]);
});
