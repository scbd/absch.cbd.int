import app from 'app';
import template from "text!./view-biosafety-law.directive.html";
import 'views/directives/record-options';
import _ from 'lodash';

app.directive("viewBiosafetyLaw", [function () {
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
		controller : ["$scope", function ($scope)
		{
			
			
			
			//====================
			//
			//====================
			$scope.isAllOrganisms = undefined;
			$scope.isAllSubjectArea = undefined;
			$scope.$watch('document.cpbOrganismTypes', function(value){
				$scope.isAllOrganisms =_.find(value, {identifier: '8DAB2400-CF00-44B2-ADCF-49AABF66B9B0'});
			});

			$scope.$watch('document.cpbSubjectAreas', function(value){
				$scope.isAllSubjectArea = _.find(value, {identifier: 'FE1AA9E9-3320-4112-9F9C-A22AD6563AE1'});
			});

			$scope.display = function(field) {
				
				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}

			$scope.onReferencedRecordsDataFetch = function(data){
				console.log(data)
				if(data && (data.amendedRecords||{}).docs){
					if(data.amendedRecords.docs.length)
						$scope.amendedByRecords = _.map(data.amendedRecords.docs, 'identifier')
				}
			}
		}]
	};
}]);


