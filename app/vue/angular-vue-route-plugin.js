
const AngularVueRoutePlugin = ($location, $route) =>{

    if(!$location)
        throw new Error('Angular $location not provided, cannot use AngularVueRoutePlugin plugin');
    if(!$route)
        throw new Error('Angular $route not provided, cannot use AngularVueRoutePluginplugin');

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