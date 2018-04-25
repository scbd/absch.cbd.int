define(['app',
        'text!./header.html',
        'jquery',
        'css!components/scbd-branding/css/colors',
        'css!./header',
        'components/scbd-angularjs-services/services/authentication',
        './account',
        './locale',
        './accounts-validation',
        './login',
        './xuser-notifications-icon',
        'components/scbd-angularjs-services/services/socket-io-service'
],
function(app, template, $) {
    app.directive('scbdHeader', function() {
        return {
            restrict: 'E',
            priority: 10, //parent has 0 priority
            template: template,
            controller: ['$scope', '$rootScope', 'authentication', 'socketioService', 'apiToken', 'locale',
                function($scope, $rootScope, authentication, socketioService, apiToken, locale) {
                    $scope.locale = locale;
                    
                    authentication.getUser().then(function(u) {
                        $scope.user = u;
                        $scope.toggleMenu = 0;
                        if(u.isAuthenticated){
                            connectWithToken();
                        }
                        else
                            socketioService.connect();

                    });


                    $rootScope.$on('signOut', function(){
                        socketioService.disconnect(true);
                        // connectWithToken();
                    });

                    $rootScope.$on('signIn', function(){
                        socketioService.disconnect();
                        connectWithToken();
                    });

                    function connectWithToken(){
                        apiToken.get()
                            .then(function(token){
                                socketioService.connect(token.token);
                            });
                    }
                }
            ], //controller
        }; //return
    }); //directive
});
