define(['app', 'lodash', 'https://cdn.cbd.int/jqueryui@1.11.1/jquery-ui.min',
        'https://cdn.cbd.int/pivottable@2.23.0/dist/pivot.min',
        'css!https://cdn.cbd.int/pivottable@2.23.0/dist/pivot.min.css',
        'components/scbd-angularjs-services/services/locale','services/search-service',
        'views/directives/block-region-directive'], 
function (app, _) {
    app.controller("matrixViewer", ["$scope", "$element", "$q", "searchService", '$http', 'locale', '$route', 'realm', '$timeout',
    function ($scope, $elment, $q, searchService, $http, locale, $route, realm, $timeout) {
        var DefaultRegions = [
            "D50FE62D-8A5E-4407-83F8-AFCAAF708EA4", // CBD Regional Groups - Africa
            "5E5B7AA4-2420-4147-825B-0820F7EC5A4B", // CBD Regional Groups - Asia and the Pacific
            "942E40CA-4C23-4D3A-A0B4-736CD0EFCD54", // CBD Regional Groups - Central and Eastern Europe
            "3D0CCC9A-A0A1-4399-8FA2-41D4D649DB0E", // CBD Regional Groups - Latin America and the Caribbean
            "0EC2E5AE-25F3-4D3A-B71F-8019BB62ED4B"  // CBD Regional Groups - Western Europe and Others
        ];
        var regionsQuery = _.map(DefaultRegions, function(region){return $http.get('/api/v2013/thesaurus/terms/'+region+'?relations')})
        
        var query = {
            fields  : 'Country:government_EN_t,RecordType:schema_EN_t, Year:government_submissionYear_s, government_s',
            query   : 'government_submissionYear_s:*',
            rowsPerPage    : 100000
        }
        $scope.loadding = true;
        searchService.list(query)
        .then(function(result){
            var data = (result.data.response.docs);
            $q.all(regionsQuery).then(function(regions){return _.map(regions, function(region){return region.data;})})
            .then(function(regions){
                
                data = _.map(data, function(row){
                    if(row.Year)
                        row.Year = row.Year.replace(/([a-z]+)?_/i, '')
                    
                    var region = _.find(regions, function(reg){
                        return _.contains(reg.narrowerTerms, row.government_s)
                    })

                    return {
                        Country     :   row.Country,
                        Year        :   row.Year,
                        RecordType  :   row.RecordType,
                        Region      :   region ? region.title[locale] : 'No Region'
                    }
                });

                $elment.find("#output").pivotUI(
                    data, {
                    rows: ["Country"],
                    cols: ["RecordType"],
                    aggregatorName: "Count"
                });
            })
            .finally(function(){
                $scope.loadding = false;
            })
        })
        
          
    }])

})
