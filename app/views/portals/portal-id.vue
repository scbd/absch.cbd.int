<template>
  <div class="container">
    <div class="row row-eq-height">
      <div class="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 gx-2 gy-2">
          <side-menu :menu="menu"  class="menu-sticky"></side-menu>
      </div>
      <div class="col-12 col-sm-6 col-md-7  col-lg-8  col-xl-9 gx-2 gy-2" >
        <div class="bg-white p-4" ref="view"></div>
        <pre>{{ __menu }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ArticlesApi from '~/api/articles';
import ForumsApi from '~/api/forums';
import SideMenu from '~/components/menus/side-menu.vue';
import Article from './article-id.vue'
import Forum from './forum-id.vue'
import Thread from './thread-id.vue'
import SubRouter from "../../services/router.js";
import { compile }  from "path-to-regexp";
import PageNotFound from '~/views/shared/404.vue';
import ___MENUS from './menus.json'


class MenusApi {
  async get(slug) { 
    return ___MENUS.find(m=>m.slug==slug);
  }
};



let subRouter = new SubRouter([
]);

const Tags = {
  introduction : "introduction",
  calendar : "calendar"
}

export default {
  name:'onlineConferences',
  components:{
    SideMenu
  },
  props:{
    basePath: String
  },
  data() { 
    return {
      articles: [],
      forums: [],
      portalMenu: {}
    };
  },
  computed : {
    portalId()             { return this.$route.params.portalId; },
    menu()                 { return this.buildMenu() }
  },
  methods:{
    buildMenu,
    onRouteChange
  },
  watch: {
    '$route': onRouteChange
  },
  async created() {

    const { portalId } = this;


    this.menusApi    = new MenusApi();
    this.articlesApi = new ArticlesApi();
    this.forumsApi   = new ForumsApi();

    const portalMenu = await this.menusApi.get(portalId);

    subRouter = buildRoutes(portalMenu);

    this .portalMenu = portalMenu;
    
    this.onRouteChange(this.$route);
  }
}

function onRouteChange(route) {
  const { subPath, ...routeParams } = route.params;

  const path      = `/${subPath||''}`;
  const match     = subRouter.match(path);

  let component = match?.route?.component || PageNotFound;

  while (this.$refs.view.firstChild) { //Cleanup view placeholder
      const element  = this.$refs.view.lastChild;
      const instance = element.$component;

      this.$refs.view.removeChild(element);

      if(instance) instance.$destroy();
  }

  if(component) { // instanciate component into placeholder location

    const matchParams    = match?.params;
    const subRouteParams = match?.route?.params;

    const propsData      = { ...(routeParams||{}), ...(matchParams||{}), ...(subRouteParams||{}) }
    const ComponentClass = Vue.extend(component);
    const instance       = new ComponentClass({ parent: this, propsData });
    
    this.$refs.view.appendChild(document.createElement('div'));

    instance.$mount(this.$refs.view.lastChild);
    instance.$el.$component = instance;

    if(document.documentElement.scrollTop > this.$refs.view.offsetTop)
        this.$refs.view.scrollIntoView();
  }
}

const CONTENT_TYPES = {
  "*"     : { component: Article },
  article : { component: Article },
  forum   : { component: Forum, subRoutes: [ { path: '/thread/:threadId', component: Thread } ] },
}

function combine(...parts) {
  return parts.filter(o=>o).join('/').replace(/\/+/g, '/');
}

function buildRoutes(portalMenu) {

  const routes = [];

  const addRoute = ({ slug, children, content }, parentPath) => {
    const path         = combine(parentPath, slug);
    const [ type ]     = Object.keys(content || {});
    const contentType  = CONTENT_TYPES[type||'*'] || CONTENT_TYPES['*'];
    const { component, subRoutes } = contentType || {};

    const params    = { 
      identifier: content?.article?.id,
      forumId:    content?.forum?.id 
    };

    routes.push({ path, component, params })

    for(let subRoute of subRoutes || []) {
      routes.push({ 
        path      : combine(path, subRoute.path), 
        component : subRoute.component || component, 
        params    : subRoute.params
      })
    }

    for(let child of children || [])
      addRoute(child, path);
  }

  addRoute({ ...portalMenu, slug: '' }, '/');

  console.dir(routes);

  return new SubRouter(routes);
}

function buildMenu() {
  
  const basePath = compile(`${this.basePath}`)(this.$route.params).replace(/^\//g, '');

  const { portalMenu } = this;

  if(!portalMenu) {
    return {
      url : `${basePath}`,
      title : "Loading...",
    }
  }

  const menu = toMenu({ ...portalMenu, slug:''}, basePath);

  return menu;
}


function toMenu({ slug, url, title, children }, basePath) {

  const menuPath = [basePath, slug].filter(o=>o).join('/');

  const menu = {
    url: url || menuPath,
    title,
  };

  for(let child of children || []) {
    menu.menus = menu.menus || [];
    menu.menus.push(toMenu(child, menuPath))
  }

  return menu;
}

</script>
<style scoped>
.menu-sticky {
  position: sticky;
  top: 0px;
}
</style>
