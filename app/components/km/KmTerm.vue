<template>
    <span>
        <div class="alert alert-danger" v-if="error">Error loading term {{ value.identifier }}</div>
        <span v-if="term">
            {{ lstring(term.title, locale) }}
        </span>
        
        <slot name="help" :term="term">

        </slot>
    </span>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import thesaurus from '~/api/thesaurus.js'
    import { lstring } from '~/services/filters/lstring.js';
    import { useAuth } from '@scbd/angular-vue/src/index.js';
    const auth = useAuth();

    const thesaurusApi = new thesaurus({tokenReader:()=>auth.token()});
    const term = ref();
    const error= ref()

    const emit = defineEmits(['onTermLoad'])
    const props = defineProps({
        value   : {type:Object, required:true },
        locale  : {type:String, required:true },
    })

    async function loadTerm(identifier){
        if(identifier && !term.value){
            try{
                term.value = await thesaurusApi.getTerm(identifier);
                if(term.value){
                    emit('onTermLoad', term.value);
                }
            }
            catch(error){
                error.value = error;
                // useLogger().error(`Error loading term ${value.value}`, error);
            }
        }
    }

    onMounted(()=>{
        loadTerm(props.value?.identifier)
    })

</script>