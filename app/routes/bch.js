define(['app', './common-routes', 'angular-route'], function (app,commonRoutes) { 'use strict';

    app.config(['$routeProvider', function ($routeProvider) {
               
        $routeProvider.
               whenAsync('/',                           { templateUrl: 'views/home/bch.html',              controller: function() { return commonRoutes.importQ('views/home/bch'); }, label:'The BCH'}).
               whenAsync('/submit',                     {templateUrl: 'views/register/record-types.html',                     controller: function() { return commonRoutes.importQ('views/register/record-types'); }, label:'Submit', resolve : { user : commonRoutes.currentUser() }}).
               
               whenAsync('/database/reports*',               { redirectTo:  '/reports' }).
               whenAsync('/register/BCHN/new',                 {templateUrl: 'views/forms/edit/bch/edit-biosafety-news.html', label:'New', param:'true', resolveController: true,documentType :'BCHN' , resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/DEC/new',                   {templateUrl: 'views/forms/edit/bch/edit-biosafety-decision.html',  label:'New',  param:'true', resolveController: true,documentType :'DEC' ,   resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/RA/new',                    {templateUrl: 'views/forms/edit/bch/edit-risk-assessment.html',     label:'New',  param:'true', resolveController: true,documentType :'RA' ,    resolve : { securized : commonRoutes.securize(null,true, true), routePrams: commonRoutes.injectRouteParams({ isNational:true})} }).
               whenAsync('/register/IRA/new',                   {templateUrl: 'views/forms/edit/bch/edit-risk-assessment.html',     label:'New',  param:'true', resolveController: true,documentType :'IRA' ,   resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/LAW/new',                   {templateUrl: 'views/forms/edit/bch/edit-law.html',         label:'New',  param:'true', resolveController: true,documentType :'LAW' ,   resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/ORGA/new',                  {templateUrl: 'views/forms/edit/bch/edit-organism.html',    label:'New',  param:'true', resolveController: true,documentType :'ORGA' ,  resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/GENE/new',                  {templateUrl: 'views/forms/edit/bch/edit-dna-sequence.html',label:'New',  param:'true', resolveController: true,documentType :'GENE' ,   resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/LMO/new',                   {templateUrl: 'views/forms/edit/bch/edit-modified-organism.html',         label:'New',  param:'true', resolveController: true,documentType :'LMO' ,   resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/BIRC/new',                  {templateUrl: 'views/forms/edit/edit-resource.html',                  label:'New',  param:'true', resolveController: true,documentType :'BIRC' , resolve : { securized : commonRoutes.securize(null, true, true) }, }).
               whenAsync('/register/NR4/new',                   {templateUrl: 'views/forms/edit/bch/edit-national-report-4.html',     label:'New',  param:'true', resolveController: true,documentType :'NR4' ,  resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/SPCA/new',                  {templateUrl: 'views/forms/edit/edit-authority.html',                 label:'New',  param:'true', resolveController: true,documentType :'SPCA',  resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/LAB/new',                   {templateUrl: 'views/forms/edit/bch/edit-laboratory-detection.html',  label:'New',  param:'true', resolveController: true,documentType :'LAB',   resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/EXP/new',                   {templateUrl: 'views/forms/edit/bch/edit-biosafety-expert.html',      label:'New',  param:'true', resolveController: true,documentType :'EXP',   resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               
               whenAsync('/register/DEC/:identifier/edit',      {templateUrl: 'views/forms/edit/bch/edit-biosafety-decision.html',  label:'Edit', param:'true', resolveController: true, documentType :'DEC' ,  resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/RA/:identifier/edit',       {templateUrl: 'views/forms/edit/bch/edit-risk-assessment.html',     label:'Edit', param:'true', resolveController: true, documentType :'RA' ,   resolve : { securized : commonRoutes.securize(null,true, true), routePrams: commonRoutes.injectRouteParams({ isNational:true})}}).
               whenAsync('/register/IRA/:identifier/edit',      {templateUrl: 'views/forms/edit/bch/edit-risk-assessment.html',     label:'Edit', param:'true', resolveController: true, documentType :'IRA' ,  resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/LAW/:identifier/edit',      {templateUrl: 'views/forms/edit/bch/edit-law.html',         label:'Edit',  param:'true', resolveController: true,documentType :'LAW' ,   resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/ORGA/:identifier/edit',     {templateUrl: 'views/forms/edit/bch/edit-organism.html',    label:'Edit',  param:'true', resolveController: true,documentType :'ORGA',   resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/GENE/:identifier/edit',     {templateUrl: 'views/forms/edit/bch/edit-dna-sequence.html',label:'Edit',  param:'true', resolveController: true,documentType :'GENE' ,   resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/LMO/:identifier/edit',      {templateUrl: 'views/forms/edit/bch/edit-modified-organism.html',         label:'Edit',  param:'true', resolveController: true,documentType :'LMO' ,   resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/BIRC/:identifier/edit',     {templateUrl: 'views/forms/edit/edit-resource.html',        label:'Edit',  param:'true', resolveController: true, documentType :'BIRC',  resolve : { securized : commonRoutes.securize(null, true, true) }, }).
               whenAsync('/register/NR4/:identifier/edit',      {templateUrl: 'views/forms/edit/bch/edit-national-report-4.html',    label:'Edit',  param:'true', resolveController: true, documentType :'NR4',  resolve : { securized : commonRoutes.securize(null, true, true) }, }).
               whenAsync('/register/SPCA/:identifier/edit',     {templateUrl: 'views/forms/edit/edit-authority.html',                label:'Edit',  param:'true', resolveController: true,documentType :'SPCA',  resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/LAB/:identifier/edit',      {templateUrl: 'views/forms/edit/bch/edit-laboratory-detection.html', label:'Edit',  param:'true', resolveController: true,documentType :'LAB',   resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/register/BCHN/:identifier/edit',     {templateUrl: 'views/forms/edit/bch/edit-biosafety-news.html',       label:'Edit',  param:'true', resolveController: true, documentType :'BCHN' , resolve : { securized : commonRoutes.securize(null, true, true) }, }).
               whenAsync('/register/EXP/:identifier/edit',      {templateUrl: 'views/forms/edit/bch/edit-biosafety-expert.html',     label:'Edit',  param:'true', resolveController: true,documentType :'EXP',   resolve : { securized : commonRoutes.securize(null,true, true) }, }).
               whenAsync('/reports/lmo/:documentId/:tab',         { templateUrl: 'views/reports/bch/lmo-decisions-risk-assessments.html',  label:'LMO Decisions',  param:'true', resolveController: true, reloadOnUrl:false, resolve : { },  }).               
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
