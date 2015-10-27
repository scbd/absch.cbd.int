define(['app', '/app/js/common.js', '/app/services/thesaurus-service.js',
'/app/views/search/search-directives/left-menu-directive.html.js'], function (app) {


    app.directive('searchDirective', function () {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/search/search-directives/search-directive.html',
            //replace: true,
            scope: {
            },
            link: function ($scope, element, attrs) {
            },
            controller: ['$scope', '$element', 'thesaurusService', 'realm',
                function ($scope, $element, thesaurusService, realm) {

                    this.actions = {
                        query : query
                    };

                    var lastRunQuery = '';
                    function query (searchQuery) {


                        if (queryCanceler) {
                            console.log('trying to abort pending request...');
                            queryCanceler.resolve(true);
                        }

                        var searchOperation;
                        queryCanceler = $q.defer();

                        if(searchQuery.previewType == 'list'){
                            $scope.rawDocs = undefined;
                            var listQuery = {
                                query: searchQuery.query,
                                sort: searchQuery.orderByFields||'',
                                fields      : searchQuery.fields,
                                currentPage : searchQuery.currentPage,
                                itemsPerPage: searchQuery.itemsPerPage
                            };
                            searchOperation = searchService.list(listQuery, queryCanceler);
                        }
                        else if(searchQuery.previewType == 'group'){
                            if(searchQuery.currentPage==0)
                                $scope.rawDocs = undefined;
                            var groupQuery = {
                                query       : searchQuery.q,
                                sort        : 'government_EN_t asc, createdDate_dt desc, title_t asc',
                                fields      : 'id,identifier_s,title_t,description_t,url_ss,schema_EN_t,date_dt,government_s,government_EN_t,schema_s,summary_EN_t,jurisdiction_EN_t,type_ss,uniqueIdentifier_s,ownerGovernment_s,type_EN_t,status_EN_t',
                                groupField  : 'government_s',
                                groupSort   : 'government_EN_t asc',
                                currentPage : searchQuery.currentPage,
                                itemsPerPage: searchQuery.itemsPerPage
                            };
                            searchOperation = searchService.group(groupQuery, queryCanceler);
                        }

                        $q.when(searchOperation)
                          .then(function (data) {
                            queryCanceler = null;
                             if(searchQuery.previewType=='list'){
                                $scope.rawDocs = data.data.response.docs;
                                $scope.documentCount   = data.data.response.numFound;
                             }
                             else {
                                 var lRawDocs = [];
                                 if($scope.rawDocs && $scope.currentPage!=0)
                                    lRawDocs = _.clone($scope.rawDocs);

                                _.map(lRawDocs, function(doc){doc.newRecord = false;});

                                data.data.grouped.government_s.groups.forEach(function(doc){
                                            doc.newRecord = true;
                                            lRawDocs.push(doc);
                                });
                                $scope.rawDocs = lRawDocs;
                                $scope.documentCount = data.data.grouped.government_s.ngroups;
                             }

                        }).catch(function (error) {
                                console.log('onerror'); console.log(error);
                        });
                    };




                }]
        }

    });
});
