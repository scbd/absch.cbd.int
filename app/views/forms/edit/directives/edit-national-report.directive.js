import app from '~/app';
import template from "text!./edit-national-report.directive.html";
import _ from 'lodash';
// import '~/views/directives/workflow-arrow-buttons';
import '~/components/scbd-angularjs-services/main';
import '~/views/forms/edit/editFormUtility';
import '~/views/forms/edit/edit';
import '~/services/main';
import '~/views/forms/directives/nr-yes-no';
import '~/views/forms/edit/document-selector';
import '~/views/directives/block-region-directive';
import '~/components/scbd-angularjs-services/main';
import 'ngDialog';

import editNRT from '~/app-text/views/forms/edit/bch/edit-national-report-5.json'; // ToDo move the common folder
import numbers from '~/app-text/numbers.json';
app.directive("editNationalReport", ["$controller", "$rootScope", "$interpolate", "$http", "commonjs", "IStorage", "$timeout", "$routeParams", "Thesaurus", "$q", 'guid', 'editFormUtility', 'locale', 'thesaurusService', 'ngDialog', 'realm', 'solr', 'translationService',
    function ($controller, $rootScope, $interpolate, $http, commonjs, storage, $timeout, $routeParams, thesaurus, $q, guid, editFormUtility, locale, thesaurusService, ngDialog, realm, solr, translationService) {

	return {
		restrict   : "AE",
		template: template ,
		replace    : true,
		transclude : true,
		scope      : {
            reportTabs         : "=",
            questions : "=",
            getDocumentFn : '&document',
			form               : "=form",
            onPostSubmitFn     : "&onPostSubmit"
		},
		link : function($scope, $element, $attr){
        $scope.isBCH        = realm.is('BCH');
        $scope.isABS        = realm.is('ABS');
         $scope.multiTermModel = {};
         translationService.set('editNRT', editNRT);
         translationService.set('numbers', numbers);
         $scope.tab = 'intro';
         //var user = $rootScope.user;
         $scope.activeTab = 1     
        
         $scope.customValidations = {} // ToDo get from directive if required
         // TODO: read from mapping file
         var previousAnswerMapping = $scope.previousAnswerMapping = {};
         $controller('editController', {
             $scope: $scope
         });

         //==================================
         //
         //==================================
      
         
         $scope.setTab = function(index, isScroll){
             if(isScroll){
                 window.scrollTo(0, 0);
             }
             $("ul.page-tabs").find("li").removeClass("active");
             $timeout(function(){
                 $('ul.page-tabs a[href="#tab' + index + '"]').tab('show');              
                 $("ul.page-tabs").find('#tab' + index).parents('li').addClass("active");
             }, 200);
             $scope.activeTab = index + 1;
             $scope.reportTabs[index].render=true;
         }
 
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
 
         
        

        $scope.isQuestionDisabled = function(question){
            if(question.hasValidation){

                if(question.visible && !question.hasOwnProperty("enable"))
                    return false;

                if(!question.enable )
                    return true;
            }
            
            return false;
        }

        $scope.hasError = function(name) {  //default behavior

            var validationReport = $scope.validationReport
            if(validationReport && validationReport.errors) {
                return !!_.find(validationReport.errors, { property : name });
            }

            return false;
        };
        
        
        async function transformNrData(){
                $scope.cpbCurrentReport = $scope.questions[0];

            _.forEach($scope.reportTabs, function(tab){
                
                _.forEach(tab.sections, function(section){

                    var dataSection = _.find($scope.cpbCurrentReport, {key:section.key});
                    console.log("dataSection: "+dataSection);
                    
                    _.extend(section, dataSection||{})

                    _.forEach(section.questions, function(question){
                       
                        if(question.type!='sub-section')
                            transformQuestion(question)
                        else{
                            question.visible    =   true;
                            _.forEach(question.questions, function(subQuestion){
                                transformQuestion(subQuestion);//, question.key1
                            })
                        }
                        
                    });
                })

            })
        }

        function transformQuestion(question, baseQuestion){
            if(question.multiple){
                question.optionsMapping =  _.map(question.options, function(option){
                    return { identifier: option.value, 
                        title: option.title, type:option.type }
                });
            }
            if(question.visible===undefined)
                question.visible    =   true;
            if(question.validations)
                $scope.updateAnswer(question, baseQuestion);
        }


        function init(){
           // mappingReport();

            $timeout(function(){
                transformNrData();            
            }, 200);
            //Todo use  $scope.getDocumentFn();
            $scope.setDocument({}).then(function(document){
                if(document && document.header.identifier){
                    _.forEach(document, function(element, key){
                        if(/^Q/.test(key) && _.isArray(element)){//only fields starting with Q
                            $scope.multiTermModel[key] = _.map(element, function(e){ return { identifier : e.value, customValue: e.additionalInformation }});
                        }
                    })
                    transformNrData();

                }
            });
        }

        
        init(); //ToDo
    }
  }
}]);



