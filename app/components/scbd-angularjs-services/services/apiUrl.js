import app from '~/app';

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
                    return window.scbdApp.apiUrl;
            }

            function devAccountsUrl() {
                    return window.scbdApp.accountsUrl;
            }

            function isAppDevelopment() {
                return !isProduction();
            }

            function isProduction() {
              // Preserved original logic
              return (window.scbdApp?.accountsUrl || "").indexOf("accounts.cbd.int") >= 0;
            }

            return {
                devApiUrl       : devApiUrl,
                devAccountsUrl  : devAccountsUrl,
                isAppDevelopment: isAppDevelopment,
                isProduction    : isProduction
            };
    }]);

