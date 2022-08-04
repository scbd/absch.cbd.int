<template>
  <div id="shareRecord">
    <a id="shareSearchDomId" rel="noopener" href="#" class="share-button" @click="openModel()">
      <i class="fa fa-paper-plane" aria-hidden="true"></i> {{ $t("share") }} 
    </a>
    <div class="modal fade" ref="shareModal" data-backdrop="static"  tabindex="-1" aria-hidden="true" id="share-modal">      
      <div class="modal-dialog"  role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <span v-if="sharedData.type=='link'" >{{$t('modalTitleLink')}}</span>
              <span v-if="sharedData.type=='embed'">{{$t('modalTitleEmbed')}}</span>
              <span v-if="sharedData.type=='email'">{{$t('modalTitleEmail')}}</span>
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
                    {{$t('selectOneOption')}}
                  </div>
                </div>
              </div>
              <div class="row" v-if="loading || sharedData[sharedData.type].success || error">
                <div class="col-md-12">
                  <div v-if="!loading && sharedData[sharedData.type].success" class="alert alert-success">
                    <span v-if="sharedData.type=='email'">
                      {{$t('emailSent')}}
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
                      {{$t('Copy')}}
                    </button>
                  </div>
                  <button class="btn btn-primary btn-sm rounded-0 float-end" v-if="!sharedData[sharedData.type].link" @click="generateSearchResultLink()" 
                    :disabled="loading" v-bind:class="{ disabled: loading }">
                      <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span v-if="loading" class="visually-hidden">{{$t('loading')}}...</span>
                      {{$t('generateLink')}}
                  </button>
                </div>
              </div>
              <div class="row" v-if="sharedData.type == 'email' && isUserSignedIn">
                <div class="col-md-12 ">
                  <div class="alert alert-info">
                    {{$t('emailInfo')}}

                  </div>
                </div>
                <div class="col-md-12 ">
                   <form class="row g-3">
                    <div class="col-12">
                       <label for="inputPassword2">{{$t('emails')}}</label>
                       <input type="email" class="form-control"
                        multiple @change="onEmailChange"
                        v-model="sharedData[sharedData.type].emails" :placeholder="$t('emails')"/> 
                        <div style="font-size: small;color: black;">{{$t('emailInstructions')}}</div>                     
                    </div>
                    <div class="col-12">
                      <button class="btn btn-primary float-end" @click.prevent="shareLinkMail()" :disabled="loading || !sharedData[sharedData.type].emails || sharedData[sharedData.type]._id" >
                        {{$t('send')}}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="row" v-if="sharedData.type == 'embed' && isUserSignedIn">
                <div class="col-md-12 ">
                  <div class="alert alert-info">
                    {{$t('domainInfo')}}
                  </div>
                </div>
                <div class="col-md-12 ">
                  <form class="row g-3">
                    <div class="col-12">
                      <label for="inputPassword2">{{$t('domain')}}</label>
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
                        {{$t('generateCode')}}
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
                            data-bs-toggle="tooltip" data-bs-placement="top"  @click="copy('embedCode')">{{$t('Copy')}}</button>                            
                        </div>
                    </div>
                </div>
              </div>
              <div class="row" v-if="(sharedData.type == 'embed' || sharedData.type == 'email') && !isUserSignedIn">
                 <div class="alert alert-info">
                    {{$t('requireLogin')}} 
                    <div class="align-items-center">
                      <button class="btn btn-primary btn-sm" @click="signIn()">{{$t('signIn')}}</button>
                    </div>
                  </div>
              </div>
              <invisible-recaptcha ref="shareRecaptcha" :sitekey="captchaV2BadgeKey" 
                :elementId="'shareRecaptcha'" :badgePosition="'left'"></invisible-recaptcha>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="position-fixed bottom-0 start-0 p-3" style="z-index: 11">
      <div ref="clipboardToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">{{$t('clipboardSuccess')}}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DocumentShareApi from "~/api/document-share";
import SubscriptionsApi from "~/api/subscriptions";
import { Modal, Toast } from "bootstrap";
import i18n from "../../app-text/components/common/share-record.json";
import { getRecaptchaToken } from '~/services/reCaptcha'



