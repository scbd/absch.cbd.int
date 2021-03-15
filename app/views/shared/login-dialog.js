import $ from 'jquery';
import 'components/scbd-branding/main';

    export default ["$scope", "$location", "authentication", function ($scope, $location, authentication){

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

