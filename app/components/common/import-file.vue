<template>
    <button class="btn btn-primary btn-sm" type="button" @click="toggleModal">{{t("importIrcc")}}</button>

    <ImportModal 
            :showModal="showModal" 
            modalTitle="Import File" 
            :parsedFile="parsedFile"
            :handleConfirm="handleConfirm"
            :toggleModal="toggleModal" >
        <div class="row">
            <div class="col text-start" v-if="userGovernment">
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
                <span class="text-danger me-2">Mutiple sheets have been found! Please select the sheet you want to import.</span>
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
        <div class="row mt-3">
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
    </ImportModal>
</template>

<script setup>
import { ref, onMounted, shallowRef, computed } from 'vue';
import ImportModal from "./import-modal.vue"
import { useRealm } from '../../services/composables/realm.js';
import { useUser, useAuth } from '@scbd/angular-vue/src/index.js';
import { ImportDataBase } from "../../services/import-data/import-data-base"
import { ImportDataIRCC } from "../../services/import-data/import-data-ircc"
import "~/components/scbd-angularjs-controls/form-control-directives/km-form-languages.js"
import messages from "../../app-text/views/forms/edit/abs/edit-absPermit.json"
import kmTerm from '~/components/km/KmTerm.vue';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n({ messages });
const realm = useRealm();
const user = useUser()
const auth = useAuth()

const showModal = ref(false);
const isLoading = ref(false);
const parsedFile = ref([]);
const selectedLanguage = ref(null);
const error = ref("");
const successMessage = ref("");
const multipleImportSheets = ref([]);
const selectedSheetIndex = ref(0);
let file = ref(null);
const xlsxWorkbook = ref(null);

const userGovernment = computed(()=>{
    return {
        identifier: user?.government
    }
})

let importDataIRCC;

function toggleModal() {
    parsedFile.value = [];
    error.value = null;
    successMessage.value = null;
    selectedLanguage.value = null;
    multipleImportSheets.value = [];
    selectedSheetIndex.value = null;
    showModal.value = !showModal.value;
    if(!showModal.value){
        emit("refreshRecord")
    }
}

const progressPercentage = computed(() => {
  const total = parsedFile.value?.length + importDataIRCC?.contacts?.length;
  return total > 0 ? (progressTracking.value / total) * 100 : 0;
});

const handleFileChange = async (event) => {
    isLoading.value = true;
    error.value = null;
    successMessage.value = null;
    selectedSheetIndex.value = null;
    multipleImportSheets.value = [];
    resetFileErrorInParsedFile();
    try{
        const {sheetNames, workbook} = await importDataBase.readSheet(file.value);
        xlsxWorkbook.value = workbook;
        importDataIRCC = new ImportDataIRCC(realm.value, locale.value, user.value.government, workbook, auth);
        if(sheetNames.length > 1){
            multipleImportSheets.value = sheetNames;
            handleSelectedSheetChange();
        }else{
            parsedFile.value = await importDataIRCC.fileParser(multipleImportSheets.value, selectedSheetIndex.value);
        }
    }catch(err){
        parsedFile.value = [];
        error.value = "ERROR: An error occurred while reading the file."
    }

<<<<<<< HEAD
    parsedFile.value = parsedFile.value.map((file, index) => {
      return {
        ...file,
        identifier: result[index].header.identifier,
      };
    });
    await importDataBase.validateAndCreateNationalRecord(
      importDataIRCC.contacts,
      result,
      progressTracking,
      errorCreateRecords,
      completedRecords
    );
    updateParsedFileWithError(errorCreateRecords);
    if (
      errorCreateRecords.value === undefined ||
      errorCreateRecords.value.length === 0
    ) {
      successMessage.value = "Successfully created national record.";
    } else {
      errorCreateRecords.value.forEach((error) => {
        const matchingContact = importDataIRCC.contacts.find(
          (contact) => contact.header.identifier === error.identifier
        );
        if (matchingContact) {
          error.emails = matchingContact.emails;
=======
const handleSelectedSheetChange = async () => {
    try {
        if(selectedSheetIndex.value != null){
            isLoading.value = true;
            error.value = null;
            successMessage.value = null;
            parsedFile.value = await importDataIRCC.fileParser(multipleImportSheets.value, selectedSheetIndex.value);
        }
    } catch (err) {
        console.log(err)
        parsedFile.value = [];
        error.value = "ERROR: An error occurred while reading the file."
    }
  } catch (err) {
    error.value = `Error: ${err.message ||
      "An error occurred while creating national record."}`;
  }
  isLoading.value = false;
  progressTracking.value = null;
};

const handleConfirm = async () => {
    try {
        isLoading.value = true;
        error.value = null
        const errorCount = await importDataBase.writeFile(importDataIRCC.contacts, parsedFile.value);
        if(errorCount === undefined || errorCount === 0){
            successMessage.value = "Successfully created national record.";
        }else{
            throw new Error("Error occurred while creating national record");
        }

    } catch (err) {
        console.log(err);
        error.value = `Error: ${err.message || 'An error occurred while creating national record.'}`
    }
    isLoading.value = false;
    progressTracking.value = null;
}

const updateParsedFileWithError = (errorResponse) => {
    errorResponse.forEach(error => {
    const matchingContact = importDataIRCC.contacts.find(contact => contact.header.identifier === error.identifier);
        if (matchingContact) {
            error.emails = matchingContact.emails;
        }
    });
    parsedFile.value.forEach(item => {
        item.fileError = false;
        const matchingError = errorResponse.find(error => error.identifier === item.identifier);
        if(matchingError){
            item.fileError = true;
        }else{
            errorResponse.forEach((error) => {
            if(error.contact){
                if(item.pic.email === error.emails[0] || item.provider.email === error.emails[0]){
                    item.fileError = true;
                }
            }
        })
    }
}); 
    console.log("Updated PARSEDFILE", parsedFile.value);
}

const handleConfirm = async () => {
    try {
        isLoading.value = true;
        error.value = null
        const errorCount = await importDataBase.writeFile(importDataIRCC.contacts, parsedFile.value);
        console.log(errorCount);
    } catch (err) {
        console.log(err);
        error.value = "Error: An error occurred while creating national record."
    }
    isLoading.value = false;
}

const onFileInputClick = (event) => {
    event.target.value = "";
}

const handleClearClick = () => {
    parsedFile.value = [];
    error.value = null;
    successMessage.value = null;
    multipleImportSheets.value = [];
    selectedSheetIndex.value = null;
}

</script>

<style scoped></style>
