<template>
  <nav class="side-menu">
    <ul class="list-unstyled">
      <li style="border-bottom: 1px solid #324252;">
        <a :href="menu.url" class="d-flex align-items-center pb-3 mb-1 text-decoration-none menu-header btn-toggle">
          <h4 class="w-100">{{ lstring(menu.title, $locale) }}</h4>
          <button type="button" class="btn btn-default color-white float-end mb-1 d-block d-sm-none"
            @click="toggleMenu()">
                <i class="fa fa-bars"></i> <span class="caret"></span>
          </button>
        </a>
        
        <div v-if="menu.menus && menu.menus.length" class="main-menus d-sm-block" :class="{'d-none' : !expandMenu }">
          <ul class="list-unstyled" :class="[`level-0`]">
            <side-menu-sub v-for="(menu, index) in menu.menus" :key="index" :level="1" :menu="menu" />
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup>
  import { ref } from 'vue';
  import SideMenuSub from './side-menu-sub.vue'
  import { lstring } from '../kb/filters';
  
  const props = defineProps({
    menu: {
          type: Object,
          required: false
      }
  });

  const expandMenu = ref(false)

  const toggleMenu = function () {
    expandMenu.value = !expandMenu.value;
  };
</script>

<style scoped>
.side-menu{
  border: 1px solid #e3e0e0;
  /* padding: 5px; */
  box-shadow: 0px 0px 25px #00000070;
}
.menu-header{
  padding: 10px 10px 0px 10px!important;
  margin: 0px;
}

.side-menu .menu-header:hover,
.side-menu .menu-header:focus {
}


.side-menu .list-unstyled{
  margin-bottom: 0px!important;
}

.side-menu .btn-toggle[data-bs-toggle="collapse"]::before {
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%28255,255,255,1.0%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e")
}
</style>

<style>

.side-menu {
  /* to override */
}

.side-menu .menu-header {
  /* to override */
}

.side-menu .menu-header:hover,
.side-menu .menu-header:focus {
  /* to override */
}

</style>