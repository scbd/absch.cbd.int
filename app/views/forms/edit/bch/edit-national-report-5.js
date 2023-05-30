import app from '~/app';
import _ from 'lodash';
import '~/views/directives/workflow-arrow-buttons';
import '~/components/scbd-angularjs-services/main';
import '~/views/forms/edit/editFormUtility';
import '~/views/forms/edit/edit';
import '~/services/main';
import '~/views/forms/edit/document-selector';
import '~/views/directives/block-region-directive';
// ToDo import view directive once developed
export { default as template } from './edit-national-report-5.html';
import 'ngDialog';
import '~/views/forms/edit/directives/edit-national-report.directive';
import { cpbNationalReport5 } from '~/app-data/bch/report-analyzer/cpbNationalReport5';
import { cpbNationalReport4 } from '~/app-data/bch/report-analyzer/cpbNationalReport4'; // mapping
import editNRT from '~/app-text/views/forms/edit/directives/edit-national-report.json';
import numbers from '~/app-text/numbers.json';
export default ["$scope", "$rootScope", "locale", "$q", "$controller", "$timeout",
    'commonjs', 'IStorage', '$routeParams', 'ngDialog', 'realm', 'translationService',
    function ($scope, $rootScope, locale, $q, $controller, $timeout, commonjs, storage, $routeParams, ngDialog, realm, translationService) {
 
        var user = $rootScope.user;
        $scope.activeTab = 1;
        $scope.multiTermModel = {};
        $scope.questionKeys = [];
        $scope.customValidations = {};

        translationService.set('editNRT', editNRT);
        translationService.set('numbers', numbers);

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
        $scope.questions = [cpbNationalReport5, cpbNationalReport4];
        // TODO: read from mapping file
        var previousAnswerMapping = $scope.previousAnswerMapping = {};

        $controller('editController', {
            $scope: $scope
        });

        $scope.onContactQuery = function (searchText) {
            var queryOptions = {
                schemas: ['contact', 'focalPoint'],
                realm: realm.value,
                searchText: searchText,
                query: `((schema_s:focalPoint AND government_s:${$scope.document.government.identifier}) OR (schema_s:contact))`
            }
            return $scope.onBuildDocumentSelectorQuery(queryOptions);
        }

        //==================================
        //
        //==================================
        $scope.getCleanDocument = function (document) {

            document = document || $scope.document;

            if (!document)
                return undefined;

            if (/^\s*$/g.test(document.notes))
                document.notes = undefined;

            return $scope.sanitizeDocument(document);
        };

        function is141Or142() {
            return ($scope.document['Q141'] || {}).value == 'true' || ($scope.document['Q142'] || {}).value == 'true';
        }

        function is79Or82Or81() {
            return ($scope.document['Q079'] || {}).value == 'true' || ($scope.document['Q081'] || {}).value == 'true' || ($scope.document['Q082'] || {}).value == 'true';
        }
        $scope.customValidations = {
            is79Or82Or81: is79Or82Or81,
            is141Or142: is141Or142
        }
        //ToDo update for NR5
        $scope.onGovernmentChange = function (government) {
            if (government && $scope.document) {

                verifyCountryHasReport();
                commonjs.getCountry(government.identifier).then(function (country) {
                    $scope.document['Q012_party'] = { value: country.isParty.toString() };
                    if (country.isParty) {
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
        $scope.userHasGovernment = function () {
            return user.government;
        }
         // ToDo directive for this
         function verifyCountryHasReport() {
            $q.all([
                storage.documents.query("(type eq '$scope.cpbCurrentReport')", "my", { $top: 10 }),
                storage.drafts.query("(type eq '$scope.cpbCurrentReport')", { $top: 10 })
            ])
                .then(function (nationalRecords) {
                    var filterByGovernment = function (item) {
                        return item && (item.metadata || {}).government == $scope.document.government.identifier
                    }
                    var published = _.find((nationalRecords[0].data || {}).Items, filterByGovernment);
                    var draft = _.find((nationalRecords[1].data || {}).Items, filterByGovernment);

                    if (((published || draft) && (!$routeParams.identifier || $routeParams.identifier != (draft || published).identifier))) {
                        $scope.blockEditForm = true;
                        ngDialog.open({
                            template: 'recordExistsTemplate.html',
                            closeByDocument: false,
                            closeByEscape: false,
                            showClose: false,
                            closeByNavigation: false,
                            controller: ['$scope', '$timeout', '$location', function ($scope, $timeout, $location) {
                                $scope.alertSeconds = 10;
                                time();

                                function time() {
                                    $timeout(function () {
                                        if ($scope.alertSeconds == 1) {
                                            $scope.openExisting();
                                        }
                                        else {
                                            $scope.alertSeconds--;
                                            time()
                                        }
                                    }, 1000)
                                }
                                $scope.openExisting = function () {
                                    ngDialog.close();
                                    $location.path('register/NR4/' + (draft || published).identifier + '/edit');
                                }
                            }]
                        });
                    }
                    else {

                    }
                });
        }

        function init() {

            cpbNationalReport5.forEach((e) => {
                e.questions.forEach((question) => {
                  const key = question.key;
                  $scope.questionKeys.push(key);
                });
              });
            $scope.setDocument({}).then(function (document) {
                if (document && document.header.identifier) {
                    _.forEach(document, function (element, key) {
                        if (/^Q/.test(key) && _.isArray(element)) {//only fields starting with Q
                            $scope.multiTermModel[key] = _.map(element, function (e) { return { identifier: e.value, customValue: e.additionalInformation } });
                        }
                    })
                }
            });
        }
       
        init();

    }];