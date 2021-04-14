import app from 'app';
import _ from 'lodash';
import template from "text!./view-authority.directive.html";
import 'views/directives/record-options';
import 'views/directives/party-status';
import 'services/main';
import 'views/forms/view/directives/view-reference-records.directive';
import 'views/forms/directives/view-terms-hierarchy';

	app.directive("viewAuthority", ["IStorage", "realm", function (storage, realm) {
		return {
			restrict   : "EAC",
			template: template ,
			replace    : true,
			transclude : false,
			scope: {
				document: "=ngModel",
				target  : "@linkTarget",
				locale      : "=",
				allowDrafts : "@",
				hide : "@"
			},
			link : function ($scope)
			{
				if(realm.is('ABS'))		$scope.isABS=true;
				else if(realm.is('BCH'))$scope.isBCH=true;

				$scope.onReferencedRecordsDataFetch = function(data){
					if(data && (data.authorities||{}).docs){
						if(data.authorities.docs.length)
							$scope.policyBasisForCompetencyRef = _.map(data.authorities.docs, 'identifier')
					}
				}
				$scope.$watch('document.functions', function(value){
					$scope.isAllSubjectArea = _.find(value, {identifier: 'FE1AA9E9-3320-4112-9F9C-A22AD6563AE1'});
				});

				$scope.$watch('document.cpbOrganismTypes', function(value){
					$scope.isAllOrganisms =_.find(value, {identifier: '8DAB2400-CF00-44B2-ADCF-49AABF66B9B0'});
				});
				$scope.display = function(field) {

					if(!$scope.hide) return true; //show all fields

					return( $scope.hide.indexOf(field) >= 0 ? false : true);
				}

			}
		};
	}]);

