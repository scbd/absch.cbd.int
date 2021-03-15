import app from 'app';
import 'services/main';
import 'views/register/directives/register-top-menu';
 
    app.controller("ReportController", ["$rootScope", "$scope", "roleService",  "$sce",
        function($rootScope, $scope, roleService, $sce) {

            // if ($rootScope.user.isAuthenticated) {
            //     $scope.roles = {
            //         isAdministrator       : roleService.isAdministrator()
            //     };
               
            // }
            var country = [
                'India',
                'France',
                'Mexico',
                'Viet Nam',
                'South Africa'
            ]
            var url = "https://dashboard.cbd.int/s/external-users/app/kibana#/dashboard/688e4cb0-003e-11ea-927a-b1654d343429?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15y,to:now))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'634743e0-d01b-11e9-8e48-7b058c993558',key:schema_s,negate:!f,params:(query:absPermit),type:phrase,value:absPermit),query:(match:(schema_s:(query:absPermit,type:phrase)))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'634743e0-d01b-11e9-8e48-7b058c993558',key:government_EN_s.keyword,negate:!f,params:(query:'{{country}}'),type:phrase,value:'{{country}}'),query:(match:(government_EN_s.keyword:(query:'{{country}}',type:phrase))))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(title:'Total%20Permits'),gridData:(h:7,i:'916bc4c0-2632-42cc-86cf-19d10535546b',w:9,x:0,y:0),id:'68557ee0-003d-11ea-927a-b1654d343429',panelIndex:'916bc4c0-2632-42cc-86cf-19d10535546b',title:'Total%20Permits',type:visualization,version:'7.4.0'),(embeddableConfig:(),gridData:(h:11,i:'0933c4a3-4b59-4662-b488-2c6048caaa60',w:39,x:9,y:0),id:b3ed2650-003d-11ea-927a-b1654d343429,panelIndex:'0933c4a3-4b59-4662-b488-2c6048caaa60',type:visualization,version:'7.4.0'),(embeddableConfig:(legendOpen:!f,vis:(legendOpen:!t)),gridData:(h:14,i:bcf3770e-49bd-45ad-8107-a0bdfcdbf256,w:18,x:0,y:11),id:'20500f60-00c0-11ea-927a-b1654d343429',panelIndex:bcf3770e-49bd-45ad-8107-a0bdfcdbf256,type:visualization,version:'7.4.0'),(embeddableConfig:(legendOpen:!f,vis:(legendOpen:!t)),gridData:(h:14,i:'70a67c75-c761-4fe1-aa85-e1030ceabca0',w:15,x:18,y:11),id:'381c0530-00c1-11ea-927a-b1654d343429',panelIndex:'70a67c75-c761-4fe1-aa85-e1030ceabca0',type:visualization,version:'7.4.0'),(embeddableConfig:(),gridData:(h:14,i:d989f2f9-4f76-4a04-8e8e-e00538c0196d,w:15,x:33,y:11),id:'130e4dc0-0346-11ea-927a-b1654d343429',panelIndex:d989f2f9-4f76-4a04-8e8e-e00538c0196d,type:visualization,version:'7.4.0'),(embeddableConfig:(),gridData:(h:16,i:'64d78bae-9f01-4378-8e82-33fdaf1d82a1',w:24,x:0,y:25),id:'97977ec0-0262-11ea-927a-b1654d343429',panelIndex:'64d78bae-9f01-4378-8e82-33fdaf1d82a1',type:visualization,version:'7.4.0'),(embeddableConfig:(),gridData:(h:15,i:'7d5cfe3c-bb6a-4595-a84f-2d8168e39829',w:24,x:24,y:25),id:d3ab8340-0319-11ea-927a-b1654d343429,panelIndex:'7d5cfe3c-bb6a-4595-a84f-2d8168e39829',type:visualization,version:'7.4.0')),query:(language:kuery,query:''),timeRestore:!t,title:'ABS%20Permit',viewMode:view)"
            $scope.frameUrl = $sce.trustAsResourceUrl(url.replace(/{{country}}/g, country[Math.floor(Math.random() * Math.floor(4))]))
        }
    ]);

