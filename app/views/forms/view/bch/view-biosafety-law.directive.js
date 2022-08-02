import app from '~/app';
import template from "text!./view-biosafety-law.directive.html";
import '~/views/directives/record-options';
import '~/views/forms/directives/view-terms-hierarchy';
import _ from 'lodash';
import '~/services/main';
import viewBiosafetyLawT from '~/app-text/views/forms/view/bch/view-biosafety-law.json';

app.directive("viewBiosafetyLaw", ['translationService', function (translationService) {
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
			translationService.set('viewBiosafetyLawT', viewBiosafetyLawT);
			function removeTerms(terms, root,termId){
				if(root){
					return _.filter(terms, function(t){
						return _.includes(root, t.identifier)
					})
				} else {
					return  _.filter( terms, function ( item ) {
						return item.identifier != termId;
					});
				}
			}

			$scope.onSubjectAreasTerms = function(terms){
				if(($scope.document||{}).cpbSubjectAreas){
					_.forEach(terms, function(item){
						if((item.broaderTerms.length == 0 || item.broaderTerms == []) && item.identifier !="5B6177DD-5E5E-434E-8CB7-D63D67D5EBED"){
							var root =_.find($scope.document.cpbSubjectAreas, {identifier: item.identifier});
							terms = removeTerms(terms, root, item.identifier);
						}
					});
					return terms;
				}
			}
			$scope.onOrganismTypesTerms = function(terms) {
				if (($scope.document || {}).cpbOrganismTypes) {
					_.forEach( terms, function ( item ) {
						const rootId = "8DAB2400-CF00-44B2-ADCF-49AABF66B9B0";
						let root = _.find($scope.document.cpbOrganismTypes, { identifier: rootId } );
						if ( root ) {
							terms = _.filter( terms, function ( t ) {
								return _.includes(root, t.identifier)
							} );
						} else {
							terms = _.filter( terms, function ( t ) {
								return !_.includes(rootId, t.identifier)
							} );
						}
					} );
					return terms;
					}
				}

			$scope.display = function(field) {
				
				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}

			$scope.onReferencedRecordsDataFetch = function(data){
				if(data && (data.biosafetyLaw||{}).fields){
					var fields = data.biosafetyLaw.fields
					if(fields.amendedRecords && fields.amendedRecords.docs.length)
						$scope.amendedByRecords = _.map(fields.amendedRecords.docs, 'identifier')
				}
			}
		}]
	};
}]);


