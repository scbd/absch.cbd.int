<template>
  <div class="container">
    <div class="row row-eq-height">
      <aside class="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-4 col-xxl-3 gx-2 gy-2">
          <side-menu :menu="menu"  class="menu-sticky mt-1"></side-menu>
      </aside>
      <main class="col-12 col-sm-6 col-md-7  col-lg-8  col-xl-8 col-xxl-9 gx-2 gy-2" >
        <div class="bg-white p-4" ref="view">
            <component :is="viewComponent" v-if="viewComponent" ref="viewInstance" v-bind="viewProps"/>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { defineComponent, shallowRef } from 'vue';
import ArticlesApi from '~/api/articles';
import ForumsApi from '~/api/forums';
import MenusApi from '~/api/portals';
import SideMenu from '~/components/menus/side-menu.vue';
import Article from './article-id.vue'
import Forum from './forum-id.vue'
import ForumLoP from './forum-lop-id.vue'
import Thread from './thread-id.vue'
import SubRouter from "../../services/router.js";
import { compile }  from "path-to-regexp";
import PageNotFound from '~/views/shared/404.vue';
import { useRealm  } from '~/services/composables/realm.js';

let subRouter = new SubRouter([]);

export default {
  name:'onlineConferences',
  components:{
    SideMenu
  },
  setup() {
    const realm = useRealm();
    return { realm };
  },
  props:{
    basePath: String
  },
  data() { 
    return {
      portalMenu: null,
      viewComponent: shallowRef(null),
      viewProps : null,
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
    onRouteChange,
    initializePortal,
  },
  watch: {
    portalId: initializePortal
  },
  async created() {
    await this.initializePortal();
  }
}

async function initializePortal() {

    const { portalId, unwatchPath } = this;
    const { realm } = this;

    if(unwatchPath) unwatchPath();

    this.menusApi    = new MenusApi();
    this.articlesApi = new ArticlesApi();
    this.forumsApi   = new ForumsApi();

    const portalMenu = await this.menusApi.getPortalByCode(realm.value, portalId);

    subRouter = buildRoutes(portalMenu);

    this.portalMenu  = portalMenu;
    this.unwatchPath = this.$watch('path', onRouteChange);

    this.onRouteChange();
}

function onRouteChange() {
  
  const { portalRoute } = this;
  const { path, params: routeParams }  = portalRoute;

  const match     = subRouter.match(path);
  const component = match?.route?.component || PageNotFound;
  
  this.viewComponent = null;
  this.viewProps     = null;

  if(component) { // instanciate component into placeholder location

    const matchParams    = match?.params;
    const subRouteParams = match?.route?.params;

    this.viewProps     = { ...(routeParams||{}), ...(matchParams||{}), ...(subRouteParams||{}) };
    this.viewComponent = defineComponent(component);

    if(document.documentElement.scrollTop > this.$refs.view.offsetTop)
        this.$refs.view.scrollIntoView();
  }
}

const CONTENT_TYPES = {
  "*"     : { },
  article : { component: Article },
  forum   : { component: Forum, subRoutes: [ { path: '/thread/:threadId', component: Thread } ] },
  forumLoP: { component: ForumLoP }
}

function combine(...parts) {
  return parts.filter(o=>o).join('/').replace(/\/+/g, '/');
}

function buildRoutes(portalMenu) {

  const routes = toRoutes({ ...portalMenu, slug: '' }, '/');

  return new SubRouter(routes);
}

function toRoutes({ slug, menus, content }, parentPath) {

  const path         = combine(parentPath, slug);
  const [ type ]     = Object.keys(content || {});
  const contentType  = CONTENT_TYPES[type||'*'] || CONTENT_TYPES['*'];
  const { component, subRoutes } = contentType || {};

  const params = !content ? {} : { ... (content[type] || {}) };

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


function toMenu({ slug, url: menuUrl, title, content, menus }, basePath) {

  const menuPath = [basePath, slug].filter(o=>o).join('/');
  const { url, target } = menuUrl || {};

  const menu = {
    url: url || menuPath,
    title,
    hasContent: !!content,
    target: url && target
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
