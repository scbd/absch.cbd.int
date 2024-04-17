<template>
  <div id="shareRecord">
    <a id="shareSearchDomId" rel="noopener" href="#" class="share-button" @click="openModel()">
      <i class="fa fa-paper-plane" aria-hidden="true"></i> {{ $t("share") }} 
    </a>
    <div class="modal fade" ref="shareModal" data-backdrop="static"  tabindex="-1" aria-hidden="true" id="share-modal">      
      <div class="modal-dialog modal-dialog-centered"  role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <span v-if="sharedData.type=='link'" >{{t('modalTitleLink')}}</span>
              <span v-if="sharedData.type=='embed'">{{t('modalTitleEmbed')}}</span>
              <span v-if="sharedData.type=='email'">{{t('modalTitleEmail')}}</span>
            </h5>
            <button type="button" class="border-0 close" @click="closeDialog()" aria-label="Close" ><i class="bi bi-x-circle-fill icon-lg"></i></button>
          </div>
          <div class="modal-body">
            <div class="wrapper">
              <div class="row">
                <div class="col-12">
                  <a href="#" class="icon share-link" v-bind:class="{ selected: sharedData.type == 'link' }" @click="loadTabData('link')" :disabled="loading">
                    <div class="tooltip">{{ $t("link") }}</div>
                    <span><i class="bi bi-link"></i></span>
                    <br/>
                    <span class="button-text">{{ $t("link") }}</span>
                  </a>
                  <a href="#" class="icon embed" v-bind:class="{selected: sharedData.type == 'embed'}" @click="loadTabData('embed')" :disabled="loading">
                    <div class="tooltip">{{ $t("embed") }}</div>
                    <span><i class="bi bi-code-slash"></i></span><br/>
                    <span class="button-text">{{ $t("embed") }}</span>
                  </a>
                  <a href="#" class="icon email" v-bind:class="{
                      selected: sharedData.type == 'email'}" @click="loadTabData('email')" :disabled="loading">
                    <div class="tooltip">{{ $t("email") }}</div>
                    <span><i class="bi bi-envelope"></i></span><br/>
                    <span class="button-text">{{ $t("email") }}</span>
                  </a>
                </div>
              </div>
              <hr>
              <div class="row" v-if="!sharedData.type">
                <div class="col-12">
                  <div class="alert alert-info">
                    {{t('selectOneOption')}}
                  </div>
                </div>
              </div>
              <div class="row" v-if="loading || sharedData[sharedData.type].success || error">
                <div class="col-md-12">
                  <div v-if="!loading && sharedData[sharedData.type].success" class="alert alert-success">
                    <span v-if="sharedData.type=='email'">
                      {{t('emailSent')}}
                      <ul v-if="sharedData[sharedData.type].emailsSentTo && sharedData[sharedData.type].emailsSentTo.length>0">
                        <li v-for="(email, index) in sharedData[sharedData.type].emailsSentTo" :key="index">{{email}}</li>
                      </ul>
                    </span>
                  </div>
                  <div v-if="loading" class="alert alert-info">
                    <div class="text-center">
                        <div class="spinner-border" role="status" aria-hidden="true"></div>
                        <strong> {{ $t("processing") }}...</strong>
                    </div>                   
                  </div>
                  <div v-if="error" class="alert alert-danger d-flex align-items-center" role="alert">
                      <i class="bi bi-exclamation-triangle m-1"></i>
                      <div class="m-1">
                        {{ error }}
                      </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="sharedData.type == 'link'">
                <div class="col-md-12">
                  <div v-if="sharedData[sharedData.type].link" class="field d-flex align-items-center justify-content-between">
                    <span class="bi bi-link text-center"></span>
                    <p class="copy-link">
                      <a :href="sharedData[sharedData.type].link" target="_blank">{{sharedData[sharedData.type].link}}</a>
                      <input  type="textbox" style="height:0px;width:0px" class="" id="shareLink" aria-label="embed code" 
                        v-model="sharedData[sharedData.type].link" readonly disabled />                            
                    </p>
                    <button class="btn btn-primary float-right" @click="copy('shareLink')"
                      data-bs-toggle="tooltip" data-bs-placement="top" :title="$t('copyToClipboard')" :data-original-title="$t('copyToClipboard')">
                      {{t('Copy')}}
                    </button>
                  </div>
                  <button class="btn btn-primary btn-sm float-end" v-if="!sharedData[sharedData.type].link" @click="generateSearchResultLink()" 
                    :disabled="loading" v-bind:class="{ disabled: loading }">
                      <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span v-if="loading" class="visually-hidden">{{t('loading')}}...</span>
                      {{t('generateLink')}}
                  </button>
                </div>
              </div>
              <div class="row" v-if="sharedData.type == 'email' && isUserSignedIn">
                <div class="col-md-12 ">
                  <div class="alert alert-info">
                    {{t('emailInfo')}}

                  </div>
                </div>
                <div class="col-md-12 ">
                   <form class="row g-3">
                    <div class="col-12">
                       <label for="inputPassword2">{{t('emails')}}</label>
                       <input type="email" class="form-control"
                        multiple @change="onEmailChange"
                        v-model="sharedData[sharedData.type].emails" :placeholder="$t('emails')"/> 
                        <div style="font-size: small;color: black;">{{t('emailInstructions')}}</div>                     
                    </div>
                    <div class="col-12">
                      <button class="btn btn-primary float-end" @click.prevent="shareLinkMail()" :disabled="loading || !sharedData[sharedData.type].emails || sharedData[sharedData.type]._id" >
                        {{t('send')}}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="row" v-if="sharedData.type == 'embed' && isUserSignedIn">
                <div class="col-md-12 ">
                  <div class="alert alert-info">
                    {{t('domainInfo')}}
                  </div>
                </div>
                <div class="col-md-12 ">
                  <form class="row g-3">
                    <div class="col-12">
                      <label for="inputPassword2">{{t('domain')}}</label>
                      <input v-model="sharedData[sharedData.type].domain"
                        type="url" :placeholder="$t('urlEg')" class="form-control float-right" @change="onDomainChange" />
                    </div>
                    <div class="col-12">
                      <!-- || !isValidDomain -->
                      <button
                        class="btn btn-primary float-end"
                        @click.prevent="generateEmbedCode()"
                        :disabled="loading || !sharedData[sharedData.type].domain"
                        v-bind:class="{
                          disabled:
                            loading || !sharedData[sharedData.type].domain || !isValidDomain,
                        }"
                      >
                        {{t('generateCode')}}
                      </button>
                    </div>
                  </form>
                </div>
                <div class="row g-3" v-if="sharedData[sharedData.type].code">
                    <div class="col-12">
                        <div class="input-group mb-3">                            
                            <textarea class="form-control highlight embed-code" id="embedCode" aria-label="embed code" v-model="sharedData[sharedData.type].code" readonly disabled>                              
                            </textarea>
                            <button class="input-group-text" :title="$t('copyToClipboard')" :data-original-title="$t('copyToClipboard')" 
                            data-bs-toggle="tooltip" data-bs-placement="top"  @click="copy('embedCode')">{{t('Copy')}}</button>                            
                        </div>
                    </div>
                </div>
              </div>
              <div class="row" v-if="(sharedData.type == 'embed' || sharedData.type == 'email') && !isUserSignedIn">
                 <div class="alert alert-info">
                    {{t('requireLogin')}} 
                    <div class="align-items-center">
                      <button class="btn btn-primary btn-sm" @click="signIn()">{{t('signIn')}}</button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="position-fixed bottom-0 start-0 p-3" style="z-index: 11">
      <div ref="clipboardToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">{{t('clipboardSuccess')}}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, shallowRef, inject } from 'vue';
  import DocumentShareApi from "~/api/document-share";
  import SubscriptionsApi from "~/api/subscriptions";
  import { Modal, Toast } from "bootstrap";
  import { useRealm } from '../../services/composables/realm.js';
  import { useI18n } from 'vue-i18n';
  import messages from '../../app-text/components/common/share-record.json';
  import { getRecaptchaToken, resetRecaptcha } from '../../services/reCaptcha'
  import { useAuth } from '@scbd/angular-vue/src/index.js';
  const auth = useAuth();
  const getQuery = inject('getQuery');
  const userStatus = inject('userStatus');
  let modal = null;
  let toast = null;
  let authToken = null; // ToDo ??
  const loading = ref(false);
  let isValidEmail = true; // ToDo ?
  let isValidDomain = true;
  const sharedData = ref({
    link: {},
    embed: {},
    email: {},
    storageType: "",
    type: "link"
  });

  let isUserSignedIn = ref(false);
  let error = ref(null);
  let documentShareApi = null; // ?
  let subscriptionsApi = null; // ?
  let shareModal = shallowRef(null); // use shallowRef
  let clipboardToast = shallowRef(null);
  const { t, locale } = useI18n({ messages });
  const realm = useRealm();

  onMounted(async () => {  
      authToken = await auth.token();
      if (authToken) {
          isUserSignedIn.value = true;
          console.log("authToken authToken",authToken);
          // this authtoken is passed as tokenreader to api-base
          documentShareApi = new DocumentShareApi(authToken);
          subscriptionsApi = new SubscriptionsApi(authToken);
      }
      modal = new Modal(shareModal.value);
      toast = new Toast(clipboardToast.value);
  });

  const openModel = async () => { 
    if (!modal._isShown)
        modal.show('static');

    if (sharedData.value.type != 'link' && !authToken)
        userStatus();
    else
      loadTabData(sharedData.value.type || 'link');

    $(`#${shareModal.value.id}`).on('hidden.bs.modal', closeDialog);
  };

