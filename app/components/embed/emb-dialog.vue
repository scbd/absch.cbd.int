<template>
<span id="app">
  <div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" @click="showModal=false">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="modal-title"><i class="text-info fa fa-code"></i> <strong class="text-primary"> Embed Utility</strong></h5>
              </div>
              <div class="modal-body">
                  <embGeneral :target="target" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <!-- <button id="show-modal" @click="showModal = true">Show Modal</button> -->
  <a rel="noopener" :target="target" @click="showModal = true"><i class="fa fa-code" aria-hidden="true"></i> Embed</a>
 </span>
 </template>
<style>
  .bch-header > .navbar-default.navbar-static-top{
    z-index: 20;
  }
.modal-mask {
  position: fixed;
  z-index: 10998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
<script>
//-------------------------------------
import embGeneral from './emb-general.vue';
//-------------------------------------

export default {
    name:'eDialog',
    components: {
        embGeneral    
    },
    props: {
        target: String
    },
    data:  () => {
        return { 
             showModal: false           
        }
    },
	methods: {
 	},
    mounted()  {
      //  alert("Dialog mounted. url = "+this.url+", target = "+this.target);
    },
}
</script>




