define(['app', '/app/js/common.js', '/app/views/directives/search-filter-dates.partial.html.js'], function (app, commonjs) { // jshint ignore:line

app.directive("documentSelection", ["$http", "Thesaurus", "$filter", "underscore", "guid",  "$timeout", "$q","IStorage","commonjs", function ($http, Thesaurus, $filter, _, guid, $timeout, $q, storage, commonjs) {

	return {
		restrict   : "EA",
		templateUrl: "/app/views/forms/edit/document-selection-directive.html",
		replace    : true,
		transclude : false,
		scope      : {
			model     : "=ngModel",
			locales   : "=locales",
			caption   : "@caption",
			disabled  : "=ngDisabled",
            government: "=government",
            question  : "@question",
            schema    : "@schema",
            countryDocuments: "=countryDocuments",

		},
		link : function($scope) {

            $scope.selectedDocuments = [];
			$scope.areVisible = false;

            var schemaTypes = [ "absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database", "focalPoint"];

            $scope.options  = {
                nationalSchemas:   function() {
                    var schemas = [];
                    _.each(schemaTypes, function(type){
                        schemas.push({identifier:type, name:($filter('schemaName')(type)+' ('+ $filter('schemaShortName')(type) +')')});
                    });
                    return schemas;
                }
            };

            //==================================
            //
            //==================================
			$scope.showRecords = function(){
                loadDocuments();
                console.info('showRecords');
            };

            //==================================
            //
            //==================================
            $scope.getGovernmentName = function(code){
				return $filter('uppercase')($filter('term', 'locale')(code));
            };

			//==================================
            //
            //==================================
            $scope.getUniqueId = function(identifier){
				return $filter("uniqueID")(identifier);
            };

            //==================================
            //
            //==================================
			var loadDocuments = function(){

                $scope.selectedDocuments = [];
                loadRawDocuments();

                if($scope.model){
                    var docs = [];
                    _.forEach($scope.model, function (item) { // each identifier
                        var doc = _.findWhere($scope.rawDocuments, {identifier_s: item.identifier});
                        if(doc)
                            docs.push(doc);
                    });
                    $scope.selectedDocuments = docs;
                }
            };

            //==================================
            //
            //==================================
			$scope.openAddDialog = function(){
                checkExistingDocuments();
                $('#'+$scope.question).modal('show');
			};

            //==================================
            //
            //==================================
            var checkExistingDocuments = function(){
                loadRawDocuments();

                if($scope.rawDocuments){
                    _.forEach($scope.rawDocuments, function (doc) {
                        doc.__checked = undefined;
                    });
                }

                if($scope.model) {

                    var docs = [];
                    var selectedIdentifiers = _.pluck($scope.model, 'identifier');

                    _.forEach($scope.rawDocuments, function (doc) {

                        if(_.contains(selectedIdentifiers, doc.identifier_s)){
                            doc.__checked = true;
                        }
                        docs.push(doc);
                    });
                    $scope.rawDocuments = docs;
                }
            };

            //==================================
            //
            //==================================
			$scope.saveDocuments = function(){

                var checkedDocuments = [];

                _.forEach($scope.rawDocuments, function (doc) {

                    if(doc.__checked){

                        if(!_.findWhere(checkedDocuments, {identifier:doc.identifier_s}))
                            checkedDocuments.push({identifier: doc.identifier_s});
                    }
                });

                $scope.model = checkedDocuments;

                loadDocuments();

				$('#'+$scope.question).modal('hide');
				$scope.areVisible = true;
			};

            //==================================
            //
            //==================================
			$scope.removeDocument = function(document){

                $scope.model = _.filter($scope.model, function(doc){
					return doc.identifier != document.identifier_s;
				});

                $scope.selectedDocuments = _.filter($scope.selectedDocuments, function(doc){
					return doc.identifier_s != document.identifier_s;
				});

			};

            //==================================
            //
            //==================================
            $scope.getDocumentId = function(document){
                if(!document)
                    return;
                if(!document.id)
                    return $filter("uniqueIDWithoutRevision")(document.info);
                else
                    return commonjs.hexToInteger(document.id);
            };

            //==================================
            //
            //==================================
            var loadRawDocuments = function () {
                if(!$scope.rawDocuments || _.isEmpty($scope.rawDocuments))
                    $scope.rawDocuments  = $scope.countryDocuments;
            };

			//==================================
		    //
		    //==================================
		    $scope.$watch('government', function(newValue, oldValue){
		        if(newValue != oldValue){
					$scope.rawDocuments = [];
		        }
		    });

			$scope.$watch('model', function(newValue, oldValue){
				if(newValue != oldValue){
					loadDocuments();
				}
			});

		}
	};
}]);

});