const loadTabData = async (type) => {
  error.value = undefined;
  const { recordKey, type: storageType, query } = getQuery(); 
  sharedData.value.type = type;
   if(recordKey) {
    sharedData.value[type].recordKey = recordKey;
   }
  sharedData.value.storageType = storageType;

  if (sharedData.value.storageType == "chm-document") {
    return sharedData.value[type].link = `${realm.baseURL}/${locale.value}/database/${sharedData.value[type].recordKey}`;
  }

  if (!authToken && sharedData.value.type != 'link' &&
    (sharedData.value.storageType == "chm-search-result" || sharedData.value.storageType == "chm-country-profile")) {
      userStatus();
    return;
  }

  if (sharedData.value.storageType == "chm-search-result") {
    sharedData.value[type].searchQuery = query;
  }
  if (sharedData.value.storageType == "chm-country-profile") {
    sharedData.value[type].link = `${realm.baseURL}/${locale.value}/countries/${sharedData.value[type].recordKey}`;
  }
  refreshSharedData();
}

const closeDialog = () => {
  sharedData.value = {
    link: {},
    embed: {},
    email: {},
    storageType: '',
    type: 'link'
  };
  loading.value = false;
  resetRecaptcha;
  modal.hide();
};

const copy = async (id) => {
  const copyText = document.getElementById(id);
  copyText.focus();
  copyText.setSelectionRange(0, copyText.value.length);
  await navigator.clipboard.writeText(copyText.value);
  toast.show();
};

