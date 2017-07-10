define(['app','text!views/directives/document-list.partial.html',
    './document-metadata-directive.html',
    'js/common',
    'ngInfiniteScroll'
], function(app, template) {

    app.directive('documentList', function($http, $filter) {
        return {
            restrict: 'EAC',
            template: template,
            replace: true,
            scope: {
                documents: '=',
                 filter: '@',
                advanceFilter: '=',
                showPagination: '@',
                currentPage: '=',
                documentCount: '=',
                orderBy: '=',
                previewType: '=',
                recordType: '=',
                groupCount: '=',
            },
            controller: ['$scope', '$sce', "underscore", "commonjs", "authentication", '$q', "$filter", "$compile", "$element", "$timeout",
                function($scope, $sce, _, commonjs, authentication, $q, $filter, $compile, $element, $timeout) {

                    $scope.loading = true;
                    $scope.loaded = false;
                    $scope.itemsPerPage = 25;
                    $scope.pageCount = 0;
                    $scope.currentPage = 0;
                    $scope.transformedDocuments = [];
                    $scope.descriptionLimit = 50;

                    $scope.getDocumentId = function(document) {

                        if ((document.recordtype == "referenceRecord" && document.schema != "resource") || document.schema.toLowerCase() == "focalpoint") {
                            return commonjs.hexToInteger(document.id || document.identifier_s);
                        } else {
                            //console.log(document)
                            return $filter("uniqueIDWithoutRevision")(document.doc);
                        }
                    }

                    $scope.load = function(item, displayDetails) {

                        //occours when a user actions collapses the detail section.
                        if (!displayDetails)
                            return;
                        if (item.data)
                            return;
                        if (!item.schema && item.schema_s)
                            item.schema = item.schema_s;
                        item.data = {
                            'schema': item.schema || item.schema_s,
                            'url_ss': item.url_ss,
                            //'data': item
                        };
                        //console.log(item.schema);
                        if (item.schema && (item.schema.toUpperCase() == "FOCALPOINT" ||
                                item.schema.toUpperCase() == "MEETING" ||
                                item.schema.toUpperCase() == "NOTIFICATION" || item.schema.toUpperCase() == "PRESSRELEASE" || item.schema.toUpperCase() == "STATEMENT" || item.schema.toUpperCase() == "NEWS")) {
                            commonjs.getReferenceRecordIndex(item.schema.toUpperCase(), item.id).then(function(data) {
                                item.data = data.data;
                            });
                        } else {
                            //   $http.get("/api/v2013/documents/" + item.identifier_s).then(function(result) {
                            //     item.data = result.data;
                            //
                            $http.get("/api/v2013/documents/" + item.identifier_s + "?info").then(function(result) {
                                item.data = angular.copy(result.data.body);
                                item.data.info = result.data;
                                delete item.data.info.body;
                            });
                            //
                            //   });
                        }
                    }

                    $scope.filterCategory = function(item) {
                        //console.log($scope.filter);
                        if ($scope.filter && ($scope.filter == '*' || item.schema.toUpperCase() == $scope.filter.toUpperCase()))
                            return true;

                        return false;


                    }

                    $scope.actionSetPage = function(pageNumber) {
                        //debugger;
                        $scope.currentPage = Math.min($scope.pageCount - 1, Math.max(0, pageNumber));
                    };

                    $scope.range = function(start, end) {

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

                    $scope.getNFPText = commonjs.getNFPText;

                    $scope.updateScrollPage = function() {
                        if($scope.loading || $scope.transformedGroupDocuments.length == $scope.groupCount)
                            return;
                        $scope.loading = true;
                        $timeout(function(){$scope.currentPage = $scope.currentPage + 1;},10);
                    }

                    $scope.$watch('currentPage', function(newValue, oldValue) {
                        if (newValue != oldValue) {
                            //console.log('current page changed');
                          $timeout(function(){$scope.currentPage = newValue;},10)
                        }
                    });

                    $scope.$watch('documents', function(newValue, oldValue) {

                        // if (!newValue && oldValue) {
                        //     $scope.transformedGroupDocuments = [];
                        // }
                        // console.log('country group watch,' ,newValue);
                        if (newValue && newValue != oldValue) {
                            $scope.pageCount = Math.ceil($scope.documentCount / $scope.itemsPerPage);
                            $scope.transformedDocuments = [];
                            if ($scope.previewType == 'list') {
                                $scope.transformedDocuments = [];
                                $scope.documents.forEach(function(doc) {
                                    $scope.transformedDocuments.push(transformDocument(doc));
                                });
                                $scope.loading = false;
                            } else if ($scope.previewType == 'group') {

                                if(!$scope.transformedGroupDocuments || $scope.currentPage == 0)
                                    $scope.transformedGroupDocuments = [];

                                $q.when(commonjs.getCountries())
                                    .then(function(countries) {

                                        $scope.documents.forEach(function(doc) {

                                            var existingDocument = _.find($scope.transformedGroupDocuments, {code: doc.groupValue == 'eur' ? 'EU' : doc.groupValue.toUpperCase()});
                                            if(existingDocument)
                                                return;

                                            if(doc.newRecord){

                                                var country = _.clone(_.find(countries, {
                                                                        code: doc.groupValue == 'eur' ? 'EU' : doc.groupValue.toUpperCase()
                                                                    }));

                                                country.schemaList = {};
                                                if (doc.doclist.docs.length > 0) {
                                                    //addSchema(country);
                                                    _.each(doc.doclist.docs, function(document) {


                                                        if (!country.schemaList[document.schema_s]){
                                                            // country.schemaList[document.schema_s] = {};
                                                            // country.schemaList[document.schema_s].orderKey = getSortOrderKey(document.schema_s);
                                                            country.schemaList[document.schema_s]  = [];
                                                        }

                                                        var sort1=0;
                                                        var sort2=0;
                                                        var sort3=0;
                                                        var meta1 ="";
                                                        var meta2 ="";
                                                        var meta3 ="";

                                                        if(document.schema_s == "measure"){

                                                            meta1=document.jurisdiction_EN_t;
                                                            if(document.jurisdiction_EN_t =="Regional / Multilateral")
                                                                sort1 = 1;
                                                            if(document.jurisdiction_EN_t =="National / Federal")
                                                                sort1 = 2;
                                                            if(document.jurisdiction_EN_t =="Sub-national")
                                                                sort1 = 3;
                                                            if(document.jurisdiction_EN_t =="Community")
                                                                sort1 = 4;
                                                            if(document.jurisdiction_EN_t =="Other")
                                                                sort1 = 5;


                                                            meta2 =document.type_EN_t;
                                                            if(document.type_EN_t =="Strategy / Action Plan")
                                                                sort2 = 1;
                                                            if(document.type_EN_t =="Policy Document")
                                                                sort2 = 2;
                                                            if(document.type_EN_t =="Law")
                                                                sort2 = 3;
                                                            if(document.type_EN_t =="Regulatory or Administrative Measures")
                                                                sort2 = 4;
                                                            if(document.type_EN_t =="Guidelines")
                                                                sort2 = 5;
                                                            if(document.type_EN_t =="Explanatory Information")
                                                                sort2 = 6;
                                                            if(document.type_EN_t =="Other")
                                                                sort2 = 7;

                                                            meta3 =document.status_EN_t;

                                                            if(document.status_EN_t =="Legally binding")
                                                                sort3 = 1;
                                                            if(document.status_EN_t =="Not legally binding")
                                                                sort3 = 2;
                                                            if(document.status_EN_t =="Draft")
                                                                sort3 = 3;
                                                            if(document.status_EN_t =="Retired")
                                                               sort3 = 4;


                                                        }


                                                        country.schemaList[document.schema_s].push({
                                                            'id'         :   document.id,
                                                            'identifier_s':   document.identifier_s,
                                                            'title'      :   document.title_t,
                                                            'schema'    :   document.schema_s,
                                                            'type'        :   document.type_ss,
                                                            'government'  :   {identifier:document.government_s||country.code},
                                                            'ownerGovernment'  :  document.ownerGovernment_s ? {identifier:document.ownerGovernment_s} : undefined,
                                                            'jurisdiction'     :   document.jurisdiction_s,
                                                            'meta1'        :   meta1,
                                                            'meta2'        :   meta2,
                                                            'meta3'        :   meta3,
                                                            'sort1' : sort1,
                                                            'sort2' : sort2,
                                                            'sort3' : sort3
                                                        });
                                                    });
                                                }
                                                $scope.transformedGroupDocuments.push(country);
                                            }
                                        });
                                        $scope.loading = false;
                                        //console.log($scope.transformedGroupDocuments);
                                    });
                            }
                        }
                    });

                    function removeEmptySchema(country){
                        _.each(country.schemaList, function(schema){
                            if(schema.length==0)
                                schema = undefined;
                        })
                    }
                    function addSchema(country){
                        //country.schemaList
                        country.schemaList['focalPoint'] = [];
                        country.schemaList['authority'] = [];
                        country.schemaList['measure'] = [];
                        country.schemaList['absPermit'] = [];
                        country.schemaList['absCheckpoint'] = [];
                        country.schemaList['absCheckpointCommunique'] = [];
                    }

                    function getSortOrderKey(schema){
                            switch (schema) {
                                case 'focalPoint':
                                    return 1;
                                case 'authority':
                                    return 2;
                                case 'measure':
                                    return 3;
                                case 'absPermit':
                                    return 4;
                                case 'absCheckpoint':
                                    return 5;
                                case 'absCheckpointCommunique':
                                    return 6;
                                default : 10;

                            }
                    }


                    function transformDocument(document) {

                        var output = {};
                        var locale = "en"; //$scope.$root.locale;

                        var formatDate = function formatDate(date) {
                            return date + ''; //moment(date).format('MMMM Do YYYY');
                        };
                        output.id = document.id;
                        output.schema = document.schema_s.toLowerCase();
                        output.schemaForEdit = document.schema_s;
                        output.title = document.title_t;
                        output.description = document.description_t;
                        output.source = document.government_EN_t;
                        output.url_ss = document.url_ss;
                        output.identifier_s = document.identifier_s;
                        output.doc = document;
                        output.createdDateOn = document.createdDate_dt;
                        output.metadata = [];
                        output.amendmentIntent = 'none';

                        if (!document.identifier_s) {
                            output.identifier_s = output.id;
                        }

                        if (document.government_s) {
                            $q.when(commonjs.getCountries())
                            .then(function(countries) {
                                var cd = _.where(countries, {
                                    code: document.government_s.substring(0, 2).toUpperCase()
                                })
                                if (cd.length > 0) {
                                    output.isNPParty = cd[0].isNPParty;
                                    output.isSignatory = cd[0].isSignatory;
                                    output.isRatified = cd[0].isRatified;
                                    output.isInbetweenParty = cd[0].isInbetweenParty;
                                    output.entryIntoForce = cd[0].entryIntoForce;
                                }
                            });
                        }

                        output.recordtype = "referenceRecord";

                        if (document.schema_s == 'focalPoint') {
                            output.description = document.function_t || '';
                            output.description += (document.function_t && document.department_t) ? ', ' : '';
                            output.description += document.department_t || '';
                            output.description += (output.description && document.organization_t) ? ', ' : '';
                            output.description += document.organization_t || '';
                        }

                        if (document.schema_s == 'decision' && document.body_s == 'XXVII8-COP') output.source = 'COP TO THE CONVENTION';
                        if (document.schema_s == 'decision' && document.body_s == 'XXVII8b-MOP') output.source = 'COP-MOP TO THE CARTAGENA PROTOCOL ON BIOSAFETY';
                        if (document.schema_s == 'decision') output.title = 'Decision ' + document.code_s;
                        if (document.schema_s == 'decision') output.description = document.title_t;

                        if (document.schema_s == 'recommendation' && document.body_s == 'XXVII8-SBSTTA') {
                            output.source = 'SBSTTA';
                            output.sourceTooltip = 'Subsidiary Body on Scientific, Technical and Technological Advice';
                        }
                        if (document.schema_s == 'recommendation' && document.body_s == 'XXVII8-WGRI') {
                            output.source = 'WGRI';
                            output.sourceTooltip = 'Working Group on the Review of Implementation';
                        }
                        if (document.schema_s == 'recommendation' && document.body_s == 'XXVII8b-ICCP') {
                            output.source = 'ICCP';
                            output.sourceTooltip = 'Intergovernmental Committee for the Cartagena Protocol on Biosafety';
                        }
                        if (document.schema_s == 'recommendation' && document.body_s == 'XXVII8c-ICNP') {
                            output.source = 'ICNP';
                            output.sourceTooltip = 'Intergovernmental Committee for the Nagoya Protocol on ABS';
                        }
                        if (document.schema_s == 'recommendation') output.title = 'Recommendation ' + document.code_s;
                        if (document.schema_s == 'recommendation') output.description = document.title_t;

                        if (document.schema_s == 'meetingDocument') output.source = document.meeting_s;
                        if (document.schema_s == 'meetingDocument') output.title = document.symbol_s;
                        if (document.schema_s == 'meetingDocument') output.description = document.title_t;
                        if (document.schema_s == 'meetingDocument' && document.group_s == 'INF') output.source += ' - INFORMATION';
                        if (document.schema_s == 'meetingDocument' && document.group_s == 'OFC') output.source += ' - PRE-SESSION';

                        if (document.schema_s == 'nationalReport') output.description = document.summary_EN_t;
                        if (document.schema_s == 'nationalReport') output.type = document.reportType_EN_t;

                        if (document.schema_s == 'implementationActivity') output.type = document.jurisdiction_EN_t + ' - ' + document.completion_EN_t;

                        if (document.schema_s == 'marineEbsa') output.schema = 'ECOLOGICALLY OR BIOLOGICALLY SIGNIFICANT AREA';

                        if (document.schema_s == 'event') {
                            output.dates = formatDate(document.startDate_s) + ' to ' + formatDate(document.endDate_s);
                            output.venue = document.eventCity_EN_t + ', ' + document.eventCountry_EN_t;
                        }

                        if (document.schema_s == 'resource') {
                            output.Year = document.publicationYear_is;
                            output.Types = getString(document.resourceTypes_CEN_ss, locale);
                            output.Regions = getString(document.regions_CEN_ss, locale);

                            if (document.resourceLinksLanguage_ss) {
                                output.Languages = [];
                                document.resourceLinksLanguage_ss.forEach(function(language) {
                                    output.Languages.push(language)
                                });
                            }

                            output.recordtype = "referenceRecord";
                            // TODO: add summary as output.description and limit to 200 chars

                            if (output.Types) output.meta1 = output.Types;
                            if (output.Year) output.meta2 = output.Year;
                            if (output.Regions) output.meta3 = output.Regions;

                        } else if (document.schema_s == 'authority') {
                            output.responsibleForAll = document.absResposibleForAll_b;
                            output.jurisdiction = document.absJurisdiction_EN_t;
                            //output.cnaScope = document.thematicAreas_CEN_ss;


                            if (document.thematicAreas_CEN_ss) {
                                output.thematicAreas_CEN_ss = document.thematicAreas_CEN_ss;
                                output.cnaScope = "";
                                output.thematicAreas_CEN_ss.forEach(function(item) {
                                    output.cnaScope += (output.cnaScope.length > 0 ? ", " : "") + JSON.parse(item).en;
                                });
                            }

                            output.recordtype = "nationalRecord";

                            if (output.responsibleForAll) {
                                output.description = "This CNA is responsible for all functions under the Nagoya Protocol.";
                            } else {
                                output.description = document.description_t;
                                if (output.jurisdiction)
                                    output. meta1 = output.jurisdiction;
                                if (output.cnaScope)
                                    output.meta2 = output.cnaScope;
                            }

                        } else if (document.schema_s == 'absCheckpoint') {
                            output.jusrisdiction = document.jurisdiction_EN_t;
                            output.informAllAuthorities = (document.informAllAuthorities_b);
                            output.recordtype = "nationalRecord";

                            if (output.jusrisdiction) output.meta1 = output.jusrisdiction;

                            //TODO: output.description should be the summary of responsibilities
                        } else if (document.schema_s == 'absPermit') {

                            if (document.usage_CEN_ss) {
                                output.usage = '';
                                document.usage_CEN_ss.forEach(function(usage) {
                                    output.usage += (output.usage.length > 0 ? ", " : "") + JSON.parse(usage).en;
                                });
                            }
                            // console.log(output.usage);
                            output.keywords = getString(document.keywords_CEN_ss, locale);
                            output.recordtype = "nationalRecord";
                            //
                            if (document.amendmentIntent_i != undefined) {
                                output.amendmentIntent = String(document.amendmentIntent_i) + 's';

                            }
                            if (output.amendmentIntent == "1s") output.meta1 = "REVOKED";
                            if (output.amendmentIntent == "0s") output.meta1 = "AMENDED";
                            //TODO: output.description should be the subjectmatter
                            //TODO: keywords should show up in the metadata. if(output.keywords)output.metadata.push(output.keywords);
                            //TODO: the metadata should be a link to download the pdf
                            if (output.usage) output.meta2 = output.usage;

                        } else if (document.schema_s == 'absCheckpointCommunique') {
                            output.recordtype = "nationalRecord";
                            output.sourceCountries = (document.sourceCountries_CEN_ss);
                            // output.title = "Checkpoint communiqué - "+ moment(document.createdDate_dt).format('MM/DD/YYYY hh:mm') ;

                            //TODO: output.description should be the summary of utilization
                            //TODO: the metadata should include a link to download the pdf

                        } else if (document.schema_s == 'database') {
                            output.recordtype = "nationalRecord";
                            output.description = document.description_t;
                            output.meta1  = document.website;
                            //TODO: output.description should be the description
                            //TODO: metadata should be the url opening to a new window
                        } else if (document.schema_s == 'measure') {
                            document.ownerGovernment = {identifier:document.ownerGovernment_s};

                            output.adoption = document.adoption_dt;
                            output.recordtype = "nationalRecord";

                            output.jusrisdiction = document.jurisdiction_EN_t;

                            if (output.jusrisdiction)
                                output.meta1 = output.jusrisdiction;

                            if (document.type_EN_t) {
                                output.type = document.type_EN_t;
                                if (output.type) output.meta2 = output.type;
                            }

                            if (document.status_EN_t) {
                                output.status = document.status_EN_t;
                                if (output.status) output.meta3 = output.status;
                            }

                            // if(document.type_EN_t =="Policy Document")
                            //     output.type_sort = 1;
                            // if(document.type_EN_t =="Law")
                            //     output.type_sort = 2;
                            // if(document.type_EN_t =="Regulatory or Administrative Measures")
                            //     output.type_sort = 3;
                            // if(document.type_EN_t =="Guidelines")
                            //     output.type_sort = 4;
                            // if(document.type_EN_t =="Strategy / Action Plan")
                            //     output.type_sort = 5;
                            // if(document.type_EN_t =="Explanatory Information")
                            //     output.type_sort = 6;
                            // if(document.type_EN_t =="Other")
                            //     output.type_sort = 7;

                            // output.metadata.push(output.type_sort);

                            // if(document.status_EN_t =="Legally binding ")
                            //  output.status_sort = 1;
                            // if(document.status_EN_t =="Not legally binding")
                            //     output.status_sort = 2;
                            // if(document.status_EN_t =="Draft")
                            //     output.status_sort = 3;
                            // if(document.status_EN_t =="Retired")
                            //     output.status_sort = 4;

                            // output.metadata.push(output.status_sort);

                            // if(document.jurisdiction_EN_t =="Regional / Multilateral")
                            //     output.jurisdiction_sort = 1;
                            // if(document.jurisdiction_EN_t =="National / Federal")
                            //     output.jurisdiction_sort = 2;
                            // if(document.jurisdiction_EN_t =="Sub-national")
                            //     output.jurisdiction_sort = 3;
                            // if(document.jurisdiction_EN_t =="Community")
                            //     output.jurisdiction_sort = 4;
                            // if(document.jurisdiction_EN_t =="Other")
                            //     output.jurisdiction_sort = 5;

                            // output.metadata.push(output.jurisdiction_sort);


                        } else if (document.schema_s == 'focalPoint' || document.schema_s == 'database') {
                            output.recordtype = "nationalRecord";
                            output.typeList = document.type_ss;
                            if (document.type_EN_t) {
                                output.type = document.type_EN_t;
                                //if (output.type) output.metadata.push(output.type);
                            }

                            if (document.status_EN_t) {
                                output.status = document.status_EN_t;
                                //if (output.status) output.metadata.push(output.status);
                            }
                        } else if (document.schema_s == 'meeting') {
                            output.createdDateOn = document.startDate_s;
                            output.recordtype = "referenceRecord";
                            output.eventCity = document.eventCity_EN_t;
                            output.eventCountry = document.eventCountry_EN_t;
                            output.description = document.eventCity_EN_t + ' from ' + moment(document.startDate_dt).format('Do MMM YYYY') + ' to ' + moment(document.endDate_dt).format('Do MMM YYYY');

                        }

                        return output;
                    }

                    function getString(source, key) {
                        var lstring = [];
                        if (source != undefined) {
                            source.forEach(function(record) {
                                lstring.push(JSON.parse(record)[key]);
                            });
                            return lstring.toString();
                        }
                    }



                }
            ]

        };
    });
});
