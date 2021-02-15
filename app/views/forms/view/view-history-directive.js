define(['app', 'lodash', "text!views/forms/view/view-history-directive.html"], function(app, _, template) {

    app.directive("viewHistory", [function() {
        return {
            restrict: "EAC",
            template: template ,
            replace: true,
            transclude: false,
            scope: {
                documentId: "=",
                publicView: "=",
            },
            // link: function($scope, $element) {
            //     // $element.find("[data-toggle='tooltip']").tooltip({trigger:'hover'});
            // },
            controller: ['$scope', 'IStorage', "$q", "$route", "$filter", "$timeout",
                function($scope, storage, $q, $route, $filter, $timeout) {

                    if($scope.documentId)
                        load($scope.documentId);
                    
                    //==================================
                    //
                    //==================================
                    function load(identifier) {

                        $scope.error = undefined;

                        if ($scope.loading)
                            return

                        if (!identifier) {
                            $scope.loading = false;
                            return;
                        }

                        $scope.loading = true;
                        var qDocument = storage.documentVersions.get(identifier, {
                            body: true
                        });
                        // .then(function(result) { return result.data || result });

                        $q.when(qDocument).then(function(results) {

                            $scope.documents = results.data.Items;
                            if ($scope.documents && $scope.documents.length > 0 && ($scope.documents[0].type == "absPermit" || $scope.documents[0].type == "absCheckpointCommunique"))
                                $scope.showFile = true;

                            if (results.data.Items && results.data.Items.length > 0 && $scope.documents[0].type == "absPermit") {
                                $scope.isPermit = true;

                                if(_.some($scope.documents, function(document){return document.body.amendmentIntent==1;})){
                                    $scope.$emit('event:show-document-revoked-message',{});
                                }
                            }

                        }).then(null, function(error) {
                            $scope.error = "error loading document history";
                        }).finally(function(){$scope.loading = false;});

                    };
                    
                    $scope.$watch("documentId", function() {
                         if($scope.documentId)
                            load($scope.documentId);
                    })
                    

                    $scope.$watch("documents", function() {
                        $scope.column = 'createdOn';
                    });

                    $scope.formatEmails = function(emailList) {
                        var emailString = '';
                        
                        if (angular.isArray(emailList))
                            emailList.forEach(function(email) {
                                if (email.emails) {
                                    emailString += email.emails.join(',');

                                    if (email.firstName || email.lastName) {
                                        emailString += '(';
                                        if (email.firstName)
                                            emailString += email.firstName + ' ';
                                        if (email.lastName)
                                            emailString += email.lastName;

                                        emailString += '); ';
                                    }
                                }
                            });
                        
                        return emailString;
                    }


                }
            ]
        };
    }]);
});
