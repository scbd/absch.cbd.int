import app from 'app';
import template from 'text!./user-details-directive.html';

app.directive('userDetails', function($http){

	return{
		restrict: 'EAC',
		replace:true,
		template: template,
		
		controller: ['$scope', function($scope){


				$scope.users = [{'firstName':'Blaise', 'lastName': 'Fonseca', 'email':'blaisefonseca@hotmail.com','role':'admin'},
				{'firstName':'febina', 'lastName': 'Fonseca', 'email':'febinfonseca@hotmail.com','role':'admin'},
				{'firstName':'eric', 'lastName': 'Fonseca', 'email':'ericfonseca@hotmail.com','role':'admin'},
				{'firstName':'34f', 'lastName': 'Fonseca', 'email':'blaisefonseca@hotmail.com','role':'admin'},
				{'firstName':'sdsfds', 'lastName': 'Fonseca', 'email':'febinfonseca@hotmail.com','role':'admin'},
				
				];


				$scope.noRoles = [

				{'firstName':'sdsfds', 'lastName': 'Fonseca', 'email':'febinfonseca@hotmail.com','role':'admin'},
				 {'firstName':'23223', 'lastName': 'Fonseca', 'email':'ericfonseca@hotmail.com','role':'admin'}]; 

				$scope.removeFromRole = function(user, element){
					console.log(user);
					var index = $scope.users.indexOf(user);
					$scope.users.splice(index, 1);
					$scope.noRoles.push(user);
				};

				$scope.addToRole = function(user, element){
					console.log(user);
					var index = $scope.noRoles.indexOf(user);
					$scope.noRoles.splice(index, 1);
					$scope.users.push(user);
				};


		}]
	};

});

