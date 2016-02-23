define(['app', '/app/js/common.js', 'toastr', '/app/views/forms/edit/editFormUtility.js',
       '/app/services/search-service.js', '/app/services/role-service.js'
    ], function (app) {
	app.directive('endorsement', function($http){
		return{
			restrict: 'EAC',
			replace:true,
			templateUrl: '/app/views/directives/endorsement-directive.html',
            scope       : {
                identifier  : '=',
                schema      : '='
            },
			controller: ['$scope', '$filter','$rootScope', 'searchService', 'roleService', '$element', 'guid', 'editFormUtility',
                'IStorage', '$q', 'toastr', '$timeout',
                function($scope, $filter, $rootScope, searchService, roleService, $element, guid, editFormUtility, storage, $q, toastr, $timeout){

                $scope.loadEndorsments = function(identifier){

                    var searchQuery = {
                        fields: 'government_s, government_EN_s, createdDate_dt',
                        query : 'schema_s:endorsement AND endorsedDocument_s :' + identifier
                    };

                    searchService.list(searchQuery)
                    .then(function(data){
                        console.log(data.data);
                        $scope.endorsements = data.data.response.docs;
                    });

                }

                $scope.canEndorse = function(){
                    if($scope.identifier && $scope.schema && $rootScope.user && $rootScope.user.isAuthenticated && $rootScope.user.government){
                        if(roleService.isAbsPublishingAuthority() || roleService.isAbsNationalAuthorizedUser() ||
                        roleService.isAbsNationalFocalPoint()){

                            if(!_.findWhere($scope.endorsements, {government_s:$rootScope.user.government}))
                                return true;
                        }
                    }
                    return false;

                };


                $scope.confirmEndorsement = function(){
                    if($scope.identifier && $scope.schema){
                        var endorseRecordModal = $element.find("#endorseRecordModal");
                        endorseRecordModal.modal("show");
                    }
                };
                $scope.closeEndorsement = function(){
                    var endorseRecordModal = $element.find("#endorseRecordModal");
                    endorseRecordModal.modal("hide");
                };

                $scope.endorse = function(){

                    if($scope.identifier && $scope.schema){
                        $scope.loading = true;

                        var document = {
                            header     : {
                                            identifier : guid(),
                                            schema     : 'endorsement',
                                            languages  : ['en']
                                        },
                            government      : {identifier : $rootScope.user.government },
                            reference       : {identifier : $scope.identifier },
                            endorsedSchema  : $scope.schema
                        };
                        var canCreateDrafts = storage.drafts.security.canCreate(document.header.identifier, 'endorsement');
                        var canCreate       = storage.documents.security.canCreate(document.header.identifier, 'endorsement');

                        $q.when(storage.documents.validate(document))
                        .then(function(data){
                            console.log(data);
                            var validationReport = data.data;
                            if(validationReport && validationReport.errors && validationReport.errors.length>0) {
                                $scope.validationReport = validationReport;
                                $scope.loading = false;
                                return;
                            }
                            else
                                return $q.all([canCreate, canCreateDrafts]);
                        })
                        .then(function(results){
                            if(!results)
                                return;
                            if(results[0]){
                                return editFormUtility.publish(document)
                                .then(function(data){
                                    refresh('The record was successfully endorsed.');
                                });
                            }
                            else if(results[1]){
                                return editFormUtility.publishRequest(document)
                                .then(function(data){
                                    refresh('A request to publish this endorsement was sent to Publishing Authority.');
                                });
                            }
                        })
                        .catch(function(error){
                            console.log(error);
                            $scope.loading = false;
                            toastr.error('There was an error, please try again.');
                        });
                    }
                };

                function refresh(message){
                    $timeout(function(){
                        toastr.success(message);
                        $scope.closeEndorsement();
                        $scope.loadEndorsments($scope.identifier);
                        $scope.loading = false;
                    }, 5000);
                }

                $scope.loadEndorsments($scope.identifier);
			}]
		};

	});
});
