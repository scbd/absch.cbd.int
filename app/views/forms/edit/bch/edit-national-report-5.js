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

        $scope.updateAnswer = function(question, baseQuestionNumber){

            if(question.multiple){
                if(!$scope.multiTermModel[question.key])
                    $scope.document[question.key] = undefined;
                else{
                    $scope.document[question.key] = _.map($scope.multiTermModel[question.key], function(t){return { value : t.identifier, additionalInformation: t.customValue}})
                }
            }
            var lQuestion = question;
            if(question.validations){

                var mappings = question.validations||[];
                    
                _.forEach(mappings, function(mapping){
                    var dataSection = _.find($scope.cpbCurrentReport, {key:mapping.key||question.section});
                    if(dataSection){
                        var mapQuestion; 
                        var validationPositive = false;
                        var baseQuestion;
                        if(baseQuestionNumber || mapping.baseQuestion){
                            baseQuestion          = _.find(dataSection.questions, {key:baseQuestionNumber||mapping.baseQuestion});
                            mapQuestion           = _.find(baseQuestion.questions, {key:mapping.question});
                        }
                        else{
                            mapQuestion          = _.find(dataSection.questions, {key:mapping.question});
                        }

                        var answer      = $scope.document[lQuestion.key];

                        var answers = answer;
                        if(!question.multiple)
                            answers = [answer];

                        answers = _.compact(answers);

                        if((answers||[]).length>0){
                            if(/&[a-z]*/.test(mapping.type)){
                                validationPositive   =$scope.customValidations[mapping.type.replace(/^&/, '')]();
                            }
                            else if(mapping.type === '@hasAdditionalValues'){   

                                validationPositive = _.some(answers, function(a){ return a && a.additionalInformation && mapping.values.indexOf(a.value)>=0});
                            }
                            else if(mapping.type === '@hasValues'){

                                if(mapping.values){
                                    validationPositive   = _.some(answers, function(a){ return a && mapping.values.indexOf(a.value)>=0});
                                }
                                else
                                    validationPositive   = !_.isEmpty(answer);                            
                            }
                            else if(mapping.type === '@hasValuesExcept'){
                                validationPositive   = !_.some(answers, function(a){ return a && mapping.values.indexOf(a.value)>=0});
                            }
                            // else{
                            //     console.log(mapping)
                            // }
                        }
                        // else{
                        //     console.log(mapping)
                        // }

                        if(!mapQuestion)
                        mapQuestion.hasValidation = true;
                        if(validationPositive){
                            mapQuestion[mapping.trigger] = true;                            
                            if(baseQuestion && mapping.trigger!='visible')
                                baseQuestion[mapping.trigger] = true;
                        }
                        else{
                            $scope.document[mapQuestion.key] = undefined;
                            mapQuestion[mapping.trigger] = false
                            if(baseQuestion && mapping.trigger!='visible')
                                baseQuestion[mapping.trigger] = false;
                        }   

                        if(mapQuestion && mapQuestion.validations){
                            $scope.updateAnswer(mapQuestion, mapQuestion.baseQuestion);
                        }
                    }
                })
            }
        }

        $scope.spaceSubQuestion = function(number){
            if((number||'')=='')return '';            
           return number.replace(/([0-9]{1,3})([a-z])/, '$1 $2') + '. '
            
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