<template>
  <button class="btn btn-primary btn-sm" type="button" @click="toggleModal">
    {{ t("importIrcc") }}
  </button>

    <ImportModal ref="importModal"
            :showModal="showModal" 
            :modalTitle="t('importIrccExcel')" 
            :parsedFile="parsedFile"
            :handleConfirm="handleConfirm"
            :toggleModal="toggleModal"
            :isLoading="isLoading"
            :handleClearClick="handleClearClick" >
        <!-- <div class="row">
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
            <div class="col-md-4 text-start">
                
                <button class="btn btn-primary position-relative" type='button' :disabled="isLoading">
                    {{t("browse")}}
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
            
            <div class="col-md-6 text-center d-flex align-items-center" v-if="multipleImportSheets.length">
                <span class="text-danger me-2" data-toggle="tooltip" data-placement="top" :title="t('multipleSheetAlert')"><i class="bi bi-info-circle"></i></span>
                <select class="form-select" :disabled="isLoading"
                v-model="selectedSheetIndex" @change="handleSelectedSheetChange">
                    <option v-for="(sheet, index) in multipleImportSheets" :key="index" :value="index">{{sheet}}</option>
                </select>
            </div>

            <div class="col-md-3 d-flex align-items-center justify-content-end fw-bold">
                <span v-if="parsedFile.length > 0">{{t('totalRecords')}} {{parsedFile.length}}</span>
            </div>
        </div>
        <div class="row table-container" v-if="parsedFile.length">
            <!-- <div class="col"> -->
                <table class="table table-striped table-bordered table-condensed">
                    <thead>
                        <tr>
                            <th scope="col" rowspan="2">#</th>
                            <th scope="col" rowspan="2">{{t("language")}}</th>
                            <th scope="col" rowspan="2">{{t("country")}}</th>
                            <th scope="col" rowspan="2">{{t("cnaHeader")}}</th>
                            <th scope="col" rowspan="2">{{t("linkIrcc")}}</th>
                            <th scope="col" rowspan="2">{{t("dateOfIssuanceHeader")}}</th>
                            <th scope="col" rowspan="2">{{t("dateOfExpiryHeader")}}</th>
                            <th scope="col" colspan="8" class="text-center">{{t("provider")}}</th>
                            <th scope="col" colspan="9" class="text-center">{{t("priorInformation")}}</th>
                            <th scope="col" rowspan="2">{{t("matEstablishedHeader")}}</th>
                            <th scope="col" rowspan="2">{{t("subjectMatter")}}</th>
                            <th scope="col" rowspan="2">{{t("additionalInformationOnUsage")}}</th>
                            <th scope="col" rowspan="2">{{t("subjectGenericKeywords")}}</th>
                            <th scope="col" rowspan="2">{{t("specimens")}}</th>
                            <th scope="col" rowspan="2">{{t("taxonomy")}}</th>
                            <th scope="col" rowspan="2">{{t("indicateCommercialUse")}}</th>
                            <th scope="col" rowspan="2">{{t("thirdPartyTransferCondition")}}</th>
                            <th scope="col" rowspan="2">{{t("copyOfPermit")}}</th>
                            <th scope="col" rowspan="2">{{t("additionalInformation")}}</th>
                        </tr>
                         <tr>
                            <th scope="col">{{t("type")}}</th>
                            <th scope="col">{{t("existing")}}</th>
                            <th scope="col">{{t("orgfirstName")}}</th>
                            <th scope="col">{{t("acronymfirstName")}}</th>
                            <th scope="col">{{t("address")}}</th>
                            <th scope="col">{{t("city")}}</th>
                            <th scope="col">{{t("country")}}</th>
                            <th scope="col">{{t("email")}}</th>

                            <th scope="col">{{t("consent")}}</th>
                            <th scope="col">{{t("type")}}</th>
                            <th scope="col">{{t("existing")}}</th>
                            <th scope="col">{{t("orgfirstName")}}</th>
                            <th scope="col">{{t("acronymfirstName")}}</th>
                            <th scope="col">{{t("address")}}</th>
                            <th scope="col">{{t("city")}}</th>
                            <th scope="col">{{t("country")}}</th>
                            <th scope="col">{{t("email")}}</th>
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
                            <td class="p-2">{{data.language}}</td>
                            <td class="p-2">{{data.country}}</td>
                            <td class="p-2">{{data.cna}}</td>
                            <td class="p-2">{{data.permit_equivalent}}</td>
                            <td class="p-2">{{data.date_of_issuance}}</td>
                            <td class="p-2">{{data.dateOfExpiry}}</td>
                            <td class="p-2">{{data.provider.type}}</td>
                            <td class="p-2">{{data.provider.existing}}</td>
                            <td class="p-2">
                                <div :class="{ 'short-text': data.provider.orgName_firstName.length > 45 }" data-bs-toggle="tooltip" data-bs-placement="top" :title="data.provider.orgName_firstName">{{data.provider.orgName_firstName}}</div>
                            </td>
                            <td class="p-2">{{data.provider.acronym_lastName}}</td>
                            <td class="p-2">{{data.provider.address}}</td>
                            <td class="p-2">{{data.provider.city}}</td>
                            <td class="p-2">{{data.provider.country}}</td>
                            <td class="p-2">{{data.provider.email}}</td>
                            <td class="p-2">{{data.pic.consent}}</td>
                            <td class="p-2">{{data.pic.type}}</td>
                            <td class="p-2">{{data.pic.existing}}</td>
                            <td class="p-2">
                                <div :class="{ 'short-text': data.pic.orgName_firstName.length > 45 }" data-bs-toggle="tooltip" data-bs-placement="top" :title="data.pic.orgName_firstName">{{data.pic.orgName_firstName}}</div>
                            </td>
                            <td class="p-2">{{data.pic.acronym_lastName}}</td>
                            <td class="p-2">{{data.pic.address}}</td>
                            <td class="p-2">{{data.pic.city}}</td>
                            <td class="p-2">{{data.pic.country}}</td>
                            <td class="p-2">{{data.pic.email}}</td>
                            <td class="p-2">{{data.matEstablished}}</td>
                            <td class="p-2">
                                <div :class="{ 'short-text': data.subjectMatter.length > 45 }" data-bs-toggle="tooltip" data-bs-placement="top" :title="data.subjectMatter">{{data.subjectMatter}}</div>
                                <!-- <span v-if="data.subjectMatter.length > 45"><a class="text-decoration-underline text-primary" @click="toggleTextLength">(show more/less)</a></span> -->
                            </td>
                            <td class="p-2">
                                <div :class="{ 'short-text': data.usageDescription.length > 45 }" data-bs-toggle="tooltip" data-bs-placement="top" :title="data.usageDescription">{{data.usageDescription}}</div>
                            </td>
                            <td class="p-2">{{data.specimens}}</td>
                            <td class="p-2">{{data.taxonomies}}</td>
                            <td class="p-2">{{data.usage}}</td>
                            <td class="p-2">{{data.conditions_third_party_transfer}}</td>
                            <td class="p-2">{{data.permitFiles}}</td>
                            <td class="p-2">{{data?.additional_information}}</td>
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
        <div class="row mt-4" v-else-if="error && !isLoading">
            <div class="col-12 text-center">
                <span class="alert alert-danger" >{{error}}</span>
            </div>
        </div>
        <div class="row mt-4"  v-if="successMessage && !isLoading">
            <div class="col-12 text-center">
                <div class="alert alert-success">{{successMessage}}</div>
            </div>
        </div>
        <div class="row mt-3" v-show="isLoading">
            <div class="col-12 text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">{{t("loading")}}...</span>
                </div>
              </div>
            </div>
        </div>
    </ImportModal>
