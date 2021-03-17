import app from 'app';
import template from 'text!./lonlat.html';
import $ from 'jquery';
  ;
  app.directive('lonlatInput', function() {
    return {
      restrict: 'AEC',
      scope: {
        binding: "=ngModel",
        mapReference: "=?",
        help: '@',
      },
      template: template,
      controller: function($scope, $element, $attrs, $transclude) {
        var map = L.map('map', {
          center: [30, 15],
          zoom: 1,
          scrollWheelZoom: false,
        });
        $scope.mapReference = map;
        map.on('zoomend', function(e) {
          $scope.binding.zoom = map.getZoom();

          if ($scope.$$phase)
            $scope.$digest(); //necessary for some reason? Stupid Angular.
        });
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        $scope.$watch('binding', function() {
          if ($scope.binding.lat && $scope.binding.lng)
            $scope.newMarker();
        }, true);

        var marker;
        $scope.newMarker = function() {
          if (marker)
            map.removeLayer(marker);
          marker = new L.Marker({
            lat: $scope.binding.lat,
            lng: $scope.binding.lng
          });
          map.setZoom($scope.binding.zoom);
          map.addLayer(marker);
          map.setView({
            lat: $scope.binding.lat,
            lng: $scope.binding.lng
          }, $scope.binding.zoom);
        };
        map.on('click', function(e) {
          $scope.binding.lat = e.latlng.lat;
          $scope.binding.lng = e.latlng.lng;
          $scope.$apply(); //necessary, because we aren't in an angular event

          $scope.newMarker();
        });

        $('input', $element).each(function() {
          for (var i in $attrs)
            if (i.substr(0, 1) != '$' && !$scope[i] && i != 'ngModel' && i != 'id')
              $(this).attr(i, $attrs[i]);
        });
        if (typeof $scope.binding === 'undefined')
          $scope.binding = {
            zoom: 1
          };
        else {
          $scope.newMarker();
          map.setView({
            lat: $scope.binding.lat,
            lng: $scope.binding.lng
          }, $scope.binding.zoom);
        }
      },
    };
  });
