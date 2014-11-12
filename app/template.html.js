define(['app',
	'app/views/directives/login.directive.html.js'], function (app) {
    'use strict';

    app.controller('TemplateController', ['$scope', '$rootScope', '$window', '$location', 'authentication', '$browser', 'realmConfiguration', 'underscore',
			function ($scope, $rootScope, $window, $location, authentication, $browser, realmConfiguration, _) {

        $scope.controller = "TemplateController";



		$scope.$root.getRoleName = function(roleName){
			if(roleName){
				var realmConfig = _.where(realmConfiguration,{host:$location.$$host});
				if(realmConfig.length >0){
					 var role = _.find(realmConfig[0].roles,function(key){
									return _.keys(key)[0] == roleName;
								});
								// console.log(realmConfig, role)
					 if(role)
					 	return _.values(role)[0];
					 else
						throw roleName + ' role is not configured for realm ' + realmConfig[0].realm + ', please update realm-configuration.js';
				}
				else
					throw 'Realm not configured, please update realm-configuration.js';
			}
		}

        //============================================================
        //
        //
        //============================================================
        $scope.getClass = function(path) {
            if ($location.path().substr(0, path.length) == path) {
              return true;
            } else {
              return false;
            }
        }

        //============================================================
        //
        //
        //============================================================
        $scope.development_env = false;
        $scope.env_name = "ABS-CH PILOT PHASE";
        $scope.development_env = $location.absUrl().toLowerCase().indexOf("://absch.cbd.int");
        if(!$scope.development_env || $scope.development_env == -1){
            $scope.development_env = true;
            $scope.env_name = "DEVELOPMENT";
        }
        else{
            $scope.development_env = false;
            $scope.env_name = "ABS-CH PILOT PHASE";
        }

        //============================================================
        //
        //
        //============================================================
       function setCookie (name, value, days, path) {

            var cookieString = escape(name) + "=";

            if(value) cookieString += escape(value);
            else      days = -1;

            if(path)
                cookieString += "; path=" + path;

            if(days || days == 0) {

                var expirationDate = new Date();

                expirationDate.setDate(expirationDate.getDate() + days);

                cookieString += "; expires=" + expirationDate.toUTCString();
            }

            document.cookie = cookieString
        };


        //_loadCss('/app/libs/font-awesome/css/font-awesome.css');
        //_loadCss('//fast.fonts.net/cssapi/ab363dc0-d9f9-4148-a52d-4dca15df47ba.css');

        //============================================================
        //
        //
        //============================================================
        $scope.actionSignin = function () {

            var client_id    = encodeURIComponent('fbbb279e53ff814f4c23878e712dfe23ee66bd73a1cfc42b1842e2ab58c440fe');
            var redirect_uri = encodeURIComponent($location.protocol()+'://'+$location.host()+':'+$location.port()+'/oauth2/callback');
            $window.location.href = 'https://accounts.cbd.int/oauth2/authorize?client_id='+client_id+'&redirect_uri='+redirect_uri+'&scope=all';
        }

        //============================================================
        //
        //
        //============================================================
        $scope.actionSignOut = function () {
            document.cookie = "authenticationToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
            var redirect_uri = encodeURIComponent($location.protocol()+'://'+$location.host()+':'+$location.port()+'/');
            $window.location.href = 'https://accounts.cbd.int/signout?redirect_uri='+redirect_uri;
        };

        //============================================================
        //
        //
        //============================================================
        $scope.actionSignup = function () {
            var redirect_uri = encodeURIComponent($location.protocol()+'://'+$location.host()+':'+$location.port()+'/');
            $window.location.href = 'https://accounts.cbd.int/signup?redirect_uri='+redirect_uri;
        };

        //============================================================
        //
        //
        //============================================================
        $scope.actionPassword = function () {
            var redirect_uri = encodeURIComponent($location.protocol()+'://'+$location.host()+':'+$location.port()+'/');
            $window.location.href = 'https://accounts.cbd.int/password?redirect_uri='+redirect_uri;
        };

        //============================================================
        //
        //
        //============================================================
        $scope.actionProfile = function () {
            var redirect_uri = encodeURIComponent($location.protocol()+'://'+$location.host()+':'+$location.port()+'/');
            $window.location.href = 'https://accounts.cbd.int/profile?redirect_uri='+redirect_uri;

        };

        //============================================================
        //
        //
        //============================================================
        function receiveMessage(event)
        {
            if(event.origin!='https://accounts.cbd.int')
                return;

            var message = JSON.parse(event.data);

            if(message.type=='ready')
                event.source.postMessage('{"type":"getAuthenticationToken"}', event.origin);

            if(message.type=='authenticationToken') {
                if(message.authenticationToken && !$browser.cookies().authenticationToken) {
                    setCookie('authenticationToken', message.authenticationToken, 7, '/');
                    $window.location.href = window.location.href;
                }
                if(!message.authenticationToken && $browser.cookies().authenticationToken) {
                    authentication.signOut();
                    $window.location.href = $window.location.href;
                }
            }
        }

        window.addEventListener('message', receiveMessage, false);

        var iframe = angular.element(document.querySelector('#authenticationFrame'))[0];
        iframe.contentWindow.postMessage('{"type":"getAuthenticationToken"}', 'https://accounts.cbd.int');
    }]);

    function _loadCss(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }
});
