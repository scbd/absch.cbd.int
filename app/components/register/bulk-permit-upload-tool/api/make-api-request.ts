import axios from 'axios'
import { ApiDocumentType } from '../utilities/document-attributes-to-api-json/schemas/types'

// TODO: Move this to existing Javascript file that makes document API requests
export async function apiGet (path: string, params: object) {
  // TODO: Fix getting api URL or use http get
  const apiUrl = 'https://api.cbddev.xyz'
  //
  return await axios.get(`${apiUrl}${path}`, params)
}

export async function getDocument (id: string) {
  return await apiGet(`/api/v2013/documents/${id}`, {})
}

export async function createDocument (documentJson: ApiDocumentType) {
  const id = documentJson.header.identifier
  return axios.put(`api/v2013/documents/${id}/versions/draft`, { params: documentJson })
}
