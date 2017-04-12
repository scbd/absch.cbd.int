define(['app','underscore', 'json!/app/app-data/help-guides.json'], function (app, _, guidesData) {
app.controller("guidesController",
	["$rootScope", "$scope", "$q", '$element', '$route', function ($rootScope, $scope, $q, $element, $route) {

        if($route.current.params.guideId && guidesData[$route.current.params.guideId]){
           window.location = guidesData[$route.current.params.guideId];
        }


   }]);
});
