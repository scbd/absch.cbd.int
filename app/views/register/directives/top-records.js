import app from '~/app';
import template from 'text!./top-records.html';
import _ from 'lodash';
import '~/components/scbd-angularjs-services/main';
import topeRecordsT from '~/app-text/views/register/directives/top-records.json';

app.directive("topRecords", ['IStorage', '$q', 'translationService', function (storage, $q, translationService) {

        return {
            restrict: "EA",
            template: template, 
            replace: true,
            transclude: false,
            scope: {
                title: '@',
                schema: '@',
                filter: '@',
                top: '@',
                viewAllUrl: '@'
            },
            link: function($scope, element, attrs) {
                translationService.set('topeRecordsT', topeRecordsT);             
                $scope.self = $scope

                $scope.showSchemaName = attrs.showSchemaName;

                var qAnd = [];
                if($scope.schema)
                    qAnd.push("(type eq '" + $scope.schema + "')");
                if($scope.filter)
                    qAnd.push("(" + $scope.filter + ")");

                var qRecords = storage.drafts.query(qAnd.join(" and ") || undefined, {$top:$scope.top||10, $orderby:'updatedOn desc'});
                $scope.loading = true;
                var records;
                $q.when(qRecords)
                .then(function(result){
                    records = result.data;

                    var remainingCount = ($scope.top||10)-result.data.Count;
                    if(remainingCount > 0 ){
                        var qRecords = storage.documents.query(["(type eq '" + $scope.schema + "')"], 'my', {$top:remainingCount, $orderby:'updatedOn desc'});                        
                        return $q.when(qRecords)
                                    .then(function(result){
                                        _.forEach(result.data.Items, function(item){
                                            if(!_.find(records.Items, {identifier: item.identifier}))
                                                records.Items.push(item);
                                        });
                                        records.Count += result.data.Count
                                    })
                    }
                })
                .finally(function(){
                    if(records)
                        $scope.self.records = records;
                    $scope.loading=false;
                })

            }
        };
    }]);

