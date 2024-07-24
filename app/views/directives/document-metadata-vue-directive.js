import app from '~/app';
import template from 'text!./document-metadata-vue-directive.html';
import '~/services/main';
import './document-metadata-directive';
import { link } from 'superagent';

app.directive('documentMetadataVue', function($http){
    return{
        restrict: 'EA',
        replace:true,
        template: template,
        scope: {
            'documentInfo': '='
        },
        link : function($scope){
            const {body, ...info} = $scope.documentInfo;
            $scope.document = {
                ...body,
                info
            }
        }
    };

});

