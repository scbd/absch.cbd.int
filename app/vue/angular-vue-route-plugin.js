
const AngularVueRoutePlugin = ($injector) =>{

    if(!$injector)
        throw new Error('Angular $injector not provided, cannot use AngularVueRoutePlugin plugin');


    const $location = $injector.get('$location');
    const $route    = $injector.get('$route');
    
    if(!$location)
        throw new Error('Angular $location service not available, cannot use AngularVueRoutePlugin plugin');
    if(!$route)
        throw new Error('Angular $route service not available, cannot use AngularVueRoutePluginplugin');


    var route ={
        get path()  { return $location.path() },
        get query() { return $location.search() },
        get params(){ return $route.current?.params }
    }

    return {
        install(Vue, options) {
            if(!Vue.prototype.$route)
                Vue.prototype.$route = route;
        }
      }
}

export default AngularVueRoutePlugin;