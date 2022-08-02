import templateHtml from 'text!./analyzer-section.html';
import app from '~/app';
import './analyzer-question'; ;

    //==============================================
    //
    //
    //==============================================
    app.directive('nationalReportAnalyzerSection', [function() {
        return {
            restrict : 'E',
            replace : true,
            template : templateHtml,
            require : '^nationalReportAnalyzer',
            scope :  {
                regions: '=',
                section: '=',
                sumType: '=',
                previousQuestionsMapping : '=',
                previousQuestionsValueMapping : '='
            },
            link: function ($scope, el, attr, nrAnalyzer) {

                //====================================
                //
                //
                //====================================
                $scope.toggle = function() {

                    $scope.loading = true;

                    nrAnalyzer.toggleSection($scope.section.key).finally(function(){
                        delete $scope.loading;
                    });
                };
            }
        };
    }]);

