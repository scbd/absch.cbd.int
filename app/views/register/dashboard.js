import app from 'app';
import _ from 'lodash';
import ng from 'angular';
import 'angular-animate';
import 'angular-joyride';
import joyRideText from '~/app-data/dashboard-joyride-tour.json';
import 'services/main';
import 'views/register/directives/register-top-menu';
import 'toastr';
import 'components/scbd-angularjs-services/main';
import 'views/register/directives/top-records';
import 'views/register/directives/top-requests';
import 'ngDialog';
    
    export { default as template } from './dashboard.html';
export default ["$rootScope", "$scope", "IStorage", "roleService", "articlesService", "realm", "$q",
                    "$routeParams", '$location', "$filter", "ngDialog", "$timeout", 'toastr',
                    'IWorkflows', 'commonjs',"joyrideService","$element",
        function($rootScope, $scope, storage, roleService, articlesService, realm, $q, $routeParams, 
                $location, $filter, ngDialog, $timeout, toastr, IWorkflows, commonjs, joyrideService, $element) {
            
            $scope.schemas          = realm.schemas        
            $scope.languages        = commonjs.languages;
            $scope.Math             = window.Math;
            $scope.nationalSchemas  = _.without(realm.nationalSchemas, 'contact', 'focalPoint', 'absMeasureStatus');
            $scope.referenceSchemas = _.without(realm.referenceSchemas, 'capacityBuildingResource');
            $scope.topRecords       = {};
            $scope.user             = $rootScope.user;
            $scope.showRecords      = true;
            $scope.isBch            = realm.is('BCH');
            $scope.isAbs            = realm.is('ABS');

            var schemaFacets = {};

            //====================================================================================
            $scope.isFilter = function(filter) {
                return $scope.dashboardFilter == filter || $scope.dashboardFilter == "All";
            }

            if ($scope.user.isAuthenticated) {
                $scope.roles = {
                    is                      : roleService.is.bind(roleService),
                    isPublishingAuthority   : roleService.isPublishingAuthority() || checkNationalSchemaRoles('publishingAuthorities'),
                    isNationalFocalPoint    : roleService.isNationalFocalPoint(),
                    isAdministrator         : roleService.isAdministrator(),
                    isNationalAuthorizedUser: roleService.isNationalAuthorizedUser() || checkNationalSchemaRoles('nationalAuthorizedUser'),
                    isUser                  : roleService.isUser(),
                    isNationalSchemaUser    : roleService.isNationalSchemaUser,
                    isNationalUser          : roleService.isNationalUser(),
                    isSchemaUser            : roleService.isSchemaUser
                };

                if($scope.user.government)
                    $scope.userCountry = {identifier:$scope.user.government };

            }

            $scope.tour = function(){
                $scope.tourOn = true;
                var joyride = joyrideService;
                joyride.config = {
                    overlay: true,
                    onStepChange: function(){  },
                    onStart: function(){ },
                    onFinish: function(){
                        joyride.start = false;
                        $scope.tourOn = false;
                        $scope.showProfileInfo = false;
                        if($scope.topRecords["CON"]) {
                            $scope.topRecords["CON"] = false;
                            $element.find("#quickViewContact").click();
                        }
                    },
                    steps : [
                        {
                            appendToBody: true,
                            title       : joyRideText.welcome.title,
                            content     : joyRideText.welcome.content
                        },
                        {
                            appendToBody: true,
                            type        : 'element',
                            selector    : "#showProfileInfo",
                            title       : joyRideText.personalInformation.title,
                            content     : joyRideText.personalInformation.content,
                            placement   : 'top',
                            beforeStep  : showProfileInfo
                        },
                        {
                            appendToBody: true,
                            type        : 'element',
                            selector    : "#recordOverview",
                            title       : joyRideText.recordOverview.title,
                            content     : joyRideText.recordOverview.content,
                            placement   : 'top'
                        },
                        {
                            appendToBody: true,
                            type        : 'element',
                            selector    : "#publishFormat",
                            title       : joyRideText.yourRecordsStatus.title,
                            content     : joyRideText.yourRecordsStatus.content,
                            placement   : 'top',
                            beforeStep  : hideProfileInfo
                        },
                        {
                            appendToBody: true,
                            type        : 'element',
                            selector    : "#offlineFormat",
                            title       : joyRideText.yourRecordsOffline.title,
                            content     : joyRideText.yourRecordsOffline.content,
                            placement   : 'top'
                        },
                        {
                            appendToBody: true,
                            type        : 'element',
                            selector    : "#quickViewContact",
                            title       : joyRideText.quickView.title,
                            content     : joyRideText.quickView.content,
                            placement   : 'right',
                            beforeStep  : showTopRecord

                        },
                        {
                            appendToBody: true,
                            type        : 'element',
                            selector    : "#addNewRecordContact",
                            title       : joyRideText.addNewRecord.title,
                            content     : joyRideText.addNewRecord.content,
                            placement   : 'right',
                            beforeStep  : showTopRecord
                        },
                        {
                            appendToBody: true,
                            type        : 'element',
                            selector    : "#viewListContact",
                            title       : joyRideText.viewAllRecords.title,
                            content     : joyRideText.viewAllRecords.content,
                            placement   : 'right'
                        },
                        {
                            appendToBody:true,
                            type        : 'element',
                            selector    : "#needHelp",
                            title       : joyRideText.needHelp.title,
                            content     : joyRideText.needHelp.content,
                            placement   : 'bottom',
                            customClass : "need-help-jr",
                            beforeStep  : gotoSectionHelp
                        },
                        {
                            appendToBody:true,
                            type        : 'element',
                            selector    : "#slaask-button-cross",
                            title       : joyRideText.needMoreHelp.title,
                            content     : joyRideText.needMoreHelp.content,
                            placement   : 'top',
                            customClass : "need-more-help-jr"
                        }
                    ]
                };
                joyride.start = true;

                function showProfileInfo(resumeJoyride){
                    $scope.showProfileInfo = true;
                    $timeout(resumeJoyride, 100);
                }

                function hideProfileInfo(resumeJoyride){
                   $scope.showProfileInfo = false;
                    $timeout(resumeJoyride, 100);
                }

                function gotoSectionHelp (resumeJoyride){
                    $('html,body').scrollTop(0);
                    $timeout(resumeJoyride, 100);
                }

                function showTopRecord(resumeJoyride){
                    document.querySelector('#quickViewContact').scrollIntoView({
                        behavior: 'smooth'
                    });
                    $element.find("#quickViewContact").click();
                    $scope.topRecords["CON"] = !$scope.topRecords["CON"];
                    $timeout(resumeJoyride, 100);
                }

            }
            if($routeParams.openTour){
                $scope.tour();
            }
            $scope.showTopRecords = function($event, schema) {
                $event.stopPropagation();
                $scope.topRecords[schema] = !$scope.topRecords[schema];
            }

            $scope.gotoNew = function($event, cftype) {
                $event.stopPropagation();
                $location.path("/register/" + $filter("urlSchemaShortName")(cftype) + "/new");
            }

            $scope.gotoList = function($event, cftype) {
                $location.path("/register/" + $filter("urlSchemaShortName")(cftype));
            }

            //===================================================================
            $scope.facets = function(schema, type){

                if (schemaFacets[schema]) {
                    return schemaFacets[schema][type+'Count']||0;
                }
                else return 0;
            };

            $scope.showUserRoles = function(){
                var user = $scope.user;
                ngDialog.open({
                    name     : 'rolesDialog',
                    className : 'ngdialog-theme-default',
                    template : 'rolesDialog',
                    controller : ['$scope', '$http', function($scope, $http){
                        var roleQuery = {roles : user.roles };
                        $http.get('/api/v2013/roles' , {params : {q : roleQuery}})
                        .then(function(data){
                            $scope.userRoles = data.data;
                        })

                        $scope.closeDialog = function(){
                            ngDialog.close();
                        }
                    }]
                })

            }

            $scope.toggleTooTip = function(){
                $timeout(function(){
                    ng.element('#welcomeSection').find('[data-bs-toggle="tooltip"]').tooltip();  
                }, 200)
            }
            
            async function init(){                      
                loadFacets();
                if($scope.isBch){
                    const data = await import('~/app-data/bch/offline-formats.json');
                    $scope.offlineFormats = data.default;
                }
                if($scope.isAbs){
                    const data = await import('~/app-data/abs/offline-formats.json');
                    $scope.offlineFormats = data.default;
                }
            }

            function loadFacets() {
                //  var fromStorage = localStorageService.get('documentRegisterFacets');
                // if(fromStorage)
                //     return fromStorage;

                var published = storage.documentQuery.facets("", {collection: "my"});
                var drafts = storage.documentQuery.facets("", {collection: "mydraft"});
                var requests = storage.documentQuery.facets("", {collection: "request"});
                var queries = [published, drafts, requests]

                var taskQueries = loadmyTaskFacets();
                if(taskQueries.length>0)
                    queries.push(taskQueries);

                $q.all(_.flatten(queries)).then(function(results) {

                    var index = 0;
                    _.forEach(results, function(facets) {
                        _.forEach(facets.data, function(count, format) {

                            if (!schemaFacets[format])
                                schemaFacets[format] = {};

                            if (index == 0)
                                schemaFacets[format].publishCount = count;
                            else if (index == 1)
                                schemaFacets[format].draftCount = count;
                            else if (index == 2)
                                schemaFacets[format].requestCount = count;
                            else if (index > 2)//workflow count from workflows
                                schemaFacets[format].requestCount = (schemaFacets[format].requestCount||0) + count;
                        })
                        index++;
                    });

                }).then(null, function(error) {
                    toastr.error("error loading facets.");
                    console.log(error);
                })
            }
            
            function loadmyTaskFacets(){
                    // TODO: can be just one query instead of 5!!!!
                    var taskQuery = [];
                    var referenceApproverRoles = {
                        "resource"                  : realm.schemaRoles("resource"),
                        "capacityBuildingInitiative": realm.schemaRoles("capacityBuildingInitiative")
                    };
                    if(realm.is('ABS', true)){
                        referenceApproverRoles["capacityBuildingResource"]  = realm.schemaRoles("capacityBuildingResource"  )
                        referenceApproverRoles["modelContractualClause"  ]  = realm.schemaRoles("modelContractualClause"    )
                        referenceApproverRoles["communityProtocol"       ]  = realm.schemaRoles("communityProtocol"         )
                    }
                    _.forEach(referenceApproverRoles, function(roles, schema){

                        if(roleService.isUserInRoles(roles)){
                        
                            var myUserID = $scope.$root.user.userID;
                            var query    = {
                                $and : [
                                    { "activities.assignedTo": myUserID } ,
                                    { "closedOn"             : { $exists : false } },
                                    { "data.realm"           : realm.value },
                                    { "data.metadata.schema" : schema }
                                ]
                            };
                            var query = IWorkflows.query(query,true)
                                        .then(function(data){
                                            var facetData = {data : {}};
                                            facetData.data[schema] = data.count;
                                            return facetData;
                                        });
                            taskQuery.push(query);
                        }
                    })
                    
                    return taskQuery;
            }
            
            function checkNationalSchemaRoles(role){
                for (let i = 0; i < realm.nationalSchemas.filter(e=>e!='contact').length; i++) {
                    const schema = realm.nationalSchemas[i];
                    if(roleService.is(role, schema))
                        return true; 
                }
                return false;
            }

            init();

            $timeout(function(){
                ng.element('#RegisterPage').find('[data-bs-toggle="tooltip"]').tooltip();                
            },100);
        }
    ];

