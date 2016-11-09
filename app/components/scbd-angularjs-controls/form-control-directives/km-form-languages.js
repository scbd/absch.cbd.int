define(['app'  ], function(app ) {
  'use strict';
  //============================================================
  //
  //
  //============================================================
  //TODO: out of date, needs to be updated with current select, or select needs to be updated.
  app.directive('kmFormLanguages', [ function() {
      return {
          restrict: 'EAC',
          template: '<span ng-show="isVisible()"><span km-select multiple ng-model="binding" binding-type="string" placeholder="Available Languages" items="locales|orderBy:\'name\'" minimum="1"></span></span>',
          replace: true,
          transclude: true,
          scope: {
              binding: '=ngModel',
          },
          controller: ["$scope", function($scope) {
              $scope.locales = [{
                  identifier: "ar",
                  name: "Arabic"
              }, {
                  identifier: "en",
                  name: "English"
              }, {
                  identifier: "es",
                  name: "Spanish"
              }, {
                  identifier: "fr",
                  name: "French"
              }, {
                  identifier: "ru",
                  name: "Russian"
              }, {
                  identifier: "zh",
                  name: "Chinese"
              }];

              $scope.isVisible = function() {
                  return $scope.binding !== undefined && $scope.binding !== null;
              };
          }]
      };
  }]);
});