const shareLinkMail = async () => {
  error.value = undefined;
  const emailsRegex = /^([a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])[;,\s]?)+$/i;
  const emails = sharedData.value[sharedData.value.type].emails;
  if (!emails || !emailsRegex.test(emails.replace(/\s/g, ''))) {
    return;
  }
  if (emails.split(/,|;| /g).length > 10) {
    error.value = t("excessEmailError");
    return;
  }
  try {
    loading.value = true;
    sharedData.value[sharedData.value.type].emails = [...(new Set(emails.replace(/(,|;|\s)$/, '').split(/,|;| /g)))].filter(e => e).join(',');
    const captchaToken = await getRecaptchaToken();
    if (!sharedData.value[sharedData.value.type]._id) {
      if (sharedData.value.storageType == "chm-search-result") {
        await saveSearchQuery();
      }
      await saveShareDocument(undefined, captchaToken);
    } 
    if(sharedData.value[sharedData.type]) {
      sharedData.value[sharedData.type].link = `${realm.baseURL}/${locale.value}/share/link/${sharedData.value.storageType}/${sharedData.value[sharedData.value.type].urlHash}`;
    }
    sharedData.value[sharedData.value.type].success = true;
    sharedData.value[sharedData.value.type].emailsSentTo = [...(sharedData.value[sharedData.value.type].emailsSentTo || []),
    ...sharedData.value[sharedData.value.type].emails.replace(/\s/g, '').split(/,|;| /g)];
    sharedData.value[sharedData.value.type].emails = undefined;
    refreshSharedData();

  } catch (err) {
    console.log(err);
    error.value = t("emailError");
  } finally {
    loading.value = false;
  }
};

