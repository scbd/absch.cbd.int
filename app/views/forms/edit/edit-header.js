import app from  'app';
import template from 'text!./edit-header.html';
import 'angular-joyride';
import joyRideText from '~/app-text/views/forms/edit/submit-intro-joyride-tour.json';
import editHeaderT from '~/app-text/views/forms/edit/edit-header.json';

app.directive('editHeader', ['joyrideService', '$timeout', 'translationService', function (joyrideService, $timeout, translationService){
    return {
        restrict   : "E",
		template: template,
		replace    : true,
        link:function($scope, $element){
            translationService.set('editHeaderT', editHeaderT);
            $scope.tour = function(){
                $scope.tourOn = true;
                var joyride = joyrideService;
                joyride.config = {
                    overlay: true,
                    onStepChange: function(){  },
                    onStart: function(){ },
                    onFinish: function(){
                        closeSubmitForm();
                        joyride.start = false;
                        $scope.tourOn = false;
                    },
                    steps : [
                        {
                            appendToBody:true,
                            type        : 'element',
                            selector    : "#workflowPublish",
                            title       : joyRideText.welcome.title,
                            content     : joyRideText.welcome.content,
                            placement   : 'right'
                        },
                        {
                            appendToBody:true,
                            type        : 'element',
                            selector    : "#workflowIntro",
                            title       : joyRideText.introduction.title,
                            content     : joyRideText.introduction.content,
                            placement   : 'top'
                        },
                        {
                            appendToBody:true,
                            type        : 'element',
                            selector    : "#workflowSubFor",
                            title       : joyRideText.submissionForm.title,
                            content     : joyRideText.submissionForm.content,
                            placement   : 'top',
                            beforeStep  : openSubmitForm

                        },
                        {
                            appendToBody:true,
                            type        : 'element',
                            selector    : "#workflowSaveDraft",
                            title       : joyRideText.saveDraft.title,
                            content     : joyRideText.saveDraft.content,
                            placement   : 'bottom',
                            customClass : "work-flow-save-draft-jr",
                        },
                        {
                            appendToBody: true,
                            type        : 'element',
                            selector    : "#workflowReview",
                            title       : joyRideText.review.title,
                            content     : joyRideText.review.content,
                            placement   : 'bottom'

                        },
                        {
                            appendToBody: true,
                            type        : 'element',
                            selector    : "#workflowPublish",
                            title       : joyRideText.publish.title,
                            content     : joyRideText.publish.content,
                            placement   : 'top'

                        },
                        {
                            appendToBody:true,
                            type        : 'element',
                            selector    : "#needHelp",
                            title       : joyRideText.needHelp.title,
                            content     : joyRideText.needHelp.content,
                            placement   : 'bottom',
                            beforeStep  : gotoSectionHelp,
                            customClass : "need-help-jr",
                        },
                        {
                            appendToBody:true,
                            type        : 'element',
                            selector    : "#slaask-button-cross",
                            title       : joyRideText.needMoreHelp.title,
                            content     : joyRideText.needMoreHelp.content,
                            placement   : 'top',
                            customClass : "need-more-help-jr"
                        }
                    ]
                };
                joyride.start = true;

                function openSubmitForm(resumeJoyride){
                    $('html,body').scrollTop(0);
                    $('#workflowSubFor').click();
                    $timeout(resumeJoyride, 100);
                }

                function closeSubmitForm (resumeJoyride){
                    $element.find('#workflowIntro').click();
                    if(resumeJoyride){
                       $timeout(resumeJoyride, 100);
                    }
                }
                function gotoSectionHelp (resumeJoyride){
                    $('html,body').scrollTop(0);
                    $timeout(resumeJoyride, 100);
                }
            }
        }
    }
}])