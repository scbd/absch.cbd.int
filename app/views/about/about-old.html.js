define(['app','underscore','ngSmoothScroll',
'scbd-angularjs-services','scbd-angularjs-filters','scbd-angularjs-controls'], function (app, _) {
app.controller("AboutController",
	["$rootScope", "$scope", "$q", "underscore",'$http','commonjs','smoothScroll', '$element', function ($rootScope, $scope, $q, _, $http, commonjs, smoothScroll, $element) {
     
    //  $scope.showAbout = false;
    //  $scope.toggleAbout = function(){
    //      $scope.showAbout = !$scope.showAbout;
    //  }
    
    $('[role="tooltip"]').hide();

   }]);
});