export default {
  components: {  },
  props: ["getQuery", "tokenReader", "userStatus", "generateLink", "isUserSignedIn"],
  data: () => {
    return {
      modal: null,
      toast:null,
      loading: false,
      isValidEmail: true,
      isValidDomain: true,
      userToken:null,
      sharedData: {
        link       : {},
        embed      : {},
        email      : {},
        storageType: '',
        type       : 'link'
      },
      error : null
    };
  },
  watch:{
    isUserSignedIn(isSignedIn){
      if(isSignedIn){
        this.openModel();
      }
    }
  },
  created() {
    this.documentShareApi = new DocumentShareApi(this.tokenReader);
    this.subscriptionsApi = new SubscriptionsApi(this.tokenReader);
  },
  async mounted() {
    this.modal = new Modal(this.$refs.shareModal);
    this.toast = new Toast(this.$refs.clipboardToast);
  },
  methods: {
    async openModel() {
      if(!this.userToken)
        this.userToken = await this.tokenReader();

      if(this.userToken && !this.isUserSignedIn)
        this.isUserSignedIn = true;
      // if(this.userToken){

        if(!this.modal._isShown)
          this.modal.show('static');

        if(this.sharedData.type != 'link' && !this.userToken)
          this.userStatus();
        else
          this.loadTabData(this.sharedData.type || 'link');

        $(`#${this.$refs.shareModal.id}`).on('hidden.bs.modal', this.closeDialog);
    },
    async loadTabData(type) {

      this.error = undefined;
      const { recordKey, type:storageType, query } = this.getQuery(); //TODO: change, GetQuery is getting details about what type of share it is (id and type search-relesult/document)

      this.sharedData.type            = type;
      this.sharedData[type].recordKey = recordKey;
      this.sharedData.storageType     = storageType;

      if (this.sharedData.storageType == "chm-document") {
        return this.sharedData[type].link = `${this.$realm.baseURL}/${this.$locale}/database/${this.sharedData[type].recordKey}`;
      }

      if (!this.userToken && this.sharedData.type != 'link'&& 
          (this.sharedData.storageType == "chm-search-result" || this.sharedData.storageType == "chm-country-profile")){
          await this.userStatus();
          return;
      }

      if (this.sharedData.storageType == "chm-search-result") {
        this.sharedData[type].searchQuery = query;
      }
      if (this.sharedData.storageType == "chm-country-profile") {
        this.sharedData[type].link = `${this.$realm.baseURL}/${this.$locale}/countries/${this.sharedData[type].recordKey}`;
      }
      console.log(this.sharedData)
      this.refreshSharedData();
      
    },
    closeDialog() {
      this.sharedData = {
        link       : {},
        embed      : {},
        email      : {},
        storageType: '',
        type       : 'link'
      };
      this.modal.hide();
    },
    async copy(id) {
      const copyText = document.getElementById(id);
      copyText.focus();     
      copyText.setSelectionRange(0, copyText.value.length);
      await navigator.clipboard.writeText(copyText.value);
      this.toast.show();
    },
    async shareLinkMail() {
      this.error = undefined;
      const emailsRegex = /^([a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])[;,\s]?)+$/i;
      const emails = this.sharedData[this.sharedData.type].emails;
      if (!emails || !emailsRegex.test(emails.replace(/\s/g, ''))) {
        this.isValidEmail = false;
        return;
      }
      if(emails.split(/,|;| /g).length > 10){
        this.error = i18n.excessEmailError;
        this.isValidEmail = true;
        return;
      }
      this.isValidEmail = true;
      try {
        this.loading = true;
        this.sharedData[this.sharedData.type].emails = [...(new Set(emails.replace(/(,|;|\s)$/, '').split(/,|;| /g)))].join(',')

        const captchaToken   = await getRecaptchaToken();

         if (!this.sharedData[this.sharedData.type]._id) {          
          if (this.sharedData.storageType == "chm-search-result") {
            await this.saveSearchQuery();            
          }
          await this.saveShareDocument(undefined, captchaToken);
        }

        this.sharedData[this.sharedData.type].link = `${this.$realm.baseURL}/${this.$locale}/share/link/${this.sharedData.storageType}/${this.sharedData[this.sharedData.type].urlHash}`;

        this.sharedData[this.sharedData.type].success      = true;
        this.sharedData[this.sharedData.type].emailsSentTo = [...(this.sharedData[this.sharedData.type].emailsSentTo||[]), 
                                                              ...this.sharedData[this.sharedData.type].emails.replace(/\s/g, '').split(/,|;| /g)];
        this.sharedData[this.sharedData.type].emails       = undefined;
        this.refreshSharedData();

      } catch (err) {
        console.log(err);
        this.error = i18n.emailError;
      } finally {
        this.loading = false;
      }
    },
    async generateEmbedCode() {
      this.error = undefined;
      this.onDomainChange();
      if (!this.isValidDomain) return;

      this.loading = true;
     
      try {
        const captchaToken   = await getRecaptchaToken();

        if (!this.sharedData.embed._id) {
          if (this.sharedData.storageType == "chm-search-result") {
            await this.saveSearchQuery();            
          }
          if(!this.sharedData.embed.urlHash)
            await this.saveShareDocument(undefined, captchaToken);
        }

        if (this.sharedData.embed._id) {
            this.sharedData.embed.code = `<script src='${this.$realm.baseURL}/widgets.js'><\/script>`;
            
            if (this.sharedData.storageType == "chm-document") {
              this.sharedData.embed.code += `<div class="scbd-chm-embed" data-type="chm-document" data-access-key="${this.sharedData.embed.urlHash}" width="100%"></div>`;
            } 
            else if (this.sharedData.storageType == "chm-search-result") {
              this.sharedData.embed.code += `<div class="scbd-chm-embed" data-type="chm-search-result" data-access-key="${this.sharedData.embed.urlHash}" width="100%"></div>`;
            } 
            else if (this.sharedData.embed.storageType == "chm-country-profile") {
              this.sharedData.code += `<div class="scbd-chm-embed" data-type="chm-country-profile" data-access-key="${this.sharedData.embed.urlHash}" width="100%"></div>`;
            }
        }
        this.refreshSharedData();
        
      } catch (err) {
        console.log(err)
        this.error = i18n.embedCodeError;
      } finally {
        this.loading = false;
      }

    },
    async saveShareDocument(data, captchaToken) {
      
      data = data || this.getShareDocumentData();
      let shareDetails;

      let existingSharedDocument;
      if(this.sharedData[this.sharedData.type].recordKey){
        data.sharedData.recordKey = this.sharedData[this.sharedData.type].recordKey;
        shareDetails  = await this.documentShareApi.shareDocument(data, captchaToken);
        existingSharedDocument  = await this.documentShareApi.getSharedDocument(shareDetails.id);
      }
      else{
        shareDetails  = await this.documentShareApi.anonShareDocument(data, captchaToken);
        existingSharedDocument  = shareDetails;
        existingSharedDocument.id = existingSharedDocument._id;
      }
      

      this.sharedData[this.sharedData.type] = {
        ...this.sharedData[this.sharedData.type], 
        ...existingSharedDocument
      };      
      this.refreshSharedData();

    },
    async saveSearchQuery(){

      const data = this.getSearchQueryData();
      const searchQueryId = (await this.subscriptionsApi.addSubscription(data)).id;

      this.sharedData[this.sharedData.type].recordKey = searchQueryId;
      this.refreshSharedData();

    },
    async generateSearchResultLink(){

      this.error = undefined;
      this.loading = true;
      try{
        if (!this.sharedData[this.sharedData.type]._id) { 
          
        const captchaToken   = await getRecaptchaToken();

          const data = {}
          if (this.sharedData.storageType == "chm-search-result") {
            data.searchQuery = this.getSearchQueryData()
          }

          data.share = this.getShareDocumentData();
          await this.saveShareDocument(data, captchaToken);
        }

        this.sharedData[this.sharedData.type].link = `${this.$realm.baseURL}/${this.$locale}/share/link/${this.sharedData.storageType}/${this.sharedData[this.sharedData.type].urlHash}`;
        this.refreshSharedData();
      }
      catch(err){
        console.error(err);
        if(err?.code == "INVALID_CAPTCHA_SCORE")
          this.error = err.message;
        else
          this.error = i18n.searchResultLinkError;
      } 
      finally{
        this.loading = false;
      }
    },
    onDomainChange() {
      const regexp =
        /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      if (!regexp.test(this.sharedData[this.sharedData.type].domain)) {
        this.isValidDomain = false;
        return;
      }
      this.isValidDomain = true;
      
    },
    onEmailChange(){
      this.sharedData[this.sharedData.type]._id = undefined;
      this.refreshSharedData();
    },
    signIn(){
      this.userStatus();
    },
    getShareDocumentData(){
      const data = {
        expiry      : new Date(new Date().getTime()+12*12*30*24*60*60*1000), // 12 years long expiry
        storageType: this.sharedData.storageType,
        shareType: this.sharedData.type,        
        sharedData: {
          realm     : this.$realm.value,
        },
        sharedWith : {}
      };

      if(['embed', 'link'].includes(this.sharedData.type)){
        data.sharedWith = {
          link: true,
        }
        if(this.sharedData.type == 'embed')
          data.sharedData.domain    = this.sharedData[this.sharedData.type].domain;
      }
      else if(this.sharedData.type == 'email'){
        data.sharedWith.emails = this.sharedData[this.sharedData.type].emails;
      }

      return data;
    },
    getSearchQueryData() {
        const { filters, subFilters }=this.sharedData[this.sharedData.type].searchQuery||{};
        const data={
          filters: Object.keys(filters).length == 0 ? undefined : filters,
          isSharedQuery: true,
          queryTitle: `Share query : ${Math.floor((1+Math.random())*0x10000).toString(16)}`,
          realm: this.$realm.value,
          subFilters: Object.keys(subFilters).length == 0 ? undefined : subFilters
        };
        return data;
    },
    refreshSharedData(){
      this.sharedData = Object.assign({}, this.sharedData);
    }
  },
  i18n: {
    messages: {
      en: i18n,
    },
  },
};
</script>

<style>
    #shareRecord{
      display: inline;
    }
    .modal-body {
      background: #ddd;
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