define(['app',
        './document-metadata-directive.html.js',
    '/app/js/common.js',]
      , function (app) {

app.directive('documentList', function ($http, $filter) {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/directives/document-list.partial.html',
            replace: true,
            // require : "?ngModel",
            scope: {
                  // placeholder: '@',
                  // ngDisabledFn : '&ngDisabled',
                  // binding    : '=ngModel',
                  // locales    : '=',
                  // required   : "@"
                  documents : '=',
                  filter: '@',
                  advanceFilter: '=',
                  showPagination: '@',
                  currentPage: '=',
                  documentCount: '='
            },
            controller: ['$scope', "underscore", "commonjs","authentication", '$q',
            function ($scope, underscore, commonjs,authentication,$q, filter){

              $scope.formatDate = function formatDate (date) {
                    return moment(date).format('MMMM Do YYYY');
              }; 
              //console.log($scope.advanceFilter) ;
              if($scope.advanceFilter && $scope.advanceFilter.$==null)
              {
                $scope.advanceFilter.$ = '';
               // console.log($scope.advanceFilter) ;
              }

              $scope.loaded = false;
              $scope.itemsPerPage = 25;
              $scope.pageCount = 0;
              $scope.currentPage = 0;
              $scope.transformedDocuments = [];
              $scope.descriptionLimit = 50;

                $scope.load = function(item,displayDetails) {
                      
                      //occours when a user actions collapses the detail section.
                      if(!displayDetails)                     
                          return;

                       item.data = {'schema':item.schema, 'url_ss': item.url_ss, 'data': item};
                        //console.log(item.schema);
                        if(item.schema && (item.schema.toUpperCase()=="FOCALPOINT" || 
                          item.schema.toUpperCase()=="MEETING" || 
                          item.schema.toUpperCase()=="NOTIFICATION"
                           || item.schema.toUpperCase()=="PRESSRELEASE" || item.schema.toUpperCase()=="STATEMENT"))
                        {
                             commonjs.getReferenceRecordIndex(item.schema.toUpperCase(),item.id).then(function(data){
                                item.data = data.data;
                              });                              
                        }
                        else
                        {
                              $http.get("/api/v2013/documents/"+item.identifier_s).then(function (result) {  
                                  item.data = result.data;

                                  $http.get("/api/v2013/documents/"+item.identifier_s + "?info").then(function (result) {  
                                      item.data.info = result.data;
                                  });

                              });
                          }
                    }

                $scope.filterCategory = function(item) {
                            //console.log($scope.filter);
                            if($scope.filter && ($scope.filter == '*' || item.schema.toUpperCase() == $scope.filter.toUpperCase()))
                                return true;

                            return false;

                                
                  }
                
                $scope.actionSetPage = function (pageNumber) {
                  //debugger;
                                  $scope.currentPage = Math.min($scope.pageCount-1, Math.max(0, pageNumber));
                              };

                $scope.range = function (start, end) {

                    var ret = [];
                    if (!end) {
                        end = start;
                        start = 0;
                    }

                    var maxCount = 10;
                    var middle = 5;
                    var count = end - start;
                    
                    if (count > maxCount) {
                        if ($scope.currentPage > middle)
                            start = $scope.currentPage - middle;

                        end = Math.min(count, start + maxCount);
                        start = Math.max(0, end - maxCount);
                    }
                    
                    for (var i = start; i < end; i++) {
                        ret.push(i);
                    }
                    return ret;
                };

                $scope.$watch('currentPage', function (newValue, oldValue) { 
                     if (newValue != oldValue) 
                     {                      
                       //console.log('current page changed');
                        $scope.currentPage = newValue;                        
                    }
                });

                $scope.$watch('documents', function (newValue, oldValue) { 
                    
                     if (newValue != oldValue) 
                     {     
                        $scope.pageCount = Math.ceil($scope.documentCount / $scope.itemsPerPage);
                       $scope.transformedDocuments = [];                                                     
                       $scope.documents.forEach(function (doc) {  
                           $scope.transformedDocuments.push(transformDocument(doc));
                        });
                                       
                    }
                });

                function transformDocument (document) {
      
                  var output = {};
                  var locale = "en";//$scope.$root.locale;
                  
                  var formatDate = function formatDate (date) {
                        return date+'';//moment(date).format('MMMM Do YYYY');
                    };
                    output.id          = document.id;
                    output.schema      = document.schema_s.toLowerCase();
                    output.schemaForEdit = document.schema_s;
                    output.title       = document.title_t;
                    output.description = document.description_t;
                    output.source      = document.government_EN_t;
                    output.url_ss      = document.url_ss;
                    output.identifier_s = document.identifier_s;
                    output.doc = document;
                    output.createdDateOn = document.createdDate_dt;
                    output.metadata = [];
                   
                   // if(output.source && output.source.toLowerCase() =='european union'){
                   //      output.isParty = true;
                   //      output.isRatified = true;
                   //      console.log('%s : %s', document.government_s,true);
                   //  }
                   //  else{
                        if(document.government_s){
                            $q.when(commonjs.getCountries(),function(countries){ 
                                    var cd = _.where(countries, {code:document.government_s.substring(0,2).toUpperCase()})
                                    if(cd.length>0){
                                        output.isParty = cd[0].isParty;
                                        output.isSignatory = cd[0].isSignatory;
                                        output.isRatified  = cd[0].isRatified;
                                    }
                            }); 
                        }
                    // }
                   output.recordtype="referenceRecord";

                    if(document.schema_s=='focalPoint') {
                        output.description  = document.function_t||'';
                        output.description += (document.function_t && document.department_t) ? ', ' : '';
                        output.description += document.department_t||'';
                        output.description2 = document.organization_t||'';
                    }

                    if(document.schema_s=='decision' && document.body_s=='XXVII8-COP' ) output.source = 'COP TO THE CONVENTION';
                    if(document.schema_s=='decision' && document.body_s=='XXVII8b-MOP') output.source = 'COP-MOP TO THE CARTAGENA PROTOCOL ON BIOSAFETY';
                    if(document.schema_s=='decision') output.title       = 'Decision ' + document.code_s;
                    if(document.schema_s=='decision') output.description = document.title_t;

                    if(document.schema_s=='recommendation' && document.body_s=='XXVII8-SBSTTA') { output.source = 'SBSTTA'; output.sourceTooltip = 'Subsidiary Body on Scientific, Technical and Technological Advice'; }
                    if(document.schema_s=='recommendation' && document.body_s=='XXVII8-WGRI'  ) { output.source = 'WGRI';   output.sourceTooltip = 'Working Group on the Review of Implementation'; }
                    if(document.schema_s=='recommendation' && document.body_s=='XXVII8b-ICCP' ) { output.source = 'ICCP';   output.sourceTooltip = 'Intergovernmental Committee for the Cartagena Protocol on Biosafety'; }
                    if(document.schema_s=='recommendation' && document.body_s=='XXVII8c-ICNP' ) { output.source = 'ICNP';   output.sourceTooltip = 'Intergovernmental Committee for the Nagoya Protocol on ABS'; }
                    if(document.schema_s=='recommendation') output.title       = 'Recommendation ' + document.code_s;
                    if(document.schema_s=='recommendation') output.description = document.title_t;

                    if(document.schema_s=='meetingDocument') output.source      = document.meeting_s;
                    if(document.schema_s=='meetingDocument') output.title       = document.symbol_s;
                    if(document.schema_s=='meetingDocument') output.description = document.title_t;
                    if(document.schema_s=='meetingDocument' && document.group_s=='INF') output.source += ' - INFORMATION';
                    if(document.schema_s=='meetingDocument' && document.group_s=='OFC') output.source += ' - PRE-SESSION';

                    if(document.schema_s=='nationalReport') output.description = document.summary_EN_t;
                    if(document.schema_s=='nationalReport') output.type        = document.reportType_EN_t;

                    if(document.schema_s=='implementationActivity') output.type = document.jurisdiction_EN_t + ' - ' + document.completion_EN_t;
                    
                    if(document.schema_s=='marineEbsa') output.schema = 'ECOLOGICALLY OR BIOLOGICALLY SIGNIFICANT AREA';

                    if(document.schema_s=='event') {
                        output.dates = formatDate(document.startDate_s) + ' to ' + formatDate(document.endDate_s);
                        output.venue = document.eventCity_EN_t + ', ' + document.eventCountry_EN_t;
                    }

                    if(document.schema_s=='resource') {
                        output.Year = document.publicationYear_is;
                        output.Types = getString(document.resourceTypes_CEN_ss, locale);
                        output.Regions = getString(document.regions_CEN_ss, locale);
                        output.Languages = getString(document.languages_CEN_ss, locale);
                        output.recordtype="referenceRecord";  

                        // TODO: add summary as output.description and limit to 200 chars

                        if(output.Types)output.metadata.push(output.Types);
                        if(output.Year)output.metadata.push(output.Year);
                        if(output.Regions)output.metadata.push(output.Regions);
                        if(output.Languages)output.metadata.push(output.Languages);
                        

                    }else if(document.schema_s=='authority') {
                        output.responsibleForAll = document.responsibleForAll_b;
                        output.jusrisdiction = document.jurisdiction_EN_t;                        
                        output.grType = (document.geneticResourceTypes_ss );
                        output.recordtype="nationalRecord";

                         if(output.responsibleForAll) 
                            output.description ="This CNA is responsible for all functions under the Nagoya Protocol.";
                         else{
                            // TODO: output.description should be the summary of responsibilities
                            if(output.jusrisdiction)output.metadata.push(output.jusrisdiction);
                            if(output.grType)output.metadata.push(output.grType);
                         }
                    }
                    else if(document.schema_s=='absCheckpoint') {
                        output.jusrisdiction = document.jurisdiction_EN_t;   
                        output.informAllAuthorities = (document.informAllAuthorities_b);  
                        output.recordtype="nationalRecord";

                        if(output.jusrisdiction)output.metadata.push(output.jusrisdiction);

                        //TODO: output.description should be the summary of responsibilities
                    }
                    else if(document.schema_s=='absPermit') {
                      
                        if(document.usage_CEN_ss){
                          output.usage = '';
                          document.usage_CEN_ss.forEach(function(usage){                           
                            output.usage +=  (output.usage.length > 0 ? "," : "") +  JSON.parse(usage).en;
                          });
                        }
                        // console.log(output.usage);
                        output.keywords = getString(document.keywords_CEN_ss, locale);
                        output.recordtype="nationalRecord";

                        //TODO: output.description should be the subjectmatter
                        //TODO: keywords should show up in the metadata. if(output.keywords)output.metadata.push(output.keywords);
                        //TODO: the metadata should be a link to download the pdf
                        if(output.usage)output.metadata.push(output.usage);

                    }
                    else if(document.schema_s=='absCheckpointCommunique') {
                        output.recordtype="nationalRecord";
                        output.originCountries = (document.originCountries_CEN_ss);
                        output.title = "Checkpoint communique ["+ formatDate(document.createdDate_dt) +"]";

                        //TODO: output.description should be the summary of utilization
                        //TODO: the metadata should include a link to download the pdf
                        
                    }
                     else if(document.schema_s=='database') {
                        output.recordtype="nationalRecord";
                        //TODO: output.description should be the description 
                        //TODO: metadata should be the url opening to a new window
                    }
                     else if(document.schema_s=='measure' ) {
                        output.recordtype="nationalRecord";  
                        
                        output.jusrisdiction = document.jurisdiction_EN_t; 

                        if(output.jusrisdiction)
                          output.metadata.push(output.jusrisdiction);

                        if(document.type_EN_t){
                          output.type = document.type_EN_t;
                          if(output.type)output.metadata.push(output.type);
                        }

                        if(document.status_EN_t){
                          output.status = document.status_EN_t;
                          if(output.status)output.metadata.push(output.status);
                        }
                    }       
                    else if(document.schema_s=='focalPoint' || document.schema_s=='database') {
                        output.recordtype="nationalRecord";  

                        if(document.type_EN_t){
                          output.type = document.type_EN_t;
                          if(output.type)output.metadata.push(output.type);
                        }

                        if(document.status_EN_t){
                          output.status = document.status_EN_t;
                          if(output.status)output.metadata.push(output.status);
                        }
                    }                    
                    else if(document.schema_s=='meeting') {
                        output.recordtype="referenceRecord";
                        output.eventCity=document.eventCity_EN_t;
                        output.eventCountry=document.eventCountry_EN_t;
                        output.description = document.eventCity_EN_t + ' from ' + moment(document.startDate_dt).format('Do MMM YYYY') + ' to ' + moment(document.endDate_dt).format('Do MMM YYYY'); 

                    }
                    $q.when(canUserEdit(document), function(canedit){
                      output.canEdit =  canedit;
                    }) ; 

                  return output;
                }     

                function getString(source, key){
                    var lstring = [];
                    if(source!=undefined)
                    {
                        source.forEach(function(record){                      
                          lstring.push(JSON.parse(record)[key] );
                        });                        
                        return lstring.toString() ;                        
                    }                    
                }

                //==================================
                //
                //==================================
                 $scope.user= null;
              function  canUserEdit  (document) {

                  if(!$scope.user){
                    $scope.user = authentication.getUser();
                  }
                return  $q.when($scope.user, function(user){
                    $scope.user = user;

                    if (!user.isAuthenticated)
                      return false;

                    if (!document)
                      return false;

                    return user.government == document.government_s
                    && (document.schema_s == 'absPermit' ||
                      document.schema_s == 'absCheckpoint' ||
                      document.schema_s == 'absCheckpointCommunique' ||
                      document.schema_s == 'authority' ||
                      document.schema_s == 'measure' ||
                      document.schema_s == 'database' ||
                      document.schema_s == 'resource');
                  });
                };
            }]

        };
    });
});
