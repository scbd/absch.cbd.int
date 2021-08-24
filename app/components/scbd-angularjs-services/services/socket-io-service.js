import app from 'app';
import io from 'socket.io';
import _ from 'lodash';
import './authentication';
import './apiUrl';
import './utilities';

    app.factory('socketioService', ['$rootScope', '$http', '$q', 'realm', "authentication", "apiUrl", 'realmService',
    function ($rootScope, $http, $q, realm, authentication, apiUrl, realmService) {
        return new function () {
            var apiServer = 'https://api-direct.cbd.int/';

            if(apiUrl.isAppDevelopment()){
                
                var url = apiUrl.devApiUrl();
                if(url)
                   apiServer = url;
                //apiServer = apiUrl.devApiUrl();
            }

            var socket;

            this.connect = function(authToken){
                var query = 'arguments=' + JSON.stringify({realm: realm.value||realm});

                if(authToken){
                    query += '&authorization=' + authToken;
                }
                socket = io(apiServer, { query: query });
                socket.connect(apiServer, query);

                socket.on('connect', onConnect);
            };

            this.disconnect = function(isLogoff){
                if(isLogoff)
                    socket.emit('logoff');
                socket.disconnect();
                socket.close();
            };


            function onConnect() {
                
                subscribe('push-notification', function(msg){
                    if(isJSON(msg)){
                        var message = JSON.parse(msg);

                        if(message.type == 'userLogoff'){
                            authentication.signOut();
                        }
                        if(message.data && message.data.realm){
                            var realms;
                            if(angular.isArray(message.data.realm))
                                realms = message.data.realm;
                            else 
                                realms = [message.data.realm];
                            if(_.intersection(_.map(realms, _.toUpper), realmService.envRealms()).length == 0)
                                return;
                        }
                        $rootScope.$broadcast('event:server-pushNotification', message);
                    }


                });
            }

            function subscribe(queue, callback){
                if(socket.connected){
                    socket.on(queue, callback);
                }
                else {
                    throw 'Server not connected';
                }
            }
            function isJSON(text){
                try{
                    JSON.parse(text);
                    return true;
                }
                catch (error){
                    return false;
                }
            }
        }
    }]);

