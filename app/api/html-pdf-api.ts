// @ts-nocheck
import ApiBase, { tryCastToApiError } from './api-base';

export default class HtmlPdfApi extends ApiBase
{
    constructor(options?: any) {
        super(options);
    }

    async generatePdf(html: string, downloadFileName: string, baseUrl: string, captchaToken: string, saveToStorage = false) {
        try {
            const response = await this.http.post('/api/v2017/generate-pdf/', {
                html
            }, { 
                params : {
                    'attachment-name' : downloadFileName,
                    baseUrl,
                    saveToStorage
                },
                responseType: "blob", 
                timeout: 0,//no client timeout, generating a large pdf can take several minutes
                headers:{
                    'x-captcha-v2-badge-token' : captchaToken       
                }
            })

            // saveToStorage: the API redirects (302) to the stored pdf, the browser follows it so the final url is the stored pdf
            if(saveToStorage && response?.request?.responseURL)
                return response.request.responseURL;

            // Create a Blob from the response data
            const buffer = await response?.data?.arrayBuffer();
            const blob = new Blob([buffer], { type: 'application/pdf' });
            return blob;
        } catch (error) {
            throw tryCastToApiError(error);
        }
    }

    // true when the stored pdf at the given url exists, any failure counts as not stored
    async hasPregeneratedPdf(url: string) {
        try {
            await this.http.head(url);
            return true;
        } catch {
            return false;
        }
    }

    async getPregeneratedPdf(url: string) {
        try {
            const response = await this.http.get(url, { responseType: "blob" });

            return response.data;
        } catch (error) {
            throw tryCastToApiError(error);
        }
    }
}
