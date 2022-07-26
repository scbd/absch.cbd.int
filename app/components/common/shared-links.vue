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
        			<td colspan="4">
                        <div class="input-group" >
                            <input v-if="link.sharedWith.emails" type="text" width="100%" class="highlight form-control d-none d-sm-inline-block" :value="link.sharedWith.emails" disabled readonly/>
                            <input v-if="!link.sharedWith.emails" ref="textToCopy" type="text" width="100%" class="highlight form-control d-none d-sm-inline-block" :value="getUrl(link.urlHash)" disabled readonly/>
                            <span  v-if="!link.sharedWith.emails" class="input-group-text cursor-pointer" id="basic-addon1">
                                <a :href="getUrl(link.urlHash)" target="_blank"><i class="bi bi-link"> </i> 
                                    <span class="d-none d-sm-inline-block">{{ $t("Open") }}</span></a>
                            </span>
                            <span  v-if="!link.sharedWith.emails" class="input-group-text cursor-pointer" id="basic-addon2" @click="copyUrl(link.urlHash)">
                                <i class="bi bi-clipboard pe-1"> </i> <span class="d-none d-sm-inline-block">{{ $t("copy") }}</span></span>
                            <span v-if="hasStatus('active', link)" disabled="link.status=='revokingLink'" class="input-group-text cursor-pointer" id="basic-addon3" @click="revokeLink(link)">
                                <i class="spinner-border pe-2" v-if="link.status=='revokingLink'"></i>
                                <i class="bi bi-hand-thumbs-down-fill pe-1"> </i> <span class="d-none d-sm-inline-block">{{ $t("revoke") }}</span></span>
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
            // ToDo: set params as per backend 
         const params = {
                    q: {
                    "sharedData.identifier"            : 'F55AE659-83A7-6CAD-3F3A-FF698BECA377',
                    "sharedData.restrictionField"      : 'workingDocumentID',
                    "sharedData.restrictionFieldValue" : '234776',
                    "sharedBy"                         :  87354,
                    $or: [ { "forPdf": false }, { "forPdf": { $exists : false} }  ]
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

            async revokeLink(link){
                const operation = await this.documentShareApi.deleteShareDocument(`${link._id}/revoke`);
                console.log("operation",operation)
                link.status = "revokingLink";
            }
        },
        i18n: { messages:{ en: i18n }} 
        
    }
</script>
