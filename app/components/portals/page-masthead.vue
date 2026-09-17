<template>
  <div id="innerPage">
    <div class="mastHead text-center pt-4 mb-4" :class="{'bg-abs': realm.is('ABS'), 'bg-bch': realm.is('BCH'), 'bg-chm': realm.is('CHM')}">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col col-md-8">
            <h1 class="text-white">
              <slot />
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRealm } from '~/services/composables/realm.js'

const realm = useRealm()
</script>
