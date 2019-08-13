define(['app', 'lodash', 'views/forms/edit/edit', '../view/view-submission.directive',
        'views/forms/edit/organization-selector'], function (app, _) {

  app.controller("editSubmission", ["$scope", "$http", "$filter", "Thesaurus", "$q", "Enumerable", "$controller", "IStorage", "$location",
                function ($scope, $http, $filter, Thesaurus, $q, Enumerable, $controller, storage, $location) {


    $scope.path=$location.path();

    //$scope.organizationsRef = [];
    $controller('editController', {$scope: $scope});

    _.extend($scope.options, {  
        bchThematicAreas: function () {
            return $http.get("/api/v2013/thesaurus/domains/043C7F0D-2226-4E54-A56F-EE0B74CCC984/terms", {
                cache: true
            }).then(function (o) {
                return o.data;
            });
        },
        absThematicAreas: function () {
            return $http.get("/api/v2013/thesaurus/domains/CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924/terms", {
                cache: true
            }).then(function (o) {
                return o.data;
            });
        }
    });

    //==================================
    //
    //==================================
    $scope.getCleanDocument = function() {

      
      var document = $scope.document;

      if (!document)
        return undefined;

      document = angular.fromJson(angular.toJson(document));

      if (/^\s*$/g.test(document.notes))
        document.notes = undefined;

        document.languages = undefined;
        document.languageName = undefined;


      if(!$scope.isOtherSelected(document.resourceTypes))
          document.resourceTypeName = undefined;

      if(document.organizations && document.organizations.length <=0)
          document.organizations = undefined;

        var documentCopy = _.clone(document);

        delete documentCopy.organizationsRef;

      return documentCopy;
    };


    $scope.loadNotifications = function (identifier) {

        var params = {
            q: "schema_s:notification AND date_s:[ " + moment().subtract(3, "years").format() + " TO " + moment().format() + " ] ",
            fl: "identifier_s:symbol_s,title_*, reference_s, symbol_s",
            sort: "symbol_s DESC",
            rows: 99999999
        };
        if(identifier)
            params.q = 'symbol_s:' + identifier;
        return $http.get("/api/v2013/index", { params: params,cache: true})
            .then(function (results) {
                var qResult = _.map(normalizeSolrResult(results.data.response.docs), function(row){
                    row.summary  = row.title;
                    row.title 	 = (row.reference_s||'') + ' (' + (row.symbol_s||'') + ')';
                    return row;
                });
                if(identifier)
                    return qResult[0];
                return qResult;
            });
    }

    $scope.loadSchemaRecords = function (identifier, schema) {

        var sQuery;
        if (schema != '*')
            sQuery = "type eq '" + schema + "'";

        var params = {
            q: "schema_s:" + schema,
            fl: "identifier_s,title_*,summary:acronym_t",
            sort: "title_s ASC",
            rows: 99999999
        };

        if(identifier)//assume identifier, temp TODO: change logic
            params.q = 'identifier_s:' + identifier;
        return $http.get("/api/v2013/index", { params: params, cache: true })
        .then(function (results) {
            var qResult = normalizeSolrResult(results.data.response.docs);
            if(identifier)
                return qResult[0];
            return qResult;
        });
    };

    function normalizeSolrResult(data) {
        var normalData = []
        for (var i = 0; i < data.length; i++) {
            normalData[i] = data[i]
            normalData[i].identifier = data[i].identifier_s
            normalData[i].title = solrPropTolString('title', data[i]);								
        }
        return normalData
    }

    function solrPropTolString(propertyName, solrDoc) {
        if (!solrDoc[propertyName + '_t']) return {}

        var langs = ['EN', 'AR', 'ES', 'FR', 'RU', 'ZH']
        var lString = {}

        for (var i = 0; i < langs.length; i++) {
            lString[langs[i].toLowerCase()] = solrDoc[propertyName + '_' + langs[i] + '_t']
        }
        return lString
    }

    $scope.setDocument({});

  }]);
});
