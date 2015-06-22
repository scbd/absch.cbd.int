define(['app'], function(app) {

    app.directive('countryMapList', function() {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/countries/country-map-list-directive.html',
            replace: true,
            scope: {
                //countries: '=countries',
            },
            controller: ['$scope', '$http', 'realm', '$q', '$filter', '$routeParams', '$timeout', '$element', 'commonjs', '$route','$location',
                function($scope, $http, realm, $q, $filter, $routeParams, $timeout, $element, commonjs, $route, $location) {
                    var taiwan = "TW";
                    var china = "CN";
                    var denmark = "DK";
                    var greenland = "GL";
                    $scope.lastAction = 'party';

                    //====================================================
                    function loadCountryMapDetails() {
                        if (!$scope.countries) {
                            var schema = ["absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database"];
                            var queryFacetsParameters = {

                                'q': '(realm_ss:' + realm.value.toLowerCase() + ' or realm_ss:absch) AND NOT version_s:* AND ((schema_s:' + schema.join(' OR schema_s:') + ') OR (schema_s:focalPoint AND (type_ss:ABS-IC OR type_ss:NP-FP OR type_ss:ABS-FP)))',
                                'fl': '', //fields for results.
                                'wt': 'json',
                                'rows': 0, //limit
                                'facet': true, //get counts back
                                'facet.pivot': 'government_s,schema_s',
                                'facet.limit': 512
                            };
                            var countryFacets = $http.get('/api/v2013/index/select', {
                                params: queryFacetsParameters
                            });

                            $q.when(countryFacets).then(function(response) {

                                $scope.countryFacets = response.data.facet_counts.facet_pivot;

                                CalculateFacets();
                                calculateListViewFacets();
                            });
                            //   if ($routeParams.code && $routeParams.code.toUpperCase()=='RAT') {
                            //     $scope.searchFilter = commonjs.isNPParty;
                            //     $scope.updateMap('ratified');
                            //   }

                        }
                    }

                    //====================================================
                    function loadCountries() {

                        commonjs.getCountries()
                            .then(function(countries) {

                                $scope.ratifications = 0;
                                $scope.signatures = 0;
                                $scope.parties = 0;
                                $scope.countriesforAutocomplete = [];
                                $scope.inbetweenParties = 0;
                                $scope.nonCBDParties = 0
                                var countryColors = {};
                                $scope.countries = countries;
                                $scope.totalParties=0;
                                $scope.totalNonParties=0;

                                _.each($scope.countries, function(country) {

                                    if (country.isNPParty) {
                                        if (country.code == 'EU')
                                            country.code = 'EUR';
                                        $scope.totalParties++;
                                        countryColors[country.code.toUpperCase()] = "#428bca";
                                    // } else if (country.isNPSignatory) {
                                    //     countryColors[country.code.toUpperCase()] = "#5bc0de";
                                    } else if (country.isCBDParty) {
                                        countryColors[country.code.toUpperCase()] = "#666";
                                        $scope.totalNonParties++;
                                    } else {
                                        countryColors[country.code.toUpperCase()] = "#666";
                                        console.log('nonparty country', country);
                                        //$scope.totalNonParties++;
                                    }

                                    $scope.countriesforAutocomplete.push({
                                        name: country.name.en
                                    });

                                });

                                countryColors[greenland.toUpperCase()] = "#666";
                                countryColors[taiwan] = "#666";

                                loadMap(countryColors);
                                addEUMapEvents();

                            });
                        //$scope.countries = $filter("orderBy")(response[1].data, "name.en");
                    }


                    //====================================================
                    function addEUMapEvents() {

                        $("#vmap").append("<div id=\"jqvmap1_EUR1\" class=\"europeanUnion jqvmap-zoomout flag-icon-background flag-icon-eur\" style=\"max-height:50px;max-width:100px;background-color:#eee\"></div>");

                        $('#jqvmap1_EUR1').on('click', function(e) {
                            $scope.navigateCountry(this, 'EUR', null);
                        });
                        $('#jqvmap1_EUR1').on('mouseout', function(e) {
                            $('.jqvmap-label').hide();
                        });
                        $('#jqvmap1_EUR1').on('mouseover', function(e) {
                            var maplabel = $('.jqvmap-label').last();
                            maplabel.hide();
                            maplabel.html('')
                            showCountryDetails(this, maplabel, 'EUR');
                            maplabel.show();
                            var left = e.pageX - 15 - maplabel.width();
                            var top = e.pageY - 15 - maplabel.height();

                            if (left < 0)
                                left = e.pageX + 15;
                            if (top < 0)
                                top = e.pageY + 15;

                            maplabel.css({
                                left: left,
                                top: top
                            });
                        });
                    }


                    //   if(!$routeParams.code){

                    //   }

                    $scope.orderList = false;
                    $scope.sortTerm = 'name.en';

                    //====================================================
                    $scope.sortTable = function(term, order) {


                            if ($scope.sortTerm == term) {
                                $scope.orderList = !$scope.orderList;
                            } else {
                                $scope.sortTerm = term;
                                $scope.orderList = true;
                            }


                            if(order == "ASC")
                                $scope.orderList = false;

                            if(order == "DESC")
                                $scope.orderList = true;


                    };


                    //====================================================
                    $scope.hasFacets = function(entity) {

                        for (var i = 0; i < $scope.commonFormatFacets.length; i++) {
                            var data = $scope.commonFormatFacets[i];

                            if (data[0] == $scope.selected_facet) {
                                return data[1].countries.indexOf(entity.code.toLowerCase()) >= 0
                            }
                        }

                        return false;
                    }

                    //====================================================
                    function loadMap(colors) {

                        if (!colors)
                            colors = this.countryColors;
                        jQuery('#vmap').vectorMap({
                            map: 'world_en',
                            backgroundColor: '#f5f5f5',
                            selectedColor: '#fff',
                            enableZoom: true,
                            showTooltip: true,
                            colors: colors,
                            hoverColor: false,
                            onRegionClick: function(event, code, region) {
                                $scope.navigateCountry(event, code, region);
                            },
                            onLabelShow: function(event, label, code) {
                                showCountryDetails(event, label, code)
                            }

                        });
                        $('.jqvmap-zoomin').html('<i class="glyphicon glyphicon-plus"/>')
                        $('.jqvmap-zoomout').html('<i class="glyphicon glyphicon-minus"/>')
                    }

                    //====================================================
                    $scope.navigateCountry = function(event, code, region) {
                        $('.jqvmap-label').html('');
                        code = code.toUpperCase();
                        //tiwan should be shown as China
                        if (code == taiwan)
                            code = china
                        if (code == greenland) //greenland  as denmark
                            code = denmark
                            $timeout(function(){$location.path('/countries/' + code)},1);
                        // $scope.$emit('loadCountryProfile', {
                        //     'data': {
                        //         countryCode: code,
                        //         lastAction: $scope.lastAction,
                        //         searchFilter: $scope.searchFilter
                        //     }
                        // });
                    }

                    //====================================================
                    function showCountryDetails(event, label, code) {
                        code = code.toUpperCase();
                        //tiwan should be shown as China
                        if (code == taiwan)
                            code = china
                            // if (code == greenland) //greenland  as denmark
                            //   code = denmark
                            // console.log(code,$scope.countries);
                        var country = _.where($scope.countries, {
                            code: code.toUpperCase()
                        })
                        var countryFacet = _.where($scope.countryFacets["government_s,schema_s"], {
                            value: code.toLowerCase()
                        })

                        var cfHtml = '';
                        var countryName = code;
                        var headerClass = "panel-default"
                        if (country.length > 0) {
                            countryName = country[0].name.en;

                            if (country[0].isNPParty) {
                                headerClass = "panel-primary"
                                cfHtml += '<li class="list-group-item"><span class="label label-primary">Ratified</span></li>'
                            } else if (country[0].isNPInbetweenParty) {
                                headerClass = "panel-default"
                                cfHtml += '<li class="list-group-item"><span class="label label-default">Ratified</span>' +
                                    '</br><span class="label label-success">entry into force on ' + country[0].entryIntoForce + '</span></li>'
                            } else if (country[0].isNPSignatory) {
                                headerClass = "panel-info"
                                cfHtml += '<li class="list-group-item"><span class="label label-info">Signatory</span></li>'
                            } else if (country[0].isCBDParty) {
                                headerClass = "panel-default"
                                cfHtml += '<li class="list-group-item"><span class="label label-default">Not Ratified/CBD party</span></li>'
                            }
                        }
                        if (countryFacet.length > 0) {
                            countryFacet[0].pivot.forEach(function(document) {
                                cfHtml += '<li class="list-group-item" style="color:black">' +
                                    '    <span class="badge">' + document.count + '</span>' +
                                    $filter("schemaShortName")(document.value.toLowerCase()) + ' </li>'
                            });
                        } else {
                            cfHtml += '<li class="list-group-item" style="color:black">No information available</li>'
                        }
                        label.html(
                            '<div style="min-width:150px;" class="panel ' + headerClass + '"><div class="panel-heading"><h3 class="panel-title">' + countryName + '</h3>' +
                            '</div> <div class="panel-body"><ul class="list-group">' + cfHtml + '</ul></div></div>'

                        );
                    }
                    //====================================================
                    $scope.updateMap = function(action) {

                        $scope.selected_facet = action

                        _.each($scope.countries, function(country) {
                            $("#jqvmap" + getMapIndex() + "_" + country.code.toUpperCase()).attr("fill", "#FFF");
                        });

                        //fix for taiwan
                        $("#jqvmap" + getMapIndex() + "_" + taiwan).attr("fill", "#FFF");
                        $("#jqvmap" + getMapIndex() + "_" + greenland).attr("fill", "#FFF");

                        if (action == 'signatory' || action == 'party' || action == 'nonParties' || action == 'all') {

                            if (action == 'all' || action == 'nonParties') {
                                $("#jqvmap" + getMapIndex() + "_" + greenland).attr("fill", "#666");
                            }

                            _.each($scope.countries, function(country) {

                                if ((action == 'party' || action == 'signatory' || action == 'all') && country.isNPParty) {
                                    $("#jqvmap" + getMapIndex() + "_" + country.code.toUpperCase()).attr("fill", "#428bca");
                                }
                                // else if ((action == 'signatory' || action == 'all' || action == 'nonParties') &&
                                //          !country.isNPParty && country.isNPSignatory) {
                                //     $("#jqvmap" + getMapIndex() + "_" + country.code.toUpperCase()).attr("fill", "#FF4081");
                                // }
                                else if ((action == 'nonParties' || action == 'all') && !country.isNPParty) {
                                    $("#jqvmap" + getMapIndex() + "_" + country.code.toUpperCase()).attr("fill", "#666");
                                    $("#jqvmap" + getMapIndex() + "_" + taiwan).attr("fill", "#666");
                                }
                                //for non CBD parties only
                                if(!country.isCBDParty && action == 'all'){
                                    $("#jqvmap" + getMapIndex() + "_" + country.code.toUpperCase()).attr("fill", "#666");
                                }

                            });
                        } else {

                            $scope.searchFilter = $scope.hasFacets;

                            $('#jqvmap1_EUR1').hide('slow');
                            _.each($scope.countryFacets['government_s,schema_s'], function(data) {
                                //console.log(("#jqvmap" + getMapIndex() + "_"+taiwan));
                                var colorCountry = false;
                                var search = _.where(data.pivot, {
                                    value: action
                                });
                                if (search.length > 0) {
                                    //console.log(data);
                                    if (data.value.toUpperCase() == 'EUR')
                                        $('#jqvmap1_EUR1').show('slow');

                                    $("#jqvmap" + getMapIndex() + "_" + data.value.toUpperCase()).attr("fill", "#333");
                                    //fix for taiwan
                                    if (data.value.toUpperCase() == china)
                                        $("#jqvmap" + getMapIndex() + "_" + taiwan).attr("fill", "#333");

                                    //   if (data.value.toUpperCase() == denmark)
                                    //     $("#jqvmap" + getMapIndex() + "_" + greenland).attr("fill", "#428bca");
                                }
                            });
                        }
                    }

                    //====================================================
                    $scope.isSelected = function(facet) {
                        return facet == $scope.selected_facet;
                    }
                    //====================================================
                    $scope.listAll = function(status) {
                        $scope.searchFilter = '';
                        $scope.countryFilter = '';

                        partyFilter = true

                    }



                    //====================================================
                    function getMapIndex(id) {
                        if (!id)
                            id = 1;
                        //the jvqmap increase its index when map is visisted multiple times
                        //hence get the index of any country and use it for all others
                        //TODO: check why
                        if ($("#jqvmap" + id + "_" + greenland).length == 0)
                          return getMapIndex(id + 1)

                        return id;
                    }

                    //====================================================
                    function CalculateFacets() {
                        var tempFacets = {};
                        // console.log($scope.countryFacets['government_s,schema_s'])
                        var count = 0;
                        var countryC = '';
                        _.each($scope.countryFacets['government_s,schema_s'], function(data) {
                            // if(!data.pivot)
                            //     count++
                            if (data.value == 'ad')
                                console.log(data);
                            countryC += data.value + ',';
                            _.each(data.pivot, function(facets) {

                                if (facets.value == 'focalPoint' && tempFacets[facets.value]) {
                                    count++
                                    // console.log(tempFacets[facets.value]);
                                } // console.log((tempFacets[facets.value] ? tempFacets[facets.value].facetCount : 0) + facets.count);
                                tempFacets[facets.value] = {
                                    "facetCount": (tempFacets[facets.value] ? tempFacets[facets.value].facetCount : 0) + facets.count,
                                    "countryCount": (tempFacets[facets.value] ? tempFacets[facets.value].countryCount : 0) + 1,
                                    "countries": (tempFacets[facets.value] ? tempFacets[facets.value].countries : '') + data.value + ','
                                };
                            });

                        });
                        // console.log(count, countryC)
                        $scope.commonFormatFacets = _.pairs(tempFacets);
                        // console.log($scope.commonFormatFacets)
                    }

                    //====================================================
                    $scope.slideMap = function(divShow, divHide) {

                        $(divHide).slideUp("slow");
                        $(divShow).slideDown("slow");

                    }

                    //====================================================
                    function calculateListViewFacets() {

                        _.each($scope.countries, function(country) {
                            var countryFacet = _.where($scope.countryFacets["government_s,schema_s"], {
                                value: country.code.toLowerCase()
                            });
                            if (countryFacet.length > 0) {
                                countryFacet[0].pivot.forEach(function(document) {
                                    country[$filter("schemaShortName")(document.value.toLowerCase())] = document.count;
                                });
                            }

                        });

                        // console.log($scope.countries);


                    }

                    //====================================================
                    $scope.sortTermFilter = function(data) {
                         //console.log(data);
                        if ($scope.sortTerm == "treaties.XXVII8b.deposit")
                            return data.entryIntoForce;
                        else if ($scope.sortTerm == "name.en")
                            return data.name.en;
                        else if ($scope.sortTerm == "CNA") {
                            return data.CNA ? data.CNA : ($scope.orderList ? -9999999 : 999999);
                        } else if ($scope.sortTerm == "CP") {
                            return data.CP ? data.CP : ($scope.orderList ? -9999999 : 999999);
                        } else if ($scope.sortTerm == "CPC") {
                            return data.CPC ? data.CPC : ($scope.orderList ? -9999999 : 999999);
                        } else if ($scope.sortTerm == "IRCC") {
                            return data.IRCC ? data.IRCC : ($scope.orderList ? -9999999 : 999999);
                        } else if ($scope.sortTerm == "MSR") {
                            return data.MSR ? data.MSR : ($scope.orderList ? -9999999 : 999999);
                        } else if ($scope.sortTerm == "NDB") {
                            return data.NDB ? data.NDB : ($scope.orderList ? -9999999 : 999999);
                        } else if ($scope.sortTerm == "FP") {
                            return data.FP ? data.FP : ($scope.orderList ? -9999999 : 999999);
                        }
                    }

                    //====================================================
                    $scope.addDate = function(date) {
                        return moment(date).add(90, 'day');
                    }

                    //====================================================
                    $scope.$on('showDetails', function(evt, data) {
                        if (data.data == 'map') {
                            $element.find('#divList').slideUp('slow');
                            $element.find('#divMap').slideDown('slow');
                        } else {
                            $element.find('#divMap').slideUp('slow');
                            $element.find('#divList').slideDown('slow');
                        }
                        //$scope.updateMap($scope.lastAction);
                    });

                    //====================================================
                    $scope.$on('updateMap', function(evt, eventData) {

                        $scope.updateMap(eventData.data.type);
                        $scope.searchFilter = eventData.data.searchFilter;

                    });


                    loadCountries();
                    loadCountryMapDetails();
                }
            ]

        };
    });
});
