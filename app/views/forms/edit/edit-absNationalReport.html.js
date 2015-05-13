define(['app', '/app/views/forms/edit/edit.js', '/app/views/forms/edit/document-selection-directive.html.js'], function (app) {

  app.controller("editAbsNationalReport", ["$scope", "authHttp", "$filter", "$controller", "$location", function ($scope, $http, $filter, $controller,$location) {
    $controller('editController', {$scope: $scope});


    $scope.tab      = 'part6';


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

      return document;
    };

    $scope.setDocument({libraries: [{ identifier: "cbdLibrary:abs-ch" }]});

    //==================================
    //
    //==================================
    $scope.isQ3Yes = function (answer) {
        if(answer === true || answer === undefined){

            if($scope.document.question4 && hasValue($scope.document.question4.answer)){
                $scope.document.question4.answer         = undefined;
                $scope.document.question4.furtherInfo    = undefined;
                $scope.document.question4.additionalInfo = undefined;
            }

            if($scope.document.question5 && hasValue($scope.document.question5.answer)){
                $scope.document.question5.answer      = undefined;
                $scope.document.question5.furtherInfo = undefined;
            }

            if($scope.document.question6 && hasValue($scope.document.question6.answer)){
                $scope.document.question6.answer      = undefined;
                $scope.document.question6.furtherInfo = undefined;
            }

            if($scope.document.question7 && hasValue($scope.document.question7.answer)){
                $scope.document.question7.answer      = undefined;
                $scope.document.question7.furtherInfo = undefined;
            }

            return true;
        }

        return false;
    };

    //==================================
    //
    //==================================
    $scope.isQ4Yes = function (answer) {
        if(!answer && $scope.document.question4 && hasValue($scope.document.question4.answer)){
            $scope.document.question4.additionalInfo = undefined;
        }
    };

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

            if($scope.document.question11 && $scope.document.question11.challenges)
                $scope.document.question11.challenges = undefined;

            return true;
        }

        return false;
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
        console.log(answer);
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
            $scope.document.question25.measures  = undefined;
            $scope.document.question25.violation = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q26Clear = function (answer) {
        if(!answer && $scope.document && $scope.document.question26){
            $scope.document.question26.additionalInfo = undefined;
            $scope.document.question26.measures       = undefined;
            $scope.document.question26.violation      = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q26MeasuresClear = function (answer) {
        if(!answer && $scope.document && $scope.document.question26 && $scope.document.question26.violation){
            $scope.document.question26.violation.additionalInfo = undefined;
        }
    };


    //==================================
    //
    //==================================
    $scope.Q27Clear = function (answer) {
        if(!answer && $scope.document && $scope.document.question27){
            $scope.document.question27.cc = undefined;
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
    $scope.Q54Clear = function () {
        if($scope.document && $scope.document.question54 && !$scope.document.question54.answer){
            $scope.document.question54.measures.answer      = undefined;
            $scope.document.question54.measures.answer      = undefined;
            $scope.document.question54.measures.furtherInfo = undefined;
        }
        if($scope.document && $scope.document.question54 && $scope.document.question54.answer && !$scope.document.question54.measures.answer){
            $scope.document.question54.measures.furtherInfo = undefined;
        }
    };

    //==================================
    //
    //==================================
    $scope.Q55Clear = function () {
        if($scope.document && $scope.document.question55 && !$scope.document.question55.answer){
            $scope.document.question55.measures.answer      = undefined;
            $scope.document.question55.measures.answer      = undefined;
            $scope.document.question55.measures.furtherInfo = undefined;
        }
        if($scope.document && $scope.document.question55 && $scope.document.question55.answer && !$scope.document.question55.measures.answer){
            $scope.document.question55.measures.furtherInfo = undefined;
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



  }]);
});
