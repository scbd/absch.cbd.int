define(['app', 'services/cache-service'], function (app) {

    app.factory('thesaurusService', ['$http', '$q', 'cacheService', function ($http, $q, cacheService) {
        var termsCacheFactory = cacheService.getCacheFactory({name:'terms', storageMode:'localStorage', maxAge:24*60*60*1000})//one day cache for terms

        return new function () {


            this.getDomains = function(domainIdentifier, params){

                return $http.get('/api/v2013/thesaurus/domains/' + encodeURIComponent(domainIdentifier) , {params:params, cache:termsCacheFactory});
            };

            this.getDomainTerms = function(termIdentifier, options){
                return fn_getDomainTerms(termIdentifier, options);
            };

            this.getTerms = function(term, params){
                return $http.get('/api/v2013/thesaurus/terms/' + encodeURIComponent((terms[term]||term)) , {params:params, cache:termsCacheFactory})
                .then(function(termData){
                    return termData.data;
                });;
            };

            function fn_getDomainTerms(termIdentifier, options){
                if(!termIdentifier)
                    throw "Domain term is missing";

                    options = options || {};
                var url     = '/api/v2013/thesaurus/domains/' + encodeURIComponent(domainTerms[termIdentifier]) + '/terms';

                if(options.other){
                    var urlOther = '/api/v2013/thesaurus/terms/' + encodeURIComponent(domainTerms['other']);
                    return $q.all([$http.get(url, {params:options.params, cache:termsCacheFactory}),$http.get(urlOther, {cache:termsCacheFactory})])
                                .then(function(termData){
                                    var data       = termData[0].data;

                                    if(options.narrowerOf){//
                                        var narrowerOf = _.find(data, {identifier:options.narrowerOf})
                                        data = _.filter(data, function(term){
                                            return _.contains(narrowerOf.narrowerTerms, term.identifier)
                                        });
                                    }

                                    var other      = termData[1].data;
                                        other.type = options.otherType;  //lstring or int etc
                                    other.multiple = options.multiple;  //lstring or int etc
                                    data.push(other);
                                    return data;
                                });
                }
                if(termIdentifier == 'other'){
                    url = '/api/v2013/thesaurus/terms/' + encodeURIComponent(domainTerms.other);
                    return $q.when($http.get(url, {cache:termsCacheFactory}))
                             .then(function(data){
                                return data.data;
                             });
                }

                return $q.when($http.get(url, {cache:termsCacheFactory}))
                            .then(function(data){
                                return data.data;
                            });
            }
            var terms = {
                other: "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                eu   : "bd12d7fb-91f7-4b2d-996c-e70f18a51f0e"
            }

            var domainTerms = {
                other                  : "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                jurisdiction           : "7A56954F-7430-4B8B-B733-54B8A5E7FF40",
                msrJurisdictions       : '7A56954F-7430-4B8B-B733-54B8A5E7FF40',  // was mSR_jurisdictions, used in abs-left-menu-filters.jason replaced with jurisdictions
                lawJurisdictions       : '5001DC0F-908A-4983-8962-EBF4FC18F245',   //contains extra term which is in use for abs, need to removed for bch
                cpJurisdictions        : "D7BD5BDE-A6B9-4261-B788-16839CCC4F7E",
                cnaJurisdictions       : 'D7BD5BDE-A6B9-4261-B788-16839CCC4F7E',
                keywords               : "1A22EAAB-9BBC-4543-890E-DEF913F59E98",
                cnaKeywords            : '1A22EAAB-9BBC-4543-890E-DEF913F59E98',
                cnaScope               : '1A22EAAB-9BBC-4543-890E-DEF913F59E98',  // was cNA_scope, not used, duplicate of cnaKeywords and keywords
                thematicAreas          : 'CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924',  // thematicAreas, absSubjects, allKeywords
                allKeywords            : 'CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924',
                absSubjects            : "CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924",
                keyAreas               : '2B2A5166-F949-4B1E-888F-A7976E76320B', 
                aBSkeyareas            : '2B2A5166-F949-4B1E-888F-A7976E76320B',
                status                 : "ED7CDBD8-7762-4A84-82DD-30C01458A799", 
                msrStatus              : 'ED7CDBD8-7762-4A84-82DD-30C01458A799', // was mSR_status, used in abs-left-filters.jason replaced with status
                typeOfDocuments        : "144CF550-7629-43F3-817E-CACDED34837E", 
                msrTypes               : '144CF550-7629-43F3-817E-CACDED34837E', // was mSR_types, not used, duplicate of typeOfDocuments
                mccResourceTypes       : "840427E5-E5AC-4578-B238-C81EAEEDBDD8", 
                mccTypes               : '840427E5-E5AC-4578-B238-C81EAEEDBDD8', // was mCC_types, not used, duplicate of mccResourceTypes
                cppResourceTypes       : "ED9BE33E-B754-4E31-A513-002316D0D602", 
                cppTypes               : 'ED9BE33E-B754-4E31-A513-002316D0D602', // was cPP_Types, not used, duplicate of cppResourceTypes
                absGeneticResourceTypes: '20945FA8-C24C-4AF6-B3D9-367592AFDF48',
                absGeneticResourceAreas: '545CD54C-CFF3-41E8-A003-FDD278426A3A',
                absFunctions           : '8102E184-E282-47F7-A49F-4C219B0EE235',
                usage                  : "A7B77788-8C90-4849-9327-E181E9522F3A",
                resourceTypes          : "83BA4728-A843-442B-9664-705F55A8EC52",
                jurisdictions          : '4D4413D8-36F9-4CD2-8CC1-4F3C866DDE5A', 
                dnaSequenceFamily      : '82DAAF04-6698-4CA6-81D5-F200AE64C63A',
                dnaSequenceTraits      : 'B8EB2261-7695-4DC5-9C4E-026D380DA7CB',
                domestication          : 'B89720B8-81BF-4A6B-8084-8D464403C25A',
                techniqueUsed          : 'ABE9DCE3-92BA-4D5D-8948-7F7E541EEC6B',
                expertiseArea          : '31855BDF-ADFF-460A-8FB8-975C8C325DAA',
                services               : 'DE2D1321-AD01-4C49-8D48-E7BD4EA14226',
                detectionMethods       : '81EE782D-810C-4107-8E8F-F7A6EE4CD1B5',
                unLanguages            : '52AFC0EE-7A02-4EFA-9277-8B6C327CE21F',
                areasOfExpertise       : 'E4D79BA6-12F8-48D5-B396-25951FA1E07E',
                cpbThematicAreas       : '043C7F0D-2226-4E54-A56F-EE0B74CCC984',
                supplementaryProtocolFunctions: 'CD613FCE-7A2A-475C-85A1-C2D1C208EC0C',

                cbiCats                : '579F448B-ECA8-4258-B130-3EAA68056D1F',    // was cBI_cats. updated in CBI
                cbiTypes               : 'D935D0C8-F5A5-43B8-9E06-45A57BF3C731',    // was cBI_types, updated in CBI
                cbiCpbTypes            : '5CA7AACE-CB79-4146-BF12-B3B1955AFF17',    // was cBI_types1, used in BCH CBI scope of activity
                cbiAudience            : 'AFB155C4-93A6-402C-B812-CFC7488ED651',    // was cBI_audience, updated in CBI
                cbiFundingsrc          : 'Capacity Building Project Funding Types', // was cBI_fundingsrc, updated in CBI
                cbiStatus              : '4E7731C7-791E-46E9-A579-7272AF261FED',    // was cBI_status, updated in CBI
                msrElements            : '50616B56-12F3-4C46-BC43-2DFC26679177',    // was mSR_elements, used in search-directive.js   

                msrModelcontract       : '48D40B9E207B43948D95A0BA8F0D710F',       // was mSR_modelcontract, not used
                mccKeywords            : 'ABS-A1920-Keywords',                     // was mCC_keywords, not used
                cbrLevel               : '1B57D9C3-F5F8-4875-94DC-93E427F3BFD8',   // was cBR_level, not used
                cbrPurpose             : 'E712C9CD-437E-454F-BA72-E7D20E4C28ED',   // was cBR_purpose, not used
                cbrFormats             : 'D2D97AB3-4D20-41D4-8CBE-B21C33924823',   // was cBR_formats, not used
                cbiTrainingTypes       : 'D6E6A4AA-8B88-4AE9-AF5C-9CB852FFE4DC',   // was cBI_trainingTypes, not used
                bchRaSubjects          : '69B43BB5-693B-4ED9-8FE0-95895E144142',

                cbdSubjects            : 'CBD-SUBJECTS',
                decisionTypes          : 'DecisionTypes',
                decisionLMOFFPSubject  : 'DecisionLMOFFPSubject',
                decisionResults        : 'DecisionResults',
                riskAssessmentScope    : 'RiskAssessmentScope',
                subjectAreas           : 'Subject Areas',
                typeOfOrganisms        : 'TypeOfOrganisms',
                OrganismCommonUses     : 'OrganismCommonUses',
                organizationTypes      : 'Organization Types',  
                focalPointTypes        : 'FocalPoint Types',
                geographicRegions      : 'geographic-regions',
                nationalities          : 'Nationalities',
                genders                : 'Genders',
                countries              : "countries",
                regions                : "regions",
                languages              : "ISO639-2",
                aichiTargets           : 'AICHI-TARGETS',
                legislationAgreementTypes : 'Legislation And Agreement Types',
                bchRaAuthorAffiliation  :   'Organization Types',


                //===========================  Terms to be removed  ==========================\\

                //===============Terms used in other files ==============\\ 
                mSR_status       : 'ED7CDBD8-7762-4A84-82DD-30C01458A799',   // updated to msrStatus, used in abs-left-filters.jason replaced with status
                mSR_elements     : '50616B56-12F3-4C46-BC43-2DFC26679177',   // updated to msrElement, used in search-directive.js replaced with msrElement
                mSR_jurisdictions: '7A56954F-7430-4B8B-B733-54B8A5E7FF40',   // updated to msrJurisdictions, used in abs-left-menu-filters.jason replaced with jurisdictions
                //===============Terms Not used==========================\\
                mSR_modelcontract: '48D40B9E207B43948D95A0BA8F0D710F',       // updated to msrModelcontract, not used
                mCC_keywords     : 'ABS-A1920-Keywords',                     // updated to mccKeywords, not used
                cBR_level        : '1B57D9C3-F5F8-4875-94DC-93E427F3BFD8',   // updated to cbrLevel, not used
                cBR_purpose      : 'E712C9CD-437E-454F-BA72-E7D20E4C28ED',   // updated to cbrPurpose, not used
                cBR_formats      : 'D2D97AB3-4D20-41D4-8CBE-B21C33924823',   // updated to cbrFormats, not used
                cBI_trainingTypes: 'D6E6A4AA-8B88-4AE9-AF5C-9CB852FFE4DC',   // updated to cbiTrainingTypes, not used
                //===============Duplicates=============================\\
                cPP_types        : 'ED9BE33E-B754-4E31-A513-002316D0D602',   // updated to cppTypes, not used, duplicate of cppResourceTypes
                mCC_types        : '840427E5-E5AC-4578-B238-C81EAEEDBDD8',   // updated to mccTypes, not used, duplicate of mccResourceTypes
                cNA_scope        : '1A22EAAB-9BBC-4543-890E-DEF913F59E98',   // updated to cnaScope, not used, duplicate of cnaKeywords and keywords
                mSR_types        : '144CF550-7629-43F3-817E-CACDED34837E',   // updated to msrTypes, not used, duplicate of typeOfDocuments
                cNA_jurisdictions: 'D7BD5BDE-A6B9-4261-B788-16839CCC4F7E',   // cnaJurisdictions was already available, not used
                //===============updated in CBI=========================\\
                cBI_cats         : '579F448B-ECA8-4258-B130-3EAA68056D1F',
                cBI_types        : 'D935D0C8-F5A5-43B8-9E06-45A57BF3C731',
                cBI_types1       : '5CA7AACE-CB79-4146-BF12-B3B1955AFF17',
                cBI_audience     : 'AFB155C4-93A6-402C-B812-CFC7488ED651',
                cBI_status       : '4E7731C7-791E-46E9-A579-7272AF261FED',
                cBI_fundingsrc   : 'Capacity Building Project Funding Types',
            }
        }
    }]);
});