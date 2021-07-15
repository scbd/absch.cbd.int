const AngularVueRouterPlugin = ($location) =>{

    if(!$location)
        throw new Error('Angular $location not provided, cannot use AngularVueRouterPlugin plugin');

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