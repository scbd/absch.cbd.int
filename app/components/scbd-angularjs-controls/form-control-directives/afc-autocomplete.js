define(['app', 'text!./afc-autocomplete.html','jquery','lodash','angular-localizer', 'components/scbd-angularjs-services/services/locale'], function(app,template,$,_) { ;
    app.directive('afcAutocomplete', ['$compile', '$timeout', '$q', 'locale', '$filter', function($compile, $timeout, $q, locale, $filter) {
        return {
            restrict: 'AEC',
			require: "?ngModel",
            scope: {
                binding: '=ngModel',
                source: '=',
                filter: '=?',
                mapping: '=?',
                preview: '=?',
                placeholder: '@?',
                maxmatches: '@?',
                minchars: '@?',
                selectbox: '@?',
                multiple: '@?',
                ngDisabledFn: "&ngDisabled",
                windowsScrollbarCompatible: '@?'
            },
            template: template,
            link : function($scope, $element, $attrs, ngModelController){
                
                $scope.currentLocale = locale;

                
                //////Event Code////////
                $scope.updateSelected = function(index) {
                    $scope.selected = index;
                    if (index == -1)
                        $scope.current = {};
                    else
                        $scope.current = $scope.buttonOverrideFilter()[$scope.selected];
                };

                $scope.keydown = function($event, i) { //jshint ignore:line
                    //TODO: don't switch up and down if we aren't showing results yet.
                    if ($event.which == 38) {
                        if ($scope.selected > 0)
                            $scope.updateSelected($scope.selected - 1);
                    } else if ($event.which == 40) {
                        if ($scope.selected < ($scope.items.length - 1))
                            $scope.updateSelected($scope.selected + 1);
                    } else if ($event.which == 13) {
                        if ($scope.filteredLength >= 1) {
                            $scope.enterSelected();
                        }
                        $event.preventDefault();
                        $scope.hideOptions();
                        $scope.dontDoFilterOptions = true;
                    } else if ($event.which == 9 || $event.which == 188) {
                        if ($scope.filteredLength === 1) {
                            $scope.enterSelected();
                            if ($scope.multiple) {
                                $event.preventDefault();
                                $scope.hideOptions();
                            }
                        }
                    } else
                        $scope.buttonActivated = false; //we are changing the filter, so we no longer want to show all results
                };

                $scope.keyup = function(query, $event) { //jshint ignore:line
                    //hackish...
                    if ($scope.dontDoFilterOptions)
                        return $scope.dontDoFilterOptions = false;//jshint ignore:line

                    //if this is a single autocomplete, then maintain the binding
                    if (!$scope.multiple)
                        maintainBinding($scope, 'binding', $scope.bindingDisplay);

                    filterOptions(query).then(function(items) {//jshint ignore:line
                        if (query.length >= minchars && $scope.filteredLength <= maxmatches || $scope.buttonActivated) //buttonActivated => only using arrow keys. Display hasn't changed
                            $scope.showOptions();
                        else
                            $scope.hideOptions();//$element.find('.list-group').hide();
                    });
                };

                //only called when multiple = false
                function maintainBinding(binding, bindingKey, displayBinding) {
                    filterOptions(displayBinding).then(function(items) {
                        //If a regular text box, then keep binding in sync with what is displayed.
                        if (!$scope.selectbox)
                            binding[bindingKey] = displayBinding;

                        //if selectbox, first try and match for binding. Ie. non-multiple expects the binding to always be up to date.
                        if ($scope.selectbox) {
                            _.forEach(items, function(item) {
                                if (item.__value.toLowerCase() === displayBinding.toLowerCase()) {
                                    binding[bindingKey] = $scope.mapping(item);
                                }
                            });
                        }
                    });
                }

                $scope.spansKeyup = function(index) {
                    $scope.keyup($scope.displaySpans[index]);
                    maintainBinding($scope.binding, index, $scope.displaySpans[index]);
                };


                /////ENTER CODE//////////
                $scope.enterSelected = function($index) { //jshint ignore:line
                    setBindingFromInput($scope.current);
                };

                var itemChosen = false;
                $scope.clickSelected = function($index) {
                    itemChosen = true;

                    //Either the full list or the filtered list, depending on what is currently showing.
                    setBindingFromInput(
                        $scope.buttonOverrideFilter()[$index]
                    );
                    $scope.hideOptions();
                };

                function setBindingFromInput(element) {
                    if ($scope.multiple) {
                        toggleOption(element);
                        $scope.bindingDisplay = '';
                    } else{
                        var oNewBinding = $scope.mapping(element);
                    
                        if (!angular.equals(oNewBinding, $scope.binding))
                            $scope.binding = oNewBinding;

                        if ($.isEmptyObject($scope.binding))
                            $scope.binding = undefined;
                            
                        ngModelController.$setViewValue($scope.binding);
                    }

                    $scope.updateSelected(-1);
                }

                function toggleOption(element) {
                    var mapping = $scope.mapping(element);
                    var spliceIndex = indexOfPredicate($scope.binding, function(item) {
                        return _.isEqual(item, mapping);
                    });

                    if (spliceIndex != -1)
                        $scope.removeSpan(spliceIndex); //delete it, because we're "unselecting" it with a click.
                    else {
                        $scope.binding.push(mapping); //add what we clicked.
                        $scope.displaySpans.push($filter("lstring")(element.title, $scope.currentLocale));
                    }
                }
                ////////////END ENTER CODE
                function indexOfPredicate(array, predicate) {
                    for (var i = 0; i < array.length; ++i)
                        if (predicate(array[i]))
                            return i;

                    return -1;
                }
                ////////////////////////END EVENTS

                //////Filter Functions//
                var prevValue;
                var deferred;

                function filterOptions(query) {
                    //Do nothing if the value hasn't changed.
                        deferred = $q.defer();
                    if (prevValue === query) {
                        $scope.displayItems
                        return deferred.promise; //old promise
                    } else {
                        prevValue = query;
                    }

                    //console.log('prev, cur: ', prevValue, query);
                    GetSourceItems().then(function(items) {
                        $scope.displayItems = $scope.filter(query, items);

                        //reselected the one we had selected if possible.
                        if ($scope.selected != -1) {
                            var i;
                            for (i = 0; i != $scope.displayItems.length; ++i) {
                                if (($scope.displayItems[i]||{}).__value == $scope.current.__value) {
                                    $scope.updateSelected(i);
                                    break;
                                }
                            }

                            if (i === $scope.displayItems.length)
                                $scope.updateSelected(0);
                        }
                        //else, if we have results and we didn't have anything selected, then select first item.
                        else if ($scope.displayItems.length !== 0)
                            $scope.updateSelected(0);

                        $scope.filteredLength = $scope.displayItems.length;
                        deferred.resolve($scope.displayItems);
                    });
                    return deferred.promise; //the promise we used.
                }

                function GetSourceItems(recount) {
                    if(!$scope.source){ //wait for the source to attach retry after few seconds
                        
                        if(recount<=5)
                            return $timeout(function(){
                                recount = recount||0;
                                recount += 1;
                                return GetSourceItems(recount)
                            }, 1000)
                    }
                    if(($scope.items||[]).length>0){
                        var def = $q.defer();
                        def.resolve($scope.items);
                        return def.promise;
                    }
                    else{
                        if (typeof $scope.source == 'function')
                            return $scope.source();
                        else {
                            var def = $q.defer();
                            def.resolve($scope.source);
                            return def.promise;
                        }
                    }
                }
                $scope.buttonOverrideFilter = function() {
                    // console.log('button override: ', $scope.buttonActivated, $scope.items, $scope.displayItems);
                    if ($scope.buttonActivated)
                        return $scope.items;
                    else
                        return $scope.displayItems;
                };
                ////////////////////////END FILTERS

                //////Visual Functions//
                $scope.removeSpan = function(index) {
                    
                    $scope.binding.splice(index, 1);
                    $scope.displaySpans.splice(index, 1);
                };

                //Toggle whether or not to show the all options
                $scope.toggleAllOptions = function(buttonActivate) {
                    
                    if (buttonActivate) //TODO: rename to 'showAll' or something                   
                        $scope.buttonActivated = true;

                    if ($element.find('.list-group').is(':hidden') || $element.find('#' + $scope.title).is(':focus')) {
                        $scope.showOptions();
                    } else
                        $scope.hideOptions();
                };
                $scope.showOptions = function() {
                    
                    $timeout(function(){
                        $element.find('.list-group').show();
                    }, 200)
                };
                $scope.hideOptions = function() {
                    
                    $element.find('.list-group').hide();
                    $scope.buttonActivated = false;
                };

                $scope.delayHideOptions = function() {
                    
                    if (!$scope.windowsScrollbarCompatible)
                        $timeout(function() {
                            $scope.hideOptions();
                        }, 250);
                };

                $scope.updateHideOptions = function() {
                    
                    //TODO: do this somehow with promises... this is just hacking around the event model with timeouts
                    $timeout(function() {
                        $scope.buttonActivated = false;
                    }, 350);
                    //Honestly... the browser should trigger all events, before evaluating them, and an event should definitely be able to trigger while it has display: none... grrr....
                    $timeout(function() {
                        if (!$scope.buttonActivated)
                            $scope.hideOptions();

                        if (itemChosen) {
                            itemChosen = false;
                            //we've already selected something, so we're done.
                            return;
                        }

                        //Now we need to update the binding, or add the item if need be.
                        var string = $scope.bindingDisplay;

                        //non-multiple selectboxes need to clear their binding if the display doesnt match anything
                        if (!$scope.multiple) {
                            if ($scope.selectbox) {
                                if (reverseMap($scope.binding, $scope.items) !== $scope.bindingDisplay)
                                    $scope.bindingDisplay = $scope.binding = null;
                            }
                        } else { //Multiple
                            if ($scope.selectbox)
                                GetSourceItems().then(function(results) {
                                    for (var i = 0; i < results.length; ++i)
                                        if (results[i].__value == string) {
                                            $scope.binding.push(results[i]);
                                            $scope.displaySpans.push($filter("lstring")(results[0].title, $scope.currentLocale));
                                        }

                                    $scope.bindingDisplay = '';
                                });
                            else
                            if (string !== '') //we'll allow any option, but empty string.
                                $scope.binding.push(string);
                        }
                    }, 450);
                };

                $scope.updateSpan = function(index, string) {
                    
                    $timeout(function() {
                        if ($scope.selectbox) {
                            //if the display no longer represents the binding, then the binding is now invalidated, so clear.
                            if (reverseMap($scope.binding[index], $scope.items) !== string)
                                $scope.removeSpan(index);
                        } else {
                            if (string === '')
                                $scope.removeSpan(index);
                            else
                                $scope.binding[index] = string;
                        }

                        $scope.hideOptions();
                    }, 250);
                };
                ////////////////////////END VISUALS

                $scope.$watch('binding', function(newValue) { //jshint ignore:line
                    if ($scope.multiple) {
                        //if multiepl select box, then we need to revers map the displaySpan texts
                        if ($scope.selectbox)
                            GetSourceItems().then(function(items) {
                                for (var i = 0; i < $scope.binding.length; ++i)
                                    $scope.displaySpans[i] = reverseMap($scope.binding[i], items);
                            });
                        else {
                            //if regular multiple, then just directly put the displaySpans in as the bindings
                            for (var i = 0; i < $scope.binding.length; ++i)
                                $scope.displaySpans[i] = $scope.binding[i];
                        }

                    } else {
                        if ($scope.selectbox)
                            GetSourceItems().then(function(items) {
                                $scope.bindingDisplay = reverseMap($scope.binding, items);
                            });
                        else
                            $scope.bindingDisplay = $scope.binding;
                    }
                    // ngModelController.$setViewValue(newValue);
                    // $scope.ngChange(newValue);
                });


                function reverseMap(value, items) {
                    var foundItem = '';
                    _.forEach(items, function(item) {
                        var mapItem = $scope.mapping(item);
                        if((mapItem && value && mapItem.identifier && value.identifier && mapItem.identifier == value.identifier) || 
                          JSON.stringify(mapItem) == JSON.stringify(value)){
                            foundItem = $filter("lstring")(item.title, $scope.currentLocale);
                        }
                    });
                    //TODO: add error, for if no item matched

                    return foundItem;
                }

                //////Initializing//////
                $scope.items = []; //start empty, but then attempt to fill it.                
                GetSourceItems(0).then(function(items) {                    
                    $scope.items = items;
                });

                $scope.bindingDisplay = ""; //so the display won't be empty.
                $scope.displaySpans = [];

                //TODO: inherit and create a separate control for selectboxes.
                if ($scope.mapping && !$scope.selectbox)
                    throw "You can't have a mapping without a selectbox. Mappings are only for selectbox configurations.";
                if (!$scope.mapping)
                    $scope.mapping = function(item) {
                        return $filter("lstring")(item.title, $scope.currentLocale);
                    };
                if (!$scope.filter)
                    $scope.filter = function($query, items) {
                        var matchedOptions = [];
                        for (var i = 0; i < items.length; ++i) //_value is always there.
                            if (items[i].__value.toLowerCase().indexOf($query.toLowerCase()) != -1)
                                matchedOptions.push(items[i]);

                        return matchedOptions;
                    };

                if (typeof $scope.maxmatches == 'undefined') $scope.maxmatches = 20;
                else if ($scope.maxmatches <= 0) $scope.maxmatches = 999999;
                if (typeof $scope.minchars == 'undefined') $scope.minchars = 1;
                if (typeof $scope.selectbox == 'undefined') $scope.selectbox = false;
                var maxmatches = $scope.maxmatches;
                var minchars = $scope.minchars;

                $scope.hidePreview = false;
                if ($scope.multiple == 'true' && typeof $scope.binding == 'undefined')
                    $scope.binding = [];

                $scope.updateSelected(-1);

                //transfer attributes to the internal input
                $('input', $element).each(function() {
                    for (var i in $attrs)
                        if (i.substr(0, 1) != '$' && !$scope[i] && i != 'ngModel')
                            $(this).attr(i, $attrs[i]);
                });
                ////////////////////////END INIT
            },
        };
    }]);
});
