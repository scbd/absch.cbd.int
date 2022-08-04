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
					<th scope="col">{{ $t("expiryStatus") }}</th>
                    <th scope="col">{{ $t("storageType") }}</th>
                    <th scope="col">{{ $t("sharedWith") }}</th>
					<th scope="col" colspan="4">{{ $t("linkEmail") }}</th>
					<th scope="col">{{ $t("createdOn") }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(link, index) in sharedLinks.slice().reverse()">
					<th scope="row">{{index+1}}</th>
					<td> <span>{{link.expiry|formatDate}}</span>
                        <span v-if="hasStatus('active', link)" class="action badge bg-primary">{{ $t("active") }}</span>
                        <span v-if="hasStatus('expired', link)" class="action badge bg-warning text-dark">{{ $t("expired") }}</span>
                        <span v-if="hasStatus('revoked', link)" class="action badge bg-danger">{{ $t("revoked") }}</span>
                    </td>


                    <td>
                        <span v-if="hasStorageType('document', link)" class="action badge bg-primary">{{ $t("document") }}</span>
                        <span v-if="hasStorageType('search', link)" class="action badge bg-warning text-dark">{{ $t("search") }}</span>
                        <span v-if="hasStorageType('country-profile', link)" class="action badge bg-danger">{{ $t("countryProfile") }}</span>
                    </td>
                    <td>
                        <span v-if="link.shareType =='email' && link.sharedWith.emails">Email(s): {{link.sharedWith.emails}}</span>
                        <span v-if="link.shareType =='embed' && link.sharedData.domain">Domain: {{link.sharedData.domain}}</span>
                    </td>

        			<td colspan="4">
                        <div class="input-group" >
                            <input v-if="link.sharedWith.emails" type="text" width="100%" class="highlight form-control d-none d-sm-inline-block" :value="link.sharedWith.emails" disabled readonly/>
                            <input v-if="!link.sharedWith.emails" ref="textToCopy" type="text" width="100%" class="highlight form-control d-none d-sm-inline-block" :value="getUrl(link.urlHash)" disabled readonly/>
                            <span  v-if="!link.sharedWith.emails && !link.revoked" class="input-group-text cursor-pointer" id="basic-addon1">
                                <a :href="getUrl(link.urlHash)" target="_blank"><i class="bi bi-link"> </i> 
                                    <span class="d-none d-sm-inline-block">{{ $t("Open") }}</span></a>
                            </span>
                            <span  v-if="!link.sharedWith.emails && !link.revoked" class="input-group-text cursor-pointer" id="basic-addon2" @click="copyUrl(link.urlHash)">
                                <i class="bi bi-clipboard pe-1"> </i> <span class="d-none d-sm-inline-block">{{ $t("copy") }}</span></span>
                            <span  v-if="hasStorageType('search', link)" class="input-group-text cursor-pointer" id="basic-addon1">
                                <a :href="`/register/user-preferences/?id=${link.sharedData.recordKey}`" target="_blank"><i class="bi bi-pencil-square"> </i> 
                                    <span class="d-none d-sm-inline-block">{{ $t("edit") }}</span></a>
                            </span>
                            <span v-if="hasStatus('active', link) && !link.revoked" disabled="link.status=='revokingLink'" class="input-group-text cursor-pointer" id="basic-addon3" @click="revokeLink(link)">
                                <i class="spinner-border pe-2" v-if="link.status=='revokingLink'"></i>
                                <i class="bi bi-hand-thumbs-down-fill pe-1"> </i> <span class="d-none d-sm-inline-block">{{ $t("revoke") }}</span>
                            </span>
                        </div>
					</td>
                    <td class="link-date">{{link.meta.createdOn|formatDate}}</td>
				</tr>
			</tbody>
		</table>
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
                const revoke = await this.documentShareApi.revokeSharedDocument(`${link._id}`);
                // ToDo: Api should Response on revoked, then apply if condition here
                this.sharedLinks = this.sharedLinks.map(list => {
                    if (list._id == link._id) {
                        return {...list, revoked: true};
                    }
                    return list;
                });
            }
        },
        i18n: { messages:{ en: i18n }} 
        
    }
</script>