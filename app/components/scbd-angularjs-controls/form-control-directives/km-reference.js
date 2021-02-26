define(['app', 'angular','lodash', 'jquery', 'text!./km-reference.html','angular-sanitize'], function(app, angular, _, $, template) { ;
    //============================================================
    //
    //
    //============================================================
    app.directive('kmReference', function($http) {
        return {
            restrict: 'EAC',
            template: template,
            replace: false,
            transclude: true,
            require: "?ngModel",
            scope: {
                binding: '=ngModel',
                loaderFn: "&loader",
                orderByFn: "&orderBy"
            },
            /*
			compile: function compile(tElement, tAttrs, tTransclude) {
				//grab all transcluded html
				var children = tElement.children();

				//look for the place where we want to insert the html
				//ISSUE: tElement doesn't contain my template... I need my template somehow...
				var template = tElement.find('.reference-summary-cell').append(children);

				//append the new template to our compile element
				tElement.html('');
				tElement.append(template);
			},
	*/
            link: function($scope, $element, $attr, ngModelController) {
                //Init
                $scope.references = [];
                $scope.multiple = $attr.multiple !== undefined;
                $.extend($scope.editor, {
                    references: null,
                    visible: false
                });

                //Watchers

                $scope.$watch("binding", function() {$scope.load()});
                $scope.$watch('binding', function() {
                    ngModelController.$setViewValue($scope.binding);
                });

                $scope.$watch("editor.visible", function(_new, _old) {
                    if (_new != _old && _new) {
                        var editor = $element.find("#editReference");
                        editor.modal("show");
                        editor.on('shown.bs.modal', function() {
                            editor.find('.km-reference-search').focus();
                        });
                    }
                    if (_new != _old && !_new) $element.find("#editReference").modal("hide");
                });
            },
            controller: ["$scope", "$http", '$element', '$timeout',  function($scope, $http, $element, $timeout) {
                $scope.editor = {};
                $scope.selected = -1;

                $scope.keydown = function($event) {
                    if ($event.which == 38) {
                        if ($scope.selected > 0)
                            --$scope.selected;
                    } else if ($event.which == 40) {
                        if ($scope.selected < ($scope.filteredReferences.length - 1))
                            ++$scope.selected;
                    } else if ($event.which == 13) {
                        if ($scope.selected !== -1 && $scope.selected < $scope.filteredReferences.length)
                            $scope.filteredReferences[$scope.selected].__checked = true;
                        $scope.editor.save();
                        $event.preventDefault();
                    }
                };
                $scope.$watch('selected', function() {
                    $element.find('.list-group-item-info').removeClass('list-group-item-info');
                    //TODO: set acOption as the row, so I can just reuse that class rather than having multiple [both acOptions and acCheckbox]
                    $element.find('.acOption' + $scope.selected).addClass('list-group-item-info');
                    $element.find('.acOptions' + $scope.selected + ' :checkbox').focus();
                    //this is incase the item hasn't been rendered yet...
                    //we essentially just try again
                    $timeout(function() {
                        $element.find('.list-group-item-info').removeClass('list-group-item-info');
                        $element.find('.acOption' + $scope.selected).addClass('list-group-item-info');
                        $element.find('.acOption' + $scope.selected + ' :checkbox').focus();
                    }, 100);
                });



                //====================
                //
                //====================
                $scope.load = function() {
                    $scope.references = [];

                    if ($scope.binding) {
                        var oBinding = $scope.binding;

                        if (!angular.isArray(oBinding))
                            oBinding = [oBinding];

                        $scope.references = $scope.clone(oBinding);

                        angular.forEach(oBinding, function(binding, index) {
                            $scope.references[index].__loading = true;
                            $scope.references[index].__binding = binding;

                            $scope.loaderFn({
                                    identifier: binding.identifier
                                })
                                .then(function(data) {
                                        $scope.load_onSuccess(index, data);
                                    },
                                    function(error) {
                                        $scope.load_onError(index, error.data, error.status);
                                    });
                        });
                    }
                };

                //====================
                //
                //====================
                $scope.load_onSuccess = function(index, data) {
                    var oBinding = $scope.references[index].__binding;

                    $scope.references[index] = data;
                    $scope.references[index].__binding = oBinding;
                    $scope.references[index].__loading = false;
                    $scope.references[index].__hasError = false;
                    $scope.references[index].__error = undefined;
                    $scope.references[index].__errorCode = undefined;
                };

                //====================
                //
                //====================
                $scope.load_onError = function(index, error, status) {
                    $scope.references[index].__error = error || "unknown error";
                    $scope.references[index].__errorCode = status;
                    $scope.references[index].__loading = false;
                };

                //====================
                //
                //====================
                $scope.save = function() {
                    var oNewBinding = [];

                    angular.forEach($scope.references, function(ref, index) {
                        if (ref.__binding)
                            oNewBinding.push(ref.__binding);
                    });

                    if ($.isEmptyObject(oNewBinding))
                        oNewBinding = undefined;

                    if (oNewBinding && !$scope.multiple)
                        oNewBinding = oNewBinding[0];

                    $scope.binding = oNewBinding;
                };

                //====================
                //
                //====================
                $scope.remove = function(reference) {
                    var index = $scope.references.indexOf(reference);

                    if (index >= 0)
                        $scope.references.splice(index, 1);

                    $scope.save();
                };

                //====================
                //
                //====================
                $scope.loadAllReferences = function(reload) {
                    if ($scope.editor.references && !reload)
                        return;

                    $scope.isLoading = true;

                    $scope.loaderFn({
                        identifier: null
                    }).then(
                        function(data) {
                            $scope.isLoading = false;
                            $scope.editor.references = $scope.clone(data);
                            $element.find('.km-reference-search').focus();
                        },
                        function(err) {
                            $scope.isLoading = false;
                            $scope.editor.error = err;
                        });
                };

                //====================
                //
                //====================
                $scope.clone = function(data) {
                    return angular.fromJson(angular.toJson(data)); //clone;
                };

                //====================
                //
                //====================
                $scope.addReference = function() {
                    $scope.loadAllReferences();
                    $scope.editor.clearChecks();
                    $scope.editor.search = null;
                    $scope.editor.visible = true;
                };

                //====================
                //
                //====================
                $scope.editor.save = function() {
                    $.each($scope.editor.references, function(index, ref) {
                        var oNewRef = $scope.clone(ref); //clone;

                        oNewRef.__binding = {
                            identifier: ref.identifier
                        };
                        oNewRef.__checked = undefined;

                        if (ref.__checked) {
                            if (!$scope.multiple)
                                $scope.references = [];

                            $scope.references.push(oNewRef);
                            $scope.save();

                            if (!$scope.multiple)
                                return false;
                        }
                    });

                    $scope.editor.close();
                };

                //====================
                //
                //====================
                $scope.editor.clearChecks = function() {
                    if (!$scope.editor.references)
                        return;

                    angular.forEach($scope.editor.references, function(value) {
                        value.__checked = false;
                    });
                };

                //====================
                //
                //====================
                $scope.editor.close = function() {
                    $scope.editor.search = null;
                    $scope.editor.visible = false;
                    $element.find('.km-reference-select').focus();
                };

                //====================
                //
                //====================
                $scope.editor.filterExcludeSelected = function(ref) {
                    return !_.find($scope.references, {
                        identifier: ref.identifier
                    });
                };

                //====================
                //
                //====================
                $scope.editor.sortReference = function(ref) {
                    if ($scope.orderByFn)
                        return $scope.orderByFn({
                            reference: ref
                        });
                };

                //load all references ahead of time, so the user doesnt have to wait on first load.
                $scope.loadAllReferences();
            }]
        };
    });
});
