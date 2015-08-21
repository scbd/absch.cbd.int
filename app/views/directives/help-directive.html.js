define(['app', 'underscore', 'joyRide'], function (app, _) {
	app.directive('help', function($http){
		return{
			restrict: 'EAC',
			replace:true,
			transclude:true,
			templateUrl: '/app/views/directives/help-directive.html',
			scope:true,
			link:['$scope', '$q', '$element', function($scope, $q, $element){
				
				
				// $q.when(help)
				//   .then(function(){
					  
					 //console.log( $element.find('#helpid'));
					 // $scope.helpText = 'This is a test dear.';
					 // console.log($element)
					  
				  // })
				  
              
			}]
      ,controller:['$scope', '$q', '$element', '$timeout','$compile', 
                  function($scope, $q, $element, $timeout, $compile){
        
        var joyride = false;
        var help = 
              {
                "schema": "absch-cna",
                "fields" :{
                          "generalInfo": {
                            "type" : "section",
                            "en": "Article 13 of the Nagoya Protocol requires the designation of one or more competent national authorities (CNAs) on access and benefit-sharing. This information shall be made available to the ABS Clearing-House in accordance with paragraph 2 (b) of Article 14 of  the Protocol. Where a Party designates more than one competent national authority, it must provide relevant information on the respective responsibilities of those authorities to the Secretariat along with its notification designating the authority. Where applicable, such information shall, at a minimum, specify which competent authority is responsible for the genetic resources sought (Article 13, paragraph 4)."
                          },
                          "government": {
                            "type" : "control",
                            "en": "GUIDELINES FOR THE government"
                          },
                          "name": {
                            "type" : "control",
                            "en": "GUIDELINES FOR THE name"
                          },
                          "address": {
                            "type" : "control",
                            "en": "GUIDELINES FOR THE address"
                          },
                          "city": {
                            "type" : "control",
                            "en": "GUIDELINES FOR THE city"
                          },
                          "state": {
                            "type" : "control",
                            "en": "GUIDELINES FOR THE state"
                          },
                          "postalCode": {
                            "type" : "control",
                            "en": "Help for postal code"
                          },
                  }
              };
               			            
        var sectionTemplate = '<div class="help-section" ng-if="showHelp.show" style="margin-bottom:20px;">' +
                       '   <div class="help-title">' +
                       '   <i class="material-icons">help_outline</i> ' +
                       '   </div>' +
                       ' <div class="help-content">{{content}}<div>'
        var controlTemplate = '<span class="help-inline" ng-if="showHelp.show" ><i class="material-icons">help_outline</i> {{content}} </span>'
        $timeout(function(){
          
          _.each(help.fields, function(field, key){
            
            var templateToUse = controlTemplate;
            
            var children = $element.find('div.km-control-group[name="' + key + '"] label')
            if(field.type == 'section'){
                children = $element.find('legend[name="' + key + '"]')
                templateToUse = sectionTemplate
            }
            children.after($compile(templateToUse.replace('{{content}}', field.en ))($scope));
            
            if(!children.attr('id')){
              children.attr('id',key);
            }
          });
          addJoyRideSteps();
         
        },1000)
        
         $scope.$watch('showHelp.showTour', function(newVal, oldValue){
          if(oldValue===undefined)
            return;
            
          if(newVal)
            addJoyRideSteps();
          // else{
          //   if($element.find('#helpElement'))
          //     $element.find('#helpElement').joyride('destroy');
          //  }
        });
        
        function addJoyRideSteps(){
          
          if(!joyride){
                        
            if(!$element.attr('id'))
              $element.attr('id','helpElement');
            
            var joyRideTemplate = '<div id="joyrideSection" style="display:none"><ol id="helpElement" class="jouride-list" data-joyride>';
            var index = 1;
            _.each(help.fields, function(field, key, list){
              var buttons ='';
              if(index==1)
                buttons = ' data-options="prev_button: false"'
              else if(index == _.size(help.fields))
                buttons = ' data-button="Close" data-prev-text="Prev"  data-options="prev_button: true"'
              else
                buttons = ' data-prev-text="Prev"  data-options="prev_button: true"';
                
              joyRideTemplate += '  <li data-id="' + key + '" ' + buttons +   '><p>'
                              + field.en +  '</p></li>';
              index++;
            });
            
            joyRideTemplate += '</ol></div>'
            $element.append(joyRideTemplate);
            console.log(joyRideTemplate);
            joyride = true;
          }
          
          $element.find('#helpElement')
                  .joyride({
                      tip_container : '#joyrideSection',
                      postRideCallback: function(){
                        $scope.showHelp.showTour = false;
                      }
                    });
          
        }
        
        
      }]
		};

	});
});
