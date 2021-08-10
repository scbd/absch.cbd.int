const CreateAngularVuePlug = (ngServiceName, ngService) =>{

    return {
        // called by Vue.use(createAngularVuePlug)
        install(Vue, options) {
            if(!Vue.prototype[ngServiceName])
                Vue.prototype[ngServiceName] = ngService;
        }
      }
}

export default CreateAngularVuePlug;