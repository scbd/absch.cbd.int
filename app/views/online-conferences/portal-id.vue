<template>
  <div class="container">
    <div class="row row-eq-height">
      <div class="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 gx-2 gy-2">
          <side-menu :menu="menu"  class="menu-sticky"></side-menu>
      </div>
      <div class="col-12 col-sm-6 col-md-7  col-lg-8  col-xl-9 gx-2 gy-2" >
        <div class="bg-white p-4" ref="view"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ArticlesApi from '~/api/articles';
import ForumsApi from '~/api/forums';
import SideMenu from '~/components/menus/side-menu.vue';
import Forum from './forum-id.vue'
import Article from './article-id.vue'
import SubRouter from "../../services/router.js";
import { compile }  from "path-to-regexp";
import PageNotFound from '~/views/shared/404.vue';


const subRouter = new SubRouter([
  { path: '/',                                name : "home",      component: Article, params: { identifier: 'introduction' } },
  { path: '/:identifier(calendar)',           name : "calendar",  component: Article },
  { path: '/resources/:identifier',           name : "resources", component: Article },
  { path: '/forum/:forumId',                  name : "forum",     component: Forum },
  { path: '/forum/:forumId/thread/:threadId', name : "thread",    component: Forum },
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
      forums: []
    };
  },
  computed : {
    portalId()             { return this.$route.params.portalId; },
    introduction()         { return this.articles.find  (a=>a.adminTags.includes('introduction')) },
    calendarOfActivities() { return this.articles.find  (a=>a.adminTags.includes('calendar')) },
    resources()            { return this.articles.filter(a=>!Object.values(Tags).some(t=>a.adminTags.includes(t))) },
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

    this.articlesApi = new ArticlesApi();
    this.forumsApi   = new ForumsApi();

    const qArticles = this.articlesApi.queryArticles({ 
      ag: [ 
        { $match   : { adminTags:{ $all :["realm:BCH", `portal:${this.portalId}`] } } },
        { $project : { adminTags:1, title:1 } },
      ]
    });

    const qForums = this.forumsApi.queryForums({
      q: { tags: ["realm:BCH"] }
    });

    const [ articles, forums ] = await Promise.all([qArticles, qForums]);

    this.articles = articles;
    this.forums   = forums;

    this.onRouteChange(this.$route);
  }
}

function onRouteChange(route) {
  const { subPath, ...routeParams } = route.params;

  const path      = `/${subPath||''}`;
  const match     = subRouter.match(path);

  let component = match?.route?.component || PageNotFound;

  while (this.$refs.view.firstChild) {
      this.$refs.view.removeChild(this.$refs.view.lastChild);
  }

  if(component) {

    const matchParams    = match?.params;
    const subRouteParams = match?.route?.params;

    const propsData      = { ...(routeParams||{}), ...(matchParams||{}), ...(subRouteParams||{}) }
    const ComponentClass = Vue.extend(component);
    const instance       = new ComponentClass({ propsData });
    
    instance.$mount();

    this.$refs.view.appendChild(instance.$el);

    if(document.documentElement.scrollTop > this.$refs.view.offsetTop)
        this.$refs.view.scrollIntoView();

  }
}

function buildMenu() {
  const basePath = compile(this.basePath)(this.$route.params).replace(/^\//g, '');

  const {
    introduction,
    calendarOfActivities,
    forums,
    resources
  }  = this;

  const menu = {
    url : `${basePath}`,
    title : introduction ? introduction.title : "Loading...",
    menus : []
  }

  if(calendarOfActivities) {
    menu.menus.push({
      url : `${basePath}${subRouter.compile('calendar', { identifier: 'calendar' })}`,
      title : calendarOfActivities.title,
    })
  }

  if(forums.length==1) {
    const { forumId } = forums[0].forumId;
    menu.menus.push({
      title : "Discussion Forum",
      url : `${basePath}${subRouter.compile('forum', { forumId })}`,
    })
  }

  if(forums.length>1) {
    menu.menus.push({
      title : "Discussion Fora",
      menus : forums.map(({forumId, title})=>({
        url: `${basePath}${subRouter.compile('forum', { forumId })}`,
        title: title
      }))
    })
  }

  if(resources.length) {
    menu.menus.push({
      title : "Additional Resources",
      menus: resources.map(({_id, title})=>({
        url: `${basePath}${subRouter.compile('resources', { identifier: _id })}`,
        title: title
      }))
    })
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
