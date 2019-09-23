define(['app', "text!views/forms/view/bch/view-organism.directive.html", 	'views/directives/record-options'], function (app, template) {

app.directive("viewOrganism", [function () {
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
			
			$scope.$watch('document', function(){
				var document = $scope.document;
				var classification = {};
				if(document.realm		) classification['realm']	   	= 	document.realm	
				if(document.subRealm	) classification['subRealm']   	= 	document.subRealm
				if(document.kingdom		) classification['kingdom']   	= 	document.kingdom
				if(document.phylum		) classification['phylum']   	= 	document.phylum	
				if(document._class		) classification['_class']   	= 	document._class	
				if(document.order		) classification['order']	   	= 	document.order	
				if(document.subOrder	) classification['subOrder']	= 	document.subOrder
				if(document.family		) classification['family']   	= 	document.family	
				if(document.subFamily	) classification['subFamily']  	= 	document.subFamily
				if(document.genus		) classification['genus']	   	= 	document.genus	
				if(document.species		) classification['species']   	= 	document.species
				if(document.subSpecies	) classification['subSpecies'] 	= 	document.subSpecies

				if(angular.equals(classification, {}))
					$scope.classification = undefined;
				else
					$scope.classification = classification;
			}, true)
			
			//====================
			//
			//====================
			$scope.display = function(field) {
				
				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}
		}]
	};
}]);

});
