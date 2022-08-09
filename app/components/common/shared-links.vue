<template>
	<div class="p-4 bg-white shared-links">
		<div class="register-content-header bg-secondary text-white">
			<div class="p-2">
				<h3>{{ $t("mySharing") }}</h3> </div>
		</div>
		<table class="table mt-4">
			<thead>
				<tr>
					<th scope="col">#</th>
                    <th scope="col">{{ $t("createdOn") }}</th>
					<th scope="col" class="d-none d-sm-table-cell">{{ $t("expiry") }}</th>
                    <th scope="col">{{ $t("status") }}</th>
                    <th scope="col" class="d-none d-sm-table-cell">{{ $t("sharedDetail") }}</th>
					<th scope="col" colspan="4">{{ $t("actions") }}</th>	
				</tr>
			</thead>
			<tbody>
				<tr v-for="(link, index) in sharedLinks.slice().reverse()">
					<th scope="row">{{index+1}}</th>
                    <td colspan="1">{{link.meta.createdOn|formatDate}}</td>
                    <td colspan="1" class="d-none d-sm-table-cell">{{link.expiry|formatDate}}</td>
					<td colspan="1"> 
                        <span v-if="hasStatus('active', link)" class="action badge bg-success">{{ $t("active") }}</span>
                        <span v-if="hasStatus('expired', link)" class="action badge bg-warning text-dark">{{ $t("expired") }}</span>
                        <span v-if="hasStatus('revoked', link)" class="action badge bg-danger">{{ $t("revoked") }}</span>
                    </td>
                    <td colspan="1" class="d-none d-sm-table-cell">
                        <span v-if="hasStorageType('document', link)" style="display:initial" class="action badge bg-info">{{ $t("document") }}</span>
                        <span v-if="hasStorageType('search', link)" style="display:initial" class="action badge bg-primary">{{ $t("search") }}</span>
                        <span v-if="hasStorageType('country-profile', link)" style="display:initial" class="action badge bg-secondary">{{ $t("countryProfile") }}</span>
                        <span v-if="link.shareType =='embed' && link.sharedData.domain">
                            {{ $t("embeddedIn") }} {{link.sharedData.domain}}
                        </span>
                        <span v-if="link.shareType =='email' && link.sharedWith.emails" style="display:initial">
                            <span>{{ $t("emailedTo") }} </span> 
                            <span> {{link.sharedWith.emails.split(',')[0]}}</span>
                            <span v-if="link.sharedWith.emails.split(',').length>1">
                                <a data-bs-toggle="collapse" class="show-emails" :href="'#toggle'+index" role="button" aria-expanded="false">
                                    <i class="bi bi-chevron-down"></i>
                                    <i class="bi bi-chevron-up"></i>
                                </a>                        
                                <div class="mt-1 email-links collapse" :id="'toggle'+index"> 
                                        <ul class="ms-3" v-if="link.sharedWith.emails.length > 0">
                                            <li v-for="(email, e) in link.sharedWith.emails.split(',')" v-if="e!=0">
                                                <span>{{email}}</span>
                                            </li>
                                        </ul>
                                </div>
                            </span>
                        </span>
                    </td>

        			<td colspan="4">
                        <div class="input-group" >
                            <input ref="textToCopy" type="text" width="100%" class="highlight form-control" :value="getUrl(link.urlHash)" disabled readonly/>
                            <div class="btn-group" role="group" aria-label="Basic outlined example">
                                <a type="button" class="btn btn-outline-primary rounded-0" :href="getUrl(link.urlHash)" target="_blank"><i class="bi bi-link"> </i> 
                                    <span class="d-none d-sm-inline-block">{{ $t("Open") }}</span>
                                </a>
                                    <span v-if="!link.revoked" type="button" class="btn btn-outline-primary" @click="copyCode(link.urlHash)">
                                        <i class="bi bi-clipboard pe-1"> </i> <span class="d-none d-sm-inline-block">{{ $t("copy") }}</span>
                                    </span>
                                    <span  v-if="!link.revoked && hasStorageType('search', link)" type="button" class="btn btn-outline-primary">
                                        <a :href="`/register/user-preferences/?id=${link.sharedData.recordKey}`" target="_blank"><i class="bi bi-pencil-square"> </i> 
                                            <span class="d-none d-sm-inline-block">{{ $t("edit") }}</span></a>
                                    </span>
                                    <span  v-if="!link.revoked && link.sharedData.domain" data-bs-toggle="collapse" :href="'#embed'+index" role="button" aria-expanded="false" class="btn btn-outline-primary"
                                        @click="embed(link.storageType, link.urlHash)">
                                        <i class="bi bi-code-slash pe-1"> </i> <span class="d-none d-sm-inline-block">{{ $t("embed") }}</span>
                                    </span>
                                    <span v-if="!link.revoked && hasStatus('active', link)" disabled="link.status=='revokingLink'" type="button" class="btn btn-outline-secondary" @click="revokeLink(link)">
                                        <i class="spinner-border pe-2" v-if="link.status=='revokingLink'"></i>
                                        <i class="bi bi-hand-thumbs-down-fill pe-1"> </i> <span class="d-none d-sm-inline-block">{{ $t("revoke") }}</span>
                                    </span>
                            </div>  
                        </div>
                        <div v-if="!link.revoked && link.sharedData.domain" class="pt-2 collapse input-group" :id="'embed'+index">
                            <input :id="'embedText'+link.urlHash" type="text" width="100%" class="highlight form-control" :value="`<script src='https://bch.cbddev.xyz/widgets.js'></script><div class='scbd-chm-embed' data-type='chm-search-result' data-access-key='${link.urlHash}' width='100%'></div>`" />
                            <span type="button" class="btn btn-primary" @click="copyCode(link.urlHash, true)">
                                        <i class="bi bi-clipboard pe-1"> </i> <span class="d-none d-sm-inline-block">{{ $t("copyEmbedCode") }}</span>
                            </span>
                        </div>
					</td>
                    
				</tr>
			</tbody>
		</table>
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

 <style>
    @import url('app/css/vue/kb/style.css');
