import app from '~/app';
import template from 'text!./header.html';
import $ from 'jquery';
import '~/components/scbd-branding/css/colors.css';
import '~/components/scbd-branding/directives/header/header.css';
import './account';
import './locale';
import './accounts-validation';
import './login';
import './xuser-notifications-icon';
import '~/components/scbd-angularjs-services/main';
import scbdHeaderT from '~/app-text/components/scbd-branding/directives/header/header.json';

    app.directive('scbdHeader', function() {
        return {
            restrict: 'E',
            priority: 10, //parent has 0 priority
            template: template,
            controller: ['$scope', '$rootScope', 'authentication', 'socketioService', 'apiToken', 'locale', 'translationService',
                function($scope, $rootScope, authentication, socketioService, apiToken, locale, translationService) {
                    $scope.locale = locale;
                    translationService.set('scbdHeaderT', scbdHeaderT);
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

                    $scope.openSideBlock = function(type){
                        if(type==$scope.activeHelpMenu)
                            $scope.activeHelpMenu = undefined;
                        else
                            $scope.activeHelpMenu = type;
                            
                        $rootScope.$broadcast('event:open-left-side-bar', $scope.activeHelpMenu)
                    }

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

