define(['app', '/app/views/forms/edit/edit.js'], function (app) {

  app.controller("editDatabase", ["$scope", "authHttp", "$filter", "$controller", function ($scope, $http, $filter, $controller) {
    $controller('editController', {$scope: $scope});

    $scope.options  = {
      countries         : function() { return $http.get("/api/v2013/thesaurus/domains/countries/terms",            { cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
      libraries         : function() { return $http.get("/api/v2013/thesaurus/domains/cbdClearingHouses/terms",    { cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); }
    };

    //==================================
    //
    //==================================
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

    $scope.setDocument({libraries: [{ identifier: "cbdLibrary:abs-ch" }]});
  }]);
});
