const AngularVueDynamicPlugin = ($injector, ngServiceName) =>{

    if(!$injector)
        throw new Error('Angular $injector not provided, cannot use AngularVueDynamicPlugin plugin');
    
    return {
        install(Vue, options) {
            if(!Vue.prototype.hasOwnProperty(ngServiceName)){
                Object.defineProperty(Vue.prototype, ngServiceName, {
                    get: function() {
                        // console.log(`Get ${ngServiceName}`)
                        const ngService = $injector.get(ngServiceName);
                        if(!ngService)
                            throw new Error(`Angular ${ngService} service not available, cannot use AngularVueDynamicPlugin plugin`);
                        
                        return ngService
                    }
                });
            }
        }
      }
}

export default AngularVueDynamicPlugin;