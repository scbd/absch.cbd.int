define(['app', 
'/app/js/common.js', 
'/app/views/directives/search-filter-dates.partial.html.js',
'/app/views/search-new/search-results/result-default.js', 
'/app/services/search-service.js',
'/app/services/app-config-service.js'], function (app, commonjs) { // jshint ignore:line

app.directive("documentSelector", ["$http",'$rootScope', "$filter", "underscore", "$q", "searchService", "appConfigService",
function ($http, $rootScope, $filter, _,  $q, searchService, appConfigService) {

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
            type     : "@type",
            filter : "@filter"
		},
		link : function($scope) {
            
            $scope.rawDocuments = [];
			$scope.areVisible = false;
            $scope.userGov = $scope.$root.user.government;
            
            if(!$scope.type) $scope.type = "checkbox";
            
      

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

                $scope.model=undefined;

                _.forEach($scope.rawDocuments.docs, function (doc) {
                    if(doc.__checked === true)
                    {
                        if(!$scope.model)
                            $scope.model=[];
                            
                        $scope.model.push({identifier: doc.identifier_s});
                    }
                });
                 

				$('#'+$scope.question).modal('hide');
				$scope.areVisible = true;
			};
            
            
             //==================================
            //
            //==================================
			$scope.syncDocuments = function(){
                    
                _.forEach($scope.rawDocuments.docs, function (doc) {
                    doc.__checked = false;
                });
                
                if ($scope.model){
                    _.forEach($scope.model, function (mod) {
                        _.forEach($scope.rawDocuments.docs, function (doc) {
                              if(mod.identifier === doc.identifier_s)
                                    doc.__checked = true;
                        });
                    });
                    
                    if($scope.model.length === 0 )
                        $scope.model = undefined;
                }
               

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
			$scope.selectDoc = function(document){
                 
                 _.forEach($scope.rawDocuments.docs, function (doc) {
                    doc.__checked = false;
                    
                    if(doc.identifier_s === document.identifier_s ){
                        doc.__checked = true;
                    }
                });
			};
            

            //==================================
            //
            //==================================
			$scope.removeDocument = function(document){
               
                 _.forEach($scope.rawDocuments.docs, function (doc) {
                    if(doc.identifier_s === document.identifier_s ){
                        doc.__checked = false;
                    }
                });
                
               $scope.model =  _.filter($scope.model, function (doc) {
                    if(doc.identifier !== document.identifier_s ){
                     return doc;
                    }
                });
                
                if($scope.model){
                    if($scope.model.length===0)
                        $scope.model = undefined;
                }
                
			};
          
             //==================================
            //
            //==================================
            function getDocs () {
                var searchOperation;
                
                var schema = "*";
                if ($scope.schema)
                    schema = $scope.schema;
                
                var q  = "schema_s:"+ schema;
                
                if($scope.government)
                    q  = q + " AND government_s:" + $scope.government.identifier;
                if(!$scope.government &&  $scope.userGov)
                    q  = q + " AND government_s:" + $scope.userGov;  
                      
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

                     $scope.syncDocuments();
                     
                            
		        }
		    });
            
            

		},

	};
}]);

});
