define(['app', 'lodash', 'text!./lmo-construct.html', 'drag-and-drop', 'css!/app/css/bch/lmo-construct.css', 'ngDialog',
'views/forms/edit/document-selector', 'components/scbd-angularjs-services/services/storage','views/forms/view/bch/view-lmo-gene.directive', 
'views/forms/view/bch/view-lmo-gene.directive'], function (app, _, lmoConstructTemplate) {

    app.directive('lmoConstruct', ['IStorage', 'ngDialog', function (storage, ngDialog) {
        return {
            restrict: 'EA',
            template: lmoConstructTemplate,
            replace: true,
            require:'?ngModel',
            scope:{
                binding: '=ngModel'
            },
            link: function ($scope, $attr, $element, ngModelController) {
                var genes = {};   

                $scope.openContructDialog = function(existingConstruct, $index){
                            
                    ngDialog.open({
                        template: 'gene-construct-dialog',
                        closeByDocument: false,
                        scope: true,
                        controller: ['$scope', function($scope){

                            $scope.constructOptions = [];                
                            $scope.constructOptions.push({type:'senseStart',    subType:'sense',     effectAllowed: 'copy'});
                            $scope.constructOptions.push({type:'sense',         subType:'sense',     effectAllowed: 'copy'});
                            $scope.constructOptions.push({type:'senseStop',     subType:'sense',     effectAllowed: 'copy'});
                            $scope.constructOptions.push({type:'antisenseStart',subType:'antisense', effectAllowed: 'copy'});
                            $scope.constructOptions.push({type:'antisense',     subType:'antisense', effectAllowed: 'copy'});
                            $scope.constructOptions.push({type:'antisenseStop', subType:'antisense', effectAllowed: 'copy'});

                            $scope.newConstruct = [];
                            
                            $scope.closeDialog = function(){
                                ngDialog.close();
                            }

                            $scope.dragoverCallback = function(index, external, type, callback) {                    
                                return true;
                            };

                            $scope.dropCallback = function(index, item, external, type) {
                                // Return false here to cancel drop. Return true if you insert the item yourself.
                                return item;
                            };                           

                            $scope.noDragAndDrop = function(){
                                return false;
                            }
                            
                            $scope.saveConstruct = function(){
                                var newBinding = _.map($scope.newConstruct, function(item){
                                                    return {
                                                        type : item.type,
                                                        identifier: (item.selectedGene||{}).identifier,
                                                        size: item.size
                                                    }
                                                });
                                updateBinding(newBinding, existingConstruct, $index);
                                ngDialog.close();
                            }

                            $scope.geneSelected = function(geneItem){
                                if(!(geneItem.selectedGene||{}).identifier)
                                    return;

                                if(genes[geneItem.selectedGene.identifier]){
                                    geneItem.gene = genes[geneItem.selectedGene.identifier];
                                }
                                else{
                                    //load gene details
                                    storage.documents.get(geneItem.selectedGene.identifier, {info:true, body:false})
                                    .then(function(data){
                                        geneItem.gene = data.data;
                                        genes[geneItem.selectedGene.identifier] = data.data;
                                    });
                                }
                            }

                            if(existingConstruct){
                                $scope.newConstruct = _.map(existingConstruct, function(construct){
                                    var con = _.extend({}, construct);
                                    var option  = _.find($scope.constructOptions, {type:con.type})
                                    con.subType = option.subType
                                    if(con.identifier)
                                        con.selectedGene = {identifier: con.identifier};
                                    $scope.geneSelected(con);
                                    return con;
                                })
                            }
                        }]
                    });
                }

                $scope.moveDown = function($index){
                    if($index==$scope.binding.length)return;
                    var binding = angular.copy($scope.binding)
                    var item                 = binding[$index+1];
                    binding[$index+1] = binding[$index];
                    binding[$index]   = item;
                    setViewValue(binding);
                }
                $scope.moveUp = function($index){
                    if($index==0)return;
                    var binding = angular.copy($scope.binding)
                    var item                 = binding[$index-1];
                    binding[$index-1] = binding[$index];
                    binding[$index]   = item;
                    setViewValue(binding);
                }

                $scope.deleteConstruct = function($index){
                    if(confirm('Are you sure you want to delete this construct?')){
                        var binding = angular.copy($scope.binding);
                        binding.splice($index, 1)
                        setViewValue(binding);
                    }
                }

                function updateBinding(newBinding, existingConstruct, $index){
                    if(!angular.equals(newBinding, existingConstruct)){

                        var binding = angular.copy($scope.binding)
                        if(!binding)
                            binding = [];
                        if(existingConstruct)
                            binding[$index] = newBinding;
                        else
                            binding.push(newBinding);
                        setViewValue(binding);
                    }
                }

                function setViewValue(value){
                    $scope.binding = !_.isEmpty(value) ? value : undefined;
                    ngModelController.$setViewValue($scope.binding);
                }
                
            }
        }
    }])

});
