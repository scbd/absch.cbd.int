import app from '~/app';
import RealmApi from '~/api/realms';
import _ from 'lodash';

        app.service("cfgUserNotification", ['$location', '$window', '$filter', 'realm','apiToken', function ($location, $window, $filter, realm, apiToken) {

            const realmApi         = new RealmApi({ tokenReader: () => apiToken.get() });
            const notificationUrls = {
                documentAlertUrl: '/database/record?documentID=',
                documentNotificationUrl: '/register/requests/',
                viewAllNotificationUrl: '/register/requests',
                documentMessageUrl: '/mailbox/'
            };
            let environmentRealms = [];

            async function realmsForQuery() {

                environmentRealms = await realmApi.getRealmConfigurations(realm.environment);
                return environmentRealms.map(({ realm }) => realm);
            }

            function notificationUrl(notification) {

                if (!environmentRealms.length) {
                    return
                }
                
                const documentRealm       = notification.data.documentInfo.realm.toUpperCase();
                const documentRealmConfig = environmentRealms.find(data => data.realm === documentRealm);

                if (!documentRealmConfig) {
                    console.warn(`Realm "${documentRealm}" not found. Falling back to default URL.`);
                    return getURL(notification);
                }

                const { baseURL } = documentRealmConfig;
                let path;
                
                if (environmentRealms.find(({ realm }) => realm==documentRealm)) {
                    path = `/register/${$filter("urlSchemaShortName")(notification.data.documentInfo.metadata.schema)}/${notification.data.documentInfo.identifier}/view`;                 
                        
                } else {
                    path = getURL(notification);
                }

                // Prevent navigation if already on the same domain
                if (!$location.absUrl().indexOf(baseURL) >= 0) {
                    $window.location.href = baseURL + path;
                } else {
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
            
            realmsForQuery();

            return {
                notificationUrls,
                realmsForQuery,
                notificationUrl,
                getURL
            };
        }]);
