<template>
    <div>
        <table class="table">
            <tr>
                <th style="width: 40%;">
                    <h2>Vue</h2>
                </th>
                <th >
                    <h2>ANGUALR</h2>
                </th>
            </tr>
            <tr>
                <td >
                    Date (text): <input class="form-control"  type="test" v-model="date">
                    Enabled: <input type="checkbox" v-model="enabled"><br>
                    Disables: {{ isDisabled() }}
                </td>
                <td >

                    Date:
                    <km-date v-vue-ng v-model:ng-model="date" @ng-disabled="isDisabled()"
                        placeholder="select a date...."></km-date>
                </td>
            </tr>
            <tr>
                <td >
                    <input class="form-control"  type="test" v-model="localesAsString">

                    <input v-for="locale in locales" :key="locale" :style="{ direction: (locale=='ar' ? 'rtl' : 'ltr')}" :placeholder="locale" class="form-control" type="test" v-model="ltext[locale]">


                    locales: {{ locales }}<br>
                    ltext:
                    <pre>{{ ltext }}</pre>

                </td>
                <td >

                    <km-value-ml v-vue-ng :value="ltext" :locales="locales"></km-value-ml>

                </td>
            </tr>
        </table>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import '../components/scbd-angularjs-controls/form-control-directives/km-date.js';
import '../components/scbd-angularjs-controls/form-control-directives/km-value-ml.js';

const date = ref("");
const enabled = ref(true);
const locales = ref(['ar', 'en', 'es']);
const ltext = ref({
    ar: 'my arabic text',
    en: 'my english text',
    es: 'my spanish text',
    ru: 'my russian text',
});

const localesAsString = computed({
    get() { return locales.value.join(',') },
    set(v) { locales.value = v.split(',') }
})

const isDisabled = () => !enabled.value;

</script>
<style scoped>
th,td { vertical-align: top }
</style>