import angular from 'angular';
import app from 'app';
import _ from 'lodash';
import 'ngMaterial';
import 'ngAria';
import 'angular-animate';
import 'services/main';
import 'components/scbd-angularjs-services/main';
import 'components/scbd-angularjs-controls/main';

    app.controller("glossaryTermController",
      ["$routeParams", "$scope","$rootScope", "$q", "$timeout", '$http', '$element',  '$route', 'commonjs', 'breadcrumbs', '$mdDialog',
        function ($routeParams, $scope, $rootScope, $q, $timeout, $http, $element,  $route, commonjs, breadcrumbs, $mdDialog) {

          $scope.languages = ['en'];
          var url = '/api/v2015/' + $route.current.$$route.schema;

          if($route.current.$$route.schema == 'help-faqs')
              $scope.helptype = 'FAQ';
          else
              $scope.helptype = 'Glossary';

          var orignal = {};
          $scope.mode = 'read';
          $scope.relatedFAQ = [];

          $scope.replaceSpace = function (text) {

            return text.replace(/ /g, '-');

          }


          $scope.canEdit = function () {
            return commonjs.isAdministrator();
          }
          $scope.loadGlossarys = function () {
            var params = {};

            if($routeParams.tag){
              //alteredUrl += '?q'
              params = {q : {tags: $routeParams.tag}}
            }

            $q.when($http.get(url, {params:params}))
              .then(function (response) {
                $scope.glossarys = response.data;
                if (!$routeParams.term && $scope.glossarys.length > 0) {
                  $scope.document = $scope.glossarys[0];
                  updateBreadcrumbs();
                }
              });

          }
          $scope.loadGlossary = function (id) {

            $q.when($http.get(url + '/' + id))
              .then(function (response) {
                $scope.viewGlossary(response.data);
              });

          }

          $scope.saveGlossary = function () {

            var operation;
            if (!$scope.document._id) {
              operation = $http.post(url, $scope.document)
            }
            else {
              operation = $http.put(url + '/' + $scope.document._id, $scope.document)
            }

            // if(!$scope.document.description.en)
            //   $scope.document.description = {en: $scope.document.description}

            $q.when(operation)
              .then(function (response) {
                orignal = angular.copy($scope.document);
                if (response.data.id) {
                  $scope.document._id = response.data.id;
                  $scope.glossarys.push($scope.document)
                }
                else {
                  var doc = _.find($scope.glossarys, { '_id': $scope.document._id });
                  doc.title = $scope.document.title;
                  doc.description = $scope.document.description;
                  doc.tags = $scope.document.tags;
                  doc.referenceTerm = $scope.document.referenceTerm;
                  doc.related = $scope.document.related;
                  doc.sequence = document.sequence;
                  updateBreadcrumbs();
                }
                $rootScope.$broadcast("showSimpleToast", "Glossary updated!");

              });

          }

          $scope.loadFAQs = function () {

            return $q.when($http.get('/api/v2015/help-faqs'))
              .then(function (response) {
                $scope.faqs = response.data;
              });

          }
          function loadFAQ(relatedItem) {

            $q.when($http.get('/api/v2015/help-faqs/' + relatedItem))
              .then(function (response) {
                $scope.relatedFAQ.push(response.data);
              });

          }
          function updateBreadcrumbs(){
            breadcrumbs.options = {'lableText' : $scope.document.title};
          }
          $scope.editGlossary = function () {

            $scope.mode = 'edit';

            if (!$scope.document.tags)
              $scope.document.tags = [];
            if (!$scope.document.referenceTerm)
              $scope.document.referenceTerm = [];

          }

          $scope.cancel = function () {
            $scope.mode = 'read';
            $scope.document = angular.copy(orignal);
            orignal = undefined;
            $scope.relatedFAQ = [];
          }

          $scope.viewGlossary = function (term) {
            $scope.mode = 'read';
            $scope.document = angular.copy(term);
            orignal = angular.copy(term);
            $scope.relatedFAQ = [];
            _.map(term.related, loadFAQ)
            updateBreadcrumbs();

          }

          $scope.deleteGlossary = function (glossaryDocument) {

						// Appending dialog to document.body to cover sidenav in docs app
						var confirm = $mdDialog.confirm()
							.title('Would you like to delete this ' + $scope.helptype + '?')
							.ok('yes').cancel('cancel');

						$mdDialog.show(confirm)
								.then(function() {
									$q.when($http.delete(url + '/' + $scope.document._id))
									.then(function(){
										$scope.glossarys.splice(_.indexOf($scope.glossarys, glossaryDocument), 1);
										$scope.document = $scope.glossarys[0];
										 $rootScope.$broadcast("showSimpleToast", $scope.helptype + ' deleted!');

									});
							});



					}


          if ($routeParams.term) {

            if ($routeParams.term == 'new') {
              $scope.mode = 'edit';
              $scope.document = {};
              $scope.document.tags = [];
              $scope.document.referenceTerm = [];
            }
            else {
              $scope.mode = 'read';
              $scope.loadGlossary($routeParams.term);
            }
          }
          $scope.loadGlossarys();



        }]);
  
