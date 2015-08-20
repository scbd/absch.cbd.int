define(['app', 'underscore'], function (app, _) {
	app.directive('help', function($http){
		return{
			restrict: 'EAC',
			replace:true,
			transclude:true,
			templateUrl: '/app/views/directives/help-directive.html',
			scope:true,
			link:function($scope, $q, $element){
				
				
				// $q.when(help)
				//   .then(function(){
					  
					 //console.log( $element.find('#helpid'));
					  $scope.helpText = 'This is a test dear.';
					 // console.log($element)
					  
				  // })
				  
            $scope.help = [
              {
                "schema": "absch-nr",
                "elementName": "part1",
                "helptype": "section",
                "fields" :{
                          "government": {
                            "en": "GUIDELINES FOR THE government"
                          },
                          "name": {
                            "en": "GUIDELINES FOR THE name"
                          },
                          "address": {
                            "en": "GUIDELINES FOR THE address"
                          },
                          "city": {
                            "en": "GUIDELINES FOR THE city"
                          },
                          "state": {
                            "en": "GUIDELINES FOR THE state"
                          },
                          "postalcode": {
                            "en": "The following format for the preparation of the interim national report on implementation of the Nagoya Protocol on Access and Benefit-sharing called for under Article 29 of the Protocol is a series of questions based on those provisions of the Protocol that establish obligations for the Parties to the Protocol. These questions are identified as mandatory and are marked with an asterisk"
                  },
               }
              },
              {
                "schema": "all",
                "elementName": "government",
                "helptype": "inline",
                "title": {},
                "content": {
                  "en": "Country can not be changed"
                },
              },
            ];				  
			}
      ,controller:function($scope, $q, $element, $timeout){
        console.log($element)
        $timeout(function(){
          
          _.each($scope.help[0].fields, function(field, key){
            
            var children = $element.find('div.km-control-group[name="' + key + '"] label')
            console.log(children.first())
            
            children.after('<span class="help-block">' + field.en + '</span>')//.after('div.km-control-group[name="name"] label:first')
            
          });
          
          
        },2000)
      }
		};

	});
});
