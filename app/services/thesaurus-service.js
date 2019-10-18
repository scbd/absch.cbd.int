define(['app', 'underscore'], function (app, _) {

    app.factory('thesaurusService', ['$http', '$q', function ($http, $q) {
        return new function () {


            this.getDomains = function(domainIdentifier){

                return $http.get('/api/v2013/thesaurus/domains/' + domainIdentifier , {cache:true});
            };

            this.getDomainTerms = function(termIdentifier, options){
                return fn_getDomainTerms(termIdentifier, options);
            };

            this.getTerms = function(term){
                return $http.get('/api/v2013/thesaurus/terms/' + (terms[term]||term) , {cache:true})
                .then(function(termData){
                    return termData.data;
                });;
            };

            function fn_getDomainTerms(termIdentifier, options){
                if(!termIdentifier)
                    throw "Domain term is missing";

                options = options || {};
                var url = '/api/v2013/thesaurus/domains/' + domainTerms[termIdentifier] + '/terms';

                if(options.other){
                    var urlOther = '/api/v2013/thesaurus/terms/' + domainTerms['other'];
                    return $q.all([$http.get(url, {cache:true}),$http.get(urlOther), {cache:true}])
                                .then(function(termData){
                                    var data   = termData[0].data;
                                    var other  = termData[1].data;
                                    other.type = options.otherType; //lstring or int etc
                                    data.push(other);
                                    return data;
                                });
                }
                if(termIdentifier == 'other'){
                    url = '/api/v2013/thesaurus/terms/' + domainTerms.other;
                    return $q.when($http.get(url, {cache:true}))
                             .then(function(data){
                                return data.data;
                             });
                }

                return $q.when($http.get(url, {cache:true}))
                            .then(function(data){
                                return data.data;
                            });
            }
            var terms = {
                other                   : "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
            }
            var domainTerms = {
                countries                : "countries",
                regions                  : "regions",
                other                    : "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                jurisdiction             : "7A56954F-7430-4B8B-B733-54B8A5E7FF40",
                status                   : "ED7CDBD8-7762-4A84-82DD-30C01458A799",
                typeOfDocuments          : "144CF550-7629-43F3-817E-CACDED34837E",                
                cnaJurisdictions         : "D7BD5BDE-A6B9-4261-B788-16839CCC4F7E",
                absGeneticResourceTypes  : "1A22EAAB-9BBC-4543-890E-DEF913F59E98",
                keywords                 : "1A22EAAB-9BBC-4543-890E-DEF913F59E98",//duplicate?
                usage                    : "A7B77788-8C90-4849-9327-E181E9522F3A",
                cpJurisdictions          : "D7BD5BDE-A6B9-4261-B788-16839CCC4F7E",
                resourceTypes            : "83BA4728-A843-442B-9664-705F55A8EC52",
                absSubjects              : "CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924",
                mccResourceTypes         : "840427E5-E5AC-4578-B238-C81EAEEDBDD8",
                cppResourceTypes         : "ED9BE33E-B754-4E31-A513-002316D0D602",
                languages                : "ISO639-2",


                decisionTypes            :  'DecisionTypes',
                decisionLMOFFPSubject    :  'DecisionLMOFFPSubject',
                decisionResults          :  'DecisionResults',
                riskAssessmentScope      :  'RiskAssessmentScope',
                dnaSequenceFamily        :  '82DAAF04-6698-4CA6-81D5-F200AE64C63A',
                dnaSequenceTraits        :  'B8EB2261-7695-4DC5-9C4E-026D380DA7CB',
                legislationAgreementTypes:  'Legislation And Agreement Types',
                subjectAreas             :  'Subject Areas',
                typeOfOrganisms          :  'TypeOfOrganisms',
                domestication            :  'B89720B8-81BF-4A6B-8084-8D464403C25A',
                OrganismCommonUses       :  'OrganismCommonUses',
                techniqueUsed            :  'ABE9DCE3-92BA-4D5D-8948-7F7E541EEC6B',
                organizationTypes        :  'Organization Types',
                expertiseArea            :  '31855BDF-ADFF-460A-8FB8-975C8C325DAA',
                supplementaryProtocolFunctions: 'CD613FCE-7A2A-475C-85A1-C2D1C208EC0C',
                focalPointTypes          :  'FocalPoint Types'
                
            }
        }
    }]);
});
