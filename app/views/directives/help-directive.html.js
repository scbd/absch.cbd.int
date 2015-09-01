define(['app', 'underscore', 'joyRide'], function (app, _) {
	app.directive('help', function($http){
		return{
			restrict: 'EAC',
			replace:true,
			transclude:true,
			templateUrl: '/app/views/directives/help-directive.html',
			scope:{
        schema:'@',
        showHelp : '=',
        repalceGlossaryterms : '@'
      },
			link:['$scope', '$q', '$element', function($scope, $q, $element){				
              
			}]
      ,controller:['$scope', '$q', '$element', '$timeout','$compile', '$http','$filter',
                  function($scope, $q, $element, $timeout, $compile, $http, $filter){
             
        var joyride = false;
        var help    = {};
       // $scope.showHelp = {show:true}; 			            
        var sectionTemplate = '<div class="help-section" ng-if="showHelp.show" style="margin-bottom:20px;">' +
                       '   <div class="help-title">' +
                       '   <i class="material-icons">help_outline</i> ' +
                       '   </div>' +
                       ' <div class="help-content">{{content}}<div>'
        var controlTemplate = sectionTemplate;//'<span class="help-inline" ng-if="showHelp.show"><i class="material-icons">help_outline</i> {{content}}</span>'
        
        if(!$scope.schema){
          console.error('help schema name not provided')
          return
        }
        
        $q.when($http.get('http://localhost:8000/api/v2015/help-forms/' + $scope.schema))
        .then(function(response){
            
            // $timeout(function(){
            help = response.data;
              _.each(help.fields, function(field, key){
                                  
                var templateToUse = controlTemplate;
                
                var children = $element.find('div.km-control-group[name="' + field.name + '"] label')
                if(field.type.identifier == 'section' || field.type.identifier == 'form'){
                    children = $element.find('legend[name="' + field.name + '"]')
                    templateToUse = sectionTemplate
                }
                if(field.embed)
                  children.after($compile(templateToUse.replace('{{content}}', $filter('lstring')(field.helpText)))($scope));
                
                if(!children.attr('id')){
                  children.attr('id',field.name);
                }
              });
              addJoyRideSteps();
            
            // },1000)
          
        })
        .catch(function(error){
          if(error.code==404)
            console.error('help for schema not found')
        });
              
        
       $scope.$watch('showHelp.showTour', function(newVal, oldValue){
          if(oldValue===undefined)
            return;
            
          if(newVal)
            addJoyRideSteps();
        });
        
        function addJoyRideSteps(){
          
          if(!joyride && help){
                        
            if(!$element.attr('id'))
              $element.attr('id','helpElement');
            
            var joyRideTemplate = '<div id="joyrideSection" style="display:none"><ol id="helpElement" class="jouride-list" data-joyride>';
            var index = 1;
            _.each(help.fields, function(field, key, list){
              
              if(field.type.identifier == 'form' || !field.popup)
                return;
                
              var buttons ='';
              if(index==1)
                buttons = ' data-options="prev_button: false"'
              else if(index == _.size(help.fields))
                buttons = ' data-button="Close" data-prev-text="Prev"  data-options="prev_button: true"'
              else
                buttons = ' data-prev-text="Prev"  data-options="prev_button: true"';
                
              joyRideTemplate += '  <li data-id="' + field.name + '" ' + buttons +   '><p>'
                              + $filter('lstring')(field.helpText) +  '</p></li>';
              index++;
            });
            
            joyRideTemplate += '</ol></div>'
            $element.append(joyRideTemplate);
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
        
        function updateGlossaryTerms(){
          if($scope.repalceGlossaryterms)
              $q.when($http.get('http://localhost:8000/api/v2015/help-glossarys/'))
              .then(function(response){                  
                    _.each(response.data, function(field, key){  
                        _.each(field.referenceTerm, function(term){
                            replacetext(term,"<a href='/help/glossary/" + field._id + "'>$&</a>")
                        });      
                    });                
              })
              .catch(function(error){
                if(error.code==404)
                  console.error('help for schema not found')
              });
          
          
        }
        function replacetext(target, replacement) {
         // Get all text nodes:
         var $textNodes = $element
                 .find("*")
                 .andSelf()
                 .contents()
                 .filter(function() {
                     return this.nodeType === 3 && 
                         !$(this).parent("a").length;
                 });
         
         // Iterate through the text nodes, replacing the content
         // with the link:
         $textNodes.each(function(index, element) {
             var contents = $(element).text();
             contents = contents.replace( new RegExp(target, "gi"), replacement);
             $(element).replaceWith(contents);
         });
      };
       updateGlossaryTerms(); 
       
       
       $scope.$on('$destroy', function(){
         $element.find('#helpElement')
                  .joyride('destroy');
       });
       
      }]
		};

	});
});
