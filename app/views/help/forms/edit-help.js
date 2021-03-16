import app from 'app';
import _ from 'lodash';
import 'ngMaterial';
import 'ngAria';
import 'angular-animate';
import 'components/scbd-angularjs-services/main';
import 'components/scbd-angularjs-controls/main';
import 'services/main';
		export { default as template } from './edit-help.html';

  export default ["$routeParams", "$scope", "$rootScope", "$q", '$http',  '$location', 'commonjs', '$mdDialog',
				function ($routeParams, $scope, $rootScope, $q, $http, $location, commonjs, $mdDialog) {

					var url = '/api/v2015/help-forms';

					$scope.document = {};
					$scope.languages = ["en"]
					$scope.mode = 'read'
					var origanalDocument = _.clone($scope.document);

					$scope.addField = function () {

						if (!$scope.document.fields)
							$scope.document.fields = [];

						$scope.document.fields.push({ name: '' })
					}
					
					$scope.canEdit = function(){						
						return commonjs.isAdministrator();												
					}
					
					$scope.options = {
						fieldTypes: fieldTypes()
					}

					function fieldTypes() {
						var types = [];
						//types.push({ value: 'form', title: 'form' });
						types.push({ value: 'section', title: 'section' });
						//types.push({ value: 'control', title: 'control' });	
						types.push({ value: 'inline', title: 'inline' });
						types.push({ value: 'content', title: 'content' });		
						types.push({ value: 'helpBlock', title: 'helpBlock' });					
						$scope.fieldTypes = types;
					}

					$scope.$on('$locationChangeStart', function (evt) {

						var formChanged = !angular.equals($scope.document, origanalDocument);
						if (formChanged)
							if (!confirm('There are unsaved changes, are you sure you want to leave?'))
								evt.preventDefault();
					});


					$scope.editHelp = function () {
						$scope.mode = 'edit';
					}

					$scope.viewHelp = function (document) {
						$scope.mode = 'read';
						$scope.document = document;
						origanalDocument = _.clone($scope.document);
						$scope.term = document._id
					}

					$scope.cancel = function () {

						$scope.mode = 'read';

					}

					$scope.loadSchemas = function () {

						$q.when($http.get(url))
							.then(function (response) {
								$scope.schemas = response.data;

								if (!$routeParams.term && $scope.schemas.length > 0) {
									$scope.document = $scope.schemas[0];
									origanalDocument = _.clone($scope.document);
								}
							});
					}
					$scope.loadSchema = function (query) {

						$q.when($http.get(url + '/' + query))
							.then(function (response) {
								$scope.document = response.data;
								origanalDocument = _.clone($scope.document);
							});
					}

					$scope.saveHelp = function () {

						var operation;
						var titleChanged = false;

						if ($scope.document.urlTitle != $scope.document.title.replace(/ /g, '-')) {
							$scope.document.urlTitle = $scope.document.title.replace(/ /g, '-');
							titleChanged = true;
						}
						if (!$scope.document._id) {
							operation = $http.post(url, $scope.document)
						}
						else {
							operation = $http.put(url + '/' + $scope.document._id, $scope.document)
						}
						$scope.showLoading = true;
						$q.when(operation)
							.then(function (response) {
								$scope.showLoading = false;
								if (response.data.id) {
									$scope.document._id = response.data.id;
									$scope.schemas.push($scope.document)
									origanalDocument = _.clone($scope.document);
								}
								
                                $rootScope.$broadcast("showSimpleToast", "Schema help updated!");
                                        
							});

					}
					
					$scope.deleteHelp = function (helpDocument) {
						
						// Appending dialog to document.body to cover sidenav in docs app
						var confirm = $mdDialog.confirm()
							.title('Would you like to delete this help?')	
							.ok('yes').cancel('cancel');
							
						$mdDialog.show(confirm)
								.then(function() {
									$q.when($http.delete(url + '/' + $scope.document._id))
									.then(function(){
										$scope.schemas.splice(_.indexOf($scope.schemas, helpDocument), 1);
										$scope.document = $scope.schemas[0];
                                        $rootScope.$broadcast("showSimpleToast", "Schema help deleted!");
									
									});
							});
						
						
						
					}
					
					$scope.deleteField = function (field) {
						$scope.document.fields.splice(_.indexOf($scope.document.fields, field), 1);
					}
					if ($routeParams.term) {

						if ($routeParams.term == 'new') {
							$scope.mode = 'edit';
							$scope.document = {};
							$scope.document.tags = [];
						}
						else {
							$scope.mode = 'read';
							$scope.loadSchema($routeParams.term);
						}
					}
					$scope.loadSchemas();
					fieldTypes();
				}];
	
