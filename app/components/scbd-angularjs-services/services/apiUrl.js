define(['app'], function(app) {

    app.factory('apiUrl', ["$q", "$location", function($q, $location) {


            function devApiUrl(url) {
                // return;

                //for request which migh have http://api.cbd.int/api/v2015/countries for example should not be considered development
                var trusted = /^https:\/\/api.cbd.int\//i.test(url)
                            // ||/^https:\/\/api.cbddev.xyz\//i.test(url);
                if(trusted)
                    return;

                //validate on basis of the url location
                if (isAppDevelopment())
                    return 'https://api.cbddev.xyz';
            }

            function devAccountsUrl() {
                // return;
                if (isAppDevelopment())
                    return 'https://accounts.cbddev.xyz';
            }


            // /^https:\/\/accounts.cbddev.xyz\//i,
            // /^https:\/\/absch.cbddev.xyz\//i,
            // /^https:\/\/chm.cbddev.xyz\//i,
            function isAppDevelopment() {
                var knownDevUrls = [
                    /^https:\/\/\w+.cbddev.xyz\//i, //everything under cbddev.xyz
                    /^http:\/\/localhost[:\/]/i
                ];

                var url = $location.$$absUrl;

                for (var i = 0; i < knownDevUrls.length; i++) {
                    if (url.match(knownDevUrls[i])) {
                        return true;
                    }
                }
                return false;
            }

            return {
                devApiUrl       : devApiUrl,
                devAccountsUrl  : devAccountsUrl,
                isAppDevelopment: isAppDevelopment
            };
    }]);
});
