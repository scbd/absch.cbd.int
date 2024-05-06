<template>
    <button class="btn btn-primary btn-sm" type="button" @click="toggleModal">Import IRCC</button>

    <span class="modal-container" v-if="showModal">
        <div class="modal-window">
            <div class="container">
                <div class="row">
                    <div class="col text-start" v-if="userGovernment">
                        <!-- <km-term :value="userGovernment" :locale="locale"></km-term> -->
                        <button class="btn btn-secondary text-uppercase" disabled>{{user.government || 'Government'}}</button>
                    </div>
                    <div class="col">
                        <ng v-vue-ng:km-form-languages v-model:ng-model="selectedLanguage"></ng>
                    </div>
                    <div class="col text-end">
                        <button class="btn btn-secondary" disabled>{{realm.value}}</button>
                    </div>
                </div>
                <div class="row" v-if="selectedLanguage">
                    <div class="col-md-3 text-start my-3">
                         <button class="btn btn-primary position-relative" type='button'>
                            Browse
                            <input type="file" name="file" accept=".xlsx, .xls, .csv" @change="handleFileChange"
                            @click="onFileInputClick"
                            class="position-absolute fs-1 opacity-0 top-0 start-0 w-100 h-100">
                        </button>
                    </div>
                   
                    <div class="col-md-9 text-center d-flex align-items-center" v-if="multipleImportSheets.length">
                        <span class="text-danger">Mutiple sheets have been found! Please select the sheet you want to import.</span>
                        <select class="form-select" v-model="selectedSheetIndex" @change="handleSelectedSheetChange">
                            <option v-for="(sheet, index) in multipleImportSheets" :key="index" :value="index">{{sheet}}</option>
                        </select>
                    </div>
                </div>
                <div class="row table-container" v-if="parsedFile.length">
                    <div class="col">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Language</th>
                                    <th scope="col">absCNA</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Proviers Confidential</th>
                                    <th scope="col">Providers</th>
                                    <th scope="col">Pic Granted</th>
                                    <th scope="col">Mat Established</th>
                                    <th scope="col">Usages</th>
                                    <th scope="col">Usages Confidential</th>
                                    <th scope="col">Usages Description</th>
                                    <th scope="col">Entities to whom PIC granted confidential</th>
                                    <th scope="col">Entities to whom PIC granted</th>
                                    <th scope="col">Subject Matter</th>
                                    <th scope="col">Third Party Transfer Condition</th>
                                    <th scope="col">Keywords</th>
                                    <th scope="col">Keyword Other</th>
                                    <th scope="col">Date of Issuance</th>
                                    <th scope="col">Date of Expiry</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data,index) in parsedFile" :key="index">
                                    <th scope="row">{{index + 1}}</th>
                                    <td>{{data.header.languages[0]}}</td>
                                    <td>{{data.absCNA.identifier}}</td>
                                    <td>{{data.title[selectedLanguage]}}</td>
                                    <td>{{data.providersConfidential}}</td>
                                    <td>{{data.providers[0]?.identifier}}</td>
                                    <td>{{data.picGranted}}</td>
                                    <td>{{data.matEstablished}}</td>
                                    <td>{{data.usages[0]?.identifier}}</td>
                                    <td>{{data.usagesConfidential}}</td>
                                    <td>{{data.usagesDescription[selectedLanguage]}}</td>
                                    <td>{{data.entitiesToWhomPICGrantedConfidential}}</td>
                                    <td>{{data.entitiesToWhomPICGranted[0]?.identifier}}</td>
                                    <td>{{data.subjectMatter}}</td>
                                    <td>{{data.thirdPartyTransferCondition[selectedLanguage]}}</td>
                                    <td>{{data.keywords && data.keywords[0]?.identifier}}</td>
                                    <td>{{data.keywordOther && data.keywordOther[selectedLanguage]}}</td>
                                    <td>{{data?.dateOfIssuance}}</td>
                                    <td>{{data?.dateOfExpiry}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-12 text-center">
                        <span class="alert alert-danger" v-if="error">{{error}}</span>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-4">
                    </div>
                    <div class="col-4 text-center">
                        <div class="spinner-border" role="status" v-show="isLoading">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div class="col-4">                        
                    </div>
                </div>
                <div class="row">
                    <div class="col text-end mt-4">
                        <button class="btn btn-primary me-3" v-show="parsedFile.length">Confirm</button>
                        <button type="button" class="btn btn-secondary" @click.stop="toggleModal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </span>
</template>

<script setup>
import { ref, onMounted, shallowRef, computed } from 'vue';
import { useRealm } from '../../services/composables/realm.js';
import { useUser, useAuth } from '@scbd/angular-vue/src/index.js';
import { fileParser, readSheet } from "../../services/file-handler"
import "~/components/scbd-angularjs-controls/form-control-directives/km-form-languages.js"
import kmTerm from '~/components/km/KmTerm.vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const realm = useRealm();
const showModal = ref(false);
const isLoading = ref(false);
const parsedFile = ref([]);
const selectedLanguage = ref("");
const error = ref("");
const multipleImportSheets = ref([]);
const selectedSheetIndex = ref(null);
let file = ref(null);
const xlsxWorkbook = ref(null);
const user = useUser()
const auth = useAuth()

const userGovernment = computed(()=>{
    return {
        identifier: user?.government
    }
})

function toggleModal() {
    parsedFile.value = [];
    error.value = null;
    selectedLanguage.value = null;
    multipleImportSheets.value = [];
    showModal.value = !showModal.value;
}

const handleFileChange = async (event) => {
    file.value = event.target.files[0];
    isLoading.value = true;
    error.value = null
    multipleImportSheets.value = [];
    try{
        const {sheetNames, workbook} = await readSheet(file.value)
        xlsxWorkbook.value = workbook;
        if(sheetNames.length > 1){
            multipleImportSheets.value = sheetNames;
        }else{
            parsedFile.value = await fileParser(realm.value, selectedLanguage, user.value.government, xlsxWorkbook.value,multipleImportSheets.value, 0, auth)
        }
        // parsedFile.value = await fileParser(realm.value, selectedLanguage, user.value.government, file.value, auth)
    }catch(err){
        parsedFile.value = [];
        error.value = "ERROR: An error occurred while reading the file."
    }
    isLoading.value = false;
}

const handleSelectedSheetChange = async () => {
    try {
        if(selectedSheetIndex.value != null){
            isLoading.value = true;
            error.value = null
            parsedFile.value = await fileParser(realm.value, selectedLanguage, user.value.government,xlsxWorkbook.value,multipleImportSheets.value, selectedSheetIndex.value, auth)
            console.log(parsedFile.value);
        }
    } catch (err) {
        parsedFile.value = [];
        error.value = "ERROR: An error occurred while reading the file."
    }
    isLoading.value = false;
}

const onFileInputClick = (event) => {
    event.target.value = "";
}

</script>

<style scoped>
</style>