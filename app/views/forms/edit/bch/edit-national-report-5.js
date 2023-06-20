import app from '~/app';
import _ from 'lodash';
import '~/views/directives/workflow-arrow-buttons';
import '~/components/scbd-angularjs-services/main';
import '~/views/forms/edit/editFormUtility';
import '~/views/forms/edit/edit';
import '~/services/main';
import '~/views/forms/edit/document-selector';
import '~/views/directives/block-region-directive';
import '~/views/forms/view/bch/view-national-report-5.directive';
import verifySingleRecord from '~/components/common/verify-single-record.vue';
export { default as template } from './edit-national-report-5.html';
import 'ngDialog';
import '~/views/forms/edit/directives/edit-national-report.directive';
import prevQuestionsMapping from '~/app-data/bch/report-analyzer/mapping/cpbNationalReport5-4.json';
import { cpbNationalReport5 } from '~/app-data/bch/report-analyzer/cpbNationalReport5';
import { cpbNationalReport4 } from '~/app-data/bch/report-analyzer/cpbNationalReport4';
import editNRT from '~/app-text/views/forms/edit/directives/edit-national-report.json';
import numbers from '~/app-text/numbers.json';
export default ["$scope", "$rootScope", "locale", "$q", "$controller", "$timeout",
    'commonjs', 'IStorage', '$routeParams', 'ngDialog', 'realm', 'translationService',
    function ($scope, $rootScope, locale, $q, $controller, $timeout, commonjs, storage, $routeParams, ngDialog, realm, translationService) {

        $scope.customValidations = {};
        $scope.previousAnswersMapping = {};
        $scope.questions = [cpbNationalReport5, cpbNationalReport4];
        
        $scope.tabs = [
            {
                "tab": 1,
                "title": "1 - 6",
                "ngIncludeId": "contact",
                render: true
            },
            {
                "tab": 2,
                "title": "7 - 15",
                "sections": [{ key: "General" }, { key: "Article2" }, { key: "Article5" }]
            },
            {
                "tab": 3,
                "title": "16 - 30",
                "sections": [{ key: "Article6" }, { key: "Articles7-10" }]
            },
            {
                "tab": 4,
                "title": "31 - 44",
                "sections": [{ key: "Article11" }, { key: "Article12" }]
            },
            {
                "tab": 5,
                "title": "45 - 52",
                "sections": [{ key: "Article13" }, { key: "Article14" }]
            },
            {
                "tab": 6,
                "title": "53 - 78",
                "sections": [{ key: "Articles15-16" }, { key: "Article17" }]
            },

            {
                "tab": 7,
                "title": "79 - 101",
                "sections": [{ key: "Article18" }, { key: "Article19" }]
            },
            {
                "tab": 8,
                "title": "102 - 126",
                "sections": [{ key: "Article20" }, { key: "Article21" }, { key: "Article22" }]
            },
            {
                "tab": 9,
                "title": "127 - 148",
                "sections": [{ key: "Article23" }, { key: "Article24" }, { key: "Article25" }]
            },
            {
                "tab": 10,
                "title": "149 - 158",
                "sections": [{ key: "Article26" }, { key: "Article28" }, { key: "Article33" }, { key: "Cooperation" }]
            },
            {
                "tab": 11,
                "title": "159 - 174",
                "sections": [{ key: "Nagoya" }]
            },
            {
                "tab": 12,
                "title": "175 - 176",
                "sections": [{ key: "OtherInformation" }, { key: "Comments" }]
            }
        ];
        
        $scope.exportVueComponent = {
            components: { verifySingleRecord }
        }

        var user = $rootScope.user;

        translationService.set('editNRT', editNRT);
        translationService.set('numbers', numbers);

        $controller('editController', {
            $scope: $scope
        });
        $scope.governmentList = $scope.options.countries;
        //==================================
        //
        //==================================
        $scope.onContactQuery = function (searchText) {
            var queryOptions = {
                schemas: ['contact', 'focalPoint'],
                realm: realm.value,
                searchText: searchText,
                query: `((schema_s:focalPoint AND government_s:${$scope.document.government.identifier}) OR (schema_s:contact))`
            }
            return $scope.onBuildDocumentSelectorQuery(queryOptions);
        }

        function loadPreviousReport(government){
           $timeout(function(){
                $scope.$broadcast('loadPreviousReportEvent', {
                    government: government,
                    previousAnswersMapping: {
                        schema: 'cpbNationalReport4',
                        mapping: $scope.previousAnswersMapping
                    }
                });
            },200);            
        }

        $scope.onGovernmentChange = function (government) {
            if (government && $scope.document) {
                commonjs.getCountry(government.identifier).then(function(country){
                    $scope.document['Q005'] = { value : country.isParty.toString() };
                })
                loadPreviousReport(government.identifier);
            }
        }
        
        $scope.userHasGovernment = function () {
            return user.government;
        }

        $scope.getCleanDocument = function (document) {

            document = document || $scope.document;

            if (!document)
                return undefined;

            if (/^\s*$/g.test(document.notes))
                document.notes = undefined;

            return $scope.sanitizeDocument(document);
        };

        $scope.onQuestionAnswerChange = function (questionAnswers) {
            safeApply(() => {
                $scope.document = { ...($scope.document), ...(questionAnswers || {}) };
            })
        }
        //==================================
        //
        //==================================
        
        function is141Or142(questionAnswers) {
            return (questionAnswers['Q141'] || {}).value == 'true' || (questionAnswers['Q142'] || {}).value == 'true';
        }

        function is79Or80Or81(questionAnswers) {
            return (questionAnswers['Q079'] || {}).value == 'true' || (questionAnswers['Q080'] || {}).value == 'true' || (questionAnswers['Q081'] || {}).value == 'true';
        }

        function is162_aOr162_b(questionAnswers) {
            return (questionAnswers['Q162_a'] || {}).value == 'true' || (questionAnswers['Q162_b'] || {}).value == 'true';
        }

        $scope.customValidations = {
            is79Or80Or81: is79Or80Or81,
            is141Or142: is141Or142,
            is162_aOr162_b: is162_aOr162_b
        }

        function safeApply(fn) {
            ($scope.$$phase || $scope.$root.$$phase) ? fn() : $scope.$apply(fn);
        }

        function init() {

            _.forEach(prevQuestionsMapping, function (value, key) {
                $scope.previousAnswersMapping[key] = { prevQuestion: value, showMessage: false };
            });
            
            $scope.documentReady = false
            $scope.setDocument({}).then(function (document) {
                $scope.questionAnswers = {};
                if (document && document.header.identifier) {
                    if($routeParams?.identifier && $scope.document.government?.identifier){
                        loadPreviousReport($scope.document.government.identifier);
                    }
                    _.forEach(document, function (element, key) {
                        if (/^Q/.test(key)) {//only fields starting with Q
                            $scope.questionAnswers[key] = element;
                            //ToDo: remove after testing
                            // if (_.isArray(element))
                            //     $scope.multiTermModel[key] = _.map(element, function (e) { return { identifier: e.value, customValue: e.additionalInformation } });
                        }
                    })
                    $scope.documentReady = true;
                }
            });
        }

        init();

    }];