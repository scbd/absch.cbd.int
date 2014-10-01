define(['app'], function (app) {

"use strict";
//require("app", "dragAndDrop")

app.controller("presentationController",
	["$rootScope", "$location" , "$scope", "$q", "$window", "IStorage", "underscore",
	 "schemaTypes", "$compile", "$timeout","lstringFilter", "$routeParams",
	 function ($rootScope, $location, $scope, $q, $window, storage, _,
	  schemaTypes,$compile,$timeout,lstringFilter, $routeParams) {


		var current_page = 'theUser';

        function load_page(id) {

            // Fetch JSON for page data associated with given ID
            var page_data = _.where($scope.PAGES, {name : id})[0];

            clear_page();
            set_page_text(page_data.text, 'page_data.name', page_data.template);
            if (page_data.choices) {
                for (var choice in page_data.choices) {
                    var choice_data = page_data.choices[choice];
                    add_choices(choice_data.text, choice_data.value);
                }
            }

			if (page_data.navigation) {
                for (var navigation in page_data.navigation) {
                    var navigation_data = page_data.navigation[navigation];
                    add_navigation(navigation_data.text, navigation_data.target);
                }
            }
			if(page_data.points){
				if(page_data.points[0].user){
					if(!$scope.userPoints)
						$scope.userPoints = [];
					var pointCal = $scope.userPoints;
					_.forEach(_.pairs(page_data.points[0].user[0]), function(data){
						var existing = _.where(pointCal, {type : data[0]});
						if(existing.length == 0)
							pointCal.push({type : data[0], score : data[1]});
						else
							existing[0].score = existing[0].score + data[1]
					})
					$timeout(function(){
						$scope.userPoints = pointCal
					},10);
				}

				if(page_data.points[0].provider){
					if(!$scope.providerPoints)
						$scope.providerPoints = [];

					var pointCal1 = $scope.providerPoints;
					_.forEach(_.pairs(page_data.points[0].provider[0]), function(data){
						var existing1 = _.where(pointCal1, {type : data[0]});
						if(existing1.length == 0)
							pointCal1.push({type : data[0], score : data[1]});
						else
							existing1[0].score = existing1[0].score + data[1]
					})

					$timeout(function(){
						$scope.providerPoints = pointCal1
					},10);
				}
			}

        }

        function set_page_text(text, name,template) {
			//"<div ></div>
            $("#page_text").append("<p id=\"presentation\"" + name  +">" + text + "</p>");
			$('#presentation').html('<img width="100%" src="/app/views/help/' + template + '" />');
        }

        function add_choices(text, value) {
            $("#response").append(text + "<input class=\"choice\" type=\"radio\" name=\"" + value + "\" value=\"" + value + "\" /> Yes "
								+ "<input class=\"choice\" type=\"radio\" name=\"" + value + "\" value=\"" + value + "\" /> No </br>");

        }

        function add_navigation(text, target) {
            $("#response").append("<button class=navigation data-target=" + target + ">" + text + "</button>");

        }

        function clear_page() {
            $("#page_text").empty();
            $("#response").empty();
        }

        // Page data
		// $scope.choicesMade = [];//['blaise fonseca', 'Schnell fonseca'];
        $scope.PAGES = [
						   {
							  'name' : 'theUser',
						      'text':'Slide - The User',
							  'template' : 'presentations/images/theatre-access/theatre-access.001.jpg',
						      'type':'choice',
						      'navigation':[
						         {
						            'text':'Continue.',
						            'target':'providerDesignatingCheckpoints'
								}],
							  'points' : [{
											'user' : [{
												'r' : 1,
												'b' : 0,
												'c' : 0
											}],
											'provider' :  [{
												'r' : 0,
												'b' : 0,
												'c' : 0
											}]
										 }]
						   },
						   {
							  'name' : 'providerDesignatingCheckpoints',
						      'text':'Slide - Provider Designating Checkpoints',
							  'template' : 'presentations/images/theatre-access/theatre-access.002.jpg',
						      'type':'choice',
						      'navigation':[
						         {
						            'text':'Continue.',
						            'target':1
								},
								{
						            'text':'back.',
						            'target':'theUser'
								}],
						      'choices':[
						         {
						            'text':'You designate the national patent office responsible for magic genetic resources.',
						            'value':'national patent office'
								},{
						            'text':'You designate the WIZARD WORLD Review, a premier magic journal.',
						            'value':'WIZARD WORLD Review'
								}],
							  'points' : [{
											'user' : [{
												'Relationsship' : 50,
												'Type2' : 37,
												'Mat' : 58
											}],
											'provider' :  [{
												'Relationsship' : 11,
												'Type2' : 16,
												'Mat' : 19
											}]
										 }]
						   }
						];


			///blaise fonseca

		    load_page(current_page);
            $('#response').on('click', '.navigation', function () {
                var target = $(this).data('target');
                load_page(target);
            });

			$scope.choicesMade = [];
			$('#response').on('change', '.choice', function () {
				var val = this.value;
				$timeout(function(){$scope.choicesMade.push(val)},10);
            });







   }]);
});
