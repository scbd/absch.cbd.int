import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import 'views/forms/edit/document-selector';
import 'views/forms/view/abs/view-abs-national-report.directive';
import 'services/main';

  export { default as template } from './edit-absNationalReport.html';

  export default ["$scope", "$http", "$filter", "$controller", "$location", "$q", "realm", "searchService","appConfigService", 'solr',
  function ($scope, $http, $filter, $controller,$location, $q, realm, searchService, appConfigService, solr) {

    $controller('editController', {$scope: $scope});
    $scope.showHelp = { hasHelp : true };

    $scope.setTab = function () {
        $scope.tab = 'edit';
    };

    $scope.$watch('tab', function(newValue){

        if(newValue != 'edit'){
            $("#nrTabs > li").removeClass("active");
        }
        if(newValue =='edit')
            $('#nrTabs a:first').tab('show');

    });


    $scope.onRecordQuery = function(searchText){
        
      var queryOptions = {
        schemas	  : ['absPermit', 'absCheckpoint', 'absCheckpointCommunique', 'authority', 'measure', 'database', 'focalPoint'],
        realm     : realm.value,
        searchText: searchText
      }
      if ($scope.document && $scope.document.government)
            queryOptions.government = $scope.document.government.identifier;

      return $scope.onBuildDocumentSelectorQuery(queryOptions);
    }
    $scope.oncontactQuery = function(searchText){
        
      var queryOptions = {
        schemas	  : ['contact', 'authority', 'focalPoint'],
        realm     : realm.value,
        searchText: searchText
      }
      if ($scope.document && $scope.document.government)
             queryOptions.government = $scope.document.government.identifier;

      return $scope.onBuildDocumentSelectorQuery(queryOptions);
    }
    //==================================
    //
    //==================================
    $scope.path=$location.path();

    $scope.getCleanDocument = function(document) {

        document = document || $scope.document;

        if (!document)
            return {};
        document = angular.fromJson(angular.toJson(document));


        if (/^\s*$/g.test(document.notes))
            document.notes = undefined;

        if(_.isEmpty(document.question4))  document.question4 = undefined;
        if(_.isEmpty(document.question5))  document.question5 = undefined;
        if(_.isEmpty(document.question6))  document.question6 = undefined;
        if(_.isEmpty(document.question7))  document.question7 = undefined;

        if(document.question16){
            if(!_.isNumber(document.question16.permitsOnAbsCh))
                document.question16.cpcsOnAbsChCount = undefined;
        }

        if(document.question27){
            if(!_.isNumber(document.question27.cpcsOnAbsChCount))
                document.question27.cpcsOnAbsChCount = undefined;
        }

        if(document.government){
            if(!document.title)
                document.title = {en: $filter("term")(document.government) + " Interim national report on the implementation of the Nagoya Protocol"};
            updateRecords(document.government);
        }

        return $scope.sanitizeDocument(document);
    };

    $scope.setDocument({});

    //==================================
    //
    //==================================
    $scope.isQ3Yes = function (answer) {
        if(answer === true || answer === undefined)
            return true;
        return false;
    }
   
    //==================================
    //
    //==================================
    $scope.Q7YesNoClear = function () {
        if($scope.document && $scope.document.question7 && $scope.document.question7.notApplicable){
            $scope.document.question7.answer = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q8YesNoClear = function () {
        if($scope.document && $scope.document.question8 && $scope.document.question8.notApplicable){
            $scope.document.question8.answer = undefined;
        }
    };


    //==================================
    //
    //==================================
    $scope.isQ11Yes = function (answer) {
        if(answer === true || answer === undefined){

            if($scope.document && $scope.document.question11)
                $scope.document.question11.challenges = undefined;

            return true;
        }

        return false;
    };

    //==================================
    //
    //==================================
    $scope.Q11Clear = function () {
        if($scope.document && $scope.document.question11 && !$scope.document.question11.answer){
            if($scope.document && $scope.document.question12)
                $scope.document.question12 = undefined;
            if($scope.document && $scope.document.question13)
                $scope.document.question13 = undefined;
            if($scope.document && $scope.document.question14)
                $scope.document.question14 = undefined;
            if($scope.document && $scope.document.question15)
                $scope.document.question15 = undefined;
            if($scope.document && $scope.document.question16)
                $scope.document.question16 = undefined;
            if($scope.document && $scope.document.question17)
                $scope.document.question17 = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q18Clear = function () {
        if($scope.document && $scope.document.question18 && $scope.document.question18.geneticResources && !$scope.document.question18.geneticResources.answer){
            if($scope.document.question18.geneticResources.monetary){
                $scope.document.question18.geneticResources.monetary     = undefined;
                $scope.document.question18.geneticResources.monetaryInfo = undefined;
            }

            if($scope.document.question18.geneticResources.nonMonetary){
                $scope.document.question18.geneticResources.nonMonetary     = undefined;
                $scope.document.question18.geneticResources.nonMonetaryInfo = undefined;
            }
        }

        if($scope.document && $scope.document.question18 && $scope.document.question18.tk && !$scope.document.question18.tk.answer){
            if($scope.document.question18.tk.monetary){
                $scope.document.question18.tk.monetary     = undefined;
                $scope.document.question18.tk.monetaryInfo = undefined;
            }

            if($scope.document.question18.tk.nonMonetary){
                $scope.document.question18.tk.nonMonetary     = undefined;
                $scope.document.question18.tk.nonMonetaryInfo = undefined;
            }
        }
    };

    //==================================
    //
    //==================================
    $scope.Q18ClearInfo = function () {
        if($scope.document && $scope.document.question18 && $scope.document.question18.geneticResources){
            if(!$scope.document.question18.geneticResources.monetary){
                $scope.document.question18.geneticResources.monetaryInfo = undefined;
            }
            if(!$scope.document.question18.geneticResources.nonMonetary){
                $scope.document.question18.geneticResources.nonMonetaryInfo = undefined;
            }
        }

        if($scope.document && $scope.document.question18 && $scope.document.question18.tk){
            if(!$scope.document.question18.tk.monetary){
                $scope.document.question18.tk.monetaryInfo = undefined;
            }
            if(!$scope.document.question18.tk.nonMonetary){
                $scope.document.question18.tk.nonMonetaryInfo = undefined;
            }
        }
    };

    //==================================
    //
    //==================================
    $scope.Q18GeneticResources = function (answer) {
        if(answer && $scope.document && $scope.document.question18 && $scope.document.question18.geneticResources){
            $scope.document.question18.geneticResources.answer = true;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q18TraditionalKnowledge = function (answer) {
        if(answer && $scope.document && $scope.document.question18 && $scope.document.question18.tk){
            $scope.document.question18.tk.answer = true;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q24Clear = function (answer) {
        if(!answer && $scope.document && $scope.document.question24){
            $scope.document.question24.measures  = undefined;
            $scope.document.question24.violation = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q24MeasuresClear = function (answer) {
        if(!answer && $scope.document && $scope.document.question24 && $scope.document.question24.measures){
            $scope.document.question24.measures.furtherInfo    = undefined;
            $scope.document.question24.measures.complianceInfo = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q24ViolationClear = function (answer) {
        if(!answer && $scope.document && $scope.document.question24 && $scope.document.question24.violation){
            $scope.document.question24.violation.furtherInfo    = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q25Clear = function (answer) {
        if(!answer && $scope.document && $scope.document.question25){
            $scope.document.question25.hasMeasures  = undefined;
            $scope.document.question25.violation = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q26Clear = function (answer) {
        if(!answer && $scope.document && $scope.document.question26){
            $scope.document.question26.additionalInfo = undefined;
            $scope.document.question26.violation      = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q26ViolationClear = function (answer) {
        if(!answer && $scope.document && $scope.document.question26 && $scope.document.question26.violation){
            $scope.document.question26.violation.additionalInfo = undefined;
        }
    };


    //==================================
    //
    //==================================
    $scope.Q27Clear = function (answer) {
        if(!answer && $scope.document && $scope.document.question27){
            $scope.document.question27.cpc = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q29Clear = function (answer) {
        if(!answer && $scope.document && $scope.document.question29){
            $scope.document.question29.additionalInfo = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q31YesNoClear = function () {
        if($scope.document && $scope.document.question31 && $scope.document.question31.notApplicable){
            $scope.document.question31.answer = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q37Clear = function () {
        if($scope.document && $scope.document.question37 && !$scope.document.question37.answer){
            $scope.document.question38 = undefined;
            $scope.document.question39 = undefined;
            $scope.document.question40 = undefined;
            $scope.document.question41 = undefined;
            $scope.document.question42 = undefined;
            $scope.document.question43 = undefined;
            $scope.document.question44 = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q37IsYes = function () {
        if($scope.document && $scope.document.question37 && $scope.document.question37.answer){
            return true;
        }
        return false;
    };

    //==================================
    //
    //==================================
    $scope.Q38Clear = function () {
        if($scope.document && $scope.document.question38 && !$scope.document.question38.answer){
            $scope.document.question38.law      = undefined;
            $scope.document.question38.pic      = undefined;
            $scope.document.question38.measures = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q42Clear = function () {
        if($scope.document && $scope.document.question42){

            if($scope.document.question42.mat && !$scope.document.question42.mat.answer)
                $scope.document.question42.mat.furtherInfo = undefined;

            if($scope.document.question42.community && !$scope.document.question42.community.answer)
                $scope.document.question42.community.furtherInfo = undefined;

            if($scope.document.question42.mcc && !$scope.document.question42.mcc.answer)
                $scope.document.question42.mcc.furtherInfo = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q49Clear = function () {
        if($scope.document && $scope.document.question49 && $scope.document.question49.notApplicable){
            $scope.document.question49.answer = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q54Clear = function () {
        if($scope.document && $scope.document.question54 && !$scope.document.question54.answer){
            $scope.document.question54.measures  = undefined;
        }
        if($scope.document && $scope.document.question54 && $scope.document.question54.answer &&
           $scope.document.question54.measures && !$scope.document.question54.measures.answer){
            $scope.document.question54.measures.furtherInfo          = undefined;
            $scope.document.question54.measures.documentReferenceIDs = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q55Clear = function () {
        if($scope.document && $scope.document.question55 && !$scope.document.question55.answer){
             $scope.document.question55.measures = undefined;
        }

        if($scope.document && $scope.document.question55 && $scope.document.question55.answer &&
           $scope.document.question55.measures && !$scope.document.question55.measures.answer){
               $scope.document.question55.measures.furtherInfo          = undefined;
               $scope.document.question55.measures.documentReferenceIDs = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q59Clear = function () {
        if($scope.document && $scope.document.question59 && !$scope.document.question59.answer){
            $scope.document.question59.additionalInfo = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q61Clear = function () {
        if($scope.document && $scope.document.question61 && !$scope.document.question61.answer){
            $scope.document.question61.additionalInfo = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q62Clear = function () {
        if($scope.document && $scope.document.question62 && $scope.document.question62.no){
            $scope.document.question62.donor     = undefined;
            $scope.document.question62.recipient = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q62ClearDonor = function () {
        if($scope.document && $scope.document.question62 && $scope.document.question62.no)
            $scope.document.question62.no = undefined

        if($scope.document && $scope.document.question62 && !$scope.document.question62.donor.answer)
            $scope.document.question62.donor.additionalInfo = undefined;
    };

    //==================================
    //
    //==================================
    $scope.Q62ClearRecipient = function () {
        if($scope.document && $scope.document.question62 && $scope.document.question62.no)
            $scope.document.question62.no = undefined

        if($scope.document && $scope.document.question62 && !$scope.document.question62.recipient.answer)
            $scope.document.question62.recipient = undefined;
    };

    //==================================
    //
    //==================================
    $scope.Q62ClearRecipientFromParty = function () {
        if($scope.document && $scope.document.question62 && $scope.document.question62.recipient && !$scope.document.question62.recipient.parties){
            $scope.document.question62.recipient.partiesInfo = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q62ClearRecipientFromInstitution = function () {
        if($scope.document && $scope.document.question62 && $scope.document.question62.recipient && !$scope.document.question62.recipient.financialInstitutions){
            $scope.document.question62.recipient.financialInstitutions = undefined;
            $scope.document.question62.recipient.gef                   = undefined;
            $scope.document.question62.recipient.npImplementationFund  = undefined;
            $scope.document.question62.recipient.otherSources          = undefined;
            $scope.document.question62.recipient.otherSourcesInfo      = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q62ClearRecipientFromOtherSources = function () {
        if($scope.document && $scope.document.question62 && $scope.document.question62.recipient && !$scope.document.question62.recipient.otherSources){
            $scope.document.question62.recipient.otherSourcesInfo = undefined;
        }
    };
    //==================================
    //
    //==================================
    $scope.Q63Clear = function () {
        if($scope.document && $scope.document.question63 && !$scope.document.question63.answer){
            $scope.document.question63.numberOfStaff = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q63newClear = function () {
        if($scope.document && $scope.document.question63new ){
            $scope.document.question63new.relevantInformation = undefined;
             $scope.document.question63new.relevantDocuments = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q64newClear = function () {
        if($scope.document && $scope.document.question64new ){
            $scope.document.question64new.relevantInformation = undefined;
             $scope.document.question64new.relevantDocuments = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.logDocument = function() {
        console.info($scope.document);
    };

    //==================================
    //
    //==================================
    function hasValue(item) {
        if(item===true || item===false)
            return true;

        return false;
    }

    //==================================
    //
    //==================================
    $scope.$watch('document.government', function(newValue, oldValue){

        if(newValue != oldValue){
            updateRecords(newValue);
        }
    });

    //==================================
    //
    //==================================
    function updateRecords(government) {

        $scope.absDocuments = [];

        if(government){
            $q.when(getAbsDocuments(government)).then(function (data) {
                $scope.absDocuments = data;
            });

            $q.when(searchService.governmentSchemaFacets())
            .then(function(govFacets){
                $scope.recordsCount = {
                    cpc : 0, ircc : 0
                };
                var facet = _.find(govFacets, {government : government.identifier});

                if(facet)
                    $scope.recordsCount = {
                        cpc : facet.schemas.absCheckpointCommunique,
                        ircc : facet.schemas.absPermit
                    };
            });
        }
    }


    $q.when($http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true })).then(function(o){
        $scope.governments = o.data;
    });

    //==================================
    //
    //==================================
    $scope.loadDocuments = function () {
        updateRecords();
    };


    //==================================
    //
    //==================================
    function getAbsDocuments (government) {
        var natSchemas = appConfigService.nationalSchemas;
        var q  = '(realm_ss:' + solr.escape(realm.value.toLowerCase()) + 
                 ' ) AND NOT version_s:* AND government_s:'+ solr.escape(government.identifier) + 
                 ' AND schema_s:(' + _.map(natSchemas, solr.escape).join(' ') + ')';
        var queryParameters = {
            'query'    : q,
             currentPage : 0,
            rowsPerPage: 1000
        };

        var deferred = $q.defer();
        
        searchService.list(queryParameters, null).then(function (res) {
             deferred.resolve(res.data.response.docs);
        }).catch(function (error) {
            console.log(error);
        });

        return deferred.promise;
    }

  }];

