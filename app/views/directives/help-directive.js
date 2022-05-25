import app from 'app';
import _ from 'lodash';
import 'angular-joyride';
        app.directive('help', function ($http) {
                return {
                        restrict: 'EAC',
                        replace: true,
                        // transclude: true,
                        // templateUrl: 'views/directives/help-directive.html',
                        scope: {
                                schema: '@',
                                delay: '@'
                        },
                        link: ['$scope', '$q', '$element', function ($scope, $q, $element) {

                        }]
                        , controller: ['$scope','$rootScope' ,'showHelp','$q', '$element', '$timeout', '$compile', '$http', '$filter',
                                function ($scope, $rootScope, showHelp, $q, $element, $timeout, $compile, $http, $filter) {

                                        var joyride = false;
                                        var help = {};
                                        $scope.showHelp = showHelp.value;

                                        var buttonTemplate = '';

                                        var sectionTemplate = '<div ng-if="showHelp.show" class="help-section">  <div style="" class="help-section-title"><i class="fa fa-info-circle"></i> {{title}} <a rel="noopener" translation-url  class="help-section-close" ng-click="showHelp.show=false;Feedback_helpOff();" href="#" style="" ><i class="fa fa-times"></i> Turn off help <i class="fa fa-info-circle"></i> </a></div> <div>{{content}}</div></div>';

                                        var formTemplate = sectionTemplate;

                                        var inlineTemplate= '<div class="help-inline-content" ng-if="showHelp.show"> <span><i class="fa fa-info-circle"></i> {{content}}</span> <div>';

                                        var helpBlockTemplate= '<span class="help-block"> {{content}} <span>';


                                        var contentTemplate= '<div class="help-simple-content">{{content}}<div>';


                                        var controlTemplate = sectionTemplate;//'<span class="help-inline" ng-if="showHelp.show"><i class="material-icons">help_outline</i> {{content}}</span>'

                                        if (!$scope.schema) {
                                                console.error('help schema name not provided')
                                                return
                                        }

                                        if (!$scope.delay) {
                                                $scope.delay = 1000;
                                        }

                                        $scope.Feedback_helpOff = function() {
                                                $rootScope.$broadcast("showSimpleToast", "Help is turned off. You can turn it back on by clicking the information icon located at the top right in the main navigation bar.");
                                        };




                                         $scope.$watch('schema', function (newVal, oldValue) {

                                              if (newVal && (newVal != oldValue || (_.isEmpty(help) && newVal.indexOf('register')>0))){
                                                  help.loaded = true;
                                                  if(joyride){
                                                      joyride=false;
                                                      $element.find('#helpElement').joyride('destroy');
                                                      //don't know why but joyride destry does not remove previous element from DOM so remvoe manually
                                                      $element.find('#joyrideSection').remove();
                                                  }
                                                  $timeout(function(){
                                                      loadSchemaHelp();
                                                  }, $scope.delay);
                                            }
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
                                                        help = _.head(response.data);
                                                        if(help){
                                                                _.forEach(help.fields, function (field, key) {

                                                                        var templateToUse = controlTemplate//;
                                                                        var children = $element.find('div.km-control-group[name="' + field.name + '"] label:first');

                                                                        // if(field.fieldType == 'control' && children.length==0){
                                                                        //     children = $element.find('label[name="' + field.name + '"]');
                                                                        // }
                                                                        if (field.fieldType == 'section' || field.fieldType == 'form') {
                                                                                children = $element.find('legend[name="' + field.name + '"]');
                                                                                templateToUse = field.fieldType == 'section' ? sectionTemplate : formTemplate;
                                                                                //templateToUse = templateToUse.replace('{{control}}', buttonTemplate);
                                                                        }
                                                                        else if (field.fieldType == 'inline' ) {
                                                                                children = $element.find('label[name="' + field.name + '"]');
                                                                                if(children.length==0)
                                                                                  children = $element.find('legend[name="' + field.name + '"]');
                                                                                if(children.length==0)
                                                                                  children = $element.find('div[name="' + field.name + '"]');
                                                                                templateToUse = inlineTemplate;
                                                                        }

                                                                        else if (field.fieldType == 'content' ) {
                                                                                children = $element.find('div[name="' + field.name + '"]');
                                                                                templateToUse = contentTemplate;
                                                                        }

                                                                        else if(field.fieldType == 'helpBlock'){
                                                                                 children = $element.find('label[name="' + field.name + '"]');
                                                                                if(children.length==0)
                                                                                  children = $element.find('legend[name="' + field.name + '"]');
                                                                                if(children.length==0)
                                                                                  children = $element.find('div[name="' + field.name + '"]');
                                                                                templateToUse = helpBlockTemplate;
                                                                        }

                                                                        if (children.length==0) {
                                                                            children = $element.find('#' + field.name);
                                                                        }

                                                                        if (field.embed){
                                                                                var output = templateToUse.replace('{{content}}', $filter('lstring')(field.helpText));
                                                                                output = output.replace('{{title}}', $filter('lstring')(field.fieldTitle));
                                                                                children.after($compile(output)($scope));
                                                                        }

                                                                        if (!children.attr('id')) {
                                                                                children.attr('id', field.name);
                                                                        }
                                                                });
                                                                addJoyRideSteps();

                                                                // if(help.repalceGlossaryTerms)
                                                                //         repalceGlossaryTerms();
                                                        }
                                                        // },1000)

                                                })
                                                .catch(function (error) {
                                                        if (error.code == 404)
                                                                console.error('help for schema not found')
                                                });

                                        }

                                        function addJoyRideSteps() {
                                            if(!help)
                                                return;
                                                if (!joyride) {

                                                        // if (!$element.attr('id'))
                                                        //         $element.attr('id', 'helpElement');

                                                        var joyRideTemplate = '<div id="joyrideSection" style="display:none"><ol id="helpElement" class="jouride-list" data-joyride>';
                                                        var index = 1;
                                                        _.forEach(_.sortBy(help.fields,'sequence'), function (field, key, list) {
                                                                if (field.fieldType == 'form')
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

                                                            //    if(field.popup){
                                                            //             var element = $element.find('#' + field.name);
                                                            //             element.attr('data-toggle',"tooltip");
                                                            //             element.attr('data-html',"true");
                                                            //             element.attr('data-container',"body");
                                                            //             //element.attr('data-placement', "left");
                                                            //             element.attr('title', $filter('lstring')(field.helpText));
                                                            //    }
                                                               index++;
                                                        });

                                                        joyRideTemplate += '</ol></div>'
                                                        if($scope.showHelp.hasTour){
                                                            $element.append(joyRideTemplate);
                                                            $('[data-bs-toggle="tooltip"]').tooltip();
                                                        }
                                                        joyride = true;
                                                }
                                                else
                                                $element.find('#helpElement')
                                                        .joyride({
                                                                autoStart:true,
                                                                tip_container: '#joyrideSection',
                                                                // postStepCallback : function (index, tip,t) {
                                                                //     console.log(index,tip,t);
                                                                //         if ($element.find('#helpElement').joyride('paused')) {
                                                                //         console.log('Hey there, you\'ve paused the tour.');
                                                                //         // fire your code here
                                                                //         }
                                                                // },
                                                                postRideCallback: function () {
                                                                        $scope.showHelp.showTour = false;
                                                                }
                                                        });

                                        }

                                        function repalceGlossaryTerms() {
                                                        $q.when($http.get('/api/v2015/help-glossarys/'))
                                                                .then(function (response) {
                                                                        _.forEach(response.data, function (field, key) {
                                                                                _.forEach(field.referenceTerm, function (term) {
                                                                                        replacetext(term, "<a rel=\"noopener\" translation-url  ng-if='showHelp.glossary' href='/help/glossary/" + field._id + "'>$&</a>")
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
                                                                        !$(this).parent("a").length
                                                                        && this.textContent.trim() != '↵';
                                                        });

                                                // Iterate through the text nodes, replacing the content
                                                // with the link:
                                                $textNodes.each(function (index, element) {
                                                        var contents = $(element).text();
                                                        if(contents.indexOf(target)>=0){
                                                                contents = contents.replace(new RegExp(target, "gi"), replacement);
                                                                $(element).replaceWith(contents);
                                                        }
                                                });
                                        };


                                        $scope.$on('$destroy', function () {
                                                $element.find('#helpElement')
                                                        .joyride('destroy');
                                               joyride = false;
                                               $scope.showHelp = {'show':true, showTour:false, hasTour:false};
                                        });

                                }]
                };

        });

