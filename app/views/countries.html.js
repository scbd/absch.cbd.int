define(['app',  'directives/angucomplete-extended', 'jqvmap', 'jqvmapworld'], function (app,angucomplete) {

    app.controller("CountriesController", ["$scope", "authHttp","underscore","$q","$filter","$timeout", "$location","realm","$routeParams",
     function ($scope, $http, _, $q,$filter,$timeout, $location, realm, $routeParams) {

    	//*******************************************************
        var queryFacetsParameters = {
            //realm_ss:absch OR realm_ss:ABS)
                    'q': '(realm_ss:' + realm.value.toLowerCase() + ' or realm_ss:absch) AND NOT version_s:*',
                    'fl': '', 		//fields for results.
                    'wt': 'json',
                    'rows': 0,		//limit
                    'facet': true,	//get counts back
                    'facet.pivot': 'government_s,schema_s',
                    'limit':512
                };
    	var countryFacets = $http.get('/api/v2013/index/select', { params: queryFacetsParameters })
        var countries = $http.get('/api/v2013/countries');
        var countryColors = {};
        $q.all([countryFacets, countries]).then(function (response) {

            $scope.countryFacets = response[0].data.facet_counts.facet_pivot;
            $scope.countries = response[1].data;

            $scope.selected_circle="party";
            $scope.ratifications = 0;
            $scope.signatures = 0;
            $scope.showMap = true;
            $scope.parties = 0;
            $scope.countriesforAutocomplete = [];
            $scope.inbetweenParties = 0;

            for (var i = 0; i < $scope.countries.length; i++) {

                if ($scope.countries[i].treaties.XXVII8b.instrument == "ratification"
                	|| $scope.countries[i].treaties.XXVII8b.instrument == "accession"
                	|| $scope.countries[i].treaties.XXVII8b.instrument == "acceptance"
                  || $scope.countries[i].treaties.XXVII8b.instrument == "approval"
                  || $scope.countries[i].code == 'EU') {
                    $scope.ratifications++;
                    $scope.countries[i].isRatified = true;
                    if($scope.countries[i].code == 'EU')
                      $scope.countries[i].code = 'EUR'; //temp fix for EU
                    countryColors[$scope.countries[i].code.toLowerCase()] = "#428bca";
                }
                if ($scope.countries[i].treaties.XXVII8b.signature != null ) {
                    $scope.signatures++;
                    $scope.countries[i].isSignatory = true;
                    if(!countryColors[$scope.countries[i].code.toLowerCase()])
                        countryColors[$scope.countries[i].code.toLowerCase()] = "#5bc0de";
                }
                if($scope.countries[i].treaties.XXVII8.party != null){
                  $scope.parties++;
                  $scope.countries[i].isParty = true;
                  if(!countryColors[$scope.countries[i].code.toLowerCase()])
                      countryColors[$scope.countries[i].code.toLowerCase()] = "#808080";
                }

                if($scope.countries[i].isParty)
                    $scope.countriesforAutocomplete.push({name:$scope.countries[i].name.en});

                    // console.log(moment().diff(moment($scope.countries[i].treaties.XXVII8b.deposit),'days'))
                if(moment().diff(moment($scope.countries[i].treaties.XXVII8b.deposit),'days')<90){
                    $scope.countries[i].inbetweenParties = true;
                    $scope.inbetweenParties++;
                }
                //
            }

            countryColors['tw'] = "#808080";
            countryColors['gl'] = "#428bca";

             loadMap(countryColors);
             $scope.slideMap('#mapDiv','#listDiv');
             CalculateFacets();
            //  console.log($routeParams.commonFormat)
            if($routeParams.commonFormat)
            {
                $scope.searchFilter=$scope.isRatified;
                $scope.updateMap('ratified');
            }
        });

        var today= moment();
        var entry= moment("20141012", "YYYYMMDD");
        $scope.Math = window.Math;
        $scope.daysUntilEntry = $scope.Math.floor(entry.diff(today, 'milliseconds', true)/86400000);

        $scope.orderList = true;
       	$scope.sortTerm = 'treaties.XXVII8b.deposit';

       	 //==================================
       	 $scope.sortTable = function (term) {

       	     if ($scope.sortTerm == term) {
       	         $scope.orderList = !$scope.orderList;
       	     }
       	     else {
       	         $scope.sortTerm = term;
       	         $scope.orderList = true;
       	     }
       	 }

         $scope.isPartyToCBD= function(entity){
            $scope.selected_circle="party";
            return entity && entity.treaties.XXVII8.party != null;
         }

         $scope.isInbetweenParties= function(entity){
            $scope.selected_circle="inbetweenParties";
            return entity && entity.inbetweenParties;
         }

         $scope.isSignatory = function(entity){
            $scope.selected_circle="signatory";
            return entity && entity.treaties.XXVII8b.signature != null;
         }

         $scope.isRatified= function(entity){
            $scope.selected_circle="ratified";
            return entity && (entity.treaties.XXVII8b.instrument == "ratification" ||
                              entity.treaties.XXVII8b.instrument == "accession" ||
                              entity.treaties.XXVII8b.instrument == "acceptance"
                              || entity.treaties.XXVII8b.instrument == "approval" );
         }

         $scope.hasFacets= function(entity){
            // console.log($scope.commonFormatFacets,$scope.selected_facet);

             for(var i=0; i<$scope.commonFormatFacets.length;i++){
                 var data = $scope.commonFormatFacets[i];

                 if(data[0] == $scope.selected_facet){
                     //console.log(data[1].countries,(entity.code.toLowerCase()));
                     return data[1].countries.indexOf(entity.code.toLowerCase())>=0
                }
             }

            return false;
         }

         function loadMap(colors){

            if(!colors)
                colors = this.countryColors;
            jQuery('#vmap').vectorMap(
                {
                    map: 'world_en',
                    backgroundColor: '#EEE',
                    selectedColor: '#666666',
        		    enableZoom: true,
        		    showTooltip: true,
        		    colors: colors,
                    hoverColor: false,
                    onRegionClick: function(event, code, region)
                    {
                        $('.jqvmap-label').html('');
                        $timeout(function(){
                            $location.path('countries/' + code.toUpperCase())},1)
                    },
                    onLabelShow: function(event, label, code)
                    {

                            //tiwan should be shown as China
                            if(code == 'tw')
                                code = 'cn'
                            if(code == 'gl')//greenland  as denmark
                                code = 'dk'
                            // console.log(code);
                            var country = _.where($scope.countries, {code: code.toUpperCase()})
                            var countryFacet = _.where($scope.countryFacets["government_s,schema_s"], {value: code})

                            var cfHtml = '';
                            var countryName = code;
                            var headerClass = "panel-default"
                            if(country.length > 0){
                                countryName = country[0].name.en;

                                if($scope.isRatified(country[0])){
                                    headerClass = "panel-primary"
                                    if($scope.isInbetweenParties(country[0])){
                                        cfHtml += '<li class="list-group-item"><span class="label label-primary">Ratified</span>&nbsp;<span class="label label-success">in-between Party</span></li>'
                                    }
                                    else
                                        cfHtml += '<li class="list-group-item"><span class="label label-primary">Ratified</span></li>'
                                }
                                else if($scope.isSignatory(country[0])){
                                    headerClass = "panel-info"
                                    cfHtml += '<li class="list-group-item"><span class="label label-info">Signatory</span></li>'
                                }
                                else if($scope.isPartyToCBD(country[0])){
                                    headerClass = "panel-default"
                                    cfHtml += '<li class="list-group-item"><span class="label label-default">Not Ratified/CBD party</span></li>'
                                }
                            }
                            if(countryFacet.length>0){
                                countryFacet[0].pivot.forEach(function(document){
                                    cfHtml +=    '<li class="list-group-item" style="color:black">'+
                                                '    <span class="badge">'+ document.count +'</span>'+
                                                $filter("schemaShortName")(document.value.toLowerCase()) + ' </li>'
                                });
                            }
                            else{
                                cfHtml += '<li class="list-group-item" style="color:black">No information available</li>'
                            }
                        label.html(
                            '<div style="min-width:150px;" class="panel ' + headerClass + '"><div class="panel-heading"><h3 class="panel-title">' + countryName + '</h3>'+
                            '</div> <div class="panel-body"><ul class="list-group">'+ cfHtml +'</ul></div></div>'

                        );
                    }

                }
            );

            $('.jqvmap-zoomin').html('<i class="glyphicon glyphicon-plus"/>')
            $('.jqvmap-zoomout').html('<i class="glyphicon glyphicon-minus"/>')
        //    console.log(map);
        }

        $scope.updateMap = function(action){

            $scope.selected_facet= action

            _.each($scope.countries, function(country){
            //    console.log(country);
                    $("#jqvmap" + getMapIndex() + "_"+country.code.toLowerCase()).attr("fill", "#fff");
            });
            //fix for taiwan
            $("#jqvmap" + getMapIndex() + "_tw").attr("fill", "#fff");
            $("#jqvmap" + getMapIndex() + "_gl").attr("fill", "#fff");
            if(action == 'signatory' || action == 'party' || action == 'ratified' || action=='inbetweenParties'){
                _.each($scope.countries, function(country){
                    //console.log(country);
                    if((action == 'party' || action=='ratified' || action == 'inbetweenParties') && country.inbetweenParties){
                        $("#jqvmap" + getMapIndex() + "_"+country.code.toLowerCase()).attr("fill", "#5cb85c");
                    }
                    else if((action == 'party' || action == 'ratified') && country.isRatified){
                        $("#jqvmap" + getMapIndex() + "_"+country.code.toLowerCase()).attr("fill", "#428bca");
                        $("#jqvmap" + getMapIndex() + "_gl").attr("fill", "#428bca");
                    }
                    else if((action == 'party' || action == 'signatory') && country.isSignatory)
                        $("#jqvmap" + getMapIndex() + "_"+country.code.toLowerCase()).attr("fill", "#5bc0de");
                    else if(action == 'party' && country.isParty){
                         $("#jqvmap" + getMapIndex() + "_"+country.code.toLowerCase()).attr("fill", "#808080");
                         $("#jqvmap" + getMapIndex() + "_tw").attr("fill", "#808080");
                    }
                });
            }
            else{
                    $scope.searchFilter = $scope.hasFacets;
                    _.each($scope.countryFacets['government_s,schema_s'], function(data){
                        console.log(("#jqvmap" + getMapIndex() + "_tw"));
                        var colorCountry = false;
                        var search = _.where(data.pivot, {value:action});
                        if(search.length>0){
                            $("#jqvmap" + getMapIndex() + "_"+data.value.toLowerCase()).attr("fill", "#428bca");
                            //fix for taiwan
                            if(data.value.toLowerCase()=='cn')
                                $("#jqvmap" + getMapIndex() + "_tw").attr("fill", "#808080");

                            if(data.value.toLowerCase()=='dk')
                                $("#jqvmap" + getMapIndex() + "_gl").attr("fill", "#428bca");
                        }
                    });
            }
        }

        $scope.isSelected = function(facet){

            //
            return facet == $scope.selected_facet;
        }

        function getMapIndex(id){
            if(!id)
                id = 1;
            if($("#jqvmap" + id + "_gl").length == 0)
                return getMapIndex(id+1)

            return id;
        }

        function CalculateFacets(){
            var tempFacets = {};
            _.each($scope.countryFacets['government_s,schema_s'], function(data){
                _.each(data.pivot, function(facets){
                    tempFacets[facets.value] = {"facetCount" : (tempFacets[facets.value] ? tempFacets[facets.value].facetCount : 0) + facets.count,
                                                "countryCount" : (tempFacets[facets.value] ? tempFacets[facets.value].countryCount : 0) + 1,
                                                "countries" : (tempFacets[facets.value] ? tempFacets[facets.value].countries : '') + data.value + ','};
                });

            });
            $scope.commonFormatFacets = _.pairs(tempFacets);
            //console.log($scope.commonFormatFacets)
        }

        $scope.slideMap = function(divShow,divHide){

            $(divHide).slideUp( "slow" );
            $(divShow).slideDown( "slow" );

        }



    }]);
// });
});
