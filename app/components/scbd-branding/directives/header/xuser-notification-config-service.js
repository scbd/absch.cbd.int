import app from '~/app';
import RealmApi from '~/api/realms';
import _ from 'lodash';

        app.service("cfgUserNotification", ['$location', '$window', '$filter', function ($location, $window, $filter) {

            var notificationUrls = {
                documentAlertUrl        : '/database/record?documentID=',
                documentNotificationUrl: '/register/requests/',
                viewAllNotificationUrl: '/register/requests',
                documentMessageUrl: '/mailbox/'
            };
            
            async function getRealms() {
                const realmApi = new RealmApi({}); 
                const result = await realmApi.fetchRealmConfigurations();
                return result;
            }
            
            let apiRealms;
            const queryRealms = {
                urls: [],
                realms:[]
            };

            async function realmsForQuery() {
               
                apiRealms = await getRealms();
                apiRealms.forEach(item => {
                    const {baseURL, realm} = item; 
                    queryRealms.urls.push(baseURL);
                    queryRealms.realms.push(realm);
                });

                return queryRealms;
            } 

            function notificationUrl(notification) {
                const realm = notification.data.documentInfo.realm.toUpperCase();
                const url = apiRealms.find(data => data.realm === realm).baseURL;

                let path;
                if(url) {
                    if ($location.absUrl().indexOf(url) >= 0)
                        url = '';
                    
                    if (_.includes(queryRealms.realms, realm)) {
                        if(notification.type == 'documentNotification')
                            path = "/register/" + $filter("urlSchemaShortName")(notification.data.documentInfo.metadata.schema) + "/" + notification.data.documentInfo.identifier + "/view";
                        else
                            path = '/database/' + $filter("urlSchemaShortName")(notification.data.documentInfo.metadata.schema) + "/" + notification.data.documentInfo.identifier;
                    }
                    else {
                        path = getURL(notification);
                    }
    

                    $window.location.href = url + path;
                }
                else {
                    return path;
                }
            }

            function getURL(notification) {
                
                if (notificationUrls && !notificationUrls.documentNotificationUrl)
                    throw "Invalid User Notification Configuration, documentNotificationUrl is missing.";

                if (notification.type == 'documentNotification')
                    return notificationUrls.documentNotificationUrl + notification.data.workflowId;
                else  if (notification.type == 'subscriptionNotification')
                    return notificationUrls.documentAlertUrl + notification.data.documentInfo.identifier;
                else
                    return notificationUrls.documentMessageUrl + notification.id;
            }

            return {
                notificationUrls: notificationUrls,
                realmsForQuery  : realmsForQuery,
                notificationUrl : notificationUrl,
                getURL          : getURL
            };
        }]);

    
