define(['app', 'jquery', 'toastr', 'ngStorage'], function (app, $) { 'use strict';

	app.factory('helpService',  ["$http","$location", "$rootScope","toastr", "$localStorage",
	 function($http,$location, $rootScope, toastr, $localStorage) {

		return new function(){
            
            var showHelp  =  $localStorage.showHelp;
            var helpStyle = $('#helpStyle');
            
            //********************************************************************************************************
			this.getHelp = function(){
                if(showHelp)
                {
                   helpOn(); 
                }
                else{
                    helpOff(); 
                }
                return showHelp;
            };
             
            //******************************************************************************************************** 
            this.toggleHelp = function(){
                if(showHelp)
                {
                   helpOff(); 
                   toastr.info("Explanitory information is turned off.");
                }
                else{
                    helpOn(); 
                    toastr.info("Explanitory information will be added next to key words on the page when available.");
                }
            };
            
            //********************************************************************************************************
            function helpOn() {
				//    $('.helpinfo').css('display','block');
                showHelp = true;
                $localStorage.showHelp = showHelp;
                  
               if(helpStyle)
                    helpStyle.text(".helpinfo{display:block!important;}");
			};
            
            //********************************************************************************************************
			function helpOff() {				
				showHelp = false;
                $localStorage.showHelp = showHelp;
                
                if(helpStyle)
                    helpStyle.text(".helpinfo{display:none!important;}");
                    
			};
             
		}

    }]);
});
