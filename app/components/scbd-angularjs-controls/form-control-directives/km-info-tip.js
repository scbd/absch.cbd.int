define(['app', 'text!./km-info-tip.html', 'webui-popover'], function(app, template) {
    'use strict';
    app.directive('kmInfoTip', [function() {
        return {
            restrict: 'EA',
            replace: true,
            template: template,
            scope: {},
            link: function($scope, $element, $attrs) {

                var settings = {
                    trigger: 'hover',
                    title: $attrs.title || 'Help',
                    closeable: true,
                    dismissible: true,
                    padding: true,
                    backdrop: false,
                    style: 'popover-style1',
                    delay: {
                        show: null,
                        hide: 500
                    },
                    content: $attrs.content || ''
                };
                if($attrs.container && $attrs.container!='')
                    settings.container = $attrs.container;
                // width: $scope.width || 600,
                // height: $scope.height || 200,
                $element.find('a.show-pop')
                    .webuiPopover('destroy')
                    .webuiPopover(settings);

            }
        }
    }]);
});
