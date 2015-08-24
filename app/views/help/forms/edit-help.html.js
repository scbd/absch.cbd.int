define(['app','underscore','ngMaterial','ngAria','angular-animate','scbd-angularjs-services','scbd-angularjs-filters','scbd-angularjs-controls'], function (app, _) {
app.controller("editHelpController",
	["$rootScope", "$scope", "$q", "underscore",'$http',function ($rootScope, $scope, $q, _, $http) {	
		
		$scope.document = {};
		$scope.document.languages = ["en"]
		
		var origanalDocument = _.clone($scope.document);
		
		$scope.addField = function(){
			
			if(!$scope.document.fields)
				 $scope.document.fields = [];
				 
			$scope.document.fields.push({name:''})
			
			
		}
		
		$scope.options = {
			fieldTypes : fieldTypes()
		}
		
		function fieldTypes(){
			var types = [];
			types.push({identifier:'form', value:'form',__value:'form'});
			types.push({identifier:'section', value:'section',__value:'section'});
			types.push({identifier:'control', value:'control',__value:'control'});
			return $q.when(types)
			
			var defer = $q.defer();
			defer.resolve(types);
			return defer;
			
		}
		
		$scope.genericFilter = function($query, items) {
			var matchedOptions = [];
			for(var i=0; i!=items.length; ++i)
				if(items[i].__value.toLowerCase().indexOf($query.toLowerCase()) !== -1)
				matchedOptions.push(items[i]);
		
			return matchedOptions;
		};
	
		$scope.genericMapping = function(item) {
		return {identifier: item.identifier};
		};
			
		 $scope.$on('$locationChangeStart', function(evt){
			 
			 var formChanged = !angular.equals($scope.document, origanalDocument);
			 if(formChanged)
			 		if(!confirm('There are unsaved changes, are you sure you want to leave?'))
					 	evt.preventDefault();
		 });
   }]);
});
