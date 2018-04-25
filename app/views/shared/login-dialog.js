define(['jquery', 'components/scbd-branding/directives/header/login'
], function ($) {

    return ["$scope", "$location", function ($scope, $location){

				$scope.$on('signIn', function(evt, data){

					console.log('usersignin', data);

					if ($location.search().returnUrl)
                            $location.url($location.search().returnUrl);
                        else
                            $location.url('/register');

				});

				$('#loginDialog').modal("show");
		}];
});
