import axios from 'axios'

export async function apiGet (path: string, params: object) {

  // TODO: Fix getting api URL or use http get
  const apiUrl = 'https://api.cbddev.xyz';
  //
  return await axios.get(`${apiUrl}${path}`, params)
}

export async function getDocument (id: string) {
  return await apiGet(`/api/v2013/documents/${id}`, {})
}
