<template>
    <span>
        <a id="shareSearchDomId" rel="noopener" href="#" class="table-export-button" @click="openMpdel()">
            {{$t('share')}}
            <i class="fa fa-paper-plane" aria-hidden="true"></i>
        </a>
        <modal v-model="open" size="lg" @show="onShowDialog" ref="modal" id="share-modal">
           <div slot="header">
                <h3 class="modal-title">
                     {{$t('share')}}
                </h3>
             <span class="close" @click="closeDialog()">x</span>
            </div>
            <div class="share-body">
                <div v-if="loading" class="alert alert-info">
                    <i class="fa fa-spin fa-spinner" v-if="loading" ></i> {{$t('processing')}}
                </div>
              <div class="row icon-list">
                    <div @click="shareType='link'" :disabled="loading" class="col-md-2" v-bind:class="{ selected: shareType=='link'}">
                        <div class="icon-with-labels">
                            <i class="fa fa-link fa-lg" aria-hidden="true"></i>
                            <label>{{$t('link')}}</label>
                        </div>
                    </div>
                     <div @click="shareType='embed'" :disabled="loading" class="col-md-2" v-bind:class="{ selected: shareType=='embed'}">
                        <div class="icon-with-labels embed">
                            <i class="fa fa-code fa-lg" aria-hidden="true"></i>
                             <label>{{$t('embed')}}</label>
                        </div>
                    </div>
                    <div @click="shareType='email'" :disabled="loading" class="col-md-2" v-bind:class="{ selected: shareType=='email'}">
                        <div class="icon-with-labels">
                            <i class="fa fa-envelope-o fa-lg" aria-hidden="true"></i>
                            <label>{{$t('email')}}</label>
                        </div>
                    </div>
                 </div>
                <div class="row share-link web-site" v-if="shareType =='link'">
                    <input
                        type="url"
                        v-model="pageUrl"
                        ref="link"
                    >
                  <button @click="copyLink()" >Copy</button>
                </div>
               <div class="row share-link" v-if="shareType =='email'">
                  <label class="heading">{{$t('email')}}</label>
                    <input
                        type="email"
                        v-model="email"
                        placeholder="Email(s)"
                    >
                  <button @click="sendRecord()" :disabled="loading && !email"  v-bind:class="{ 'disabled': loading || !email}">Send</button>
                 <label class="color-red" v-if="emailRequired">{{$t('emailError')}}</label>
                 <label class="success-message" v-if="sendResponse && !email">{{sendResponse}}</label>
                </div>


                <div class="row share-link" v-if="shareType =='embed'">
                  <label class="heading">{{$t('domain')}}</label>
                  <input
                      v-model="domain"
                      type="url"
                      placeholder="https://example.com"
                      ref="domainTag"
                      :data-script="`<script src='https://bch.cbddev.xyz/app/assets/widgets.js'></script>`"
                  >
                  <button @click="sendRecord()" :disabled="loading && !domain"  v-bind:class="{ 'disabled': loading || !domain}">Get code</button>
                 <label class="color-red" v-if="domainRequired">{{$t('domainError')}}</label>
              </div>

              <div class="input-option" v-if="shareType =='embed' && frame">
                 <textarea
                    type="text"
                    v-model="frame"
                    ref="scriptTag"
                  rows="4"
                ></textarea>
                  <button type="button" class="btn btn-primary pull-right" @click="copyCode()">
                    {{$t('copyCode')}}
                </button>
              </div>

            </div>

        </modal>
    </span>
</template>

