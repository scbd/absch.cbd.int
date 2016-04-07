define(['app', 
'/app/js/common.js', 
'/app/views/directives/search-filter-dates.partial.html.js',
'/app/views/search-new/search-results/result-default.js', 
'/app/services/search-service.js',
'/app/services/app-config-service.js'], function (app, commonjs) { // jshint ignore:line

app.directive("documentSelector", ["$http", "Thesaurus", "$filter", "underscore", "guid",  "$timeout", "$q","IStorage","commonjs", "searchService", "appConfigService",
function ($http, Thesaurus, $filter, _, guid, $timeout, $q, storage, commonjs, searchService, appConfigService) {

	return {
		restrict   : "EA",
		templateUrl: "/app/views/forms/edit/document-selector.html",
		replace    : true,
		transclude : false,
		scope      : {
			model     : "=ngModel",
			locales   : "=locales",
			caption   : "@caption",
			disabled  : "=ngDisabled",
            government: "=government",
            question  : "@question",
            schema    : "@schema",
		},
		link : function($scope) {
            
            $scope.rawDocuments = [];
			$scope.areVisible = false;

            //==================================
            //
            //==================================
			$scope.openAddDialog = function(){
                $('#'+$scope.question).modal('show');
			};

            //==================================
            //
            //==================================
			$scope.saveDocuments = function(){
                _.forEach($scope.rawDocuments.docs, function (doc) {
                    if(doc.__checked){
                      $scope.model.push({identifier: doc.identifier_s});
                    }
                });

				$('#'+$scope.question).modal('hide');
				$scope.areVisible = true;
			};
            
            
            //==================================
            //
            //==================================
			$scope.isChecked = function(item){
                if(item.__checked){
                    return item;
                }
			};

            //==================================
            //
            //==================================
			$scope.removeDocument = function(document){
                $scope.model = [];
                
                 _.forEach($scope.rawDocuments.docs, function (doc) {
                    if(doc.identifier_s === document.identifier_s ){
                        doc.__checked = false;
                    }
                    if(doc.__checked)
                        $scope.model.push({identifier: doc.identifier_s});
                });
			};
          
             //==================================
            //
            //==================================
            function getDocs () {
                var searchOperation;
                
                var schema = "*:*";
                if ($scope.schema)
                    schema = $scope.schema;
                
                var q  = "government_s:" + $scope.government.identifier + " AND schema_s:"+ schema;
               
                var queryParameters = {
                    'query'    : q,
                    'currentPage' : 0,
                    'rowsPerPage': 1000
                };
                
                searchOperation = searchService.list(queryParameters, null);

                $q.when(searchOperation)
                    .then(function(data) {
                       $scope.rawDocuments = data.data.response;
                    }).catch(function(error) {
                        console.log('ERROR: ' + error);
                    })
                    .finally(function(){
                        $scope.isLoading = false;
                    });
                    
                console.log(q);
            }
            
            //==================================
            //
            //==================================
            this.load = function () {
                $scope.model = [];
                if(!$scope.rawDocuments || _.isEmpty($scope.rawDocuments))
                {
                    getDocs();
                    return;
                }
            };
            
            load();

			//==================================
		    //
		    //==================================
		    $scope.$watch('government', function(newValue, oldValue){
		        if(newValue != oldValue){
					$scope.rawDocuments = [];
		        }
		    });
            
            

		}
	};
}]);

});
