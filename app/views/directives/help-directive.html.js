define(['app', 'underscore', 'joyRide'], function (app, _) {
        app.directive('help', function ($http) {
                return {
                        restrict: 'EAC',
                        replace: true,
                        transclude: true,
                        templateUrl: '/app/views/directives/help-directive.html',
                        scope: {
                                schema: '@',
                                //showHelp: '=',
                                repalceGlossaryTerms: '@'
                        },
                        link: ['$scope', '$q', '$element', function ($scope, $q, $element) {

                        }]
                        , controller: ['$scope', '$q', '$element', '$timeout', '$compile', '$http', '$filter',
                                function ($scope, $q, $element, $timeout, $compile, $http, $filter) {

                                        var joyride = false;
                                        var help = {};
                                        $scope.showHelp = {'show':true, showTour:false, hasTour:false};

                                        var buttonTemplate = '<div class="md-toolbar-tools"> <i class="material-icons">help_outline</i>   <a  ng-href="#" ng-click="showHelp.showTour=!showHelp.showTour" ng-if="!showHelp.showTour && showHelo.hasTour">' +
                                                             '   <i class="material-icons" >live_help</i>Tour</a><md-switch class="pull-right"' +
                                                             '   ng-model="showHelp.show"  aria-label="show help">' +
                                                             '   <h5>Help: <strong>{{showHelp.show ? "on" : "off"}}</strong></h5></md-switch></div>';
                                        var formTemplate = '<div class="help-section" style="margin-bottom:20px;">' +
                                                '   <div class="help-title">' +
                                                '    {{control}}' +
                                                '   </div>' +
                                                ' <div class="help-content help-contentwhite" ng-if="showHelp.show" >{{content}}<div>'

                                        var sectionTemplate = '<div class="help-section" ng-if="showHelp.show" style="margin-bottom:20px;">' +
                                                '   <div class="help-title">' +
                                                '    <i class="material-icons">help_outline</i>' +
                                                '   </div>' +
                                                ' <div class="help-content" >{{content}}<div>'
                                        var controlTemplate = sectionTemplate;//'<span class="help-inline" ng-if="showHelp.show"><i class="material-icons">help_outline</i> {{content}}</span>'

                                        if (!$scope.schema) {
                                                console.error('help schema name not provided')
                                                return
                                        }

                                         $scope.$watch('schema', function (newVal) {

                                              if (newVal)
                                                 loadSchemaHelp();
                                        });

                                        $scope.$watch('showHelp.showTour', function (newVal, oldValue) {
                                                if (oldValue === undefined)
                                                        return;

                                                if (newVal)
                                                        addJoyRideSteps();
                                        });

                                        function loadSchemaHelp(){
                                                //
                                                var query = '';
                                                if($scope.schema.indexOf('/')>=0){
                                                        query = '?q={"formPath":"' + $scope.schema + '"}';
                                                }
                                                else{
                                                       query = '?q={"schemaName":"' + $scope.schema + '"}';
                                                }

                                                $q.when($http.get('/api/v2015/help-forms/' + query))
                                                .then(function (response) {

                                                        // $timeout(function(){
                                                        help = _.first(response.data);
                                                        _.each(help.fields, function (field, key) {

                                                                var templateToUse = controlTemplate//;

                                                                var children = $element.find('div.km-control-group[name="' + field.name + '"] label')
                                                                if (field.type.identifier == 'section' || field.type.identifier == 'form') {
                                                                        children = $element.find('legend[name="' + field.name + '"]')
                                                                        templateToUse = field.type.identifier == 'section' ? sectionTemplate : formTemplate
                                                                        templateToUse = templateToUse.replace('{{control}}', buttonTemplate);
                                                                }
                                                                if (field.embed){
                                                                        children.after($compile(templateToUse.replace('{{content}}', $filter('lstring')(field.helpText)))($scope));
                                                                }
                                                                if (!children.attr('id')) {
                                                                        children.attr('id', field.name);
                                                                }
                                                        });
                                                        addJoyRideSteps();

                                                        // },1000)

                                                })
                                                .catch(function (error) {
                                                        if (error.code == 404)
                                                                console.error('help for schema not found')
                                                });

                                        }

                                        function addJoyRideSteps() {

                                                if (!joyride && help) {

                                                        if (!$element.attr('id'))
                                                                $element.attr('id', 'helpElement');

                                                        var joyRideTemplate = '<div id="joyrideSection" style="display:none"><ol id="helpElement" class="jouride-list" data-joyride>';
                                                        var index = 1;
                                                        _.each(help.fields, function (field, key, list) {
                                                                if (field.type.identifier == 'form' || !field.popup)
                                                                        return;

                                                                $scope.showHelp.hasTour = true;
                                                                var buttons = '';
                                                                if (index == 1)
                                                                        buttons = ' data-options="prev_button: false"'
                                                                else if (index == _.size(help.fields))
                                                                        buttons = ' data-button="Close" data-prev-text="Prev"  data-options="prev_button: true"'
                                                                else
                                                                        buttons = ' data-prev-text="Prev"  data-options="prev_button: true"';

                                                                joyRideTemplate += '  <li data-id="' + field.name + '" ' + buttons + '><p>'
                                                                + $filter('lstring')(field.helpText) + '</p></li>';
                                                                index++;
                                                        });

                                                        joyRideTemplate += '</ol></div>'
                                                        if($scope.showHelp.hasTour)
                                                            $element.append(joyRideTemplate);
                                                        joyride = true;
                                                }

                                                $element.find('#helpElement')
                                                        .joyride({
                                                                tip_container: '#joyrideSection',
                                                                postRideCallback: function () {
                                                                        $scope.showHelp.showTour = false;
                                                                }
                                                        });

                                        }

                                        function updateGlossaryTerms() {
                                                if ($scope.repalceGlossaryTerms)
                                                        $q.when($http.get('/api/v2015/help-glossarys/'))
                                                                .then(function (response) {
                                                                        _.each(response.data, function (field, key) {
                                                                                _.each(field.referenceTerm, function (term) {
                                                                                        replacetext(term, "<a href='/help/glossary/" + field._id + "'>$&</a>")
                                                                                });
                                                                        });
                                                                })
                                                                .catch(function (error) {
                                                                        if (error.code == 404)
                                                                                console.error('help for schema not found')
                                                                });


                                        }
                                        function replacetext(target, replacement) {
                                                // Get all text nodes:
                                                var $textNodes = $element
                                                        .find("*")
                                                        .andSelf()
                                                        .contents()
                                                        .filter(function () {
                                                                return this.nodeType === 3 &&
                                                                        !$(this).parent("a").length;
                                                        });

                                                // Iterate through the text nodes, replacing the content
                                                // with the link:
                                                $textNodes.each(function (index, element) {
                                                        var contents = $(element).text();
                                                        contents = contents.replace(new RegExp(target, "gi"), replacement);
                                                        $(element).replaceWith(contents);
                                                });
                                        };
                                        updateGlossaryTerms();


                                        $scope.$on('$destroy', function () {
                                                $element.find('#helpElement')
                                                        .joyride('destroy');
                                        });

                                }]
                };

        });
});
