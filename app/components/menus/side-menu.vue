<template>
  <nav class="side-menu">
    <ul class="list-unstyled">
      <li>
        <a :href="menu.url" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
          <h4>{{ menu.title | lstring($locale) }}</h4>
        </a>
        <div>
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
  props: {
    menu: Object,
  },
}
</script>

<style scoped></style>