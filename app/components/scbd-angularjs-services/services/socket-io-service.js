import app from '~/app';
import io from 'socket.io';
import _ from 'lodash';
import './authentication';
import './apiUrl';
import './utilities';
import RealmApi from '~/api/realms';

    app.factory('socketioService', ['$rootScope', '$http', '$q', 'realm', "authentication", "apiUrl",
    function ($rootScope, $http, $q, realm, authentication, apiUrl) {

        
        return new function () {
            var apiServer = 'https://api-direct.cbd.int/';
            const realmApi          = new RealmApi({ tokenReader: () => undefined});
            let environmentRealms = [];
            
            if(apiUrl.isAppDevelopment()){
                
                var url = apiUrl.devApiUrl();
                if(url)
                   apiServer = url;
                //apiServer = apiUrl.devApiUrl();
            }

            var socket;

            this.connect = function(authToken){

                if(window.scbdApp.isPrerender)
                    return;

                var query = 'arguments=' + JSON.stringify({realm: realm.value||realm});

                socket = io(apiServer, { 
                    transports: ["websocket"], 
                    query: query,
                    auth: {
                        authorization: `${authToken}`
                    } 
                });
                socket.connect(apiServer, query);

                socket.on('connect', onConnect);
            };

            this.disconnect = function(isLogoff){
                if(window.scbdApp.isPrerender)
                    return;
                
                if(isLogoff)
                    socket.emit('logoff');
                socket.disconnect();
                socket.close();
            };


            function onConnect() {
                console.log(environmentRealms)
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
                            if(_.intersection(_.map(realms, _.toUpper), environmentRealms.map(({ realm }) => realm)).length == 0)
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

            (async ()=>environmentRealms = await realmApi.getRealmConfigurations(realm.environment))();

        }
    }]);

