import app from '~/app';
import _ from 'lodash';
import template from "text!./view-lmo-reference.directive.html";
import '~/components/scbd-angularjs-services/main';
import {documentIdWithoutRevision} from '~/components/scbd-angularjs-services/services/utilities.js';

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
		controller: ["$scope", "IStorage", "$filter", '$q', 'realm',
			 function ($scope, storage, $filter, $q, realm) {


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
				if(realm.is('BCH'))
					identifier = documentIdWithoutRevision(identifier)
				// in BCH we always load the latest version of the linked record.
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


		 }] //controller
	};
}]);

