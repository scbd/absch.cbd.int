define(['app', 'underscore'], function (app, _) {

    app.factory('thesaurusService', ['$http', '$q', function ($http, $q) {
        return new function () {


            this.getDomains = function(domainIdentifier){

                return $http.get('/api/v2013/thesaurus/domains/' + domainIdentifier , {cache:true});
            };

            this.getDomainTerms = function(termIdentifier, includeOthers){
                return fn_getDomainTerms(termIdentifier, includeOthers);
            };

            function fn_getDomainTerms(termIdentifier, includeOthers){
                if(!termIdentifier)
                    throw "Domain term is missing";

                var url = '/api/v2013/thesaurus/domains/' + domainTerms[termIdentifier] + '/terms';

                if(includeOthers){
                    var urlOther = '/api/v2013/thesaurus/terms/' + domainTerms['others'];
                    return $q.all([$http.get(url, {cache:true}),$http.get(urlOther), {cache:true}])
                                .then(function(termData){
                                    var data = termData[0].data;
                                    data.push(termData[1].data);
                                    return data;
                                });
                }
                if(termIdentifier == 'others'){
                    url = '/api/v2013/thesaurus/terms/' + domainTerms.others;
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
            var domainTerms = {
                countries                : "countries",
                regions                  : "regions",
                others                   : "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
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
                DecisionLMOFFPSubject    :  'DecisionLMOFFPSubject',
                DecisionResults          :  'DecisionResults'

            }
        }
    }]);
});
