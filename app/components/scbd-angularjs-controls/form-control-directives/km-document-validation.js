define(['app', 'text!./km-document-validation.html','jquery'], function(app, template,$) { 'use strict';

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
                            error.typeLabel     = getTranslation(error.code, error.property, error.parameters)
                            error.propertyLabel = getLabel(error.property)
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
                    if (code === null || code === "") return "Unknown error";
                    if (code == "Error.Mandatory") return "Field is mandatory";
                    if (code == "Error.InvalidValue") return "The value specified is invalid";
                    if (code == "Error.InvalidProperty") return "This value cannot be specified";
                    if (code == "Error.UnspecifiedLocale") return "A language is use but not speficied in your document";
                    if (code == "Error.UnexpectedTerm") return "A specified term cannot be used";
                    if (code == "Error.InvalidType") return "The fields type is invalid";
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

                    return $scope.report && (!$scope.report.errors || $scope.report.errors.length === 0);
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
