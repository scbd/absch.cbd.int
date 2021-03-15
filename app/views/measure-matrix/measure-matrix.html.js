import app from 'app';
import _ from 'lodash';
import 'views/measure-matrix/measure-matrix-elements-directive';

    app.controller('matrixController', ['$scope', '$http','realm','$q','$filter','$routeParams','Thesaurus','$timeout',
        function ($scope, $http, realm, $q, $filter, $routeParams, thesaurus, $timeout) {



		$scope.currentPage=0;
        $scope.itemsPerPage = 250;
        var uniqueIdQuery;
        if($routeParams.uniqueId){
            //hack in case if uniqueId contains country code (3 in case EUR)
            if($routeParams.uniqueId.length<=3){
                uniqueIdQuery = ' AND government_s:' + $routeParams.uniqueId.toLowerCase();
            }
            else
                uniqueIdQuery = ' AND uniqueIdentifier_s:' + $routeParams.uniqueId.toLowerCase();
        }

    	var queryParameters = {
            'q': 'realm_ss:'+ realm.value.toLowerCase() + ' AND schema_s:measure ' + (uniqueIdQuery ? uniqueIdQuery : ''),
            'sort': 'government_EN_t asc',
            'fl': 'id,identifier_s,title_t,createdDate_dt,description_t,government_EN_t,status_EN_t,type_EN_t,jurisdiction_EN_t,adoption_dt,entryIntoForce_dt,retired_dt,limitedApplication_dt',
            'wt': 'json',
            'start': $scope.currentPage * $scope.itemsPerPage,
            'rows': $scope.itemsPerPage
        };

        $http.get('/api/v2013/index/select', { params: queryParameters })
		.then(function(res){return res.data}).then(function (data) {

             $scope.measures = [];
             $scope.measures = data.response.docs;
             $scope.documentCount   = data.response.numFound;
             if($routeParams.uniqueId && $scope.measures.length>0){
                 $scope.loadMatrix($scope.measures[0]);
             }

        }).catch(function (error) {
            console.log('onerror'); console.log(error);
        });

         $scope.loadMatrix = function(measure) {

             if(measure.document){
                 measure.showDocument = !measure.showDocument;
                return;
            }
             measure.showDocument = false;
             return $q.when($http.get('/api/v2013/documents/' + measure.identifier_s))
                 .then(function(document) {
                     //measure.document = [document.data];
                     console.log('measure');

                     var amendedMeasuresQuery = _.map(document.data.amendedMeasures, function(amended) {
                         return $http.get('/api/v2013/documents/' + amended.identifier);
                     });
                     return $q.all(amendedMeasuresQuery)
                         .then(function(amendedMeasures) {
                             amendedMeasures.forEach(function(amendedMeasureData) {
                                 var amended = _.find(document.data.amendedMeasures, {
                                     identifier: amendedMeasureData.data.header.identifier
                                 });
                                 amended.measure = amendedMeasureData.data;
                                //  relatedElement($scope.scopeElements, amendedMeasureData.data, 'amended');
                             });
                             return document.data;
                         });
                 })
                 .then(function(data) {

                     measure.document = [data];
                     measure.showDocument = true;
                     return data;

                    //  var linkedMeasuresQuery = _.map(data.linkedMeasures, function(linked) {
                    //      return $http.get('/api/v2013/documents/' + linked.identifier);
                    //  });
                    //  return $q.all(linkedMeasuresQuery)
                    //      .then(function(linkedMeasures) {
                    //          linkedMeasures.forEach(function(linkedMeasureData) {
                    //              var amended = _.findWhere(data.linkedMeasures, {
                    //                  identifier: linkedMeasureData.data.header.identifier
                    //              });
                    //              amended.measure = linkedMeasureData.data;
                    //             //  relatedElement($scope.scopeElements, linkedMeasureData.data, 'amended');
                    //          });
                     //
                    //          measure.document = [data];
                    //          measure.showDocument = true;
                    //          return data;
                    //      });
                 })
                 .catch(function(error) {
                     console.log('onerror');
                     console.log(error);
                 })
                 .finally(function() {
                     measure.isLoading = false;
                 });
         };

        //  $scope.loadMatrix = function(measure){
        //      measure.showDocument = !measure.showDocument;
        //      if(measure && !measure.document){
        //          measure.isLoading = true;
         //
        //          $http.get('/api/v2013/documents/' + measure.identifier_s)
    	// 		 .success(function (data) {
         //
        //              measure.document = data;
        //             //                      measure.document.newMeasure = thesaurus.buildTree(measureElements);
        //              //to avoid diff filters sort this after loads
        //             //  if(measure.document.absMeasures){
        //             //      var elements = angular.copy(scopeElements);
        //             //      measure.document.scopeOfElements = elements;
        //              //
        //             //      _.map(measure.document.absMeasures, function(measureScope){
        //             //          var element;
        //             //          var parentElement;
        //             //         if(_.findWhere(scopeElements,{'identifier':measureScope.identifier})){
        //             //             parentElement = _.findWhere( measure.document.scopeOfElements ,{'identifier':measureScope.identifier});
        //             //            parentElement.reference = measureScope.section;
        //             //         }
        //             //         else if(_.findWhere(scopeOfMeasures,{'identifier':measureScope.identifier})){
        //             //             element = _.findWhere( scopeOfMeasures ,{'identifier':measureScope.identifier});
        //             //             parentElement = _.findWhere(measure.document.scopeOfElements ,{'identifier':element.parent});
        //             //             parentElement.elements.push(measureScope);
        //             //         }
        //             //         else if(_.findWhere(relations,{'identifier':measureScope.identifier})){
        //             //             element = _.findWhere(relations ,{'identifier':measureScope.identifier});
        //             //             parentElement = _.findWhere( measure.document.scopeOfElements ,{'identifier':element.parent});
        //             //             parentElement.elements.push(measureScope);
        //             //         }
        //             //         else if(_.findWhere(informedConsent,{'identifier':measureScope.identifier})){
        //             //             element = _.findWhere( informedConsent ,{'identifier':measureScope.identifier});
        //             //             parentElement = _.findWhere( measure.document.scopeOfElements ,{'identifier':element.parent});
        //             //             parentElement.elements.push(measureScope);
        //             //         }
        //             //         else if(_.findWhere(traditionalKnowledge,{'identifier':measureScope.identifier})){
        //             //             element = _.findWhere( traditionalKnowledge ,{'identifier':measureScope.identifier});
        //             //             parentElement = _.findWhere( measure.document.scopeOfElements ,{'identifier':element.parent});
        //             //             parentElement.elements.push(measureScope);
        //             //         }
        //             //         else if(_.findWhere(benefitsAgreedTerms,{'identifier':measureScope.identifier})){
        //             //             element = _.findWhere( benefitsAgreedTerms ,{'identifier':measureScope.identifier});
        //             //             parentElement = _.findWhere( measure.document.scopeOfElements ,{'identifier':element.parent});
        //             //             parentElement.elements.push(measureScope);
        //             //         }
        //             //         else if(_.findWhere(compliance,{'identifier':measureScope.identifier})){
        //             //             element = _.findWhere( compliance ,{'identifier':measureScope.identifier});
        //             //             parentElement = _.findWhere( measure.document.scopeOfElements ,{'identifier':element.parent});
        //             //             parentElement.elements.push(measureScope);
        //             //         }
        //             //         else if(_.findWhere(monitoringUtilization,{'identifier':measureScope.identifier})){
        //             //             element = _.findWhere(monitoringUtilization ,{'identifier':measureScope.identifier});
        //             //             parentElement = _.findWhere( measure.document.scopeOfElements ,{'identifier':element.parent});
        //             //             parentElement.elements.push(measureScope);
        //             //         }
        //             //      });
        //              //
        //                  _.each(measure.document.amendedMeasures, function(amended){
        //                      $http.get('/api/v2013/documents/' + amended.identifier)
    	// 		             .success(function (data) {
        //                          amended.measure = data;
        //                      });
        //                  });
         //
        //                  _.each(measure.document.linkedMeasures, function(amended){
        //                      $http.get('/api/v2013/documents/' + amended.identifier)
    	// 		             .success(function (data) {
        //                          amended.measure = data;
        //                      });
        //                  });
        //              //
        //             //  }
        //             //   console.log(scopeElements);
        //          }).error(function (error) {
        //             console.log('onerror'); console.log(error);
        //          })
        //          .finally(function(){
        //              measure.isLoading=false;
        //          });;
        //      }
         //
        //  };

         function relatedElement(measure, searchMeasure){

            _.forEach(measure.scopeOfElements, function(parentElement){
                _.forEach(parentElement.elements, function(measureElement){
                    var element = _.find(searchMeasure.absMeasures, {'identifier':measureElement.identifier});
                    if(element){

                        if(!measureElement.relatedElements)
                            measureElement.relatedElements = [];

                        _.extend(element, {title: measure.title });
                        measureElement.relatedElements.push(element);
                    }
                });
            });
         }


//     var ms = thesaurus.buildTree(measureElements);
//
//     $timeout(function(){
//         $scope.absMeasuresBlaise = ms;
//     },2000)
// console.log(JSON.stringify(thesaurus.buildTree(measureElements)))

    	}]);

