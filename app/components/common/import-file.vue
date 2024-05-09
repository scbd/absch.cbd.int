<template>
    <button class="btn btn-primary btn-sm" type="button" @click="toggleModal">{{t("importIrcc")}}</button>

    <ImportModal ref="importModal"
            :showModal="showModal" 
            modalTitle="Import IRCC Excel" 
            :parsedFile="parsedFile"
            :handleConfirm="handleConfirm"
            :toggleModal="toggleModal"
            :isLoading="isLoading" >
        <div class="row">
            <div class="col text-start" v-if="userGovernment">
                <button class="btn btn-secondary text-uppercase" disabled>{{user.government || 'Government'}}</button>
            </div>
            {{locale}}-{{selectedLanguage}}
            <div class="col">
                <ng v-vue-ng:km-form-languages v-model:ng-model="selectedLanguage"></ng>
            </div>
            <div class="col text-end">
                <button class="btn btn-secondary" disabled>{{realm.value}}</button>
            </div>
        </div> -->
        <div class="row mb-3">
            <div class="col-md-3 text-start">
                
                <button class="btn btn-primary position-relative" type='button' :disabled="isLoading">
                    Browse
                    <input type="file" name="file" accept=".xlsx, .xls" @change="handleFileChange"
                    @click="onFileInputClick"
                    class="position-absolute fs-1 opacity-0 top-0 start-0 w-100 h-100"
                  />
                </button>
              </div>
              <div
                class="col-md-4 d-flex align-items-center justify-content-center fw-bold"
              >
                <span v-if="parsedFile.length > 0"
                  >{{ t("totalRecords") }} {{ parsedFile.length }}</span
                >
              </div>
              <div
                class="col-md-4 d-flex justify-content-end"
                v-if="multipleImportSheets.length"
              >
                <span class="min-w-50">
                  <select
                    class="form-select"
                    :disabled="isLoading"
                    v-model="selectedSheetIndex"
                    @change="handleSelectedSheetChange"
                  >
                    <option
                      v-for="(sheet, index) in multipleImportSheets"
                      :key="index"
                      :value="index"
                      >{{ sheet }}</option
                    >
                  </select>
                </span>
                <span
                  href="#"
                  class="mt-2 ms-2 fa-lg fa fa-info-circle color-litegrey"
                  data-bs-toggle="tooltip"
                  data-html="true"
                  data-container="body"
                  data-placement="top"
                  :title="t('multipleSheetAlert')"
                >
                </span>
              </div>
            </div>
            
            <div class="col-md-9 text-center d-flex align-items-center" v-if="multipleImportSheets.length">
                <span class="text-danger me-2">{{t("multipleSheetAlert")}}</span>
                <select class="form-select" v-model="selectedSheetIndex" @change="handleSelectedSheetChange">
                    <option v-for="(sheet, index) in multipleImportSheets" :key="index" :value="index">{{sheet}}</option>
                </select>
            </div>

            <div class="col-md-3 d-flex align-items-center justify-content-end fw-bold">
                <span v-if="parsedFile.length > 0">{{t('totalRecords')}} {{parsedFile.length}}</span>
            </div>
        </div>
        <div class="row table-container" v-if="parsedFile.length">
            <div class="col">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" rowspan="2">#</th>
                            <th scope="col" rowspan="2">{{t("languageToPublish")}}</th>
                            <th scope="col" rowspan="2">Country</th>
                            <th scope="col" rowspan="2">CNA</th>
                            <th scope="col" rowspan="2">Permit Equivalent</th>
                            <th scope="col" rowspan="2">Date of Issuance</th>
                            <th scope="col" rowspan="2">Date of Expiry</th>
                            <th scope="col" colspan="8" class="text-center">Provider</th>
                            <th scope="col" colspan="9" class="text-center">Pic</th>
                            <th scope="col" rowspan="2">MatConset</th>
                            <th scope="col" rowspan="2">Subject Matter</th>
                            <th scope="col" rowspan="2">Usages Description</th>
                            <th scope="col" rowspan="2">Keywords</th>
                            <th scope="col" rowspan="2">Specimens</th>
                            <th scope="col" rowspan="2">Taxonomies</th>
                            <th scope="col" rowspan="2">Usage</th>
                            <th scope="col" rowspan="2">Conditions Third Party Transfer</th>
                            <th scope="col" rowspan="2">Permit Files</th>
                            <th scope="col" rowspan="2">Additional Information</th>
                        </tr>
                         <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Existing</th>
                            <th scope="col">OrgName FirstName</th>
                            <th scope="col">Acronym FirstName</th>
                            <th scope="col">Address</th>
                            <th scope="col">City</th>
                            <th scope="col">Country</th>
                            <th scope="col">Email</th>

                            <th scope="col">Consent</th>
                            <th scope="col">Type</th>
                            <th scope="col">Existing</th>
                            <th scope="col">OrgName FirstName</th>
                            <th scope="col">Acronym FirstName</th>
                            <th scope="col">Address</th>
                            <th scope="col">City</th>
                            <th scope="col">Country</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data,index) in parsedFile" :key="index"
                        :class="{
                                'bg-lightpink': data.fileError === true,
                                'bg-lightgreen': data.fileError === false
                            }"
                        >
                            <th scope="row">{{index + 1}}</th>
                            <td>{{data.language}}</td>
                            <td>{{data.country}}</td>
                            <td>{{data.cna}}</td>
                            <td>{{data.permit_equivalent}}</td>
                            <td>{{data.date_of_issuance}}</td>
                            <td>{{data.dateOfExpiry}}</td>
                            <td>{{data.provider.type}}</td>
                            <td>{{data.provider.existing}}</td>
                            <td>{{data.provider.orgName_firstName}}</td>
                            <td>{{data.provider.acronym_lastName}}</td>
                            <td>{{data.provider.address}}</td>
                            <td>{{data.provider.city}}</td>
                            <td>{{data.provider.country}}</td>
                            <td>{{data.provider.email}}</td>
                            <td>{{data.pic.consent}}</td>
                            <td>{{data.pic.type}}</td>
                            <td>{{data.pic.existing}}</td>
                            <td>{{data.pic.orgName_firstName}}</td>
                            <td>{{data.pic.acronym_lastName}}</td>
                            <td>{{data.pic.address}}</td>
                            <td>{{data.pic.city}}</td>
                            <td>{{data.pic.country}}</td>
                            <td>{{data.pic.email}}</td>
                            <td>{{data.matConset}}</td>
                            <td>{{data.subjectMatter}}</td>
                            <td>{{data.usageDescription}}</td>
                            <td>{{data.keywords}}</td>
                            <td>{{data.specimens}}</td>
                            <td>{{data.taxonomies}}</td>
                            <td>{{data.usage}}</td>
                            <td>{{data.conditions_third_party_transfer}}</td>
                            <td>{{data.permitFiles}}</td>
                            <td>{{data?.additional_information}}</td>
                        </tr>
                    </tbody>
                </table>
            <!-- </div> -->
        </div>
        
        <div class="row mt-5 error__container" v-if="errorCreateRecords
        .length">
            <div class="col-12 alert alert-danger d-flex justify-content-between align-items-center">
