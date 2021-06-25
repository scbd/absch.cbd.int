<template>
<form class="form-horizontal" @submit.prevent="getData">
  <div class="form-group">
    <label for="domain_fld" class="col-sm-3 control-label">Domain</label>
    <div class="col-sm-9">
      <input type="text" class="form-control" id="domain_fld" name="domain_fld" placeholder="domain">
    </div>
  </div>
  <div class="form-group">
    <label for="custom_css" class="col-sm-3 control-label">Custom Css</label>
    <div class="col-sm-9">
      <input type="text" class="form-control" id="custom_css" name="custom_css" placeholder="Custom Css here if any">
    </div>
  </div>
   <div class="form-group">
    <label for="type_sel" class="col-sm-3 control-label">Type</label>
    <div class="col-sm-9">
      <select id="type_sel" name="type_sel" class="form-control">
           <option value="">Please select</option> 
      </select>
    </div>
  </div> 
  <div class="form-group">
    <div class="col-sm-offset-3 col-sm-9">
      <button type="submit" class="btn btn-default">Generate code</button>
    </div>
  </div>

  <div class="form-group">
    <div class="col-sm-12">
      <textarea id="code_result" name="code_result" v-html="txt" class="form-control" rows="5"></textarea>
      <div ref="script" :data-script="`<div data-pym-src='${url}' id='${target}' class='scbd-ch-embed' data-pym-allowfullscreen >Loading...</div><script type='text/javascript' src='${lib}'></script>`"></div>
    </div>
  </div>
</form>
</template>

<script>
export default {
    name:'embGeneral',

    data:  () => {
        return { 
            // target_element : "",
            url : window.location.href,
            lib : 'https://pym.nprapps.org/pym.v1.min.js',
            txt : "",
        }
    },
  props: {
    target: String
  },
	methods: {

      getData(e) {
          let fele = e.target.elements;
          this.txt = this.$refs.script.getAttribute('data-script');
      }
 	},
    mounted() {

    },
}
</script>