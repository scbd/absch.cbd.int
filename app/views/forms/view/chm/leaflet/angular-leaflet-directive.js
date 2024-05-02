import app from '~/app';
var leafletDirective = angular.module("leaflet-directive", []);

var template = 
'<div>'+
' <div ref="map" style="height:400px;margin-bottom:10px" class="angular-leaflet-map"></div>'+
' <div ref="disclaimer" class="small"></div>'+
'</div>';

leafletDirective.directive("leaflet", ["$http", "$log", "$q", "$timeout", function ($http, $log, $q, $timeout) {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            center: "=center",
            mapConfig: "=mapConfig",
            tileLayer: "=tileLayer",
            tileLayerOptions: "=tileLayerOptions",
            markers: "=markers",
            path: "=path",
            maxZoom: "@maxZoom",
            bounds: "=bounds",
            layers: "=layers"
        },
        template: template,
        link: function (scope, element, attrs) {

            var opt = { worldCopyJump: true};
            var mapConfig = scope.mapConfig || {}



            if(attrs.scrollWheelZoom!==undefined)
                opt.scrollWheelZoom = attrs.scrollWheelZoom=="true" || attrs.scrollWheelZoom=="1";

            var $el = element.find('[ref="map"]')[0];

            if(mapConfig.crs)
                opt.crs = mapConfig.crs;

            var map = new L.Map($el, opt);

            if(mapConfig.disclaimer)
                element.find('[ref="disclaimer"]').html(mapConfig.disclaimer),

            scope.$watch(function() { return element.is(':visible') }, invalidate)

            function invalidate(visible) {

                if (!visible)
                    return

                L.Util.requestAnimFrame(map.invalidateSize, map, !1, map._container);
            };

            var maxZoom = mapConfig.maxZoom || 6;

            if (scope.maxZoom) {
                maxZoom = parseInt(scope.maxZoom);
            }

            var point = new L.LatLng(0, 0);
            map.setView(point, 1);
            map.locate({ maxZoom: maxZoom });

            // Set tile layer
            
            var tileLayer        = scope.tileLayer || mapConfig.tileLayer;
            var tileLayerOptions = angular.extend({}, mapConfig||{}, scope.tileLayerOptions||{}, { maxZoom: maxZoom })

            L.tileLayer(tileLayer, tileLayerOptions).addTo(map);

            // Manage map bounds
            if (attrs.bounds) {
                scope.bounds = map.getBounds();
                map.on('moveend', function (s) {
                    scope.$apply(function (s) {
                        s.bounds = map.getBounds();
                    });
                });
            }

            // Manage map center events
            if (attrs.center) {

                if (scope.center && scope.center.autoDiscover === true) {
                    map.locate({ setView: true });
                }

                // Listen for map drags
                var dragging_map = false;
                map.on("dragstart", function (e) {
                    dragging_map = true;
                });

                map.on("drag", function (e) {
                    scope.$apply(function(s) {
                        s.center = angular.extend(s.center||{}, {
                            lat : map.getCenter().lat,
                            lng : map.getCenter().lng
                        });
                    });
                });

                map.on("dragend", function (e) {
                    dragging_map = false;
                });

                scope.$watch("center.lng", function (newValue, oldValue) {
                    if (dragging_map || ((newValue || null) === null))
                        return;

                    map.setView(new L.LatLng(map.getCenter().lat, newValue), map.getZoom(), {animate:false});
                });

                scope.$watch("center.lat", function (newValue, oldValue) {
                    if (dragging_map || ((newValue || null) === null))
                        return;

                    map.setView(new L.LatLng(newValue, map.getCenter().lng), map.getZoom(), {animate:false});
                });

                // Manage zoom events
                var zooming_map = false;
                map.on("zoomstart", function (e) {
                    zooming_map = true;
                });

                // Listen for zoom on DOM
                scope.$watch("center.zoom", function (newValue, oldValue) {
                    if (zooming_map || !newValue) return;
                    if (!scope.$$phase) {
                        map.setZoom(newValue);
                        //                        scope.$apply(function (s) {
                        //                            s.bounds = map.getBounds();
                        //                        });
                    }
                });

                map.on("zoomend", function (e) {
                    if (!scope.$$phase) {
                        scope.$apply(function(s) {
                            s.center = angular.extend(s.center||{}, {
                                zoom : map.getZoom()
                            });
                        });
                        zooming_map = false;
                    }
                });
            }

            if (attrs.markers !== undefined) {
                var markers_dict = [];

                var createAndLinkMarker = function (mkey, scope) {
                    var markerData = scope.markers[mkey];
                    var marker = new L.marker(
                        scope.markers[mkey],
                        {
                            draggable: markerData.draggable ? true : false
                        }
                    );

                    if (markerData.message) {
                        scope.$watch("markers." + mkey + ".message", function (newValue) {
                            marker.bindPopup(markerData.message);
                        });

                        scope.$watch("markers." + mkey + ".focus", function (newValue) {
                            if (newValue) {
                                marker.openPopup();
                            }
                        });
                    }

                    scope.$watch("markers." + mkey + ".draggable", function (newValue, oldValue) {
                        if (newValue === false) {
                            marker.dragging.disable();
                        } else if (newValue === true) {
                            marker.dragging.enable();
                        }
                    });

                    var dragging_marker = false;
                    marker.on("dragstart", function (e) {
                        dragging_marker = true;
                    });

                    marker.on("drag", function (e) {
                        scope.$apply(function (s) {
                            markerData.lat = marker.getLatLng().lat;
                            markerData.lng = marker.getLatLng().lng;
                        });
                    });

                    marker.on("dragend", function (e) {
                        dragging_marker = false;
                        if (markerData.message) {
                            marker.openPopup();
                        }
                    });

                    scope.$watch('markers.' + mkey, function () {
                        marker.setLatLng(scope.markers[mkey]);
                    }, true);

                    scope.$watch("markers" + mkey + ".lng", function (newValue, oldValue) {
                        if (dragging_marker || !newValue) return;
                        marker.setLatLng(new L.LatLng(marker.getLatLng().lat, newValue));
                    });

                    scope.$watch("markers" + mkey + ".lat", function (newValue, oldValue) {
                        if (dragging_marker || !newValue) return;
                        marker.setLatLng(new L.LatLng(newValue, marker.getLatLng().lng));
                    });
                    return marker;
                }; // end of create and link marker

                scope.$watch("markers", function (newMarkerList) {
                    // find deleted markers
                    for (var delkey in markers_dict) {
                        if (!scope.markers[delkey]) {
                            map.removeLayer(markers_dict[delkey]);
                            delete markers_dict[delkey];
                        }
                    }
                    // add new markers
                    for (var mkey in scope.markers) {
                        if (markers_dict[mkey] === undefined) {
                            var marker = createAndLinkMarker(mkey, scope);
                            map.addLayer(marker);
                            markers_dict[mkey] = marker;
                        }
                    } // for mkey in markers
                }, true); // watch markers
            } // if attrs.markers

            if (attrs.path) {
                var polyline = new L.Polyline([], { weight: 10, opacity: 1 });
                map.addLayer(polyline);
                scope.$watch("path.latlngs", function (latlngs) {
                    for (var idx = 0, length = latlngs.length; idx < length; idx++) {
                        if (latlngs[idx] === undefined || latlngs[idx].lat === undefined || latlngs[idx].lng === undefined) {
                            $log.warn("Bad path point inn the $scope.path array ");
                            latlngs.splice(idx, 1);
                        }
                    }
                    polyline.setLatLngs(latlngs);
                }, true);

                scope.$watch("path.weight", function (weight) {
                    polyline.setStyle({
                        weight: weight
                    });
                }, true);

                scope.$watch("path.color", function (color) {
                    polyline.setStyle({
                        color: color
                    });
                }, true);
            } // end of attrs.path


            var mLayers = [];

            scope.$watch("layers", function(newLayers){
                var oLayers = newLayers || [];

                angular.forEach(mLayers, function(oldLayer, key) {
                    map.removeLayer(oldLayer)
                });

                mLayers = [];

                angular.forEach(oLayers, function(newLayer, key) {
                    mLayers.push(newLayer);
                    map.addLayer(newLayer);
                });

                invalidate();
            });

        } // end of link function
    };
}]);
