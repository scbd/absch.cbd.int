import app from 'app';


//require("app", "dragAndDrop")

app.controller("presentationController",
	["$rootScope", "$location" , "$scope", "$q", "$window", "IStorage", "lodash",
	 "$compile", "$timeout","lstringFilter", "$routeParams",
	 function ($rootScope, $location, $scope, $q, $window, storage, _,
	  $compile,$timeout,lstringFilter, $routeParams) {


		var current_page = 'start';

        function load_page(id) {

            // Fetch JSON for page data associated with given ID
            var page_data = _.where($scope.PAGES, {name : id})[0];
			current_page = id;
            clear_page();


			if (page_data.text) {
				console.log(typeof(page_data.text))
			  if(angular.isObject(page_data.text))
	                for (var navigation in page_data.text) {
	                    var navigation_data = page_data.text[navigation];
						if(!navigation_data.condition || (navigation_data.condition && validateCondition(navigation_data)))
							set_page_text(navigation_data.text, 'page_data.name');
	                }
			  else
					set_page_text(page_data.text, 'page_data.name');
            }

			if (page_data.template) {
				//console.log(typeof(page_data.text))
			  if(angular.isObject(page_data.template))
                for (var navigation in page_data.template) {
                    var navigation_data = page_data.template[navigation];
					if(!navigation_data.condition || (navigation_data.condition && validateCondition(navigation_data)))
						set_page_template(navigation_data.slide);
                }
			  else
					set_page_template(page_data.template);
            }



			if (page_data.choices) {
                for (var choice in page_data.choices) {
                    var choice_data = page_data.choices[choice];
                    add_choices(choice_data.text, choice_data.value);
                }
            }

			if (page_data.navigation) {
	                for (var navigation in page_data.navigation) {
	                    var navigation_data = page_data.navigation[navigation];
						if(!navigation_data.condition || (navigation_data.condition && validateCondition(navigation_data)))
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
		function validateCondition(data){
			var choiceMadeCount = 0
			_.forEach(data.condition, function(choice){
				if($scope.choicesMade.indexOf(choice)>=0){
					choiceMadeCount++;
				}
			});
			if(choiceMadeCount == data.condition.length ||
				data.condition.indexOf('none') >= 0 && choiceMadeCount==0){
				return true;
			}
			return false;
		}

        function set_page_text(text, name) {
			//"<div ></div>
            $("#page_text").append("<p id=\"presentation\"" + name  +">" + text + "</p>");
			//$('#presentation').html('<img width="100%" height="200px" src="/app/views/help/' + template + '" />');
        }
        function set_page_template(template) {

			$('#presentation').append('<img width="100%" height="200px" src="/app/views/help/' + template + '" />');
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
							  'name' : 'start',
						      'text':'Slide - Start',
							  'template' : 'presentations/images/theatre-access/theatre-access.001.jpg',
						      'type':'choice',
						      'navigation':[
						         {
						            'text':'Continue.',
						            'target':'selectMSR'
								}]
						   },


						   {
							  'name' : 'selectMSR',
						      'text':'Slide - select measures',
							  'template' : 'presentations/images/theatre-access/theatre-access.002.jpg',
						      'type':'choice',

						      'navigation':[
						         {
						            'target':'selectCP',
									'text':'good MSR',
						            'value':'goodMSR',
							  		'points' : [{'user' : [{'r' : 1,'b' : 1,'c' : 1}],'provider' : [{'r' : 1,'b' : 1,'c' : 1}]}]
								},
								{
						            'target':'selectCP',
									'text':'bad MSR',
						            'value':'badMSR',
							  		'points' :[{'user' : [{'r' : -5,'b' : -5,'c' : -5}],'provider' : [{'r' : -5,'b' : -5,'c' : -5}]}]
								}]

						},
						   {
							  'name' : 'selectCP',
						      'text':[
								{
						            'text':'now select your checkpoints',
									'condition' : ['none']
								},
								{
						            'text':'you selected a good msr',
									'condition' : ['goodMSR']
								},
								{
						            'text':'you selected a bad msr',
									'condition' : ['badMSR']
								}
								],
							  'template' : 'presentations/images/theatre-access/theatre-access.003.jpg',
						      'type':'choice',
						      'choices':[
								{
						            'text':'cp - patent office.',
							  		'points' :[{'user' : [{'r' : 50,'b' : 37,'c' : 58}],'provider' : [{'r' : 50,'b' : 37,'c' : 58}]}],
									'value' : 'patentoffice',
									'condition':['none']
								},
								{
						            'text':'cp = wizard world',
						            'points' :[{'user' : [{'r' : 50,'b' : 37,'c' : 58}],'provider' : [{'r' : 50,'b' : 37,'c' : 58}]}],
									'value' : 'cp-wizardworld',
									'condition':['none']
								}
								],
							  'points' :[{'user' : [{'r' : 50,'b' : 37,'c' : 58}],'provider' : [{'r' : 50,'b' : 37,'c' : 58}]}]
						},

						{
							  'name' : 'WizardWorld',
						      'text':[

								{
						            'text':'this is NOT a checkpoint',
									'condition' : ['none']
								},
								{
						            'text':'this is a checkppoint',
									'condition' : ['cp-wizardworld']
								}
								],
							  'template' : 'presentations/images/theatre-access/theatre-access.004.jpg',
						      'type':'choice',
						      'choice':[
								{
						            'text':'cp - patent office.',
							  		'points' :[{'user' : [{'r' : 50,'b' : 37,'c' : 58}],'provider' : [{'r' : 50,'b' : 37,'c' : 58}]}],
									'value' : 'patentoffice',

								},
								{
						            'text':'cp = wizard world',
						            'points' :[{'user' : [{'r' : 50,'b' : 37,'c' : 58}],'provider' : [{'r' : 50,'b' : 37,'c' : 58}]}],
									'value' : 'wizardworld'
								},
								{
						            'text':'none.',
								}],
							  'points' :[{'user' : [{'r' : 50,'b' : 37,'c' : 58}],'provider' : [{'r' : 50,'b' : 37,'c' : 58}]}]
						   }
						];


			///blaise fonseca

		    load_page(current_page);
            $('#response').on('click', '.navigation', function () {
                var target = $(this).data('target');

				var page_data = _.where($scope.PAGES, {name : current_page})[0];
				var navigation = _.where(page_data.navigation, {target : target});
				if(navigation.length > 0){
					if(navigation[0].points){
						var pointCal = $scope.userPoints;
						$scope.calculatePoints(navigation[0].points[0].user[0], pointCal, false)
						$timeout(function(){
							$scope.userPoints = pointCal
						},10);

						if(!$scope.providerPoints)
							$scope.providerPoints = [];
						var pointCal1 = $scope.providerPoints;
						$scope.calculatePoints(navigation[0].points[0].provider[0], pointCal1, false)
						$timeout(function(){
							$scope.providerPoints = pointCal1
						},10);
					}
					if(navigation[0].value){
						$scope.choicesMade.push(navigation[0].value);
					}
				}


			//	console.log(target)
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
					 //console.log($scope.choicesMade);
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
				if(!pointCal)
					pointCal = [];
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
						//console.log(points, 'provider');
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

