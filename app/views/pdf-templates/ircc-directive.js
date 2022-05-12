import app from 'app';
import template from 'text!./ircc-directive.html';
import 'css!/app/css/abs/pdf-ircc.css';
import 'views/forms/view/directives/view-record-reference.directive';

import printHeaderTemplate from 'text!../forms/view/print-header.html';
import printFooterTemplate from 'text!../forms/view/print-footer.html';

	app.run(function($templateCache){
		$templateCache.put('view-print-header.html', printHeaderTemplate)
		$templateCache.put('view-print-footer.html', printFooterTemplate)
	});

    app.directive("pdfIrccPartialView", [function() {
        return {
            restrict: "EAC",
            template: template,
            scope: {
                documentId: "="
            },
            controller: ['$scope', '$http', '$location', '$filter', 'realm',
                function($scope, $http, $location, $filter, realm) {
    
                    var sLocale = "en";
                    $scope.locale = sLocale;
                    $scope.realm = realm;
                    
                    $scope.load = function() {
                        $http.get('/api/v2013/documents/' + $scope.documentId, {}).then(function(res) {
    
                            $scope.document = res.data;
                            var usageDetails = []
    
                            if ($scope.document.usage) {
                                $scope.document.usage.forEach(function(usage) {
    
                                    $scope.getTerm(usage.identifier).then(function(data) {
                                        usageDetails.push(data);
                                    });
                                });
                            }
                            $scope.document.usage = usageDetails;
                            $scope.getTerm($scope.document.government.identifier)
                                .then(function(data) {
                                    $scope.document.government = data;
                                });
                        });
    
                        var identifierWithoutRevision = $scope.documentId;
                        if(identifierWithoutRevision.indexOf('@')>0)
                            identifierWithoutRevision = identifierWithoutRevision.substr(0, identifierWithoutRevision.indexOf('@'));
    
                        $http.get('/api/v2013/documents/' + identifierWithoutRevision + '/versions?body=true&cache=true')
                            .then(function(res) {
                                $scope.versions = res.data.Items;
                            });
    
                        $http.get('/api/v2013/documents/' + $scope.documentId + '?info', {}).then(function(res) {
                            $scope.documentInfo = res.data;
                        });
                    }
                    $scope.renderHtml = function(html_code) {
                        //console.log(($filter("lstring")(html_code,$scope.locale)))
                        return ($filter("lstring")(html_code, $scope.locale));
                    };
    
                    $scope.$watch('documentId', function(newVal, oldVal) {
                        if (newVal)
                            $scope.load();
                    })
    
                    $scope.getTerm = function(identifier) {
                        return $http.get('/api/v2013/thesaurus/terms/' + identifier, {}).then(function(res){return res.data;});
                    }
    
                }]
        };
    }]);

