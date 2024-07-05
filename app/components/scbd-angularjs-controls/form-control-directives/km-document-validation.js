import app from '~/app';
import template from 'text!./km-document-validation.html';
import $ from 'jquery';
import messagesTranslations from '~/app-text/components/scbd-angularjs-controls/form-control-directives/validation-errors.json';
import { mergeTranslationKeys } from '../../../services/translation-merge';
import kmDocumentValidationT from '~/app-text/components/scbd-angularjs-controls/form-control-directives/km-document-validation.json';

    //============================================================
    //
    //
    //============================================================
    app.directive('kmDocumentValidation', ["$timeout", "translationService",  function($timeout, translationService) {
        return {
            restrict: 'EAC',
            template: template,
            replace: true,
            transclude: true,
            scope: {
                report: '=ngModel',
            },
            link: function($scope, $element, $attr) {
                const messages = mergeTranslationKeys(messagesTranslations);
			    translationService.set('kmDocumentValidationT', kmDocumentValidationT);
                var container  = $attr.container || 'body,html';
                $attr.$observe('container', function(){
                    container = $attr.container|| 'body,html'
                })
                $scope.onLoad = true;
                //====================
                //
                //====================
                $scope.jumpTo = function(field) {

                    var qLabel = $element.parents().find("[km-tab]:last").parent().find("form[name='editForm'] label[for='" + field + "']:first");

                    if (qLabel.length === 0) //handle for abs as abs has the validation directive on edit instead of view form;
                        qLabel = $element.parent().find("form[name='editForm'] label[for='" + field + "']:first");

                    var sTab = qLabel.parents().find('[km-tab="edit"]').attr("km-tab")

                    // inner tabs
                    var sTabName   = qLabel.parents().filter(".tab-pane").attr("id");
                    var sPagerName = $('a[href$="'+ sTabName + '"]').parents().find("ul.pagination").attr("id");

                    if (sTab) {
                        var qBody =$element.parents().filter(container);

                        if(qBody.size()==0)//if provided container not found then use default
                            qBody =$element.parents().filter("body,html");

                        $scope.$parent.tab = sTab;

                        $timeout(function jumpTo() {

                            // inner tabs
                            //ToDo: need to change once fully migrated to BS5
                            if(sTabName && sPagerName){
                                $('#' + sPagerName).find('a[href$="' + sTabName + '"]').tab("show");
                                $("ul.page-tabs").find("li").removeClass("active");
                                $("ul.page-tabs").find('a[href$="' + sTabName + '"]').parents('li').addClass("active");
                            }
                            var scrollNum = qLabel.offset().top
                            
                            if(container!= 'body,html'){
                                //its a dialog calculate scrollTop
                                var dialogContainer = $(container)
                                scrollNum = scrollNum - dialogContainer.offset().top + dialogContainer.scrollTop();
                            }
                            else
                                scrollNum -= 10; //forms 

                            qBody.stop().animate({
                                scrollTop: scrollNum
                            }, 100);
                        });
                    }
                };


                $scope.$watch('report', function(newVal, oldVal) {
                    if (newVal || oldVal)
                        $scope.onLoad = false;
                    
                    if(newVal && (newVal.errors||{}).length >0){

                        for (var index = 0; index < newVal.errors.length; index++) {
                            var error = newVal.errors[index];
                            error.typeLabel     = getTranslation(error.code);

                            if(error.properties){
                                for (var i in error.properties) {
                                    var field = error.properties[i];
                                    var property = {};
                                    property.typeLabel     = getTranslation(error.code);
                                    property.propertyLabel = getLabel(field);
                                    property.property      = field;
                                    error.properties[i] = property;
                                }
                            }
                            else{
                                error.propertyLabel = getLabel(error.property);
                            }
                        }    
                    }
                    
                        
                    $scope.show=true;
                });


                //====================
                //
                //====================
                function getLabel(field) {

                    var qLabel = $element.parents().find("[km-tab]:last").parent().find("form[name='editForm'] label[for='" + field + "']:first");

                    if (qLabel.length === 0) //handle for abs as abs has the validation directive on edit instead of view form;
                        qLabel = $element.parent().find("form[name='editForm'] label[for='" + field + "']:first");

                    if (qLabel.size() !== 0)
                        return qLabel.text();

                    return field;
                };

                //====================
                //
                //====================
                function getTranslation(code, property, param) {
                    if (code === null || code === ""        ) return messages.unknown;
                    if (code == "Error.Mandatory"           ) return messages.mandatory
					if (code == "Error.MandatoryAnyOf"      ) return messages.mandatoryAnyOf
                    if (code == "Error.InvalidValue"        ) return messages.invalidValue
                    if (code == "Error.InvalidProperty"     ) return messages.invalidProperty
                    if (code == "Error.UnspecifiedLocale"   ) return messages.unspecifiedLocale
                    if (code == "Error.UnexpectedTerm"      ) return messages.unexpectedTerm
                    if (code == "Error.InvalidType"         ) return messages.invalidType
                    return code;
                };

            },
            controller: ["$scope", function($scope) {
                //====================
                //
                //====================
                $scope.isValid = function() {

                    if ($scope.report && $scope.report.clearErrors)
                        return false;

                    return $scope.report && (($scope.report.errors||[]).length === 0);
                };

                //====================
                //
                //====================
                $scope.hasErrors = function() {

                    if ($scope.report && $scope.report.clearErrors)
                        return false;

                    return $scope.report && $scope.report.errors && $scope.report.errors.length !== 0;
                };

            }]
        };
    }]);
	
