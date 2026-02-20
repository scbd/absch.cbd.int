import ApiBase, { tryCastToApiError } from './api-base';

export default class HtmlPdfApi extends ApiBase
{
    constructor(options?: any) {
        super(options);
    }

    async generatePdf(html: string, downloadFileName: string, baseUrl: string, captchaToken: string) {
        try {
            const response = await this.http.post('/api/v2017/generate-pdf/', {
                html
            }, { 
                params : {
                    'attachment-name' : downloadFileName,
                    baseUrl
                },
                responseType: "blob", 
                headers:{
                    'x-captcha-v2-badge-token' : captchaToken       
                }
            })

            // Create a Blob from the response data
            const buffer = await response?.data?.arrayBuffer();
            const blob = new Blob([buffer], { type: 'application/pdf' });
            return blob;
        } catch (error) {
            throw tryCastToApiError(error);
        }
    }
}