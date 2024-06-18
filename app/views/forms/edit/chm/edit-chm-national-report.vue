<template>

    <section>
        <br>
        <div class="row">
            <div class="col-xs-12">
                <label>Please select in which language(s) you wish to submit this record:</label>
                    <!-- <div class="required" name="header.languages" required caption="Please select in which language(s) you wish to submit this record:"></div> -->
                    <div class="indent">
                            <!-- <ng v-vue-ng:km-form-languages  v-model:ng-model="document.header.languages" :locales="locale" html></ng>                 -->
                  
                    </div>
            </div>
        </div>

        <legend>General Information</legend>

        <div class="row">
            <div class="col-xs-12">
                <label>Country</label>               
                <div class="indent">
                    <!-- <ng v-vue-ng:afc-autocomplete  v-model:ng-model="document.government" ></ng> -->
                </div>                
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <label>Title of the document</label><br/>
                <label>Please use the official title, if available.</label>
                <div class="indent">
                     <!-- <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.title" rows="1" placeholder="" :locales="document.header.languages" html></ng>                 -->
               </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <label>Type of the document</label>                   
                   <!-- <ng v-vue-ng:afc-autocomplete name="type" v-model:ng-model="document.type" source="options.types" filter="genericFilter"
                       selectbox="true" ></ng> -->
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <label>Summary</label>
                <div class="indent">
                    <!-- <ng v-vue-ng:km-textbox-ml rows="3" v-model:ng-model="document.description" :locales="document.header.languages"></ng> -->
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-16">
                <label>Level of application</label>
                <div class="indent" style="max-width:300px;">
                    <!-- <ng v-vue-ng:afc-autocomplete name="jurisdiction" v-model:ng-model="document.jurisdiction" source="options.jurisdictions" filter="genericFilter"
                        mapping="genericMapping" selectbox="true" ></ng> -->
                </div>                
            </div>
     
            <div class="col-xs-6">
                <label>Additional information</label>
                <!-- <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.additionalInformation" rows="1" placeholder="" :locales="document.header.languages" html></ng>                 -->
            </div>
        </div>
    </section>

    <section>
        <legend>Implementation Period</legend>

        <div class="row">
            <div class="col-md-5">
                <label>From</label>
                  <!-- <ng v-vue-ng:km-date required name="startDate" v-model:ng-model="document.startDate"></ng> -->
              
            </div>
            <div class="col-md-5">
                <label>To</label>
                <!-- <ng v-vue-ng:km-date  required name="endDate" v-model:ng-model="document.startDate"></ng> -->
              
            </div>
        </div>
    </section>

    <section>
        <legend>Status</legend>       
        <div class="row">          
            <div class="col-xs-12">
                <label>Status of the document</label>
                <!-- selectbox -->
            </div>
        </div>
    </section>

    <section>
        <legend>Main relevant document(s)</legend>

         <!-- use edit-relevant-information.vue -->
    </section>

    
    <section>
        <legend>Other relevant information</legend>

         <!-- use edit-relevant-information.vue -->
    </section>

    <section>
        <legend>Notes</legend>
        <div class="row">
            <div class="col-xs-12">
                <label>Notes</label>
                    <div class="help-info">The field “Notes” is for personal reference and can be seen only when the record is being edited.  
                    </div>              
                    <!-- <ng v-vue-ng:km-notes name="notes" v-model:ng-model="document.notes"></ng> -->
                                    
            </div>
        </div>
    </section>


</template>
<script setup>
    import "~/components/scbd-angularjs-controls/form-control-directives/km-form-languages.js"


    // import messages from '~/app-text/views/reports/chm/undb-actor.json';
 
    const props = defineProps({
        document: { type:Object, required:true },
        options : { type:Object, required:true },
        locale  : { type:String, required:true }
    })
   
    
</script>