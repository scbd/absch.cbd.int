import angular from 'angular-flex';
import app from '~/app';
import _ from 'lodash';
import 'ngDialog';
import '~/views/forms/directives/nr-yes-no';
import template from "text!./edit-national-report.directive.html";
import editNRT from '~/app-text/views/forms/edit/directives/edit-national-report.json';
import { analyzerMapping } from '~/app-data/report-analyzer-mapping';
import numbers from '~/app-text/numbers.json';

app.directive("editNationalReport", ["$controller", "$http", 'IStorage', '$routeParams', "$timeout", "$q", 'guid', 'ngDialog', 'realm', 'translationService',
    function ($controller, $http, storage, $routeParams, $timeout, $q, guid, ngDialog, realm, translationService) {

        return {
            restrict: "AE",
            template: template,
            replace: true,
            require: "?ngModel",
            scope: {
                binding: '=ngModel',
                reportTabs: "=",
                questions: "=",
                customValidations: "=",
                validationReport: "=",
                identifier: '=',
                locales: '='
            },
            link: function ($scope, $element, $attrs, ngModelController) {
                $scope.isBCH = realm.is('BCH');
                $scope.isABS = realm.is('ABS');
                $scope.multiTermModel = {};
                $scope.previousAnswerMapping = {};
                $scope.activeTab = 1;
                var appName = realm.value.replace(/-.*/, '').toLowerCase();
                var hasInitialized = false;

                translationService.set('editNRT', editNRT);
                translationService.set('numbers', numbers);


                //==================================
                //
                //==================================

                $scope.setTab = function (index, isScroll) {
                    if (isScroll) {
                        window.scrollTo(0, 0);
                    }
                    $("ul.page-tabs").find("li").removeClass("active");
                    $timeout(function () {
                        $('ul.page-tabs a[href="#tab' + index + '"]').tab('show');
                        $("ul.page-tabs").find('#tab' + index).parents('li').addClass("active");
                    }, 200);
                    $scope.activeTab = index + 1;
                    // $scope.reportTabs[index].render = true; // ToDo: remove 
                }

                $scope.updateAnswer = function (question, baseQuestionNumber) {
                    $scope.binding = $scope.binding || {};
                    if (question.multiple) {
                        if (!$scope.multiTermModel[question.key])
                            $scope.binding[question.key] = undefined;
                        else {
                            $scope.binding[question.key] = _.map($scope.multiTermModel[question.key], function (t) { return { value: t.identifier, additionalInformation: t.customValue } })
                        }
                    }
                    var lQuestion = question;
                    if (question.validations) {

                        var mappings = question.validations || [];

                        _.forEach(mappings, function (mapping) {
                            var dataSection = _.find($scope.currentReport, { key: mapping.key || question.section });
                            if (dataSection) {
                                var mapQuestion;
                                var validationPositive = false;
                                var baseQuestion;
                                if (baseQuestionNumber || mapping.baseQuestion) {
                                    baseQuestion = _.find(dataSection.questions, { key: baseQuestionNumber || mapping.baseQuestion });
                                    mapQuestion = _.find(baseQuestion.questions, { key: mapping.question });
                                }
                                else {
                                    mapQuestion = _.find(dataSection.questions, { key: mapping.question });
                                }

                                var answer = $scope.binding[lQuestion.key];

                                var answers = answer;
                                if (!question.multiple)
                                    answers = [answer];

                                answers = _.compact(answers);

                                if ((answers || []).length > 0) {
                                    if (/&[a-z]*/.test(mapping.type)) {
                                        validationPositive = $scope.customValidations[mapping.type.replace(/^&/, '')]($scope.binding);
                                    }
                                    else if (mapping.type === '@hasAdditionalValues') {

                                        validationPositive = _.some(answers, function (a) { return a && a.additionalInformation && mapping.values.indexOf(a.value) >= 0 });
                                    }
                                    else if (mapping.type === '@hasValues') {

                                        if (mapping.values) {
                                            validationPositive = _.some(answers, function (a) { return a && mapping.values.indexOf(a.value) >= 0 });
                                        }
                                        else
                                            validationPositive = !_.isEmpty(answer);
                                    }
                                    else if (mapping.type === '@hasValuesExcept') {
                                        validationPositive = !_.some(answers, function (a) { return a && mapping.values.indexOf(a.value) >= 0 });
                                    }
                                }

                                if (mapQuestion && !mapQuestion.hasValidation)
                                    mapQuestion.hasValidation = true;
                                if (validationPositive) {
                                    mapQuestion[mapping.trigger] = true;
                                    if (baseQuestion && mapping.trigger != 'visible')
                                        baseQuestion[mapping.trigger] = true;
                                }
                                else {
                                    $scope.binding[mapQuestion.key] = undefined;
                                    mapQuestion[mapping.trigger] = false
                                    if (baseQuestion && mapping.trigger != 'visible')
                                        baseQuestion[mapping.trigger] = false;
                                }

                                if (mapQuestion && mapQuestion.validations) {
                                    $scope.updateAnswer(mapQuestion, mapQuestion.baseQuestion);
                                }
                            }
                        })
                    }
                    ngModelController.$setViewValue(_.pickBy($scope.binding, _.identity), 'change'); //ToDo
                }
                $scope.onOptionSelected = function ($element, value, question){
                    if(question){
                        
                        const exclusiveOptions = question.options.filter(e=>e.exclusive);
                        if(Object.keys(exclusiveOptions).length>0) {
                            // 1. enable all options
                            $element.find(`input[type=checkbox]`).attr('disabled', false)
                            // 2. verify if exclusive option is selected
                            // 3. if exclusive selected disable all other
                            if(value?.length){
                                const valueIdentifiers = value?.map(e=>e.identifier);
                                const exclusiveIdentifiers = exclusiveOptions?.map(e=>e.value)
                                if(_.intersection(exclusiveIdentifiers, valueIdentifiers).length){
                                    //disable other options
                                    question.options.filter(e=>!e.exclusive).forEach(e=>{
                                        disableCheckbox(`chk_${e.value}`);
                                    })                                   
                                }
                                else{
                                    // 4. else if exclusive not selected, disable exclusive
                                    exclusiveIdentifiers.forEach(e=>{
                                        disableCheckbox(`chk_${e}`)
                                    })
                                }
                            }
                            
                        }

                        function disableCheckbox(id){
                            angular.forEach($element.find('input[type=checkbox]'), function(node){                                        
                                if(id == node.id)                                      
                                    node.disabled = true;
                            })
                        }
                    }
                }
                $scope.spaceSubQuestion = function (number) {
                    if ((number || '') == '') return '';
                    return number.replace(/([0-9]{1,3})([a-z])/, '$1 $2') + '. '

                }

                $scope.isQuestionDisabled = function (question) {
                    if (question.hasValidation) {

                        if (question.visible && !question.hasOwnProperty("enable"))
                            return false;

                        if (!question.enable)
                            return true;
                    }

                    return false;
                }

                $scope.hasError = function (name) {  //default behavior

                    var validationReport = $scope.validationReport
                    if (validationReport && validationReport.errors) {
                        return !!_.find(validationReport.errors, { property: name });
                    }

                    return false;
                };
                $scope.$on('$destroy', function () {
                    evtLoadPreviousReportEvent();
                });
                //==================================
                //
                //==================================
                const bindingWatch = $scope.$watch('binding', function (newVal, oldVal) {
                    const cleanNewVal = _.pickBy(newVal, _.identity);
                    const cleanOldVal = _.pickBy(oldVal, _.identity)
                    if ($scope.binding && !hasInitialized) {
                        init();
                        bindingWatch();
                        hasInitialized = hasInitialized || true;
                    }
                });

                var evtLoadPreviousReportEvent = $scope.$on('loadPreviousReportEvent', function (evt, data) {
                    const { government, previousAnswersMapping } = data;
                    loadPreviousReport({ government, previousAnswersMapping });
                })

                async function loadPreviousReport({ government, previousAnswersMapping }) {

                    $scope.previousAnswerMapping = previousAnswersMapping.mapping;
                    const previousReport = $scope.questions[1];
                    $scope.reportApiDetails = _.find(analyzerMapping[appName], { type: previousAnswersMapping.schema });
                    var params = { q: { 'government.identifier': government } };
                    $http.get($scope.reportApiDetails.dataUrl, { params: params })
                        .then(function (result) {
                            var prevReportAnswers = result.data[0];
                            var prevReportQuestions = _(previousReport).map('questions').compact().flatten().value();

                            _.forEach(previousAnswersMapping.mapping, function (mapping, key) {

                                var prevQuestion = _.find(prevReportQuestions, { key: mapping.prevQuestion })
                                if (prevQuestion) {
                                    mapping.previousQuestion = { title: prevQuestion.title };
                                    if (prevReportAnswers) {
                                        var prevAnswer = prevReportAnswers[mapping.prevQuestion];
                                        if (_.isArray(prevAnswer)) {
                                            mapping.previousQuestion.type = 'array';
                                            mapping.previousQuestion.answer = _.map(prevAnswer, function (answer) {
                                                return (_.find(prevQuestion.options, { value: answer.value || answer }) || {}).title
                                            })
                                        }
                                        else if (_.isObject(prevAnswer)) {
                                            if (prevAnswer.en || prevAnswer.fr || prevAnswer.es || prevAnswer.ar || prevAnswer.ru || prevAnswer.zh) {
                                                mapping.previousQuestion.answer = prevAnswer;
                                                mapping.previousQuestion.type = 'lstring';
                                            }
                                            else {
                                                mapping.previousQuestion.answer = (_.find(prevQuestion.options, { value: prevAnswer.value || prevAnswer }) || {}).title;
                                                mapping.previousQuestion.type = 'string';
                                            }
                                        }
                                        else {
                                            mapping.previousQuestion.answer = (_.find(prevQuestion.options, { value: prevAnswer }) || {}).title;
                                            mapping.previousQuestion.type = 'string'
                                        }
                                    }
                                }
                                else
                                    console.log(mapping)
                            })

                            return prevReportAnswers;
                        })
                }

                function getMultiTermModel() {
                    _.forEach($scope.binding, function (element, key) {

                        if (/^Q/.test(key)) {//only fields starting with Q
                            if (_.isArray(element))
                                $scope.multiTermModel[key] = _.map(element, function (e) { return { identifier: e.value, customValue: e.additionalInformation } });
                        }
                    })
                }

                async function transformNrData() {
                    $scope.currentReport = $scope.questions[0];

                    _.forEach($scope.reportTabs, function (tab) {

                        _.forEach(tab.sections, function (section) {

                            var dataSection = _.find($scope.currentReport, { key: section.key });

                            _.extend(section, dataSection || {})

                            _.forEach(section.questions, function (question) {

                                if (question.type != 'sub-section') {
                                    $timeout(function () {
                                        transformQuestion(question);
                                    },1);
                                }
                                else {
                                    question.visible = true;
                                    _.forEach(question.questions, function (subQuestion) {
                                        $timeout(function () {
                                            transformQuestion(subQuestion);//, question.key1
                                        },1);

                                    })
                                }

                            });
                        })

                    })
                }

                function transformQuestion(question, baseQuestion) {
                    if (question.multiple) {
                        question.optionsMapping = _.map(question.options, function (option) {
                            return {
                                identifier: option.value,
                                title: option.title, type: option.type
                            }
                        });
                    }
                    if (question.visible === undefined)
                        question.visible = true;
                    if (question.validations)
                        $scope.updateAnswer(question, baseQuestion);
                }

                function init() {
                    transformNrData();
                    getMultiTermModel();
                }
            }
        }
    }]);