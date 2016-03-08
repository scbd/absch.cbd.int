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
                   toastr.info("Additional explanitory information is turned off.");
                }
                else{
                    helpOn(); 
                    toastr.info("Additional explanitory information will be added next to key words on the page when available.");
                }
            };
            
            //********************************************************************************************************
            function helpOn() {
				//    $('.helpinfo').css('display','block');
                showHelp = true;
                $localStorage.showHelp = showHelp;
                  
               if(helpStyle)
                    helpStyle.text(".helpinfo{display:block;} .helpinfoInline{display:inline;}");
			};
            
            //********************************************************************************************************
			function helpOff() {				
				showHelp = false;
                $localStorage.showHelp = showHelp;
                
                if(helpStyle)
                    helpStyle.text(".helpinfo,.helpinfoInline{display:none!important;}");
                    
			};
             
		}

    }]);
});
