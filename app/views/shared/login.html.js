define(['app',
		'/app/views/directives/login.directive.html.js',
		//'/app/views/directives/user-details.directive.html.js'
        ], function (app, moment) {

    return ["$scope", "$location", function ($scope, $location){

                $scope.onAuthorization = function(){

                    if ($location.search().returnUrl)
                            $location.url($location.search().returnUrl);
                        else
                            $location.url('/submit');


                };
		}];
});
