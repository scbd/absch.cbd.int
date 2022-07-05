import $ from 'jquery';
import 'components/scbd-branding/main';
import loginDialogT from '~/app-text/views/shared/login-dialog.json';

    export { default as template } from './login-dialog.html';
export default ["$scope", "$location", "authentication", "realm", 'translationService', function ($scope, $location, authentication, realm,translationService){
				translationService.set('loginDialogT', loginDialogT);
				$scope.chShortName = realm.chShortName;
				$scope.email = realm.email;
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

