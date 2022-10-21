<template>
    <div>

      <Article v-if="article" :article="article"></Article>

      <div class="p-4 m-4" style="border:solid green 1px;">
       Vue
       {{date}}
       <button @click="date='2022-01-01'">2022-01-01</button>
       <button @click="date='2022-02-02'">2022-02-02</button>
       <button @click="date='2022-03-03'">2022-03-03</button>
       <input v-model="date">
       <button @click="show=!show">{{show}}</button>

      <div v-if="show" class="p-4 m-4" style="border:solid red 1px;">
        ANGULAR
        <ng :date.sync="date">
          <div v-pre>
            <km-date ng-model="date"></km-date>
            <input   ng-model="date">
          </div>
        </ng>
      </div>
      
    </div>

    </div>
  </template>
  
  <script>

import '~/components/scbd-angularjs-controls/form-control-directives/km-date.js';
import VueAngular from './vue-angular.js'

  export default {
    name:'Forum',
    components: { ng: VueAngular },
    data(){
      return { 
        date : '2022-10-20',
        myPlaceholder:'hello',
        show: true
       }
    },
    props: {
      forumId: Number
    }
  }
  </script>
  

