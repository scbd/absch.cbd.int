const AngularVueRouterPlugin = ($injector) =>{

    if(!$injector)
        throw new Error('Angular $injector not provided, cannot use AngularVueRouterPlugin plugin');

    const $location = $injector.get('$location');
    if(!$location)
        throw new Error('Angular $location service not available, cannot use AngularVueRouterPlugin plugin');

    var router ={
        push ({path, query}){
            if(path)
                $location.path(path);
            
            if(query)
                $location.search(query||{});
        }
    }
    return {
        install(Vue, options) {
            if(!Vue.prototype.$router)
                Vue.prototype.$router = router;
        }
      }
}

export default AngularVueRouterPlugin;