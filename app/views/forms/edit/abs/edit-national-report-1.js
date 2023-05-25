import app from '~/app';
import _ from 'lodash';
import '~/views/directives/workflow-arrow-buttons';
import '~/components/scbd-angularjs-services/main';
import '~/views/forms/edit/editFormUtility';
import '~/views/forms/edit/edit';
import '~/services/main';
import '~/views/forms/directives/nr-yes-no';
import '~/views/forms/edit/document-selector';
import '~/views/directives/block-region-directive';
// ToDo import view directive once developed
import '~/components/scbd-angularjs-services/main';
export { default as template } from './edit-national-report-1.html';
import 'ngDialog';
import '~/views/forms/edit/directives/edit-national-report.directive';
import {npNationalReport1} from '~/app-data/abs/report-analyzer/npNationalReport1';
import {cpbNationalReport4} from '~/app-data/bch/report-analyzer/cpbNationalReport4';
import editNRT from '~/app-text/views/forms/edit/directives/edit-national-report.json'; 
import numbers from '~/app-text/numbers.json';
export default ["$scope", "$http", "$rootScope", "locale", "$q", "$controller", "$timeout", 
'commonjs', 'IStorage', '$routeParams', 'ngDialog', 'realm', 'translationService',
function ($scope, $http, $rootScope, locale, $q, $controller, $timeout, commonjs, storage, $routeParams, ngDialog, realm, translationService) {
    
     $scope.multiTermModel = {};
     
     translationService.set('editNRT', editNRT);
        translationService.set('numbers', numbers);

        $scope.multiTermModel = {};
        //$scope.tab = 'intro';
        var user = $rootScope.user;
        $scope.activeTab = 1     
       
        $scope.customValidations = {} // ToDo get from directive if required
        // TODO: read from mapping file
        var previousAnswerMapping = $scope.previousAnswerMapping = {};

        $controller('editController', {
            $scope: $scope
        });

        $scope.onContactQuery = function(searchText){
            var queryOptions = {
            schemas : ['contact', 'focalPoint'],
            realm : realm.value,
            searchText: searchText,
            query : `((schema_s:focalPoint AND government_s:${$scope.document.government.identifier}) OR (schema_s:contact))`
            }
            return $scope.onBuildDocumentSelectorQuery(queryOptions);
        }

        //==================================
        //
        //==================================
        $scope.getCleanDocument = function(document) {

            document = document || $scope.document;

            if (!document)
                return undefined;

            if (/^\s*$/g.test(document.notes))
                document.notes = undefined;

            return $scope.sanitizeDocument(document);
        };

       
        $scope.onGovernmentChange = function(government){
            if(government && $scope.document){

                verifyCountryHasReport();
                commonjs.getCountry(government.identifier).then(function(country){
                    $scope.document['Q012_party'] = { value : country.isParty.toString() };
                    if(country.isParty){
                        $scope.document['Q012_progressForParty'] = undefined;
                        $scope.document['Q013'] = undefined;
                    }
                    var question = $scope.reportTabs[1].sections[0].questions[0];
                    question.hasValidation = true;
                    question.enable = false;
                    $scope.updateAnswer(question);
                    loadPreviousReport();
                })
            }
        }
        $scope.userHasGovernment = function(){
            return user.government;
        }
        

       function init(){
          

           $scope.setDocument({}).then(function(document){
               if(document && document.header.identifier){
                   _.forEach(document, function(element, key){
                       if(/^Q/.test(key) && _.isArray(element)){//only fields starting with Q
                           $scope.multiTermModel[key] = _.map(element, function(e){ return { identifier : e.value, customValue: e.additionalInformation }});
                       }
                   })
                   //transformNrData();//workaround as in the first call not all questions are built so the disable/visible clause does not work.

               }
               //render remaining tabs
               // var timeout = 2000;
               // _.each($scope.nr4Tabs, function(t){                 
               //     $timeout(function(){ t.render=true}, timeout );
               //     timeout += 1000;
               // })
           });
       }

    
       init(); //ToDo
   
    $scope.tabs = [{
        "tab":1,
        "title":"1 - 6",
        render:true
    },
    {
        "tab":2,
        "title":"Part-II",
        "sections" : [{key:"Part-II"}]
    },
    {
        "tab":3,
        "title":"Part-III",
        "sections" : [{key:"Part-III"}]
    },
    {
        "tab":4,
        "title":"Part-IV",
        "sections" : [{key:"Part-IV"}]
    },
    {
        "tab":5,
        "title":"Part-V",
        "sections" : [{key:"Part-V"}]
    },
    {
        "tab":6,
        "title":"Part-VI",
        "sections" : [{key:"Part-VI"}]
    },
    {
     "tab":7,
     "title":"Part-VII",
     "sections" : [{key:"Part-VII"}]
     },
     {
         "tab":8,
         "title":"Part-VIII",
         "sections" : [{key:"Part-VIII"}]
     },
     {
         "tab":9,
         "title":"Part-IX",
         "sections" : [{key:"Part-IX"}]
     },
     {
         "tab":10,
         "title":"Part-X",
         "sections" : [{key:"Part-X"}]
     },
     {
         "tab":11,
         "title":"Part-XI",
         "sections" : [{key:"Part-XI"}]
     },
     {
         "tab":12,
         "title":"Part-XII",
         "sections" : [{key:"Part-XII"}]
     }
];
 $scope.questions = [npNationalReport1, cpbNationalReport4];

}];