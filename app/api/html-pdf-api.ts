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
                timeout: 120 * 1000,//generating and storing a pdf can take longer than the 30s default
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
}