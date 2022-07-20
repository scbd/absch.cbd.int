import app from '~/app';
import template from "text!./view-lmo.directive.html";
import '~/views/directives/record-options';
import '~/views/forms/view/bch/view-lmo-reference.directive';
import '~/views/forms/view/bch/view-lmo-gene.directive';
import '~/views/forms/view/directives/view-record-reference.directive';
import '~/views/forms/directives/view-terms-hierarchy';
import { uniqIdentifiers } from '~/services/common'
import viewLmoT from '~/app-text/views/forms/view/bch/view-lmo.json';

app.directive("viewModifiedOrganism", ['$location', '$http', 'translationService', function ($location, $http, translationService) {
	return {
		restrict   : "EAC",
		template: template ,
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			hide	: "@"
		},
		link : function ($scope)
		{	
			translationService.set('viewLmoT', viewLmoT);
			var queryString = $location.search();
			if(queryString )
				$scope.printMode = queryString.print
			
			function lookupDetections(){
				if(!$scope.document || $scope.lookingUpDetections)
					return;

				$scope.detectionMethodLinks = [...($scope.document.detectionMethodLinks||[])];

				var uniqueIdentifier = $scope.document.uniqueIdentification;
				if(!uniqueIdentifier){
					$scope.document.detectionMethodLinks = ($scope.document.detectionMethodLinks||[]).filter(e=>!['JRC', 'CropLife'].includes(e.tag));
					return;
				}

				$scope.lookingUpDetections =true

				$http.get('/api/v2020/bch/lmo-detection-methods/'+uniqueIdentifier, {cache:true})
				.then(function(result){
					if(result.data){
						
						result.data.forEach(e=>{
							var exists = $scope.detectionMethodLinks.find(l=>l.url == decodeURIComponent(e.url))
							if(!exists){
								$scope.detectionMethodLinks.push(e);
							}							
						});
					}
				})
				.finally(function(){
					$scope.lookingUpDetections = false;
				})
			}
			
			$scope.$watch('document', function(oldVal, newVal){
				if(oldVal?.uniqueIdentification != newVal?.uniqueIdentification){
					lookupDetections();
				}
			})
			//====================
			//
			//====================
			$scope.display = function(field) {
				
				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}

			if($scope.document?.genes){
				$scope.document.genes = uniqIdentifiers($scope.document.genes);
			}
			lookupDetections();

		}
	};
}]);
