
const AngularVueNgDialogPlugin = ($injector) =>{

    if(!$injector)
        throw new Error('Angular $injector not provided, cannot use AngularVueRoutePlugin plugin');

    let ngDialog;
    const $rootScope = $injector.get('$rootScope');
    
    const ngDialogService ={
        close(id, value){
            ngDialog.close(id, value);
        },
        open(opts){
            const options = {...opts, scope : $rootScope.$new(true)}
            angular.extend(options.scope, opts.scope, );
            ngDialog.open(options);
        }
    }

    return {
        install(Vue, options) {
           if(!Vue.prototype.hasOwnProperty('dialogService')){
                Object.defineProperty(Vue.prototype, 'dialogService', {
                    get: function() {
                        if(!ngDialog)
                            ngDialog = $injector.get('ngDialog');
                            
                        if(!ngDialog)
                            throw new Error(`Angular 'ngDialog' service not available, cannot use AngularVueNgDialogPlugin plugin`);
                        
                        return ngDialogService
                    }
                });
            }
        }
      }
}

export default AngularVueNgDialogPlugin;