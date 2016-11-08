define(['app'], function(app) {
    'use strict';

    app.factory('Thesaurus', ['linqjs', function(Enumerable) {
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
});
