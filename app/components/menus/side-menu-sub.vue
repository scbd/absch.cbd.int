<template>
  <li class="mb-1 menu-border">
    
    <a  class="btn btn-toggle align-items-center rounded w-100"
    :class="{ active : selected, collapse: hasSubMenu, show: isExpanded }"
    :href="menu.url" 
    :target="menu.target"
    @click="toggle($event)" 
    >
    {{ lstring(menu.title, $locale) }}

    <span v-if="!!menu.target" >
      &nbsp;<i class="fa fa-external-link" aria-hidden="true"></i>
    </span>
  </a>
    <div v-if="menus.length" ref="subMenuRef" class="collapse sub-menu">
      <ul class="list-unstyled" :class="[`level-${level}`]">
        <side-menu-sub v-for="(subMenu, index) in menus" :key="index" :level="level+1" :menu="subMenu" />
      </ul>
    </div>
  </li>
</template>

<script setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import { lstring } from '../kb/filters';
  import { useRoute } from "@scbd/angular-vue/src/index.js";
  import { Collapse } from 'bootstrap'; // Todo

  const route = useRoute().value;
  const props = defineProps({
    menu: { type: Object, required: true },
    level : { type: Number, default: 0 },
  });

  const menus = computed(() => props.menu?.menus || []);
  const hasSubMenu = computed(() => !!menus.length);
  const selectedBranch = computed(() => route.path.indexOf(`/${props.menu.url}`) === 0);
  const selected = computed(() => route.path === `/${props.menu.url}`); 

  const isExpanded = ref(false);
  const subMenuRef = ref(null);

  const toggle = async ($event)   => {  
    if (!hasSubMenu) return;

    const { hasContent, target  } = props.menu;
    isExpanded.value = !isExpanded.value;

    if (hasContent && !selected)
      isExpanded.value = true;

    if (!hasContent && target!='_blank')  
      $event.preventDefault();
  }

  watch(isExpanded, async(on) => { 
    if (!subMenuRef.value) return; 
    const bsSubMenu = Collapse.getOrCreateInstance(subMenuRef.value);
    if (on) bsSubMenu.show();
    else bsSubMenu.hide();
  });

  onMounted (() => {
    if (selectedBranch) {
      isExpanded.value = false;
    }
  });
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
  font-size: 14pt;
  color: rgba(0, 0, 0, .65);
  border: 0;
}

.side-menu ul.level-1 .btn-toggle {
  font-size: 12pt;
}

.side-menu .btn-toggle:hover,
.side-menu .btn-toggle:focus {
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