define(['app',
        './document-metadata-directive.html.js',
    '/app/js/common.js',]
      , function (app) {

app.directive('documentList', function ($http) {
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
            controller: ['$scope', "underscore", "commonjs",function ($scope, underscore, commonjs){

              $scope.formatDate = function formatDate (date) {
                    return moment(date).format('MMMM Do YYYY');
              }; 
              console.log($scope.advanceFilter) ;
              if($scope.advanceFilter && $scope.advanceFilter.$==null)
              {
                $scope.advanceFilter.$ = '';
               console.log($scope.advanceFilter) ;
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
                        
                        if(item.schema=="FOCALPOINT" || item.schema=="MEETING" || item.schema=="NOTIFICATION"
                           || item.schema=="PRESSRELEASE" || item.schema=="STATEMENT")
                        {
                             commonjs.getReferenceRecordIndex(item.schema,item.id).then(function(data){
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
// console.log(document);
                    output.id          = document.id;
                    output.schema      = document.schema_s.toUpperCase();
                    output.title       = document.title_t;
                    output.description = document.description_t;
                    output.source      = document.government_EN_t;
                    output.url_ss      = document.url_ss;
                    output.identifier_s = document.identifier_s;
                    output.doc = document;
                    output.createdDateOn = document.createdDate_dt;

						  //Jason's code. gets a list of countries to find out if they are ratified or what not. TODO: not do this. countries should exist on a high level scope, so I don't have to ajax it. Or there should be a cache. Also use underscore for algorithms.
						  $http.get('/api/v2013/countries', {cache: true}).then(function(response) {
							  var countries = response.data;
							  for(var i=0; i!=countries.length; ++i)
							  		if(countries[i].name.en == output.source) {
									  var treaties = countries[i].treaties;
									  output.isParty = treaties.XXVII8.party;
									  output.isSignatory = treaties.XXVII8b.signature;
									  output.isRatified = treaties.XXVII8b.instrument == "ratification" || treaties.XXVII8b.instrument == "accession" || treaties.XXVII8b.instrument == "acceptance";
									  console.log(output);
									}
						  });

                   
                    output.cssRecordClass="referenceRecords";
                     if(document.orgperson_s) {
                      var obj = JSON.parse(document.orgperson_s);
                      console.log(obj);
                      obj.forEach(function(org){
                        console.log(org.organization.en);
                      })
                        
                     }
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
                    }else if(document.schema_s=='authority') {
                        output.responsibleForAll = document.responsibleForAll_b;
                        output.jusrisdiction = document.jurisdiction_EN_t;                        
                        output.grType = (document.geneticResourceTypes_ss );
                        output.cssRecordClass="nationalRecords";
                    }
                    else if(document.schema_s=='absCheckpoint') {
                        output.jusrisdiction = document.jurisdiction_EN_t;   
                        output.informAllAuthorities = (document.informAllAuthorities_b);  
                        output.cssRecordClass="nationalRecords";
                    }
                    else if(document.schema_s=='absPermit') {
                        output.usage = (document.usage_CEN_ss);
                        output.keywords = getString(document.keywords_CEN_ss, locale);
                        output.cssRecordClass="nationalRecords";
                    }
                    else if(document.schema_s=='absCheckpointCommunique') {
                        output.originCountries = (document.originCountries_CEN_ss);
                        output.cssRecordClass="nationalRecords";
                    }
                    else if(document.schema_s=='measure' || document.schema_s=='focalPoint' || document.schema_s=='database') {
                        output.cssRecordClass="nationalRecords";
                    }                    
                    else if(document.schema_s=='meeting') {
                        output.eventCity=document.eventCity_EN_t;
                        output.eventCountry=document.eventCountry_EN_t;
                    }
                   

                    return output;
                }     

                function getString(source, key){
                    var lstring = [];

                    if(source!=undefined)
                    {
                          //console.log(JSON.parse('{"response": {   "success": "The activity has been removed",   "message": "0"  }}' ));
                         
                        //  if(angular.isString(source))
                        //  {
                        //   console.log(source);
                        //    var jst = (JSON.parse(( source )));
                        //   console.log((jst[0]));
                        //     //   jst.forEach(function(record){                      
                        //     //    console.log(record);
                        //     // });
                        // }
                        //console.log(source);
                        source.forEach(function(record){                      
                          lstring.push(JSON.parse(record)[key] );
                        });
                        
                        return lstring.toString() ;
                        
                    }                    
                }

                // $scope.$watch('advanceFilter', function(newvalue,old){
                //   console.log(old);
                //   console.log(newvalue);
                // })


            }]

        };
    });
});