</template>

<script setup>
import { ref, shallowRef, computed, defineEmits, reactive, watch } from 'vue';
import ImportModal from "./import-modal.vue"
import { useRealm } from '../../services/composables/realm.js';
import { useUser, useAuth } from '@scbd/angular-vue/src/index.js';
import { ImportDataBase } from "../../services/import-data/import-data-base"
import { ImportDataIRCC } from "../../services/import-data/import-data-ircc"
import "~/components/scbd-angularjs-controls/form-control-directives/km-form-languages.js"
import messages from "../../app-text/views/forms/edit/abs/edit-absPermit.json"
import messages2 from "../../app-text/components/common/import-file.json";
import kmTerm from '~/components/km/KmTerm.vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const { t } = useI18n({ messages });
const realm = useRealm();
const user = useUser();
const auth = useAuth();

const showModal = ref(false);
const isLoading = ref(false);
const parsedFile = ref([]);
const selectedLanguage = ref(locale.value);
const error = ref("");
const errorCreateRecords = ref([]);
const successMessage = ref(null);
const multipleImportSheets = ref([]);
const selectedSheetIndex = ref(0);
let file = ref(null);
const xlsxWorkbook = ref(null);

<<<<<<< HEAD
Object.assign(messages[locale.value], messagesIrcc[locale.value]);
let modal = null;
=======
const importDataBase = new ImportDataBase({tokenReader:()=>auth.token(), realm:realm.value});
const emit = defineEmits(['refreshRecord']);

