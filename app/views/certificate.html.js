define(['app'], function (app) {

"use strict";

app.controller("CertificateController", 
	["$scope", "$q", "IStorage","$routeParams", function ($scope, $q, IStorage, $routeParams) {

		$scope.message = "Please wait while your document is prepared....";
    	if( $routeParams.documentNumber){
    		console.log(IStorage)
    		// ABSCH-HT-201814-3
    		// var docId = $routeParams.documentNumber.substring()
    		$q.when(IStorage.documents.get($routeParams.documentNumber,{info:""}), function(result){
    			var document = result.data;

    			if(document && document.metadata.schema=="absPermit"){
	    			var documentName = "ABSCH-" + document.metadata.government + "-" + document.documentID + "-" + document.revision + ".pdf";
	    			console.log(documentName);
	    			window.location.href ="https://s3.amazonaws.com/absch.documents/" + documentName;
	    		}
	    		else{
	    			$scope.message = "There is no document available for the provided document number.";
	    		}

    		}).catch(function(error){
    			$scope.message = "There is no document available for the provided document number.";
    		});
    	}
    	else
    		$scope.message = "Invalid Document number...";

    }]);
});
