﻿import app from '~/app';
import _ from 'lodash';
import KmDocumentAttachmentApi from '~/api/km-document-attachment';
import storageTranslations from '~/app-text/components/scbd-angularjs-services.json';
import { mergeTranslationKeys } from '~/services/translation-merge';
const storageT = mergeTranslationKeys(storageTranslations);

    app.factory("IStorage", ["$http", "$q", "authentication", "realm", 'cacheService', 'apiToken',  function($http, $q, authentication, defaultRealm, cacheService, apiToken) {
        //		return new function()
        //		{
        var serviceUrls = { // Add Https if not .local
            documentQueryUrl: function() {
                return "/api/v2013/documents/";
            },
            documentUrl: function() {
                return "/api/v2013/documents/:identifier";
            },
            validateUrl: function() {
                return "/api/v2013/documents/x/validate";
            },
            draftUrl: function() {
                return "/api/v2013/documents/:identifier/versions/draft";
            },
            attachmentUrl: function() {
                return "/api/v2013/documents/:identifier/attachments/:filename";
            },
            securityUrl: function() {
                return "/api/v2013/documents/:identifier/securities/:operation";
            },
            draftSecurityUrl: function() {
                return "/api/v2013/documents/:identifier/versions/draft/securities/:operation";
            },
            draftLockUrl: function() {
                return "/api/v2013/documents/:identifier/versions/draft/locks/:lockID";
            },
            documentVersionUrl: function() {
                return "/api/v2013/documents/:identifier/versions";
            },

            documentBodyQueryUrl: function() {
                return "/api/v2013/documents/query/body";
            },
            documentFacetsQueryUrl: function() {
                return "/api/v2013/documents/query/facets";
            },
        };

        var storageDocumentCacheFactory = cacheService.getCacheFactory({name:'storageDocument', storageMode:'localStorage', maxAge:30*60*1000})//1/2 hr cache for terms

        //==================================================
        //
        // Documents
        //
        //==================================================
        this.documents = {

            //===========================
            //
            //===========================
            "query": function(query, collection, params, config) {
                params = angular.extend({}, params || {});
                params.collection = collection;
                params.$filter = query;

                if (query && !collection)
                    params.collection = "my";

                var useCache = !!params.cache;

                var oTrans = transformPath(serviceUrls.documentQueryUrl(), params);

                return $http.get(oTrans.url, getConfig(config, oTrans.params, useCache));

                //TODO: return result.data;
            },

            //===========================
            //
            //===========================
            "get": function(identifier, params, config) {
                params = clone(params || {});
                params.identifier = identifier;

                var useCache = !!params.cache;
                if(!useCache){//special logic for records with revision @[0-9]{1,3} cache them as there will be no change
                    var revisionRegex =  /@([0-9]{1,3})/;
                    if(revisionRegex.test(identifier))
                        useCache = true;
                }
                if(useCache)
                    useCache = storageDocumentCacheFactory;
                    
                var oTrans = transformPath(serviceUrls.documentUrl(), params);

                return $http.get(oTrans.url, getConfig(config, oTrans.params, useCache));

                //TODO: return result.data;

            },

            //===========================
            //
            //===========================
            "exists": function(identifier, params, config) {
                params = clone(params || {});
                params.identifier = identifier;

                var useCache = !!params.cache;

                var oTrans = transformPath(serviceUrls.documentUrl(), params);

                return $http.head(oTrans.url, getConfig(config, oTrans.params, useCache)).then(function() {

                    return true;

                }).catch(function(error) {

                    if (error.status != "404")
                        throw "Error";

                    return false;
                });
            },

            //===========================
            //
            //===========================
            "put": function(identifier, data, params, config) {
                params = clone(params || {});
                params.identifier = identifier;

                var useCache = !!params.cache;
                if (!params.schema && data && data.header && data.header.schema)
                    params.schema = data.header.schema;

                var oTrans = transformPath(serviceUrls.documentUrl(), params);

                return $http.put(oTrans.url, data, getConfig(config, oTrans.params, useCache)).then(function(result) {
                    return result.data;
                });
            },

            //===========================
            //
            //===========================
            "delete": function(identifier, params, config) {
                params = clone(params || {});
                params.identifier = identifier;
                var useCache = !!params.cache;
                var oTrans = transformPath(serviceUrls.documentUrl(), params);

                return $http.delete(oTrans.url, getConfig(config, oTrans.params, useCache));
            },

            //===========================
            //
            //===========================
            "validate": function(document, params, config) {
                params = clone(params || {});

                if (!params.schema && document && document.header && document.header.schema)
                    params.schema = document.header.schema;
                var useCache = !!params.cache;
                var oTrans = transformPath(serviceUrls.validateUrl(), params);

                return $http.put(oTrans.url, document, getConfig(config, oTrans.params, useCache));

                //TODO: return result.data;
            },

            //===========================
            //
            //===========================
            "security": {
                canCreate: function(identifier, schema, metadata, config) {
                    return canDo(serviceUrls.securityUrl(), "create", identifier, schema, metadata, config);
                },

                canUpdate: function(identifier, schema, metadata, config) {
                    return canDo(serviceUrls.securityUrl(), "update", identifier, schema, metadata, config);
                },

                canDelete: function(identifier, schema, metadata, config) {
                    return canDo(serviceUrls.securityUrl(), "delete", identifier, schema, metadata, config);
                }
            }
        };

        //==================================================
        //
        // Drafts
        //
        //==================================================
        this.drafts = {

            //===========================
            //
            //===========================
            "query": function(query, params, config) {
                params = clone(params || {});
                params.collection = "mydraft";
                params.$filter = query;

                var useCache = !!params.cache;

                var oTrans = transformPath(serviceUrls.documentQueryUrl(), params);

                return $http.get(oTrans.url, getConfig(config, oTrans.params, useCache));

                //TODO: return result.data;
            },


            //===========================
            //
            //===========================
            "get": function(identifier, params, config) {
                params = clone(params || {});
                params.identifier = identifier;

                var useCache = !!params.cache;

                if (!params.cache)
                    params.cache = true;

                var oTrans = transformPath(serviceUrls.draftUrl(), params);

                return $http.get(oTrans.url, getConfig(config, oTrans.params, useCache));

                //TODO: return result.data;
            },

            //===========================
            //
            //===========================
            "exists": function(identifier, params, config) {
                params = clone(params || {});
                params.identifier = identifier;

                var useCache = !!params.cache;

                var oTrans = transformPath(serviceUrls.draftUrl(), params);

                return $http.head(oTrans.url, getConfig(config, oTrans.params, useCache)).then(function() {

                    return true;

                }).catch(function(error) {

                    if (error.status != "404")
                        throw "Error";

                    return false;
                });
            },

            //===========================
            //
            //===========================
            "put": function(identifier, data, params, config) {
                params = clone(params || {});
                params.identifier = identifier;

                if (!params.schema && data && data.header && data.header.schema)
                    params.schema = data.header.schema;
                var useCache = !!params.cache;
                var oTrans = transformPath(serviceUrls.draftUrl(), params);

                return $http.put(oTrans.url, data, getConfig(config, oTrans.params, useCache)).then(function(result) {
                    return result.data;
                });
            },

            //===========================
            //
            //===========================
            "delete": function(identifier, params, config) {
                params = clone(params || {});
                params.identifier = identifier;
                var useCache = !!params.cache;
                var oTrans = transformPath(serviceUrls.draftUrl(), params);

                return $http.delete(oTrans.url, getConfig(config, oTrans.params, useCache));

                //TODO: return result.data;
            },

            //===========================
            //
            //===========================
            "security": {
                canCreate: function(identifier, schema, metadata, config) {
                    return canDo(serviceUrls.draftSecurityUrl(), "create", identifier, schema, metadata, config);
                },

                canUpdate: function(identifier, schema, metadata, config) {
                    return canDo(serviceUrls.draftSecurityUrl(), "update", identifier, schema, metadata, config);
                },

                canDelete: function(identifier, schema, metadata, config) {
                    return canDo(serviceUrls.draftSecurityUrl(), "delete", identifier, schema, metadata, config);
                }
            },

            "locks": {

                //===========================
                //
                //===========================
                "get": function(identifier, params, config) {
                    params = clone(params || {});
                    params.identifier = identifier;

                    var useCache = !!params.cache;

                    var oTrans = transformPath(serviceUrls.draftLockUrl(), params);



                    return $http.get(oTrans.url, getConfig(config, oTrans.params, useCache));

                    //TODO: return result.data;

                },
                //===========================
                //
                //===========================
                "exists": function(identifier, params, config) {
                    params = clone(params || {});
                    params.identifier = identifier;

                    var useCache = !!params.cache;

                    var oTrans = transformPath(serviceUrls.draftLockUrl(), params);

                    return $http.head(oTrans.url, getConfig(config, oTrans.params, useCache)).then(function() {

                        return true;

                    }).catch(function(error) {

                        if (error.status != "404")
                            throw "Error";

                        return false;
                    });
                },

                //===========================
                //
                //===========================
                "put": function(identifier, params, config) {
                    params = clone(params || {});
                    params.identifier = identifier;
                    var useCache = !!params.cache;
                    var oTrans = transformPath(serviceUrls.draftLockUrl(), params);
                    var data = null;
                    return $http.put(oTrans.url, data, getConfig(config, oTrans.params, useCache)).then(function(result) {
                        return result.data;
                    });
                },

                //===========================
                //
                // Not tested
                //
                //===========================
                "delete": function(identifier, lockID, config) {
                    var params = {
                        identifier: identifier,
                        lockID: lockID
                    };
                    var useCache = !!params.cache;
                    var oTrans = transformPath(serviceUrls.draftLockUrl(), params);

                    return $http.delete(oTrans.url, getConfig(config, oTrans.params, useCache)).then(function(success) {
                        return success.data;
                    });
                }
            }
        };

        this.attachments = {

            //===========================
            //
            // Not tested
            //
            //===========================
            "put": async function(documentId, file) {
                try {
                    const kmDocumentAttApi  = new KmDocumentAttachmentApi({ tokenReader: () => apiToken.get(), realm: defaultRealm.value });
                    
                    if (!documentId) {
                        throw new Error(storageT.storageMissingIdentifier);
                    }

                    if (!file?.name) {
                        throw new Error(storageT.storageInvalid);
                    }

                    const fileName = file.name;
                    const mimeType = getMimeTypes(fileName, file.type || "application/octet-stream");

                    // Step 1: Request temporary upload slot
                    const tempSlotResponse = await kmDocumentAttApi .createTempAttachmentSlot(fileName,mimeType);

                    if (!tempSlotResponse?.url || !tempSlotResponse?.uid || !tempSlotResponse?.contentType) {
                        throw new Error(storageT.storageTemporary);
                    }
                    // Step 2: Upload file to temporary slot
                    await kmDocumentAttApi .uploadToTempSlot(tempSlotResponse.url, file, tempSlotResponse.contentType);

                    // Step 3: Persist the uploaded file
                    const persistResponse = await kmDocumentAttApi .persistTemporaryAttachment(documentId, tempSlotResponse.uid, fileName );

                    if (!persistResponse?.url) {
                        throw new Error(storageT.storagePersisted);
                    }

                    return persistResponse

                }  catch (error) {
                    throw new Error(`Upload failed: ${error.message}`);
                }
            },

            "getMimeType": function(file) {
                return getMimeTypes(file.name, file.type || "application/octet-stream");
            },

            mimeTypeWhitelist : [
                "application/json","application/ogg","application/pdf","application/xml","application/zip",
                "application/x-zip","application/x-zip-compressed","audio/mpeg","audio/x-ms-wma","audio/x-wav",
                "image/gif","image/jpeg", "image/png","image/bmp",
                "image/tiff", "application/geo+json",
                "text/csv","text/html","text/plain","text/xml","video/mpeg","video/mp4","video/quicktime",
                "video/x-ms-wmv","video/x-msvideo","video/x-flv","application/vnd.oasis.opendocument.text",
                "application/vnd.oasis.opendocument.spreadsheet","application/vnd.oasis.opendocument.presentation","application/vnd.oasis.opendocument.graphics",
                "application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-powerpoint","application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ]
        };

        //==================================================
        //
        // Documents
        //
        //==================================================
        this.documentVersions = {

            //===========================
            //
            //===========================
            "get": function(identifier, params, config) {
                params = clone(params || {});
                params.identifier = identifier;

                var useCache = !!params.cache;


                var oTrans = transformPath(serviceUrls.documentVersionUrl(), params);

                return $http.get(oTrans.url, getConfig(config, oTrans.params, useCache));

                //TODO: return result.data;

            }
        };

        //==================================================
        //
        // Document Query
        //
        //==================================================
        this.documentQuery = {

            //===========================
            //
            //===========================
            "body": function(filter, query, params, config) {
                params = angular.extend({}, params || {});
                params.query = query;
                params.$filter = filter;

                var useCache = !!params.cache;

                var oTrans = transformPath(serviceUrls.documentBodyQueryUrl(), params);

                return $http.get(oTrans.url, getConfig(config, oTrans.params, useCache));

                //TODO: return result.data;
            },

            //===========================
            //
            //===========================
            "facets": function(filter, params, config) {
                params = angular.extend({}, params || {});
                params.$filter = filter;

                var useCache = !!params.cache;

                var oTrans = transformPath(serviceUrls.documentFacetsQueryUrl(), params);

                return $http.get(oTrans.url, getConfig(config, oTrans.params, useCache));

                //TODO: return result.data;
            }

        };




        //==================================================
        //
        //
        //==================================================
        var getMimeTypes = function(filename, defaultMimeType) {
            var sMimeType = defaultMimeType || "application/octet-stream";

            if (filename && ["application/octet-stream", "application/geo+json"].includes(sMimeType)) {
                var sExt = "";
                var iIndex = filename.lastIndexOf(".");

                if (iIndex >= 0)
                    sExt = filename.substring(iIndex).toLowerCase();

                if (sExt == ".json") sMimeType = "application/json";
                if (sExt == ".geojson") sMimeType = "application/json";
                if (sExt == ".xml") sMimeType = "application/xml";
            }

            return sMimeType;
        };

        //==================================================
        //
        //
        //==================================================
        var clone = function(obj) {

            if (obj === null)
                return null;

            if (obj === undefined)
                return undefined;

            return angular.fromJson(angular.toJson(obj));
        };

        //===========================
        //
        // Replace :xyz in path with value in params
        // query part will be done by $http
        //
        //===========================
        var transformPath = function(url, params) {
            var oRegex = /\:\w+/g;
            var oMatch = null;
            var qMatches = [];
            var oNewParams = {};

            while ((oMatch = oRegex.exec(url)) !== null) {
                oMatch.key = oMatch[0].substring(1);
                oMatch.value = oMatch[0];
                qMatches.splice(0, 0, oMatch);
            }

            for (var key in params || {}) {
                var bExist = false;

                for (var i in qMatches) {
                    if (qMatches[i].key != key)
                        continue;

                    bExist = true;
                    qMatches[i].value = params[key].toString();
                }

                if (!bExist)
                    oNewParams[key] = params[key];
            }

            for (var j in qMatches) {
                url = replaceAt(url, qMatches[j].index, qMatches[j][0].length, encodeURIComponent(qMatches[j].value));
            }

            return {
                "url": url,
                "params": oNewParams
            };
        };

        //===========================
        //
        // Calls storage security
        //
        //===========================
        var canDo = function(patternPath, operation, identifier, schema, metadata, config) {

            metadata = angular.extend({}, {
                "schema": schema
            }, metadata || {});

            return $q.when(authentication.getUser()).then(function(user) {

                if (!metadata.government && user.government)
                    metadata = angular.extend(metadata, {
                        "government": user.government
                    });

                if (!metadata.realm && defaultRealm)
                    metadata = angular.extend(metadata, {
                        "realm": defaultRealm.value
                    });

                var params = {
                    "identifier": identifier || "x",
                    "operation": operation,
                    "metadata": metadata
                };

                var useCache = !!params.cache;
                var oTrans = transformPath(patternPath, params);

                return $http.get(oTrans.url, getConfig(config, oTrans.params, useCache));

            }).then(function(res) {

                return res.data.isAllowed;
            });
        };

        //===========================
        //
        // Replace :xyz in path with value in params
        // query part will be done by $http
        //
        //===========================
        var replaceAt = function(str, index, len, newText) {
            return str.substring(0, index) + newText + str.substring(index + len);
        };

        function getConfig(config, params, useCache){
            config = angular.copy(config) || {};

            config.params = angular.extend(config.params||{}, params||{});
            config.cache  = useCache;
            return config;
        }

        return this;
        //		}();
    }]);