const generateEmbedCode = async () => {
  error.value = undefined;
  onDomainChange();
  if (!isValidDomain) return;
  loading.value = true;

  try {
    const captchaToken   = await getRecaptchaToken();

    if (!sharedData.value.embed._id) {
      if (sharedData.value.storageType == "chm-search-result") {
        await saveSearchQuery();
      }
      if (!sharedData.value.embed.urlHash)
        await saveShareDocument(undefined, captchaToken);
    }
    if (sharedData.value.embed._id) {
      sharedData.value.embed.code = `<script src='${realm.baseURL}/widgets.js'><\/script>`;

      if (sharedData.value.storageType == "chm-document") {
        sharedData.value.embed.code += `<div class="scbd-chm-embed" data-type="chm-document" data-access-key="${sharedData.value.embed.urlHash}" width="100%"></div>`;
      }
      else if (sharedData.value.storageType == "chm-search-result") {
        sharedData.value.embed.code += `<div class="scbd-chm-embed" data-type="chm-search-result" data-access-key="${sharedData.value.embed.urlHash}" width="100%"></div>`;
      }
      else if (sharedData.embed.storageType == "chm-country-profile") {
        sharedData.code += `<div class="scbd-chm-embed" data-type="chm-country-profile" data-access-key="${sharedData.value.embed.urlHash}" width="100%"></div>`;
      }
    }
    refreshSharedData();

  } catch (err) {
    console.log(err)
    error.value = t("embedCodeError");
  } finally {
    loading.value = false;
  }

};

const saveShareDocument = async (data, captchaToken) => {
  data = data || getShareDocumentData();
  let shareDetails;

  let existingSharedDocument;
    if (sharedData.value[sharedData.value.type].recordKey) {
    if(data?.sharedData){
          data.sharedData.recordKey = sharedData.value[sharedData.value.type].recordKey;
        }
    shareDetails = await documentShareApi.shareDocument(data, captchaToken);
    existingSharedDocument = await documentShareApi.getSharedDocument(shareDetails.id);
  }
  else {
    shareDetails = await documentShareApi.anonShareDocument(data, captchaToken);
    existingSharedDocument = shareDetails;
    existingSharedDocument.id = existingSharedDocument._id;
  }
sharedData.value[sharedData.value.type] = {
    ...sharedData.value[sharedData.value.type],
    ...existingSharedDocument
  };
  refreshSharedData();
};

const saveSearchQuery = async () => {
  const data = getSearchQueryData();
  const searchQueryId = (await subscriptionsApi.addSubscription(data)).id;

  sharedData.value[sharedData.value.type].recordKey = searchQueryId;
  refreshSharedData();
};

const generateSearchResultLink = async () => {

  error.value = undefined;
  loading.value = true;
  try {
    if (!sharedData.value[sharedData.value.type]._id) {
      const captchaToken = await getRecaptchaToken();
      const data = {}
      if (sharedData.value.storageType == "chm-search-result") {
        data.searchQuery = getSearchQueryData()
      }

      data.share = getShareDocumentData();
      await saveShareDocument(data, captchaToken);
    }
    sharedData.value[sharedData.value.type].link = `${realm.baseURL}/${locale.value}/share/link/${sharedData.value.storageType}/${sharedData.value[sharedData.value.type].urlHash}`;
    refreshSharedData();
  }
  catch (err) {
    console.error(err);
    if (err?.code == "INVALID_CAPTCHA_SCORE")
    error.value = err.message;
    else
    error.value = t("searchResultLinkError");
  }
  finally {
    loading.value = false;
  }
};

const onDomainChange = () => {
  const regexp =
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (!regexp.test(sharedData.value[sharedData.value.type].domain)) {
    isValidDomain = false;
    return;
  }
  isValidDomain = true;
};

const onEmailChange = () => {
  sharedData.value[sharedData.value.type]._id = undefined;
  refreshSharedData();
};

const signIn = () => {
  userStatus();
};

const getShareDocumentData = () => {
  const data = {
    expiry: new Date(new Date().getTime() + 12 * 12 * 30 * 24 * 60 * 60 * 1000), // 12 years long expiry
    storageType: sharedData.value.storageType,
    shareType: sharedData.value.type,
    sharedData: {
      realm: realm.value, 
    },
    sharedWith: {}
  };
  if (['embed', 'link'].includes(sharedData.value.type)) {
    data.sharedWith = {
      link: true,
    }
    if (sharedData.value.type == 'embed'){
       data.sharedData.domain = sharedData.value[sharedData.value.type].domain;
    }
  }
  else if (sharedData.value.type == 'email') {
    data.sharedWith.emails = sharedData.value[sharedData.value.type].emails;
  }

  return data;
};

