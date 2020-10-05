define(['app','lodash', "text!views/forms/view/bch/view-lmo-gene.directive.html", 'css!/app/css/bch/lmo-construct.css', 
'components/scbd-angularjs-services/services/storage', 'services/search-service', 'services/solr'], function (app, _, template) {

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
						query 	: "identifier_s:(" +solr.escape(geneIdentifiers.join(' ')) + ")",
						fields	: 'identifier_s,identity:identity_EN_s, uniqueIdentifier:uniqueIdentifier_s, urls:url_ss, title:name_EN_t'
					}
					$scope.dnaDetails = {};
					$q.when(searchService.list(searchQuery))
					.then(function(data) {
						_.each(data.data.response.docs, function(record){
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
});
