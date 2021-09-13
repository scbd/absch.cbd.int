<template>
    <span>
        <a rel="noopener" href="#" class="table-export-button" @click="open=true">
            Share
            <i class="fa fa-paper-plane" aria-hidden="true"></i>
        </a>
        <modal v-model="open" size="lg" @show="onShowDialog" ref="modal" id="share-modal">
           <div slot="header">
                <h3 class="modal-title">
                    {{$t('shareDialogTitle')}}
                </h3>
            </div>
            <div class="share-body">
                <div v-if="loading" class="alert alert-info">
                    <i class="fa fa-spin fa-spinner" v-if="loading" ></i> {{$t('processing')}}
                </div>
                 <div class="row">
                    <div class="col-md-3">{{$t('embed')}}</div>
                    <div class="col-md-9">{{$t('send')}}</div>
                </div>
                <div class="row">
                    <div class="col-md-3"><a @click="shareType='embed'" :disabled="loading"><i class="fa fa-code fa-lg" aria-hidden="true"></i></a></div>
                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-md-3">
                                <a @click="shareType='email'" :disabled="loading"><i class="fa fa-envelope-o fa-lg" aria-hidden="true"></i></a>
                                <a><i class="fa fa-twitter fa-lg" aria-hidden="true"></i></a>
                                <a><i class="fa fa-facebook fa-lg" aria-hidden="true"></i></a>
                                <a><i class="fa fa-whatsapp fa-lg" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </div>
                    </div>
              <div class="input-option" v-if="shareType =='email'">
                 <input
                        type="email"
                        v-model="email"
                        name="name"
                        placeholder="Email(s)"
                 >
                 <label class="color-red" v-if="emailRequired">{{$t('domainError')}}</label>
              </div>
              <div class="input-option" v-if="shareType =='embed'">
                  <input
                    type="text"
                    v-model="domain"
                    name="name"
                    placeholder="website url"
                  >
                 <label class="color-red" v-if="domainRequired">{{$t('domainError')}}</label>
              </div>

            </div>
            <div slot="footer">
                <button type="button" class="btn btn-default" aria-label="Close" @click="closeDialog()" :disabled="loading">{{$t('cancel')}}</button>
              <button type="button" class="btn btn-primary pull-left" @click="sendRecord()" :disabled="loading">
                    {{$t(shareType=='email'?'Send':'Embed')}}
                </button>
            </div>
        </modal>
    </span>
</template>

<script>
    import CommonApi from './common-api';
    import { Modal } from 'vue-2-bootstrap-3'
    import i18n from '../../locales/en/components/export.json';
    //TODO: remove it
    // "shareType": "email | embed",
    // "type": "searchResults | document | countryProfile | article ",
    // "searchQuery": "", //only required where Type is searchResults,
    // "documentID": "", //only required where Type is document,
    // "countryCode": "", //only required where Type is countryProfile,
    // "articleID": "", //only required where Type is article
    // "emails": "", //only required where shareType is email
    // "domain": "", //only required where shareType is embed

    export default {
        components : {Modal},
        props:['getQuery'],
        data:  () => {
            return {
                loading        : false,
                open           : false,
                emailRequired  : false,
                domainRequired : false,
							  shareType      :'email',
                query          :'',
                type           :''
            }
        },
        created(){
            this.CommonApi = new CommonApi();
        },
        async mounted() {
        },
        methods: {
                async onShowDialog(){
                this.emailRequired = false;
                this.domainRequired = false;
                this.shareType = 'email';
                const {type, query } = await this.getQuery();
                this.query = query
                this.type     = type;
            },
            async send(){ // for testing check network call
                this.emailRequired = false;
                if(!this.email) {
                    this.emailRequired = true;
                    return;
                }
                this.loading      = true;
                const param = {"$shareType": "email", "$email": this.email, "$type": this.type, "&query": this.query};
                const response = await this.CommonApi.queryShare(param);
                if((response || []).length) {
                //
                }
                this.loading = false;
            },
            async embed(){// for testing check network call
                this.domainRequired = false;
                if(!this.domain) {
                    this.domainRequired = true;
                    return;
				}
                this.loading      = true;
                const param = {"$shareType": "embed", "$domain": this.domain, "$type": this.type, "&query": this.query};
                const response = await this.CommonApi.queryShare(param);
                if((response || []).length) {
                //
                }
                this.loading = false;
            },

            sendRecord(){
                this.emailRequired = false;
                this.domainRequired = false;
                if(this.shareType == 'email')
                    this.send();
                    else
                    this.embed();

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
    .input-option input {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        margin-top: 15px;
        margin-bottom: 16px;
        resize: vertical;
        display: block;
    }
</style>
