define(['app', 'lodash', 'linqjs'], function(app, _, Enumerable) {
    'use strict';

    app.factory('Thesaurus', [function() {
        return {
            buildTree: function(terms) {
                var oTerms = [];
                var oTermsMap = {};

                Enumerable.from(terms).forEach(function(value) {
                    var oTerm = {
                        identifier: value.identifier,
                        title: value.title,
                        description: value.description
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
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return function() {
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()).toUpperCase();
        }
    });

    app.factory('realmService', ['$location', function($location){
       
            var productionRealms = {
                urls: [
                    'https://absch.cbd.int', 
                    'https://bch.cbd.int', 
                    'https://chm.cbd.int', 
                    'https://accounts.cbd.int'
                ],
                realms: ['ABS', 'BCH', 'CHM']
            };

            var developmentRealms = {
                urls: ['https://absch.cbddev.xyz', 
                       'https://bch.cbddev.xyz',
                       'https://dev-chm.cbd.int', 'https://chm.cbddev.xyz', 
                       'https://accounts.cbddev.xyz',
                       'http://localhost:2010', 'http://localhost:2000', 'http://localhost:8000'
                   ],
                realms: ['ABS-DEV', 'BCH-DEV', 'CHM-DEV']
            };

            var trainingRealms = {
                urls: [
                    'https://training-absch.cbd.int', 
                    'https://training-bch.cbd.int' , 
                    'https://bch-demo.cbd.int' 
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
});
