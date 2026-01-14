import ApiBase, { tryCastToApiError } from './api-base'
import { analyzerMapping } from '~/app-data/report-analyzer-mapping.js'

export default class KmDocumentApi extends ApiBase {
  /**
   * fetchReportData - For getting an array of question answers from the first national report.
   * Makes GET request to https://absch.cbddev.xyz/api/v2019/report-analyzer/abs-national-report-1
   *
   * @param {string} countryCode
   * @param {Realm} realm -> For determining the url and which realm the NR1 belongs to.
   * @param {string[]} questionsList -> What questions are relevant to the
   * @param {string} reportKey -> The key of the first national report
   * @return {Promise} - Http request
   */
  async fetchReportData (countryCode, realm, reportKey, questionsList = null) {
    const q = { government_REL: { $in: [countryCode.toLowerCase()] } }

    const realmKey = realm.notificationTemplateFolder.toLowerCase()

    const map = analyzerMapping[realmKey]
      .find(map => map.type === reportKey)
    // Params to fetch NR1 for the current country from the server.
    const params = { q, realm: realm.realm }

    if ((questionsList || []).length > 0 && Array.isArray(questionsList)) {
      // Only get fetch relevant questions from the NR1 data on the server.
      params.f = questionsList.reduce((acc, value) => {
        const obj = acc
        obj[value] = 1
        return obj
      }, {})
    }
    // https://absch.cbddev.xyz/api/v2019/report-analyzer/abs-national-report-1
    return await this.http.get(map.dataUrl, { params })
      .then(res => res.data)
      .catch(tryCastToApiError)
  }
}
