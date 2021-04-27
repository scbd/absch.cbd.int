import app from 'app';
import template from "text!./view-biosafety-law.directive.html";
import 'views/directives/record-options';
import 'views/forms/directives/view-terms-hierarchy';
import _ from 'lodash';
import 'services/main';

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
						if(item.broaderTerms.length == 0 || item.broaderTerms == []){
							var root =_.find($scope.document.cpbSubjectAreas, {identifier: item.identifier});
							terms = removeTerms(terms, root, item.identifier);
						}
					});
					return terms;
				}
			}
			$scope.onOrganismTypesTerms = function(terms) {
				if (($scope.document || {}).cpbOrganismTypes) {
					_.forEach(terms, function(item){
						if(item.broaderTerms.length == 0 || item.broaderTerms == []){
							var root =_.find($scope.document.cpbOrganismTypes, {identifier: item.identifier});
							terms = removeTerms(terms, root, item.identifier);
						}
					});
					return terms;
				}
			}

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


