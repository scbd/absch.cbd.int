<template>
    <VueMultiselect
      v-model="selectItems"
      :label="label"
      :track-by="trackBy"
      :placeholder="placeholder"
      :open-direction="openDirection"
      :options="options"
      :group-values="groupValues"
      :group-label="groupLabel"
      :group-select="groupSelect"
      :multiple="multiple"
      :clear-on-select="clearOnSelect"
      :close-on-select="closeOnSelect"      
      :searchable="searchable"
      :disabled="disabled"
      @search-change="onEventTextChange"
      
      :custom-label="customLabelFn"
      :allow-empty="allowEmpty"
      deselect-label="Can't remove this value"
    > 
      <slot name="clear">
        <template slot="clear">
            <div v-if="selectItems.length && !disabled" class="multiselect__clear"
                @mousedown.prevent.stop="selectItems = null; $emit('change', null)">
            </div>          
        </template>
      </slot>     
    </VueMultiselect>
</template>

<script setup lang="ts">
//@ts-nocheck  

import VueMultiselect from 'vue-multiselect';
import { isEqual } from 'lodash'
import { asArray } from '@/utils/helpers';


    const emit = defineEmits(['update:modelValue'])
    const props = defineProps({
        modelValue: {
        type    : [ String, Array, Object ],
        required: true,
        default() {
            return [];
        },
        },
        options      : { type: Array, required: true },
        multiple     : { type: Boolean, default: false },
        trackBy      : { type: String, default: 'identifier'  },
        label        : { type: String, default: 'title' },
        valueKey     : { type: String, default: 'identifier' },
        searchable   : { type: Boolean, default: true },
        clearOnSelect: { type: Boolean, default: true },
        placeholder  : { type: String,  default: 'Select option' },
        closeOnSelect: { type: Boolean, default: true },
        customLabel  : { type: Function },//avoid default so that
        customSelectedItem  : {
        type: Function,
        default (item) {
            return item;
        }
        },
        groupValues  : { type: String },
        groupLabel   : {  type: String },
        groupSelect  : {  type: Boolean, default: false },
        openDirection: { type: String, default: 'below' },
        isValid      : {
        type   : [ Boolean, Function ],
        default: null,
        },
        disabled    : { type: Boolean, default: false },
        allowEmpty  : { type: Boolean, default: true },
    });

    const selectItems = computed({
      get() {
        return asArray(props.modelValue).map((value) => {
          return props.options?.find((option) => {
            const customSelectedItem = props.customSelectedItem(option[props.valueKey], option);
            
            return isEqual(customSelectedItem, value);
          })
        });
      },
      set(events) {
        let ids = asArray(events).map((event) => props.customSelectedItem(event[props.valueKey], event));
        
        emit('update:model-value', props.multiple ? ids : ids[0]);
      }
    })

    const {locale} = useI18n();

    function onEventTextChange(...args){
      emit('search-change', ...args)
    }
    
    function customLabelFn(option, label) {
        if(props.customLabel)
            return props.customLabel(option, label);

        return lstring(option[label]||option, locale)
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>