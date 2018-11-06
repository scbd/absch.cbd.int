var app = angular.module('appCommon', []);

app.directive("viewContact", [function() {
    return {
        restrict: "EAC",
        templateUrl: "../views/forms/view/view-contact.directive.html",
        replace: true,
        transclude: false,
        scope: {
            document: "=ngModel",
            locale: "=",
            target: "@linkTarget"
        },
        controller: [function() {
        }]
    };
}]);

app.directive("viewDefaultReference", [function() {
    return {
        restrict: "EAC",
        templateUrl: "../views/forms/view/view-default-reference.directive.html",
        replace: true,
        transclude: false,
        scope: {
            model: "=ngModel",
            locale: "=",
            target: "@linkTarget"
        },
        controller: ["$scope", "$http", "$filter", "$q", function($scope, $http, $filter, $q) {

            $scope.$watch('model', function(newValue) {
                if (newValue) {
                    loadReferenceDocument(newValue)
                }
            });

            function loadReferenceDocument(identifier) {
                $http.get('/api/v2013/documents/' + identifier + '?info').then(function(res) {
                    $scope.document = res.data;
                });
            }



        }]
    };
}]);


app.directive("viewContactReference", [function() {
    return {
        restrict: "EAC",
        templateUrl: "../views/forms/view/view-contact-reference.directive.html",
        replace: true,
        transclude: false,
        scope: {
            model: "=ngModel",
            locale: "=",
            target: "@linkTarget"
        },
        controller: ["$scope", "$http", "$filter", "$timeout", function($scope, $http, $filter, $timeout) {

            $scope.isCNA = false;
            $scope.isPerson = false;
            $scope.isOrganization = false;

            //==================================================
            function checkCNA(doc) {
                if (!doc)
                    return false;
                if (!doc.type && doc.header) {
                    if (doc.header.schema === 'authority') {
                        doc.type = "CNA";
                        return true;
                    }
                }

                return false;
            };

            //==================================================
            function checkPerson(doc) {
                if (!doc)
                    return false;
                if (doc.type === "person")
                    return true;
                if (!doc.type && (doc.firstName))
                    return true; //default behaviour
                return false;
            };


            //==================================================
            $scope.$watch("model", function(newVal) {

                if (!newVal)
                    return;
                if(newVal.header){
                    $scope.document = newVal;
                }
                else{
                    $http.get('/api/v2013/documents/' + $scope.model.identifier + '?info').then(function(res) {
                        
                        $scope.documentForUID = res.data;
                        $scope.document = res.data.body;
                        var info = angular.copy(res.data);
                        delete info.body;
                        $scope.document.info = info;

                        if($scope.document && $scope.document.contactOrganization){
                            $http.get('/api/v2013/documents/' + $scope.document.contactOrganization.identifier)
                                 .then(function(res) {
                                        angular.extend($scope.document.contactOrganization, res.data);
                                  });
                        }

                        if($scope.document.info.Realm && $scope.document.info.Realm.toUpperCase()== 'ABS')
                            $scope.websiteUrl = 'https://absch.cbd.int';
                        else if($scope.document.info.Realm && $scope.document.info.Realm.toUpperCase()=='ABS-TRG')
                            $scope.websiteUrl = 'https://training-absch.cbd.int';
                        else if($scope.document.info.Realm && $scope.document.info.Realm.toUpperCase()== 'ABS-DEV')
                            $scope.websiteUrl = 'https://absch.cbddev.xyz';
                    });
                }

            });

            //==================================================
            $scope.$watch("document", function(newVal, oldVal) {
                if (newVal) {
                    $scope.isCNA = checkCNA(newVal);
                    $scope.isPerson = checkPerson(newVal);
                    $scope.isOrganization = !$scope.isPerson;
                }
            });
        }]
    };
}]);


app.filter("lstring", function() {
    return lstring;
});

app.filter("yesno", function() {
    return function(boolValue) {
        return boolValue ? "Yes" : "No";
    }
});

app.filter("renderhtml", function() {
    return function(html_code) {
        return html_code;
        //return $sce.trustAsHtml(html_code);
    }
});

app.filter("formatDate", function() {
    return function(date, formart) {
        if (formart == undefined)
            formart = 'MMMM Do YYYY';
        return moment.utc(date).format(formart);
    }
});

