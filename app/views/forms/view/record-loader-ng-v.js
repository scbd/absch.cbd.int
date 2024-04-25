import app from '~/app';
import template from 'text!./record-loader-ng-v.html';
import recordLoader from './record-loader.vue';

app.directive('recordLoaderNgV',[function(){
    return {
        restrict: 'E',
        template: template,
        replace: true,
        scope: {
            linkTarget: "@",
            document: "=",
            locale: "=?",
            hide: "@",
            showDetails: "=",
            api: '=?',
            documentInfo: "=?",
        },
        link: function ($scope, $element, $attr) {
           
            $scope.vueComponent = {
                components: { recordLoader }
            }
        }
    }
}])