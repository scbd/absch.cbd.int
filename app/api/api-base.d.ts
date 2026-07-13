import type { AxiosResponse, AxiosRequestConfig } from 'axios'

interface HttpClient {
  (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  get: (url: string, config?: AxiosRequestConfig)=> Promise<AxiosResponse>;
  head: (url: string, config?: AxiosRequestConfig)=> Promise<AxiosResponse>;
  post: (url: string, data?: unknown, config?: AxiosRequestConfig)=> Promise<AxiosResponse>;
  put: (url: string, data?: unknown, config?: AxiosRequestConfig)=> Promise<AxiosResponse>;
  patch: (url: string, data?: unknown, config?: AxiosRequestConfig)=> Promise<AxiosResponse>;
  delete: (url: string, config?: AxiosRequestConfig)=> Promise<AxiosResponse>;
  options: (url: string, config?: AxiosRequestConfig)=> Promise<AxiosResponse>;
  request: (config: AxiosRequestConfig)=> Promise<AxiosResponse>;
}

export default class ApiBase {
  protected http: HttpClient
  constructor (options?: Record<string, unknown>)
}

export function tryCastToApiError (error: unknown): never
export function mapObjectId (id: string): { $oid: string } | string
export function isObjectId (id: string): boolean
export function stringifyUrlParams (params: Record<string, unknown>): Record<string, string>
