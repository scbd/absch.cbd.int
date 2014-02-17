define(['app'], function (app) {
    'use strict';

    app.controller('TemplateController', ['$scope', '$window', 'authentication', function ($scope, $window, authentication) {

        $scope.controller = "TemplateController";

        //_loadCss('/app/libs/font-awesome/css/font-awesome.css');
        //_loadCss('//fast.fonts.net/cssapi/ab363dc0-d9f9-4148-a52d-4dca15df47ba.css');

        //============================================================
        //
        //
        //============================================================
        $scope.actionSignin = function actionSignin () {

            var client_id    = encodeURIComponent('0000000000000000000000000000000000000000000000000000000000000000');
            var redirect_uri = encodeURIComponent('http://localhost:2010/oauth2/callback');

            //$window.location.href = 'https://accounts.cbd.int/oauth2/authorize/?client_id='+client_id+'&redirect_uri='+redirect_uri+'&scope=all';
            $window.location.href = 'https://accounts.cbd.int/oauth2/authorize?client_id='+client_id+'&redirect_uri='+redirect_uri+'&scope=all';
        }

        //============================================================
        //
        //
        //============================================================
        $scope.actionSignOut = function actionSignOut () { 
            authentication.signOut();
            $window.location.href = $window.location.href; // force page reload to clear everyting from memory 
        };
    }]);

    function _loadCss(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }
});