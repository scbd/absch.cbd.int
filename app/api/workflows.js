import ApiBase, { tryCastToApiError } from './api-base';

export default class WorkflowsApi extends ApiBase
{
    constructor(options) {
        super(options);
    }

    async getWorkflow(id)  {
        return this.http.get(`api/v2013/workflows/${encodeURIComponent(id)}`).then(res => res.data).catch(tryCastToApiError);
    }


}