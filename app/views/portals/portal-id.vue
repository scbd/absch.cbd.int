<template>
  <div class="container">
    <div class="row row-eq-height">
      <aside class="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 gx-2 gy-2">
          <side-menu :menu="menu"  class="menu-sticky mt-1"></side-menu>
      </aside>
      <main class="col-12 col-sm-6 col-md-7  col-lg-8  col-xl-9 gx-2 gy-2" >
        <div class="bg-white p-4" ref="view"></div>
      </main>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ArticlesApi from '~/api/articles';
import ForumsApi from '~/api/forums';
import MenusApi from '~/api/portals';
import SideMenu from '~/components/menus/side-menu.vue';
import Article from './article-id.vue'
import Forum from './forum-id.vue'
import Thread from './thread-id.vue'
import SubRouter from "../../services/router.js";
import { compile }  from "path-to-regexp";
import PageNotFound from '~/views/shared/404.vue';

let subRouter = new SubRouter([]);

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
      portalMenu: null
    };
  },
  computed : {
    portalId() { return this.$route.params.portalId; },
    menu()     { return this.buildMenu() },
    path()     { 
      const { subPath } = this.$route.params;
      const path      = `/${subPath||''}`;
      return path; 
    },
    portalRoute()     { 
      const { path, $route } = this;
      const { subPath, ...params } = $route.params;

      return { ...$route, path, params }; 
    }
  },
  methods:{
    buildMenu,
    onRouteChange
  },
  watch: {
    path: onRouteChange
  },
  async created() {

    const { portalId } = this;

    this.menusApi    = new MenusApi();
    this.articlesApi = new ArticlesApi();
    this.forumsApi   = new ForumsApi();

    const portalMenu = await this.menusApi.getPortalByCode(portalId);

    subRouter = buildRoutes(portalMenu);

    this.portalMenu = portalMenu;
    
    this.onRouteChange();
  }
}

function onRouteChange() {
  
  const { portalRoute } = this;
  const { path, params: routeParams }  = portalRoute;

  const match     = subRouter.match(path);
  const component = match?.route?.component || PageNotFound;

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
  "*"     : { },
  article : { component: Article },
  forum   : { component: Forum, subRoutes: [ { path: '/thread/:threadId', component: Thread } ] },
}

function combine(...parts) {
  return parts.filter(o=>o).join('/').replace(/\/+/g, '/');
}

function buildRoutes(portalMenu) {

  const routes = toRoutes({ ...portalMenu, slug: '' }, '/');

  console.dir(routes);

  return new SubRouter(routes);
}

function toRoutes({ slug, menus, content }, parentPath) {

  const path         = combine(parentPath, slug);
  const [ type ]     = Object.keys(content || {});
  const contentType  = CONTENT_TYPES[type||'*'] || CONTENT_TYPES['*'];
  const { component, subRoutes } = contentType || {};

  const params = { 
    identifier: content?.article?.id,
    forumId:    content?.forum?.id 
  };

  const routes = [
    { path, component, params }
  ];

  for(let subRoute of subRoutes || []) {
    routes.push({ 
      path      : combine(path, subRoute.path), 
      component : subRoute.component || component, 
      params    : subRoute.params
    })
  }

  for(let child of menus || []) {
    for(let route of toRoutes(child, path)) {
      routes.push(route);
    }
  }

  return routes;
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


function toMenu({ slug, url, title, menus }, basePath) {

  const menuPath = [basePath, slug].filter(o=>o).join('/');

  const menu = {
    url: url || menuPath,
    title,
  };

  for(let child of menus || []) {
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
