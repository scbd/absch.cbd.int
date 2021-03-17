import app from 'app';
import template from 'text!./header.html';
import $ from 'jquery';
import 'css!components/scbd-branding/css/colors';
import 'css!components/scbd-branding/directives/header/header';
import './account';
import './locale';
import './accounts-validation';
import './login';
import './xuser-notifications-icon';
import 'components/scbd-angularjs-services/main';
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

