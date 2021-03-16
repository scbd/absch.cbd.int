import app from 'app';
import _ from 'lodash';
import 'services/main';
import 'components/scbd-angularjs-services/main';

    app.factory("htmlUtility", function() {
      return {
        encode: function(srcText) {
          return $('<div/>').text(srcText).html();
        }
      };
    });

        app.factory('Enumerable', [function() {
             return Enumerable;
        }])

        app.factory('linqjs', [function() {
             return Enumerable;
        }])

    app.factory('commonjs', ['$http', '$rootScope', 'realm', 'IStorage', '$filter', '$q', 
    'localStorageService', 'Thesaurus',
        function($http, $rootScope, realm, storage, $filter, $q, localStorageService, thesaurus) {
            return new function() {

                var appName = realm.value.replace(/-.*/,'').toLowerCase();
                var appTreaties = {
                    abs: 'XXVII8b',
                    bch: 'XXVII8a'
                }
                // {"_id":"560c75ffc99b3c1b0b91c4ba","code":"XXVII8","name":"Convention on Biological Diversity","acronym":"CBD"},
                // {"_id":"560c7620c99b3c1b0b91c4bb","code":"XXVII8a","name":"Cartagena Protocol on Biosafety","acronym":"CP"},
                // {"_id":"560c768ec99b3c1b0b91c4bc","code":"XXVII8b","name":"Nagoya Protocol on Access and Benefit-sharing","acronym":"NP"},
                // {"_id":"560c76d3c99b3c1b0b91c4bd","code":"XXVII8c","name":"Nagoya - Kuala Lumpur Supplementary Protocol on Liability and Redress","acronym":"NKLSP"}
                //==================================================================================
                this.getReferenceRecordIndex = function(schema, documentId) {

                    var item = [];
                    var queryFields = 'fl=id,identifier_s,schema_s,createdDate_dt,createdByEmail_s,createdBy_s,updatedDate_dt,updatedByEmail_s,updatedBy_s,url_ss,';

                    if (schema.toUpperCase() == "FOCALPOINT" || schema.toUpperCase() == "NFP") {
                        queryFields += 'description_EN_t,government_s,government_EN_t,organization_EN_t,function_EN_t,department_EN_t,title_EN_t,treaty_CEN_ss,type_CEN_ss,email_ss,telephone_ss,ctgList_ss,fax_ss';
                    } else if (schema.toUpperCase() == "MEETING" || schema.toUpperCase() == "MT") {
                        queryFields += 'symbol_s,startDate_dt,endDate_dt,eventCountry_CEN_s,title_s,eventCity_s,text_EN_txt,themes_CEN_ss,thematicAreas_CEN_ss,thematicAreas_ss';
                    } else if (schema.toUpperCase() == "NOTIFICATION" || schema.toUpperCase() == "NT") {
                        queryFields += 'date_s,deadline_s,symbol_s,reference_s,sender_s,schema_CEN_s,title_EN_t,description_EN_t,recipient_ss,url_ss,text_EN_txt';
                    } else if (_.contains(["pressrelease", "statement", "news", "new", "pr", "st", "news", "new"], schema.toLowerCase())) {
                        queryFields += 'date_s,symbol_s,schema_CEN_s,title_EN_t,description_EN_t,themes_CEN_ss,url_ss,thematicAreas_CEN_ss,text_EN_txt';
                    }

                    return $http.get("/api/v2013/index/select?" + queryFields + "&q=id:" + documentId)
                        .then(function(result) {

                            item.data = result.data.response.docs[0];

                            item.data.info = {};
                            item.data.header = {
                                'schema': item.data.schema_s
                            };
                            if (item.data.createdBy_s) {
                                item.data.info.createdBy = { firstName : item.data.createdBy_s , email : item.data.createdByEmail_s };
                            }
                            item.data.info.createdOn = item.data.createdDate_dt;
                            if (item.data.updatedBy_s) {
                                item.data.info.updatedBy = { firstName : item.data.updatedBy_s , email : item.data.updatedByEmail_s };
                            }
                            item.data.info.updatedOn = item.data.updatedDate_dt;
                            item.data.header.identifier = item.data.identifier_s;

                            return item;
                        });
                }
                //==================================================================================
                this.getCountries = function(sort) {

                    var fromStorage = localStorageService.get('countries');
                    if(fromStorage){//&& fromStorage.expiry < new date())
                        if(sort){
                            return $filter('orderBy')(fromStorage, sort)
                        }
                        return fromStorage;
                    }

                    var sortField = sort||'name.en';
                    var sortBy = {};
                    sortBy[sortField] = 1;
                    return $http.get('/api/v2013/countries', {
                            cache: true, params : { s : sortBy }
                        })
                        .then(function(response) {
                            var countries = _.map(response.data,formatCountry);
                            localStorageService.set('countries', countries);
                            return countries;
                        });
                };
                //==================================================================================
                this.getCountry = function(code) {

                    var fromStorage = localStorageService.get('countries');
                    if(fromStorage){
                        var country = _.find(fromStorage, {code : code});
                        if(country)
                            return country;
                    }
                    return $http.get('/api/v2013/countries/' + code.toUpperCase(), {cache: true })
                        .then(function(response) {
                            return formatCountry(response.data);
                        });
                }
                //==================================================================================
                this.isParty = function(entity) {
                    return isParty(entity);
                }
                //==================================================================================
                this.isPartyToCBD = function(entity) {
                    return isPartyToCBD(entity);
                }
                //==================================================================================
                this.isSignatory = function(entity) {
                    return isSignatory(entity);
                }
                //==================================================================================
                this.isRatified = function(entity) {
                    return isRatified(entity);
                }
                //==================================================================================
                this.getNFPText = function(cdgList) {

                    if (!cdgList)
                        return;
                    //if ((_.indexOf(cdgList, 'NP-FP') >= 0 || _.indexOf(cdgList, 'ABS-FP') >= 0) && (_.indexOf(cdgList, 'CBD-FP1') >= 0 || _.indexOf(cdgList, 'CBD-FP2') >= 0))
                    //    return "ABS National Focal Point";
                    // else if(_.indexOf(cdgList, 'ABS-IC')>= 0 && (_.indexOf(cdgList, 'CBD-FP1')>= 0 || _.indexOf(cdgList, 'CBD-FP2')>= 0))
                    //     return "ICNP/CBD Focal Point";
                    if (_.indexOf(cdgList, 'NP-FP') >= 0 || _.indexOf(cdgList, 'ABS-FP') >= 0)
                        return "ABS National Focal Point";
                    // else if(_.indexOf(cdgList, 'ABS-IC')>= 0)
                    //     return "ABS ICNP Focal Point";
                    else if (_.indexOf(cdgList, 'CBD-FP1') >= 0)
                        return "CBD Primary Focal Point";
                    else if (_.indexOf(cdgList, 'CBD-FP2') >= 0)
                        return "CBD Secondary Focal Point";

                    return "";

                }
                //==================================================================================
                this.hexToInteger = function(hex) {
                    if (hex && hex.length >= 24)
                        return parseInt(hex.substr(15, 9), 16);

                    return hex;
                }
                //==================================================================================
                this.integerToHex = function(d, schema) {
                    if(!schema)
                        return d;

                    var schemaCode = '';
                    if (_.contains(["pressrelease", "statement", "news", "new", "pr", "st", "news", "new"], schema.toLowerCase()))
                        schemaCode = "52000000cbd0180000000000";
                    else if (schema.toLowerCase() == "notification" || schema.toLowerCase() == "nt")
                        schemaCode = "52000000cbd0120000000000";
                    else if (schema.toLowerCase() == "meeting" || schema.toLowerCase() == "mt")
                        schemaCode = "52000000cbd0050000000000";
                    else if ((schema.toLowerCase() == "focalpoint" || schema.toLowerCase() == "nfp") && /^[0-9]\d{3}$/.test(d)) //handle incase if user types nfp number
                        schemaCode = "52000000cbd0220000000000";                    
                    else if (schema.toLowerCase() == "nationalrecord")
                        schemaCode = "52000000cbd0800000000000";

                    if (schemaCode == '')
                        return d;

                    var hex = Number(d).toString(16);
                    hex = schemaCode.substr(0, 24 - hex.length) + hex;

                    return hex;
                }
                //==================================================================================
                this.getCountriesMultilateralMeasures = function(countryList) {

                    var q = 'realm_ss:' + realm.value.toLowerCase() + ' AND NOT version_s:* AND schema_s:measure ';
                    q += 'AND jurisdictionRegions_REL_ss:(' + countryList + ')'

                    var queryParameters = {
                        'q': q,
                        'fl': 'id,identifier_s,title_t,createdDate_dt,description_t,url_ss,schema_EN_t,jurisdiction_EN_t,jurisdiction_s,uniqueIdentifier_s,schema_s,' +
                            'government_s,status_EN_t,type_EN_t,endDate_dt,startDate_dt,amendmentIntent_i,resourceLinksLanguage_ss,type_ss,jurisdictionRegions_REL_ss,jurisdictionRegions_ss',
                        'wt': 'json',
                        'start': 0,
                        'rows': 1000
                    };
                    return $http.get('/api/v2013/index', {
                        params: queryParameters
                    });

                };
                //==================================================================================
                this.loadSchemaDocumentsForDropdown = function(schema, currentDocumentIdentifier) {
                    var permit = storage.documents.query("(type eq '" + schema + "')", undefined);
                    return $q.when(permit).then(function(o) {
                        var permits = [];
                        var permitData = o.data.Items.map(function(permit) {
                            if (permit.identifier != currentDocumentIdentifier) {
                                var uniqueID = $filter("uniqueID")(permit); //'ABSCH-MSR-' + $filter("uppercase")(permit.metadata.government) + '-' + permit.documentID;
                                return $q.when(uniqueID)
                                    .then(function(uniqueIdentifier) {
                                        return {
                                            "title": permit.title.en + ' (' + uniqueIdentifier + ')',
                                            "identifier": permit.identifier + '@' + permit.revision
                                        };
                                    });
                            }
                        });
                        return $q.all(permitData)
                            .then(function(data) {
                                _.map(data, function(permit) {
                                    permits.push(permit);
                                });
                                return permits;
                            });
                    });
                };
                //==================================================================================
                this.updateFacets = function(facets, data) {

                    if (!facets)
                        return data;

                    _.each(facets, function(facet) {
                        var item = _.where(data, {
                            identifier: facet.symbol
                        });
                        if (item.length > 0) {
                            item[0].metadata = {
                                facet: facet.count
                            };
                            item[0].title.en += ' (' + facet.count + ')';
                        }
                    });
                    return data;
                }

                //==================================================================================
                this.snake_case = function(name, separator) {
                    separator = separator || '-';
                    return name.replace(/[A-Z]/g, function(letter, pos) {
                        return (pos ? separator : '') + letter.toLowerCase();
                    });
                };
                //==================================================================================
                this.loadReferenceDocument = function(identifier){

                    var documentInfo = storage.documents.get(identifier, {info:true});
                    var document = storage.documents.get(identifier);

                    return $q.all([document,documentInfo])
                            .then(function(results){
                                var document = results[0].data;
                                document.info = results[1].data;

                                return document;
                            });
                };
                //==================================================================================
                this.getRegions = function(){

                    return $http.get('/api/v2013/thesaurus/domains/regions/terms').then(function (response) {

                        var termsTree = thesaurus.buildTree(response.data);
                        var classes   = _.filter(termsTree, function where (o) { return !!o.narrowerTerms && o.identifier!='1796f3f3-13ae-4c71-a5d2-0df261e4f218';});

                        return classes;
                    });

                }

                //==================================================================================
                this.getThematicAreas= function(){
                     return $http.get('/api/v2013/thesaurus/domains/CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return  response.data;//_.filter(termsTree, function where (o) { return !!o.narrowerTerms;});
                    });
                }
                //==================================================================================
                this.getKeyAreas= function(){
                     return $http.get('/api/v2013/thesaurus/domains/2B2A5166-F949-4B1E-888F-A7976E76320B/terms').then(function (response) {
                        var termsTree = thesaurus.buildTree(response.data);
                        return  _.filter(termsTree, function where (o) { return !!o.narrowerTerms;});
                    });
                }
                //==================================================================================
                this.getMSR_types= function(){
                     return $http.get('/api/v2013/thesaurus/domains/144CF550-7629-43F3-817E-CACDED34837E/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }

                //==================================================================================
                this.getJurisdictions= function(){
                     return $http.get('/api/v2013/thesaurus/domains/4D4413D8-36F9-4CD2-8CC1-4F3C866DDE5A/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }

                 //==================================================================================
                this.getMSR_jurisdictions= function(){
                     return $http.get('/api/v2013/thesaurus/domains/7A56954F-7430-4B8B-B733-54B8A5E7FF40/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }
                 //==================================================================================
                this.getMSR_modelcontract= function(){
                     return $http.get('/api/v2013/thesaurus/terms/48D40B9E207B43948D95A0BA8F0D710F').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }

                 //==================================================================================
                this.getMSR_elements= function(){
                      return $http.get('/api/v2013/thesaurus/domains/50616B56-12F3-4C46-BC43-2DFC26679177/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }

                  //==================================================================================
                this.getMSR_status= function(){
                     return $http.get('/api/v2013/thesaurus/domains/ED7CDBD8-7762-4A84-82DD-30C01458A799/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }
                  //==================================================================================
                this.getCNA_jurisdictions= function(){
                     return $http.get('/api/v2013/thesaurus/domains/D7BD5BDE-A6B9-4261-B788-16839CCC4F7E/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }

                 //==================================================================================
                this.getCNA_scope= function(){
                     return $http.get('/api/v2013/thesaurus/domains/1A22EAAB-9BBC-4543-890E-DEF913F59E98/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }

                 //==================================================================================
                // this.getIRCC_use= function(){
                //      return $http.get('/api/v2013/thesaurus/domains/A7B77788-8C90-4849-9327-E181E9522F3A/terms').then(function (response) {
                //         //var termsTree = thesaurus.buildTree(response.data);
                //         return response.data;
                //     });
                // }

                 //==================================================================================
                this.getMCC_keywords= function(){
                     return $http.get('/api/v2013/thesaurus/domains/ABS-A1920-Keywords/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }
                  //==================================================================================
                this.getCBI_cats= function(){
                     return $http.get('/api/v2013/thesaurus/domains/579F448B-ECA8-4258-B130-3EAA68056D1F/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }
                 //==================================================================================
                this.getCBI_types= function(){
                     return $http.get('/api/v2013/thesaurus/domains/D935D0C8-F5A5-43B8-9E06-45A57BF3C731/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }
                  //==================================================================================
                this.getCBI_types1= function(){
                     return $http.get('/api/v2013/thesaurus/domains/5CA7AACE-CB79-4146-BF12-B3B1955AFF17/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }

                  //==================================================================================
                // this.getCBI_cats1= function(){
                //      return $http.get('/api/v2013/thesaurus/domains/7178400C-B8A6-4794-B363-0366FD324DA7/terms').then(function (response) {
                //         //var termsTree = thesaurus.buildTree(response.data);
                //         return response.data;
                //     });
                // }

                  //==================================================================================
                this.getCBI_trainingTypes= function(){
                     return $http.get('/api/v2013/thesaurus/domains/D6E6A4AA-8B88-4AE9-AF5C-9CB852FFE4DC/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }

                 //==================================================================================
                this.getCBI_audience= function(){
                     return $http.get('/api/v2013/thesaurus/domains/AFB155C4-93A6-402C-B812-CFC7488ED651/terms').then(function (response) {
                        return response.data;
                    });
                }

                 //==================================================================================
                this.getCBI_fundingsrc= function(){
                     return $http.get('/api/v2013/thesaurus/domains/Capacity Building Project Funding Types/terms').then(function (response) {
                        return response.data;
                    });
                }


                 //==================================================================================
                this.getCBI_status= function(){
                     return $http.get('/api/v2013/thesaurus/domains/4E7731C7-791E-46E9-A579-7272AF261FED/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }
                 //==================================================================================
                this.getCBR_level= function(){
                     return $http.get('/api/v2013/thesaurus/domains/1B57D9C3-F5F8-4875-94DC-93E427F3BFD8/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }

                //  //==================================================================================
                // this.getCBR_target= function(){
                //      return $http.get('/api/v2013/thesaurus/domains/AFB155C4-93A6-402C-B812-CFC7488ED651/terms').then(function (response) {
                //         //var termsTree = thesaurus.buildTree(response.data);
                //         return response.data;
                //     });
                // }
                 //==================================================================================
                this.getCBR_purpose= function(){
                     return $http.get('/api/v2013/thesaurus/domains/E712C9CD-437E-454F-BA72-E7D20E4C28ED/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }

                 //==================================================================================
                this.getCBR_formats= function(){
                     return $http.get('/api/v2013/thesaurus/domains/D2D97AB3-4D20-41D4-8CBE-B21C33924823/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }

                 //==================================================================================
                this.getCPP_types= function(){
                     return $http.get('/api/v2013/thesaurus/domains/ED9BE33E-B754-4E31-A513-002316D0D602/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }
                 //==================================================================================
                this.getMCC_types= function(){
                     return $http.get('/api/v2013/thesaurus/domains/840427E5-E5AC-4578-B238-C81EAEEDBDD8/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }



                 //==================================================================================
                this.getAichiTargets= function(){
                     return $http.get('/api/v2013/thesaurus/domains/AICHI-TARGETS/terms').then(function (response) {
                        //var termsTree = thesaurus.buildTree(response.data);
                        return response.data;
                    });
                }




                // //==================================================================================
                // this.getAllKeywords = function(){


                //     var termsTree;
                //      retrun $http.get('/api/v2013/thesaurus/domains/CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924/terms').then(function (response) {
                //         var termsTree = thesaurus.buildTree(response.data);
                //         return  _.filter(termsTree, function where (o) { return !!o.narrowerTerms && o.identifier!='1796f3f3-13ae-4c71-a5d2-0df261e4f218';});
                //     });

                //     //ABS key areas
                //      keywords['keyAreas'] =  $http.get('/api/v2013/thesaurus/domains/2B2A5166-F949-4B1E-888F-A7976E76320B/terms').then(function (response) {
                //         termsTree = thesaurus.buildTree(response.data);
                //         return _.filter(termsTree, function where (o) { return !!o.narrowerTerms && o.identifier!='1796f3f3-13ae-4c71-a5d2-0df261e4f218';});
                //     });

                //     return  keywords;

                // }

                //==================================================================================
                this.getAllKeywords = function(){

                    var keywords = [];
                    var thematicAreas;
                    var keyAreas;
                    var termsTree;

                    //ABS thematic areas
                   keywords['thematicAreas'] =  $http.get('/api/v2013/thesaurus/domains/CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924/terms').then(function (response) {
                        termsTree = thesaurus.buildTree(response.data);
                        return  _.filter(termsTree, function where (o) { return !!o.narrowerTerms && o.identifier!='1796f3f3-13ae-4c71-a5d2-0df261e4f218';});
                    });

                    //ABS key areas
                     keywords['keyAreas'] =  $http.get('/api/v2013/thesaurus/domains/2B2A5166-F949-4B1E-888F-A7976E76320B/terms').then(function (response) {
                        termsTree = thesaurus.buildTree(response.data);
                        return _.filter(termsTree, function where (o) { return !!o.narrowerTerms && o.identifier!='1796f3f3-13ae-4c71-a5d2-0df261e4f218';});
                    });

                    return  keywords;

                }

                this.loadJsonFile = function(filePath){
                    var deferred = $q.defer();  

                    require([filePath], function(res){

                        deferred.resolve(res);

                    });

                    return deferred.promise;
                }

                this.languages = {
                    ar : "Arabic",
                    en : "English",
                    es : "Spanish",
                    fr : "French",
                    ru : "Russian",
                    zh : "Chinese"
                }




                //==================================================================================
                function flatten(items, collection) {
                    items.forEach(function (item) {
                        item.selected = false;
                        collection[item.identifier] = item;
                        if(item.narrowerTerms)
                            flatten(item.narrowerTerms, collection);
                    });
                    return collection;
                }
                //==================================================================================
                function formatCountry(countryDetails){
                    
                    var country = {};
                    var treaties = countryDetails.treaties;
                    country.name = countryDetails.name;
                    country.code = countryDetails.code;

                    country.isCBDParty = isPartyToCBD(countryDetails) || country.code == 'EU';
                    country.isParty = isParty(countryDetails) || country.code == 'EU';
                    country.isSignatory = isSignatory(countryDetails) || country.code == 'EU';
                    country.isRatified = isRatified(countryDetails) || country.code == 'EU';
                    country.isInbetweenParty = moment.utc().diff(moment.utc(treaties[appTreaties[appName]].deposit), 'days') < 90;
                                            
                    country.dateDeposit = countryDetails.treaties[appTreaties[appName]].deposit;
                    country.instrument  = countryDetails.treaties[appTreaties[appName]].instrument;
                    country.dateSigned  = countryDetails.treaties[appTreaties[appName]].signature;
                    country.treaties    = countryDetails.treaties;
                    
                    if (country.isInbetweenParty)
                        country.entryIntoForce = moment.utc(treaties[appTreaties[appName]].deposit).add(90, 'day');
                    else
                        country.entryIntoForce = treaties[appTreaties[appName]].party;

                    return country;
                }                

                //==================================================================================
                function isParty(entity) {

                    if (entity && entity.isParty != undefined)
                        return entity.isParty;

                    if (entity && entity.isInbetweenParty != undefined)
                        return entity.isInbetweenParty;

                    return entity &&                         
                        (   
                            moment.utc().diff(moment.utc(entity.treaties[appTreaties[appName]].deposit), 'days') >= 90 || 
                            moment.utc(entity.treaties[appTreaties[appName]].party <= moment.utc())
                        ) && 
                        (
                            entity.treaties[appTreaties[appName]].instrument == "ratification"  ||
                            entity.treaties[appTreaties[appName]].instrument == "accession"     ||
                            entity.treaties[appTreaties[appName]].instrument == "acceptance"    || 
                            entity.treaties[appTreaties[appName]].instrument == "approval"      ||
                            entity.treaties[appTreaties[appName]].instrument == "succession"
                        );
                }
                //==================================================================================
                function isPartyToCBD(entity) {

                    if (entity && entity.isCBDParty != undefined)
                        return entity.isCBDParty;

                    return entity && entity.treaties.XXVII8.party != null;
                }
                //==================================================================================
                function isSignatory(entity) {

                    if (entity && entity.isSignatory != undefined)
                        return entity.isSignatory;

                    return entity && entity.treaties[appTreaties[appName]].signature != null;
                }
                //==================================================================================
                function isRatified(entity) {

                    if (entity && entity.isRatified != undefined)
                        return entity.isRatified;

                    return entity && (entity.treaties[appTreaties[appName]].instrument == "ratification" ||
                        entity.treaties[appTreaties[appName]].instrument == "accession" ||
                        entity.treaties[appTreaties[appName]].instrument == "acceptance" || entity.treaties[appTreaties[appName]].instrument == "approval");
                }

                //==================================================================================
                function showHelp(entity) {

                    if (entity && entity.isCBDParty != undefined)
                        return entity.isCBDParty;

                    return entity && entity.treaties.XXVII8.party != null;
                }


            }
        }
    ]);