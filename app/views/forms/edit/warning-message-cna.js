
import app from '~/app';
import _ from 'lodash';
import template from "text!./warning-message-cna.html";
import '~/services/main';
import '~/views/search/search-results/result-default';

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



