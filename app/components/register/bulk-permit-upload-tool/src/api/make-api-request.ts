import axios from 'axios'

export async function apiGet (path: string, params: object) {
  // @ts-expect-error TODO: Fix typescript importing of env variables
  const apiUrl = import.meta.env.VITE_API_URL

  return await axios.get(`${apiUrl}${path}`, params)
}

export async function getDocument (id: string) {
  return await apiGet(`/api/v2013/documents/${id}`, {})
}
