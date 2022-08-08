<template>
	<div class="p-4 bg-white shared-links">
		<div class="register-content-header bg-secondary text-white">
			<div class="p-2">
				<h3>{{ $t("sharedUrls") }}</h3> </div>
		</div>
		<table class="table mt-4">
			<thead>
				<tr>
					<th scope="col">#</th>
                    <th scope="col">{{ $t("createdOn") }}</th>
					<th scope="col" class="d-none d-sm-table-cell">{{ $t("expiryStatus") }}</th>
                    <th scope="col" class="d-none d-sm-table-cell">{{ $t("sharedDetail") }}</th>
					<th scope="col" colspan="4">{{ $t("linkEmail") }}</th>	
				</tr>
			</thead>
			<tbody>
				<tr v-for="(link, index) in sharedLinks.slice().reverse()">
					<th scope="row">{{index+1}}</th>
                    <td>{{link.meta.createdOn|formatDate}}</td>
					<td class="d-none d-sm-table-cell"> <span>{{link.expiry|formatDate}}</span>
                        <span v-if="hasStatus('active', link)" class="action badge bg-primary">{{ $t("active") }}</span>
                        <span v-if="hasStatus('expired', link)" class="action badge bg-warning text-dark">{{ $t("expired") }}</span>
                        <span v-if="hasStatus('revoked', link)" class="action badge bg-danger">{{ $t("revoked") }}</span>
                    </td>
                    <td colspan="1" class="d-none d-sm-table-cell">
                        <span v-if="hasStorageType('document', link)" class="action badge bg-primary">{{ $t("document") }}</span>
                        <span v-if="hasStorageType('search', link)" class="action badge bg-warning text-dark">{{ $t("search") }}</span>
                        <span v-if="hasStorageType('country-profile', link)" class="action badge bg-danger">{{ $t("countryProfile") }}</span>
                        <div class="mt-1 email-links d-none d-sm-inline-block">
                            <span v-if="link.shareType =='email' && link.sharedWith.emails">
                                <span class="fw-bold">{{ $t("email") }}</span>
                                <ul v-if="link.sharedWith.emails.length>0">
                                    <li v-for="email in link.sharedWith.emails.split(',')">{{email}}</li>
                                </ul>
                            </span>
                            <span v-if="link.shareType =='embed' && link.sharedData.domain"><span class="fw-bold">{{ $t("domain") }}</span> {{link.sharedData.domain}}</span>
                        </div>
                    </td>

        			<td colspan="4">
                        <div class="input-group" >
                            <input ref="textToCopy" type="text" width="100%" class="highlight form-control" :value="getUrl(link.urlHash)" disabled readonly/>
                            <span class="input-group-text cursor-pointer" id="basic-addon1">
                                <a :href="getUrl(link.urlHash)" target="_blank"><i class="bi bi-link"> </i> 
                                    <span class="d-none d-sm-inline-block">{{ $t("Open") }}</span></a>
                            </span>
                            <span class="display-content" v-if="!link.revoked">
                                <span class="input-group-text cursor-pointer" id="basic-addon2" @click="copyUrl(link.urlHash)">
                                    <i class="bi bi-clipboard pe-1"> </i> <span class="d-none d-sm-inline-block">{{ $t("copy") }}</span>
                                </span>
                                <span  v-if="hasStorageType('search', link)" class="input-group-text cursor-pointer" id="basic-addon1">
                                    <a :href="`/register/user-preferences/?id=${link.sharedData.recordKey}`" target="_blank"><i class="bi bi-pencil-square"> </i> 
                                        <span class="d-none d-sm-inline-block">{{ $t("edit") }}</span></a>
                                </span>
                                <span  v-if="link.sharedWith.domain" class="input-group-text cursor-pointer" id="basic-addon2" 
                                    data-bs-toggle="modal" data-bs-target="#exampleModal" @click="embed(link.storageType, link.urlHash)">
                                    <i class="bi bi-code-slash pe-1"> </i> <span class="d-none d-sm-inline-block">{{ $t("embed") }}</span>
                                </span>
                                <span v-if="hasStatus('active', link)" disabled="link.status=='revokingLink'" class="input-group-text cursor-pointer" id="basic-addon3" @click="revokeLink(link)">
                                    <i class="spinner-border pe-2" v-if="link.status=='revokingLink'"></i>
                                    <i class="bi bi-hand-thumbs-down-fill pe-1"> </i> <span class="d-none d-sm-inline-block">{{ $t("revoke") }}</span>
                                </span>
                            </span>    
                        </div>
					</td>
                    
				</tr>
			</tbody>
		</table>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ $t("embedLink") }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <a :href="embededLink" target="_blank">
                        {{embededLink}}</a>
                </div>
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
    export default {
        name:'sharedUrls',
        props: ["tokenReader"],
        data:  () => {
            return {
                embededLink: null,
                sharedLinks: [],
            }
        },
        created() {
            this.documentShareApi = new DocumentShareApi(this.tokenReader);
        },
        async mounted() {
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
            copyUrl(hash){
                const el = document.createElement('textarea');  
                const url = this.getUrl(hash);
                el.value = url;                    
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