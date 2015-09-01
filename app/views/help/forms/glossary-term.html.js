define(['angular','app','underscore','ngMaterial','ngAria','angular-animate','scbd-angularjs-services',
  'scbd-angularjs-filters','scbd-angularjs-controls', 'angular-message'],
   function (angular, app, _) {

app.controller("glossaryTermController",
	["$routeParams", "$scope", "$q", "$timeout",'$http', '$element', '$mdToast','$route',
     function ($routeParams, $scope, $q, $timeout, $http, $element, $mdToast, $route) {	
		
		$scope.languages = ['en'];
		var url = 'http://localhost:8000/api/v2015/' + $route.current.$$route.schema;
    var orignal = {};
    $scope.mode = 'read';
    $scope.relatedFAQ = [];
    
		 $scope.replaceSpace = function(text){
       
       return text.replace(/ /g, '-');
       
     }      
		 
     
     $scope.loadGlossarys = function(){
     
       $q.when( $http.get(url))
          .then(function(response){
              $scope.glossarys = response.data;
              if(!$routeParams.term && $scope.schemas.length > 0){
                $scope.document = $scope.schemas[0];
              }
          });
         
     }
     $scope.loadGlossary = function(id){
     
       $q.when( $http.get(url + '/' + id))
          .then(function(response){
              $scope.viewGlossary(response.data);
          });
         
     }
     
     $scope.saveGlossary = function(){
     
       var operation;
       if(!$scope.document._id){
          operation = $http.post(url, $scope.document)
       }
       else{
          operation = $http.put(url + '/' + $scope.document._id, $scope.document)
       }
       
       $q.when(operation)
       .then(function(response){
          orignal = angular.copy($scope.document);
          if(response.data.id){
            $scope.document._id = response.data.id;
            $scope.glossarys.push($scope.document)
          }
          else{
            var doc = _.find($scope.glossarys, {'_id':$scope.document._id});
            doc.title = $scope.document.title;
            doc.description = $scope.document.description;
            doc.tags = $scope.document.tags;
            doc.referenceTerm = $scope.document.referenceTerm;
            doc.related = $scope.document.related;
          }
          $mdToast.show(
            $mdToast.simple()
              .content('Glossary updated!')
              .position("top right")
              .hideDelay(3000)
          );            
       });
       
     }
     
     $scope.loadFAQs = function(){
     
      return $q.when( $http.get('http://localhost:8000/api/v2015/help-faqs'))
          .then(function(response){
              $scope.faqs = response.data;
          });
         
     }
     function loadFAQ(relatedItem){
     
      $q.when( $http.get('http://localhost:8000/api/v2015/help-faqs/' + relatedItem))
          .then(function(response){
              $scope.relatedFAQ.push(response.data);
          });
         
     }
     
     $scope.editGlossary = function(){
       
        $scope.mode = 'edit';
       
        if(!$scope.document.tags)
          $scope.document.tags = [];
        if(!$scope.document.referenceTerm)
          $scope.document.referenceTerm = [];
     }
     
     $scope.cancel = function(){
        $scope.mode = 'read';
        $scope.document = angular.copy(orignal);
        orignal = undefined;
        $scope.relatedFAQ = [];
     }
     
      $scope.viewGlossary = function(term){
          $scope.mode = 'read';
          $scope.document = angular.copy(term);
          orignal = angular.copy(term);
          $scope.relatedFAQ = [];
          _.map(term.related, loadFAQ)
          
      }
     
     if($routeParams.term){
      
          if($routeParams.term=='new'){
              $scope.mode = 'edit';
              $scope.document = {};
              $scope.document.tags = [];
              $scope.document.referenceTerm = [];
          }
          else{
              $scope.mode = 'read';
              $scope.loadGlossary($routeParams.term);
          }
          
          $scope.loadGlossarys();
      }
      
      	 
     
   }]);
});