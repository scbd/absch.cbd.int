define(['app','underscore', 'scbd-angularjs-services'], function (app, _) {

app.directive("viewDefaultReference", [function () {
	return {
		restrict: "EAC",
		templateUrl: "/app/views/forms/view/view-default-reference.directive.html",
		replace: true,
		transclude: false,
		scope: {
			model: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		controller: ["$scope", "IStorage", "$filter", function ($scope, storage, $filter) {

			
            // $scope.$watch("model", function(newVal) {
			// 	if(!newVal)
			// 		return;

			// 	if(!newVal.header && newVal.identifier && !$scope.document ){
			// 		//tweak for old versions after migration as of Feb 16
			// 		if(newVal.document){
			// 			$scope.document = newVal.document;
			// 		}
			// 		else{
			// 			storage.documents.get(newVal.identifier)
			// 				.then(function(data){
			// 					$scope.document = data.data;
			// 				});
			// 		}
			// 	}
			// });
            $scope.getUniqueID = function(doc){
                
                   var uid =$filter('uniqueID')(doc.header.identifier);
                   
                   if(!uid)
                    return "unique identifier not yet assigned ";   
                   
                   return uid;
                   
               }
               
               $scope.getUniqueIDLink = function(doc){
                   var uidRev =$filter('uniqueID')(doc.header.identifier);
                   var uid =$filter('uniqueIDWithoutRevision')(doc.header.identifier);
                   var rev = uidRev.substring(uid.length+1);
                   
                   if(!uid)
                    return uidRev;   
                   
                   return uid + "/" + rev  ;
               }
            
            
		 }] //controller
	};
}]);
});
