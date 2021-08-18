import app from  'app';
import template from 'text!./edit-header.html';
import 'angular-joyride';
import joyRideText from '~/app-data/submit-intro-joyride-tour.json';

app.directive('editHeader', ['joyrideService', function(joyrideService){
    return {
        restrict   : "E",
		template: template,
		replace    : true,
        link:function($scope){

            $scope.tour = function(){
                $scope.tourOn = true;
                var joyride = joyrideService;
                joyride.config = {
                    overlay: true,
                    onStepChange: function(){  },
                    onStart: function(){  },
                    onFinish: function(){
                        closeSubmitForm();
                        joyride.start = false;
                        $scope.tourOn = false;
                    },
                    steps : [
                        {
                            appendToBody:true,
                            type: 'element',
                            selector: "#workflowIntro",
                            title: joyRideText.introduction.title,
                            content: joyRideText.introduction.content,
                            placement: 'top'
                        },
                        {
                            appendToBody:true,
                            type: 'element',
                            selector: "#workflowSubFor",
                            title: joyRideText.submissionForm.title,
                            content: joyRideText.submissionForm.content,
                            placement: 'top',
                            beforeStep: openSubmitForm

                        },
                        {
                            appendToBody:true,
                            type: 'element',
                            selector: "#workflowSaveDraft",
                            title: joyRideText.saveDraft.title,
                            content: joyRideText.saveDraft.content,
                            placement: 'bottom'
                        },
                        {
                            appendToBody:true,
                            type: 'element',
                            selector: "#workflowReview",
                            title: joyRideText.review.title,
                            content: joyRideText.review.content,
                            placement: 'bottom'

                        },
                        {
                            appendToBody:true,
                            type: 'element',
                            selector: "#workflowPublish",
                            title: joyRideText.publish.title,
                            content: joyRideText.publish.content,
                            placement: 'top'

                        },
                        {
                            appendToBody:true,
                            type: 'element',
                            selector: "#needHelp",
                            title: joyRideText.needHelp.title,
                            content: joyRideText.needHelp.content,
                            placement: 'left',
                            // beforeStep: gotoSectionHelp
                        },
                        {
                            appendToBody:true,
                            type: 'element',
                            selector: "#slaask-button-cross",
                            title: joyRideText.needMoreHelp.title,
                            content: joyRideText.needMoreHelp.content,
                            placement: 'left'
                        }
                    ]
                };
                joyride.start = true;

                function openSubmitForm(resumeJoyride){
                    $('html,body').scrollTop(0);
                    $timeout(function(){
                         // $element.find('#countryProfile').click(); // not working
                        $('#workflowSubFor').click();
                        resumeJoyride();
                    }, 100);
                }

                function closeSubmitForm (resumeJoyride){
                    $element.find('#workflowIntro').click();
                    $timeout(function(){
                        resumeJoyride();
                    }, 500);
                }
            }
        }
    }
}])