const userGovernment = computed(()=>{
    return {
        identifier: user?.government
    }
})

let importDataIRCC;
 const importModal = ref(null);
function toggleModal() {
    parsedFile.value = [];
    error.value = null;
    errorCreateRecords.value = [];
    successMessage.value = null;
    multipleImportSheets.value = [];
    selectedSheetIndex.value = null;
    resetFileErrorInParsedFile();
    showModal.value = !showModal.value;
    importModal.value.showDialog();
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
    file.value = event.target.files[0];
    error.value = null;
    errorCreateRecords.value = [];
    successMessage.value = null;
    selectedSheetIndex.value = 0;
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
            parsedFile.value = importDataIRCC.readSheetToDisplayOnUI(multipleImportSheets.value, selectedSheetIndex.value)
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
            errorCreateRecords.value = [];
            successMessage.value = null;
            resetFileErrorInParsedFile();
            parsedFile.value = importDataIRCC.readSheetToDisplayOnUI(multipleImportSheets.value, selectedSheetIndex.value)
            console.log("parsedFile", parsedFile.value, parsedFile.value.length)
>>>>>>> a109512bb (Coded generic table header and body)
        }
      });
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
        error.value = null;
        errorCreateRecords.value = [];
        successMessage.value = null;
        resetFileErrorInParsedFile();
        const result = await importDataIRCC.fileParser(multipleImportSheets.value, selectedSheetIndex.value);
        parsedFile.value = parsedFile.value.map((file,index)=>{
            return {
                ...file,
                identifier: result[index].header.identifier
            }
        })
        console.log("PARSEDFILE", parsedFile.value);
        console.log("RESULT", result);
        console.log("CONTACT", importDataIRCC.contacts);
        const errorResponse = await importDataBase.validateAndCreateNationalRecord(importDataIRCC.contacts, result);
        console.log("ERROR RESPONSE", errorResponse);
        updateParsedFileWithError(errorResponse);
        if(errorResponse === undefined || errorResponse.length === 0){
            successMessage.value = "Successfully created national record.";
        }else{
            errorResponse.forEach(error => {
            const matchingContact = importDataIRCC.contacts.find(contact => contact.header.identifier === error.identifier);
                if (matchingContact) {
                    error.emails = matchingContact.emails;
                }
            });
            errorCreateRecords.value = errorResponse;
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

const getRowsFromParsedFile = (error) => {   
  const matchingItem = parsedFile.value.find((item) => {
    if (error.identifier === item.identifier) {
      return true;
    }
    if (error.contact) {
      if (item.pic.email === error.emails[0] || item.provider.email === error.emails[0]) {
        return true;
      }
    }
    return false;
  });

  return matchingItem ? matchingItem.rowId : null;
};

const onFileInputClick = (event) => {
  event.target.value = "";
};

const handleClearClick = () => {
    parsedFile.value = [];
    error.value = null;
    successMessage.value = null;
    multipleImportSheets.value = [];
    selectedSheetIndex.value = null;
    errorCreateRecords.value = [];
    resetFileErrorInParsedFile();
}

const onRetryClick = async () => {
    error.value = null;
    isLoading.value = true;
    const errorResponse = [];
    resetFileErrorInParsedFile();
    try {
        const promises = errorCreateRecords.value.map(async (record) => {
            const response = await importDataBase.retryCreateNationalRecord(record.document, record.draft)
            if(response.error){
                errorResponse.push({
                    identifier: document.header.identifier,
                    draft: true,
                    document,
                    contact: true,
                    error: response.error
                })
            }
        })      
        await Promise.all(promises);

        if(errorResponse.length === 0){
            successMessage.value = "Successfully created national record.";
            errorCreateRecords.value = [];
        }else{
            errorCreateRecords.value = errorResponse;
        }
        isLoading.value = false;
    } catch (error) {
        error.value = "Error: An error occurred while creating national record."
        isLoading.value = false;
    }       
}

// const toggleTextLength = (event) => {
//     event.preventDefault();
//     const span = event.target.parentElement.previousElementSibling;
//     span.classList.toggle("short-text")
// }

const closeDialog = () => {
  modal.hide();
};

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((o, key) => (o ? o[key] : ""), obj);
}

const isLongText = (text) => {
  return text && text.length > 45;
}

watch(progressTracking, (newValue) => {
  if (newValue < 100) {
    updatedParsedFileWithSuccess();
  }
});

onMounted(async () => {
  modal = new Modal(importModal.value);
});
</script>

<style scoped></style>
