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
            
            
            
            //********************************************************************************************************
            this.getInfo = function(id){
                
                switch(id){
                    case "nationalRecords": 
                        return "<i class='fa fa-info-circle color-litegrey'></i> <strong>National records</strong> are published by Governments and include national information relevant for the implementation of the Nagoya Protocol as well as information Parties are obliged to provide in accordance with the Protocol.";
                     case "nfp": 
                        return "<i class='fa fa-info-circle color-litegrey'></i> Institution designated to liaise with the Secretariat and make available information on procedures for accessing genetic resources and establishing mutually agreed terms, including information on competent national authorities, relevant indigenous and local communities and relevant stakeholders (Article 13.1).";
                        
                     case "cna": return "<i class='fa fa-info-circle color-litegrey'></i> Entities designated to, in accordance with applicable national legislative, administrative or policy measures, be responsible for granting access or, as applicable, issuing written evidence that access requirements have been met and be responsible for advising on applicable procedures and requirements for obtaining prior informed consent and entering into mutually agreed terms (Article 13.2)";
                     
                     case "msr": return "<i class='fa fa-info-circle color-litegrey'></i> Measures adopted at domestic level to implement the access and benefit-sharing obligations of the Convention or/and the Nagoya Protocol.";
                     
                     case "ircc": return "<i class='fa fa-info-circle color-litegrey'></i>  Certificate constituted from the information on the permit or its equivalent registered in the ABS Clearing-House, serving as evidence that the genetic resource which it covers has been accessed in accordance with prior informed consent and that mutually agreed terms have been established. It contains the minimum necessary information to allow monitoring the utilization of genetic resources by users throughout the value chain (Article 17).";
                     
                     case "ndb": return "<i class='fa fa-info-circle color-litegrey'></i> Information and links to national websites or databases which are relevant for ABS.";
                     
                     case "cp": return "<i class='fa fa-info-circle color-litegrey'></i> Entities designated by Parties to effectively collect or receive relevant information related to prior informed consent, to the source of the genetic resource, to the establishment of mutually agreed terms and/or to the utilization of genetic resources, as appropriate (Article 17, 1(a) (i)).";
                     
                     case "cpc": return "<i class='fa fa-info-circle color-litegrey'></i>  A summary of the information collected or received by a checkpoint related to prior informed consent, to the source of the genetic resource, to the establishment utilization of genetic resources and registered in the ABS Clearing-House (Article 17.1 (a)).";
                     
                     case "nr": return "<i class='fa fa-info-circle color-litegrey'></i>  The interim national report on implementation of the Nagoya Protocol on Access and Benefit-sharing called for under Article 29 of the Protocol is a series of questions answered by Parties and other Governments based on those provisions of the Protocol that establish obligations for the Parties to the Protocol. The interim national report can be a useful tool for both Parties and non-Parties to assess the level of implementation of the Nagoya Protocol, as well as gaps and needs in terms of capacity, and will assist the COP-MOP in reviewing, on a regular basis, the implementation of the Nagoya Protocol and to make, within its mandate, the decisions necessary to promote its effective implementation in accordance with Article 26, paragraph 4.";
                     
                     case "referenceRecords": return "<i class='fa fa-info-circle color-litegrey'></i> ";
                     
                     case "a19a20": return "<i class='fa fa-info-circle color-litegrey'></i> ";
                     
                     case "vlr": return "<i class='fa fa-info-circle color-litegrey'></i> ";
                     
                     case "cbr": return "<i class='fa fa-info-circle color-litegrey'></i> ";
                     
                     case "cbi": return "<i class='fa fa-info-circle color-litegrey'></i> ";
                        
                         
                    
                    
                    
                    
                    default: 
                        return "this is the dfefault";   
                }
                    
            };

             
		}

    }]);
});
