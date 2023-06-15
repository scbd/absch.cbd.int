import app from '~/app';
import _ from 'lodash';
import '~/views/directives/workflow-arrow-buttons';
import '~/components/scbd-angularjs-services/main';
import '~/views/forms/edit/editFormUtility';
import '~/views/forms/edit/edit';
import '~/services/main';
import '~/views/forms/edit/document-selector';
import '~/views/directives/block-region-directive';
import '~/views/forms/view/abs/view-national-report-1.directive';
import verifySingleRecord from '~/components/common/verify-single-record.vue';
export { default as template } from './edit-national-report-1.html';
import 'ngDialog';
import '~/views/forms/edit/directives/edit-national-report.directive';
import { npInterimNationalReport1 } from '~/app-data/abs/report-analyzer/npInterimNationalReport1';
import { absNationalReport1 } from '~/app-data/abs/report-analyzer/absNationalReport1';
import prevQuestionsMapping from '~/app-data/abs/report-analyzer/mapping/npNationalReoprtInterim-1.json';
import editNRT from '~/app-text/views/forms/edit/directives/edit-national-report.json';
import numbers from '~/app-text/numbers.json';
export default ["$scope", "$rootScope", "locale", "$q", "$controller", "$timeout",
    'commonjs', 'IStorage', '$routeParams', 'ngDialog', 'realm', 'translationService',
    function ($scope, $rootScope, locale, $q, $controller, $timeout, commonjs, storage, $routeParams, ngDialog, realm, translationService) {

        $scope.customValidations = {};
        $scope.previousAnswersMapping = {};
        $scope.questions = [absNationalReport1, npInterimNationalReport1];

        $scope.tabs = [
        {
            "tab": 1,
            "title": "Part-I",
            "ngIncludeId": "contact",
            render: true
        },
        {
            "tab": 2,
            "title": "Part-II",
            "sections": [{ key: "Part-II" }]
        },
        {
            "tab": 3,
            "title": "Part-III",
            "sections": [{ key: "Part-III" }]
        },
        {
            "tab": 4,
            "title": "Part-IV",
            "sections": [{ key: "Part-IV" }]
        },
        {
            "tab": 5,
            "title": "Part-V",
            "sections": [{ key: "Part-V" }]
        },
        {
            "tab": 6,
            "title": "Part-VI",
            "sections": [{ key: "Part-VI" }]
        },
        {
            "tab": 7,
            "title": "Part-VII",
            "sections": [{ key: "Part-VII" }]
        },
        {
            "tab": 8,
            "title": "Part-VIII",
            "sections": [{ key: "Part-VIII" }]
        },
        {
            "tab": 9,
            "title": "Part-IX",
            "sections": [{ key: "Part-IX" }]
        },
        {
            "tab": 10,
            "title": "Part-X",
            "sections": [{ key: "Part-X" }]
        },
        {
            "tab": 11,
            "title": "Part-XI",
            "sections": [{ key: "Part-XI" }]
        },
        {
            "tab": 12,
            "title": "Part-XII",
            "sections": [{ key: "Part-XII" }]
        },
        {
            "tab": 13,
            "title": "Part-XIII",
            "sections": [{ key: "Part-XIII" }]
        },
        {
            "tab": 14,
            "title": "Part-XIV",
            "sections": [{ key: "Part-XIV" }]
        },
        {
            "tab": 15,
            "title": "Part-XV",
            "sections": [{ key: "Part-XV" }]
        },
        {
            "tab": 16,
            "title": "Part-XVI",
            "sections": [{ key: "Part-XVI" }]
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

        $scope.onGovernmentChange = function (government) {
            if (government && $scope.document) {
                // ToDo: Once Mapping is completed
                // $scope.$broadcast('loadPreviousReportEvent', {
                //     government: government.identifier,
                //     previousAnswersMapping: {
                //         schema: 'absNationalReport',
                //         mapping: $scope.previousAnswersMapping
                //     }
                // });
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

                    _.forEach(document, function (element, key) {
                        if (/^Q/.test(key)) {//only fields starting with Q
                            $scope.questionAnswers[key] = element;
                        }
                    })
                    $scope.documentReady = true;
                }
            });
        }

        init();

    }];