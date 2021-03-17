import app from 'app';
import template from 'text!./document-date.html';
import moment from 'moment';
    app.directive('documentDate', function () {
        return {
            restrict: 'EAC',
            template: template,
            replace: true,
            link: function ($scope) {
                
                 if(($scope.document||{}).createdDate_dt ||
                    ($scope.$parent.internalDocumentInfo && $scope.$parent.internalDocumentInfo.documentID !== undefined  &&  $scope.$parent.internalDocumentInfo)){
                    
                        $scope.updatedOn = ($scope.document||{}).createdDate_dt || $scope.$parent.internalDocumentInfo.updatedOn;
                        // var nrRegex = /[a-z]{3}NationalReport([0-9])?/
                        // if(nrRegex.test($scope.$parent.internalDocumentInfo.type)){
                            var createdOn = $scope.$parent.internalDocumentInfo.createdOn;
                            if(createdOn!=$scope.updatedOn && !moment.utc(createdOn).isSame(moment.utc($scope.updatedOn), 'day')){
                                $scope.createdOn = createdOn;
                            }
                        // }
                }
            }
        }
    })

