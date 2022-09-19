import app from '~/app';
import template from "text!./user-settings.html";
import _ from 'lodash';
import moment from 'moment';
import 'ngDialog';
import '~/services/main';
import '~/views/register/directives/register-top-menu';
import '~/components/scbd-angularjs-services/main';
import userSettingsT from '~/app-text/views/register/user-preferences/user-settings.json';
import frequencies from '~/app-text/views/register/user-preferences/frequency.json'
import { languages } from '~/app-data/un-languages';

    app.directive("userSettings", ['$rootScope', 'ngDialog', '$routeParams', function ($rootScope, ngDialog, $routeParams) {

        return {
            restrict: "E",
            template: template,
            replace: true,
            scope: {
            },
            link: function ($scope, element, attrs) {},
            controller: ['$rootScope', '$scope', '$http', 'IGenericService', 'realm', '$timeout', '$location', 'roleService', '$route', '$element', 'localStorageService', 'solr', 'locale', 'translationService',
                function ($rootScope, $scope, $http, IGenericService, realm, $timeout, $location, roleService, $route, $element, localStorageService, solr, locale, translationService) {
                    
                    translationService.set('userSettingsT', userSettingsT);

                    $scope.realm = realm;
                    $scope.user = $rootScope.user;
                    $scope.userSettings = {};
                    
                    $scope.frequencies = frequencies;
                    $scope.languages   = languages;

                    $scope.updateLanguage = async function(lang){
                        $scope.userSettings.language = lang;

                        await updateUserSettings($scope.userSettings);
                    };

                    $scope.updateFrequency = async function(frequency){
                        $scope.userSettings.frequency = frequency;

                        await updateUserSettings($scope.userSettings);
                    };

                    async function init(){
                        $scope.updating = true;
                        try{
                            const settings = (await $http.get('/api/v2016/settings/'+`${realm.value}-${$scope.user.userID}`)).data;
                            
                            if(settings)
                                $scope.userSettings = settings;
                        }
                        catch(e){
                            safeApply(()=>$scope.error = e);
                        }
                        finally{
                            safeApply(()=>$scope.updating = false);
                        }
                    }

                    async function updateUserSettings(data){
                        if(!data.realm)
                            data.realm = realm.value;
                        
                        //backend schema was changed to consolidated all setting..to have ch based setting only, create realm + user userID
                        if(!data.userId)
                            data.userId = `${realm.value}-${$scope.user.userID}`;
                                                    
                        $scope.updating = true;
                        $scope.error = undefined;

                        try{
                            let settingPromise;
                            if(data._id)
                                settingPromise = $http.put('/api/v2016/settings/'+data.userId, data);
                            else
                                settingPromise = $http.post('/api/v2016/settings', data);

                            const settingResponse = await settingPromise;
                            if(settingResponse.status == 200 && settingResponse.data.id)
                                $scope.userSettings._id =  settingResponse.data.id;
                        }
                        catch(e){
                            safeApply(()=>$scope.error = e.data);
                        }
                        finally{
                            safeApply(()=>$scope.updating = false);
                        }

                    }
                    function safeApply(fn) {
                        ($scope.$$phase || $scope.$root.$$phase) ? fn() : $scope.$apply(fn);
                    } 

                    init();
                }]
            }
        }
    ]);