app.filter("term", ["$http", function($http) {
    var cacheMap = {};

    return function(term, locale) {

        if (!term)
            return "";

        if (term && angular.isString(term))
            term = { identifier: term };

        locale = locale || "en";

        if (term.customValue)
            return lstring(term.customValue, locale);

        if (cacheMap[term.identifier])
            return lstring(cacheMap[term.identifier].title, locale);

        cacheMap[term.identifier] = $http.get("/api/v2013/thesaurus/terms/" + encodeURI(term.identifier), { cache: true }).then(function(result) {

            cacheMap[term.identifier] = result.data;

            return lstring(cacheMap[term.identifier].title, locale);

        }).catch(function() {

            cacheMap[term.identifier] = term.identifier;

            return term.identifier;

        });
    };
}]);


//============================================================
//
//
//
//============================================================
app.filter("formatDate", function() {
    return function(date, formart) {
        //if(formart== undefined)
        formart = 'DD MMM YYYY';
        return moment.utc(date).format(formart);
    }
});

//============================================================
//
//
//
//============================================================
app.filter("formatDateWithTime", function() {
    return function(date, formart) {
        //if(formart== undefined)
        formart = 'DD MMM YYYY hh:mm';
        return moment.utc(date).format(formart);
    }
});


function lstring(ltext, locale) {
    if (!ltext)
        return "";

    if (angular.isString(ltext))
        return ltext;

    var sText;

    if (!sText && locale)
        sText = ltext[locale];

    if (!sText)
        sText = ltext.en;

    if (!sText) {
        for (var key in ltext) {
            sText = ltext[key];
            if (sText)
                break;
        }
    }

    return sText || "";

}
//============================================================
//
//
//
//============================================================
app.filter("formatDate", function() {
    return function(date, formart) {
        if (formart == undefined)
            formart = 'DD MMM YYYY';
        return moment.utc(date).format(formart);
    }
});

//============================================================
//
//
//
//============================================================
app.filter("formatDateWithTime", function() {
    return function(date, formart) {
        if (formart == undefined)
            formart = 'DD MMM YYYY hh:mm';
        return moment.utc(date).format(formart);
    }
});




//============================================================
app.filter("uniqueID", ["$http", '$filter', '$q',
    function($http, $filter, $q) {
        var cacheMap = {};

        return function(term) {

            if (!term)
                return "";

            var document;

            if (term && angular.isString(term)) {

                term = { identifier: term };
                if (cacheMap[term.identifier])
                    return cacheMap[term.identifier];

                document = $http.get('/api/v2013/documents/' + term.identifier + '?info=true');

            }
            else if (term && angular.isObject(term)) {
                document = term.info && term.info.metadata ? term.info : term;

                var revision = ''
                if (document.revision)
                    revision = '-' + document.revision;
                var identifier = '';
                if (term.identifier)
                    identifier = term.identifier;
                else if (document.identifier)
                    identifier = document.identifier;
                else if (document.data && document.data.identifier)
                    identifier = document.data.identifier;
                else if (document.id)
                    identifier = document.id;

                if (identifier == '')
                    return;

                term = { identifier: identifier + revision };

                if (cacheMap[term.identifier])
                    return cacheMap[term.identifier];
            }

            if (!document)
                return;

            cacheMap[term.identifier] = $q.when(document).then(function(document) {

                if (document.data)
                    document = document.data;
                else
                    document = document;

                if (document.schema_s && (document.schema_s.toLowerCase() == "statement" || document.schema_s.toLowerCase() == "notification" || document.schema_s.toLowerCase() == "news" ||
                    document.schema_s.toLowerCase() == "meeting" || document.schema_s.toLowerCase() == "pressrelease" || document.schema_s.toLowerCase() == "new" ||
                    document.schema_s.toLowerCase() == "focalpoint")) {
                    cacheMap[term.identifier] = document.identifier_s ? document.identifier_s : document.id;
                    return cacheMap[term.identifier];

                }

                var government = '';
                var documentId;

                if (document.documentID)
                    documentId = document.documentID;
                else if (document.id) {

                    if (document.id.indexOf('_') > 0)
                        documentId = commonjs.hexToInteger(document.id.substr(0, document.id.indexOf('_')));
                    else
                        documentId = commonjs.hexToInteger(document.id);
                }
                if (document.government_s)
                    government = document.government_s;
                else if (document.government)
                    government = document.government.identifier;
                else if (document.metadata && document.metadata.government)
                    government = document.metadata.government;
                else if (document.body && document.body.government)
                    government = document.body.government.identifier;
                
                var relamPrefix = '';
				relamPrefix = (document.realm.toUpperCase().replace('ABS','').replace('-',''));

				var unique = 'ABSCH' + relamPrefix +
						'-' + $filter("schemaShortName")($filter("lowercase")(document.type||document.schema_s||document.schema)) +
                        '-' + (government != '' ?  $filter("uppercase")(government) : 'SCBD') +
                        '-' + documentId;

                if (document.revision)
                    unique = unique + '-' + document.revision;

                cacheMap[term.identifier] = unique;

                return unique;

            }).catch(function() {

                cacheMap[term.identifier] = term.identifier;

                return term.identifier;

            });
            return cacheMap[term.identifier];
        };
    }])

