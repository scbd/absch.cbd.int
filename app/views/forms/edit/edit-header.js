import app from  '~/app';
import template from 'text!./edit-header.html';
import 'angular-joyride';
import joyRideTextTranslations from '~/app-text/views/forms/edit/submit-intro-joyride-tour.json';
import editHeaderT from '~/app-text/views/forms/edit/edit-header.json';
import { mergeTranslationKeys } from '../../../services/translation-merge';
const joyRideText = mergeTranslationKeys(joyRideTextTranslations);
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
                            title       : joyRideText.welcomeTitle,
                            content     : joyRideText.welcomeContent,
                            placement   : 'right'
                        },
                        {
                            appendToBody:true,
                            type        : 'element',
                            selector    : "#workflowIntro",
                            title       : joyRideText.introductionTitle,
                            content     : joyRideText.introductionContent,
                            placement   : 'top'
                        },
                        {
                            appendToBody:true,
                            type        : 'element',
                            selector    : "#workflowSubFor",
                            title       : joyRideText.submissionFormTitle,
                            content     : joyRideText.submissionFormContent,
                            placement   : 'top',
                            beforeStep  : openSubmitForm

                        },
                        {
                            appendToBody:true,
                            type        : 'element',
                            selector    : "#workflowSaveDraft",
                            title       : joyRideText.saveDraftTitle,
                            content     : joyRideText.saveDraftContent,
                            placement   : 'bottom',
                            customClass : "work-flow-save-draft-jr",
                        },
                        {
                            appendToBody: true,
                            type        : 'element',
                            selector    : "#workflowReview",
                            title       : joyRideText.reviewTitle,
                            content     : joyRideText.reviewContent,
                            placement   : 'bottom'

                        },
                        {
                            appendToBody: true,
                            type        : 'element',
                            selector    : "#workflowPublish",
                            title       : joyRideText.publishTitle,
                            content     : joyRideText.publishContent,
                            placement   : 'top'

                        },
                        {
                            appendToBody:true,
                            type        : 'element',
                            selector    : "#needHelp",
                            title       : joyRideText.needHelpTitle,
                            content     : joyRideText.needHelpContent,
                            placement   : 'bottom',
                            beforeStep  : gotoSectionHelp,
                            customClass : "need-help-jr",
                        },
                        {
                            appendToBody:true,
                            type        : 'element',
                            selector    : "#slaask-button-cross",
                            title       : joyRideText.needMoreHelpTitle,
                            content     : joyRideText.needMoreHelpContent,
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