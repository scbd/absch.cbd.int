<template>
  <li class="mb-1 menu-border">
    <a  class="btn btn-toggle align-items-center rounded w-100"
    :class="{ active: isSelected, collapse: hasSubMenu }"
    :href="menu.url" 
    :target="menu.target"
    @click="toggleMenu($event)"
    >
    {{ lstring(menu.title, $locale) }}

    <span v-if="!!menu.target">
      &nbsp;<i class="fa fa-external-link" aria-hidden="true"></i>
    </span>
  </a>
    <div v-show="hasSubMenu" ref="subMenuRef" class="collapse sub-menu">
      <ul class="list-unstyled" :class="[`level-${level}`]">
        <side-menu-sub v-for="(subMenu, index) in menus" :key="index" :level="level+1" :menu="subMenu" />
      </ul>
    </div>
  </li>
</template>

<script setup>
  import { computed, ref, onMounted, watch, watchEffect } from 'vue';
  import { lstring } from '../kb/filters';
  import { useRoute } from "@scbd/angular-vue/src/index.js";
  import { Collapse } from 'bootstrap'; 

  const route = useRoute();

  const props = defineProps({
    menu: { type: Object, required: true },
    level : { type: Number, default: 0 },
  });

  const menus = computed(() => props.menu?.menus || []); // ToDo: we can use menu?.menus directly in template
  const hasSubMenu = computed(() => !!props.menu.menus?.length);
  const isSelected = computed(() => route.value.path === `/${props.menu.url}`);

  const isExpanded = ref(props.menu.isExpanded || false);
  const subMenuRef = ref(null);

  let bsCollapse = null; // Collapse instance for Bootstrap

  const toggleMenu = ($event) => {

    if (!hasSubMenu.value) return;
    isExpanded.value = !isExpanded.value;
    // handle double click 
    if (bsCollapse) {
      if (!isExpanded.value) {
        bsCollapse.show();
      } else {
        bsCollapse.hide();
      }
    }

    if (!props.menu.hasContent && props.menu.target !== '_blank') {
      $event.preventDefault();
    }
  };
    //automatically tracks dependencies—No need to explicitly specify route.value.path
    watchEffect(() => {
      isExpanded.value = props.menu.isExpanded || route.value.path.startsWith(`/${props.menu.url}`);
    });

    // Watch for changes in isExpanded to trigger collapse behavior
    watch(isExpanded, (newVal) => {
      if (!subMenuRef.value) return; // we can remove
      if (bsCollapse) {
        if (newVal) {
          bsCollapse.show();
        } else {
          bsCollapse.hide();
        }
      }
    });

  onMounted(() => {
      if (subMenuRef.value) {
        bsCollapse = new Collapse(subMenuRef.value, { toggle: false }); 

        if (isExpanded.value) {
          bsCollapse.show();
        }
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