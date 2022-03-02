import app from 'app';
import template from "text!./view-lmo.directive.html";
import 'views/directives/record-options';
import 'views/forms/view/bch/view-lmo-reference.directive';
import 'views/forms/view/bch/view-lmo-gene.directive';
import 'views/forms/view/directives/view-record-reference.directive';
import 'views/forms/directives/view-terms-hierarchy';
import { uniqIdentifiers } from '~/services/common'

app.directive("viewModifiedOrganism", ['$location', function ($location) {
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
			var queryString = $location.search();
			if(queryString )
				$scope.printMode = queryString.print
			
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
		}
	};
}]);


