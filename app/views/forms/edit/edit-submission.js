define(['app', 'lodash', 'views/forms/edit/edit', '../view/view-submission.directive',
        'views/forms/edit/organization-selector', 'services/solr', 'services/search-service'], function (app, _) {

  app.controller("editSubmission", ["$scope", "$http", "$controller", "realm", 'searchService', 'solr',
   function ($scope, $http, $controller, realm, searchService, solr) {

    $scope.isBch = realm.is('BCH');
    $scope.isAbs = realm.is('ABS');
    $scope.notificationQuery = {
        q   : "schema_s:notification",
        fl  : "identifier_s:symbol_s,rec_title:title_s,reference_s,symbol_s,rec_date:updatedDate_dt,schema_s"
    }; 
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

        return $scope.sanitizeDocument(documentCopy);
    };

    $scope.onNotificationSelected = function(){
        console.log('onnoti')
        if((($scope.document||{}).notifications||[]).length){
            var selected = _.map($scope.document.notifications, 'identifier');
            var query = 'schema_s:notification AND symbol_s:(' + _.map(selected, solr.escape).join(' ') + ')';
            searchService.list({
                query : query,
                fields: $scope.notificationQuery.fl
            })
            .then(function(result){                
                $scope.notifications = formatRecords(result.data.response.docs);
            });
        }
        else
            $scope.notifications = [];
    }

    $scope.onRecordsFetched = function(data){
        formatRecords(data.docs);
        return data;
    }

    function formatRecords(docs){
        _.each(docs, function(row){
            row.rec_summary  = row.rec_title;
			row.rec_title 	 = (row.reference_s||'') + ' (' + (row.symbol_s||'') + ')';
        });
        return docs;
    }

    $scope.setDocument({}, true).then(function(doc){
        $scope.onNotificationSelected();
    });

  }]);
});
