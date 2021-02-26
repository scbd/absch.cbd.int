define(['app', 'lodash', 'text!views/forms/directives/traits-selector.directive.html'], function (app, _, template) {

    app.directive('traitsSelector', ["thesaurusService", "$q", function (thesaurusService, $q) {
        return {
            restrict: 'EA',
            template: template,
            replace: true,
            require:'?ngModel',
            scope:{
                binding: '=ngModel',
                locales: '='
            },
            link: function ($scope, $element, $attr, ngModelController) {
                
                $scope.rootTraits = [];
                $scope.traits = {
                    '81799D15-669E-4346-9AEC-6834893D2BE4':{ items: [] },
                    '0C74FEB2-78E8-4163-81EF-2D410FB2FBBC':{ items: [] },
                    '87D98E42-4757-42DE-9C3F-815BFAA35218':{ items: [] },
                    '31396BD1-9E3E-4EB3-A29E-9A22B7230221':{ items: [] },
                    '337747E5-522D-42DF-8C57-FE626C1572EC':{ items: [] },
                    '3B427EA6-5260-47F1-B424-FAAA5960FB52':{ items: [] },
                    '5B9DB3B4-90A1-451A-A10C-E3A47995344F':{ items: [] },
                    'C8C662E2-D633-4C69-96EA-C9853997A3A5':{ items: [] },
                    'D39FE35E-8BFE-459C-B640-E70E00BC0D20':{ items: [] }
                }
                
                $scope.options = {
                    rootTraits      : function(){
                        var query = _($scope.traits).map(function(t, key){return thesaurusService.getTerms(key)}).value();
                        query.push(thesaurusService.getDomainTerms('other'));
                        
                        return $q.all(query).then(function(data){
                            return _(data).map(function(d){
                                if(d.identifier=='5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'){
                                    d.type='lstring';
                                    d.multiple=true;
                                }
                                return d
                            }).value();
                        });
                    },
                    traits			: function(parent){ 
                        return $q.all([thesaurusService.getDomainTerms('dnaSequenceTraits'),thesaurusService.getDomainTerms('other')])
                        .then(function(data){	
                            var terms = [];
                            _.forEach(data[0], function(d){
                                 if( _.includes(d.broaderTerms, parent))
                                     terms.push(d);
                                else{
                                    var parentIds = _.map(terms,  'identifier')
                                    if(_.intersection(parentIds, d.broaderTerms).length)
                                        terms.push(d);
                                }
                            });
        
                            var other = data[1];
                            other.identifier = other.identifier;
                            other.type = 'lstring';
                            other.multiple=true;
                            other.broaderTerms.push(parent);
        
                            return _.union(terms, [other]);
                        })
                    },
                    traitsOtherSection: function(){
                        return $q.all([thesaurusService.getTerms('D39FE35E-8BFE-459C-B640-E70E00BC0D20'),thesaurusService.getDomainTerms('other')])
                        .then(function(data){	
                            var other = data[1];
                            other.type = 'lstring';
                            other.multiple=true;
                            return [data[0], other];
                        });
                    }
                }

                $scope.$watch('binding', updateFromBinding)

                $scope.onRootTraitsChange = function(){
                    var rootTraits = _.map($scope.rootTraits, 'identifier');
                    _.forEach($scope.traits, function(trait, key){
                        if(_.includes(rootTraits, key))
                            trait.selected = true;
                        else{
                            trait.selected = false;trait.items    = [];
                        }                   
                    })
                    $scope.onTraitsChange()
                }

                $scope.onTraitsChange = function(){
                    var newBinding = [];
                    //other from root traits
                    _.forEach($scope.rootTraits, function(t){
                        if(t.identifier=='5B6177DD-5E5E-434E-8CB7-D63D67D5EBED' && t.customValue)
                            newBinding.push({ identifier: t.identifier, customValue:t.customValue })
                    });

                    _.forEach($scope.traits, function(trait, key){
                        if(trait.selected)
                            newBinding.push({identifier: key});
                        if((trait.items||[]).length){
                            _.forEach(trait.items, function(t){
                                
                                if(t.identifier!='5B6177DD-5E5E-434E-8CB7-D63D67D5EBED')
                                    newBinding.push(t)
                                else if(t.customValue){
                                    //incase of traitsOtherSection its a custom section for one term and other terms for all of traits
                                    newBinding.push({
                                        identifier: key, 
                                        customValue:t.customValue
                                    })
                                }
                            })
                        }
                    })
                    traits = _.flatten(newBinding)
                    if(!angular.equals(newBinding, $scope.binding)){
                        $scope.binding = newBinding;
                        ngModelController.$setViewValue($scope.binding);
                    }
                }


                function updateFromBinding( newV, old){
                    if(($scope.rootTraits||[]).length && angular.equals(newV, old))
                        return;
                    var traitsIds = _.map($scope.binding, 'identifier');
                    // if(traitsIds.length)
                    //     bindingWatcher();
                    _.forEach($scope.traits, function(trait, key){
                        var items = []
                        // if(trait.selected){

                            $q.when($scope.options.traits(key)).then(function(traitsTerms){						
                                traitsTerms = _(traitsTerms).map('identifier').without('5B6177DD-5E5E-434E-8CB7-D63D67D5EBED').value();

                                items = _(traitsTerms).intersection(traitsIds).map(function(id){ return _.find($scope.binding, {identifier:id}); }).value();
                                
                                // when the parent key matches identifiers its for other custom value, 
                                // use filter as there can be multiple others
                                if(_.includes(traitsIds, key)){ 
                                    items = _($scope.binding).filter({identifier:key})
                                                        .map(function(t){if(t.customValue)return {identifier:'5B6177DD-5E5E-434E-8CB7-D63D67D5EBED', customValue:t.customValue}})
                                                        .compact()
                                                        .union(items)
                                                        .value();
                                }
                                if(items.length){
                                    $scope.traits[key].items = items;
                                    $scope.traits[key].selected = true;
                                    $scope.rootTraits.push({identifier:key})
                                }
                            });
                        // }
                    });

                    $scope.rootTraits = _($scope.binding)
                                         .filter(function(bind){ return bind.identifier=='5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'})
                                         .union(_.filter(($scope.rootTraits||[]), function(trait){return $scope.traits[trait.identifier]}))
                                         .value()
                }
            }
        }
    }])

});