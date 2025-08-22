import ApiBase, { tryCastToApiError } from './api-base';

export default class WorkflowsApi extends ApiBase
{
    constructor(options) {
        super(options);
    }

    async getWorkflow(id)  {
        return this.http.get(`api/v2013/workflows/${encodeURIComponent(id)}`).then(res => res.data).catch(tryCastToApiError);
    }
 // use this method to get a workflow
    async query(query, count, length, skip, sort) {
            return $http.get("/api/v2013/workflows", {
                params: {
                    q: JSON.stringify(query),
                    l: length,
                    s: sort,
                    sk: skip,
                    c: count
                }
            }).then(function(resp) {
                return resp.data;
            });
        }

}