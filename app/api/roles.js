import ApiBase, { tryCastToApiError } from './api-base'

export default class RolesApi extends ApiBase {
  async queryRoles (params) {
    return this.http.get('api/v2013/roles', { params })
      .then(res => res.data)
      .catch(tryCastToApiError)
  }
}
