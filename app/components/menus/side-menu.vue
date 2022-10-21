<template>
  <div class="flex-shrink-0 p-3">

    <slot name="header" :menu="menu">
        <a :href="menu.url" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
            <h4>{{menu.title|lstring($locale)}}</h4>
        </a>
    </slot>
   
    <ul class="list-unstyled ps-0">
      <li class="mb-1" v-for="({url, title, menus}, index) in menu.menus" :key="index">
        
        <a v-if="!(menus && menus.length)" :href="url" class="btn btn-toggle align-items-center rounded">{{title|lstring($locale)}}</a>

        <button v-if="menus && menus.length" class="btn btn-toggle align-items-center rounded" data-bs-toggle="collapse" :data-bs-target="`#collapse-menu${index}`" aria-expanded="true">
            {{title|lstring($locale)}}
        </button>
        <div v-if="menus && menus.length" class="collapse show" :id="`collapse-menu${index}`">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li v-for="({url, title}, index) in menus" :key="index">
                <a :href="url" class="link-dark rounded">{{title|lstring($locale)}}</a>
            </li>
          </ul>
        </div>
      </li>

      <li v-if="$slots.footer" class="border-top my-3"></li>

      <slot name="footer" :menu="menu"></slot>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'SideMenu',
    props: {
        menu : Object
    },
}
</script>

<style scoped>

.dropdown-toggle { outline: 0; }

.nav-flush .nav-link {
  border-radius: 0;
}

.btn-toggle {
  display: inline-flex;
  align-items: center;
  padding: .25rem .5rem;
  font-weight: 600;
  color: rgba(0, 0, 0, .65);
  background-color: transparent;
  border: 0;
}
.btn-toggle:hover,
.btn-toggle:focus {
  color: rgba(0, 0, 0, .85);
  background-color: #d2f4ea;
}

.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
}
a.btn-toggle::before {
  content: "\25CF";
}

button.btn-toggle::before {
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform .35s ease;
  transform-origin: .5em 50%;
}

/* .btn-toggle[aria-expanded="true"] {
  color: rgba(0, 0, 0, .85);
} */
.btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}

.btn-toggle-nav a {
  display: inline-flex;
  padding: .1875rem .5rem;
  margin-top: .125rem;
  margin-left: 1.25rem;
  text-decoration: none;
}
.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: #d2f4ea;
}



.fw-semibold { font-weight: 600; }
.lh-tight { line-height: 1.25; }
</style>