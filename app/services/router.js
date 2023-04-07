import { match, compile }  from "path-to-regexp";


export default class Router {

    #routes = [];

    constructor(routes) {
        routes.forEach(r => this.when(r));
    }

    when(options) {

        const { path, name } = options;

        if(name) this.#routes = this.#routes.filter(o=>o!==name); //remove existing
        if(path) this.#routes = this.#routes.filter(o=>o!==path); //remove existing

        this.#routes.push({
            ...options,
            path,
            name,
            match: match(path),
            compile: compile(path)
        });

        return this;
    }

    match(path) {
        const route = this.#routes.find(o=>o.match(path));

        if(route) {
            const urlMatch = route.match(path);
            return { ...urlMatch, route}
        }

        return null;
    }

    compile(name, params) {
        const route = this.#routes.find(o=>name && o.name==name);

        if(route) {
            return route.compile(params);
        }

        return null;
    }

}