</style>  

<script>
    import DocumentShareApi from "~/api/document-share";
    import i18n from "../../app-text/components/common/shared-links.json"; 
    import '../kb/filters';
    import { Modal, Toast } from "bootstrap";
    export default {
        name:'mySharing',
        props: ["tokenReader"],
        data:  () => {
            return {
                toast:null,
                sharedLinks: [],
            }
        },
        created() {
            this.documentShareApi = new DocumentShareApi(this.tokenReader);
        },
        async mounted() {
            this.toast = new Toast(this.$refs.clipboardToast);
            const params = {
                    q: {
                    storageType : { $in : ["chm-document","chm-search-result","chm-country-profile"]}
                }
           } 
           this.sharedLinks = await this.documentShareApi.querySharedDocuments(params);
        },
        methods: {
            getUrl(hash){
                return location.origin + '/database/share/' + hash;
            },

            copyCode(hash, isEmbed){
                const el = document.createElement('textarea');  
                if(isEmbed){
                    const embededValue = document.getElementById("embedText"+hash);
                    el.value = embededValue.value;
                } else{
                    el.value = this.getUrl(hash);;    
                }                                   
                el.setAttribute('readonly', '');                
                el.style.position = 'absolute';                     
                el.style.left = '-9999px';                      
                document.body.appendChild(el);                  
                const selected =  document.getSelection().rangeCount > 0  ? document.getSelection().getRangeAt(0) : false;                                    
                el.select();                                    
                document.execCommand('copy');                   
                document.body.removeChild(el);                  
                if (selected) {                                 
                    document.getSelection().removeAllRanges();    
                    document.getSelection().addRange(selected);   
                }
                this.toast.show();
            },

            hasStatus(status, link){                
                switch (status) {
                    case 'active':
                        return !link.revoked && (!link.expiry || new Date(link.expiry) > new Date())
                        break;                    
                    case 'expired':
                        return new Date(link.expiry) < new Date()
                        break;
                    case 'revoked':
                        return link.revoked;
                        break;
                    default:
                        break;
                }
            },

            hasStorageType(shareType, link){                
                switch (shareType) {
                   case 'document':
                        return link.storageType == 'chm-document';
                        break;
                    case 'search':
                        return link.storageType == 'chm-search-result';
                        break;                    
                    case 'country-profile':
                        return link.storageType =='chm-country-profile';
                        break;
                    default:
                        break;
                }
            },

            async revokeLink(link){
                const revoke = await this.documentShareApi.revoke(`${link._id}`);
                // ToDo: Api should Response on revoked, then apply if condition here
                this.sharedLinks = this.sharedLinks.map(list => {
                    if (list._id == link._id) {
                        return {...list, revoked: true};
                    }
                    return list;
                });
            },
            embed(storageType, urlHash){
                this.embededLink = `${this.$realm.baseURL}/${this.$locale}/share/link/${storageType}/${urlHash}`;
            }
        },
        i18n: { messages:{ en: i18n }} 
        
    }
</script>