export default function($injector) {

    if(!$injector)
        throw new Error('Angular $injector not provided, cannot use AngularVueRoutePlugin plugin');

    const state = Vue.observable({
        user: null,
        userToken: null
    })

    const auth ={
        get user()          { return state.user; },
        get loggedIn()      { return user && user.isAuthenticated },
        setUser(newUser)    { state.user = newUser },
        setUserToken(token) { state.userToken = token; },

        logout()        { 
            const authentication = $injector.get('authentication');
            return authentication.signOut();
        },
        fetchUser()     { 
            const authentication = $injector.get('authentication');
            return authentication.getUser();
        },
        hasScope(scopeName)      { 

            let rolesToValidate = [];
            if(typeof scopeName == 'string')
                rolesToValidate = [scopeName];
            else if(!Array.isArray(scopeName))
                throw new Error("`scopeName` must be string or array od string");

            rolesToValidate = scopeName;

            const hasRole = rolesToValidate.find(scope=>this.user?.roles.includes(scope));

            return !!hasRole;
        },
        refreshTokens() { throw new Error('Not Implemented'); },
        onError()       { throw new Error('Not Implemented'); },
        onRedirect()    { throw new Error('Not Implemented'); },
        strategy :      { 
            token : { 
                get()      { return state.userToken; },
                set(token) { state.userToken = token }                
            },
            get refreshToken() { throw new Error('Not Implemented');  }            
         },
    }

    return {
        install(Vue, options) {
            if(!Vue.prototype.$auth) {
                Object.defineProperty(Vue.prototype, '$auth', {
                    get () { return auth }
                })
            }
        }
    };
};