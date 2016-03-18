define(['app', 'underscore', '/app/views/search-new/search-results/record-viewer.js'], function(app, _) {
 "use strict";
    app.controller("recordHistoryController", ["$rootScope", "$scope", "$filter", "$routeParams", "IStorage", "$q", "IWorkflows", "IUserNotifications",
        function($rootScope, $scope, $filter, $routeParams, IStorage, $q, IWorkflows, IUserNotifications) {


            if ($routeParams.document_type) {
                $scope.document = {
                    schema : $filter("mapSchema")($routeParams.document_type),
                    identifier : $routeParams.identifier
                }

                $q.when(IStorage.drafts.locks.get($routeParams.identifier,{lockID:''}))
                //sstorage.documents.get($routeParams.identifier, {info:''}))
                .then(function(data){
                        var doc = data.data[0];
                        if(doc && doc.lockID){
                            doc.workflwoId = doc.lockID.replace('workflow-','');
                            $scope.showRequestHistory = true;
                            _.extend($scope.document, doc);
                        }
                });

                var documentNotificationsQuery = {
                    $and : [{"data.documentInfo.identifier": $scope.document.identifier}]
                };
                IUserNotifications.query(documentNotificationsQuery, 0, 100)
                    .then(function(data) {
                        if (!data || data.length === 0)
                            return;
                        $scope.documentNotifications = data;
                    });
            }

            $scope.refreshworkflowRecord = function(document, workflowInfo) {

                if (workflowInfo.workflowId) {
                    IWorkflows.get(workflowInfo.workflowId).then(function(data) {
                        if (data.state == 'completed') {
                            // var currentDocument = _.first(_.filter($scope.records, function(doc) {
                            //     return doc.identifier == document.header.identifier;
                            // }));
                            $scope.showRequestHistory = false;
                        } else {
                            $timeout(function() {
                                $scope.refreshworkflowRecord(document, workflowInfo);
                            }, 2000);
                        }
                    });
                }
            };

        }
    ]);
});