<script>
    import ArticleApi from '../kb/article-api';
    import { Modal } from 'vue-2-bootstrap-3'
    import i18n from '../../locales/en/components/export.json';

    export default {
        components : {Modal},
        props:['getQuery', 'tokenReader', 'userStatus','chDocumentId'],
        data:  () => {
            return {
                loading        : false,
                open           : false,
                emailRequired  : false,
                domainRequired : false,
                shareType      :'link',
                frame          :'',
                domain         :'',
                query          :'',
                type           :'',
                pageUrl        :location.href,
                iframeCommunicationReceived : false,
                documentId      :'',
                sendResponse    :'',
                email           :'',
            }
        },
        created(){
            this.ArticleApi = new ArticleApi(this.tokenReader);
            console.log(this.ArticleApi);
        },
        async mounted() {
        },
        methods: {
            async openMpdel(){
                const isLogin = await this.userStatus();
                if(!isLogin) {
                    this.open = false;
                    return;
                } else {
                    this.open = true;
                    return true;
                }
            },
            async onShowDialog() {
                this.emailRequired = false;
                this.domainRequired = false;
                this.shareType = 'link';
                this.populateData();
            },
            async populateData(){
                const {query, type} = await this.getQuery();
                this.query = query;
                this.type = type;
                const origin = document.location.origin;

                if(this.type == 'document'){
                    this.pageUrl = origin+"/"+this.$locale+"/database/"+this.query.identifier;
                }
                if(this.type == 'searchResults'){
                    this.pageUrl = origin+"/"+this.$locale+"/search/"+this.query;
                }
                if(this.type == 'countryProfile'){
                   // this.storageType = "ch-country-profile";
                    this.pageUrl = origin+"/"+this.$locale+"/countries/"+this.query;
                }
            },
            async send() { // for testing check network call
                this.emailRequired = false;
                if (!this.email) {
                    this.emailRequired = true;
                    return;
                }
                this.loading = true;
                try{

                  let params = {};
                  console.log("query",this.query)
                  if(this.type == 'document') {
                    params = {
                      "storageType" : "ch-document",
                      "expiry" : "2022-10-22T09:07:42.633Z",
                      "forPdf" : false, "sharedBy" : this.query.submittedBy.userID,
                      "sharedWith" : {
                        "link" : true,
                        "emails" : this.email.toString().replace( /\s*\,\s*/g, "," ).trim()
                      },
                      "sharedData" : {
                        "identifier" : this.query.identifier,
                        "restrictionField" : "workingDocumentID", "restrictionFieldValue" : "228966",
                        "referenceFields" : [], "realm" : this.query.Realm
                      }, "urlHash" : this.pageUrl,
                      "meta" : {
                        "modifiedBy" : this.query.updatedBy.userID,
                        "createdBy" : this.query.createdBy.userID,
                        "modifiedOn" : this.query.updatedOn,
                        "createdOn" : this.query.createdOn,
                        "version" : this.query.revision
                      }
                    };
                  }
                  if(this.type == 'searchResults') {
                    params = {
                      "storageType" : "ch-search-result",
                      "expiry" : "2022-10-22T09:07:42.633Z",
                      "sharedData" : {
                        "id" : this.query,
                      },
                      "sharedWith" : {
                        "link" : true,
                        "emails" : this.email.toString().replace( /\s*\,\s*/g, "," ).trim()
                      },
                     "urlHash" : this.pageUrl
                    };
                  }
                    if(this.type == 'countryProfile') {
                        params = {
                            "storageType" : "ch-country-profile",
                            "expiry" : "2022-10-22T09:07:42.633Z",
                            "sharedData" : {
                                "code" : this.query,
                            },
                            "sharedWith" : {
                                "link" : true,
                                "emails" : this.email.toString().replace( /\s*\,\s*/g, "," ).trim()
                            },
                            "urlHash" : this.pageUrl
                        };
                    }
                  const response = await this.ArticleApi.shareData( params );

                if (response) {
                  console.log("res",response)
                  this.sendResponse = "Email send successfully!";
                  this.email = "";
                } else{
                  this.sendResponse = "Error in sending email";
                }
            } catch(err) {
            } finally {
                this.loading = false;
            }
            },
            async embed(){
              console.log("this", this.query);
              if(typeof this.chDocumentId == 'function'){
                this.documentId = await this.chDocumentId();
              }
                this.domainRequired = false;
                this.frame='';
                if(!this.domain) {
                    this.domainRequired = true;
                    return;
                }
                const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
                if (!regexp.test(this.domain)) {
                    this.domainRequired = true;
                    return;
                }
                this.loading      = true;
                try {
                  let scriptTag = this.$refs.domainTag.getAttribute('data-script');
                  console.log("domainTag",scriptTag)
                  if(this.type == 'document') {
                    this.frame = `${scriptTag}<div class="scbd-ch-embed" data-type="record" data-record-id="${this.documentId}" width="100%"></div>`
                  }
                  if(this.type == 'searchResults') {
                    this.frame = `${scriptTag}<div class="ch-search-result" data-type="Search" data-record-id="${this.query}" width="100%"></div>`
                  }
                  if(this.type == 'countryProfile') {
                    this.frame = `${scriptTag}<div class="ch-country-profile" data-type="Country-profile" data-record-id="${this.query}" width="100%"></div>`
                  }
                } catch (err) {
                } finally {
                    this.loading = false;
                }
            },

            sendRecord(){
                this.emailRequired = false;
                this.domainRequired = false;
                if(this.shareType == 'email')
                    this.send();
                    else
                    this.embed();

            },
            copyCode(){
                try {
                    this.$refs.scriptTag.select();
                    let successful = document.execCommand('copy');
                    if (!successful) throw successful;
                } catch (err) {
                } finally {
                }
            },
            copyLink(){
                try {
                    this.$refs.link.select();
                    let successful = document.execCommand('copy');
                    if (!successful) throw successful;
                } catch (err) {
                } finally {
                }
            },
            closeDialog(){
                this.open = false;
            }
        },
        i18n: { messages:{ en: i18n }}
    }
