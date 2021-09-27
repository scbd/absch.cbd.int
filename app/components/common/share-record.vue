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
                <div class="row icon-list">
                    <div class="col-md-3" v-bind:class="{ selected: shareType=='embed'}">
                        <a @click="shareType='embed'" :disabled="loading"><i class="fa fa-code fa-lg" aria-hidden="true"></i></a>
                    </div>
                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-md-3" v-bind:class="{ selected: shareType=='email'}">
                                <a @click="shareType='email'" :disabled="loading"><i class="fa fa-envelope-o fa-lg" aria-hidden="true"></i></a>
                                <a><i class="fa fa-twitter fa-lg" aria-hidden="true"></i></a>
                                <a><i class="fa fa-facebook fa-lg" aria-hidden="true"></i></a>
                                <a><i class="fa fa-whatsapp fa-lg" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </div>
                    </div>
              <div class="input-option" v-if="shareType =='email'">
                  <label class="heading">Email</label>
                 <input
                        type="email"
                        v-model="email"
                        placeholder="Email(s)"
                 >
                 <label class="color-red" v-if="emailRequired">{{$t('domainError')}}</label>
              </div>
                <div class="input-option" v-if="shareType =='embed'">
                  <label class="heading">Domain</label>
                  <input
                      type="text"
                      v-model="domain"
                      placeholder="website url"
                  >
                 <label class="color-red" v-if="domainRequired">{{$t('domainError')}}</label>
              </div>

              <div class="input-option" v-if="shareType =='embed' && frame">
                <textarea
                  ref="text"
                  v-model="frame"
                  rows="4"
                ></textarea>
                  <label><b>Note</b>: Copy this code and paste it in your <span v-bind="domain"><span> website</label>
                  <button type="button" class="btn btn-primary pull-right" @click="copyCode()">
                    Copy code
                </button>
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
                frame          :'',
				domain         :'',
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
            async onShowDialog() {
                this.emailRequired = false;
                this.domainRequired = false;
                this.shareType = 'email';
                const {type, query} = await this.getQuery();
                this.query = query;
                this.type = type;
            },
            async send() { // for testing check network call
                this.emailRequired = false;
                if (!this.email) {
                    this.emailRequired = true;
                    return;
                }
                this.loading = true;
                const param = {"shareType": "email", "email": this.email, "type": this.type, "query": this.query};
                try{
                const response = await this.CommonApi.queryShare(param);
                if ((response || []).length) {
                    //
                }
            } catch(err) {
            } finally {
                this.loading = false;
            }
            },
            async embed(){
                this.domainRequired = false;
                this.frame='';
                if(!this.domain) {
                    this.domainRequired = true;
                    return;
                }
                let pageUrl = location.href;
                this.loading      = true;
                 const param = {"shareType": "embed", "domain": this.domain, "type": this.type, "query": this.query};
                try {
                // TODO: const response = await this.CommonApi.queryShare(param);
                // if((response || []).length) {
                // in success case create emebede string
                if(this.type == 'document'){
                    const origin = document.location.origin;
                    pageUrl = origin+"/"+this.$locale+"/database/"+this.query[0]+"/"+this.query[1];
                }
                setTimeout(()=> {
                    pageUrl += ( pageUrl.match( /[\?]/g ) ? '&' : '?' )+'embed=true';
                    this.frame = '<iframe src="' + pageUrl + '" width="100%" height="100%"></iframe>';
                },100);
                // }
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
    }
    .share-body .icon-list a{
        color: #000;
    }
    .share-body .icon-list a:hover{
        cursor: pointer;
        color: #428bca;
    }
    .share-body .icon-list .selected a:nth-child(1) {
        color: #428bca;
    }

</style>
