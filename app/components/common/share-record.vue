<template>
    <span>
        <a rel="noopener" href="#" class="table-export-button" @click="open=true">
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
                <div class="row share-link" v-if="shareType =='link'">
                    <input
                        type="url"
                        v-model="pageUrl"
                        ref="link"
                    >
                  <button @click="copyLink()" >Copy</button>
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
              <div class="input-option" v-if="shareType =='email'">
                  <label class="heading">{{$t('email')}}</label>
                 <input
                        type="email"
                        v-model="email"
                        placeholder="Email(s)"
                 >
                 <label class="color-red" v-if="emailRequired">{{$t('domainError')}}</label>
              </div>
                <div class="input-option" v-if="shareType =='embed'">
                  <label class="heading">{{$t('domain')}}</label>
                  <input
                      v-model="domain"
                      type="url"
                      placeholder="https://example.com"
                  >
                 <label class="color-red" v-if="domainRequired">{{$t('domainError')}}</label>
              </div>

          <div class="input-option" v-if="shareType =='embed' && frame">
                <textarea
                  ref="text"
                  v-model="frame"
                  rows="4"
                ></textarea>
                  <button type="button" class="btn btn-primary pull-right" @click="copyCode()">
                    {{$t('copyCode')}}
                </button>
              </div>
            </div>
            <div slot="footer" v-bind:class="{ 'shared-footer': (shareType != 'link')}" v-if="shareType != 'link'">
              <button type="button" class="btn btn-primary pull-left" @click="sendRecord()" :disabled="loading">
                    {{$t(shareType=='email'?'Send':'Embed')}}
                </button>
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
        props:['getQuery', 'tokenReader'],
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
            }
        },
        created(){
            console.log(this.tokenReader);
            this.ArticleApi = new ArticleApi(this.tokenReader);
            console.log(this.ArticleApi);
        },
        async mounted() {
        },
        methods: {
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
                    this.storageType = "ch-document";
                    this.pageUrl = origin+"/"+this.$locale+"/database/"+this.query.identifier;
                }
                if(this.type == 'search'){
                    this.storageType = "ch-search-result";
                    this.pageUrl = origin+"/"+this.$locale+"/search/"+this.query;
                }
                if(this.type == 'countryProfile'){
                    this.storageType = "ch-country-profile";
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
                //const emails = this.email.toString().replace(/\s*\,\s*/g, ",").trim().split(",");
                const param = {"shareType": "email", "email": this.email.toString().replace(/\s*\,\s*/g, ",").trim(), "type": this.type, "query": this.query};
                try{
                  // const body = {
                  //   storageType: this.storageType,
                  //   sharedWith:{"emails":emails},
                  //   urlHash: this.pageUrl
                  // };
                  const body = { //TODO: expiry and restrictionFieldValue is not available
                    "storageType":"ch-document",
                    "expiry":"2021-10-22T09:07:42.633Z",
                    "forPdf":false,"sharedBy":this.query.submittedBy.userID,
                    "sharedWith":{"link":true,"emails":this.email.toString().replace(/\s*\,\s*/g, ",").trim()},
                    "sharedData":{"identifier":this.query.identifier,
                      "restrictionField":"workingDocumentID","restrictionFieldValue":"228966",
                      "referenceFields":[],"realm":this.query.Realm},"urlHash":this.pageUrl,
                    "meta":{"modifiedBy":this.query.updatedBy.userID,"createdBy":this.query.createdBy.userID,"modifiedOn":this.query.updatedOn,"createdOn":this.query.createdOn,"version":this.query.latestRevision}};
                const response = await this.ArticleApi.shareData(body);
                if ((response || []).length) {
                    console.log(response)
                }
            } catch(err) {
            } finally {
                this.loading = false;
            }
            },
            embedIFrame(options){

                if(!options.src)
                    return;

                var iframe = document.createElement('iframe');
                iframe.setAttribute('name', Math.floor((1 + Math.random()) * 0x10000).toString(16));
                iframe.setAttribute('src', options.src);
                iframe.setAttribute('width', options.width);
                iframe.setAttribute('height', options.height);
                iframe.setAttribute('frameborder', '0');
                this.registerIframeCommunication(iframe, {type:'getClientHeight', iframe:iframe.name});
                window.addEventListener('message', function(evt){
                    this.iframeCommunicationReceived = true;
                    if(evt.data){
                        var data = JSON.parse(evt.data);
                        if(data.type == 'setClientHeight' && data.iframe == iframe.name){
                            iframe.setAttribute('height', data.height||iframe.height);
                        }
                    }
                })
            },
            registerIframeCommunication(iframe, data){
                let that = this;
                if(!this.iframeCommunicationReceived){
                    setTimeout(function(){
                        that.frame = iframe.src;
                        
                        //TODO iframe.contentWindow.postMessage give error
                        iframe.contentWindow.postMessage(JSON.stringify(data), that.domain);//'http://absch-widget.cbddev.xyz:2010');
                      //   this.registerIframeCommunication(iframe, data) //TODO : whe need to repeat

                    }, 500);
                }
            },
            async embed(){
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
                 const param = {"shareType": "embed", "domain": this.domain, "type": this.type, "query": this.query};
                try {
                // TODO: const response = await this.ArticleApi.queryShare(param);
                // if((response || []).length) {
                // in success case create emebede string
                // setTimeout(()=> {
                //     this.pageUrl += ( this.pageUrl.match( /[\?]/g ) ? '&' : '?' )+'embed=true';
                //     this.frame = '<iframe src="' + this.pageUrl + '" width="100%" height="100%"></iframe>';
                // },100);
                // }
                    this.pageUrl += ( this.pageUrl.match( /[\?]/g ) ? '&' : '?' )+'embed=true';
                    let iframeSrc = this.pageUrl;
                    var width = '300';
                    var height = '500';

                    var options = {
                        src : iframeSrc,
                        width : width,
                        height: height
                    }
                    this.embedIFrame(options)
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
                    this.$refs.text.select();
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
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        margin-bottom: 16px;
        resize: vertical;
        display: block;
    }
    .input-option label.heading {
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
    .share-link {
        padding-bottom: 20px;
        margin-top: 60px;
    }
    .share-link input {
        font-size: 17px;
        border: 1px solid grey;
        float: left;
        width: 80%;
        background: #f1f1f1;
        border-radius: 4px 0px 0px 4px;
        padding: 5px;
    }

    .share-link button {
        float: left;
        width: 20%;
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
    #share-modal .modal-footer .shared-footer button{
      margin: 5px 20px;
    }
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

</style>