>>>>>>> a109512bb (Coded generic table header and body)
                <ul class="flex-1">
                    <li v-for="(value) in errorCreateRecords" :key="value.identifier">Error creating 
                        <span v-if="value.draft">draft</span> record on row {{getRowsFromParsedFile(value)}} - {{value.error}}</li>
                </ul>
                <button class="btn btn-primary" @click="onRetryClick">
                  Retry
                </button>
              </div>
            </div>
        </div>
        
        <div class="row mt-5 error__container" v-if="errorCreateRecords
        .length">
            <div class="col-12 alert alert-danger d-flex justify-content-between align-items-center">
                <ul class="flex-1">
                    <li v-for="(value) in errorCreateRecords" :key="value.identifier">Error creating <span v-if="value.draft">draft</span> record of identifier {{value.identifier}}</li>
                </ul>
                <button class="btn btn-primary" @click="onRetryClick">Retry</button>
            </div>
        </div>
        <div class="row mt-4" v-else-if="error">
            <div class="col-12 text-center">
                <span class="alert alert-danger" >{{error}}</span>
            </div>
        </div>
        <div class="row mt-5"  v-if="successMessage">
            <div class="col-12 text-center">
                <div class="alert alert-success">{{successMessage}}</div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-4">
            </div>
            <div class="col-4 text-center">
                <div class="spinner-border" role="status" v-show="isLoading">
                    <span class="sr-only">{{t("loading")}}...</span>
                </div>
              </div>
            </div>
        </div>
    </ImportModal>
</template>

<script setup>
import { ref, onMounted, shallowRef, computed, defineEmits, reactive } from 'vue';
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

const importDataBase = new ImportDataBase({tokenReader:()=>auth.token(), realm:realm.value});
const emit = defineEmits(['refreshRecord']);

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
