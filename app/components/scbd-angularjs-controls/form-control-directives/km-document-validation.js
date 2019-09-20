define(['app', 'text!./km-document-validation.html','jquery',
'json!app-data/validation-errors.json'], function(app, template,$, messages) { 'use strict';

    //============================================================
    //
    //
    //============================================================
    app.directive('kmDocumentValidation', ["$timeout", function($timeout) {
        return {
            restrict: 'EAC',
            template: template,
            replace: true,
            transclude: true,
            scope: {
                report: '=ngModel',
            },
            link: function($scope, $element, $attr) {

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
                            if(sTabName && sPagerName)
                                $('#'+sPagerName + ' a[href="#' + sTabName + '"]').tab('show');

                            qBody.stop().animate({
                                scrollTop: qLabel.offset().top - 50
                            }, 1000);
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
	});
