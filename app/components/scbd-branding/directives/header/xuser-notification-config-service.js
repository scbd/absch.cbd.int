import app from '~/app';
import RealmApi from '~/api/realms';
import _ from 'lodash';

        app.service("cfgUserNotification", ['$location', '$window', '$filter', 'realm','apiToken', function ($location, $window, $filter, realm, apiToken) {

            const notificationUrls = {
                documentAlertUrl: '/database/record?documentID=',
                documentNotificationUrl: '/register/requests/',
                viewAllNotificationUrl: '/register/requests',
                documentMessageUrl: '/mailbox/'
            };
            let apiRealms = [];
            async function realmsForQuery() {
                const realmApi = new RealmApi({ tokenReader: () => apiToken.get() });
                apiRealms = await realmApi.getRealmConfigurations(realm.environment);
                return apiRealms.map(({ realm }) => realm);
            }

            async function notificationUrl(notification) {
                if (!apiRealms.length) {
                    console.error("Realms data is not loaded yet. Ensure `realmsForQuery()` is called before using `notificationUrl`.");
                    return;
                }

                const realm = notification.data.documentInfo.realm.toUpperCase();
                const realmData = apiRealms.find(data => data.realm === realm);

                if (!realmData) {
                    console.warn(`Realm "${realm}" not found. Falling back to default URL.`);
                    return getURL(notification);
                }

                const { baseURL } = realmData;
                let path;

                if (_.includes(await realmsForQuery(), realm)) {
                    path = notification.type === 'documentNotification'
                        ? `/register/${$filter("urlSchemaShortName")(notification.data.documentInfo.metadata.schema)}/${notification.data.documentInfo.identifier}/view`
                        : `/database/${$filter("urlSchemaShortName")(notification.data.documentInfo.metadata.schema)}/${notification.data.documentInfo.identifier}`;
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

            return {
                notificationUrls,
                realmsForQuery,
                notificationUrl,
                getURL
            };
        }]);
