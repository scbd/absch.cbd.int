import $ from 'jquery';
import 'components/scbd-branding/main';

    export { default as template } from './login-dialog.html';
export default ["$scope", "$location", "authentication", "realm", function ($scope, $location, authentication, realm){
				$scope.chShortName = realm.chShortName;
				$scope.email = realm.originalObject.email;
				$scope.$on('signIn', function(evt, data){
					redirectUser();
				});
				authentication.getUser().then(function(user){
					if(!user.isAuthenticated)
						$('#loginDialog').modal("show");
					else
						redirectUser();
				})

				function redirectUser(){
					if ($location.search().returnUrl)
						$location.url($location.search().returnUrl);
					else
						$location.url('/register');
				}
		}];

