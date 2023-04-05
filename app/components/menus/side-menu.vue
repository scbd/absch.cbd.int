<template>
  <nav class="side-menu">
    <ul class="list-unstyled">
      <li style="border-bottom: 1px solid #324252;">
        <a :href="menu.url" class="d-flex align-items-center pb-3 mb-1 text-decoration-none border-bottom menu-header">
          <h4 class="w-100">{{ menu.title | lstring($locale) }}</h4>
          <button type="button" class="btn btn-default float-end mb-1" 
            @click="showHideMenu()" :class="{'d-block' : isSmallScreen, 'd-none':!isSmallScreen}">
                <i class="fa fa-bars"></i> <span class="caret"></span>
          </button>
        </a>
        
        <div class="main-menus" :class="{'d-none' : isSmallScreen && !expandMenu, 'd-block': expandMenu}">
          <side-menu-sub v-if="menu.menus && menu.menus.length" :menus="menu.menus" />
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import SideMenuSub from './side-menu-sub.vue'
export default {
  name: 'SideMenu',
  components: { SideMenuSub },
  data(){
    return {
      expandMenu : false
    }
  },
  props: {
    menu: Object,
  },
  computed:{
    isSmallScreen(){
      return ['xs', 'sm'].includes(window.deviceSize);
    }
  },
  methods:{
    showHideMenu(){
      this.expandMenu = !this.expandMenu;
    }
  }
}
</script>

<style scoped>
.side-menu{
  border: 1px solid #e3e0e0;
  /* padding: 5px; */
  box-shadow: 0px 0px 25px #00000070;
  background: #00405C;
}
.menu-header{
  color: #fff;
  padding: 10px 10px 0px 10px!important;
  margin: 0px;
}

.side-menu .menu-header:hover,
.side-menu .menu-header:focus {
  color: rgba(200, 200, 200, .85) !important;
  background-color: #324252;
}


.side-menu .list-unstyled{
  margin-bottom: 0px!important;
}

.side-menu .btn-toggle[data-bs-toggle="collapse"]::before {
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%28255,255,255,1.0%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e")
}
</style>