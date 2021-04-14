import app from 'app';
import template from "text!./view-capacity-building-initiative.directive.html";
import 'views/directives/record-options';
import 'views/forms/view/directives/view-record-reference.directive';
import _ from "lodash";
import 'views/forms/directives/view-terms-hierarchy';

app.directive("viewCapacityBuildingInitiative", [function () {
	return {
		restrict   : "EAC",
		template: template ,
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			hide : "@",
			heading	:	"@",
			shortHeading : "@"
		},
		controller : ["$scope", "IStorage", "$http","realm", function ($scope, storage, $http, realm)
		{

			$scope.isABS = realm.is('ABS');
       		$scope.isBCH = realm.is('BCH'); 
            $scope.options  = {

    			regions       : function() { return $q.all([$http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }),
									    $http.get("/api/v2013/thesaurus/domains/regions/terms",   { cache: true })]).then(function(o) {
									    	return Enumerable.From($filter('orderBy')(o[0].data, 'name')).Union(
												   Enumerable.From($filter('orderBy')(o[1].data, 'name'))).ToArray();
									   }); }
    		};

				$scope.onThematicAreasTerms = function(terms){
					if(($scope.document||{}).cpbThematicAreas){
						_.forEach(terms, function(item){
							if(item.broaderTerms.length == 0 || item.broaderTerms == []){
								var parent =_.find($scope.document.cpbThematicAreas, {identifier: item.identifier});
								if(parent){
									terms = _.filter(terms, function(t){
										return !_.includes(item.narrowerTerms, t.identifier)
									})
								}
							}
						});
						return terms;
					}
				}

				$scope.onTargetGroupsTerms = function(terms){
					if(($scope.document||{}).targetGroups){
						_.forEach(terms, function(item){
							if(item.broaderTerms.length == 0 || item.broaderTerms == []){
								var parent =_.find($scope.document.targetGroups, {identifier: item.identifier});
								if(parent){
									terms = _.filter(terms, function(t){
										return !_.includes(item.narrowerTerms, t.identifier)
									})
								}
							}
						});
						return terms;
					}
			}
			//====================
			//
			//====================
			$scope.display = function(field) {

				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			};

		}]
	};
}]);


