define(['app', 'underscore'], function(app, underscore) {

    app.factory('commonjs', ['$http', '$rootScope', function($http, $rootScope) {
        return new function() {

            this.getReferenceRecordIndex = function(schema, documentId) {

                var item = [];
                var queryFields = 'fl=id,identifier_s,schema_s,createdDate_dt,createdByEmail_s,createdBy_s,updatedDate_dt,updatedByEmail_s,updatedBy_s,url_ss,';

                if (schema.toUpperCase() == "FOCALPOINT") {
                    queryFields += 'description_EN_t,government_EN_t,organization_EN_t,function_EN_t,department_EN_t,title_EN_t,treaty_CEN_ss,type_CEN_ss,email_ss,telephone_s,ctgList_ss,fax_ss';
                } else if (schema.toUpperCase() == "MEETING") {
                    queryFields += 'symbol_s,startDate_dt,endDate_dt,eventCountry_CEN_s,title_s,eventCity_s,text_EN_txt,themes_CEN_ss,thematicAreas_CEN_ss,thematicAreas_ss';
                } else if (schema.toUpperCase() == "NOTIFICATION") {
                    queryFields += 'date_s,deadline_s,symbol_s,reference_s,sender_s,schema_CEN_s,title_EN_t,description_EN_t,recipient_ss,url_ss,text_EN_txt';
                } else if (schema.toUpperCase() == "PRESSRELEASE" || schema.toUpperCase() == "STATEMENT" || schema.toUpperCase() == "NEWS") {
                    queryFields += 'date_s,symbol_s,schema_CEN_s,title_EN_t,description_EN_t,themes_CEN_ss,url_ss,thematicAreas_CEN_ss,text_EN_txt';
                }

                return $http.get("/api/v2013/index/select?" + queryFields + "&q=id:" + documentId)
                    .then(function(result) {

                        item.data = result.data.response.docs[0];

                        item.data.info = [];
                        item.data.header = {
                            'schema': item.data.schema_s
                        };
                        if (item.data.createdBy_s) {
                            item.data.info.createdBy.firstName = item.data.createdBy_s;
                            item.data.info.createdBy.email = item.data.createdByEmail_s;
                        }
                        item.data.info.createdOn = item.data.createdDate_dt;
                        if (item.data.updatedBy_s) {
                            item.data.info.updatedBy.firstName = item.data.updatedBy_s;
                            item.data.info.updatedBy.email = item.data.updatedByEmail_s;
                        }
                        item.data.info.updatedOn = item.data.updatedDate_dt;
                        item.data.header.identifier = item.data.identifier_s;

                        return item;
                    });
            }

            this.isUserInRole = function(role) {

                if (!$rootScope.user)
                    return false;

                var userRoles = $rootScope.user.roles;
                if (!role)
                    return false;

                for (var i = 0; i < userRoles.length; i++) {
                    if (userRoles[i] == role)
                        return true;
                }

                return false;
            }

            this.getCountries = function() {

                // if($rootScope.countries)
                // 	return $rootScope.countries;

                return $http.get('/api/v2013/countries', {
                        cache: true
                    })
                    .then(function(response) {
                        var countries = response.data;
                        var countriesDetails = []

                        for (var i = 0; i != countries.length; ++i) {
                            var country = {};
                            var treaties = countries[i].treaties;
                            country.name = countries[i].name;
                            country.code = countries[i].code;

                            country.isCBDParty = isPartyToCBD(countries[i]) || country.code == 'EU';
                            country.isNPParty = isNPParty(countries[i]) || country.code == 'EU';
                            country.isNPSignatory = isSignatory(countries[i]) || country.code == 'EU';
                            country.isNPRatified = isRatified(countries[i]) || country.code == 'EU';
                            country.isNPInbetweenParty = moment().diff(moment(treaties.XXVII8b.deposit), 'days') < 90;

                            if (country.isNPInbetweenParty)
                                country.entryIntoForce = moment(treaties.XXVII8b.deposit).add(90, 'day');
                            else
                                country.entryIntoForce = treaties.XXVII8b.deposit;
                            // console.log($rootScope.countries);
                            countriesDetails.push(country);
                        }
                        return countriesDetails;
                    });


            }

            this.isIAC = function() {
                return this.isUserInRole($rootScope.getRoleName('abschiac'));
            }

            this.isAnyOtherRoleThenIAC = function() {

                return this.isUserInRole($rootScope.getRoleName('AbsPublishingAuthorities')) ||
                    this.isUserInRole($rootScope.getRoleName('AbsNationalAuthorizedUser')) ||
                    this.isUserInRole($rootScope.getRoleName('AbsNationalFocalPoint')) ||
                    this.isUserInRole($rootScope.getRoleName('AbsAdministrator')) ||
                    this.isUserInRole($rootScope.getRoleName('Administrator'))

            }

            this.isNPParty = function(entity) {
                return isNPParty(entity);
            }
            this.isPartyToCBD = function(entity) {
                return isPartyToCBD(entity);
            }

            this.isSignatory = function(entity) {
                return isSignatory(entity);
            }

            this.isRatified = function(entity) {
                return isRatified(entity);
            }

            this.getNFPText = function(cdgList) {

                if (!cdgList)
                    return;
                if ((underscore.indexOf(cdgList, 'NP-FP') >= 0 || underscore.indexOf(cdgList, 'ABS-FP') >= 0) && (underscore.indexOf(cdgList, 'CBD-FP1') >= 0 || underscore.indexOf(cdgList, 'CBD-FP2') >= 0))
                    return "ABS/CBD Focal Point";
                // else if(underscore.indexOf(cdgList, 'ABS-IC')>= 0 && (underscore.indexOf(cdgList, 'CBD-FP1')>= 0 || underscore.indexOf(cdgList, 'CBD-FP2')>= 0))
                //     return "ICNP/CBD Focal Point";
                if (underscore.indexOf(cdgList, 'NP-FP') >= 0 || underscore.indexOf(cdgList, 'ABS-FP') >= 0)
                    return "ABS National Focal Point";
                // else if(underscore.indexOf(cdgList, 'ABS-IC')>= 0)
                //     return "ABS ICNP Focal Point";
                else if (underscore.indexOf(cdgList, 'CBD-FP1') >= 0)
                    return "CBD Primary Focal Point";
                else if (underscore.indexOf(cdgList, 'CBD-FP2') >= 0)
                    return "CBD Secondary Focal Point";

                return "";

            }

            this.hexToInteger = function(hex) {
                if (hex && hex.length == 24)
                    return parseInt(hex.substr(15, 9), 16);

                return hex;
            }

            this.integerToHex = function(d, schema) {
                var schemaCode = '';
                if (schema.toLowerCase() == "pressrelease" || schema.toLowerCase() == "statement" || schema.toLowerCase() == "news")
                    schemaCode = "52000000CBD0180000000000";
                else if (schema.toLowerCase() == "notification")
                    schemaCode = "52000000CBD0120000000000";
                else if (schema.toLowerCase() == "meeting")
                    schemaCode = "52000000CBD0050000000000";
                else if (schema.toLowerCase() == "focalpoint")
                    schemaCode = "52000000CBD0220000000000";

                if (schemaCode == '')
                    return d;

                var hex = Number(d).toString(16);
                hex = schemaCode.substr(0, 24 - hex.length) + hex;

                return hex;
            }

			function isNPParty(entity) {

				if(entity && entity.isNPParty!= undefined)
					return entity.isNPParty;
                    
                if(entity && entity.isNPInbetweenParty!= undefined)
					return entity.isNPInbetweenParty;

				return entity && (moment().diff(moment(entity.treaties.XXVII8b.deposit), 'days') >= 90) && (entity.treaties.XXVII8b.instrument == "ratification" ||
					entity.treaties.XXVII8b.instrument == "accession" ||
					entity.treaties.XXVII8b.instrument == "acceptance" || entity.treaties.XXVII8b.instrument == "approval");
			}

            function isPartyToCBD(entity) {

				if(entity && entity.isCBDParty!= undefined)
					return entity.isCBDParty;

                return entity && entity.treaties.XXVII8.party != null;
            }

            function isSignatory(entity) {

				if(entity && entity.isNPSignatory!= undefined)
					return entity.isNPSignatory;

                return entity && entity.treaties.XXVII8b.signature != null;
            }

            function isRatified(entity) {

				if(entity && entity.isNPRatified!= undefined)
					return entity.isNPRatified;

                return entity && (entity.treaties.XXVII8b.instrument == "ratification" ||
                    entity.treaties.XXVII8b.instrument == "accession" ||
                    entity.treaties.XXVII8b.instrument == "acceptance" || entity.treaties.XXVII8b.instrument == "approval");
            }
        }
    }]);
});
