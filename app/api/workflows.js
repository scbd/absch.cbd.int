import ApiBase, { tryCastToApiError, stringifyUrlParams } from './api-base';

export default class WorkflowsApi extends ApiBase
{
    constructor(options) {
        super(options);
    }

    async getWorkflow(id)  {
        return this.http.get(`api/v2013/workflows/${encodeURIComponent(id)}`).then(res => res.data).catch(tryCastToApiError);
    }

    async queryWorkflows({ query, count, length, skip, sort, fields } = {})  {
        const params = stringifyUrlParams({ q: query, c: count, l: length, sk: skip, s: sort, f: fields });
        return this.http.get(`api/v2013/workflows`, { params }).then(res => res.data).catch(tryCastToApiError);
    }

    async getWorkflowFacets({ query, fields })  {
        const params = stringifyUrlParams({ q: query, fields: fields.join(',') });
        return this.http.get(`api/v2013/workflows/facets`, { params }).then(res => res.data).catch(tryCastToApiError);
    }

}