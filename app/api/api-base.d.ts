import { AxiosResponse } from 'axios';

interface HttpClient {
    (url: string, config?: any): Promise<AxiosResponse>;
    get:     (url: string, config?: any)              => Promise<AxiosResponse>;
    head:    (url: string, config?: any)              => Promise<AxiosResponse>;
    post:    (url: string, data?: any, config?: any)  => Promise<AxiosResponse>;
    put:     (url: string, data?: any, config?: any)  => Promise<AxiosResponse>;
    patch:   (url: string, data?: any, config?: any)  => Promise<AxiosResponse>;
    delete:  (url: string, config?: any)              => Promise<AxiosResponse>;
    options: (url: string, config?: any)              => Promise<AxiosResponse>;
    request: (config: any)                            => Promise<AxiosResponse>;
}

export default class ApiBase {
    protected http: HttpClient;
    constructor(options?: any);
}

export function tryCastToApiError(error: unknown): never;
export function mapObjectId(id: string): { $oid: string } | string;
export function isObjectId(id: string): boolean;
export function stringifyUrlParams(params: Record<string, unknown>): Record<string, string>;
