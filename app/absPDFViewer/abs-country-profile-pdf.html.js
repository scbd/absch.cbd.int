var app = angular.module('ngapp', ['ngSanitize', 'appCommon'])

app.controller('printCountryProfile', ['$scope', '$http', '$location', '$sce', '$filter', '$q', function($scope, $http, $location, $sce, $filter, $q) {

            var sLocale = "en";
            $scope.locale = sLocale;

            var realm = $location.search().realm;
            $scope.code = $location.search().country;


            $scope.loadCountryDetails = function() {

                $scope.absch_nfp = null;
                //*******************************************************
                if ($scope.code) {
                    //fix for EU
                    if ($scope.code.toLowerCase() == 'eu')
                        $scope.code = 'eur';

                    $http.get('/api/v2013/countries/' + $scope.code.toUpperCase(), {
                        cache: true
                    }).then(function(response) {

                        $scope.country = response.data;

                        if ($scope.country)
                            $scope.entryIntoForceDate = moment($scope.country.treaties.XXVII8b.deposit).add(90, 'days');
                    });
                    //*******************************************************
                    var schema = ["absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database"]
                    var schemQuery = ' (schema_s:' + schema.join(' OR schema_s:') + ' OR (schema_s:focalPoint AND (type_ss:NP-FP OR type_ss:ABS-IC OR type_ss:ABS-FP)))';
                    var queryURL = '/api/v2013/index/select?fl=id,identifier_s,title_t,description_t,url_ss,schema_EN_t,date_dt,' +
                        'government_s,government_EN_t,schema_s,number_d,aichiTarget_ss,reference_s,sender_s,meeting_ss,recipient_ss,' +
                        'symbol_s,eventCity_EN_t,eventCountry_EN_t,startDate_s,endDate_s,body_s,code_s,meeting_s,group_s,function_t,' +
                        'department_t,organization_t,summary_EN_t,reportType_EN_t,completion_EN_t,jurisdiction_EN_t,development_EN_t' +
                        ',type_ss,email_ss,fax_ss,telephone_s,government_CEN_s,type_EN_t,status_EN_t,entryIntoForce_dt, usage_CEN_ss,keywords_CEN_ss,' +
                        'date_s,informedConsents_s,permit_ss,originCountries_CEN_ss,checkpoint_CEN_ss,createdDate_dt,geneticRessourceUsers_s,authority_s' +
                        '' +
                        '&q=(realm_ss:' + realm.toLowerCase() + ' OR realm_ss:absch) AND ((' + schemQuery +
                        ' AND government_s:' + $scope.code.toLowerCase() + ') OR (originCountries_ss:' +
                        $scope.code.toLowerCase() + ' OR permitSourceCountry_ss:' + $scope.code.toLowerCase() + '))' +
                        '&rows=1000&sort=createdDate_dt+desc,+title_t+asc&start=0&wt=json';
                    var queryCPCRevURL = '/api/v2013/index/select?fl=id,identifier_s,title_t,keywords_CEN_ss' +
                        'checkpoint_CEN_ss,createdDate_dt,geneticRessourceUsers_s,government_s,permit_ss,' +
                        '&q=(realm_ss:' + realm.toLowerCase() + ' OR realm_ss:absch) AND schema_s:absCheckpointCommunique AND (originCountries_ss:' +
                        $scope.code.toLowerCase() + ' OR permitSourceCountry_ss:' + $scope.code.toLowerCase() + ')' +
                        '&rows=100&sort=createdDate_dt+desc,+title_t+asc&start=0&wt=json';

                    var queryProfile = $http.get(queryURL, {cache: true});
                    var queryCPCRecv = $http.get(queryCPCRevURL, {cache: true});

                    $q.all([queryProfile, queryCPCRecv])
                        .then(function(results) {
                            $scope.absch_nfp = results[0].data.response.docs;
                            $scope.cpcReceived = results[1].data.response.docs;
                            console.log(results);
                            $scope.absch_nfp.forEach(function(document) {
                                document.identifier = document.identifier_s;
                                if (document.schema_s == "focalPoint") {
                                    document.description_t = document.description_t.replace(/\n/g, '<br/>');
                                    document.documentId = hexToInteger(document.identifier_s);
                                } else if (document.schema_s == "authority" || document.schema_s == "database" ||
                                    document.schema_s == "absCheckpoint") {
                                    document.description_t = '';
                                    if(document.identifier_s)
                                    $q.when($http.get('/api/v2013/documents/' + document.identifier_s, {info: true}))
                                        .then(function(data) {
                                            var doc = data.data;
                                            var details = '';
                                            if (doc.address)
                                                details += $filter("lstring")(doc.address) + '<br/>';
                                            if (doc.city)
                                                details += $filter("lstring")(doc.city) + '<br/>';
                                            if (doc.postalCode)
                                                details += $filter("lstring")(doc.postalCode) + '<br/>';
                                            if (document.government_CEN_s)
                                                details += $filter("lstring")(JSON.parse(document.government_CEN_s));

                                            document.description_t = details;
                                            document.telephones = doc.phones;
                                            document.emails = doc.emails;
                                            document.doc = data.data;
                                        });
                                } else if (document.schema_s == "absCheckpointCommunique") {

                                    if (document.geneticRessourceUsers_s) {
                                        document.geneticRessourceUsers = $scope.parseJSON(document.geneticRessourceUsers_s);
                                    }
                                }

                            });

                            $scope.cpcReceived.forEach(function(document) {
                                if (document.geneticRessourceUsers_s) {
                                    document.geneticRessourceUsers = $scope.parseJSON(document.geneticRessourceUsers_s);
                                }
                            });

                        });
                }
            }
            $scope.loadCountryDetails();


            $scope.title = function(schema) {

                if (schema == 'authority')
                    return 'Competent National Authority';
                if (schema == 'focalPoint')
                    return 'ABS National Focal Points';
                if (schema == 'absCheckpoint')
                    return 'ABS Checkpoints';
            }

            $scope.isContactInformation = function(entity) {

                return entity && (entity.schema_s == "focalPoint" ||
                    entity.schema_s == "authority" || entity.schema_s == "database" ||
                    entity.schema_s == "absCheckpoint")
            }

            $scope.isMeasure = function(entity) {

                return entity && entity.schema_s == "measure";
            }
            $scope.isCheckpointCommunique = function(entity) {

                return entity && entity.schema_s == "absCheckpointCommunique";
            }

            $scope.isPermit = function(entity) {

                return entity && entity.schema_s == "absPermit";
            }

            $scope.isCheckpointCommuniqueReceived = function(entity) {
                return entity && entity.schema_s == "absCheckpointCommunique" && (entity.originCountries_ss == $scope.code || entity.permitSourceCountry_ss == $scope.code);
            }

            $scope.isCheckpoint = function(entity) {

                return entity && entity.schema_s == "absCheckpoint";
            }
            $scope.isFocalpoint = function(entity) {

                return entity && entity.schema_s == "focalPoint";
            }
            $scope.isDatabase = function(entity) {

                return entity && entity.schema_s == "database";
            }
            $scope.isCNA = function(entity) {

                return entity && entity.schema_s == "authority";
            }

            $scope.getTitle = function(schema, type, schemaFull) {
                if (schema == 'focalPoint') {

                    if (_.contains(type, 'NP-FP') || _.contains(type, 'ABS-FP'))
                        return 'ABS National Focal Point';
                    // else if(_.contains(type,'ABS-IC'))
                    //     return 'ABS ICNP Focal Point';
                    else if (_.contains(type, 'CBD-FP1') || _.contains(type, 'CBD-FP2'))
                        return 'CBD National Focal Point';
                    else
                        return 'National Focal Point';
                } else
                    return schemaFull;

            }
            $scope.parseJSON = function(value) {
                if (value)
                    return JSON.parse(value);
            }
            $scope.isInbetweenParty =function(entity) {
                return entity && (entity.isInbetweenParty
                            ||( entity.treaties && moment().diff(moment(entity.treaties.XXVII8b.deposit), 'days') < 90));
            }

            $scope.isSignatory = function(entity) {
                return entity && entity.treaties.XXVII8b.signature != null;
            }

            $scope.isRatified = function(entity) {
                return entity && (entity.treaties.XXVII8b.instrument == "ratification" ||
                entity.treaties.XXVII8b.instrument == "accession" ||
                entity.treaties.XXVII8b.instrument == "acceptance" || entity.treaties.XXVII8b.instrument == "approval");
            }

            $scope.isNonParties = function(entity) {
                return (entity && ((entity.isInbetweenParty ) || !(entity.treaties.XXVII8b.instrument == "ratification" ||
                entity.treaties.XXVII8b.instrument == "accession" ||
                entity.treaties.XXVII8b.instrument == "acceptance" || entity.treaties.XXVII8b.instrument == "approval")));
            }

            $scope.isNPParty = function(entity) {
                return entity && !entity.isInbetweenParty && (entity.treaties.XXVII8b.instrument == "ratification" ||
                entity.treaties.XXVII8b.instrument == "accession" ||
                entity.treaties.XXVII8b.instrument == "acceptance" || entity.treaties.XXVII8b.instrument == "approval");
            }
            function hexToInteger(hex) {
                if (hex && hex.length == 24)
                    return parseInt(hex.substr(15, 9), 16);

                return hex;
            }

}]);
