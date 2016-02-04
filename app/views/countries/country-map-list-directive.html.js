define(['app', 'underscore',  'scbd-angularjs-controls',
'/app/views/countries/country-profile-directive.html.js', 'ngSmoothScroll'], function(app, _) {

    app.directive('countryMapList', function() {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/countries/country-map-list-directive.html',
            replace: true,
            scope: {
            },
            controller: ['$scope', '$http', 'realm', '$q', '$filter', '$routeParams', '$timeout', '$element', 'commonjs', '$route','$location', 'smoothScroll',
            function($scope, $http, realm, $q, $filter, $routeParams, $timeout, $element, commonjs, $route, $location, smoothScroll) {
                    var reloadDetails = false;
                    var countryProfile = {};
                    $scope.lastAction = 'party';
                    $scope.orderList = false;
                    $scope.sortTerm = 'name.en';
                    $scope.countryProfile = countryProfile;

                    //====================================================
                    function loadCountryMapDetails() {
                        if (!$scope.countries || reloadDetails) {
                            $scope.loading = true;
                            var schema = ["absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database", "focalPoint"];

                            var queryFacetsParameters = {

                                'q': '(realm_ss:' + realm.value.toLowerCase() +') AND NOT version_s:* AND (schema_s:' + schema.join(' OR schema_s:') + ')',
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
                                //CalculateFacets();
                                calculateListViewFacets();
                            })
                            .finally(function(){
                                $scope.loading = false;
                                reloadDetails = false;
                            });

                        }
                    }


                    //====================================================
                    function loadCountries() {
                        $scope.loading = true;
                        commonjs.getCountries()
                            .then(function(countries) {

                                countryProfile.ratifications = 0;
                                countryProfile.signatures = 0;
                                countryProfile.parties = 0;
                                countryProfile.countriesforAutocomplete = [];
                                countryProfile.inbetweenParties = 0;
                                countryProfile.nonCBDParties = 0
                                countryProfile.totalParties=0;
                                countryProfile.totalNonParties=0;

                                $scope.countries = countries;


                              if ($routeParams.countryCode && $routeParams.countryCode.toUpperCase()!='RAT') {

                                  var country = _.findWhere($scope.countries, {code : $routeParams.countryCode.toUpperCase()})
                                  if(country){
                                    country.displayDetails=true;
                                    country.profileCode = $routeParams.countryCode.toUpperCase();
                                  }
                              }

                            })
                           .finally(function(){$scope.loading = false;});
                        //$scope.countries = $filter("orderBy")(response[1].data, "name.en");
                    }



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


                    // //====================================================
                    // $scope.hasFacets = function(entity) {
                    //
                    //     for (var i = 0; i < $scope.commonFormatFacets.length; i++) {
                    //         var data = $scope.commonFormatFacets[i];
                    //
                    //         if (data[0] == $scope.selected_facet) {
                    //             return data[1].countries.indexOf(entity.code.toLowerCase()) >= 0
                    //         }
                    //     }
                    //
                    //     return false;
                    // }

                    $scope.hasRecordType = function(entity){

                          if(!$scope.selected_recordType || $scope.selected_recordType == 'all')
                            return true;

                        return entity[$scope.selected_recordType.toUpperCase()]!=undefined;

                    }

                    //====================================================
                    $scope.hasStatus = function(entity) {
                        var query = $scope.query;
                        if(!entity)
                            return false;

                        if(query && (query.isParties || query.isNonParties || query.isSignatories || query.isInbetweenParties )){
                            if(_.size($scope.query)>1){
                                return (    (!query.isParties           || query.isParties && entity.isNPParty)&&
                                            (!query.isNonParties        || query.isNonParties && !entity.isNPParty)&&
                                            (!query.isInbetweenParties  || query.isInbetweenParties && entity.isNPInbetweenParty)
                                        );
                            }
                            else{
                                return (    (query.isParties && entity.isNPParty)||
                                            (query.isNonParties && !entity.isNPParty)||
                                            (query.isInbetweenParties && entity.isNPInbetweenParty)
                                        );
                            }
                        }
                        return true;
                    }
                    //====================================================
                    $scope.listAll = function(status) {
                        $scope.searchFilter = '';
                        $scope.countryFilter = '';

                        partyFilter = true

                    }

                    //====================================================



                    //====================================================
                    function calculateListViewFacets() {

                        _.each($scope.countries, function(country) {
                            // country.NFP     = undefined;// country.NDB     = undefined;// country.CNA     = undefined;// country.MSR     = undefined;// country.IRCC    = undefined;// country.CP      = undefined;// country.CPC     = undefined;// country.Total     = undefined;
                            var countryFacet = _.where($scope.countryFacets["government_s,schema_s"], {
                                value: country.code.toLowerCase()
                            });
                            if (countryFacet.length > 0) {
                                countryFacet[0].pivot.forEach(function(document) {
                                    country[$filter("schemaShortName")(document.value.toLowerCase())] = document.count;
                                    country.total     = (country.total ? country.total : 0) + document.count;
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
                        } else if ($scope.sortTerm == "NFP") {
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

                    $scope.clear = function(){

                        $scope.filterSchemaApi.unSelectItem({identifier:$scope.filterSchema});
                        $scope.selected_facet='all';

                    }

                    //loadCountries();
                    //loadCountryMapDetails();


                    $scope.showCountryProfile = function(country){

                       // country.api.loadCountryDetails(country.code);
                        country.profileCode = country.code;
                    }

                    $scope.totalFacetCount = function(countries, type){

                        var typeFacets = _.filter(countries, function(country){
                            return country[type]!=undefined;
                        });
                        var count = _.reduce(typeFacets,function(memo, country){ return memo + country[type]; },0);
                        if(count>0)
                            return count;

                         return;
                    };

                    $element.find('[data-toggle="tooltip"]').tooltip();
                    loadCountries();
                    loadCountryMapDetails();
                }
            ]

        };
    });
});





/********************************************/
//function CalculateFacets() {
//     var tempFacets = {};
//     // console.log($scope.countryFacets['government_s,schema_s'])
//     var count = 0;
//     _.each($scope.countryFacets['government_s,schema_s'], function(data) {
//         if (data.value == 'eur')
//             data.value = 'eu';
//         _.each(data.pivot, function(facets) {
//             if (facets.value == 'focalPoint' && tempFacets[facets.value]) {
//                 count++;
//             }
//             tempFacets[facets.value] = {
//                 "facetCount": (tempFacets[facets.value] ? tempFacets[facets.value].facetCount : 0) + facets.count,
//                 "countryCount": (tempFacets[facets.value] ? tempFacets[facets.value].countryCount : 0) + 1,
//                 "countries": (tempFacets[facets.value] ? tempFacets[facets.value].countries : '') + data.value + ','
//             };
//         });
//
//     });
//     // console.log(count, countryC)
//     $scope.commonFormatFacets = _.pairs(tempFacets);
//     // console.log($scope.commonFormatFacets)
// }
//
// //====================================================
// $scope.$watch("query.recordType", function(val) {
//
//     if(!val){
//         $scope.selected_recordType='all';
//         $scope.recordTypeFilter = $scope.hasRecordType;
//         $scope.sortTable('name.en', 'ASC')
//
//         return;
//     }
//     else{
//         $scope.selected_recordType= val;//$filter('mapSchema')(val);
//         $scope.recordTypeFilter = $scope.hasRecordType;
//         $scope.sortTable(val.toUpperCase());
//         return;
//     }
//
//
// })

//
//
//     //====================================================
//     $scope.nationalRecords = [{
//         identifier: 'authority',
//         title: 'Competent National Authority'
//     }, {
//         identifier: 'measure',
//         title: 'Legislative, administrative or policy measures'
//     }, {
//         identifier: 'absCheckpoint',
//         title: 'ABS Checkpoint'
//     }, {
//         identifier: 'database',
//         title: 'National Website or Database'
//     }, {
//         identifier: 'focalPoint',
//         title: 'ABS National Focal Point'
//     }, {
//         identifier: 'absPermit',
//         title: 'Internationally Recognized Certificate of Compliance'
//     }, {
//         identifier: 'absCheckpointCommunique',
//         title: 'Checkpoint Communiqués '
//     }, ];
//
//
//    // ====================================================
//     // $scope.$watch("query.partyStatus", function(val) {
//     //
//     //   if(!val){
//     //         $scope.selected_status = 'all';
//     //         $scope.partyStatusFilter = $scope.hasStatus;
//     //         $scope.sortTable('name.en', 'ASC')
//     //     }
//     //
//     //     if(val == 'parties'){
//     //          $scope.selected_facet='party';
//     //         $scope.selected_status = 'party';
//     //         $scope.sortTable('name.en', 'ASC')
//     //     }
//     //
//     //     if(val == 'nonParties'){
//     //         $scope.selected_facet='nonParties';
//     //         $scope.selected_status = 'nonParties';
//     //         $scope.sortTable('name.en', 'ASC')
//     //     }
//     // })

// //====================================================
// $scope.navigateCountry = function(event, code, region) {
//     $('.jqvmap-label').html('');
//     code = code.toUpperCase();
//     //tiwan should be shown as China
//     if (code == taiwan)
//         code = china
//     if (code == greenland) //greenland  as denmark
//         code = denmark
//         $timeout(function(){$location.path('/countries/' + code)},1);
//     // $scope.$emit('loadCountryProfile', {
//     //     'data': {
//     //         countryCode: code,
//     //         lastAction: $scope.lastAction,
//     //         searchFilter: $scope.searchFilter
//     //     }
//     // });
// }
//
// //====================================================
// function showCountryDetails(event, label, code) {
//     code = code.toUpperCase();
//     //tiwan should be shown as China
//     if (code == taiwan)
//         code = china
//         // if (code == greenland) //greenland  as denmark
//         //   code = denmark
//         // console.log(code,$scope.countries);
//     var country = _.where($scope.countries, {
//         code: code.toUpperCase()
//     })
//     var countryFacet = _.where($scope.countryFacets["government_s,schema_s"], {
//         value: code.toLowerCase()
//     })
//
//     var cfHtml = '';
//     var countryName = code;
//     var headerClass = "panel-default"
//     if (country.length > 0) {
//         countryName = country[0].name.en;
//
//         if (country[0].isNPParty) {
//             headerClass = "panel-primary"
//             cfHtml += '<li class="list-group-item"><span class="label label-primary">Ratified</span></li>'
//         } else if (country[0].isNPInbetweenParty) {
//             headerClass = "panel-default"
//             cfHtml += '<li class="list-group-item"><span class="label label-default">Ratified</span>' +
//                 '</br><span class="label label-success">entry into force on ' + country[0].entryIntoForce + '</span></li>'
//         } else if (country[0].isNPSignatory) {
//             headerClass = "panel-info"
//             cfHtml += '<li class="list-group-item"><span class="label label-info">Signatory</span></li>'
//         } else if (country[0].isCBDParty) {
//             headerClass = "panel-default"
//             cfHtml += '<li class="list-group-item"><span class="label label-default">Not Ratified/CBD party</span></li>'
//         }
//     }
//     if (countryFacet.length > 0) {
//         countryFacet[0].pivot.forEach(function(document) {
//             cfHtml += '<li class="list-group-item" style="color:black">' +
//                 '    <span class="badge">' + document.count + '</span>' +
//                 $filter("schemaShortName")(document.value.toLowerCase()) + ' </li>'
//         });
//     } else {
//         cfHtml += '<li class="list-group-item" style="color:black">No information available</li>'
//     }
//     label.html(
//         '<div style="min-width:150px;" class="panel ' + headerClass + '"><div class="panel-heading"><h3 class="panel-title">' + countryName + '</h3>' +
//         '</div> <div class="panel-body"><ul class="list-group">' + cfHtml + '</ul></div></div>'
//
//     );
// }

//
// //====================================================
// $scope.updateMap = function(action) {
//
//
//     _.each($scope.countries, function(country) {
//         $("#jqvmap" + getMapIndex() + "_" + country.code.toUpperCase()).attr("fill", "#FFF");
//     });
//
//     //fix for taiwan
//     $("#jqvmap" + getMapIndex() + "_" + taiwan).attr("fill", "#FFF");
//     $("#jqvmap" + getMapIndex() + "_" + greenland).attr("fill", "#FFF");
//
//     if (action == 'signatory' || action == 'party' || action == 'nonParties' || action == 'all') {
//
//         $scope.searchFilter = $scope.hasStatus;
//         if (action == 'all' || action == 'nonParties') {
//             $("#jqvmap" + getMapIndex() + "_" + greenland).attr("fill", "#666");
//         }
//
//         _.each($scope.countries, function(country) {
//
//             if ((action == 'party' || action == 'signatory' || action == 'all') && country.isNPParty) {
//                 $("#jqvmap" + getMapIndex() + "_" + country.code.toUpperCase()).attr("fill", "#428bca");
//             }
//             else if ((action == 'nonParties' || action == 'all') && !country.isNPParty) {
//                 $("#jqvmap" + getMapIndex() + "_" + country.code.toUpperCase()).attr("fill", "#666");
//                 $("#jqvmap" + getMapIndex() + "_" + taiwan).attr("fill", "#666");
//             }
//             //for non CBD parties only
//             if(!country.isCBDParty && action == 'all'){
//                 $("#jqvmap" + getMapIndex() + "_" + country.code.toUpperCase()).attr("fill", "#666");
//             }
//
//         });
//     } else {
//
//         $scope.searchFilter = $scope.hasFacets;
//
//         $('#jqvmap1_EUR1').hide('slow');
//         _.each($scope.countryFacets['government_s,schema_s'], function(data) {
//             //console.log(("#jqvmap" + getMapIndex() + "_"+taiwan));
//             var colorCountry = false;
//             var search = _.where(data.pivot, {
//                 value: action
//             });
//             if (search.length > 0) {
//                 //console.log(data);
//                 if (data.value.toUpperCase() == 'EUR')
//                     $('#jqvmap1_EUR1').show('slow');
//
//                 $("#jqvmap" + getMapIndex() + "_" + data.value.toUpperCase()).attr("fill", "#333");
//                 //fix for taiwan
//                 if (data.value.toUpperCase() == china)
//                     $("#jqvmap" + getMapIndex() + "_" + taiwan).attr("fill", "#333");
//
//                 //   if (data.value.toUpperCase() == denmark)
//                 //     $("#jqvmap" + getMapIndex() + "_" + greenland).attr("fill", "#428bca");
//             }
//         });
//     }
// }
//
// //====================================================
// function getMapIndex(id) {
//     if (!id)
//         id = 1;
//
//         return id;
//     //the jvqmap increase its index when map is visisted multiple times
//     //hence get the index of any country and use it for all others
//     //TODO: check why
//     if ($("#jqvmap" + id + "_" + greenland).length == 0)
//       return getMapIndex(id + 1)
//
//     return id;
// }
// //====================================================
// $scope.slideMap = function(divShow, divHide) {
//
//     $(divHide).slideUp("slow");
//     $(divShow).slideDown("slow");
//
// }
// //====================================================
// $scope.$on('updateMap', function(evt, eventData) {
//
//     $scope.updateMap(eventData.data.type);
//     $scope.searchFilter = eventData.data.searchFilter;
//
// });
//====================================================
// function addEUMapEvents() {
//
//     $("#vmap").append("<div id=\"jqvmap1_EUR1\" class=\"europeanUnion jqvmap-zoomout flag-icon-background flag-icon-eur\" style=\"max-height:50px;max-width:100px;background-color:#eee\"></div>");
//
//     $('#jqvmap1_EUR1').on('click', function(e) {
//         $scope.navigateCountry(this, 'EUR', null);
//     });
//     $('#jqvmap1_EUR1').on('mouseout', function(e) {
//         $('.jqvmap-label').hide();
//     });
//     $('#jqvmap1_EUR1').on('mouseover', function(e) {
//         var maplabel = $('.jqvmap-label').last();
//         maplabel.hide();
//         maplabel.html('')
//         showCountryDetails(this, maplabel, 'EUR');
//         maplabel.show();
//         var left = e.pageX - 15 - maplabel.width();
//         var top = e.pageY - 15 - maplabel.height();
//
//         if (left < 0)
//             left = e.pageX + 15;
//         if (top < 0)
//             top = e.pageY + 15;
//
//         maplabel.css({
//             left: left,
//             top: top
//         });
//     });
// }
