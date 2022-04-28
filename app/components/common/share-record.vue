<template>
    <div id="shareRecord">
        <a id="shareSearchDomId" rel="noopener" href="#" class="table-export-button" @click="openModel()">
            <i class="fa fa-paper-plane" aria-hidden="true"></i> {{$t('share')}}
        </a>
        <modal v-model="open" size="lg" @show="onShowDialog" ref="modal" id="share-modal">
           <div slot="header">
                <h3 class="modal-title">
                     {{$t('share')}}
                </h3>
             <span class="close" @click="closeDialog()">x</span>
            </div>
            <div class="share-body">
               
                <div class="row icon-list">
                    <div @click="loadTabData('link')" :disabled="loading" class="col-md-2" v-bind:class="{ selected: sharedData.type=='link'}">
                        <div class="icon-with-labels">
                            <i class="fa fa-link fa-lg" aria-hidden="true"></i>
                            <label>{{$t('link')}}</label>
                        </div>
                    </div>
                     <div @click="loadTabData('embed')" :disabled="loading" class="col-md-2" v-bind:class="{ selected: sharedData.type=='embed', 'disabled': (sharedData.shareType == 'searchResults' && !sharedData.shareIdentifier)}">
                        <div class="icon-with-labels embed">
                            <i class="fa fa-code fa-lg" aria-hidden="true"></i>
                             <label>{{$t('embed')}}</label>
                        </div>
                    </div>
                    <div @click="loadTabData('email')" :disabled="loading" class="col-md-2" v-bind:class="{ selected: sharedData.type=='email', 'disabled': (sharedData.shareType == 'searchResults' && !sharedData.shareIdentifier)}">
                        <div class="icon-with-labels">
                            <i class="fa fa-envelope-o fa-lg" aria-hidden="true"></i>
                            <label>{{$t('email')}}</label>
                        </div>
                    </div>
                </div>
                {{sharedData}}
                <div class="row">
                    <div class="col-md-12">
                        <div v-if="loading && sharedData.success" class="alert alert-success">
                           Email send successfully.
                        </div>
                        <div v-if="loading" class="alert alert-info">
                            <i class="fa fa-spin fa-spinner" v-if="loading" ></i> {{$t('processing')}}
                        </div>
                        <div v-if="error" class="alert alert-error">
                            {{error}}
                        </div>
                    </div>
                </div>
                <div class="row" v-if="sharedData.type=='link'">
                    <div class="col-md-12 padding-left-0">
                        <div class="link-container">
                            <p class="link" id="shareLink">{{sharedData.link}}</p>
                            <button class="copy-btn" @click="copy('shareLink')">copy</button>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="sharedData.type=='email'">
                    <div class="col-md-12 padding-left-0" v-if="!sharedData.email || !isValidEmail">
                        <div class="alert alert-info">Please enter email(s) seprated by , or ; </div>
                    </div>
                    <div class="col-md-12 padding-left-0">
                        <div class="link-container">
                            <input type="email" class="input-email" multiple pattern="^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},*[\W]*)+$" v-model="sharedData.email" placeholder="Email(s)" >
                            <button class="email-btn" @click="shareLinkMail()" :disabled="loading || !sharedData.email"   
                                v-bind:class="{ 'disabled': loading || !sharedData.email}">send</button>
                        </div>
                    </div>
                </div>

                <div class="row" v-if="sharedData.type=='embed'">
                    <div class="col-md-12 padding-left-0" v-if="!sharedData.domain || !isValidDomain">
                        <div class="alert alert-info">Please enter domain where you intent to embed </div>
                    </div>
                    <div class="col-md-12 padding-left-0">
                        <div class="link-container">
                            <input v-model="sharedData.domain" type="url" placeholder="cbd.int">
                            <button class="email-btn" @click="generateEmbedCode()" :disabled="loading || !sharedData.domain || isValidDomain"   
                                v-bind:class="{ 'disabled': loading || !sharedData.domain || !isValidDomain}" @change="onDomainChange">Generate Code</button>
                        </div>
                    </div>
                     <div class="col-md-12 padding-left-0" ng-if="sharedData.code">
                         <code>{{sharedData.code}}</code>
                     </div>
                </div>
            </div>

        </modal>
    </div>
</template>

<script>
    import DocumentShareApi from '~/api/document-share';
    import SuscriptionsApi from '~/api/subscriptions';
    import { Modal } from 'vue-2-bootstrap-3'
    import i18n from '../../locales/en/components/export.json';

