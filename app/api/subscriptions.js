import ApiBase, { tryCastToApiError } from './api-base';

export default class SubscriptionsApi extends ApiBase
{
    constructor(options) {
        super(options);
    }

    async querySubscriptions(params)  {
        return this.http.get(`api/v2016/me/subscriptions`, { params }).then(res => res.data).catch(tryCastToApiError);
    }

    async addSubscription(params)  {
        return this.http.post(`api/v2016/subscriptions`,params).then(res => res.data).catch(tryCastToApiError);
    }
}