</script>

<style>
    .share-body{
        margin: auto 10%;
    }
    .input-option {
      margin-right: -15px;
      margin-left: -15px;
    }
    .input-option input, .input-option textarea  {
        width: 100%;
        padding: 12px;
        margin-top: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        margin-bottom: 16px;
        resize: vertical;
        display: block;
    }
     label.heading {
        display: block;
        font-weight: normal;
        margin-top: 15px;
        color: #000;
    }
    .share-body .icon-list {
        padding-bottom: 10px;
        cursor: pointer;
        margin-left: -25px;
        margin-top: -5px;
    }

    .share-body .icon-list i{
        color: #fff;
        opacity: 0.7;
        margin-top: 17px;
    }
    .share-body .icon-list label{
        display: block;
        color: #fff;
        opacity: 0.7;
        font-weight: 500;
        font-weight: 500;
        margin-top: 18px;
        margin-left: -5px;
        font-size: 10px;
    }
    .share-body .icon-list label:hover, .share-body .icon-list .selected label{
        opacity: 1;
        margin-top: 18px;
    }
    .share-body .icon-list .selected i{
        cursor: pointer;
        color: #000;
        opacity:1;
        margin: 6px 2px 2px;
    }
    .share-body .icon-list .selected .icon-with-labels{
        width: 36px;
        height: 36px;
        border-radius: 30px;
        background-color: #e1f0f5;
        padding: 6px;
        margin-top:5px;
    }
    .share-body .icon-list .icon-with-labels.embed{
      margin-left: 2px;
    }
    .share-body .icon-list .selected .icon-with-labels.embed{
        margin-left: -10px
    }
    #share-modal {
        width: 520px;
        border-radius: 10px;
        margin: 0 auto;
        margin-top: 20px;
        height: fit-content;
    }
    #share-modal .modal-dialog{
        width:440px;
    }
    #share-modal .modal-body{
        background-color: #428bca;
        padding-bottom: 40px;
        border-radius: 0px 0px 4px 4px;
    }
    .share-link.web-site{
        padding-bottom: 20px;
        margin-top: 30px;
    }
    .share-link input {
        font-size: 17px;
        border: 1px solid grey;
        float: left;
        width: 77%;
        background: #f1f1f1;
        border-radius: 4px 0px 0px 4px;
        padding: 5px;
    }
    .share-link button.disabled {
        pointer-events:none;
        cursor: not-allowed;
    }
    .share-link button {
        float: left;
        width: 23%;
        padding: 10px;
        background: #E1F0F5;
        color: #000;
        font-size: 17px;
        border: 1px solid grey;
        border-left: none;
        cursor: pointer;
        border-radius: 0px 4px 4px 0px;
        padding: 5px;
    }
    #share-modal .modal-footer{
      padding: 0;
      border: 0;
    }
    #share-modal .modal-header{
        padding: 8px;
        font-size: 12px;
    }
    /*#share-modal .modal-footer .shared-footer button{*/
    /*  margin: 5px 20px;*/
    /*}*/
    #share-modal .modal-header .modal-title {
      margin-left: 10px;
      font-size: 16px;
      color: #000;
    }

    #share-modal .modal-header .close {
      float: right;
      margin: -22px 5px;
      font-size: 15px;
      cursor: pointer;
      color: #646464;
      opacity: 0.7;
    }

    #share-modal .success-message {
      border: 1px solid;
      margin-top: 20px;
      background-color: #fff;
      padding: 5px;
    }
</style>
