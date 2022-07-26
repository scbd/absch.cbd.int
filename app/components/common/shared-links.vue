<template>
<!-- Todo: move text to json for translation -->
	<div class="p-4 bg-white">
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
					<td> <span>{{link.expiry}}</span>
                        <span v-if="hasStatus('active', link)" class="action badge bg-primary">{{ $t("active") }}</span>
                        <span v-if="hasStatus('expired', link)" class="action badge bg-warning text-dark">{{ $t("expired") }}</span>
                        <span v-if="hasStatus('revoked', link)" class="action badge bg-danger">{{ $t("revoked") }}</span>
                    </td>
        			<td colspan="4">
                        <div class="input-group" >
                            <input v-if="link.sharedWith.emails" type="text" width="100%" class="highlight form-control d-none d-sm-inline-block" :value="link.sharedWith.emails" disabled readonly/>
                            <input v-if="!link.sharedWith.emails" ref="textToCopy" type="text" width="100%" class="highlight form-control d-none d-sm-inline-block" :value="getUrl(link.urlHash)" disabled readonly/>
                            <span  v-if="!link.sharedWith.emails" class="input-group-text cursor-pointer" id="basic-addon1">
                                <a :href="getUrl(link.urlHash)" target="_blank"><i class="fa fa-link"> </i> 
                                    <span class="d-none d-sm-inline-block">{{ $t("Open") }}</span></a>
                            </span>
                            <span  v-if="!link.sharedWith.emails" class="input-group-text cursor-pointer" id="basic-addon2" @click="copyUrl(link.urlHash)">
                                <i class="fa fa-copy"> </i> <span class="d-none d-sm-inline-block">{{ $t("copy") }}</span></span>
                            <span v-if="hasStatus('active', link)" disabled="link.status=='revokingLink'" class="input-group-text cursor-pointer" id="basic-addon3" @click="revokeLink(link)">
                                <i class="fa fa-spin fa-spinner" v-if="link.status=='revokingLink'"></i>
                                <i class="fa fa-thumbs-down"> </i> <span class="d-none d-sm-inline-block">{{ $t("revoke") }}</span></span>
                        </div>
					</td>
                    <td class="link-date">{{link.meta.createdOn}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

 <style>
    @import url('app/css/vue/kb/style.css');
     .input-group-addon{
        cursor: pointer;
        padding: 12px 18px;
        font-size: 14px;
        line-height: 1;
        background-color: #eee;
        border: 1px solid #ccc;
}
tbody tr td .action {
    display: inherit;
    background-color: #5cb85c;
    border-radius: 4px;
}
.link-date {
        vertical-align: middle;
}
</style>  

<script>
    import DocumentShareApi from "~/api/document-share";
    import i18n from "../../app-text/components/common/shared-links.json"; 
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
                    "sharedData.identifier"            : '2FA71238-66FD-3EB6-2AF1-FFF10954AB8B',
                    "sharedData.restrictionField"      : 'workingDocumentID',
                    "sharedData.restrictionFieldValue" : '234781',
                    "sharedBy"                         :  87354,
                    $or: [ { "forPdf": false }, { "forPdf": { $exists : false} }  ]
                }
           } 
           
            //this.sharedLinks = [{"_id":"62dec22fbed1110001e4c266","title":null,"storageType":"km-document","forPdf":false,"sharedBy":87354,"shareType":"link","expiry":"2022-08-04T16:17:50.997Z","sharedWith":{"emails":null,"link":true,"linkPassword":null},"sharedData":{"identifier":"2FA71238-66FD-3EB6-2AF1-FFF10954AB8B","restrictionField":"workingDocumentID","restrictionFieldValue":"234781","realm":"BCH-DEV","referenceFields":[]},"urlHash":"b5f418201cc26515094c97f3206736e5-156a0","meta":{"modifiedBy":87354,"createdBy":87354,"modifiedOn":"2022-07-25T16:17:51.086Z","createdOn":"2022-07-25T16:17:51.086Z","version":1}},{"_id":"62df7799bed1110001e4c2cc","title":null,"storageType":"km-document","forPdf":false,"sharedBy":87354,"shareType":"link","expiry":"2022-08-05T05:11:52.561Z","sharedWith":{"emails":null,"link":true,"linkPassword":null},"sharedData":{"identifier":"2FA71238-66FD-3EB6-2AF1-FFF10954AB8B","restrictionField":"workingDocumentID","restrictionFieldValue":"234781","realm":"BCH-DEV","referenceFields":[]},"urlHash":"b5f418201cc26515094c97f3206736e5-12e6f","meta":{"modifiedBy":87354,"createdBy":87354,"modifiedOn":"2022-07-26T05:11:53.247Z","createdOn":"2022-07-26T05:11:53.247Z","version":1}},{"_id":"62df77edbed1110001e4c2ce","title":null,"storageType":"km-document","forPdf":false,"sharedBy":87354,"shareType":"link","expiry":"2022-08-05T05:13:17.241Z","sharedWith":{"emails":null,"link":true,"linkPassword":null},"sharedData":{"identifier":"2FA71238-66FD-3EB6-2AF1-FFF10954AB8B","restrictionField":"workingDocumentID","restrictionFieldValue":"234781","realm":"BCH-DEV","referenceFields":[]},"urlHash":"b5f418201cc26515094c97f3206736e5-1293a","meta":{"modifiedBy":87354,"createdBy":87354,"modifiedOn":"2022-07-26T05:13:17.332Z","createdOn":"2022-07-26T05:13:17.332Z","version":1}},{"_id":"62df77efbed1110001e4c2d0","title":null,"storageType":"km-document","forPdf":false,"sharedBy":87354,"shareType":"link","expiry":"2022-08-05T05:13:19.666Z","sharedWith":{"emails":null,"link":true,"linkPassword":null},"sharedData":{"identifier":"2FA71238-66FD-3EB6-2AF1-FFF10954AB8B","restrictionField":"workingDocumentID","restrictionFieldValue":"234781","realm":"BCH-DEV","referenceFields":[]},"urlHash":"b5f418201cc26515094c97f3206736e5-14f73","meta":{"modifiedBy":87354,"createdBy":87354,"modifiedOn":"2022-07-26T05:13:19.758Z","createdOn":"2022-07-26T05:13:19.758Z","version":1}},{"_id":"62df77f2bed1110001e4c2d2","title":null,"storageType":"km-document","forPdf":false,"sharedBy":87354,"shareType":"link","expiry":"2022-08-05T05:13:22.112Z","sharedWith":{"emails":null,"link":true,"linkPassword":null},"sharedData":{"identifier":"2FA71238-66FD-3EB6-2AF1-FFF10954AB8B","restrictionField":"workingDocumentID","restrictionFieldValue":"234781","realm":"BCH-DEV","referenceFields":[]},"urlHash":"b5f418201cc26515094c97f3206736e5-1283f","meta":{"modifiedBy":87354,"createdBy":87354,"modifiedOn":"2022-07-26T05:13:22.213Z","createdOn":"2022-07-26T05:13:22.213Z","version":1}},{"_id":"62df77f4bed1110001e4c2d4","title":null,"storageType":"km-document","forPdf":false,"sharedBy":87354,"shareType":"link","expiry":"2022-08-05T05:13:24.589Z","sharedWith":{"emails":null,"link":true,"linkPassword":null},"sharedData":{"identifier":"2FA71238-66FD-3EB6-2AF1-FFF10954AB8B","restrictionField":"workingDocumentID","restrictionFieldValue":"234781","realm":"BCH-DEV","referenceFields":[]},"urlHash":"b5f418201cc26515094c97f3206736e5-16367","meta":{"modifiedBy":87354,"createdBy":87354,"modifiedOn":"2022-07-26T05:13:24.678Z","createdOn":"2022-07-26T05:13:24.678Z","version":1}},{"_id":"62df77f7bed1110001e4c2d6","title":null,"storageType":"km-document","forPdf":false,"sharedBy":87354,"shareType":"link","expiry":"2022-08-05T05:13:27.430Z","sharedWith":{"emails":null,"link":true,"linkPassword":null},"sharedData":{"identifier":"2FA71238-66FD-3EB6-2AF1-FFF10954AB8B","restrictionField":"workingDocumentID","restrictionFieldValue":"234781","realm":"BCH-DEV","referenceFields":[]},"urlHash":"b5f418201cc26515094c97f3206736e5-10271","meta":{"modifiedBy":87354,"createdBy":87354,"modifiedOn":"2022-07-26T05:13:27.520Z","createdOn":"2022-07-26T05:13:27.520Z","version":1}},{"_id":"62df77ffbed1110001e4c2d8","title":null,"storageType":"km-document","forPdf":false,"sharedBy":87354,"shareType":"link","expiry":"2022-08-05T05:13:35.144Z","sharedWith":{"emails":null,"link":true,"linkPassword":null},"sharedData":{"identifier":"2FA71238-66FD-3EB6-2AF1-FFF10954AB8B","restrictionField":"workingDocumentID","restrictionFieldValue":"234781","realm":"BCH-DEV","referenceFields":[]},"urlHash":"b5f418201cc26515094c97f3206736e5-13318","meta":{"modifiedBy":87354,"createdBy":87354,"modifiedOn":"2022-07-26T05:13:35.234Z","createdOn":"2022-07-26T05:13:35.234Z","version":1}},{"_id":"62df7801bed1110001e4c2da","title":null,"storageType":"km-document","forPdf":false,"sharedBy":87354,"shareType":"link","expiry":"2022-08-05T05:13:37.828Z","sharedWith":{"emails":null,"link":true,"linkPassword":null},"sharedData":{"identifier":"2FA71238-66FD-3EB6-2AF1-FFF10954AB8B","restrictionField":"workingDocumentID","restrictionFieldValue":"234781","realm":"BCH-DEV","referenceFields":[]},"urlHash":"b5f418201cc26515094c97f3206736e5-1f9dd","meta":{"modifiedBy":87354,"createdBy":87354,"modifiedOn":"2022-07-26T05:13:37.922Z","createdOn":"2022-07-26T05:13:37.922Z","version":1}}]
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
                console.log("operation",link)
                // var operation;
                // operation = genericService.delete('v2018', 'document-sharing', link._id+'/revoke');
                const operation = await this.documentShareApi.deleteShareDocument(link._id);
                console.log("operation",operation)
                link.status = "revokingLink";
                // will update here the list
                //return this.sharedLinks.find(({ _id }) => id === this.counter);
            }
        },
        watch: {
            tokenReader: function(tokenReader) {
            // if(tokenReader) addApiOptions({ tokenReader })
            }
        },
        i18n: { messages:{ en: i18n }} 
        
    }
</script>
