
define(['app', 'lodash', "text!./warning-message-cna.html", 'js/common',
'views/search/search-results/result-default', 
'services/search-service',
'services/app-config-service', 'services/solr'
], function(app, _, template) {

    app.directive('warningMessageCna', function() {
        return {
           restrict: 'EAC',
           replace: true,
           template: template ,
           scope: {
                doc:'='
           },
           controller: ["$scope", "searchService", "solr","$q",
                function($scope, searchService, solr, $q) {

                 $scope.responsibleCNA = [];
                 $scope.showWarning = false;
                 
                //==================================
                //
                //==================================
                function moreCNAAllowed() {

                    if(!$scope.doc.government)
                    {
                        console.log($scope.doc);
                        return;
                    }
                    
                    var searchOperation;
                    var q  = "government_s:" + solr.escape($scope.doc.government.identifier) + 
                             " AND schema_s:authority AND absResposibleForAll_b:true"
                    
                    var queryParameters = {
                        'query'    : q,
                        'currentPage' : 0,
                        'rowsPerPage': 1000
                    };
                    
                    searchOperation = searchService.list(queryParameters, null);

                    $q.when(searchOperation)
                        .then(function(data) {
                            $scope.responsibleCNA = data.data.response;
                        }).catch(function(error) {
                            console.log('ERROR: ' + error);
                        })
                        .finally(function(){
                            var found;
                            found =  _.find($scope.responsibleCNA.docs, function(item){
                                if($scope.doc.header.identifier === item.identifier_s){
                                    return true;
                                }
                            });
                           if (found)
                                $scope.showWarning= false;
                           else 
                                $scope.showWarning = true;
 
                        });
   
                }
                
                //==================================
                //
                //==================================
                 $scope.$watch('doc', function(newVal,oldVal){
					//if(newVal !== oldVal)
						moreCNAAllowed();
				 })
                 
          
            }],
        };
    });
});


