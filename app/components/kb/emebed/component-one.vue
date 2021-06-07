<template>
  <div class="container">
    <h2>Componenet one</h2>
  <div>
    <div class="panel panel-default" style="height: 100px">
      <button style="float: right" v-on:click="recordTypePass()">Embed</button>
      <div class="col-md-6">
        <div class="scbd-ch-embed" data-type="record" data-record-id="static id" width="100%"></div>
      </div>
    </div>
    <div>Custom css</div>
    <input class="embed" v-model="Domain" placeholder="Domain" />
  </div>
    <div>
    <div>Custom css</div>
      <input class="embed" v-model="css"  />
    </div>
    <div>
      <div>Record Type:</div>
      <select class="embed" v-model="recordType" v-on:change="changeItem(recordType)">
        <option>Select</option>
        <option>National record1</option>
        <option>National record1</option>
      </select>
    </div>
    <textarea rows="10" cols="50"   id="gncode"></textarea>
    <button v-on:click="generateCode('code')">Generate Code</button>
  </div>


</template>

<style>
  .embed {
    width: 100%;
    height: 30px;
    margin: 10px;
    margin-left: 0px;
  }
  #gncode{
    width: 100%;
    margin: 10px;
    margin-left: 0px;
  }
</style>
<script>

	export default {
		data:  () => {
			return {
				recordType: 'Select',
				thecardtitle: 'Child Component!'
      }
		},
		methods: {
			changeItem: (type) => {
				//alert(type)
      },
			generateCode: (cod)=> {
				$("#gncode").val("<div class=\"col-md-6\"><div class=\"scbd-ch-embed\" data-type=\"record\" data-record-id=\"Second National Report In The Implemented of CPB\" width=\"100%\"></div></div>");
			},
			recordTypePass: () => { //passing data between sibling, will be handled using state management, services or events.
      	$("#recordTypField").val("Second National Report In The Implemented of CPB");
			}
		}
	}
</script> 
