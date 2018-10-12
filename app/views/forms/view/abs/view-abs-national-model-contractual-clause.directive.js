﻿define(["app", "text!views/forms/view/abs/view-abs-national-model-contractual-clause.directive.html", 
'views/directives/record-options', 'views/forms/view/view-default-reference.directive'], function(app, template){

       app.directive("viewAbsNationalModelContractualClause", [function () {
               
           return {
               restrict   : "EAC",
               template: template ,
               replace    : true,
               transclude : false,
               scope: {
                   document: "=ngModel",
                   locale  : "=",
                   target  : "@linkTarget",
                   allowDrafts : "@",
                   hide:"@"
               },
               link : function ($scope)
               {
                   $scope.contacts = undefined;
               },
               controller : ["$scope", 'realm', "IStorage", function ($scope, realm, storage)
               {
                   $scope.schema = realm.schemas.absProcedure
                   //====================
                   //
                   //====================
                   $scope.display = function(field) {
                       
                       if(!$scope.hide) return true; //show all fields

                       return( $scope.hide.indexOf(field) >= 0 ? false : true);
                   }

               }]
           };
       }]);
       
}
);
