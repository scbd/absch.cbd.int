define(['app', 'text!views/forms/directives/document-date.html'], function (app, template) {
    app.directive('documentDate', function () {
        return {
            restrict: 'EAC',
            template: template,
            replace: true,
            link: function ($scope) {
                
                 if(($scope.document||{}).createdDate_dt ||
                    ($scope.$parent.internalDocumentInfo && $scope.$parent.internalDocumentInfo.documentID !== undefined  &&  $scope.$parent.internalDocumentInfo))
                    $scope.updatedOn = ($scope.document||{}).createdDate_dt || $scope.$parent.internalDocumentInfo.updatedOn;
            }
        }
    })
})
