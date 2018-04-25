define(['app','text!./km-notes.html','angular', 'components/scbd-angularjs-services/services/authentication'], function(app,template,angular) {

    //============================================================
    //
    //
    //============================================================
    //NOTE: Requires a user!
    app.directive('kmNotes', ['$http', '$filter', 'authentication', function($http, $filter, authentication) {
        return {
            restrict: 'EAC',
            template: template,
            replace: true,
            transclude: false,
            require: "?ngModel",
            scope: {
                placeholder: "@",
                binding: "=ngModel",
                rows: '=',
                required: "@"
            },
            link: function($scope, $element, attrs, ngModelController) {
                $scope.timestamp = Date.now();
                $scope.skipLoad = false;
                $scope.texts = [];
                $scope.$watch('binding', function() {
                    ngModelController.$setViewValue($scope.binding);
                    $scope.load();
                });

            },
            controller: ["$scope", function($scope) {
                //==============================
                //
                //==============================
                $scope.load = function() {
                    if ($scope.skipLoad) {
                        $scope.skipLoad = false;
                        return;
                    }

                    var oBinding = $scope.binding || [];
                    try{
                        oBinding = JSON.parse(oBinding);
                    }
                    catch(err){}

                    $scope.texts = [];

                    angular.forEach(oBinding, function(text, i) {
                        $scope.texts.push({
                            value: text
                        });
                    });
                };

                //==============================
                //
                //==============================
                $scope.remove = function(index) {
                    $scope.texts.splice(index, 1);

                    $scope.save();
                };

                //==============================
                //
                //==============================
                $scope.save = function() {
                    authentication.getUser()
                    .then(function(user){
                        var oNewBinding = [];
                        var oText = $scope.texts;

                        angular.forEach(oText, function(text, i) {
                            if ($.trim(text.value) !== "")
                                oNewBinding.push($.trim(text.value));
                        });

                        if ($scope.newtext) {
                            if ($.trim($scope.newtext) !== "") {
                                var timestamp = $filter('date')(Date.now(), 'medium');
                                oNewBinding.push("[ " + user.name + " | " + timestamp + " ] - " + $.trim($scope.newtext));
                            }
                        }

                        $scope.binding = !$.isEmptyObject(oNewBinding) ? JSON.stringify(oNewBinding) : undefined;
                        $scope.skipLoad = true;
                    });
                };

                //==============================
                //
                //==============================
                $scope.isRequired = function() {
                    return $scope.required !== undefined && $.isEmptyObject($scope.binding);
                };
            }]
        };
    }]);
});
