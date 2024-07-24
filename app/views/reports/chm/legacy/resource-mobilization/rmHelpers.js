import app from '~/app';

    app.directive('rmTooltip', function() {
        return {
                restrict: 'A',
                scope: {
                    rmTooltip: '@'

                },
                link: function(scope, element, attrs){ //jshint ignore:line


                    element.tooltip({
                                        html         : true,
                                        trigger      : 'focus hover',
                                        dataPlacement: 'auto',
                                        container    : 'body',
                                        title        : scope.rmTooltip
                                    });
                    }
            };
    });

    //==================================
    //
    //==================================
    app.directive('rmPopover', function() {
        return {
                restrict: 'A',
                scope: {
                    rmPopover: '@',
                    count: '@'
                },
                link: function(scope, element, attrs){ //jshint ignore:line

                    element.popover({
                                        html         : true,
                                        trigger      : 'focus hover',
                                        placement    : 'auto',
                                        container    : 'body',
                                        content      : scope.count + ' comment(s)'
                                    });

                    attrs.$observe('count', function(val){

                        var popover = element.data('bs.popover');
                        popover.options.content = val + ' comment(s)';
                    });
                }
            };
    });

    //==================================
    //
    //==================================
    app.directive('rmPopover2', function() {
        return {
                restrict: 'A',
                scope: {
                    rmPopover2: '@',
                },
                link: function(scope, element, attrs){ //jshint ignore:line

                    element.popover({
                                        html         : true,
                                        trigger      : 'focus hover',
                                        placement    : 'auto',
                                        container    : 'body',
                                        content      : scope.rmPopover2
                                    });
                    }
            };
    });

