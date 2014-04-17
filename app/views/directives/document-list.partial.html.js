require('app').directive('documentList', function ($http) {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/directives/document-list.partial.html?'+(new Date().getTime()),
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
                  showPagination: '@',
                  currentPage: '=',
                  documentCount: '='
            },
            controller: ['$scope', function ($scope){


              $scope.loaded = false;
              $scope.itemsPerPage = 25;
              $scope.pageCount = 0;
              $scope.currentPage = 0;
              $scope.transformedDocuments = [];

                $scope.load = function(item) {
                 console.log(item);
                      item.data = {'schema':item.schema, 'url_ss': item.url_ss, 'data': []};
                        $http.get("/api/v2013/documents/"+item.identifier_s).then(function (result) {  
                            item.data = result.data;
                           
                            $http.get("/api/v2013/documents/"+item.identifier_s + "?info").then(function (result) {  
                                item.data.info = result.data;
                            });

                        });

                    }

                $scope.filterCategory = function(item) {
                            //console.log($scope.filter);
                            if($scope.filter == '*' || item.schema.toUpperCase() == $scope.filter.toUpperCase() )
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
                       console.log('current page changed');
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

                       console.log( $scope.transformedDocuments);                      
                    }
                });

                function transformDocument (document) {
      
                  var output = {};

                  var formatDate = function formatDate (date) {
                        return date+'';//moment(date).format('MMMM Do YYYY');
                    };

                    output.id          = document.id;
                    output.schema      = document.schema_EN_t.toUpperCase();
                    output.title       = document.title_t;
                    output.description = document.description_t;
                    output.source      = document.government_EN_t;
                    output.url_ss      = document.url_ss;
                    output.identifier_s = document.identifier_s;
                    output.doc = document;

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

                    return output;
                }     


            }]

        };
    });