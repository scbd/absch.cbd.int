

import app from '~/app';
import _ from 'lodash';
import linechart from "./linechart";
import template from "text!./modalComments.html";
import modalCommentsT from '~/app-text/views/reports/chm/resource-mobilization/modalComments.json';
  

    app.directive('modal', 'translationService',function (translationService) {
        return {
            restrict: 'EA',
            require: ['^linechart'],
            scope: {
                header             : ' @modalHeader',
                comments           : '=',
                name               : '@name'
            },
            template: template,
            transclude: true,


            link: function() {
                translationService.set('modalCommentsT',modalCommentsT );
            }

        };
    });