const getSearchQueryData = () => {
  const { filters, subFilters } = sharedData.value[sharedData.value.type].searchQuery || {};
  const data = {
    filters: Object.keys(filters).length == 0 ? undefined : filters,
    isSharedQuery: true,
    queryTitle: `Share query : ${Math.floor((1 + Math.random()) * 0x10000).toString(16)}`,
    realm: realm.value,
    subFilters: Object.keys(subFilters).length == 0 ? undefined : subFilters
  };

  return data;
};

const refreshSharedData = () => {
  sharedData.value = { ...sharedData.value };
};


</script>



<style >
    #shareRecord{
      display: inline;
    }
    .modal-body {
      /* background: #ddd; */
      color:black;
    }
    .wrapper {
      /* text-align: center; */
    }
    .wrapper .icon {
      position: relative;
      background-color: #ffffff;
      border-radius: 50%;
      margin-left: 15px!important;
      margin: 10px;
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 22px;
      display: inline-block;
      align-items: center;
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      color: #333;
      text-decoration: none;
    }
    .wrapper .tooltip {
      position: absolute;
      top: 0;
      line-height: 1.5;
      font-size: 14px;
      background-color: #ffffff;
      color: #ffffff;
      padding: 5px 8px;
      border-radius: 5px;
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    .wrapper .tooltip::before {
      position: absolute;
      content: "";
      height: 8px;
      width: 8px;
      background-color: #ffffff;
      bottom: -3px;
      left: 50%;
      transform: translate(-50%) rotate(45deg);
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    .wrapper .icon:hover .tooltip {
      top: -45px;
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
    /* .wrapper .icon.share-link:hover .tooltip {
        left: -25px;
        width: 80px!important;
    } */

    .wrapper .icon:hover span,
    .wrapper .icon:hover .tooltip {
      text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
    }
    .wrapper .share-link.selected,
    .wrapper .share-link:hover,
    .wrapper .share-link:hover .tooltip,
    .wrapper .share-link:hover .tooltip::before {
      background-color: #3b5999;
      color: #ffffff;
    }
    .wrapper .embed.selected,
    .wrapper .embed:hover,
    .wrapper .embed:hover .tooltip,
    .wrapper .embed:hover .tooltip::before {
      background-color: #46c1f6;
      color: #ffffff;
    }
    .wrapper .email.selected,
    .wrapper .email:hover,
    .wrapper .email:hover .tooltip,
    .wrapper .email:hover .tooltip::before {
      background-color: #e1306c;
      color: #ffffff;
    }
    .wrapper .share-link span,
    .wrapper .embed span,
    .wrapper .email span {
      margin: inherit;
    }

    .wrapper .field {
      margin: 15px 0px -5px 0px;
      height: 40px;
      border: 1px solid #0d6efd;
      border-radius: 5px;
    }

    .wrapper .field.active {
      border-color: #0d6efd;
    }

    .wrapper .field span {
      width: 50px;
      font-size: 1.1rem;
    }

    .wrapper .field.active span {
      color: #0d6efd;
    }

    .wrapper .field .copy-link {
      border: none;
      outline: none;
      font-size: 0.89rem;
      width: 100%;
      height: 100%;
      background: #fff;
      padding: 0px;
      margin: 5px 0px;
      white-space: nowrap;
      overflow: scroll;
      padding-top: 8px;
    }

    .btn-clipboard:hover,
    .btn-clipboard:focus {
      color: #fff!important;
      background-color: #0d6efd;
    }

    .bd-clipboard {
      position: relative;
      float: right;
    }
    .highlight {
        background-color: #fff!important;
        padding: 10px;
        border-radius: 0.25rem;
        min-height: 150px;     
    }


    .wrapper code{
      word-break: keep-all;
      white-space: normal;
    }
    .wrapper .button-text{
      font-size: small;
      margin: 0.7em!important;
      color: black!important;;
    }
            
    /* scrollbar */
    .wrapper ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    .wrapper ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      -webkit-border-radius: 10px;
      border-radius: 10px;
    }

    .wrapper ::-webkit-scrollbar-thumb {
      -webkit-border-radius: 10px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.3);
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }

    .wrapper ::-webkit-scrollbar-thumb:window-inactive {
      background: rgba(255, 255, 255, 0.3);
    }
</style>