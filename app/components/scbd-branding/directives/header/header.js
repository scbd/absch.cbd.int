define(['app',
        'text!components/scbd-branding/directives/header/header.html',
        'jquery',
        'css!components/scbd-branding/css/colors',
        'css!components/scbd-branding/directives/header/header',
        'components/scbd-angularjs-services/services/authentication',
        'components/scbd-branding/directives/header/account',
        'components/scbd-branding/directives/header/locale',
        'components/scbd-branding/directives/header/accounts-validation',
        'components/scbd-branding/directives/header/login',
        'components/scbd-branding/directives/header/xuser-notifications-icon',
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
