import app from 'app';
import './apiUrl';
    var ACCOUNTS_URL = (function(){

        var domainRegex = /(?:.*\.)?([a-z]+\.[a-z]+)/;
        var domain = document.location.hostname
        if(domain=='localhost') 
            domain = 'cbddev.xyz'
        else if(/staging\.cbd\.int/.test(document.location.hostname))//if domain is on staging
            domain = 'staging.cbd.int';
        else{
            var match = domain.match(domainRegex);
            if(match && match.length == 2)
                domain = match[1];
        }
        
        return 'https://accounts.'+domain;

    })()

    app.factory('apiToken', ["$q", "$rootScope", "$window", "$document", "$timeout", function($q, $rootScope, $window, $document, $timeout) {

        var pToken;
        var authenticationFrameQ = $q(function(resolve, reject){

			var frame = $('<iframe src="'+ACCOUNTS_URL+'/app/authorize.html'+'" style="display:none"></iframe>');

			$("head").prepend(frame);

			frame.on("load", function(evt){
				resolve(evt.target || evt.srcElement);
			});

			$timeout(function(){
				reject('accounts is not available / call is made from an unauthorized domain');
			}, 5000);
		});

        //============================================================
        //
        //
        //============================================================
        function getToken() {

            return $q.when(authenticationFrameQ).then(function(authenticationFrame){

            if (!authenticationFrame) {
                pToken = pToken || null;
            }

            if (pToken !== undefined) {
                return $q.when(pToken || null)
                         .then(checkTokenExpiration);
            }

            pToken = null

            var defer = $q.defer();

            var receiveMessage = function(event) {
                if (event.origin != ACCOUNTS_URL)
                    return;

                var message = JSON.parse(event.data);

                if (message.type == 'authenticationToken') {
                    if(message.authenticationToken)
                        defer.resolve({ token : message.authenticationToken, expiration : message.expiration });
                    else
                        defer.resolve(null);

                    if (message.authenticationEmail)
                        $rootScope.lastLoginEmail = message.authenticationEmail;
                    //                        console.log('signin called');
                    //                    $rootScope.$broadcast('signIn', null);

                }
                else {
                    defer.reject('unsupported message type');
                }
            };

            $window.addEventListener('message', receiveMessage);

            pToken = defer.promise.then(function(t) {

                pToken = t;

                return t;

            }).catch(function(error) {

                pToken = null;

                console.error(error);

                throw error;

            }).finally(function() {

                $window.removeEventListener('message', receiveMessage);

            });

            authenticationFrame.contentWindow.postMessage(JSON.stringify({
                type: 'getAuthenticationToken'
            }), ACCOUNTS_URL);

            return pToken;
        });
        }

        //============================================================
        //
        //
        //============================================================
        function setToken(token, email, expiration) { // remoteUpdate:=true
            if(token){
                pToken = {
                            token       : token,
                            expiration  : expiration
                        }
            }
            else
                pToken = undefined;

            return $q.when(authenticationFrameQ).then(function(authenticationFrame){

            if (authenticationFrame) {

                var msg = {
                    type: "setAuthenticationToken",
                    authenticationToken: token,
                    authenticationEmail: email,
                    expiration        : expiration
                };

                authenticationFrame.contentWindow.postMessage(JSON.stringify(msg), ACCOUNTS_URL);
            }

            if (email) {
                $rootScope.lastLoginEmail = email;
            }
            });
        }

        function checkTokenExpiration(authenticationToken){
            
            if(authenticationToken && authenticationToken.expiration){
                if(new Date(authenticationToken.expiration).getTime() < new Date().getTime()){
                    pToken = null;
                    $rootScope.$broadcast('event:auth-sessionExpired');
                    throw 'session token expired';
                }
            }

            return authenticationToken;
        }

        return {
            get: getToken,
            set: setToken
        };
    }]);
    app.factory('authentication', ["$http", "$rootScope", "$q", "apiToken", function($http, $rootScope, $q, apiToken) {

        var currentUser = null;

        //============================================================
        //
        //
        //============================================================
        function anonymous() {
            return {
                userID: 1,
                name: 'anonymous',
                email: 'anonymous@domain',
                government: null,
                userGroups: null,
                isAuthenticated: false,
                isOffline: true,
                roles: []
            };
        }

        //============================================================
        //
        //
        //============================================================
        function getUser() {

            if (currentUser)
                return $q.when(currentUser);

            return $q.when(apiToken.get()).then(function(authenticationToken) {

                if (!authenticationToken) {
                    return anonymous();
                }

                return $http.get('/api/v2013/authentication/user', {
                    headers: {
                        Authorization: "Ticket " + authenticationToken.token
                    }, cache:false
                }).then(function(r) {
                    return r.data;
                });

            }).catch(function() {

                return anonymous();

            }).then(function(user) {

                setUser(user);

                return user;
            });
        }

        //============================================================
        //
        //
        //============================================================
        function signIn(email, password) {

            return $http.post("/api/v2013/authentication/token", {

                "email": email,
                "password": password

            }).then(function(res) {

                var token = res.data;

                return $q.all([token, $http.get('/api/v2013/authentication/user', {
                    headers: {
                        Authorization: "Ticket " + token.authenticationToken
                    }, cache:false
                })]);

            }).then(function(res) {

                var token = res[0];
                var user = res[1].data;

                email = (email || "").toLowerCase();

                apiToken.set(token.authenticationToken, email, token.expiration);
                setUser(user);

                $rootScope.$broadcast('signIn', user);

                return user;

            }).catch(function(error) {

                throw {
                    error: error.data,
                    errorCode: error.status
                };

            });
        }

        //============================================================
        //
        //
        //============================================================
        function signOut() {

            apiToken.set(null);

            setUser(null);

            return $q.when(getUser()).then(function(user) {

                $rootScope.$broadcast('signOut', user);

                return user;
            });
        }

        //============================================================
        //
        //
        //============================================================
        function setUser(user) {

            currentUser = user || undefined;
            $rootScope.user = user || anonymous();
            
            if (user && user.isAuthenticated && !user.isEmailVerified) {
                $rootScope.$broadcast('event:auth-emailVerification', {
                    message: 'Email verification pending. Please verify you email before submitting any data.'
                });
            }
        }

        //============================================================
        //
        //
        //============================================================
        function isEmailVerified() {
            
            return $q.when(getUser()).then(function(user) {

               return (user && user.isAuthenticated && user.isEmailVerified) ;
               
            });

        }

        $rootScope.$on('event:auth-sessionExpired', function(){            
            apiToken.set(null);
            
            setUser(null);
            // signOut(true);
        });

        return {
            getUser: getUser,
            signIn: signIn,
            signOut: signOut,
            isEmailVerified:isEmailVerified
        };

    }]);

    app.factory('authenticationHttpIntercepter', ["$q", "apiToken", "$rootScope",
     function($q, apiToken, $rootScope) {

        return {
            request: function(config) {

                var trusted = /^https:\/\/api.cbd.int\//i.test(config.url) ||
                    /^https:\/\/localhost[:\/]/i.test(config.url) ||
                    /^\/\w+/i.test(config.url);

                var hasAuthorization = (config.headers || {}).hasOwnProperty('Authorization') ||
                    (config.headers || {}).hasOwnProperty('authorization');

                if (!trusted || hasAuthorization) // no need to alter config
                    return config;

                //Add token to http headers

                return $q.when(apiToken.get()).then(function(authenticationToken) {

                    if (authenticationToken) {
                        config.headers = angular.extend(config.headers || {}, {
                            Authorization: "Ticket " + authenticationToken.token
                        });
                    }

                    return config;
                });
            },
            responseError: function(rejection) {

                if (rejection.data && rejection.data.statusCode == 401) {

                    if (rejection.data && rejection.data.message && rejection.data.message.indexOf('Email verification pending') >= 0) {
                        $rootScope.$broadcast('event:auth-emailVerification', rejection.data);
                    }

                }
                // otherwise, default behaviour
                return $q.reject(rejection);
            }
        };
    }]);

    app.factory('realmHttpIntercepter', ["realm", function(realm) {

        return {
            request: function(config) {

                if(config && config.params && config.params.skipRealmHeader){
                    config.params.skipRealmHeader   = undefined;
                    config.headers.realm            = undefined;
                }
                else if(config && config.header && config.headers.realm === undefined){
                    delete config.headers.realm;
                }

                if((config.headers || {}).hasOwnProperty('realm'))
                    return config;

                var trusted = /^https:\/\/api.cbd.int\//i.test(config.url) ||
                /^https:\/\/eunomia.cbd.int\//i.test(config.url) ||
                    /^https:\/\/localhost[:\/]/i.test(config.url) ||
                    /^\/\w+/i.test(config.url);

               if (trusted && realm) {
                    config.headers = angular.extend(config.headers || {}, {
                        realm: realm.value || realm
                    });
                }

                return config;
            }
        };
    }]);

    app.factory('apiURLHttpIntercepter', ["apiUrl", "$window", function(apiUrl, $window) {

            return {
                request: function(config) {

                    var isProdutionApi = /^https:\/\/api.cbd.int\//i.test(config.url)

                    if(isProdutionApi && apiUrl.isAppDevelopment()){

                        var devUrl = apiUrl.devApiUrl(config.url);
                        if(devUrl)
                            config.url =  devUrl + config.url;
                    }

                    //Special case for url that are in ng-include need to burst the cache for version change.
                    if ((/^\/app/).test(config.url) && (config.url.indexOf(".html") > 0 || config.url.indexOf(".json") > 0)) {
                        var url = config.url;
                        
                        if(!window.hasHashUrl(url)){
                          var parseUrl = config.url 
                          if(!/\.js$/.test(parseUrl))
                            parseUrl += ".js";
                          url = window.getHashFileName(parseUrl);
                        }
                        console.log(url);
                        if (url.indexOf("v=") < 0 && !window.hasHashUrl(url)) {
                          url = window.addAppVersionToUrl(url);
                        }
                        config.url = url;
                    }

                    return config;
                }
            };
        }
    ]);

    app.factory('genericIntercepter', ["locale", function(locale) {

            return {
                request: function(config) {
                    
                    var trusted = /^https:\/\/api.cbd.int\//i.test(config.url) ||
                                /^https:\/\/localhost[:\/]/i.test(config.url) ||
                                /^\/\w+/i.test(config.url);

                    var hasLanguageHeader = (config.headers || {}).hasOwnProperty('preferred-language');

                    if (!trusted || hasLanguageHeader) // no need to alter config
                        return config;

                    if (!hasLanguageHeader) {
                        config.headers = angular.extend(config.headers || {}, {
                            'preferred-language': locale
                        });
                    }

                    return config;
                }
            };
        }
    ]);
    app.factory('apiRebase', ["$location", function($location) {
        
        return {
            request: function(config) {

                var rewrite = /^\/api\//.test(config.url.toLowerCase()) &&
                                (   $location.host().toLowerCase() == 'absch.cbd.int' ||  
                                    $location.host().toLowerCase() == 'training-absch.cbd.int'
                                );

                if(rewrite)
                    config.url = 'https://api.cbd.int' + config.url;

                return config;
            }
        };
    }]);
    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('authenticationHttpIntercepter');
        $httpProvider.interceptors.push('realmHttpIntercepter');
        $httpProvider.interceptors.push('apiURLHttpIntercepter');
        $httpProvider.interceptors.push('genericIntercepter');
        $httpProvider.interceptors.push('apiRebase');
    }]);


