define(['app', 'underscore', '/app/views/forms/edit/edit.js',
        '../view/view-endorsement.directive.js', '/app/services/search-service.js'], function (app, _) {

  app.controller("editEndorsement", ["$scope", "$http", "searchService", "$controller", "$location", 'realm',
  function ($scope, $http, searchService, $controller,$location, realm) {
    $controller('editController', {$scope: $scope});

    $scope.temp = {};
    $scope.path= $location.path();

    _.extend($scope.options, {
      endorsedSchemas		: function () {
        var schemas = [];
            schemas.push({"identifier": "resource", "title": "Virtual Library Records"});
            schemas.push({"identifier": "modelContractualClause", "title": "Model Contractual Clauses, Codes of Conduct, Guidelines, Best Practices and/or Standards"});
            schemas.push({"identifier": "communityProtocol", "title": "Community protocols and procedures and customary laws"});
        return schemas;
      },
      referenceRecords    : function(){
          console.log('ref rec');
            return loadReferenceRecords();
        }
    });

    function loadReferenceRecords(){
        if($scope.temp.endorsedSchema){
            var searchQuery = {
                fields: 'title_t, createdDate_dt, schema_s, identifier_s',
                query : 'realm_ss:' + realm.value.toLowerCase() + ' AND schema_s:' + $scope.temp.endorsedSchema.identifier
            };

            return searchService.list(searchQuery)
                .then(function(data){
                    var records = _.map(data.data.response.docs, function(document){
                                        return { identifier : document.identifier_s, title : document.title_t } ;
                                    });
                    console.log(records);
                    return records;
                });

        }
        // else {
        //     return;
        // }
    }

    $scope.getCleanDocument = function(document) {

        document = document || $scope.document;

        if (!document)
          return undefined;

        document = angular.fromJson(angular.toJson(document));

        if($scope.temp.endorsedSchema)
            document.endorsedSchema = $scope.temp.endorsedSchema.identifier;

      return document;
    };

    $scope.$watch('temp.endorsedSchema', function(newVal){
        if($scope.options){
            $scope.options.referenceRecords = loadReferenceRecords();
        }
    });

    $scope.$watch('document', function(newVal){
        if(newVal && newVal.endorsedSchema){
            if(!$scope.temp.endorsedSchema || $scope.temp.endorsedSchema.indentifier != newVal.endorsedSchema)
                $scope.temp.endorsedSchema = { 'identifier' : newVal.endorsedSchema };
        }
    });

    $scope.setDocument({});
  }]);
});
