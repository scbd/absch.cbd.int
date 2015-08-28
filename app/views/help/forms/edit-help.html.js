define(['app','underscore','ngMaterial','ngAria','angular-animate','scbd-angularjs-services','scbd-angularjs-filters','scbd-angularjs-controls'], function (app, _) {
app.controller("editHelpController",
	["$routeParams", "$scope", "$q", "underscore",'$http', '$mdToast',
		function ($routeParams, $scope, $q, _, $http, $mdToast) {	
		
		var url = 'http://localhost:8000/api/v2015/help-forms';
   
		$scope.document = {};
		$scope.document.languages = ["en"]
		$scope.mode = 'read'
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
		
			
		$scope.editHelp = function(){
			$scope.mode = 'edit';
		}
			
		$scope.viewHelp = function(document){
			$scope.mode = 'read';
			$scope.document = document;
			
			$scope.term = document._id
		}
			
		$scope.cancel = function(){
		
			$scope.mode = 'read';
		
		}
		
		$scope.loadSchemas = function(){
		
			$q.when( $http.get(url))
				.then(function(response){
					$scope.schemas = response.data;
					
					if(!$routeParams.term && $scope.schemas.length > 0){
						$scope.document = $scope.schemas[0];
					}
				});
		}
		$scope.loadSchema = function(id){
			
			$q.when( $http.get(url + '/' + id))
				.then(function(response){
					$scope.document = response.data;
				});
		}
		
		$scope.saveHelp = function(){
		
			var operation;
			if(!$scope.document._id){
				operation = $http.post(url, $scope.document)
			}
			else{
				operation = $http.put(url + '/' + $scope.document._id, $scope.document)
			}
			
			$q.when(operation)
			.then(function(response){
				if(response.data.id){
					$scope.document._id = response.data.id;
					$scope.schemas.push($scope.document)
				}
				$mdToast.show(
					$mdToast.simple()
						.content('Schema help updated!')
						.position("top right")
						.hideDelay(3000)
				);   
			});
		
		}
		
		if($routeParams.term){
      
			if($routeParams.term=='new'){
				$scope.mode = 'edit';
				$scope.document = {};
				$scope.document.tags = [];
			}
			else{
				$scope.mode = 'read';
				$scope.loadSchema($routeParams.term);	
			}
		}
		$scope.loadSchemas();	 
   }]);
});
