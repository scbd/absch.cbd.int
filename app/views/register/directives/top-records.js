define(['app', 'text!./top-records.html', 'lodash','components/scbd-angularjs-services/services/storage'], function(app, template, _) {

    app.directive("topRecords", ['IStorage', '$q', function(storage, $q) {

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
                                
                $scope.self = $scope

                $scope.showSchemaName = attrs.showSchemaName;

                var qAnd = [];
                if($scope.schema)
                    qAnd.push("(type eq '" + $scope.schema + "')");
                if($scope.filter)
                    qAnd.push("(" + $scope.filter + ")");

                var qRecords = storage.drafts.query(qAnd.join(" and ") || undefined, {$top:$scope.top||10});
                $scope.loading = true;
                var records;
                $q.when(qRecords)
                .then(function(result){
                    records = result.data;

                    var remainingCount = ($scope.top||10)-result.data.Count;
                    if(remainingCount > 0 ){
                        var qRecords = storage.documents.query(["(type eq '" + $scope.schema + "')"], 'my', {$top:remainingCount});                        
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
});
