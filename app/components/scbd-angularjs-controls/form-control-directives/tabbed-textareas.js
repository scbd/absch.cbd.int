import app from '~/app';
import template from 'text!./tabbed-textareas.html';
import $ from 'jquery';
import 'angular-sanitize'; ;
        //TODO: switch binding to ngModel... because it's dumb to use another name
    app.directive('tabbedTextareas', function($timeout) {
        return {
            restrict: 'AEC',
            scope: {
                binding: "=ngModel",
                tabs: "=",
                tabindex: "@",
                rows: "@",
                hideUnfocused: "@",
                deletableTabs: "@",
                helpKey: "@",
                keyKey: "@",
                titleKey: "@",
                placeholder: "@",
                preview: '@?',
            },
            template:  template,
            controller: function($scope, $element, $attrs, $transclude) {
                //TODO: this initialization is hacky and will probably fall apart when part of an object is defined, but not the whole part. ie. isValid will fail.
                if (typeof $scope.binding === 'undefined') {
                    $scope.binding = {};
                    for (var i = 0; i != $scope.tabs.length; ++i)
                        $scope.binding[$scope.tabs[i].key] = '';
                } else if (typeof $scope.binding !== 'object') {
                    var message = "Tabbed Textarea's ngModel binding requires an object or nothing. No other types are allowed, to ensure a value isn't improperly overwritten. Binding: ";
                    console.log(message, $scope.binding);
                    throw message + $scope.binding;
                }
                if (!$scope.placeholder)
                    $scope.placeholder = 'Enter text here';

                $scope.isValid = function(key) {
                    return ($scope.binding[key] && $scope.binding[key].length > 20);
                };

                $scope.toggleFocus = function() {
                    $timeout(function() {
                        $scope.focused = !$scope.focused;
                    }); //this is cause Angular is trash and causes a digest clash between to states being changes in a digest cycle from two different spots.
                };

                $scope.showTab = function($event, $index, key) {
                    var root = $($event.target).parent().parent().parent();

                    root.find('.tabbed-textarea').not('.tab' + key).hide();
                    root.find('.tab' + key).show();
                    root.find('.textarea' + key).focus();
                    root.find('.atab').removeClass('active');
                    root.find('.' + $index + 'th-tab').addClass('active');
                };
                $scope.overwriteKeys = function($event, $index) {
                    var root = $($event.target).parent().parent().parent().parent();

                    if ($event.which == 9) {
                        $timeout(function() {
                            root.find('.' + ($index + 1) + 'th-button').focus();
                        });
                    }
                };
                $scope.maybeHide = function($event, $index) {
                    if ($scope.hideUnfocused == 'true') {
                        $($event.target).parent().hide();
                        //TODO: change all this parent.parent jazz, with ancestor based on class, so the html structure won't break everything
                        $($event.target).parent().parent().parent().parent().find('.' + $index + 'th-tab').removeClass('active');
                    }
                };
            },
        };
    });
	