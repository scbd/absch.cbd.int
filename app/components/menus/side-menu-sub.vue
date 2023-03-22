<template>
  <ul class="list-unstyled" :class="[`level-${level}`]">
    <!-- {{ menu.menus }} -->
    <li class="mb-1" v-for="(menu, index) in menus" :key="index" :class="{['menu-border'] : index < menus.length-1  }">
      
      <a :href="menu.url" class="btn btn-toggle align-items-center rounded" style="width:100%"
      :class="{active : !hasSubMenu(menu) && selected(menu)}"
      :data-bs-toggle="hasSubMenu(menu) ? 'collapse' : null"
      :data-bs-target="hasSubMenu(menu) ? `#collapse-menu-${level}-${index}` : null"
      :aria-expanded="hasSubMenu(menu) ? `${selected(menu)}` : null"
      >
      {{menu.title|lstring($locale)}} 
    </a>

      <div v-if="hasSubMenu(menu)" class="collapse sub-menu" :class="{show:selected(menu)}" :id="`collapse-menu-${level}-${index}`">
        <side-menu-sub :menus="menu.menus" :level="level+1" />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
    name: 'SideMenuSub',
    props: {
        menus : { type: Array } ,
        level : { type: Number, default: 0 } 

    },
    methods: {
      hasSubMenu(menu) { return !!menu.menus?.length },
      selected(menu) { return  this.$route.path.indexOf(`/${menu.url}`)===0 }
    }
}
</script>

<style scoped>

.side-menu .sub-menu {
  margin-left: 1rem;
}
.side-menu .menu-border{
  /* border-bottom: 1px solid #dcd7d7; */
  border-bottom: 1px solid #324252;
}

.side-menu .btn-toggle {
  display: inline-flex;
  align-items: center;
  padding: .25rem .5rem;
  font-weight: normal;
  color: rgba(0, 0, 0, .65);
  background-color: transparent;
  border: 0;
  color: #fff;
}
.side-menu .btn-toggle:hover,
.side-menu .btn-toggle:focus {
  color: rgba(0, 0, 0, .85);
  background-color: #324252;
}

.side-menu .btn-toggle.active {
  font-weight: bold;
}

.side-menu .btn-toggle::before {
  width: 1.25em;
  line-height: 0;
}

.side-menu a.btn-toggle::before {
  content: "\25CF";
}

.side-menu .btn-toggle[data-bs-toggle="collapse"]::before {
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform .35s ease;
  transform-origin: .5em 50%;
}

/* .btn-toggle[aria-expanded="true"] {
  color: rgba(0, 0, 0, .85);
} */
.side-menu .btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}

.side-menu .btn-toggle-nav a {
  display: inline-flex;
  padding: .1875rem .5rem;
  margin-top: .125rem;
  margin-left: 1.25rem;
  text-decoration: none;
}
.side-menu .btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: #324252;
}



.fw-semibold { font-weight: 600; }
.lh-tight { line-height: 1.25; }


</style>