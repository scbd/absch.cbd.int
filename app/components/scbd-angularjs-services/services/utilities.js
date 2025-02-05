import app from '~/app';
import _ from 'lodash';
import Enumerable from 'linqjs';
    ;
    
    app.factory('Thesaurus', [function() {
        return {
            buildTree: function(terms) {
                var oTerms = [];
                var oTermsMap = {};

                Enumerable.from(terms).forEach(function(value) {
                    var oTerm = {
                        identifier: value.identifier,
                        title: value.title,
                        description: value.longDescription||value.description,
                        type:value.type,
                        multiple:value.multiple,
                        originalObject:value
                    }

                    oTerms.push(oTerm);
                    oTermsMap[oTerm.identifier] = oTerm;
                });

                for (var i = 0; i < oTerms.length; ++i) {
                    var oRefTerm = terms[i];
                    var oBroader = oTerms[i];

                    if (oRefTerm.narrowerTerms && oRefTerm.narrowerTerms.length > 0) {
                        angular.forEach(oRefTerm.narrowerTerms, function(identifier) {
                            var oNarrower = oTermsMap[identifier];

                            if (oNarrower) {
                                oBroader.narrowerTerms = oBroader.narrowerTerms || [];
                                oNarrower.broaderTerms = oNarrower.broaderTerms || [];

                                oBroader.narrowerTerms.push(oNarrower);
                                oNarrower.broaderTerms.push(oBroader);
                            }
                        });
                    }
                }

                return Enumerable.from(oTerms).where("o=>!o.broaderTerms").toArray();
            }
        }
    }]);


    app.factory('guid', function() {
        
        return function() {
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()).toUpperCase();
        }
    });

    app.factory('realmService', ['$location', function($location){
       
            var productionRealms = {
                urls: [
                    'https://absch.cbd.int', 
                    'https://bch.cbd.int', 
                    'https://bch.cbd.int', 
                    'https://chm.cbd.int', 
                    'https://accounts.cbd.int'
                ],
                realms: ['ABS', 'BCH', 'CHM']
            };

            var developmentRealms = {
                urls: ['https://absch.cbddev.xyz', 
                       'https://bch.cbddev.xyz',
                       'https://chm.cbddev.xyz', 
                       'https://accounts.cbddev.xyz',
                       'http://localhost:2010', 'http://localhost:2012', 'http://localhost:8000'
                   ],
                realms: ['ABS-DEV', 'BCH-DEV', 'CHM-DEV']
            };

            var trainingRealms = {
                urls: [
                    'https://training-absch.cbd.int', 
                    'https://bch-training.cbd.int'
                ],
                realms: ['ABS-TRG', 'BCH-TRG']
            };

            function envRealms() {
                if (_.some(productionRealms.urls, function (url) {
                    return $location.absUrl().indexOf(url) >= 0;
                }))
                    return productionRealms.realms;

                if (_.some(developmentRealms.urls, function (url) {
                    return $location.absUrl().indexOf(url) >= 0;
                }))
                    return developmentRealms.realms;

                if (_.some(trainingRealms.urls, function (url) {
                    return $location.absUrl().indexOf(url) >= 0;
                }))
                    return trainingRealms.realms;
            }
            return {
                envRealms : envRealms
            }
    }])

export function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function documentIdRevision(identifier){

    var revisionRegex =  /@([0-9]{1,3})/;

    if(revisionRegex.test(identifier)){
        const match = identifier.match(revisionRegex);

        return match[1]
    }
}
export function documentIdWithoutRevision(identifier){

    if(identifier && identifier.indexOf('@')>=0)
        return identifier.substr(0, identifier.indexOf('@'))
    
    return identifier;
}