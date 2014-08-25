define(['app'], function (app) {

app.directive("viewRelatedCheckpointCommunique", [function () {
  return {
    restrict   : "EAC",
    templateUrl: "/app/views/forms/view/view-releated-checkpoint-communique-directive.html",
    replace    : true,
    transclude : false,
    scope: {
      permitId: "=permitId"
    },
    link: function($scope, $element) {
    //	$element.find("[data-toggle='tooltip']").tooltip({trigger:'hover'});
    },
    controller: ['$scope', 'IStorage', "$q","$route",
      function ($scope, storage, $q,$route) {

      $scope.$watch('permitId', function(value){
        
        if(value){
          $scope.load($scope.permitId);
        }
        else
          $scope.loading=false;
      });

      //==================================
      //
      //==================================
      $scope.load = function (identifier) {

        $scope.error = undefined;

        if(!identifier)
        {
          $scope.loading=false;
          return;
        }
        var filter = ["type eq 'absCheckpointCommunique'"];
        var query = [[{permit : identifier}]];

        var qDocument     = storage.documentQuery.body(filter,query,{body:true, collection:"my"});


        $q.when(qDocument).then(function(results) {

          $scope.referenceCheckpointCommunique   = results.data;

        }).then(null, function(error) {
          $scope.error = "error loading permit releated checkpoint communique.";
           console.log( $scope.error );
        })

      };


    }]
  };
}]);
});
