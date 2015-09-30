define(['app', 'underscore'], function (app, _) {

    app.factory('thesaurusService', ['$http', '$q', function ($http, $q) {
        return new function () {
            
            
            this.getDomains = function(domainIdentifier){
               
                return $http.get('/api/v2013/thesaurus/domains/' + domainIdentifier );
            }
            
            this.getDomainTerms = function(termIdentifier, includeOthers){
                
                if(!termIdentifier)
                    throw "Domain term is missing";
                
                var url = '/api/v2013/thesaurus/domains/' + termIdentifier + '/terms'                    
                
                if(includeOthers){
                    $http.get(url)
                }
               
                return $http.get(url);
            }
            
            
            var domainTerms = {    
                countries                : "countries",
                regions                  : "regions",
                jurisdiction             : "7A56954F-7430-4B8B-B733-54B8A5E7FF40",
                status                   : "ED7CDBD8-7762-4A84-82DD-30C01458A799",
                typeOfDocuments          : "144CF550-7629-43F3-817E-CACDED34837E",
                cppResourceTypes         : "ED9BE33E-B754-4E31-A513-002316D0D602",
                cnaJurisdictions         : "D7BD5BDE-A6B9-4261-B788-16839CCC4F7E",
                absGeneticResourceTypes  : "1A22EAAB-9BBC-4543-890E-DEF913F59E98",
                keywords                 : "1A22EAAB-9BBC-4543-890E-DEF913F59E98",//duplicate?
                usage                    : "A7B77788-8C90-4849-9327-E181E9522F3A",
                cpJurisdictions          : "D7BD5BDE-A6B9-4261-B788-16839CCC4F7E",
                resourceTypes            : "83BA4728-A843-442B-9664-705F55A8EC52",
                absSubjects              : "CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924",
                mccResourceTypes         : "840427E5-E5AC-4578-B238-C81EAEEDBDD8"
                        
            }
        }
    }]);
});
