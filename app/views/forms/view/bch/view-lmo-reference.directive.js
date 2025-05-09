import app from '~/app';
import _ from 'lodash';
import template from "text!./view-lmo-reference.directive.html";
import '~/components/scbd-angularjs-services/main';

app.directive("viewLmoReference", [function () {
	return {
		restrict: "EAC",
		template: template ,
		replace: true,
		transclude: false,
		scope: {
			model: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		controller: ["$scope", "IStorage", "$filter", '$q', '$rootScope',
			 function ($scope, storage, $filter, $q, $rootScope) {


			// $scope.document = $scope.model;
			
			
			

            // //==================================
		    // //
		    // //==================================
		    $scope.$watch('model', function(newValue, oldValue){
		        if(newValue){
					$q.when(loadReferenceDocument($scope.model))
					.then(function(data) {
						$scope.document = data;
					});

		        }
		    });


			function loadReferenceDocument(identifier){

				return storage.documents.get(identifier, { info : true})
						.then(function(result){
							return result.data;
						})
						.catch(function(error, code){
							if (error.status == 404) {
								$scope.errorCode = 404;
								return storage.drafts.get(identifier, { info : true})
									.then(function(result){
										$scope.errorCode = undefined;
										return result.data;
									});
							};
						});
			}


			$rootScope.$on('evt:updateLinkedRecordRevision', function(evt, ids){
				
				const currentId = ids.find(e=>e.identifier == $scope.document?.identifier)
				if(currentId?.latestRevision > currentId?.currentRevision){
					loadReferenceDocument(`${currentId.identifier}@${currentId.latestRevision}`)
					.then((latestDocument)=>{
						$scope.$applyAsync(()=>$scope.document = latestDocument);
					});
				}
				
			});
		 }] //controller
	};
}]);

