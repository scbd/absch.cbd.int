<template>
  <li class="mb-1 menu-border">
    
    <a  class="btn btn-toggle align-items-center rounded w-100"
    :class="{ active : selected, collapse: hasSubMenu, show: isExpanded }"
    :href="menu.url" 
    :target="menu.target"
    @click="toggle($event)" 
    >
    {{menu.title|lstring($locale)}} &nbsp;
    <i v-if="!!menu.target" class="fa fa-external-link" aria-hidden="true"></i>
  </a>
    <div v-if="menus.length" ref="subMenu" class="collapse sub-menu">
      <ul class="list-unstyled" :class="[`level-${level}`]">
        <side-menu-sub v-for="(subMenu, index) in menus" :key="index" :level="level+1" :menu="subMenu" />
      </ul>
    </div>
  </li>
</template>

<script>
import bootstrap from 'bootstrap';

export default {
    name: 'SideMenuSub',
    props: {
        menu : { type: Object, required: true } ,
        level : { type: Number, default: 0 },
    },
    data() {
      return { 
        isExpanded: false
      }
    },
    computed: {
      hasSubMenu()     { return !!this.menus.length; },
      selectedBranch() { return this.$route.path.indexOf(`/${this.menu.url}`)===0 },
      selected()       { return this.$route.path      == `/${this.menu.url}`; },
      menus()          { return this.menu?.menus || []; },
    },
    watch: {
      isExpanded(on) {
        const subMenu  = this.$refs.subMenu;

        if(!subMenu) return null;

        const bsSubMenu = bootstrap.Collapse.getOrCreateInstance(subMenu);

        if(on) bsSubMenu.show();
        else   bsSubMenu.hide();
      }
    },
    methods: {
      toggle($event) {

        const { hasSubMenu } = this;

        if(!hasSubMenu) return;

        const { menu, selected } = this;
        const { hasContent } = menu;
        let   { isExpanded } = this;

        isExpanded = !isExpanded;

        if(hasContent && !selected)
          isExpanded = true;

        this.isExpanded = isExpanded;

        if(!hasContent)
          $event.preventDefault();
      },
    },
    mounted() {
      if(this.selectedBranch) {
        this.isExpanded = true;
      }
    }
}
</script>

<style scoped>

.side-menu .sub-menu {
  margin-left: 1rem;
}
.side-menu .menu-border{
  /* border-bottom: 1px solid #dcd7d7; */
  border-top: 1px solid #999;
}

.side-menu .btn-toggle {
  display: inline-flex;
  text-align: left;
  padding: .25rem .5rem;
  font-weight: normal;
  font-size: 14pt;
  color: rgba(0, 0, 0, .65);
  background-color: transparent;
  border: 0;
  color: #fff;
}

.side-menu ul.level-1 .btn-toggle {
  font-size: 12pt;
}

.side-menu .btn-toggle:hover,
.side-menu .btn-toggle:focus {
  color: rgba(200, 200, 200, .85) !important;
  background-color: #324252;
}

.side-menu .btn-toggle.active {
  font-weight: bold;
}

.side-menu .btn-toggle::before {
  line-height: 0;
  margin-right: 0.5rem;
}
.side-menu .btn-toggle.collapse::before {
  margin-right: 0.4rem;
  margin-left: -0.2rem;
}

.side-menu .btn-toggle::before {
  line-height: 0;
  margin-right: 0.5rem;
}

.side-menu a.btn-toggle::before {
  content: "\25CF";
}

.side-menu .btn-toggle.collapse::before {
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%28255,255,255,1.0%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform .35s ease;
  transform-origin: .5em 50%;
}

/* .btn-toggle[aria-expanded="true"] {
  color: rgba(0, 0, 0, .85);
} */
.side-menu .btn-toggle.collapse.show::before {
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