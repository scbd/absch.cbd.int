define(['app','lodash','angular','text!components/scbd-angularjs-controls/form-control-directives/km-terms.html'], function(app,_,angular,template) {

	    //============================================================
	    //
	    //
	    //============================================================
	    app.directive('kmTerms', function($http) {
	        return {
	            restrict: 'EAC',
	            template: template,
	            replace: true,
	            scope: {
	                binding: '=ngModel',
	            },
	            link: function($scope, element, attrs, controller) {
	                $scope.termsX = [];
	                $scope.terms = [];
	                $scope.$watch('binding', $scope.load);
	            },
	            controller: ["$scope", "$q", function($scope, $q) {
	                //==============================
	                //
	                //==============================
	                $scope.load = function() {
	                    $scope.terms = [];
	                    var oBinding = null;

	                    if ($scope.binding && angular.isArray($scope.binding)) oBinding = $scope.binding;
	                    else if ($scope.binding && angular.isObject($scope.binding)) oBinding = [$scope.binding];
	                    else if ($scope.binding && angular.isString($scope.binding)) oBinding = [$scope.binding];

	                    $scope.termsX = oBinding;
	                    console.log('oBinding: ', $scope.terms);
	                    return;


	                    if (oBinding) {
	                        var qTerms = [];

	                        angular.forEach(oBinding, function(value, key) {
	                            if (value.name)
	                                qTerms.push(value);
	                            else {

	                                var identifier = null;

	                                if (angular.isString(value))
	                                    identifier = value;
	                                else
	                                    identifier = value.identifier;

	                                qTerms.push($http.get("/api/v2013/thesaurus/terms/" + encodeURI(identifier), {
	                                    cache: true
	                                }).then(function(o) {
	                                    return _.extend(_.clone(o.data), _.omit(value, "identifier", "title"));
	                                }));
	                            }
	                        });

	                        $q.all(qTerms).then(function(terms) {
	                            $scope.terms = terms;
	                        });
	                    }
	                };
	            }]
	        };
	    });
});