export default {
    components: {
        Modal
    },
    props: ['getQuery', 'tokenReader', 'userStatus', 'generateLink'],
    data: () => {
        return {
            loading          : false,
            open             : false,
            isValidEmail    : true,
            isValidDomain   : true,
            sharedData       : {
                email   : undefined
            },
            // shareType        : 'link',
            // embedScript      : '',
            // domain           : '',
            // recordKey        : '',
            // type             : '',
            // shareLink        : '',
            // sendResponse     : '',
            // email            : '',
            // storageType      : '',
            // documentShareId  : ''
        }
    },
    created() {
        this.documentShareApi = new DocumentShareApi(this.tokenReader);
        this.suscriptionsApi  = new SuscriptionsApi (this.tokenReader);
    },
    async mounted() {},
    methods: {
        async openModel() {
            const token = await this.tokenReader();
            if (!token) {
                await this.userStatus();
                this.open = false;
                return;
            } else {
                this.open = true;
                return true;
            }
        },
        async onShowDialog() {
            this.loadTabData();
            // this.populateData();
        },
        loadTabData(tab){
            this.sharedData         = { 
                type : tab||'link',
                success : undefined,
                email:undefined,
                link:undefined
            };
            console.log(this.sharedData);
            const {recordKey, type} = this.getQuery(); //TODO: change, GetQuery is getting details about what type of share it is (id and type search-relesult/document)
          
            this.sharedData.shareIdentifier = recordKey;
            this.sharedData.shareType = type;

            if (this.sharedData.shareType == 'document') {
                this.sharedData.storageType = "ch-document";
                this.sharedData.link   = `${this.$realm.baseURL}/${this.$locale}/database/${this.sharedData.shareIdentifier}`;
            }
            if (this.sharedData.shareType == 'searchResults') {
                this.sharedData.storageType = "ch-search-result";
            }
            if (this.sharedData.shareType == 'countryProfile') {
                this.sharedData.storageType = "ch-country-profile";
                this.sharedData.link   = `${this.$realm.baseURL}/${this.$locale}/countries/${this.sharedData.shareIdentifier}`;
            }
            console.log(this.sharedData);
        },
        closeDialog() {
            this.open = false;
        },
        copy(id){
            const r = document.createRange();
            r.selectNode(document.getElementById(id));
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(r);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
        },
        async shareLinkMail(){
            if (!this.sharedData.email || !(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(this.sharedData.email)) {
                this.isValidEmail = false
                return;
            }
            this.isValidEmail = true
            try {
                this.loading = true;
                const emailLink = {
                    "storageType": this.sharedData.storageType,
                    "sharedData": {
                        "code": this.sharedData.recordKey,
                    },
                    "sharedWith": {
                        "link": true,
                        "emails": this.sharedData.email
                    }
                };
                const response = await this.documentShareApi.shareDocument(emailLink);

                if (response) {
                    this.sharedData.success = true;
                    this.sharedData.email = undefined;
                } else {
                    this.error = "Error sending email, please try again.";
                }
            } catch (err) {
                this.error = err;
            } finally {
                this.loading = false;
            }
        },
        async generateEmbedCode(){
            this.onDomainChange();
            if(!this.isValidDomain)
                return;

            this.loading = true;

            const param = {
                "storageType": this.storageType,
                "forPdf": false,
                "sharedWith": {
                    "link": true,
                },
                "sharedData": {
                    "domain": this.domain,
                    "shareType": "embed",
                    "searchQueryId": this.recordKey
                }
            };
            try {
                if (this.documentShareId == '') {
                    const shareDetails = await this.documentShareApi.shareDocument(param);
                    this.documentShareId = shareDetails?.id
                }
                if (this.documentShareId) {
                    setTimeout(() => {
                        let scriptTag = this.$refs.domainTag.getAttribute('data-script');
                        if (this.type == 'document') {
                            this.embedScript = `${scriptTag}<div class="scbd-ch-embed" data-type="record" data-record-id="${this.recordKey}" data-document-share-id="${this.documentShareId}" width="100%"></div>`
                        } else if (this.type == 'searchResults') {
                            this.embedScript = `${scriptTag}<div class="ch-search-result" data-type="search-result" data-record-id="${this.recordKey}" data-document-share-id="${this.documentShareId}" width="100%"></div>`
                        } else if (this.type == 'countryProfile') {
                            this.embedScript = `${scriptTag}<div class="ch-country-profile" data-type="country-profile" data-record-id="${this.recordKey}" data-document-share-id="${this.documentShareId}" width="100%"></div>`
                        }
                    }, 100);
                }
            } catch (err) {
                this.sendResponse = err;
            } finally {
                this.loading = false;
            }
        },
        onDomainChange(){
            const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            if (!regexp.test(this.sharedData.domain)) {
                this.isValidDomain = false;
                return;
            }
            this.isValidDomain = true
        }
    },
    i18n: {
        messages: {
            en: i18n
        }
    }
} 
</script>

<style>

    #shareRecord .share-body{
        margin: auto 10%;
    }
    #shareRecord .input-option {
      margin-right: -15px;
      margin-left: -15px;
    }
    #shareRecord .input-option input, .input-option textarea  {
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
    #shareRecord label.heading {
        display: block;
        font-weight: normal;
        margin-top: 15px;
        color: #000;
    }
    #shareRecord .share-body .icon-list {
        padding-bottom: 10px;
        cursor: pointer;
        margin-left: -25px;
        margin-top: -5px;
    }

    #shareRecord .share-body .icon-list i{
        color: #fff;
        opacity: 0.7;
        margin-top: 17px;
    }
    #shareRecord .share-body .icon-list label{
        display: block;
        color: #fff;
        opacity: 0.7;
        font-weight: 500;
        font-weight: 500;
        margin-top: 18px;
        margin-left: -5px;
        font-size: 10px;
    }
    #shareRecord .share-body .btn-labeled{
        width:100%;
        display: block;
        margin-top: 20px;
        margin-left: -10px;
    }
    #shareRecord .share-body .btn-labeled i{
        margin: 10px;
    }

    #shareRecord .share-body .icon-list label:hover, #shareRecord .share-body .icon-list .selected label{
        opacity: 1;
        margin-top: 18px;
    }
    #shareRecord .share-body .icon-list .selected i{
        cursor: pointer;
        color: #000;
        opacity:1;
        margin: 6px 2px 2px;
    }
    #shareRecord .share-body .icon-list .selected .icon-with-labels{
        width: 36px;
        height: 36px;
        border-radius: 30px;
        background-color: #e1f0f5;
        padding: 6px;
        margin-top:5px;
    }
    #shareRecord .share-body .icon-list .icon-with-labels.embed{
      margin-left: 2px;
    }
    #shareRecord .share-body .icon-list .selected .icon-with-labels.embed{
        margin-left: -10px
    }
    #shareRecord #share-modal {
        width: 520px;
        border-radius: 10px;
        margin: 0 auto;
        margin-top: 20px;
        height: fit-content;
    }
    #shareRecord #share-modal .modal-dialog{
        width:440px;
    }
    #shareRecord #share-modal .modal-body{
        background-color: #428bca;
        padding-bottom: 40px;
        border-radius: 0px 0px 4px 4px;
        padding-left: 0;
        padding-right: 0;
    }
    #shareRecord .share-link.web-site{
        padding-bottom: 20px;
        margin-top: 30px;
    }
    #shareRecord .share-link input {
        font-size: 17px;
        border: 1px solid grey;
        float: left;
        width: 77%;
        background: #f1f1f1;
        border-radius: 4px 0px 0px 4px;
        padding: 5px;
    }
    #shareRecord .share-link button.disabled, #shareRecord .share-body .icon-list .disabled {
        pointer-events:none;
        cursor: not-allowed;
    }
    #shareRecord .share-link button {
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
    #shareRecord .generate-link {
      margin: 20px -10px;
    }
    #shareRecord #share-modal .modal-footer{
      padding: 0;
      border: 0;
    }
    #shareRecord #share-modal .modal-header{
        padding: 8px;
        font-size: 12px;
    }

    #shareRecord #share-modal .modal-header .modal-title {
      margin-left: 10px;
      font-size: 16px;
      color: #000;
    }

    #shareRecord #share-modal .modal-header .close {
      float: right;
      margin: -22px 5px;
      font-size: 15px;
      cursor: pointer;
      color: #646464;
      opacity: 0.7;
    }

    #shareRecord #share-modal .success-message {
      border: 1px solid;
      margin-top: 50px;
      background-color: #fff;
      padding: 5px;
      display: block;
    }


    #shareRecord .link-container{
        transition: .5s;
        transition-delay: 0s;
        width: 100%;
        position: relative;
        height: 40px;
        display: flex;
        align-items: center;
        border-radius: 40px;
        background-color: #fff;
        overflow: hidden;
        padding: 0 10px;
    }

    #shareRecord .link{
        width: 80%;
        height: 100%;
        line-height: 40px;
        color: #000;
        margin-bottom:0px;
    }

    #shareRecord .copy-btn,.email-btn{
        position: absolute;
        right: 0;
        cursor: pointer;
        background: #000;
        color: #fff;
        border: none;
        height: 100%;
        width: 30%;
        text-transform: capitalize;
        font-size: 16px;
    }

    #shareRecord .input-email{
        width: 100%;
        border: none;
    }
    #shareRecord .email-btn.disabled{
        background: #cfcbcb!important;
    }
</style>
