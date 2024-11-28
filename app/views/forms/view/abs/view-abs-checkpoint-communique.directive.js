import app from '~/app';
import _ from 'lodash';
import template from "text!./view-abs-checkpoint-communique.directive.html";
import '~/views/directives/record-options';
import '~/views/forms/view/chm/leaflet/leaflet.js';
import { mapConfig } from '~/views/forms/view/chm/leaflet/config.js'; 
import viewCPCT from '~/app-text/views/forms/view/abs/view-abs-checkpoint-communique.json';

app.directive("viewAbsCheckpointCommunique", ['translationService', function (translationService) {

	return {
		restrict   : "EAC",
		template: template ,
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			allowDrafts : "@",
			hide: "@"
		},
		link : function ($scope, $element, $attr)
		{
			translationService.set('viewCPCT', viewCPCT);
			$scope.showPdf = $attr.showPdf === undefined || $attr.showPdf != "false";
		},
		controller: ["$scope", "IStorage", "$http", "$q","realm", function ($scope, storage, $http, $q, realm)
		{
			$scope.contacts = undefined;
			$scope.gisMapLayers = null;
			$scope.gisMapCenter = null;
			$scope.mapConfig = mapConfig;

			
			

			//====================
			//
			//====================
			$scope.display = function(field) {

				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}

			//==================================
			//
			//==================================
			$scope.$watch("document.gisMapCenter", function (gisMapCenter) {
				$scope.gisMapCenter = angular.fromJson(angular.toJson(gisMapCenter));
			});

			//==================================
			//
			//==================================
			$scope.$watch("document.gisFiles", function (gisFiles) {
				var qLinks = gisFiles || [];
				var qGis = _.map(qLinks, function(link) {

					/* global L: true */ // JSHint for leaflet

					return $http.get(link.url).then(function(res) {
						return L.geoJson(res.data);
					});
				});

				$q.all(qGis).then(function (layers) {
					$scope.gisMapLayers = layers;
				});
			});

			$scope.$watch("document", function (oldVal,newVal) {
					getContacts(newVal);
			});

			function getContacts(document){
				if(!document || $scope.emailList)
					return;
				
				var qs = {
					q 	: { "identifier": document.header.identifier+"@"+document.info.revision },
					fo 	: 1
				}
				$q.when($http.get('/api/v2018/abs-certificate-receivers', { params: qs}))
				.then(function(res) {
					$scope.emailList = _.map(_.uniq(res.data.recipients), function(doc){return {identifier: doc}});
				});
			}


		}]
	};
}]);


