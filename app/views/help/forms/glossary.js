import app from 'app';
import _ from 'lodash';
import 'ngMaterial';
import 'ngAria';
import 'angular-animate';
import 'components/scbd-angularjs-services/main';
import 'components/scbd-angularjs-controls/main';

app.controller("glossaryController",
	["$rootScope", "$scope", "$q", "$timeout",'$http', '$element', function ($rootScope, $scope, $q, $timeout, $http, $element) {	
		
            $scope.alphabet = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                                'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            
            var url = '/api/v2015/help-glossarys';  
            
            function loadGlossarys(){
                $q.when( $http.get(url))
                .then(function(response){
                    $scope.glossarys = response.data;
                    $element.find('[data-toggle="tooltip"]').tooltip();
                });
            
            }
            
            $scope.replaceSpace = function(text){
                return text.replace(/ /g, '-');
            }      
            loadGlossarys();
            
   }]);

