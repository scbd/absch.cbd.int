define(['app', './common-routes', 'angular-route'], function (app,commonRoutes) { 'use strict';

    app.config(['$routeProvider', function ($routeProvider) {
               
        $routeProvider.
               whenAsync('/',                           { templateUrl: 'views/home/bch.html',              controller: function() { return commonRoutes.importQ('views/home/bch'); }, label:'The BCH'}).
               whenAsync('/register',                   {templateUrl: 'views/register/record-types.html',                     controller: function() { return commonRoutes.importQ('views/register/record-types'); }, label:'Submit', resolve : { user : commonRoutes.currentUser() }}).
               
               whenAsync('/database/reports*',               { redirectTo:  '/reports' }).

               whenAsync('/register/DEC/new',                   {templateUrl: 'views/forms/edit/bch/edit-biosafety-decision.html',  label:'New',  param:'true', resolveController: true,documentType :'DEC' ,   resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/RA/new',                    {templateUrl: 'views/forms/edit/bch/edit-risk-assessment.html',     label:'New',  param:'true', resolveController: true,documentType :'RA' ,    resolve : { securized : commonRoutes.securize(null,true, true) }, }).
              
               whenAsync('/register/DEC/:identifier/edit',      {templateUrl: 'views/forms/edit/bch/edit-biosafety-decision.html',  label:'Edit', param:'true', resolveController: true, documentType :'DEC' ,  resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/RA/:identifier/edit',       {templateUrl: 'views/forms/edit/bch/edit-risk-assessment.html',     label:'Edit', param:'true', resolveController: true, documentType :'RA' ,   resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               
               // BCH4 PAGES
               whenAsync('/about/countryprofile.shtml',      { redirectTo:  '/countries/:country' }).
               whenAsync('/countries/:country',              { templateUrl: 'views/shared/cms-content.html', target:'https://bch.cbd.int/about/countryprofile.shtml?country=:country', controller: function() { return commonRoutes.importQ('views/shared/cms-content'); } }).
               whenAsync('/about/:subpath*?',                { templateUrl: 'views/shared/cms-content.html', target:'https://bch.cbd.int/about/:subpath',                              controller: function() { return commonRoutes.importQ('views/shared/cms-content'); } }).
               whenAsync('/protocol/:subpath*?',             { templateUrl: 'views/shared/cms-content.html', target:'https://bch.cbd.int/protocol/:subpath',                           controller: function() { return commonRoutes.importQ('views/shared/cms-content'); } }).
               whenAsync('/onlineconferences/:subpath*?',    { templateUrl: 'views/shared/cms-content.html', target:'https://bch.cbd.int/onlineconferences/:subpath',                  controller: function() { return commonRoutes.importQ('views/shared/cms-content'); } }).

               whenAsync('/help/forbidden',   { templateUrl: 'views/shared/403.html', label:'Forbidden'}).
               whenAsync('/help/not-found',   { templateUrl: 'views/shared/404.html', label:'Not found'}).     
               
               otherwise({ templateUrl: commonRoutes.baseUrl+'views/shared/404.html', label:'Page not found'});
    }]);

    
    
            //    whenAsync('/register/CNA/new',           {templateUrl: 'views/forms/edit/edit-authority.html',                 label:'New',  param:'true', resolveController: true,documentType :'CNA' , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
            //     whenAsync('/register/CBI/new',           {templateUrl: 'views/forms/edit/edit-capacityBuildingInitiative.html',label:'New',  param:'true', resolveController: true,documentType :'CBI' , resolve : { securized : commonRoutes.securize(null, null, true) }, }).
               
            //    whenAsync('/register/CNA/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-authority.html',                 label:'Edit',  param:'true', resolveController: true, documentType :'CNA' , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
            //    whenAsync('/register/CBI/:identifier/edit',           {templateUrl: 'views/forms/edit/edit-capacityBuildingInitiative.html',label:'Edit',  param:'true', resolveController: true, documentType :'CBI' , resolve : { securized : commonRoutes.securize(null, null, true) }, }).
});
