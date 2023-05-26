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
export { default as template } from './edit-national-report-5.html';
import 'ngDialog';
import '~/views/forms/edit/directives/edit-national-report.directive';
import {cpbNationalReport5} from '~/app-data/bch/report-analyzer/cpbNationalReport5';
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

        $scope.customValidations = {
            is79Or82Or81   : is79Or82Or81,
            is141Or142 : is141Or142
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

        function is141Or142(){
            return ($scope.document['Q141']||{}).value == 'true' || ($scope.document['Q142']||{}).value == 'true';
        }

        function is79Or82Or81(){
            return ($scope.document['Q079']||{}).value == 'true' || ($scope.document['Q081']||{}).value == 'true' || ($scope.document['Q082']||{}).value == 'true';
        }

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

       function verifyCountryHasReport(){
        $q.all([
            storage.documents.query("(type eq '$scope.cpbCurrentReport')", "my", {$top:10}),
            storage.drafts.query("(type eq '$scope.cpbCurrentReport')", {$top:10})
        ])
        .then(function(nationalRecords) {
            var filterByGovernment = function(item){
                return item && (item.metadata||{}).government == $scope.document.government.identifier
            }              
            var published   = _.find((nationalRecords[0].data||{}).Items,  filterByGovernment);
            var draft       = _.find((nationalRecords[1].data||{}).Items,  filterByGovernment);

            if (((published || draft) && (!$routeParams.identifier || $routeParams.identifier != (draft||published).identifier))) {
                $scope.blockEditForm = true;
                ngDialog.open({
                    template: 'recordExistsTemplate.html',													
                    closeByDocument: false,
                    closeByEscape: false,
                    showClose: false,
                    closeByNavigation: false,
                    controller: ['$scope', '$timeout', '$location', function($scope, $timeout, $location) {
                        $scope.alertSeconds = 10;
                        time();

                        function time(){
                            $timeout(function(){
                                if($scope.alertSeconds == 1){																	
                                    $scope.openExisting();
                                }
                                else{
                                    $scope.alertSeconds--;																
                                    time()
                                }
                            }, 1000)
                        }
                        $scope.openExisting = function() {
                            ngDialog.close();
                            $location.path('register/NR4/' + (draft||published).identifier+'/edit');
                        }
                    }]
                });
            }
            else{

            }
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
          "title":"7 - 13",
          "sections" : [{key:"General"}, {key:"Article2"}]
      },
      {
          "tab":3,
          "title":"14 - 19",
          "sections" : [{key:"Article5"}, {key:"Article6"}]
      },
      {
           "tab":4,
           "title":"20 - 30",
           "sections" : [{key:"Articles7-10"}]
      },
      {
           "tab":5,
           "title":"31 - 36",
           "sections" : [{key:"Article11"}]
      },
      {
           "tab":5,
           "title":"37 - 44",
           "sections" : [{key:"Article12"}]
      },
      {
           "tab":6,
           "title":"45 - 52",
           "sections" : [{key:"Article13"},{key:"Article14"}]
      },
      {
           "tab":7,
           "title":"53 - 72",
           "sections" : [{key:"Articles15-16"}]
      },
      {
           "tab":8,
           "title":"73 - 78",
           "sections" : [{key:"Article17"}]
      },
      {
           "tab":9,
           "title":"79 - 97",
           "sections" : [{key:"Article18"}]
      },
      {
           "tab":10,
           "title":"98 - 101",
           "sections" : [{key:"Article19"}]
      },
      {
           "tab":11,
           "title":"102 - 108",
           "sections" : [{key:"Article20"}]
      },
      {
           "tab":12,
           "title":"109 - 111",
           "sections" : [{key:"Article21"}]
      },
      {
           "tab":13,
           "title":"112 - 126",
           "sections" : [{key:"Article22"}]
      },
      {
           "tab":14,
           "title":"127 - 139",
           "sections" : [{key:"Article23"}]
      },
      {
           "tab":15,
           "title":"140 - 144",
           "sections" : [{key:"Article24"}]
      },
      {
           "tab":16,
           "title":"145 - 148",
           "sections" : [{key:"Article25"}]
      },
      {
           "tab":17,
           "title":"149 - 153",
           "sections" : [{key:"Article26"}, {key:"Article28"}]
      },
      {
           "tab":18,
           "title":"154 - 158",
           "sections" : [{key:"Article33"}, {key:"Cooperation"}]
      },
      {
           "tab":19,
           "title":"159 - 176",
           "sections" : [{key:"Nagoya"}, {key:"OtherInformation"}, {key:"Comments"}]
      }
  ];
         $scope.questions = [cpbNationalReport5, cpbNationalReport4];

}];