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
			current_page = id;
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

					if(navigation_data.condition){
						var choiceMadeCount = 0
						_.forEach(navigation_data.condition, function(choice){
							if($scope.choicesMade.indexOf(choice)>=0){
								choiceMadeCount++;
							}
						});
						if(choiceMadeCount == navigation_data.condition.length ||
							navigation_data.condition.indexOf('none') >= 0 && choiceMadeCount==0){
								console.log($scope.choicesMade,choiceMadeCount,navigation_data.condition,navigation_data.condition.indexOf('none'))
							add_navigation(navigation_data.text, navigation_data.target);
						}

					}
					else
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
			$('#presentation').html('<img width="100%" height="200px" src="/app/views/help/' + template + '" />');
        }

        function add_choices(text, value) {
            $("#response").append("<input class=\"choice\" type=\"checkbox\" name=\"" + value + "\" value=\"" + value + "\" />" + text
								+ "</br>");

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
							  'points' : [{	'user' : [{'r' : 50,'b' : 37,'c' : 58}],'provider' : [{'r' : 50,'b' : 37,'c' : 58}]}]
						   },
						   {
							  'name' : 'providerDesignatingCheckpoints',
						      'text':'Slide - Provider Designating Checkpoints',
							  'template' : 'presentations/images/theatre-access/theatre-access.002.jpg',
						      'type':'choice',
						      'navigation':[
						         {
						            'text':'Continue.',
						            'target':'providerDesignating'
								}],
						      'choices':[
						         {
						            'text':'You designate the national patent office responsible for magic genetic resources.',
						            'value':'national patent office',
							  		'points' : [{'user' : [{'r' : 50,'b' : 37,'c' : 58}],'provider' : [{'r' : 50,'b' : 37,'c' : 58}]}]
								},{
						            'text':'You designate the WIZARD WORLD Review, a premier magic journal.',
						            'value':'WIZARD WORLD Review',
							  		'points' :[{'user' : [{'r' : 50,'b' : 37,'c' : 58}],'provider' : [{'r' : 50,'b' : 37,'c' : 58}]}]
								}],
							  'points' :[{'user' : [{'r' : 50,'b' : 37,'c' : 58}],'provider' : [{'r' : 50,'b' : 37,'c' : 58}]}]
						},
						   {
							  'name' : 'providerDesignating',
						      'text':'Slide - Provider Designating Checkpoints Continue',
							  'template' : 'presentations/images/theatre-access/theatre-access.003.jpg',
						      'type':'choice',
						      'navigation':[
								{
						            'text':'Whola.',
						            'target':'Destiny',
									'condition' : ['national patent office']
								},
								{
						            'text':'Whola  again',
						            'target':'DestinyD',
									'condition' : ['national patent office','WIZARD WORLD Review']
								},
								{
						            'text':'Nothing selected, you end up no where.',
						            'target':'',
									'condition' : ['none','national patent office','WIZARD WORLD Review']
								},
								{
						            'text':'Back',
						            'target':'providerDesignatingCheckpoints'
								}],
							  'points' :[{'user' : [{'r' : 50,'b' : 37,'c' : 58}],'provider' : [{'r' : 50,'b' : 37,'c' : 58}]}]
						   }
						];


			///blaise fonseca

		    load_page(current_page);
            $('#response').on('click', '.navigation', function () {
                var target = $(this).data('target');
				console.log(target)
				if(target.length>0)
                	load_page(target);
            });

			$scope.choicesMade = [];
			$('#response').on('change', '.choice', function () {
				var val = this.value;//.replace('_yes','').replace('_no', '');
				var negate = false;

				if(!this.checked)
					negate = true;
				$timeout(function(){
					if(!negate)
						$scope.choicesMade.push(val);
					else{
						$scope.choicesMade.remove(val);
					}
					// $scope.choicesMade = _.uniq($scope.choicesMade);
					 console.log($scope.choicesMade);
				},10);

	            var page_data = _.where($scope.PAGES, {name : current_page})[0];
				var choicespoints = _.where(page_data.choices, {value : val});
				if(choicespoints.length > 0){

						if(!$scope.userPoints)
							$scope.userPoints = [];
						var pointCal = $scope.userPoints;
						$scope.calculatePoints(choicespoints[0].points[0].user[0], pointCal, negate)
						$timeout(function(){
							$scope.userPoints = pointCal
						},10);

						if(!$scope.providerPoints)
							$scope.providerPoints = [];
						var pointCal1 = $scope.providerPoints;
						$scope.calculatePoints(choicespoints[0].points[0].provider[0], pointCal1, negate)
						$timeout(function(){
							$scope.providerPoints = pointCal1
						},10);
				}

            });

			$scope.calculatePoints = function(pointArray, pointCal, negate){
				_.forEach(_.pairs(pointArray), function(data){
					var existing = _.where(pointCal, {type : data[0]});
					if(existing.length == 0)
						pointCal.push({type : data[0], score : (negate ? -1 : 1)  * data[1]});
					else
						existing[0].score = existing[0].score + (negate ? -1 : 1)  * data[1]
				})
			}

			$scope.sumPoints = function(existingPoints, type, entity){

				if(entity == 'user'){
					if($scope.userChoicePoints){
						var points = _.where($scope.userChoicePoints, {type : type})[0];
						return existingPoints + points.score;
					}
					return existingPoints;
				}

				if(entity == 'provider'){
					if($scope.providerChoicePoints){
						var points = _.where($scope.providerChoicePoints, {type : type})[0];
						console.log(points, 'provider');
						return existingPoints + points.score ;
					}
					return existingPoints;
				}
			}


			Object.defineProperty(Array.prototype, "remove", {
			    enumerable: false,
			    value: function (item) {
			        var removeCounter = 0;

			        for (var index = 0; index < this.length; index++) {
			            if (this[index] === item) {
			                this.splice(index, 1);
			                removeCounter++;
			                index--;
			            }
			        }
			        return removeCounter;
			    }
			});



   }]);
});
