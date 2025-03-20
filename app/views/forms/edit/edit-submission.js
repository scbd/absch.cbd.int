import app from '~/app';
import _ from 'lodash';
import '~/views/forms/edit/edit';
import '~/views/forms/view/view-submission.directive';
import '~/services/main';
import editsubmissionT from '~/app-text/views/forms/edit/edit-submission.json';

  export { default as template } from './edit-submission.html';

export default ["$scope", "$http", "$controller", "realm", 'searchService', 'solr', 'thesaurusService', 'translationService', '$location',
  function ($scope, $http, $controller, realm, searchService, solr, thesaurusService, translationService, $location) {
    translationService.set('editsubmissionT', editsubmissionT);
    $scope.isBch = realm.is('BCH');
    $scope.isAbs = realm.is('ABS');

    $scope.notificationQuery = {
        q   : "schema_s:notification",
        fl  : "identifier_s:symbol_s,rec_title:title_s,reference_s,symbol_s,rec_date:updatedDate_dt,schema_s"
    };
    $scope.organizationQuery = 'schema_s:organization OR (schema_s:contact AND type_s:organization)' 
    $controller('editController', {$scope: $scope});

    _.extend($scope.options, { 
        bchThematicAreas: function() {return thesaurusService.getDomainTerms('cpbThematicAreas',{other:true, otherType:'lstring'}); },
        absThematicAreas: function() {return thesaurusService.getDomainTerms('absSubjects');} 
    });

    $scope.onContactQuery = function(searchText){
      
      var queryOptions = {
        realm       : realm.value,
        fieldQueries:['schema_s:organization' ],
        searchText  : searchText
      }
      
     return  $scope.onBuildDocumentSelectorQuery(queryOptions);
    }
   $scope.onRecordsQuery = function(searchText){
       var queryOptions = {
           realm       : realm.value,
           searchText  : searchText
       }
       if($scope.document?.header?.identifier)
            queryOptions.fieldQueries = [`NOT identifier_s:${solr.escape($scope.document.header.identifier)}`];
       return  $scope.onBuildDocumentSelectorQuery(queryOptions);
   }

     $scope.onNotificationQuery = function(searchText){
       var queryOptions = {
          realm       : realm.value,
          schemas	  : ['notification'],
          searchText: searchText,
          sort      : 'updatedDate_dt desc',
          fields    : 'id, rec_date:updatedDate_dt, rec_creationDate:createdDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s,'+
                      '_revision_i, rec_title:title_EN_t,rec_summary:summary_t, rec_type:type_EN_t, '+ $scope.notificationQuery.fl
       }
       return $scope.onBuildDocumentSelectorQuery(queryOptions);
     }

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

      if(document.organizations && !document.organizations.length)
          document.organizations = undefined;

        var documentCopy = _.clone(document);

        delete documentCopy.organizationsRef;

        return $scope.sanitizeDocument(documentCopy);
    };

    $scope.onNotificationSelected = function(){
        if((($scope.document||{}).notifications||[]).length){
            var selected = _.map($scope.document.notifications, 'identifier');
            const selectedIds = _.map(selected, solr.escape);
            if(selectedIds?.length){
							var query = `schema_s:notification AND (identifier_s:(${selectedIds.join(' ')} OR symbol_s:(${selectedIds.join(' ')})))`;
              searchService.list({
                  query : query,
                  fields: $scope.notificationQuery.fl
              })
              .then(function(result){                
                
                    $scope.notifications = formatRecords(result.data.response.docs);
                    // Remove notifications that were not found (404)
                    let foundIdentifiers = result.data.response.docs.map(doc => doc.identifier_s);
                    $scope.document.notifications = $scope.document.notifications.filter(notif => foundIdentifiers.includes(notif.identifier));

                })
                .catch(function(error) {
                    console.error("Error fetching notifications:", error);
                    $scope.notifications = [];
                });
            }
            else{
              $scope.notifications = [];
            }
        }
        else
            $scope.notifications = [];
    }

    $scope.onRecordsFetched = function(data){
        formatRecords(data.docs);
        return data;
    }

    function formatRecords(docs){
        _.forEach(docs, function(row){
            row.rec_summary  = row.rec_title;
			      row.rec_title 	 = (row.reference_s||'') + ' (' + (row.symbol_s||'') + ')';
        });
        return docs;
    }

    $scope.setDocument({}, true).then(function(doc) {
      
     let notificationNumbers = $location.search().notification;        

      if (!$scope.document?.notifications && notificationNumbers) {

        if (!Array.isArray(notificationNumbers)) {
          notificationNumbers = [notificationNumbers];
        }
        
        $scope.document.notifications = notificationNumbers.map((number) => ({ identifier: number.trim() }));        
      }
      $scope.onNotificationSelected();
    });
    
  }];

