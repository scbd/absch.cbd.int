<template>
  <div class="container">
    <h2>Componenet two</h2>
    <div>
      <div>Record Type:</div>
      <select class="embed" v-model="recordType" v-on:change="changeItem(recordType)" id="recordTypField">
        <option value="Select">Select</option>
        <option value="option1">option1</option>
        <option value="Second National Report In The Implemented of CPB">Second National Report In The Implemented of CPB</option>
      </select>
    </div>
    <div>
      <div>Country:</div>
      <select class="embed" v-model="country" v-on:change="changeItem(country)">
        <option>Any</option>
        <option>USA</option>
        <option>France</option>
      </select>
    </div>
    <div>
      <div>Language:</div>
      <select class="embed" v-model="language" v-on:change="changeItem(language)">
        <option>English</option>
        <option>Arabic</option>
        <option>French</option>
      </select>
    </div>
    <button v-on:click="go('go')">Go</button>
  </div>
</template>

<script>
export default {

	data: () => {
		return {
			recordType: 'Select',
			country: "Any",
			language: "English"
		}
	},
	methods: {
		changeItem: (type)=> {

		},
		go: (cod)=> {

		},

		// clickEvent: ()=> {
		//
		// }
	}
}
</script> 
