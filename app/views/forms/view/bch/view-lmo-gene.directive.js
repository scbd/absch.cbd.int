import app from 'app';
import _ from 'lodash';
import template from "text!./view-lmo-gene.directive.html";
import 'css!/app/css/bch/lmo-construct.css';
import 'components/scbd-angularjs-services/main';
import 'services/main';

app.directive("viewLmoGene", [function () {
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
		controller: ["$scope", "solr", '$q', 'searchService', function ($scope, solr, $q, searchService) {

			// //==================================
		    // //
		    // //==================================
		    $scope.$watch('model', function(newValue, oldValue){
		        if(newValue){

					var geneIdentifiers = _(newValue).map(function(val){return val.identifier && val.identifier.replace(/@.*/, '') }).flatten().compact().value();
					if(geneIdentifiers.length==0)
						return;

					var searchQuery = {
						query 	: "identifier_s:(" +_.map(geneIdentifiers, solr.escape).join(' ') + ")",
						fields	: 'identifier_s,identity:identity_EN_s, uniqueIdentifier:uniqueIdentifier_s, urls:url_ss, title:name_EN_t'
					}
					$scope.dnaDetails = {};
					$q.when(searchService.list(searchQuery))
					.then(function(data) {
						_.forEach(data.data.response.docs, function(record){
							$scope.dnaDetails[record.identifier_s] = record;
						})
					});

		        }
		    });

			$scope.removeRevsion = function(identifier){
				return identifier && identifier.replace(/@.*/, '');
			}


			$scope.parseSize = function(size){
				size = size||0;
				return Number.parseFloat(size).toFixed(3);
			}
		 }] //controller
	};
}]);