//============================================================
app.filter("uniqueIDWithoutRevision", ['$filter', function($filter) {

    return function(document) {
        var unique = $filter("uniqueID")(document);


        if (angular.isString(unique) && document)
            return unique.substring(0, unique.lastIndexOf('-'));

        return '';

    };
}]);

//==================================================================================
this.hexToInteger = function(hex) {
    if (hex && hex.length == 24)
        return parseInt(hex.substr(15, 9), 16);

    return hex;
}
//==================================================================================
this.integerToHex = function(d, schema) {
    var schemaCode = '';
    if (_.contains(["pressrelease", "statement", "news", "new", "pr", "st", "news", "new"], schema.toLowerCase()))
        schemaCode = "52000000cbd0180000000000";
    else if (schema.toLowerCase() == "notification" || schema.toLowerCase() == "nt")
        schemaCode = "52000000cbd0120000000000";
    else if (schema.toLowerCase() == "meeting" || schema.toLowerCase() == "mt")
        schemaCode = "52000000cbd0050000000000";
    else if (schema.toLowerCase() == "focalpoint" || schema.toLowerCase() == "nfp")
        schemaCode = "52000000cbd0220000000000";
    else if (schema.toLowerCase() == "nationalRecord")
        schemaCode = "52000000cbd0800000000000";
        
    if (schemaCode == '')
        return d;

    var hex = Number(d).toString(16);
    hex = schemaCode.substr(0, 24 - hex.length) + hex;

    return hex;
}
app.filter("urlSchemaShortName", ['$filter', function($fitler) {
    return function(schema) {
        return $fitler('schemaShortName')(schema);
    }
}]);
app.filter("schemaShortName", [function() {

    return function(schema) {

        if (!schema) return schema;
        if (schema.toLowerCase() == "absprocedure") return "PRO";
        if (schema.toLowerCase() == "absnationalmodelcontractualclause") return "NMCC;
        if (schema.toLowerCase() == "focalpoint") return "NFP";
        if (schema.toLowerCase() == "authority") return "CNA";
        if (schema.toLowerCase() == "contact") return "CON";
        if (schema.toLowerCase() == "database") return "NDB";
        if (schema.toLowerCase() == "resource") return "VLR";
        if (schema.toLowerCase() == "organization") return "ORG";
        if (schema.toLowerCase() == "measure") return "MSR";
        if (schema.toLowerCase() == "abscheckpoint") return "CP";
        if (schema.toLowerCase() == "abscheckpointcommunique") return "CPC";
        if (schema.toLowerCase() == "abspermit") return "IRCC";
        if (schema.toLowerCase() == "statement") return "ST";
        if (schema.toLowerCase() == "notification") return "NT";
        if (schema.toLowerCase() == "meeting") return "MT";
        if (schema.toLowerCase() == "pressrelease") return "PR";
        if (schema.toLowerCase() == "meetingdocument") return "MTD";
        if (schema.toLowerCase() == "capacitybuildinginitiative") return "CBI";
        if (schema.toLowerCase() == "capacitybuildingresource") return "CBR";


        return schema;
    };
}]);


app.filter("schemaName", [function() {

    return function(schema) {

        if (!schema) return schema;
        if (schema.toLowerCase() == "absprocedure") return "ABS Procedure";
        if (schema.toLowerCase() == "absnationalmodelcontractualclause") return "National Model Contractual Clause";
        if (schema.toLowerCase() == "focalpoint") return "ABS National Focal Point";
        if (schema.toLowerCase() == "authority") return "Competent National Authority";
        if (schema.toLowerCase() == "contact") return "Contact";
        if (schema.toLowerCase() == "database") return "National Website or Database";
        if (schema.toLowerCase() == "resource") return "Virtual Library Resource";
        if (schema.toLowerCase() == "organization") return "Organization";
        if (schema.toLowerCase() == "measure") return "Legislative, Administrative or Policy Measures";
        if (schema.toLowerCase() == "abscheckpoint") return "Checkpoint";
        if (schema.toLowerCase() == "abscheckpointcommunique") return "Checkpoint Communiqué";
        if (schema.toLowerCase() == "abspermit") return "Internationally Recognized Certificate of Compliance";
        if (schema.toLowerCase() == "meetingdocument") return "Meeting Document";
        if (schema.toLowerCase() == "pressrelease") return "Press Release";
        if (schema.toLowerCase() == "news") return "News";
        if (schema.toLowerCase() == "new") return "What's New";
        if (schema.toLowerCase() == "statement") return "Statement";
        if (schema.toLowerCase() == "absnationalreport") return "Interim National Report on the Implementation of the Nagoya Protocol";
        if (schema.toLowerCase() == "modelcontractualclause") return "Model Contractual Clauses, Codes of Conduct, Guidelines, Best Practices and/or Standards";
        if (schema.toLowerCase() == "communityprotocol") return "Community Protocol and Procedures and Customary Law";
        if (schema.toLowerCase() == "meeting") return "Meeting";
        if (schema.toLowerCase() == "notification") return "Notification";
        if (schema.toLowerCase() == "capacitybuildinginitiative") return "Capacity-building Initiative";
        if (schema.toLowerCase() == "capacitybuildingresource") return "Capacity-building Resource";
        if (schema.toLowerCase() == "endorsement") return "Endorsements";

        return schema;
    };
}]);



app.directive("permit", [function() {
    return {
        restrict: "EAC",
        templateUrl: "absPermit-directive.html",
        scope: {
            documentId: "="
        },
        controller: ['$scope', '$http', '$location', '$filter',
            function($scope, $http, $location, $filter) {

                var sLocale = "en";
                $scope.locale = sLocale;

                $scope.load = function() {
                    $http.get('/api/v2013/documents/' + $scope.documentId, {}).then(function(res) {

                        $scope.document = res.data;
                        var usageDetails = []

                        if ($scope.document.usage) {
                            $scope.document.usage.forEach(function(usage) {

                                $scope.getTerm(usage.identifier).then(function(data) {
                                    usageDetails.push(data);
                                });
                            });
                        }
                        $scope.document.usage = usageDetails;
                        $scope.getTerm($scope.document.government.identifier)
                            .then(function(data) {
                                $scope.document.government = data;
                            });
                    });

                    var identifierWithoutRevision = $scope.documentId;
                    if(identifierWithoutRevision.indexOf('@')>0)
                        identifierWithoutRevision = identifierWithoutRevision.substr(0, identifierWithoutRevision.indexOf('@'));

                    $http.get('/api/v2013/documents/' + identifierWithoutRevision + '/versions?body=true&cache=true')
                        .then(function(res) {
                            $scope.versions = res.data.Items;
                        });

                    $http.get('/api/v2013/documents/' + $scope.documentId + '?info', {}).then(function(res) {
                        $scope.documentInfo = res.data;
                    });
                }
                $scope.renderHtml = function(html_code) {
                    //console.log(($filter("lstring")(html_code,$scope.locale)))
                    return ($filter("lstring")(html_code, $scope.locale));
                };

                $scope.$watch('documentId', function(newVal, oldVal) {
                    if (newVal)
                        $scope.load();
                })

                $scope.getTerm = function(identifier) {
                    return $http.get('/api/v2013/thesaurus/terms/' + identifier, {}).then(function(res){return res.data;});
                }

            }]
    };
}]);
